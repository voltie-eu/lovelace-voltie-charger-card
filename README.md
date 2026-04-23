# Voltie Charger Card

Lovelace card for the Voltie Charger Home Assistant integration.

[![HACS](https://img.shields.io/badge/HACS-Custom-41BDF5?style=flat-square)](https://hacs.xyz)
[![License](https://img.shields.io/badge/license-proprietary-red?style=flat-square)](LICENSE)

Requires [voltie-eu/homeassistant-voltie_charger](https://github.com/voltie-eu/homeassistant-voltie_charger).

![](images/charging.png)

## Features

- Status panel with state-dependent colors and illustrations (offline, idle, plugged in, charging, fault).
- Slider to start and stop charging. The UI flips immediately and reconciles with the real state once the charger responds.
- Power sparkline of the current charging session, including idle gaps between charging periods.
- Expandable drawer with per-phase voltage / current / power, DLM and IPM readings, and per-period energy breakdown.
- Fault messages for documented EVSE error codes.
- Visual editor.

## Screenshots

| Ready | Charging | Fault |
| :---: | :---: | :---: |
| ![](images/ready.png) | ![](images/charging.png) | ![](images/fault.png) |

## Installation

HACS is the recommended way — it handles updates for you.

### HACS (recommended)

1. **HACS → Frontend → ⋮ → Custom repositories**.
2. Add `https://github.com/voltie-eu/lovelace-voltie-charger-card` with category **Dashboard**.
3. Install **Voltie Charger Card** and hard-refresh your browser.

[![Open your Home Assistant instance and add this repo to HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=voltie-eu&repository=lovelace-voltie-charger-card&category=plugin)

### Manual

1. Download `voltie-charger-card.js` from the [latest release](https://github.com/voltie-eu/lovelace-voltie-charger-card/releases).
2. Copy into `config/www/voltie_charger_card/` on your Home Assistant instance.
3. **Settings → Dashboards → ⋮ → Resources → Add resource**, URL `/local/voltie_charger_card/voltie-charger-card.js`, type **JavaScript Module**.
4. Hard-refresh your browser.

## Adding the card

**Add Card → By card → Voltie Charger**, then pick a device.

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

## Troubleshooting

**"Choose a charger".** The card has no device selected. Open the card editor and pick one.

**"Can't reach Home Assistant's entity registry".** WebSocket hiccup; the card retries. If it sticks, reload the page.

**Card shows "offline" but the charger is online.** Check `switch.<name>_charging` in **Developer Tools → States**. If it's `unavailable`, the integration is the issue, not the card.

## License

Proprietary. Copyright © 2026 Voltie. See [LICENSE](LICENSE).
