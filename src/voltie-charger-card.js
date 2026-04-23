import { LitElement, html, nothing } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { cardStyles } from "./styles.js";
import {
  fetchEntityRegistry,
  resolveFromRegistry,
  findVoltieDevices,
  getDeviceName,
} from "./entity-resolver.js";
import {
  formatCurrent,
  formatDuration,
  formatEnergy,
  formatPower,
  formatVoltage,
  numericState,
  stringState,
  entityAvailable,
  readNumericWithStale,
} from "./format.js";
import { FAULT_HINTS, FAULT_STATES } from "./icons.js";

import OnlineSvg from "./illustrations/Online.svg";
import OfflineSvg from "./illustrations/Offline.svg";
import ChargingSvg from "./illustrations/Charging.svg";
import ErrorSvg from "./illustrations/Error.svg";

const CARD_TYPE = "voltie-charger-card";
// eslint-disable-next-line no-undef
const CARD_VERSION = __VOLTIE_CARD_VERSION__;

// Graph
const GRAPH_FALLBACK_WINDOW_MS = 30 * 60 * 1000;
const GRAPH_MAX_WINDOW_MS = 12 * 60 * 60 * 1000;
const GRAPH_MAX_SAMPLES = 2000;
const GRAPH_RENDER_TICK_MS = 30 * 1000;

// Sparkline dimensions
const SPARKLINE_WIDTH = 300;
const SPARKLINE_HEIGHT = 36;
const SPARKLINE_VERT_PAD = 2;
const SPARKLINE_DOT_R = 2.5;

// Interactions
const SLIDE_COMMIT_THRESHOLD = 90;
const OPTIMISTIC_RESYNC_MS = 5000;
const REFRESH_COOLDOWN_MS = 3000;
const REFRESH_MIN_SPIN_MS = 600;

// Registry
const REGISTRY_RETRY_SCHEDULE_MS = [2_000, 5_000, 15_000, 30_000, 60_000];
const REGISTRY_EVENT_DEBOUNCE_MS = 250;

// Periods drawer
const PERIODS_DISPLAY_MAX = 10;

class VoltieChargerCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _expanded: { state: true },
    // Reflected to the host attribute so CSS can drive the gradient.
    _cardState: { reflect: true, attribute: "card-state" },
    _slideValue: { state: true },
    // "start" | "stop" | null — optimistic override while the charger replies.
    _pendingToggle: { state: true },
    _refreshing: { state: true },
    // "loading" | "ok" | "failed"
    _registryStatus: { state: true },
  };

  static styles = cardStyles;

  constructor() {
    super();
    this._config = null;
    this._expanded = false;
    this._cardState = "offline";
    this._slideValue = 0;
    this._entities = {};

    // samples[] holds real data only (history + live captures); the
    // polyline's right edge is synthesised to "now" at render time.
    this._graph = {
      samples: [],
      sessionStartMs: null,
      lastPowerUpdated: null,
      historyPromise: null,
      renderTicker: null,
    };
    this._prevInSession = false;

    this._registry = null;
    this._registryPromise = null;
    this._registryStatus = "loading";
    this._registryRetryAttempt = 0;
    this._registryRetryTimer = null;
    this._unsubRegistryEvents = null;
    this._registrySubscribing = false;
    this._registryEventDebounceTimer = null;

    this._pendingToggle = null;
    this._pendingRefreshTimer = null;
    this._pendingClearTimer = null;

    this._refreshing = false;
    this._refreshPromise = null;
    this._refreshCooldownUntil = 0;
    this._refreshMinSpinUntil = 0;
    this._refreshSpinStopTimer = null;

    this._valueCache = new Map();

    this._lastEvseSig = null;
    this._lastFallthroughSig = null;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.hass) {
      this._ensureRegistry();
      this._subscribeRegistryEvents();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    const unsub = this._unsubRegistryEvents;
    this._unsubRegistryEvents = null;
    if (typeof unsub === "function") unsub();

    clearTimeout(this._pendingRefreshTimer);
    clearTimeout(this._pendingClearTimer);
    clearTimeout(this._refreshSpinStopTimer);
    clearTimeout(this._registryRetryTimer);
    clearTimeout(this._registryEventDebounceTimer);
    this._pendingRefreshTimer = null;
    this._pendingClearTimer = null;
    this._refreshSpinStopTimer = null;
    this._registryRetryTimer = null;
    this._registryEventDebounceTimer = null;
    this._pendingToggle = null;
    this._refreshing = false;

    this._stopRenderTicker();
    this._graph.samples = [];
    this._graph.lastPowerUpdated = null;
    this._graph.historyPromise = null;
    this._graph.sessionStartMs = null;
    this._prevInSession = false;
  }

  _ensureRegistry(force = false) {
    if (!this.hass) return this._registryPromise ?? Promise.resolve();
    if (this._registryPromise) return this._registryPromise;
    if (!force && this._registry) return Promise.resolve();

    clearTimeout(this._registryRetryTimer);
    this._registryPromise = fetchEntityRegistry(this.hass)
      .then((registry) => {
        if (registry) {
          this._registry = registry;
          this._registryStatus = "ok";
          this._registryRetryAttempt = 0;
          this._entities = resolveFromRegistry(
            registry,
            this._config?.device_id
          );
          this._cardState = this._computeCardState();
          this.requestUpdate();
        } else {
          this._scheduleRegistryRetry();
        }
      })
      .catch(() => {
        this._scheduleRegistryRetry();
      })
      .finally(() => {
        this._registryPromise = null;
      });
    return this._registryPromise;
  }

  _scheduleRegistryRetry() {
    const idx = Math.min(
      this._registryRetryAttempt,
      REGISTRY_RETRY_SCHEDULE_MS.length - 1
    );
    const delay = REGISTRY_RETRY_SCHEDULE_MS[idx];
    this._registryRetryAttempt += 1;
    // Only flip to "failed" after a few tries to avoid flashing on mount.
    if (this._registryRetryAttempt >= 3 && this._registryStatus !== "ok") {
      this._registryStatus = "failed";
    }
    clearTimeout(this._registryRetryTimer);
    this._registryRetryTimer = setTimeout(() => {
      this._ensureRegistry(true);
    }, delay);
  }

  async _subscribeRegistryEvents() {
    if (this._unsubRegistryEvents || this._registrySubscribing) return;
    if (!this.hass?.connection) return;
    this._registrySubscribing = true;
    try {
      const unsub = await this.hass.connection.subscribeEvents(
        () => this._onRegistryEvent(),
        "entity_registry_updated"
      );
      // The card may have been disconnected while the subscription resolved.
      if (!this.isConnected) {
        unsub();
        return;
      }
      this._unsubRegistryEvents = unsub;
    } catch {
      // Registry sync falls back to the periodic retry loop.
    } finally {
      this._registrySubscribing = false;
    }
  }

  _onRegistryEvent() {
    // Debounce: renames and bulk migrations fire many events back-to-back.
    clearTimeout(this._registryEventDebounceTimer);
    this._registryEventDebounceTimer = setTimeout(() => {
      this._ensureRegistry(true);
    }, REGISTRY_EVENT_DEBOUNCE_MS);
  }

  static getConfigElement() {
    return document.createElement("voltie-charger-card-editor");
  }

  static getStubConfig(hass) {
    const devices = findVoltieDevices(hass);
    return {
      type: `custom:${CARD_TYPE}`,
      device_id: devices.length === 1 ? devices[0].device_id : "",
    };
  }

  setConfig(config) {
    if (!config || typeof config !== "object") {
      throw new Error("Invalid configuration");
    }
    this._config = {
      show_power_graph: true,
      show_advanced: true,
      ...config,
    };
    this._expanded = false;
  }

  _estimateRows() {
    const rows = {
      offline: 5,
      idle: 6,
      ready: 8,
      charging: 10,
      fault: 7,
    };
    const base = rows[this._cardState] ?? 8;
    const drawerVisible =
      this._config?.show_advanced !== false && this._cardState !== "offline";
    if (!drawerVisible) return base;
    return this._expanded ? base + 5 : base + 1;
  }

  getCardSize() {
    return this._estimateRows();
  }

  getLayoutOptions() {
    return {
      grid_columns: 4,
      grid_rows: "auto",
      grid_min_rows: 4,
    };
  }

  willUpdate(changed) {
    if (!this.hass || !this._config) return;

    if (changed.has("hass")) {
      this._ensureRegistry();
      if (!this._unsubRegistryEvents && !this._registrySubscribing) {
        this._subscribeRegistryEvents();
      }
    }

    if (changed.has("hass") || changed.has("_config")) {
      this._entities = resolveFromRegistry(
        this._registry,
        this._config.device_id
      );
      this._clearPendingToggleIfRealMatches();
      this._cardState = this._computeCardState();
    }

    // A session spans plug-in to plug-out and may contain many charging
    // periods with idle gaps in between.
    const isInSession = this._isInSession();
    if (isInSession && !this._prevInSession) {
      this._enterSession();
    } else if (!isInSession && this._prevInSession) {
      this._exitSession();
    } else if (
      isInSession &&
      this._graph.samples.length === 0 &&
      !this._graph.historyPromise &&
      this._config.show_power_graph !== false
    ) {
      // Mid-session mount or WS reconnection — retry the history pull.
      this._fetchGraphHistory();
    }
    this._prevInSession = isInSession;

    if (changed.has("hass")) {
      this._captureLiveSample();
      this._logEvseChanges();
    }
  }

  _clearPendingToggleIfRealMatches() {
    if (!this._pendingToggle) return;
    const realCharging = stringState(this.hass, this._entities.is_charging);
    if (this._pendingToggle === "start" && realCharging === "on") {
      this._pendingToggle = null;
    } else if (this._pendingToggle === "stop" && realCharging !== "on") {
      this._pendingToggle = null;
    }
  }

  _logEvseChanges() {
    if (!this._config?.debug) return;
    const id = this._entities.evse_state;
    if (!id) return;
    const st = this.hass?.states?.[id];
    if (!st) return;
    const raw = st.attributes?.raw_code;
    const sig = `${st.state}@${raw}@${st.last_changed || st.last_updated}`;
    if (sig === this._lastEvseSig) return;
    this._lastEvseSig = sig;
    const when = new Date().toLocaleTimeString();
    const rawPart = raw !== undefined ? `, raw_code=${raw}` : "";
    console.log(
      `[voltie-card] evse_state → "${st.state}"${rawPart} (state_ts ${
        st.last_changed || st.last_updated
      }, local ${when})`
    );
  }

  _isInSession() {
    return this._cardState === "ready" || this._cardState === "charging";
  }

  // Earliest timestamp we consider part of the current session. Derived from
  // session_charge_time + session_idle_time, capped at 12 h. Falls back to a
  // 30 min rolling window while those sensors are unavailable.
  _deriveSessionStartMs() {
    const chg = numericState(this.hass, this._entities.session_charge_time);
    const idle = numericState(this.hass, this._entities.session_idle_time);
    if (chg === null && idle === null) {
      return Date.now() - GRAPH_FALLBACK_WINDOW_MS;
    }
    const totalSecs = (chg ?? 0) + (idle ?? 0);
    return Date.now() - Math.min(totalSecs * 1000, GRAPH_MAX_WINDOW_MS);
  }

  _currentPowerValue() {
    return numericState(this.hass, this._entities.charge_power);
  }

  _enterSession() {
    this._graph.samples = [];
    this._graph.lastPowerUpdated = null;
    this._graph.historyPromise = null;
    this._graph.sessionStartMs = this._deriveSessionStartMs();

    if (this._config?.show_power_graph === false) return;
    this._fetchGraphHistory();
    this._startRenderTicker();
  }

  _exitSession() {
    this._stopRenderTicker();
    this._graph.samples = [];
    this._graph.lastPowerUpdated = null;
    this._graph.historyPromise = null;
    this._graph.sessionStartMs = null;
  }

  _startRenderTicker() {
    this._stopRenderTicker();
    this._graph.renderTicker = setInterval(() => {
      if (this._isInSession() && this._graph.samples.length > 0) {
        this.requestUpdate();
      }
    }, GRAPH_RENDER_TICK_MS);
  }

  _stopRenderTicker() {
    if (this._graph.renderTicker) {
      clearInterval(this._graph.renderTicker);
      this._graph.renderTicker = null;
    }
  }

  _fetchGraphHistory() {
    if (this._graph.historyPromise) return this._graph.historyPromise;
    const id = this._entities.charge_power;
    if (!id || !this.hass?.callWS) return Promise.resolve();
    if (this._graph.sessionStartMs === null) {
      this._graph.sessionStartMs = this._deriveSessionStartMs();
    }
    const startIso = new Date(this._graph.sessionStartMs).toISOString();
    const endIso = new Date().toISOString();

    this._graph.historyPromise = (async () => {
      try {
        const result = await this.hass.callWS({
          type: "history/history_during_period",
          start_time: startIso,
          end_time: endIso,
          entity_ids: [id],
          minimal_response: true,
          no_attributes: true,
          significant_changes_only: false,
        });
        const rows = result?.[id];
        if (!Array.isArray(rows) || !rows.length) return;

        const historic = [];
        for (const r of rows) {
          const t = Number(r.lu) * 1000;
          const v = Number(r.s);
          if (Number.isFinite(t) && Number.isFinite(v)) {
            historic.push({ t, v });
          }
        }
        if (!historic.length) return;
        historic.sort((a, b) => a.t - b.t);

        // HA's recorder skips same-value writes, so consecutive different
        // values mark a hidden transition. Insert a point holding the old
        // value until the last ms before the next row to draw a vertical edge.
        const stepped = [];
        for (let i = 0; i < historic.length; i++) {
          const curr = historic[i];
          const prev = historic[i - 1];
          if (prev && prev.v !== curr.v) {
            stepped.push({ t: curr.t - 1, v: prev.v });
          }
          stepped.push(curr);
        }

        const byT = new Map();
        for (const s of stepped) byT.set(s.t, s);
        for (const s of this._graph.samples) byT.set(s.t, s);
        this._graph.samples = [...byT.values()]
          .sort((a, b) => a.t - b.t)
          .filter((s) => s.t >= this._graph.sessionStartMs)
          .slice(-GRAPH_MAX_SAMPLES);
        this.requestUpdate();
      } catch {
        // History is decorative — leaving samples empty is acceptable.
      } finally {
        this._graph.historyPromise = null;
      }
    })();
    return this._graph.historyPromise;
  }

  _computeCardState() {
    const e = this._entities;

    if (!entityAvailable(this.hass, e.charging)) {
      return "offline";
    }

    // Every documented fault code is latched per the firmware spec; "error"
    // stays excluded because that bucket also holds transient transitions.
    const evse = stringState(this.hass, e.evse_state);
    if (evse && FAULT_STATES.has(evse)) {
      return "fault";
    }

    const plugged = stringState(this.hass, e.car_connected);
    const realCharging = stringState(this.hass, e.is_charging);

    const appearCharging =
      this._pendingToggle === "start"
        ? "on"
        : this._pendingToggle === "stop"
        ? "off"
        : realCharging;

    if (plugged === "off") return "idle";
    if (plugged === "on" && appearCharging === "off") return "ready";
    if (plugged === "on" && appearCharging === "on") return "charging";

    // Fall back to evse_state when a binary sensor is transiently missing.
    if (evse === "ev_not_connected") return "idle";
    if (evse === "ev_connected_not_charging") return "ready";
    if (evse === "ev_connected_charging") {
      return appearCharging === "on" ? "charging" : "ready";
    }

    if (this._config?.debug) {
      const sig = `${evse ?? "null"}|${plugged ?? "null"}|${realCharging ?? "null"}`;
      if (sig !== this._lastFallthroughSig) {
        this._lastFallthroughSig = sig;
        console.warn(
          `[voltie-card] ambiguous state fallback (idle): evse_state=${evse}, car_connected=${plugged}, is_charging=${realCharging}`
        );
      }
    }
    return "idle";
  }

  _captureLiveSample() {
    if (!this._isInSession()) return;

    const id = this._entities.charge_power;
    if (!id) return;
    const st = this.hass?.states?.[id];
    if (!st) return;

    const v = Number(st.state);
    if (!Number.isFinite(v)) return;

    const lastUpdated = new Date(
      st.last_updated || st.last_changed
    ).getTime();
    if (!Number.isFinite(lastUpdated)) return;
    if (lastUpdated === this._graph.lastPowerUpdated) return;
    this._graph.lastPowerUpdated = lastUpdated;

    const lastChanged = new Date(st.last_changed).getTime();
    const prev = this._graph.samples[this._graph.samples.length - 1];

    // At a pause boundary, hold the previous value until last_changed so the
    // polyline drops vertically instead of ramping across the poll interval.
    if (
      prev &&
      Number.isFinite(lastChanged) &&
      lastChanged > prev.t &&
      (prev.v === 0) !== (v === 0)
    ) {
      this._appendGraphSample(lastChanged - 1, prev.v);
      this._appendGraphSample(lastChanged, v);
    }
    this._appendGraphSample(lastUpdated, v);
  }

  _appendGraphSample(t, v) {
    if (!Number.isFinite(t) || !Number.isFinite(v)) return;
    const startMs = this._graph.sessionStartMs ?? this._deriveSessionStartMs();
    if (t < startMs) return;
    const prev = this._graph.samples[this._graph.samples.length - 1];
    if (prev && t <= prev.t) return;
    this._graph.samples.push({ t, v });
    if (this._graph.samples.length > GRAPH_MAX_SAMPLES) {
      this._graph.samples.splice(
        0,
        this._graph.samples.length - GRAPH_MAX_SAMPLES
      );
    }
  }

  _onSlideInput(ev) {
    this._slideValue = Number(ev.target.value);
  }

  _onSlideCommit(ev) {
    const value = Number(ev.target.value);
    if (value > SLIDE_COMMIT_THRESHOLD) {
      const switchId = this._entities.charging;
      if (switchId) {
        // Flip the UI optimistically — the charger takes several seconds
        // before its state change propagates back through the integration.
        this._pendingToggle = this._cardState === "charging" ? "stop" : "start";
        this.hass.callService("switch", "toggle", { entity_id: switchId });
        this._scheduleOptimisticResync();
      }
    }
    ev.target.value = 0;
    this._slideValue = 0;
  }

  _scheduleOptimisticResync() {
    clearTimeout(this._pendingRefreshTimer);
    clearTimeout(this._pendingClearTimer);

    // Nudge HA to re-poll just before we drop the optimistic override so
    // the real state usually lands inside the window.
    this._pendingRefreshTimer = setTimeout(() => {
      const targets = [
        this._entities.is_charging,
        this._entities.charging,
        this._entities.charge_power,
        this._entities.charge_current,
        this._entities.evse_state,
      ].filter(Boolean);
      if (targets.length) {
        this.hass.callService("homeassistant", "update_entity", {
          entity_id: targets,
        });
      }
    }, OPTIMISTIC_RESYNC_MS - 1000);

    // Safety net: if the charger refused the command, snap back to reality.
    this._pendingClearTimer = setTimeout(() => {
      this._pendingToggle = null;
    }, OPTIMISTIC_RESYNC_MS);
  }

  _onToggleDrawer() {
    this._expanded = !this._expanded;
  }

  _onRefreshClick(ev) {
    ev?.stopPropagation?.();
    const now = Date.now();
    if (this._refreshPromise) return;
    // Client-side cooldown to stop rapid clicks from spawning overlapping
    // forced polls against the coordinator.
    if (now < this._refreshCooldownUntil) return;

    const target =
      this._entities.charging ||
      this._entities.is_charging ||
      this._entities.evse_state ||
      this._entities.charge_power;
    if (!target) return;

    this._refreshCooldownUntil = now + REFRESH_COOLDOWN_MS;
    this._refreshMinSpinUntil = now + REFRESH_MIN_SPIN_MS;
    this._refreshing = true;
    clearTimeout(this._refreshSpinStopTimer);

    this._refreshPromise = Promise.resolve(
      this.hass.callService("homeassistant", "update_entity", {
        entity_id: target,
      })
    )
      .catch(() => {
        // Errors surface via entity unavailability; no user-facing toast.
      })
      .finally(() => {
        this._refreshPromise = null;
        // Keep the spin visible long enough for the user to register it.
        const remaining = Math.max(0, this._refreshMinSpinUntil - Date.now());
        this._refreshSpinStopTimer = setTimeout(() => {
          this._refreshing = false;
        }, remaining);
      });
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    if (!this._config.device_id) {
      return html`<ha-card>
        <div class="setup-hint">
          <ha-icon icon="mdi:tune"></ha-icon>
          <div>
            <strong>Choose a charger</strong>
            <span>Edit this card and pick a Voltie Charger device.</span>
          </div>
        </div>
      </ha-card>`;
    }

    if (this._registryStatus === "failed" && !this._registry) {
      return html`<ha-card>
        <div class="setup-hint">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          <div>
            <strong>Can't reach Home Assistant's entity registry</strong>
            <span>Retrying in the background. Check your HA connection.</span>
          </div>
        </div>
      </ha-card>`;
    }

    return html`
      <ha-card>
        <div class="panel">
          ${this._renderRefreshButton()}
          ${this._renderChargerId()}
          ${this._renderStateBody()}
          ${this._config.show_advanced ? this._renderDrawer() : nothing}
        </div>
      </ha-card>
    `;
  }

  _renderRefreshButton() {
    return html`
      <button
        class="refresh-btn"
        ?data-spinning=${this._refreshing}
        @click=${this._onRefreshClick}
        aria-label="Refresh"
        title="Refresh"
      >
        <ha-icon icon="mdi:refresh"></ha-icon>
      </button>
    `;
  }

  _renderChargerId() {
    // Extract the MAC-derived hex suffix the integration puts on the device
    // name (e.g. "Voltie Charger fbe1") — cheap visual fingerprint.
    const name = getDeviceName(this.hass, this._config.device_id);
    const match = name && name.match(/([0-9a-f]{4})\s*$/i);
    if (match) {
      return html`<p class="charger-id">${match[1].toUpperCase()}</p>`;
    }
    return nothing;
  }

  _renderStateBody() {
    switch (this._cardState) {
      case "offline":
        return this._renderOffline();
      case "idle":
        return this._renderIdle();
      case "ready":
        return this._renderReady();
      case "charging":
        return this._renderCharging();
      case "fault":
        return this._renderFault();
      default:
        return nothing;
    }
  }

  _renderOffline() {
    return html`
      <p class="label">Offline</p>
      <div class="illustration">${unsafeHTML(OfflineSvg)}</div>
    `;
  }

  _renderIdle() {
    return html`
      <p class="label">Online</p>
      <p class="label--sub">Car not connected</p>
      <div class="illustration">${unsafeHTML(OnlineSvg)}</div>
    `;
  }

  _renderReady() {
    return html`
      <p class="label">Car plugged in</p>
      <div class="illustration">${unsafeHTML(OnlineSvg)}</div>
      ${this._renderSlider("start", "Slide to START charging")}
      ${this._renderStats()}
      ${this._config.show_power_graph ? this._renderSparkline() : nothing}
    `;
  }

  _renderCharging() {
    return html`
      <p class="label">Charging</p>
      <div class="illustration">${unsafeHTML(ChargingSvg)}</div>
      ${this._renderSlider("stop", "Slide to STOP charging")}
      ${this._renderStats()}
      ${this._config.show_power_graph ? this._renderSparkline() : nothing}
    `;
  }

  _renderFault() {
    const raw = stringState(this.hass, this._entities.evse_state) ?? "error";
    const label = this._localizeEvseState() || "Fault";
    const hint = FAULT_HINTS[raw] ?? FAULT_HINTS.error;
    return html`
      <p class="label">${label}</p>
      <div class="illustration">${unsafeHTML(ErrorSvg)}</div>
      <div class="hint">${hint}</div>
    `;
  }

  _localizeEvseState() {
    const id = this._entities.evse_state;
    if (!id) return null;
    const st = this.hass.states?.[id];
    if (!st) return null;
    if (typeof this.hass.formatEntityState === "function") {
      try {
        return this.hass.formatEntityState(st);
      } catch {
        /* fall through */
      }
    }
    const k = `component.voltie_charger.entity.sensor.evse_state.state.${st.state}`;
    const localized = this.hass.localize?.(k);
    if (localized && localized !== k) return localized;
    return null;
  }

  _renderSlider(mode, text) {
    const value = this._slideValue;
    return html`
      <div class="slide">
        <input
          class="slide__input ${mode}"
          type="range"
          min="0"
          max="100"
          .value=${String(value)}
          @input=${this._onSlideInput}
          @change=${this._onSlideCommit}
          aria-label=${text}
        />
        <div class="slide__text">${text}</div>
      </div>
    `;
  }

  _renderStats() {
    // Stale reads dim the previous value while the entity is transiently
    // unavailable, instead of flipping to "—" and back.
    const energy = readNumericWithStale(
      this.hass,
      this._entities.session_energy,
      this._valueCache
    );
    const power = readNumericWithStale(
      this.hass,
      this._entities.charge_power,
      this._valueCache
    );
    const time = readNumericWithStale(
      this.hass,
      this._entities.session_charge_time,
      this._valueCache
    );

    const energyText =
      energy.value !== null
        ? (formatEnergy(energy.value, this.hass) ?? "—")
        : "—";
    const powerText =
      power.value !== null
        ? (formatPower(power.value, this.hass) ?? "—")
        : "—";
    const timeText = time.value !== null ? formatDuration(time.value) : "—";

    const cls = (s) => `stat__value${s.stale ? " stat__value--stale" : ""}`;

    return html`
      <div class="stats">
        <div class="stat">
          <p class=${cls(energy)}>${energyText}</p>
          <p class="stat__label">Session energy</p>
        </div>
        <div class="stat">
          <p class=${cls(time)}>${timeText}</p>
          <p class="stat__label">Session time</p>
        </div>
        <div class="stat">
          <p class=${cls(power)}>${powerText}</p>
          <p class="stat__label">Charge power</p>
        </div>
      </div>
    `;
  }

  _renderSparkline() {
    const stored = this._graph.samples;
    if (stored.length === 0) return nothing;

    // Extend the polyline to "now" using the current charge_power so the
    // right edge advances through pauses without needing an HA state change.
    const now = Date.now();
    const lastStored = stored[stored.length - 1];
    const nowV = this._currentPowerValue() ?? lastStored.v;
    const samples =
      now > lastStored.t ? [...stored, { t: now, v: nowV }] : stored;

    if (samples.length < 2) return nothing;

    const w = SPARKLINE_WIDTH;
    const h = SPARKLINE_HEIGHT;
    const pad = SPARKLINE_VERT_PAD;

    const firstT = samples[0].t;
    const lastT = samples[samples.length - 1].t;
    const rangeMs = Math.max(1, lastT - firstT);
    const maxV = Math.max(...samples.map((s) => s.v), 1);

    const xFor = (t) => ((t - firstT) / rangeMs) * w;
    const yFor = (v) => h - (Math.max(v, 0) / maxV) * (h - 2 * pad) - pad;

    const pts = samples
      .map((s) => `${xFor(s.t).toFixed(1)},${yFor(s.v).toFixed(1)}`)
      .join(" ");
    const lx = xFor(lastT);
    const ly = yFor(samples[samples.length - 1].v);

    return html`
      <svg class="sparkline" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
        <polyline
          class="sparkline__fill"
          points="0,${h} ${pts} ${lx.toFixed(1)},${h}"
        ></polyline>
        <polyline class="sparkline__stroke" points=${pts}></polyline>
        <circle
          class="sparkline__dot"
          cx=${lx.toFixed(1)}
          cy=${ly.toFixed(1)}
          r=${SPARKLINE_DOT_R}
        ></circle>
      </svg>
    `;
  }

  _renderDrawer() {
    if (this._cardState === "offline") return nothing;
    const hasPhaseData =
      this._entities.voltage_l1 ||
      this._entities.current_l1 ||
      this._entities.power_l1;
    const hasPeriods = this._getSessionPeriods().length > 0;
    if (!hasPhaseData && !hasPeriods) return nothing;

    return html`
      <button
        class="drawer-toggle"
        aria-expanded=${this._expanded}
        @click=${this._onToggleDrawer}
      >
        ${this._expanded ? "⏶" : "⏷"}
      </button>
      ${this._expanded
        ? html`<div class="drawer-body">
            ${hasPhaseData ? this._renderPhaseGrid() : nothing}
            ${hasPhaseData && hasPeriods
              ? html`<div class="drawer-sep"></div>`
              : nothing}
            ${hasPeriods ? this._renderPeriods() : nothing}
          </div>`
        : nothing}
    `;
  }

  _getSessionPeriods() {
    const id = this._entities.session_energy;
    if (!id) return [];
    const periods = this.hass?.states?.[id]?.attributes?.periods;
    return Array.isArray(periods) ? periods : [];
  }

  _renderPeriods() {
    const periods = this._getSessionPeriods();
    if (!periods.length) return nothing;

    const fmtTime = (unixSec) => {
      if (!unixSec) return "—";
      try {
        return new Date(unixSec * 1000).toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      } catch {
        return "—";
      }
    };
    const fmtEnergy = (kwh) => {
      if (kwh === null || kwh === undefined) return "—";
      const n = Number(kwh);
      return Number.isFinite(n) ? `${n.toFixed(2)} kWh` : "—";
    };

    // Number by the firmware's 0-based `index` so the oldest stays #1.
    const rows = periods.map((p, i) => ({
      num: (p.index ?? i) + 1,
      start: fmtTime(p.p_start),
      end: p.p_end ? fmtTime(p.p_end) : "",
      energy: fmtEnergy(p.p_energy),
    }));
    rows.reverse();

    const hiddenCount = Math.max(0, rows.length - PERIODS_DISPLAY_MAX);
    const visible = rows.slice(0, PERIODS_DISPLAY_MAX);

    return html`
      <div class="periods__header">Periods this session</div>
      ${visible.map(
        (r) => html`
          <div class="periods__row">
            <span><span class="periods__num">#${r.num}</span> ${r.start} – ${r.end}</span>
            <strong>${r.energy}</strong>
          </div>
        `
      )}
      ${hiddenCount > 0
        ? html`<div class="periods__more">+ ${hiddenCount} more</div>`
        : nothing}
    `;
  }

  _renderPhaseGrid() {
    const voltage = (p) =>
      formatVoltage(
        numericState(this.hass, this._entities[`voltage_l${p}`]),
        this.hass
      ) ?? "—";
    const current = (p) =>
      formatCurrent(
        numericState(this.hass, this._entities[`current_l${p}`]),
        this.hass,
        { precision: 1 }
      ) ?? "—";
    const power = (p) =>
      formatPower(
        numericState(this.hass, this._entities[`power_l${p}`]),
        this.hass
      ) ?? "—";

    const dlmValid = stringState(this.hass, this._entities.dlm_valid);
    const ipmValid = stringState(this.hass, this._entities.ipm_valid);
    const showDlm = !!this._entities.dlm_current_l1;
    const showIpm = !!this._entities.ipm_current_l1;
    const dlm = (p) =>
      formatCurrent(
        numericState(this.hass, this._entities[`dlm_current_l${p}`]),
        this.hass,
        { precision: 1 }
      ) ?? "—";
    const ipm = (p) =>
      formatCurrent(
        numericState(this.hass, this._entities[`ipm_current_l${p}`]),
        this.hass,
        { precision: 1 }
      ) ?? "—";

    return html`
      <div class="phase-grid">
        <span class="phase-grid__label"></span>
        <span class="phase-grid__header">Phase 1</span>
        <span class="phase-grid__header">Phase 2</span>
        <span class="phase-grid__header">Phase 3</span>

        <span class="phase-grid__label">Voltage</span>
        <span class="phase-grid__cell">${voltage(1)}</span>
        <span class="phase-grid__cell">${voltage(2)}</span>
        <span class="phase-grid__cell">${voltage(3)}</span>

        <span class="phase-grid__label">Current</span>
        <span class="phase-grid__cell">${current(1)}</span>
        <span class="phase-grid__cell">${current(2)}</span>
        <span class="phase-grid__cell">${current(3)}</span>

        <span class="phase-grid__label">Power</span>
        <span class="phase-grid__cell">${power(1)}</span>
        <span class="phase-grid__cell">${power(2)}</span>
        <span class="phase-grid__cell">${power(3)}</span>
      </div>
      ${showDlm || showIpm
        ? html`<div class="drawer-sep"></div>
            <div class="aux-grid">
              ${showDlm
                ? html`
                    <span class="aux-grid__meta">
                      DLM ${dlmValid === "on" ? "active" : "inactive"}
                    </span>
                    <span class="phase-grid__cell">${dlm(1)}</span>
                    <span class="phase-grid__cell">${dlm(2)}</span>
                    <span class="phase-grid__cell">${dlm(3)}</span>
                  `
                : nothing}
              ${showIpm
                ? html`
                    <span class="aux-grid__meta">
                      IPM ${ipmValid === "on" ? "active" : "inactive"}
                    </span>
                    <span class="phase-grid__cell">${ipm(1)}</span>
                    <span class="phase-grid__cell">${ipm(2)}</span>
                    <span class="phase-grid__cell">${ipm(3)}</span>
                  `
                : nothing}
            </div>`
        : nothing}
    `;
  }

}

if (!customElements.get(CARD_TYPE)) {
  customElements.define(CARD_TYPE, VoltieChargerCard);
}

import "./voltie-charger-editor.js";

window.customCards = window.customCards || [];
if (!window.customCards.find((c) => c.type === CARD_TYPE)) {
  window.customCards.push({
    type: CARD_TYPE,
    name: "Voltie Charger",
    description: "Control and monitor a Voltie EV charger",
    preview: true,
    documentationURL:
      "https://github.com/voltie-eu/homeassistant-voltie_charger",
  });
}

console.info(
  `%c VOLTIE-CHARGER-CARD %c v${CARD_VERSION} `,
  "color:white;background:#09bca6;font-weight:700;padding:2px 6px;border-radius:3px 0 0 3px;",
  "color:#09bca6;background:#222;padding:2px 6px;border-radius:0 3px 3px 0;"
);
