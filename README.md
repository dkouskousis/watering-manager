# Watering Manager

Watering Manager is a Home Assistant custom integration for managing multiple irrigation systems from one mobile-friendly sidebar page. The interface is available in Greek and English.

> Status: early development release. Test with supervision before relying on it unattended.

Current development version: **0.3.1**

## Current features

- Dedicated **Watering / Πότισμα** page in the Home Assistant sidebar.
- Create, edit and delete multiple watering systems without YAML.
- Greek and English interface, automatically selected from Home Assistant with a manual override.
- Entity selectors for valves, soil moisture sensors, soil temperature, weather, flow, water meters and ET0.
- Weekly schedule and start time.
- Manual and Auto modes.
- Two soil moisture sensors with stale-reading detection.
- Safe short watering when the sensors disagree.
- Dry-to-wet base duration, minimum and maximum duration.
- Optional current-weather correction without requiring rain hardware.
- Minimum interval between runs.
- Cycle-and-soak watering.
- Persistent decision and watering logs.
- Valve closing in the run cleanup path, including errors and user cancellation.
- Persisted fail-safe recovery after Home Assistant restarts or crashes.
- Valve-close verification, a second close attempt and residual-flow leak checks.
- Dedicated Notifications tab with multiple recipients, independent event preferences and the last 10 delivery results.
- Delayed post-watering verification for each configured moisture sensor.
- Guided flow and dry-to-wet duration calibration with explicit Apply actions.
- Mobile-friendly Diagnostics page with live component health and pending checks.
- Plant-demand profiles, crop coefficient (Kc), pot geometry and irrigation efficiency.
- Optional FAO-style daily water balance using `ETc = ET0 × Kc`.
- Normal-flow calibration with a configurable percentage tolerance band.
- Exact run volume from a cumulative water meter, with calibrated-flow estimation as fallback.
- Pause-until date and a maintenance mode with a controlled valve test.
- Native Home Assistant sensors, binary sensors and switches for every watering system.
- Persistent daily aggregates that are not limited by the 500-entry detailed log.
- A read-only decision preview showing every gate and calculation input before watering.

## Installation with HACS

1. Add `https://github.com/dkouskousis/watering-manager` as a custom **Integration** repository.
2. Download Watering Manager.
3. Restart Home Assistant.
4. Open **Settings → Devices & services → Add integration**.
5. Search for **Watering Manager** and add it.
6. Open **Watering / Πότισμα** from the sidebar.

No dashboard card or YAML package is required.

## Automatic watering logic

Without ET water balance, soil moisture is the primary signal and current weather can modify the calculated duration.

With ET water balance enabled, a daily ET0 sensor in `mm` or `mm/day` is required. Watering Manager calculates `ETc = ET0 × Kc` and converts the accumulated millimetres to litres from the configured pot surface area. Calibrated normal flow converts the target litres to runtime. Current-weather correction is not applied a second time in ET mode.

- Both sensors wet: skip.
- Both sensors dry: use the base duration and moisture deficit.
- One dry and one wet: use the configured short conflict duration.
- One valid sensor: use the valid reading and log the missing sensor.
- No moisture sensors selected: ET and the remaining safety limits may operate without them.
- Configured sensors unavailable: skip, or use the base duration if explicitly configured.

The weather entity is used only as a duration correction outside ET mode.

## Important sensor notes

The moisture sensor values must be numeric percentages from `0` to `100`. A cumulative meter must report `L`, `mL`, `m³`, `gal` or `ft³`; use a meter dedicated to the selected irrigation zone when concurrent water users could affect its delta.

The built-in low/medium/high Kc values are starting points, not automatic plant-species identification. Calibrate them for the plant, substrate, season and microclimate.

## Safety

Always test the selected valve entity and maximum duration while present. Hardware-level safeguards are recommended for installations where a failed valve could cause damage.

## License

MIT
