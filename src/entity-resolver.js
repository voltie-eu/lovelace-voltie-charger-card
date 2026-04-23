// Resolves Voltie entities for a given device by reading HA's full entity
// registry over WebSocket. We don't use `hass.entities` because the display
// variant doesn't expose `unique_id`, which we need to reverse-map to the
// integration's stable keys (pattern: voltie_charger_<key>_<entry_id>).

const INTEGRATION = "voltie_charger";
const UNIQUE_PREFIX = `${INTEGRATION}_`;
const ENTRY_ID_LEN = 26;

export async function fetchEntityRegistry(hass) {
  if (!hass) return null;
  try {
    return await hass.callWS({ type: "config/entity_registry/list" });
  } catch {
    return null;
  }
}

export function resolveFromRegistry(registry, deviceId) {
  const map = {};
  if (!registry || !deviceId) return map;

  for (const ent of registry) {
    if (ent.device_id !== deviceId) continue;
    const uid = ent.unique_id;
    if (!uid || !uid.startsWith(UNIQUE_PREFIX)) continue;
    const mid = uid.slice(UNIQUE_PREFIX.length);
    if (mid.length < ENTRY_ID_LEN + 1) continue;
    if (mid[mid.length - ENTRY_ID_LEN - 1] !== "_") continue;
    const key = mid.slice(0, mid.length - ENTRY_ID_LEN - 1);
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
