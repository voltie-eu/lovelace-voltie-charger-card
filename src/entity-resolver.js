// Resolves Voltie entities for a given device by reading HA's full entity
// registry over WebSocket. We don't use `hass.entities` because the display
// variant doesn't expose `unique_id`, which we need to reverse-map to the
// integration's stable keys (pattern: voltie_charger_<key>_<charger_id>, or
// voltie_charger_<key>_<entry_id> on installs the integration has not yet
// migrated).

const INTEGRATION = "voltie_charger";
const UNIQUE_PREFIX = `${INTEGRATION}_`;

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

// Strips the charger ID or config entry ID from the end of a unique_id's
// "<key>_<suffix>" part. Both are matched exactly first; neither ever
// contains an underscore, so the last "_" is the fallback boundary.
function keyFromUniqueId(mid, suffixes) {
  for (const suffix of suffixes) {
    if (suffix && mid.length > suffix.length + 1 && mid.endsWith(`_${suffix}`)) {
      return mid.slice(0, mid.length - suffix.length - 1);
    }
  }
  const cut = mid.lastIndexOf("_");
  return cut > 0 ? mid.slice(0, cut) : null;
}

export function resolveFromRegistry(registry, deviceId, chargerId = null) {
  const map = {};
  if (!registry || !deviceId) return map;

  for (const ent of registry) {
    if (ent.device_id !== deviceId) continue;
    const uid = ent.unique_id;
    if (!uid || !uid.startsWith(UNIQUE_PREFIX)) continue;
    const key = keyFromUniqueId(uid.slice(UNIQUE_PREFIX.length), [
      chargerId,
      ent.config_entry_id,
    ]);
    if (!key) continue;
    map[key] = ent.entity_id;
  }

  // The charging switch is keyed "switch" in unique_id; expose it as "charging".
  if (map.switch && !map.charging) map.charging = map.switch;
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
