// Locale-aware formatting helpers built on top of Intl.NumberFormat.

function getLocale(hass) {
  return hass?.locale?.language || hass?.language || "en";
}

function fmt(value, hass, options) {
  if (value === null || value === undefined || value === "") return null;
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return null;
  try {
    return new Intl.NumberFormat(getLocale(hass), options).format(num);
  } catch {
    return String(num);
  }
}

export function formatNumber(value, hass, options = {}) {
  return fmt(value, hass, options);
}

export function formatPower(value, hass, { compact = false } = {}) {
  const out = fmt(value, hass, {
    minimumFractionDigits: compact ? 0 : 1,
    maximumFractionDigits: 2,
  });
  return out === null ? null : `${out} kW`;
}

export function formatEnergy(value, hass) {
  const out = fmt(value, hass, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return out === null ? null : `${out} kWh`;
}

export function formatCurrent(value, hass, { precision = 0 } = {}) {
  const out = fmt(value, hass, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
  return out === null ? null : `${out} A`;
}

export function formatVoltage(value, hass) {
  const out = fmt(value, hass, { maximumFractionDigits: 0 });
  return out === null ? null : `${out} V`;
}

export function formatDuration(totalSeconds) {
  const s = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m`;
  if (m > 0) return `${m}m ${String(sec).padStart(2, "0")}s`;
  return `${sec}s`;
}

// Returns a finite number or null (never NaN, never "unavailable").
export function numericState(hass, entityId) {
  if (!entityId) return null;
  const st = hass?.states?.[entityId];
  if (!st) return null;
  if (st.state === "unknown" || st.state === "unavailable" || st.state === "")
    return null;
  const n = Number(st.state);
  return Number.isFinite(n) ? n : null;
}

export function stringState(hass, entityId) {
  if (!entityId) return null;
  const st = hass?.states?.[entityId];
  if (!st) return null;
  if (st.state === "unknown" || st.state === "unavailable") return null;
  return st.state;
}

export function entityAvailable(hass, entityId) {
  if (!entityId) return false;
  const st = hass?.states?.[entityId];
  if (!st) return false;
  return st.state !== "unavailable";
}

// Stale-aware read: if the entity is transiently unavailable but we have a
// cached last value, return that with `stale: true`.
export function readNumericWithStale(hass, entityId, cache) {
  const fresh = numericState(hass, entityId);
  if (fresh !== null) {
    cache.set(entityId, fresh);
    return { value: fresh, stale: false };
  }
  if (cache.has(entityId)) {
    return { value: cache.get(entityId), stale: true };
  }
  return { value: null, stale: false };
}
