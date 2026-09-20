# Watering Manager

Watering Manager is a Home Assistant custom integration for managing multiple irrigation systems from one mobile-friendly sidebar page. The interface is available in Greek and English.

> Status: early development release. Test with supervision before relying on it unattended.

Current development version: **0.4.2**

## Current features

- Dedicated **Watering / Πότισμα** page in the Home Assistant sidebar.
- Native `custom:watering-manager-card` for one dashboard card per watering system, with a graphical system selector and no entity-ID configuration.
- Modern responsive overview with grouped soil sensors, environment and latest-run information.
- Create, edit and delete multiple watering systems without YAML.
- Greek and English interface, automatically selected from Home Assistant with a manual override.
- Entity selectors for valves, valve battery level, soil moisture sensors, soil temperature, weather, flow and water meters.
- Weekly schedule and start time.
- Manual and Auto modes.
- Two soil moisture sensors with stale-reading detection.
- Safe short watering when the sensors disagree.
- Dry-to-wet base duration, minimum and maximum duration.
- Optional current-weather correction without requiring rain hardware.
- Configurable rain exposure so sheltered zones ignore the weather entity's rain condition.
- Minimum interval between runs.
- Cycle-and-soak watering.
- Persistent decision and watering logs.
- Valve closing in the run cleanup path, including errors and user cancellation.
- Persisted fail-safe recovery after Home Assistant restarts or crashes.
- Valve-close verification, a second close attempt and residual-flow leak checks.
- Dedicated Notifications tab with multiple recipients, independent event preferences and the last 10 delivery results.
- Optional low-valve-battery alerts with a configurable threshold and independent recipient preferences.
- Delayed post-watering verification for each configured moisture sensor.
- Guided flow and dry-to-wet duration calibration with explicit Apply actions.
- Mobile-friendly Diagnostics page with live component health and pending checks.
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
7. To add a dashboard card, edit a dashboard, choose **Add card → Watering Manager**, and select the watering system from the graphical editor.

The card module is registered automatically by the integration. No separate HACS dashboard repository or manual resource is required.

## Automatic watering logic

Soil moisture is the primary signal and current weather can modify the calculated duration.

- Both sensors wet: skip.
- Both sensors dry: use the base duration and moisture deficit.
- One dry and one wet: use the configured short conflict duration.
- One valid sensor: use the valid reading and log the missing sensor.
- No moisture sensors selected: the base duration, current weather and safety limits are used.
- Configured sensors unavailable: skip, or use the base duration if explicitly configured.

The weather entity is used only as a duration correction.

## Important sensor notes

The moisture sensor values must be numeric percentages from `0` to `100`. The optional valve battery sensor should also report a numeric percentage; it is informational and never changes watering duration. A cumulative meter must report `L`, `mL`, `m³`, `gal` or `ft³`; use a meter dedicated to the selected irrigation zone when concurrent water users could affect its delta.

## Safety

Always test the selected valve entity and maximum duration while present. Hardware-level safeguards are recommended for installations where a failed valve could cause damage.

## License

MIT
