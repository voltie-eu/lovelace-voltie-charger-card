import { LitElement, html, css } from "lit";

const SCHEMA = [
  {
    name: "device_id",
    required: true,
    selector: {
      device: { filter: [{ integration: "voltie_charger" }] },
    },
  },
  { name: "name", selector: { text: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "show_power_graph", default: true, selector: { boolean: {} } },
      { name: "show_advanced", default: true, selector: { boolean: {} } },
    ],
  },
  { name: "debug", default: false, selector: { boolean: {} } },
];

const LABELS = {
  device_id: "Voltie Charger device",
  name: "Custom name (optional)",
  show_power_graph: "Live power graph (while charging)",
  show_advanced: "Show the Advanced drawer",
  debug: "Debug logging (browser console)",
};

const SCHEMA_DEFAULTS = (() => {
  const out = {};
  const walk = (items) => {
    for (const item of items) {
      if (item.schema) walk(item.schema);
      else if (item.name && "default" in item) out[item.name] = item.default;
    }
  };
  walk(SCHEMA);
  return out;
})();

class VoltieChargerCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  static styles = css`
    :host { display: block; }
    ha-form { display: block; }
  `;

  setConfig(config) {
    this._config = config;
  }

  render() {
    if (!this.hass || !this._config) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  _computeLabel(schema) {
    return LABELS[schema.name] ?? schema.name;
  }

  _valueChanged(ev) {
    ev.stopPropagation();
    const value = ev.detail?.value ?? {};
    // Strip empty/default keys so the YAML stays clean.
    const cleaned = { ...value };
    for (const [k, v] of Object.entries(cleaned)) {
      if (v === "" || v === undefined || v === null) {
        delete cleaned[k];
        continue;
      }
      const def = SCHEMA_DEFAULTS[k];
      if (def !== undefined && v === def) delete cleaned[k];
    }
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: cleaned },
        bubbles: true,
        composed: true,
      })
    );
  }
}

if (!customElements.get("voltie-charger-card-editor")) {
  customElements.define("voltie-charger-card-editor", VoltieChargerCardEditor);
}
