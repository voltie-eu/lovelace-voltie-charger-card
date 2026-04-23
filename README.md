# Voltie Charger Card

Lovelace card for the Voltie Charger Home Assistant integration.

[![HACS](https://img.shields.io/badge/HACS-Custom-41BDF5?style=flat-square)](https://hacs.xyz)
[![License](https://img.shields.io/badge/license-proprietary-red?style=flat-square)](LICENSE)

Requires [voltie-eu/homeassistant-voltie_charger](https://github.com/voltie-eu/homeassistant-voltie_charger).

## Features

- Status panel with state-dependent colors and illustrations (offline, idle, plugged in, charging, fault).
- Slider to start and stop charging. The UI flips immediately and reconciles with the real state once the charger responds.
- Power sparkline of the current charging session, including idle gaps between charging periods.
- Expandable drawer with per-phase voltage / current / power, DLM and IPM readings, and per-period energy breakdown.
- Fault messages for documented EVSE error codes.
- Visual editor.

## Installation 📦

HACS is the recommended way — it handles updates for you.

1. Open **HACS** in the sidebar.
2. Open the **⋮** menu → **Custom repositories**.
3. Fill in the dialog:
   - **Repository:** `https://github.com/voltie-eu/lovelace-voltie-charger-card`
   - **Type:** **Dashboard**
4. Click **Add**.
5. Search for `Voltie Charger Card`, click the result, click **Download**.
6. Confirm the latest version and click **Download** again.
7. Hard-refresh the browser (⌘/Ctrl + Shift + R).

No Home Assistant restart is needed for cards.

## Adding the card

1. Open the dashboard where you want the card.
2. Click **Edit dashboard** in the top right corner.
3. Select where you want to add the card.
4. Search for `Voltie` and pick **Voltie Charger**.
5. Select your charger in the **Voltie Charger device** dropdown.
6. Click **Save**, then **Done** to exit edit mode.

## Configuration

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `device_id` | string | *required* | HA device id of the charger. |
| `name` | string | device name | Display-name override. |
| `show_power_graph` | boolean | `true` | Power sparkline while in session. |
| `show_advanced` | boolean | `true` | Drawer with per-phase data and periods. |
| `debug` | boolean | `false` | Verbose logs in the browser console. |

Minimal YAML:

```yaml
type: custom:voltie-charger-card
device_id: 0123456789abcdef0123456789abcdef
```

## Building

A prebuilt bundle ships with every release, so you don't need to build it yourself to use the card. To build from source:

```sh
npm install
npm run build
```

## Troubleshooting 🛠️

**"Choose a charger".** The card has no device selected. Open the card editor and pick one.

**"Can't reach Home Assistant's entity registry".** WebSocket hiccup; the card retries. If it sticks, reload the page.

**Card shows "offline" but the charger is online.** Check `switch.<name>_charging` in **Developer Tools → States**. If it's `unavailable`, the integration is the issue, not the card.

## License

Proprietary. Copyright © 2026 Voltie. See [LICENSE](LICENSE).
