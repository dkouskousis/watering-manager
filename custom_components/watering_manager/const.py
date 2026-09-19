"""Constants for Watering Manager."""

from __future__ import annotations

DOMAIN = "watering_manager"
STORAGE_KEY = DOMAIN
STORAGE_VERSION = 1
PANEL_URL = "watering-manager"
PANEL_ELEMENT = "watering-manager-panel"
PANEL_STATIC_URL = "/watering_manager/watering-manager-panel.js"
PANEL_MODULE_URL = f"{PANEL_STATIC_URL}?v=0.1.5"
EVENT_UPDATED = f"{DOMAIN}_updated"

DEFAULT_SYSTEM = {
    "name": "New watering system",
    "enabled": True,
    "mode": "manual",
    "valve_entity": "",
    "moisture_sensor_1": "",
    "moisture_sensor_2": "",
    "soil_temperature_sensor": "",
    "weather_entity": "",
    "rain_sensor": "",
    "flow_sensor": "",
    "flow_minimum": 0.1,
    "flow_maximum": 100,
    "flow_grace_seconds": 10,
    "days": [0, 2, 4],
    "start_time": "07:30",
    "manual_duration": 10,
    "base_duration": 10,
    "minimum_duration": 2,
    "maximum_duration": 30,
    "conflict_duration": 3,
    "dry_threshold": 30,
    "wet_threshold": 60,
    "sensor_max_age_minutes": 120,
    "sensor_failure": "skip",
    "exposure": "exposed",
    "rain_reach_percent": 100,
    "measured_rain_threshold": 5,
    "weather_sensitivity": 50,
    "minimum_interval_hours": 12,
    "soak_cycles": 1,
    "soak_pause_minutes": 5,
    "simultaneous_group": "default",
    "notes": "",
}

LOG_LIMIT = 500
SCHEDULER_INTERVAL_SECONDS = 30
