# Watering Manager

Watering Manager is a Home Assistant custom integration for managing multiple irrigation systems from one mobile-friendly sidebar page. The interface is available in Greek and English.

> Status: early development release. Test with supervision before relying on it unattended.

Current development version: **0.1.4**

## Current features

- Dedicated **Watering / Πότισμα** page in the Home Assistant sidebar.
- Create, edit and delete multiple watering systems without YAML.
- Greek and English interface, automatically selected from Home Assistant with a manual override.
- Entity selectors for valves, soil moisture sensors, weather, measured rain and flow.
- Weekly schedule and start time.
- Manual and Auto modes.
- Two soil moisture sensors with stale-reading detection.
- Safe short watering when the sensors disagree.
- Dry-to-wet base duration, minimum and maximum duration.
- Exposure settings for exposed, partly covered and covered balconies.
- Weather correction and measured-rain blocking.
- Minimum interval between runs.
- Cycle-and-soak watering.
- Persistent decision and watering logs.
- Valve closing in the run cleanup path, including errors and user cancellation.
- Diagnostics support.

## Installation with HACS

1. Add `https://github.com/dkouskousis/watering-manager` as a custom **Integration** repository.
2. Download Watering Manager.
3. Restart Home Assistant.
4. Open **Settings → Devices & services → Add integration**.
5. Search for **Watering Manager** and add it.
6. Open **Watering / Πότισμα** from the sidebar.

No dashboard card or YAML package is required.

## Automatic watering logic

Soil moisture is the primary signal. Current weather modifies the calculated duration, while a configured measured-rain entity can block a run according to the balcony exposure settings.

- Both sensors wet: skip.
- Both sensors dry: use the base duration and moisture deficit.
- One dry and one wet: use the configured short conflict duration.
- One valid sensor: use the valid reading and log the missing sensor.
- No valid sensors: skip, or use the base duration if explicitly configured.

The weather entity is a correction only. It is not treated as proof that rain reached the pots.

## Important sensor notes

The moisture sensor values must be numeric percentages from `0` to `100`. The measured-rain entity is expected to report millimetres accumulated during the previous 24 hours.

## Safety

Always test the selected valve entity and maximum duration while present. Hardware-level safeguards are recommended for installations where a failed valve could cause damage.

## License

MIT
