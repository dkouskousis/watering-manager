"""Constants for Watering Manager."""

from __future__ import annotations

from homeassistant.const import Platform

DOMAIN = "watering_manager"
STORAGE_KEY = DOMAIN
STORAGE_VERSION = 1
PANEL_URL = "watering-manager"
PANEL_ELEMENT = "watering-manager-panel"
PANEL_STATIC_URL = "/watering_manager/watering-manager-panel.js"
PANEL_MODULE_URL = f"{PANEL_STATIC_URL}?v=0.3.5"
EVENT_UPDATED = f"{DOMAIN}_updated"
PLATFORMS = [Platform.SENSOR, Platform.BINARY_SENSOR, Platform.SWITCH]
DATA_SCHEMA_VERSION = 4

DEFAULT_SYSTEM = {
    "name": "New watering system",
    "enabled": True,
    "mode": "manual",
    "valve_entity": "",
    "battery_sensor": "",
    "battery_low_threshold": 20,
    "moisture_sensor_1": "",
    "moisture_sensor_2": "",
    "soil_temperature_sensor": "",
    "soil_temperature_sensor_2": "",
    "weather_entity": "",
    "flow_sensor": "",
    "water_meter_sensor": "",
    "flow_minimum": 0.1,
    "flow_maximum": 100,
    "normal_flow_rate": 0,
    "flow_tolerance_percent": 30,
    "flow_grace_seconds": 10,
    "emergency_max_runtime": 45,
    "valve_confirmation_seconds": 5,
    "leak_flow_threshold": 0.05,
    "notification_service": "",
    "notify_failures": True,
    "notify_warnings": True,
    "notify_success": False,
    "notification_targets": [],
    "post_check_enabled": True,
    "post_check_delay_minutes": 30,
    "post_check_min_increase": 5,
    "flow_calibration_seconds": 30,
    "duration_calibration_minutes": 2,
    "duration_calibration_wait_minutes": 15,
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
    "weather_sensitivity": 50,
    "rain_exposure": "exposed",
    "minimum_interval_hours": 12,
    "soak_cycles": 1,
    "soak_pause_minutes": 5,
    "simultaneous_group": "default",
    "paused_until": "",
    "maintenance_mode": False,
    "valve_test_seconds": 10,
    "notes": "",
}

LOG_LIMIT = 500
SCHEDULER_INTERVAL_SECONDS = 30
