// Resolves Voltie entities for a given device by reading HA's full entity
// registry over WebSocket. We don't use `hass.entities` because the display
// variant doesn't expose `unique_id`, which we need to reverse-map to the
// integration's stable keys. Three unique_id formats exist, newest first:
//
//   <charger_id>_<key>                 integration v0.5.0 and the built-in one
//   voltie_charger_<key>_<charger_id>  integration v0.4.0
//   voltie_charger_<key>_<entry_id>    integration v0.3.0 (not yet migrated)

const INTEGRATION = "voltie_charger";
const LEGACY_PREFIX = `${INTEGRATION}_`;

// Entity keys the integration has frozen for v0.5.0 and the built-in version.
// The new unique_id format is matched against this list by suffix.
export const KNOWN_KEYS = Object.freeze([
  // sensor
  "evse_state",
  "charge_power",
  "charge_current",
  "session_energy",
  "total_energy",
  "mains_voltage",
  "phases",
  "phases_used",
  "current_offered",
  "session_charge_time",
  "session_idle_time",
  "average_power",
  "current_hw_limit",
  "voltage_l1",
  "voltage_l2",
  "voltage_l3",
  "current_l1",
  "current_l2",
  "current_l3",
  "power_l1",
  "power_l2",
  "power_l3",
  "dlm_current_l1",
  "dlm_current_l2",
  "dlm_current_l3",
  "ipm_current_l1",
  "ipm_current_l2",
  "ipm_current_l3",
  "rfid_list_count",
  "rfid_learn_remaining",
  "rfid_list_capacity",
  // binary_sensor
  "car_connected",
  "is_charging",
  "problem",
  "dlm_valid",
  "ipm_valid",
  "rfid_reader_enabled",
  "rfid_reader_working",
  "rfid_learn_in_progress",
  // switch
  "charging",
  "autostart",
  "display",
  "front_led",
  "rear_led",
  "buzzer",
  "out_of_service",
  "force_single_phase",
  // number
  "current_limit",
  "dlm_current_limit",
  "dlm_eco_startcurr",
  "grid_u_stop",
  "grid_u_min",
  "grid_u_max",
  "grid_t_up",
  "grid_t_dn",
  // select
  "dlm_mode",
  "access_mode",
  // button
  "reboot",
  "rfid_learn",
  "rfid_learn_cancel",
  // event
  "charging_session",
]);

// Keys renamed between releases: old key -> current key.
const KEY_ALIASES = Object.freeze({ switch: "charging" });

// Longest first, so "dlm_current_l1" is tried before "current_l1".
const SUFFIX_KEYS = [...KNOWN_KEYS, ...Object.keys(KEY_ALIASES)].sort(
  (a, b) => b.length - a.length
);

// Format rank: when two registry entries resolve to the same key, the newer
// unique_id format wins.
const RANK_NEW = 3;
const RANK_CHARGER_SUFFIX = 2;
const RANK_LEGACY = 1;

export async function fetchEntityRegistry(hass) {
  if (!hass) return null;
  try {
    return await hass.callWS({ type: "config/entity_registry/list" });
  } catch {
    return null;
  }
}

// The integration registers its device under (voltie_charger, <charger_id>)
// and reports the same ID as the serial number.
export function getChargerId(hass, deviceId) {
  const dev = hass?.devices?.[deviceId];
  if (!dev) return null;
  const ident = Array.isArray(dev.identifiers)
    ? dev.identifiers.find((pair) => pair?.[0] === INTEGRATION)
    : null;
  return ident?.[1] || dev.serial_number || null;
}

// New format: "<charger_id>_<key>". With the charger ID known, everything
// after it is the key. Without it, match the known keys by suffix (longest
// first); the charger ID part must be non-empty and never has an underscore.
function parseNewFormat(uid, chargerId) {
  if (chargerId) {
    const prefix = `${chargerId}_`;
    if (uid.length > prefix.length && uid.startsWith(prefix)) {
      return uid.slice(prefix.length);
    }
  }
  for (const key of SUFFIX_KEYS) {
    const suffix = `_${key}`;
    if (uid.length <= suffix.length || !uid.endsWith(suffix)) continue;
    const head = uid.slice(0, uid.length - suffix.length);
    if (!head.includes("_")) return key;
  }
  return null;
}

// Legacy formats: "<key>_<charger_id>" or "<key>_<entry_id>" after the
// "voltie_charger_" prefix. Both IDs are matched exactly first; neither ever
// contains an underscore, so the last "_" is the fallback boundary.
function stripSuffix(mid, suffix) {
  if (!suffix || mid.length <= suffix.length + 1) return null;
  return mid.endsWith(`_${suffix}`)
    ? mid.slice(0, mid.length - suffix.length - 1)
    : null;
}

function parseLegacyFormat(mid, chargerId, entryId) {
  const byCharger = stripSuffix(mid, chargerId);
  if (byCharger) return { key: byCharger, rank: RANK_CHARGER_SUFFIX };
  const byEntry = stripSuffix(mid, entryId);
  if (byEntry) return { key: byEntry, rank: RANK_LEGACY };
  const cut = mid.lastIndexOf("_");
  return cut > 0 ? { key: mid.slice(0, cut), rank: RANK_LEGACY } : null;
}

export function parseUniqueId(uid, chargerId = null, entryId = null) {
  if (!uid || typeof uid !== "string") return null;
  let parsed = null;
  if (uid.startsWith(LEGACY_PREFIX)) {
    const mid = uid.slice(LEGACY_PREFIX.length);
    parsed = parseLegacyFormat(mid, chargerId, entryId);
  } else {
    const key = parseNewFormat(uid, chargerId);
    if (key) parsed = { key, rank: RANK_NEW };
  }
  if (!parsed?.key) return null;
  const alias = KEY_ALIASES[parsed.key];
  // A renamed key ranks just below the current key of the same format.
  return alias ? { key: alias, rank: parsed.rank - 0.5 } : parsed;
}

export function resolveFromRegistry(registry, deviceId, chargerId = null) {
  const map = {};
  if (!Array.isArray(registry) || !deviceId) return map;

  const ranks = {};
  for (const ent of registry) {
    if (!ent || ent.device_id !== deviceId) continue;
    // Only our own entities: the new unique_id format has no domain prefix,
    // so another integration's entity on the same device could look alike.
    if (ent.platform && ent.platform !== INTEGRATION) continue;
    const parsed = parseUniqueId(ent.unique_id, chargerId, ent.config_entry_id);
    if (!parsed) continue;
    const { key, rank } = parsed;
    if (ranks[key] !== undefined && ranks[key] >= rank) continue;
    ranks[key] = rank;
    map[key] = ent.entity_id;
  }
  return map;
}

export function findVoltieDevices(hass) {
  if (!hass || !hass.entities) return [];
  const seen = new Set();
  for (const ent of Object.values(hass.entities)) {
    if (ent.platform === INTEGRATION && ent.device_id) seen.add(ent.device_id);
  }
  return [...seen].map((device_id) => {
    const dev = hass.devices?.[device_id] ?? {};
    return {
      device_id,
      name: dev.name_by_user || dev.name || device_id,
    };
  });
}

export function getDeviceName(hass, deviceId) {
  const dev = hass?.devices?.[deviceId];
  return dev?.name_by_user || dev?.name || null;
}
