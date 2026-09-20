const WM_VERSION = "0.4.5";

const WM_TRANSLATIONS = {
  en: {
    app: "Watering Manager", systems: "Watering systems", newSystem: "New system",
    selectSystem: "Select system", overview: "Overview", schedule: "Schedule",
    automatic: "Automatic", hardware: "Entities", diagnostics: "Diagnostics", statistics: "Statistics", logs: "Logs", save: "Save",
    delete: "Delete", duplicate: "Duplicate", runNow: "Run now", stop: "Stop",
    noSystems: "No watering systems yet.", createFirst: "Create the first system",
    name: "Name", enabled: "Enabled", mode: "Mode", manual: "Manual", auto: "Auto",
    modeHelp: "Manual always uses the fixed duration. Auto decides whether to water using soil moisture, current weather and safety limits.",
    days: "Watering days", startTime: "Start time", manualDuration: "Manual duration",
    minutes: "minutes", valve: "Valve or switch", moisture1: "Soil moisture sensor 1",
    moisture2: "Soil moisture sensor 2", soilTemperature1: "Soil temperature sensor 1", soilTemperature2: "Soil temperature sensor 2", weather: "Weather entity",
    flow: "Flow sensor (optional)", battery: "Valve battery sensor (optional)", batteryLevel: "Valve battery", batteryLowThreshold: "Low battery threshold",
    flowMinimum: "Minimum safe flow", flowMaximum: "Maximum safe flow", flowGrace: "Flow check delay",
    entityHelp: "Choose an existing Home Assistant entity. The system never creates or renames your hardware entities.",
    baseDuration: "Dry-to-wet base duration", minDuration: "Minimum duration",
    maxDuration: "Maximum duration", conflictDuration: "Duration when sensors disagree",
    dryThreshold: "Dry threshold", wetThreshold: "Wet threshold",
    maxSensorAge: "Maximum sensor age", failureMode: "If both sensors fail",
    skip: "Skip watering", useBase: "Use base duration",
    weatherSensitivity: "Weather sensitivity", rainExposure: "Rain exposure", exposed: "Exposed to rain", sheltered: "Sheltered", minimumInterval: "Minimum interval",
    soakCycles: "Watering cycles", soakPause: "Pause between cycles",
    safety: "Safety", currentStatus: "Current status", idle: "Idle", running: "Running",
    lastRun: "Last run", lastReason: "Last decision", lastDuration: "Last duration",
    sensorValues: "Soil sensors", sensorOne: "Soil sensor 1", sensorTwo: "Soil sensor 2", environment: "Environment", wateringSummary: "Latest watering", notConfigured: "Not configured",
    status: "Status", reason: "Reason", planned: "Planned", actual: "Actual",
    trigger: "Trigger", date: "Date", noLogs: "No watering events yet.",
    confirmDelete: "Delete this watering system and its logs?", saved: "Saved",
    created: "System created", deleted: "System deleted", error: "Error",
    valveRequired: "Select a valve or switch first.", language: "Language",
    refresh: "Refresh", notes: "Notes", advanced: "Advanced settings",
    sensorConflict: "If one pot is dry and the other is wet, a short safety watering is used.",
    adminOnly: "Only Home Assistant administrators can change settings or operate valves.",
    monday: "Mon", tuesday: "Tue", wednesday: "Wed", thursday: "Thu",
    friday: "Fri", saturday: "Sat", sunday: "Sun",
    weatherInfo: "Auto can use the current weather condition and temperature as a duration correction.",
    addTitle: "Create watering system", addHelp: "Give the system a name. All entities and automatic settings can be selected immediately afterwards.",
    cancel: "Cancel", create: "Create", percent: "%", hours: "hours",
    sensorStale: "minutes", systemsCount: "systems", updated: "Updated",
    help: "Help", close: "Close", day: "Day", week: "Week", month: "Month",
    totalWateringTime: "Total watering time", totalWaterVolume: "Total water volume",
    averageTemperature: "Average air temperature", averageSoilTemperature1: "Average soil temperature 1", averageSoilTemperature2: "Average soil temperature 2", averageMoisture1: "Average soil moisture 1", averageMoisture2: "Average soil moisture 2",
    wateringRuns: "Watering runs", successfulRuns: "Completed", skippedRuns: "Skipped",
    failedRuns: "Failed", durationChart: "Watering time by period", noStatistics: "No watering data for this period.",
    statisticsNote: "Air temperature, soil temperature and each soil-moisture average use readings captured when watering was evaluated. Soil temperature is recorded for information only and never changes watering duration. Water volume is estimated from the configured flow sensor and is shown only for supported flow-rate units.",
    volumePartial: "Volume is based only on runs with available flow data.",
    emergencyRuntime: "Emergency maximum valve runtime", valveConfirmation: "Valve close confirmation delay", leakFlow: "Maximum flow after close",
    notifications: "Notifications", notificationService: "Notification destination", notifyFailures: "Failures and safety events", notifyWarnings: "Warnings and moisture verification", notifySuccess: "Successful watering", notifyLowBattery: "Low valve battery", testNotification: "Test", recipientName: "Recipient name", addRecipient: "Add recipient", removeRecipient: "Remove recipient", noNotificationTargets: "No notification recipients configured.", notificationRecipientsHelp: "Each recipient can receive a different combination of events. Critical failures are always also shown in Home Assistant.", modernEntity: "Notify entities", legacyService: "Legacy notify services",
    postCheck: "Post-watering verification", postCheckEnabled: "Verify moisture after watering", postCheckDelay: "Verification delay", postCheckIncrease: "Minimum moisture increase",
    health: "System health", healthy: "Healthy", warning: "Needs attention", critical: "Critical", pendingChecks: "Pending checks", calibration: "Calibration", flowCalibration: "Calibrate flow", durationCalibration: "Calibrate dry-to-wet duration", applyResult: "Apply recommendation", calibrationRunning: "Calibration in progress", noCalibration: "No calibration result yet", samples: "samples", recommended: "Recommended", startCalibrationConfirm: "This test will open the valve. Make sure water can run safely. Continue?",
    diagnosticValve: "Valve", diagnosticBattery: "Valve battery", diagnosticMoisture1: "Moisture sensor 1", diagnosticMoisture2: "Moisture sensor 2", diagnosticSoilTemperature1: "Soil temperature 1", diagnosticSoilTemperature2: "Soil temperature 2", diagnosticWeather: "Weather", diagnosticFlow: "Flow", diagnosticNotifications: "Notifications",
    flowCalibrationSeconds: "Flow calibration duration", durationCalibrationMinutes: "Duration test pulse", durationCalibrationWait: "Soak-in wait before reading sensors",
  },
  el: {
    app: "Διαχείριση ποτίσματος", systems: "Συστήματα ποτίσματος", newSystem: "Νέο σύστημα",
    selectSystem: "Επιλογή συστήματος", overview: "Επισκόπηση", schedule: "Πρόγραμμα",
    automatic: "Αυτόματο", hardware: "Entities", diagnostics: "Διαγνωστικά", statistics: "Στατιστικά", logs: "Ιστορικό", save: "Αποθήκευση",
    delete: "Διαγραφή", duplicate: "Αντιγραφή", runNow: "Πότισμα τώρα", stop: "Διακοπή",
    noSystems: "Δεν υπάρχουν ακόμη συστήματα ποτίσματος.", createFirst: "Δημιουργία πρώτου συστήματος",
    name: "Όνομα", enabled: "Ενεργό", mode: "Λειτουργία", manual: "Manual", auto: "Auto",
    modeHelp: "Το Manual χρησιμοποιεί πάντα τη σταθερή διάρκεια. Το Auto αποφασίζει αν χρειάζεται πότισμα από την υγρασία χώματος, τον τρέχοντα καιρό και τα όρια ασφαλείας.",
    days: "Ημέρες ποτίσματος", startTime: "Ώρα έναρξης", manualDuration: "Διάρκεια Manual",
    minutes: "λεπτά", valve: "Βάνα ή διακόπτης", moisture1: "Αισθητήρας υγρασίας χώματος 1",
    moisture2: "Αισθητήρας υγρασίας χώματος 2", soilTemperature1: "Αισθητήρας θερμοκρασίας χώματος 1", soilTemperature2: "Αισθητήρας θερμοκρασίας χώματος 2", weather: "Entity καιρού",
    flow: "Αισθητήρας ροής (προαιρετικός)", battery: "Αισθητήρας μπαταρίας βάνας (προαιρετικός)", batteryLevel: "Μπαταρία βάνας", batteryLowThreshold: "Όριο χαμηλής μπαταρίας",
    flowMinimum: "Ελάχιστη ασφαλής ροή", flowMaximum: "Μέγιστη ασφαλής ροή", flowGrace: "Καθυστέρηση ελέγχου ροής",
    entityHelp: "Επίλεξε υπάρχον entity του Home Assistant. Η εφαρμογή δεν δημιουργεί ούτε μετονομάζει τα entities του εξοπλισμού.",
    baseDuration: "Βασική διάρκεια στεγνό → υγρό", minDuration: "Ελάχιστη διάρκεια",
    maxDuration: "Μέγιστη διάρκεια", conflictDuration: "Διάρκεια όταν διαφωνούν οι αισθητήρες",
    dryThreshold: "Όριο στεγνού", wetThreshold: "Όριο υγρού",
    maxSensorAge: "Μέγιστη ηλικία μέτρησης", failureMode: "Αν αποτύχουν και οι δύο αισθητήρες",
    skip: "Παράλειψη ποτίσματος", useBase: "Χρήση βασικής διάρκειας",
    weatherSensitivity: "Ευαισθησία στον καιρό", rainExposure: "Έκθεση στη βροχή", exposed: "Βρέχεται", sheltered: "Σε υπόστεγο", minimumInterval: "Ελάχιστο διάστημα",
    soakCycles: "Κύκλοι ποτίσματος", soakPause: "Παύση μεταξύ κύκλων",
    safety: "Ασφάλεια", currentStatus: "Τρέχουσα κατάσταση", idle: "Σε αναμονή", running: "Ποτίζει",
    lastRun: "Τελευταίο πότισμα", lastReason: "Τελευταία απόφαση", lastDuration: "Τελευταία διάρκεια",
    sensorValues: "Αισθητήρες χώματος", sensorOne: "Αισθητήρας χώματος 1", sensorTwo: "Αισθητήρας χώματος 2", environment: "Περιβάλλον", wateringSummary: "Τελευταίο πότισμα", notConfigured: "Δεν έχει οριστεί",
    status: "Κατάσταση", reason: "Αιτία", planned: "Υπολογισμένη", actual: "Πραγματική",
    trigger: "Εκκίνηση", date: "Ημερομηνία", noLogs: "Δεν υπάρχουν ακόμη καταγραφές.",
    confirmDelete: "Να διαγραφεί αυτό το σύστημα και το ιστορικό του;", saved: "Αποθηκεύτηκε",
    created: "Το σύστημα δημιουργήθηκε", deleted: "Το σύστημα διαγράφηκε", error: "Σφάλμα",
    valveRequired: "Επίλεξε πρώτα βάνα ή διακόπτη.", language: "Γλώσσα",
    refresh: "Ανανέωση", notes: "Σημειώσεις", advanced: "Προχωρημένες ρυθμίσεις",
    sensorConflict: "Αν η μία γλάστρα είναι στεγνή και η άλλη υγρή, γίνεται σύντομο πότισμα ασφαλείας.",
    adminOnly: "Μόνο οι διαχειριστές του Home Assistant μπορούν να αλλάζουν ρυθμίσεις ή να χειρίζονται τις βάνες.",
    monday: "Δε", tuesday: "Τρ", wednesday: "Τε", thursday: "Πε",
    friday: "Πα", saturday: "Σα", sunday: "Κυ",
    weatherInfo: "Το Auto μπορεί να χρησιμοποιεί την τρέχουσα κατάσταση και τη θερμοκρασία του καιρού ως διόρθωση της διάρκειας.",
    addTitle: "Δημιουργία συστήματος ποτίσματος", addHelp: "Δώσε ένα όνομα. Τα entities και οι ρυθμίσεις Auto επιλέγονται αμέσως μετά.",
    cancel: "Ακύρωση", create: "Δημιουργία", percent: "%", hours: "ώρες",
    sensorStale: "λεπτά", systemsCount: "συστήματα", updated: "Ενημερώθηκε",
    help: "Βοήθεια", close: "Κλείσιμο", day: "Ημέρα", week: "Εβδομάδα", month: "Μήνας",
    totalWateringTime: "Συνολικός χρόνος ποτίσματος", totalWaterVolume: "Συνολικός όγκος νερού",
    averageTemperature: "Μέση θερμοκρασία αέρα", averageSoilTemperature1: "Μέση θερμοκρασία χώματος 1", averageSoilTemperature2: "Μέση θερμοκρασία χώματος 2", averageMoisture1: "Μέση υγρασία χώματος 1", averageMoisture2: "Μέση υγρασία χώματος 2",
    wateringRuns: "Ποτίσματα", successfulRuns: "Ολοκληρωμένα", skippedRuns: "Παραλείψεις",
    failedRuns: "Αποτυχίες", durationChart: "Χρόνος ποτίσματος ανά περίοδο", noStatistics: "Δεν υπάρχουν δεδομένα ποτίσματος για αυτή την περίοδο.",
    statisticsNote: "Οι μέσες τιμές θερμοκρασίας αέρα, θερμοκρασίας χώματος και κάθε αισθητήρα υγρασίας βασίζονται στις μετρήσεις που καταγράφηκαν όταν αξιολογήθηκε το πότισμα. Η θερμοκρασία χώματος είναι μόνο ενημερωτική και δεν αλλάζει ποτέ τη διάρκεια. Ο όγκος νερού είναι εκτίμηση από τον αισθητήρα ροής και εμφανίζεται μόνο για υποστηριζόμενες μονάδες ροής.",
    volumePartial: "Ο όγκος βασίζεται μόνο στα ποτίσματα με διαθέσιμα δεδομένα ροής.",
    emergencyRuntime: "Μέγιστος χρόνος έκτακτης διακοπής", valveConfirmation: "Αναμονή επιβεβαίωσης κλεισίματος", leakFlow: "Μέγιστη ροή μετά το κλείσιμο",
    notifications: "Ειδοποιήσεις", notificationService: "Προορισμός ειδοποιήσεων", notifyFailures: "Αποτυχίες και συμβάντα ασφαλείας", notifyWarnings: "Προειδοποιήσεις και έλεγχος υγρασίας", notifySuccess: "Επιτυχημένα ποτίσματα", notifyLowBattery: "Χαμηλή μπαταρία βάνας", testNotification: "Δοκιμή", recipientName: "Όνομα παραλήπτη", addRecipient: "Προσθήκη παραλήπτη", removeRecipient: "Αφαίρεση παραλήπτη", noNotificationTargets: "Δεν έχουν οριστεί παραλήπτες ειδοποιήσεων.", notificationRecipientsHelp: "Κάθε παραλήπτης μπορεί να λαμβάνει διαφορετικό συνδυασμό συμβάντων. Οι κρίσιμες αποτυχίες εμφανίζονται πάντα και μέσα στο Home Assistant.", modernEntity: "Notify entities", legacyService: "Παλαιότερα notify services",
    postCheck: "Έλεγχος μετά το πότισμα", postCheckEnabled: "Επαλήθευση αύξησης υγρασίας", postCheckDelay: "Καθυστέρηση ελέγχου", postCheckIncrease: "Ελάχιστη αύξηση υγρασίας",
    health: "Υγεία συστήματος", healthy: "Υγιές", warning: "Χρειάζεται προσοχή", critical: "Κρίσιμο", pendingChecks: "Έλεγχοι σε αναμονή", calibration: "Βαθμονόμηση", flowCalibration: "Βαθμονόμηση ροής", durationCalibration: "Βαθμονόμηση διάρκειας στεγνό → υγρό", applyResult: "Εφαρμογή πρότασης", calibrationRunning: "Η βαθμονόμηση εκτελείται", noCalibration: "Δεν υπάρχει ακόμη αποτέλεσμα βαθμονόμησης", samples: "δείγματα", recommended: "Προτεινόμενο", startCalibrationConfirm: "Η δοκιμή θα ανοίξει τη βάνα. Βεβαιώσου ότι το νερό μπορεί να τρέξει με ασφάλεια. Συνέχεια;",
    diagnosticValve: "Βάνα", diagnosticBattery: "Μπαταρία βάνας", diagnosticMoisture1: "Αισθητήρας υγρασίας 1", diagnosticMoisture2: "Αισθητήρας υγρασίας 2", diagnosticSoilTemperature1: "Θερμοκρασία χώματος 1", diagnosticSoilTemperature2: "Θερμοκρασία χώματος 2", diagnosticWeather: "Καιρός", diagnosticFlow: "Ροή", diagnosticNotifications: "Ειδοποιήσεις",
    flowCalibrationSeconds: "Διάρκεια βαθμονόμησης ροής", durationCalibrationMinutes: "Δοκιμαστικός χρόνος ποτίσματος", durationCalibrationWait: "Αναμονή απορρόφησης πριν τη μέτρηση",
  },
};

Object.assign(WM_TRANSLATIONS.en, {
  preview: "Decision preview", refreshPreview: "Recalculate", willWater: "Will water", willNotWater: "Will not water",
  decisionGates: "Decision gates", decisionInputs: "Calculation inputs", expectedVolume: "Expected volume", durationBasis: "Duration basis",
  cumulativeMeter: "Cumulative water meter", normalFlow: "Calibrated normal flow", flowTolerance: "Allowed flow deviation",
  pauseUntil: "Pause until", pauseHelp: "Scheduled watering is paused before this date and resumes at 00:00 on the selected date. Run now remains available.",
  maintenanceMode: "Maintenance mode", maintenanceHelp: "Suspends schedules and normal Run now operations. Calibration, notification tests and the controlled valve test remain available.",
  valveTest: "Test valve", valveTestSeconds: "Valve test duration", valveTestConfirm: "Maintenance test will open the valve briefly. Continue?", valveTestHelp: "Enable Maintenance mode in Schedule before testing the valve.",
  year: "Year", all: "All", exactVolume: "Exact meter readings", estimatedVolume: "Flow estimates",
  diagnosticWaterMeter: "Cumulative water meter", nextRun: "Next run",
  optionalSensors: "Moisture sensors are optional. With none selected, Auto uses the base duration, current weather and safety limits. If a configured sensor becomes unavailable, the selected sensor-failure policy applies.",
  source: "Source", cumulative: "Cumulative meter", estimated: "Estimated from flow",
  lastNotifications: "Last 10 notifications", recipient: "Recipient", event: "Event", deliveryStatus: "Delivery status", sent: "Sent", failed: "Failed", notificationFailure: "Failure", notificationWarning: "Warning", notificationSuccess: "Success", notificationLowBattery: "Low battery", notificationTest: "Test", noNotificationHistory: "No notifications have been sent yet.",
});
Object.assign(WM_TRANSLATIONS.el, {
  preview: "Προεπισκόπηση απόφασης", refreshPreview: "Νέος υπολογισμός", willWater: "Θα ποτίσει", willNotWater: "Δεν θα ποτίσει",
  decisionGates: "Έλεγχοι απόφασης", decisionInputs: "Στοιχεία υπολογισμού", expectedVolume: "Αναμενόμενος όγκος", durationBasis: "Βάση διάρκειας",
  cumulativeMeter: "Αθροιστικός μετρητής νερού", normalFlow: "Βαθμονομημένη φυσιολογική ροή", flowTolerance: "Επιτρεπτή απόκλιση ροής",
  pauseUntil: "Παύση μέχρι", pauseHelp: "Το προγραμματισμένο πότισμα παραμένει σε παύση πριν από αυτή την ημερομηνία και επανέρχεται στις 00:00 της επιλεγμένης ημέρας. Το Πότισμα τώρα παραμένει διαθέσιμο.",
  maintenanceMode: "Λειτουργία συντήρησης", maintenanceHelp: "Αναστέλλει τα προγράμματα και το κανονικό Πότισμα τώρα. Παραμένουν διαθέσιμες οι βαθμονομήσεις, οι δοκιμές ειδοποιήσεων και η ελεγχόμενη δοκιμή βάνας.",
  valveTest: "Δοκιμή βάνας", valveTestSeconds: "Διάρκεια δοκιμής βάνας", valveTestConfirm: "Η δοκιμή συντήρησης θα ανοίξει για λίγο τη βάνα. Συνέχεια;", valveTestHelp: "Ενεργοποίησε πρώτα τη Λειτουργία συντήρησης από το Πρόγραμμα.",
  year: "Έτος", all: "Όλα", exactVolume: "Ακριβείς μετρήσεις", estimatedVolume: "Εκτιμήσεις ροής",
  diagnosticWaterMeter: "Αθροιστικός μετρητής νερού", nextRun: "Επόμενο πότισμα",
  optionalSensors: "Οι αισθητήρες υγρασίας είναι προαιρετικοί. Χωρίς αισθητήρα, το Auto χρησιμοποιεί τη βασική διάρκεια, τον τρέχοντα καιρό και τα όρια ασφαλείας. Αν ένας επιλεγμένος αισθητήρας πάψει να είναι διαθέσιμος, εφαρμόζεται η πολιτική αποτυχίας αισθητήρων.",
  source: "Πηγή", cumulative: "Αθροιστικός μετρητής", estimated: "Εκτίμηση από ροή",
  lastNotifications: "10 τελευταίες ειδοποιήσεις", recipient: "Παραλήπτης", event: "Συμβάν", deliveryStatus: "Κατάσταση αποστολής", sent: "Στάλθηκε", failed: "Απέτυχε", notificationFailure: "Αποτυχία", notificationWarning: "Προειδοποίηση", notificationSuccess: "Επιτυχία", notificationLowBattery: "Χαμηλή μπαταρία", notificationTest: "Δοκιμή", noNotificationHistory: "Δεν έχουν σταλεί ακόμη ειδοποιήσεις.",
});

const WM_HELP_LABELS = {
  mode: "mode", base_duration: "baseDuration", conflict_duration: "conflictDuration",
  dry_threshold: "dryThreshold", wet_threshold: "wetThreshold",
  weather_sensitivity: "weatherSensitivity", rain_exposure: "rainExposure", sensor_max_age_minutes: "maxSensorAge",
  sensor_failure: "failureMode", minimum_duration: "minDuration",
  maximum_duration: "maxDuration", minimum_interval_hours: "minimumInterval",
  soak_cycles: "soakCycles", soak_pause_minutes: "soakPause", valve_entity: "valve", battery_sensor: "battery", battery_low_threshold: "batteryLowThreshold",
  weather_entity: "weather", moisture_sensor_1: "moisture1", moisture_sensor_2: "moisture2", soil_temperature_sensor: "soilTemperature1", soil_temperature_sensor_2: "soilTemperature2",
  flow_sensor: "flow", flow_minimum: "flowMinimum",
  flow_maximum: "flowMaximum", flow_grace_seconds: "flowGrace",
  emergency_max_runtime: "emergencyRuntime", valve_confirmation_seconds: "valveConfirmation",
  leak_flow_threshold: "leakFlow", notification_service: "notificationService",
  post_check_delay_minutes: "postCheckDelay", post_check_min_increase: "postCheckIncrease",
  flow_calibration_seconds: "flowCalibrationSeconds", duration_calibration_minutes: "durationCalibrationMinutes",
  duration_calibration_wait_minutes: "durationCalibrationWait",
};

const WM_HELP = {
  mode: {
    el: "Manual: το προγραμματισμένο και το άμεσο πότισμα χρησιμοποιούν τη σταθερή Διάρκεια Manual. Auto: πριν ανοίξει η βάνα, το σύστημα ελέγχει την υγρασία χώματος, τον τρέχοντα καιρό και τα όρια ασφαλείας. Μπορεί να αλλάξει τη διάρκεια ή να παραλείψει εντελώς το πότισμα. Το κουμπί «Πότισμα τώρα» εκτελεί πάντα τη χειροκίνητη διάρκεια.",
    en: "Manual: scheduled and immediate watering use the fixed Manual duration. Auto evaluates soil moisture, current weather and safety limits before opening the valve. It may adjust or completely skip watering. Run now always uses the manual duration.",
  },
  base_duration: {
    el: "Ο βασικός χρόνος που συνήθως χρειάζεται το συγκεκριμένο σύστημα για να μετατρέψει το χώμα από στεγνό σε σωστά υγρό. Είναι η αρχική διάρκεια του Auto και στη συνέχεια διορθώνεται από τις μετρήσεις και τον καιρό.",
    en: "The usual time this irrigation system needs to bring dry soil to a properly moist level. Auto starts from this duration and then adjusts it using sensor and weather data.",
  },
  conflict_duration: {
    el: "Η σύντομη διάρκεια ασφαλείας όταν ο ένας αισθητήρας δείχνει στεγνό χώμα και ο άλλος υγρό. Ποτίζει λίγο ώστε να προστατεύσει την πιο στεγνή γλάστρα χωρίς να υπερποτίσει την ήδη υγρή.",
    en: "The short safety duration used when one soil sensor is dry and the other is wet. It protects the drier pot without heavily watering the pot that is already moist.",
  },
  dry_threshold: {
    el: "Κάτω από αυτό το ποσοστό το χώμα θεωρείται στεγνό. Ρύθμισέ το σύμφωνα με τη βαθμονόμηση των αισθητήρων και τις ανάγκες των φυτών σου.",
    en: "Below this percentage the soil is considered dry. Set it according to your sensor calibration and the needs of your plants.",
  },
  wet_threshold: {
    el: "Σε αυτό το ποσοστό ή υψηλότερα το χώμα θεωρείται αρκετά υγρό και το Auto παραλείπει το πότισμα. Πρέπει να είναι μεγαλύτερο από το Όριο στεγνού.",
    en: "At or above this percentage the soil is considered sufficiently wet and Auto skips watering. It must be higher than the dry threshold.",
  },
  weather_sensitivity: {
    el: "Ορίζει πόσο έντονα ο τρέχων καιρός επηρεάζει τη διάρκεια. 0% αγνοεί τον καιρό, 100% εφαρμόζει τη μέγιστη διόρθωση. Ο καιρός είναι διορθωτικός παράγοντας και δεν αποδεικνύει ότι έβρεξε στις γλάστρες.",
    en: "Controls how strongly current weather affects duration. 0% ignores weather and 100% applies the maximum correction. Weather is only an adjustment and does not prove that rain reached the pots.",
  },
  rain_exposure: {
    el: "Βρέχεται: όταν το weather entity δείχνει βροχή, το Auto μειώνει τη διάρκεια. Σε υπόστεγο: αγνοείται μόνο η μείωση λόγω βροχής, επειδή το νερό μπορεί να μη φτάνει στις γλάστρες. Η θερμοκρασία και η ηλιοφάνεια συνεχίζουν να επηρεάζουν τη διάρκεια.",
    en: "Exposed to rain: Auto reduces duration when the weather entity reports rain. Sheltered: only the rain reduction is ignored because rain may not reach the pots. Temperature and sunshine still affect duration.",
  },
  sensor_max_age_minutes: {
    el: "Η μέγιστη ηλικία μιας μέτρησης υγρασίας για να θεωρείται αξιόπιστη. Παλαιότερη μέτρηση χαρακτηρίζεται μη διαθέσιμη και εφαρμόζεται η ρύθμιση αποτυχίας αισθητήρων.",
    en: "The maximum age of a soil-moisture reading before it is considered unreliable. Older readings are treated as unavailable and the sensor-failure rule is applied.",
  },
  sensor_failure: {
    el: "Καθορίζει τι θα γίνει όταν κανένας αισθητήρας υγρασίας δεν δίνει έγκυρη, πρόσφατη μέτρηση. «Παράλειψη» δεν ποτίζει. «Χρήση βασικής διάρκειας» ποτίζει με τον βασικό χρόνο, μέσα στα όρια ασφαλείας.",
    en: "Controls what happens when neither soil sensor provides a valid recent reading. Skip watering does not run. Use base duration waters for the configured base time within the safety limits.",
  },
  minimum_duration: {
    el: "Η μικρότερη διάρκεια που επιτρέπεται να επιλέξει το Auto όταν αποφασίσει ότι χρειάζεται πότισμα. Δεν επηρεάζει τις αποφάσεις πλήρους παράλειψης.",
    en: "The shortest duration Auto may select after deciding that watering is needed. It does not affect decisions that skip watering entirely.",
  },
  maximum_duration: {
    el: "Το ανώτατο όριο διάρκειας που δεν επιτρέπεται να ξεπεράσει το Auto, ακόμη και αν το χώμα είναι πολύ στεγνό ή ο καιρός αυξάνει την ανάγκη.",
    en: "The maximum duration Auto may use, even when the soil is very dry or weather conditions increase demand.",
  },
  minimum_interval_hours: {
    el: "Ο ελάχιστος χρόνος που πρέπει να περάσει από το προηγούμενο πότισμα πριν επιτραπεί νέο αυτόματο πότισμα. Προστατεύει από επαναλαμβανόμενες εκκινήσεις.",
    en: "The minimum time that must pass after the previous run before another automatic watering is allowed. It prevents repeated runs.",
  },
  soak_cycles: {
    el: "Χωρίζει τη συνολική διάρκεια σε μικρότερους κύκλους. Χρήσιμο όταν το χώμα απορροφά αργά ή το νερό τείνει να ξεχειλίζει από τη γλάστρα.",
    en: "Splits the total duration into shorter watering cycles. Useful when soil absorbs water slowly or water tends to overflow the pot.",
  },
  soak_pause_minutes: {
    el: "Ο χρόνος αναμονής ανάμεσα στους κύκλους, ώστε το νερό να προλάβει να απορροφηθεί. Δεν προσμετράται στην πραγματική διάρκεια που η βάνα είναι ανοιχτή.",
    en: "The waiting time between cycles so water can soak into the soil. It is not counted as actual valve-open watering time.",
  },
  valve_entity: {
    el: "Το entity που ανοίγει και κλείνει το νερό. Δέχεται valve, switch ή input_boolean. Είναι υποχρεωτικό για να εκτελεστεί πότισμα.",
    en: "The entity that opens and closes the water supply. It may be a valve, switch or input_boolean and is required to run watering.",
  },
  battery_sensor: {
    el: "Προαιρετικός αριθμητικός αισθητήρας στάθμης μπαταρίας της βάνας, συνήθως σε %. Αν δεν επιλεγεί, η εφαρμογή δεν εμφανίζει μπαταρία και δεν εκτελεί σχετικό έλεγχο ή ειδοποίηση. Η μέτρηση δεν αλλάζει ποτέ τη διάρκεια ποτίσματος.",
    en: "Optional numeric battery-level sensor for the valve, normally reported in %. If none is selected, battery display, checks and alerts are disabled. This reading never changes watering duration.",
  },
  battery_low_threshold: {
    el: "Στο όριο αυτό ή χαμηλότερα η μπαταρία θεωρείται χαμηλή. Η εφαρμογή ειδοποιεί μία φορά όταν η στάθμη περάσει το όριο και οπλίζει ξανά την ειδοποίηση μόνο αφού η μπαταρία ανακάμψει πάνω από αυτό.",
    en: "At or below this level the battery is considered low. The app notifies once when the level crosses the threshold and rearms the alert only after the battery recovers above it.",
  },
  weather_entity: {
    el: "Το weather entity του Home Assistant από το οποίο διαβάζονται η τρέχουσα κατάσταση και η θερμοκρασία. Χρησιμοποιείται μόνο ως διόρθωση της διάρκειας στο Auto.",
    en: "The Home Assistant weather entity used for current conditions and temperature. Auto uses it only to adjust watering duration.",
  },
  moisture_sensor_1: {
    el: "Ο πρώτος αισθητήρας υγρασίας χώματος. Πρέπει να επιστρέφει αριθμητική τιμή ποσοστού. Τοποθέτησέ τον σε αντιπροσωπευτική γλάστρα και όχι ακριβώς δίπλα στον σταλάκτη.",
    en: "The first soil-moisture sensor. It must provide a numeric percentage. Place it in a representative pot and not directly beside the dripper.",
  },
  moisture_sensor_2: {
    el: "Ο δεύτερος ανεξάρτητος αισθητήρας υγρασίας. Επιτρέπει στο σύστημα να εντοπίζει άνισο πότισμα. Αν διαφωνεί με τον πρώτο, χρησιμοποιείται η σύντομη διάρκεια ασφαλείας.",
    en: "The second independent soil-moisture sensor. It helps detect uneven watering. If it disagrees with the first sensor, the short safety duration is used.",
  },
  soil_temperature_sensor: {
    el: "Το entity θερμοκρασίας που αντιστοιχεί στον πρώτο αισθητήρα υγρασίας χώματος. Εμφανίζεται στην Επισκόπηση και υπολογίζεται χωριστά στα Στατιστικά. Η τιμή είναι μόνο ενημερωτική και δεν επηρεάζει την απόφαση ή τη διάρκεια ποτίσματος.",
    en: "The temperature entity associated with the first soil-moisture sensor. It is shown in Overview and calculated separately in Statistics. The value is informational only and never affects the watering decision or duration.",
  },
  soil_temperature_sensor_2: {
    el: "Το entity θερμοκρασίας που αντιστοιχεί στον δεύτερο αισθητήρα υγρασίας χώματος. Εμφανίζεται στην Επισκόπηση και υπολογίζεται χωριστά στα Στατιστικά. Η τιμή είναι μόνο ενημερωτική και δεν επηρεάζει την απόφαση ή τη διάρκεια ποτίσματος.",
    en: "The temperature entity associated with the second soil-moisture sensor. It is shown in Overview and calculated separately in Statistics. The value is informational only and never affects the watering decision or duration.",
  },
  flow_sensor: {
    el: "Προαιρετικός αισθητήρας τρέχουσας ροής νερού. Χρησιμοποιείται για ανίχνευση κλειστής παροχής, βουλώματος ή υπερβολικής ροής/διαρροής. Για να υπολογίζεται και ο όγκος νερού στα Στατιστικά, πρέπει να δίνει ρυθμό ροής σε L/min, L/h, m³/h, m³/min, gal/min ή gal/h.",
    en: "Optional current water-flow sensor used to detect a closed supply, blockage, excessive flow or a leak. To calculate water volume in Statistics, it must report a flow rate in L/min, L/h, m³/h, m³/min, gal/min or gal/h.",
  },
  flow_minimum: {
    el: "Η χαμηλότερη αποδεκτή τιμή ροής αφού ανοίξει η βάνα. Χρησιμοποίησε την ίδια μονάδα που δίνει ο αισθητήρας. Κάτω από αυτήν το πότισμα σταματά ως αποτυχία.",
    en: "The lowest acceptable flow after the valve opens. Use the same unit as the sensor. Below this value the run stops as a failure.",
  },
  flow_maximum: {
    el: "Η υψηλότερη ασφαλής τιμή ροής, στην ίδια μονάδα με τον αισθητήρα. Μεγαλύτερη τιμή θεωρείται πιθανή διαρροή και το πότισμα διακόπτεται.",
    en: "The highest safe flow value, using the sensor's unit. A higher reading is treated as a possible leak and watering is stopped.",
  },
  flow_grace_seconds: {
    el: "Πόσα δευτερόλεπτα περιμένει το σύστημα μετά το άνοιγμα της βάνας πριν ελέγξει τη ροή. Δίνει χρόνο στη σωλήνωση να γεμίσει και στον αισθητήρα να ενημερωθεί.",
    en: "How many seconds the system waits after opening the valve before checking flow. This allows the pipework to fill and the sensor to update.",
  },
  emergency_max_runtime: {
    el: "Ανεξάρτητο ανώτατο όριο συνεχόμενου ανοίγματος της βάνας. Αν οποιοσδήποτε κύκλος το ξεπεράσει, η εκτέλεση απορρίπτεται πριν ανοίξει το νερό.",
    en: "Independent maximum continuous valve-open time. A cycle longer than this is rejected before water is opened.",
  },
  valve_confirmation_seconds: {
    el: "Χρόνος αναμονής μετά την εντολή κλεισίματος πριν ελεγχθεί η πραγματική κατάσταση της βάνας. Αν δεν είναι κλειστή, γίνεται δεύτερη προσπάθεια και μετά κρίσιμη ειδοποίηση.",
    en: "Delay after the close command before checking the actual valve state. If it is not closed, the app retries once and then raises a critical alert.",
  },
  leak_flow_threshold: {
    el: "Η μεγαλύτερη επιτρεπτή ένδειξη του αισθητήρα ροής αφού κλείσει η βάνα. Μεγαλύτερη τιμή θεωρείται πιθανή διαρροή. Χρησιμοποιεί τη μονάδα του αισθητήρα.",
    en: "Highest permitted flow reading after the valve closes. A higher value is treated as a possible leak. Uses the sensor's own unit.",
  },
  notification_service: {
    el: "Η συσκευή ή υπηρεσία που θα λαμβάνει τις ειδοποιήσεις του συγκεκριμένου παραλήπτη. Προτίμησε notify entity όταν υπάρχει. Υποστηρίζονται επίσης παλαιότερα services όπως notify.mobile_app_phone.",
    en: "The device or service used for this recipient. Prefer a notify entity when available. Older services such as notify.mobile_app_phone are also supported.",
  },
  post_check_delay_minutes: {
    el: "Πόσο περιμένει μετά το πότισμα ώστε το νερό να διαχυθεί στο χώμα πριν ξαναδιαβάσει τους αισθητήρες.",
    en: "How long to wait after watering for water to spread through the soil before reading the sensors again.",
  },
  post_check_min_increase: {
    el: "Η ελάχιστη αύξηση σε ποσοστιαίες μονάδες που πρέπει να δει ξεχωριστά κάθε διαθέσιμος αισθητήρας. Μικρότερη αύξηση δημιουργεί προειδοποίηση άνισου ή ανεπαρκούς ποτίσματος.",
    en: "Minimum percentage-point increase required independently from every available sensor. A smaller increase warns of uneven or insufficient watering.",
  },
  flow_calibration_seconds: {
    el: "Διάρκεια της ελεγχόμενης δοκιμής ροής. Η εφαρμογή παίρνει πολλά δείγματα και προτείνει κατώτερο και ανώτερο ασφαλές όριο.",
    en: "Duration of the controlled flow test. The app takes multiple samples and suggests lower and upper safe limits.",
  },
  duration_calibration_minutes: {
    el: "Σύντομος δοκιμαστικός παλμός νερού για να μετρηθεί πόσο γρήγορα αυξάνεται η υγρασία. Η πρόταση δεν εφαρμόζεται χωρίς επιβεβαίωση.",
    en: "Short test pulse used to measure how quickly moisture rises. The recommendation is never applied without confirmation.",
  },
  duration_calibration_wait_minutes: {
    el: "Αναμονή μετά τον δοκιμαστικό παλμό πριν διαβαστεί ξανά η υγρασία, ώστε η μέτρηση να μη γίνεται μόνο στο άμεσο σημείο του σταλάκτη.",
    en: "Wait after the test pulse before moisture is read again, so the measurement is not limited to the immediate dripper area.",
  },
};

Object.assign(WM_HELP_LABELS, {
  water_meter_sensor:"cumulativeMeter", normal_flow_rate:"normalFlow",
  flow_tolerance_percent:"flowTolerance", paused_until:"pauseUntil", maintenance_mode:"maintenanceMode",
  valve_test_seconds:"valveTestSeconds",
  post_check_enabled:"postCheckEnabled",
});
Object.assign(WM_HELP, {
  water_meter_sensor:{el:"Αθροιστικός μετρητής όγκου σε L, m³, mL, gal ή ft³. Η διαφορά αρχής–τέλους δίνει τον ακριβέστερο όγκο και έχει προτεραιότητα από την εκτίμηση ροής.",en:"Cumulative volume meter in L, m³, mL, gal or ft³. The start-to-end difference provides the most accurate volume and takes priority over flow estimates."},
  normal_flow_rate:{el:"Φυσιολογική ροή σε L/min που προκύπτει από τη βαθμονόμηση. Χρησιμοποιείται για εκτίμηση όγκου και ανίχνευση απόκλισης.",en:"Normal flow in L/min established by calibration. It is used for volume estimates and deviation detection."},
  flow_tolerance_percent:{el:"Επιτρεπτή ποσοστιαία απόκλιση γύρω από τη φυσιολογική ροή. Εκτός ορίων η εκτέλεση σταματά ως πιθανό βούλωμα, κλειστή παροχή ή διαρροή.",en:"Allowed percentage deviation around normal flow. Outside this band the run stops as a possible blockage, closed supply or leak."},
  paused_until:{el:WM_TRANSLATIONS.el.pauseHelp,en:WM_TRANSLATIONS.en.pauseHelp},
  maintenance_mode:{el:WM_TRANSLATIONS.el.maintenanceHelp,en:WM_TRANSLATIONS.en.maintenanceHelp},
  valve_test_seconds:{el:"Σύντομος ελεγχόμενος παλμός βάνας, από 2 έως 60 δευτερόλεπτα, με watchdog, έλεγχο ροής και επιβεβαίωση κλεισίματος.",en:"Short controlled valve pulse from 2 to 60 seconds with watchdog, flow validation and verified closure."},
  post_check_enabled:{el:"Μετά το πότισμα περιμένει τον χρόνο απορρόφησης και συγκρίνει ξανά κάθε διαθέσιμο αισθητήρα υγρασίας. Προειδοποιεί αν η αύξηση είναι μικρότερη από το όριο.",en:"After watering, waits for absorption and compares every available moisture sensor again. It warns if the increase is below the threshold."},
});

class WateringManagerPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.state = { systems: [], logs: [], active_system_ids: [] };
    this.selectedId = null;
    this.tab = "overview";
    this.statsRange = "week";
    this.previewData = null;
    this.loading = true;
    this.language = localStorage.getItem("watering-manager-language") || null;
  }

  set hass(value) {
    const first = !this._hass;
    this._hass = value;
    if (first) {
      if (!this.language) this.language = (value.language || "en").startsWith("el") ? "el" : "en";
      this.loadState();
    }
  }

  get hass() { return this._hass; }

  connectedCallback() {
    this.render();
    this._timer = setInterval(() => this.loadState(false), 15000);
  }

  disconnectedCallback() { clearInterval(this._timer); }

  t(key) { return WM_TRANSLATIONS[this.language]?.[key] || WM_TRANSLATIONS.en[key] || key; }

  async call(type, data = {}) {
    return this.hass.connection.sendMessagePromise({ type: `watering_manager/${type}`, ...data });
  }

  async loadState(render = true) {
    if (!this.hass) return;
    try {
      this.state = await this.call("get_state");
      if (!this.selectedId && this.state.systems.length) this.selectedId = this.state.systems[0].id;
      if (this.selectedId && !this.state.systems.some((item) => item.id === this.selectedId)) {
        this.selectedId = this.state.systems[0]?.id || null;
      }
      this.loading = false;
      if (render) this.render();
      else this.updateLiveStatus();
    } catch (error) {
      this.loading = false;
      this.message(error.message || String(error), true);
    }
  }

  get system() { return this.state.systems.find((item) => item.id === this.selectedId); }
  get isAdmin() { return Boolean(this.hass?.user?.is_admin); }
  esc(value) { return String(value ?? "").replace(/[&<>'"]/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[c]); }

  render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `<style>${this.styles()}</style>${this.layout()}`;
    this.bindEvents();
  }

  layout() {
    return `
      <div class="app">
        <header>
          <div class="brand"><ha-icon icon="mdi:sprinkler-variant"></ha-icon><div><h1>${this.t("app")} <span class="version-badge">v${WM_VERSION}</span></h1><small>${this.state.systems.length} ${this.t("systemsCount")}</small></div></div>
          <div class="header-actions">
            <select id="language" aria-label="${this.t("language")}"><option value="el" ${this.language === "el" ? "selected" : ""}>Ελληνικά</option><option value="en" ${this.language === "en" ? "selected" : ""}>English</option></select>
            <button class="icon" id="refresh" title="${this.t("refresh")}"><ha-icon icon="mdi:refresh"></ha-icon></button>
            ${this.isAdmin ? `<button class="primary" id="new-system"><ha-icon icon="mdi:plus"></ha-icon>${this.t("newSystem")}</button>` : ""}
          </div>
        </header>
        ${this.loading ? `<div class="loading"><ha-circular-progress active></ha-circular-progress></div>` : this.mainContent()}
        <div id="toast" class="toast"></div>
      </div>`;
  }

  mainContent() {
    if (!this.state.systems.length) {
      return `<section class="empty"><ha-icon icon="mdi:sprinkler-variant"></ha-icon><h2>${this.t("noSystems")}</h2>${this.isAdmin ? `<button class="primary" id="create-first">${this.t("createFirst")}</button>` : `<p>${this.t("adminOnly")}</p>`}</section>`;
    }
    const system = this.system;
    return `
      <div class="workspace">
        <aside>
          <label>${this.t("selectSystem")}</label>
          <select id="system-select">${this.state.systems.map((item) => `<option value="${item.id}" ${item.id === this.selectedId ? "selected" : ""}>${this.esc(item.name)}</option>`).join("")}</select>
          <nav>${["overview","schedule","automatic","hardware","notifications","preview","diagnostics","statistics","logs"].map((tab) => `<button data-tab="${tab}" class="${this.tab === tab ? "active" : ""}"><ha-icon icon="${this.tabIcon(tab)}"></ha-icon>${this.t(tab)}</button>`).join("")}</nav>
          <div class="aside-status"><span class="dot ${this.state.active_system_ids.includes(system.id) ? "on" : ""}"></span>${this.state.active_system_ids.includes(system.id) ? this.t("running") : this.t("idle")}</div>
        </aside>
        <main>
          <div class="title-row"><div><h2>${this.esc(system.name)}</h2><p>${system.mode === "auto" ? this.t("auto") : this.t("manual")} · ${system.enabled ? this.t("enabled") : "Off"}</p></div>${this.actionButtons(system)}</div>
          ${this.tabContent(system)}
        </main>
      </div>`;
  }

  actionButtons(system) {
    if (!this.isAdmin) return "";
    const running = this.state.active_system_ids.includes(system.id);
    const editable = ["schedule", "automatic", "hardware", "notifications", "diagnostics"].includes(this.tab);
    return `<div class="actions">${running ? `<button class="danger" id="stop"><ha-icon icon="mdi:stop"></ha-icon>${this.t("stop")}</button>` : system.maintenance_mode ? "" : `<button id="run"><ha-icon icon="mdi:play"></ha-icon>${this.t("runNow")}</button>`}${editable ? `<button class="primary" id="save"><ha-icon icon="mdi:content-save"></ha-icon>${this.t("save")}</button>` : ""}<button class="icon danger-text" id="delete"><ha-icon icon="mdi:delete-outline"></ha-icon></button></div>`;
  }

  tabIcon(tab) { return ({overview:"mdi:view-dashboard-outline",schedule:"mdi:calendar-clock",automatic:"mdi:auto-fix",hardware:"mdi:chip",notifications:"mdi:bell-outline",preview:"mdi:file-search-outline",diagnostics:"mdi:heart-pulse",statistics:"mdi:chart-bar",logs:"mdi:format-list-bulleted"})[tab]; }

  tabContent(system) {
    if (this.tab === "overview") return this.overview(system);
    if (this.tab === "schedule") return this.schedule(system);
    if (this.tab === "automatic") return this.automatic(system);
    if (this.tab === "hardware") return this.hardware(system);
    if (this.tab === "notifications") return this.notifications(system);
    if (this.tab === "preview") return this.preview(system);
    if (this.tab === "diagnostics") return this.diagnostics(system);
    if (this.tab === "statistics") return this.statistics(system);
    return this.logs(system);
  }

  overview(system) {
    const running = this.state.active_system_ids.includes(system.id);
    const battery = this.entityValueWithUnit(system.battery_sensor);
    const weather = this.weatherSummary(system.weather_entity);
    const sensors = [
      this.soilSensorCard(1, system.moisture_sensor_1, system.soil_temperature_sensor),
      this.soilSensorCard(2, system.moisture_sensor_2, system.soil_temperature_sensor_2),
    ].filter(Boolean).join("");
    const environment = [
      system.weather_entity ? this.overviewMetric(weather.icon, this.t("weather"), weather.text) : "",
      system.battery_sensor ? this.overviewMetric("mdi:battery", this.t("batteryLevel"), battery) : "",
    ].filter(Boolean).join("");
    return `<div class="overview-view">
      <section class="card overview-hero ${running ? "active" : ""}">
        <div class="overview-status-icon"><ha-icon icon="${running ? "mdi:water-pump" : "mdi:sprinkler-variant"}"></ha-icon></div>
        <div class="overview-status-copy"><small>${this.t("currentStatus")}</small><strong>${this.t(running ? "running" : "idle")}</strong><span>${this.t(system.mode === "auto" ? "auto" : "manual")} · ${system.enabled ? this.t("enabled") : "Off"}</span></div>
        <span class="overview-status-pill ${system.enabled ? "enabled" : ""}"><span></span>${system.enabled ? this.t("enabled") : "Off"}</span>
      </section>
      ${sensors ? `<section class="overview-section"><div class="overview-section-title"><ha-icon icon="mdi:sprout-outline"></ha-icon><h3>${this.t("sensorValues")}</h3></div><div class="sensor-card-grid">${sensors}</div></section>` : ""}
      ${environment ? `<section class="overview-section"><div class="overview-section-title"><ha-icon icon="mdi:weather-partly-cloudy"></ha-icon><h3>${this.t("environment")}</h3></div><div class="overview-metric-grid">${environment}</div></section>` : ""}
      <section class="overview-section"><div class="overview-section-title"><ha-icon icon="mdi:history"></ha-icon><h3>${this.t("wateringSummary")}</h3></div><div class="card watering-summary">
        ${this.overviewMetric("mdi:clock-outline", this.t("lastRun"), system.last_run_at ? this.formatDate(system.last_run_at) : "—")}
        ${this.overviewMetric("mdi:timer-outline", this.t("lastDuration"), system.last_duration == null ? "—" : `${system.last_duration} ${this.t("minutes")}`)}
        ${this.overviewMetric("mdi:head-question-outline", this.t("lastReason"), this.reason(system.last_reason))}
      </div></section>
      <section class="card overview-mode-info"><ha-icon icon="mdi:information-outline"></ha-icon><p>${this.t("modeHelp")}</p></section>
    </div>`;
  }

  soilSensorCard(index, moistureEntity, temperatureEntity) {
    if (!moistureEntity && !temperatureEntity) return "";
    const moisture = moistureEntity ? this.entityValueWithUnit(moistureEntity) : null;
    const temperature = temperatureEntity ? this.entityValueWithUnit(temperatureEntity) : null;
    return `<article class="card soil-sensor-card"><header><span><ha-icon icon="mdi:flower-outline"></ha-icon></span><div><small>${this.t("sensorValues")}</small><strong>${this.t(index === 1 ? "sensorOne" : "sensorTwo")}</strong></div></header><div class="soil-reading-grid">
      ${moistureEntity ? `<div class="soil-reading moisture"><ha-icon icon="mdi:water-percent"></ha-icon><div><small>${this.t(index === 1 ? "moisture1" : "moisture2")}</small><strong>${this.esc(moisture)}</strong></div></div>` : ""}
      ${temperatureEntity ? `<div class="soil-reading temperature"><ha-icon icon="mdi:thermometer-lines"></ha-icon><div><small>${this.t(index === 1 ? "soilTemperature1" : "soilTemperature2")}</small><strong>${this.esc(temperature)}</strong></div></div>` : ""}
    </div></article>`;
  }

  overviewMetric(icon, label, value) { return `<div class="overview-metric"><span class="overview-metric-icon"><ha-icon icon="${icon}"></ha-icon></span><div><small>${label}</small><strong>${this.esc(value)}</strong></div></div>`; }

  stat(icon, label, value) { return `<section class="card stat"><ha-icon icon="${icon}"></ha-icon><div><small>${label}</small><strong>${this.esc(value)}</strong></div></section>`; }

  schedule(system) {
    const days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
    return `<form id="settings-form"><section class="card form-card"><div class="fields two">
      ${this.input("name", this.t("name"), system.name, "text")}
      ${this.selectField("mode", this.t("mode"), system.mode, [["manual",this.t("manual")],["auto",this.t("auto")]])}
      ${this.input("start_time", this.t("startTime"), system.start_time, "time")}
      ${this.number("manual_duration", this.t("manualDuration"), system.manual_duration, 1, 240, this.t("minutes"))}
      ${this.input("paused_until", this.t("pauseUntil"), system.paused_until || "", "date")}
    </div>
    <label class="toggle"><input name="enabled" type="checkbox" ${system.enabled ? "checked" : ""}><span class="toggle-track"></span><span class="toggle-text">${this.t("enabled")}</span></label>
    <div class="field">${this.fieldLabel("maintenance_mode", this.t("maintenanceMode"))}<label class="toggle"><input name="maintenance_mode" type="checkbox" ${system.maintenance_mode ? "checked" : ""}><span class="toggle-track"></span><span class="toggle-text">${this.t("enabled")}</span></label></div>
    <div class="field"><label>${this.t("days")}</label><div class="days">${days.map((day, index) => `<label><input type="checkbox" name="days" value="${index}" ${system.days.includes(index) ? "checked" : ""}><span>${this.t(day)}</span></label>`).join("")}</div></div>
    <div class="info-line"><ha-icon icon="mdi:information-outline"></ha-icon>${this.t("modeHelp")}</div>
    <div class="info-line"><ha-icon icon="mdi:pause-circle-outline"></ha-icon>${this.t("pauseHelp")}</div>
    <div class="info-line"><ha-icon icon="mdi:tools"></ha-icon>${this.t("maintenanceHelp")}</div>
    ${this.textarea("notes", this.t("notes"), system.notes)}</section></form>`;
  }

  automatic(system) {
    return `<form id="settings-form" class="automatic-form"><div class="grid automatic-grid">
      <section class="card form-card"><h3>${this.t("automatic")}</h3><div class="fields two">
        ${this.number("base_duration", this.t("baseDuration"), system.base_duration, 1, 240, this.t("minutes"))}
        ${this.number("conflict_duration", this.t("conflictDuration"), system.conflict_duration, 1, 60, this.t("minutes"))}
        ${this.number("dry_threshold", this.t("dryThreshold"), system.dry_threshold, 0, 100, "%")}
        ${this.number("wet_threshold", this.t("wetThreshold"), system.wet_threshold, 0, 100, "%")}
        ${this.number("weather_sensitivity", this.t("weatherSensitivity"), system.weather_sensitivity, 0, 100, "%")}
        ${this.selectField("rain_exposure", this.t("rainExposure"), system.rain_exposure || "exposed", [["exposed",this.t("exposed")],["sheltered",this.t("sheltered")]])}
        ${this.number("sensor_max_age_minutes", this.t("maxSensorAge"), system.sensor_max_age_minutes, 5, 1440, this.t("minutes"))}
        ${this.selectField("sensor_failure", this.t("failureMode"), system.sensor_failure, [["skip",this.t("skip")],["base_duration",this.t("useBase")]])}
      </div><div class="info-line"><ha-icon icon="mdi:weather-partly-cloudy"></ha-icon>${this.t("weatherInfo")}</div><div class="info-line"><ha-icon icon="mdi:alert-circle-outline"></ha-icon>${this.t("sensorConflict")}</div><div class="info-line"><ha-icon icon="mdi:information-outline"></ha-icon>${this.t("optionalSensors")}</div></section>
      <section class="card form-card"><h3>${this.t("safety")}</h3><div class="fields two">
        ${this.number("minimum_duration", this.t("minDuration"), system.minimum_duration, 1, 60, this.t("minutes"))}
        ${this.number("maximum_duration", this.t("maxDuration"), system.maximum_duration, 1, 240, this.t("minutes"))}
        ${this.number("minimum_interval_hours", this.t("minimumInterval"), system.minimum_interval_hours, 0, 168, this.t("hours"))}
        ${this.number("soak_cycles", this.t("soakCycles"), system.soak_cycles, 1, 10, "")}
        ${this.number("soak_pause_minutes", this.t("soakPause"), system.soak_pause_minutes, 0, 60, this.t("minutes"))}
        ${this.number("emergency_max_runtime", this.t("emergencyRuntime"), system.emergency_max_runtime, 1, 240, this.t("minutes"))}
        ${this.number("valve_confirmation_seconds", this.t("valveConfirmation"), system.valve_confirmation_seconds, 1, 60, "sec")}
        ${this.number("leak_flow_threshold", this.t("leakFlow"), system.leak_flow_threshold, 0, 10000, "")}
      </div></section>
      <section class="card form-card"><h3>${this.t("postCheck")}</h3>
        <div class="field">${this.fieldLabel("post_check_enabled", this.t("postCheckEnabled"))}<label class="toggle"><input name="post_check_enabled" type="checkbox" ${system.post_check_enabled ? "checked" : ""}><span class="toggle-track"></span><span class="toggle-text">${this.t("enabled")}</span></label></div>
        <div class="fields two">
          ${this.number("post_check_delay_minutes", this.t("postCheckDelay"), system.post_check_delay_minutes, 1, 1440, this.t("minutes"))}
          ${this.number("post_check_min_increase", this.t("postCheckIncrease"), system.post_check_min_increase, 0, 100, "%")}
        </div>
      </section>
    </div></form>`;
  }

  hardware(system) {
    return `<form id="settings-form"><section class="card form-card"><h3>${this.t("hardware")}</h3><p class="muted">${this.t("entityHelp")}</p><div class="fields two">
      ${this.entityField("valve_entity", this.t("valve"), system.valve_entity, ["switch","valve","input_boolean"])}
      ${this.entityField("battery_sensor", this.t("battery"), system.battery_sensor, ["sensor"])}
      ${this.number("battery_low_threshold", this.t("batteryLowThreshold"), system.battery_low_threshold, 0, 100, "%")}
      ${this.entityField("weather_entity", this.t("weather"), system.weather_entity, ["weather"])}
      ${this.entityField("moisture_sensor_1", this.t("moisture1"), system.moisture_sensor_1, ["sensor"])}
      ${this.entityField("moisture_sensor_2", this.t("moisture2"), system.moisture_sensor_2, ["sensor"])}
      ${this.entityField("soil_temperature_sensor", this.t("soilTemperature1"), system.soil_temperature_sensor, ["sensor"])}
      ${this.entityField("soil_temperature_sensor_2", this.t("soilTemperature2"), system.soil_temperature_sensor_2, ["sensor"])}
      ${this.entityField("flow_sensor", this.t("flow"), system.flow_sensor, ["sensor"])}
      ${this.entityField("water_meter_sensor", this.t("cumulativeMeter"), system.water_meter_sensor, ["sensor"])}
      ${this.number("normal_flow_rate", this.t("normalFlow"), system.normal_flow_rate, 0, 10000, "L/min")}
      ${this.number("flow_tolerance_percent", this.t("flowTolerance"), system.flow_tolerance_percent, 1, 100, "%")}
      ${this.number("flow_minimum", this.t("flowMinimum"), system.flow_minimum, 0, 10000, "")}
      ${this.number("flow_maximum", this.t("flowMaximum"), system.flow_maximum, 0, 10000, "")}
      ${this.number("flow_grace_seconds", this.t("flowGrace"), system.flow_grace_seconds, 1, 120, "sec")}
    </div></section></form>`;
  }

  notifications(system) {
    const history = (this.state.notification_logs || [])
      .filter((item) => item.system_id === system.id)
      .slice()
      .reverse()
      .slice(0, 10);
    return `<form id="settings-form"><div class="notifications-view">
      <section class="card form-card"><div class="section-title"><div><h3>${this.t("notifications")}</h3><p class="muted">${this.t("notificationRecipientsHelp")}</p></div>${this.isAdmin ? `<button type="button" id="add-recipient"><ha-icon icon="mdi:account-plus-outline"></ha-icon>${this.t("addRecipient")}</button>` : ""}</div>
        ${this.notificationRecipients(system.notification_targets || [])}
      </section>
      <section class="card log-card"><h3 class="table-title">${this.t("lastNotifications")}</h3>${history.length ? `<div class="table-wrap"><table><thead><tr><th>${this.t("date")}</th><th>${this.t("recipient")}</th><th>${this.t("event")}</th><th>${this.t("deliveryStatus")}</th></tr></thead><tbody>${history.map((item) => `<tr><td>${this.formatDate(item.timestamp)}</td><td><strong>${this.esc(item.recipient_name || "—")}</strong><small class="destination">${this.esc(item.destination)}</small></td><td><span class="pill ${this.esc(item.level)}">${this.notificationLevel(item.level)}</span> ${this.reason(item.reason)}</td><td><span class="pill ${item.status === "sent" ? "completed" : "failed"}">${this.t(item.status === "sent" ? "sent" : "failed")}</span>${item.error ? `<small class="destination error-text">${this.esc(item.error)}</small>` : ""}</td></tr>`).join("")}</tbody></table></div>` : `<div class="empty-notifications"><ha-icon icon="mdi:bell-sleep-outline"></ha-icon><span>${this.t("noNotificationHistory")}</span></div>`}</section>
    </div></form>`;
  }

  preview(system) {
    const item = this.previewData;
    if (!item) return `<div class="preview-view"><section class="card empty compact"><ha-icon icon="mdi:file-search-outline"></ha-icon><button class="primary" id="refresh-preview">${this.t("refreshPreview")}</button></section></div>`;
    const inputs = item.inputs || {};
    const moisture = (inputs.moisture || []).map((reading, index) => `<div class="decision-row"><span>${this.t(index ? "moisture2" : "moisture1")}</span><strong>${reading.valid ? `${reading.value}%` : this.reason(reading.reason)}</strong></div>`).join("");
    const gates = (inputs.gates || []).map((gate) => `<div class="health-row ${gate.passed ? "ok" : "error"}"><ha-icon icon="${gate.passed ? "mdi:check-circle" : "mdi:close-circle"}"></ha-icon><div><strong>${this.reason(gate.key)}</strong>${gate.detail ? `<small>${this.esc(gate.detail)}</small>` : ""}</div></div>`).join("");
    return `<div class="preview-view">
      <section class="card decision-hero ${item.will_run ? "go" : "stop"}"><ha-icon icon="${item.will_run ? "mdi:sprinkler-variant" : "mdi:water-off-outline"}"></ha-icon><div><small>${this.t("preview")}</small><strong>${this.t(item.will_run ? "willWater" : "willNotWater")}</strong><p>${this.reason(item.reason)}</p></div><button id="refresh-preview"><ha-icon icon="mdi:refresh"></ha-icon>${this.t("refreshPreview")}</button></section>
      <div class="grid stats">${this.stat("mdi:timer-outline", this.t("planned"), `${item.duration} ${this.t("minutes")}`)}${this.stat("mdi:water-outline", this.t("expectedVolume"), item.expected_volume_liters == null ? "—" : this.formatVolume(Number(item.expected_volume_liters)))}</div>
      <section class="card"><h3>${this.t("decisionGates")}</h3><div class="health-list">${gates}</div></section>
      <section class="card"><h3>${this.t("decisionInputs")}</h3><div class="decision-list">
        ${moisture}
        <div class="decision-row"><span>${this.t("weather")}</span><strong>${this.esc(inputs.weather?.condition || "—")} · ${inputs.weather?.temperature ?? "—"}° · ×${inputs.weather?.factor ?? "—"}</strong></div>
        <div class="decision-row"><span>${this.t("rainExposure")}</span><strong>${this.t(inputs.weather?.rain_exposure || "exposed")}</strong></div>
        ${inputs.battery?.entity_id ? `<div class="decision-row"><span>${this.t("batteryLevel")}</span><strong>${inputs.battery.available ? `${inputs.battery.value}${this.esc(inputs.battery.unit || "%")}${inputs.battery.low ? ` · ${this.reason("battery_low")}` : ""}` : this.reason("unavailable")}</strong></div>` : ""}
        <div class="decision-row"><span>${this.t("durationBasis")}</span><strong>${this.esc(inputs.duration_basis || "—")}</strong></div>
      </div></section>
    </div>`;
  }

  async loadPreview() {
    try { this.previewData = await this.call("preview_decision", {system_id:this.selectedId}); this.render(); }
    catch (error) { this.message(error.message || String(error), true); }
  }

  diagnostics(system) {
    const diagnostic = this.state.diagnostics?.[system.id] || {status:"warning",checks:[],pending_post_checks:0};
    const calibration = this.state.calibrations?.[system.id];
    const labels = {valve:"diagnosticValve",battery:"diagnosticBattery",moisture_1:"diagnosticMoisture1",moisture_2:"diagnosticMoisture2",soil_temperature_1:"diagnosticSoilTemperature1",soil_temperature_2:"diagnosticSoilTemperature2",weather:"diagnosticWeather",flow:"diagnosticFlow",water_meter:"diagnosticWaterMeter",notifications:"diagnosticNotifications"};
    const statusIcon = {healthy:"mdi:check-decagram",warning:"mdi:alert-outline",critical:"mdi:alert-octagon"}[diagnostic.status] || "mdi:help-circle-outline";
    let result = `<p class="muted">${this.t("noCalibration")}</p>`;
    if (calibration?.status === "running") {
      result = `<div class="calibration-progress"><ha-circular-progress active></ha-circular-progress><div><strong>${this.t("calibrationRunning")}</strong><small>${this.esc(calibration.phase)}</small></div></div>`;
    } else if (calibration?.status === "completed" && calibration.result) {
      const flowResult = calibration.kind === "flow";
      result = `<div class="calibration-result"><strong>${this.t("recommended")}: ${flowResult ? `${calibration.result.suggested_minimum}–${calibration.result.suggested_maximum} ${this.esc(calibration.result.unit || "")}` : `${calibration.result.recommended_minutes} ${this.t("minutes")}`}</strong>${flowResult ? `<small>${calibration.result.average} ${this.esc(calibration.result.unit || "")} · ${calibration.result.samples} ${this.t("samples")}</small>` : ""}${this.isAdmin ? `<button type="button" class="primary" id="apply-calibration">${this.t("applyResult")}</button>` : ""}</div>`;
    } else if (calibration?.status === "failed") {
      result = `<div class="health-row error"><ha-icon icon="mdi:alert-circle"></ha-icon><div><strong>${this.t("error")}</strong><small>${this.reason(calibration.error)}</small></div></div>`;
    }
    return `<div class="diagnostics-view">
      <section class="card health-summary ${diagnostic.status}"><ha-icon icon="${statusIcon}"></ha-icon><div><small>${this.t("health")}</small><strong>${this.t(diagnostic.status)}</strong></div><span>${this.t("pendingChecks")}: ${diagnostic.pending_post_checks || 0}</span></section>
      <section class="card"><h3>${this.t("health")}</h3><div class="health-list">${diagnostic.checks.map((check) => `<div class="health-row ${check.status}"><ha-icon icon="${check.status === "ok" ? "mdi:check-circle" : check.status === "error" ? "mdi:alert-circle" : "mdi:minus-circle-outline"}"></ha-icon><div><strong>${this.t(labels[check.key] || check.key)}</strong><small>${this.diagnosticDetail(check.detail)}</small></div></div>`).join("")}</div></section>
      <form id="settings-form"><section class="card form-card"><h3>${this.t("valveTest")}</h3>
        <div class="fields two">${this.number("valve_test_seconds", this.t("valveTestSeconds"), system.valve_test_seconds, 2, 60, "sec")}</div>
        <div class="info-line"><ha-icon icon="mdi:information-outline"></ha-icon>${this.t("valveTestHelp")}</div>
        ${this.isAdmin ? `<button type="button" id="test-valve"><ha-icon icon="mdi:pipe-valve"></ha-icon>${this.t("valveTest")}</button>` : ""}
      </section><section class="card form-card"><h3>${this.t("calibration")}</h3><div class="fields two">
        ${this.number("flow_calibration_seconds", this.t("flowCalibrationSeconds"), system.flow_calibration_seconds, 10, 120, "sec")}
        ${this.number("duration_calibration_minutes", this.t("durationCalibrationMinutes"), system.duration_calibration_minutes, 0.5, 10, this.t("minutes"))}
        ${this.number("duration_calibration_wait_minutes", this.t("durationCalibrationWait"), system.duration_calibration_wait_minutes, 1, 120, this.t("minutes"))}
      </div><div class="calibration-actions">${this.isAdmin ? `<button type="button" id="calibrate-flow"><ha-icon icon="mdi:waves-arrow-right"></ha-icon>${this.t("flowCalibration")}</button><button type="button" id="calibrate-duration"><ha-icon icon="mdi:timer-cog-outline"></ha-icon>${this.t("durationCalibration")}</button>` : ""}</div>${result}</section></form>
    </div>`;
  }

  diagnosticDetail(detail) {
    if (detail == null || detail === "") return this.t("notConfigured");
    if (typeof detail === "object") {
      if (detail.reason === "battery_low" && detail.value != null) return `${detail.value}${detail.unit || "%"} · ${this.reason(detail.reason)}`;
      if (detail.valid) return `${detail.value}${detail.unit || ""}${detail.age_minutes != null ? ` · ${detail.age_minutes} min` : ""}`;
      if ("valid" in detail) return this.reason(detail.reason);
      if (detail.value != null) return `${detail.value}${detail.unit ? ` ${detail.unit}` : ""}`;
      return this.reason(detail.reason);
    }
    return this.esc(detail);
  }

  statistics(system) {
    const now = new Date();
    let start = null;
    if (this.statsRange === "day") start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (this.statsRange === "week") start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7));
    if (this.statsRange === "month") start = new Date(now.getFullYear(), now.getMonth(), 1);
    if (this.statsRange === "year") start = new Date(now.getFullYear(), 0, 1);
    const rows = Object.values(this.state.aggregates?.[system.id] || {}).filter((row) => !start || new Date(`${row.date}T00:00:00`) >= start).sort((a,b) => a.date.localeCompare(b.date));
    const sum = (key) => rows.reduce((total, row) => total + Number(row[key] || 0), 0);
    const weighted = (sumKey, countKey) => { const count=sum(countKey); return count ? sum(sumKey)/count : null; };
    const totalMinutes = sum("duration_minutes");
    const totalLiters = sum("water_liters");
    const averageTemperature = weighted("air_temperature_sum","air_temperature_count");
    const averageSoilTemperature1 = weighted("soil_temperature_1_sum","soil_temperature_1_count");
    const averageSoilTemperature2 = weighted("soil_temperature_2_sum","soil_temperature_2_count");
    const averageMoisture1 = weighted("moisture_1_sum","moisture_1_count");
    const averageMoisture2 = weighted("moisture_2_sum","moisture_2_count");
    const soilTemperatureUnit1 = this.hass.states[system.soil_temperature_sensor]?.attributes?.unit_of_measurement || "°";
    const soilTemperatureUnit2 = this.hass.states[system.soil_temperature_sensor_2]?.attributes?.unit_of_measurement || "°";
    const completed = sum("completed"), skipped = sum("skipped"), failed = sum("failed");
    const grouped = new Map();
    rows.forEach((row) => { const key=["year","all"].includes(this.statsRange) ? row.date.slice(0,7) : row.date; grouped.set(key,(grouped.get(key)||0)+Number(row.duration_minutes||0)); });
    const buckets = [...grouped].map(([label,minutes]) => ({label,minutes}));
    const maxMinutes = Math.max(0, ...buckets.map((bucket) => bucket.minutes));
    return `<div class="statistics-view">
      <div class="range-tabs">${["day","week","month","year","all"].map((range) => `<button type="button" data-stats-range="${range}" class="${this.statsRange === range ? "active" : ""}">${this.t(range)}</button>`).join("")}</div>
      <div class="grid stats">
        ${this.stat("mdi:timer-outline", this.t("totalWateringTime"), this.formatMinutes(totalMinutes))}
        ${this.stat("mdi:water-outline", this.t("totalWaterVolume"), sum("volume_known_runs") ? this.formatVolume(totalLiters) : "—")}
        ${this.stat("mdi:thermometer", this.t("averageTemperature"), averageTemperature == null ? "—" : `${averageTemperature.toFixed(1)}°`)}
        ${this.stat("mdi:thermometer-lines", this.t("averageSoilTemperature1"), averageSoilTemperature1 == null ? "—" : `${averageSoilTemperature1.toFixed(1)} ${soilTemperatureUnit1}`)}
        ${this.stat("mdi:thermometer-lines", this.t("averageSoilTemperature2"), averageSoilTemperature2 == null ? "—" : `${averageSoilTemperature2.toFixed(1)} ${soilTemperatureUnit2}`)}
        ${this.stat("mdi:water-percent", this.t("averageMoisture1"), averageMoisture1 == null ? "—" : `${averageMoisture1.toFixed(1)}%`)}
        ${this.stat("mdi:water-percent", this.t("averageMoisture2"), averageMoisture2 == null ? "—" : `${averageMoisture2.toFixed(1)}%`)}
        ${this.stat("mdi:sprinkler-variant", this.t("wateringRuns"), String(sum("runs")))}
        ${this.stat("mdi:check-circle-outline", this.t("successfulRuns"), String(completed))}
        ${this.stat("mdi:skip-next-outline", this.t("skippedRuns"), String(skipped))}
        ${this.stat("mdi:alert-circle-outline", this.t("failedRuns"), String(failed))}
        ${this.stat("mdi:counter", this.t("exactVolume"), String(sum("exact_volume_runs")))}
        ${this.stat("mdi:approximately-equal", this.t("estimatedVolume"), String(sum("estimated_volume_runs")))}
      </div>
      <section class="card chart-card"><h3>${this.t("durationChart")}</h3>
        ${rows.length ? `<div class="chart-scroll"><div class="bar-chart">${buckets.map((bucket) => {
          const height = maxMinutes ? Math.max(3, Math.round(bucket.minutes / maxMinutes * 100)) : 0;
          return `<div class="bar-column" title="${this.esc(bucket.label)}: ${this.esc(this.formatMinutes(bucket.minutes))}"><span>${bucket.minutes ? this.formatCompactMinutes(bucket.minutes) : ""}</span><div class="bar-track"><i style="height:${height}%"></i></div><small>${this.esc(bucket.label)}</small></div>`;
        }).join("")}</div></div>` : `<p class="muted">${this.t("noStatistics")}</p>`}
      </section>
      ${sum("volume_known_runs") < completed ? `<div class="info-line"><ha-icon icon="mdi:information-outline"></ha-icon>${this.t("volumePartial")}</div>` : ""}
      <div class="info-line"><ha-icon icon="mdi:information-outline"></ha-icon>${this.t("statisticsNote")}</div>
    </div>`;
  }

  statisticsWindow() {
    const now = new Date();
    let start;
    let end;
    if (this.statsRange === "day") {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    } else if (this.statsRange === "month") {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    } else {
      const mondayOffset = (now.getDay() + 6) % 7;
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - mondayOffset);
      end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 7);
    }
    return { start, end };
  }

  statisticsBuckets(logs, start) {
    let count;
    let labels;
    let indexFor;
    if (this.statsRange === "day") {
      count = 24;
      labels = Array.from({length: count}, (_, hour) => String(hour).padStart(2, "0"));
      indexFor = (date) => date.getHours();
    } else if (this.statsRange === "month") {
      count = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
      labels = Array.from({length: count}, (_, day) => String(day + 1));
      indexFor = (date) => date.getDate() - 1;
    } else {
      count = 7;
      labels = Array.from({length: count}, (_, day) => new Intl.DateTimeFormat(this.language === "el" ? "el-GR" : "en-GB", {weekday:"short"}).format(new Date(start.getFullYear(), start.getMonth(), start.getDate() + day)));
      indexFor = (date) => (date.getDay() + 6) % 7;
    }
    const buckets = labels.map((label) => ({label, minutes: 0}));
    logs.forEach((log) => {
      const index = indexFor(new Date(log.timestamp));
      if (buckets[index]) buckets[index].minutes += Number(log.actual_duration || 0);
    });
    return buckets;
  }

  average(values) { return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null; }
  formatMinutes(value) {
    const minutes = Math.round(value);
    if (minutes < 60) return `${minutes} ${this.t("minutes")}`;
    const hours = Math.floor(minutes / 60);
    const remainder = minutes % 60;
    return `${hours} h${remainder ? ` ${remainder} min` : ""}`;
  }
  formatCompactMinutes(value) { return value < 60 ? `${Math.round(value)}m` : `${(value / 60).toFixed(1)}h`; }
  formatVolume(value) { return value >= 1000 ? `${(value / 1000).toFixed(2)} m³` : `${value.toFixed(1)} L`; }

  logs(system) {
    const rows = this.state.logs.filter((log) => log.system_id === system.id).slice().reverse().slice(0, 10);
    if (!rows.length) return `<section class="empty compact"><ha-icon icon="mdi:format-list-bulleted"></ha-icon><h3>${this.t("noLogs")}</h3></section>`;
    return `<section class="card log-card"><div class="table-wrap"><table><thead><tr><th>${this.t("date")}</th><th>${this.t("status")}</th><th>${this.t("reason")}</th><th>${this.t("trigger")}</th><th>${this.t("planned")}</th><th>${this.t("actual")}</th><th>${this.t("totalWaterVolume")}</th><th>${this.t("source")}</th></tr></thead><tbody>${rows.map((log) => `<tr><td>${this.formatDate(log.timestamp)}</td><td><span class="pill ${log.status}">${this.esc(log.status)}</span></td><td>${this.reason(log.reason)}</td><td>${this.esc(log.trigger)}</td><td>${log.planned_duration} ${this.t("minutes")}</td><td>${log.actual_duration == null ? "—" : `${log.actual_duration} ${this.t("minutes")}`}</td><td>${log.water_volume_liters == null ? "—" : this.formatVolume(Number(log.water_volume_liters))}</td><td>${log.water_volume_source === "cumulative_meter" ? this.t("cumulative") : log.water_volume_source === "flow_estimate" ? this.t("estimated") : "—"}</td></tr>`).join("")}</tbody></table></div></section>`;
  }

  fieldLabel(name, label) { return `<div class="field-label"><label for="${name}">${label}</label>${WM_HELP[name] ? `<button type="button" class="help-button" data-help="${name}" aria-label="${this.t("help")}: ${this.esc(label)}">!</button>` : ""}</div>`; }
  input(name, label, value, type) { return `<div class="field">${this.fieldLabel(name, label)}<input id="${name}" name="${name}" type="${type}" value="${this.esc(value)}"></div>`; }
  number(name, label, value, min, max, suffix) { return `<div class="field">${this.fieldLabel(name, label)}<div class="suffix"><input id="${name}" name="${name}" type="number" min="${min}" max="${max}" step="any" value="${this.esc(value)}"><span>${suffix}</span></div></div>`; }
  textarea(name, label, value) { return `<div class="field"><label for="${name}">${label}</label><textarea id="${name}" name="${name}" rows="3">${this.esc(value)}</textarea></div>`; }
  selectField(name, label, value, options) { return `<div class="field">${this.fieldLabel(name, label)}<select id="${name}" name="${name}">${options.map(([key,text]) => `<option value="${key}" ${key === value ? "selected" : ""}>${text}</option>`).join("")}</select></div>`; }
  entityField(name, label, value, domains) {
    const options = Object.values(this.hass.states).filter((state) => domains.includes(state.entity_id.split(".")[0])).sort((a,b) => this.entityName(a).localeCompare(this.entityName(b)));
    return `<div class="field">${this.fieldLabel(name, label)}<select id="${name}" name="${name}"><option value="">— ${this.t("notConfigured")} —</option>${options.map((state) => `<option value="${state.entity_id}" ${state.entity_id === value ? "selected" : ""}>${this.esc(this.entityName(state))} · ${state.entity_id}</option>`).join("")}</select></div>`;
  }
  notificationRecipients(targets) {
    if (!targets.length) return `<div class="empty-notifications"><ha-icon icon="mdi:bell-off-outline"></ha-icon><span>${this.t("noNotificationTargets")}</span></div>`;
    return `<div class="recipient-list">${targets.map((target, index) => `<section class="recipient-row" data-recipient-index="${index}">
      <div class="recipient-head"><strong>${this.esc(target.name || `${this.t("recipientName")} ${index + 1}`)}</strong>${this.isAdmin ? `<button type="button" class="icon danger-text remove-recipient" data-index="${index}" title="${this.t("removeRecipient")}"><ha-icon icon="mdi:delete-outline"></ha-icon></button>` : ""}</div>
      <div class="fields two">
        <div class="field"><label for="recipient_name_${index}">${this.t("recipientName")}</label><input id="recipient_name_${index}" data-recipient-name value="${this.esc(target.name || "")}"></div>
        <div class="field"><div class="field-label"><label for="recipient_destination_${index}">${this.t("notificationService")}</label><button type="button" class="help-button" data-help="notification_service" aria-label="${this.t("help")}: ${this.t("notificationService")}">!</button></div>${this.notificationDestinationSelect(index, target.destination)}</div>
      </div>
      <div class="recipient-events">
        <label><input type="checkbox" data-recipient-event="failure" ${target.failure ? "checked" : ""}><span><ha-icon icon="mdi:alert-octagon-outline"></ha-icon>${this.t("notifyFailures")}</span></label>
        <label><input type="checkbox" data-recipient-event="warning" ${target.warning ? "checked" : ""}><span><ha-icon icon="mdi:alert-outline"></ha-icon>${this.t("notifyWarnings")}</span></label>
        <label><input type="checkbox" data-recipient-event="success" ${target.success ? "checked" : ""}><span><ha-icon icon="mdi:check-circle-outline"></ha-icon>${this.t("notifySuccess")}</span></label>
        <label><input type="checkbox" data-recipient-event="low_battery" ${target.low_battery ? "checked" : ""}><span><ha-icon icon="mdi:battery-alert-variant-outline"></ha-icon>${this.t("notifyLowBattery")}</span></label>
      </div>
      ${this.isAdmin ? `<button type="button" class="test-recipient" data-index="${index}"><ha-icon icon="mdi:bell-ring-outline"></ha-icon>${this.t("testNotification")}</button>` : ""}
    </section>`).join("")}</div>`;
  }
  notificationDestinationSelect(index, selected) {
    const entities = Object.values(this.hass.states).filter((state) => state.entity_id.startsWith("notify.")).sort((a,b) => this.entityName(a).localeCompare(this.entityName(b)));
    const ignored = new Set(["notify", "persistent_notification", "send_message"]);
    const services = Object.keys(this.hass.services?.notify || {}).filter((service) => !ignored.has(service)).sort();
    const known = new Set([...entities.map((state) => `entity:${state.entity_id}`), ...services.map((service) => `service:notify.${service}`)]);
    return `<select id="recipient_destination_${index}" data-recipient-destination><option value="">— ${this.t("notConfigured")} —</option>${selected && !known.has(selected) ? `<option value="${this.esc(selected)}" selected>${this.esc(selected.replace(/^(entity|service):/, ""))}</option>` : ""}${entities.length ? `<optgroup label="${this.t("modernEntity")}">${entities.map((state) => { const value = `entity:${state.entity_id}`; return `<option value="${value}" ${value === selected ? "selected" : ""}>${this.esc(this.entityName(state))} · ${state.entity_id}</option>`; }).join("")}</optgroup>` : ""}${services.length ? `<optgroup label="${this.t("legacyService")}">${services.map((service) => { const value = `service:notify.${service}`; return `<option value="${value}" ${value === selected ? "selected" : ""}>notify.${this.esc(service)}</option>`; }).join("")}</optgroup>` : ""}</select>`;
  }
  entityName(state) { return state.attributes.friendly_name || state.entity_id; }
  entityState(id) { const state = id && this.hass.states[id]; if (!state || ["unknown","unavailable"].includes(state.state)) return null; const value = Number(state.state); return Number.isFinite(value) ? value : state.state; }
  entityValueWithUnit(id) {
    const state = id && this.hass.states[id];
    if (!state || ["unknown","unavailable"].includes(state.state)) return "—";
    const unit = state.attributes.unit_of_measurement;
    return `${state.state}${unit ? ` ${unit}` : ""}`;
  }
  weatherSummary(id) {
    const state = id && this.hass.states[id];
    if (!state) return {icon:"mdi:weather-cloudy-alert",text:"—"};
    const condition = state.state;
    const labels = {sunny:{el:"Ηλιοφάνεια",en:"Sunny"},"clear-night":{el:"Καθαρός ουρανός",en:"Clear"},cloudy:{el:"Συννεφιά",en:"Cloudy"},partlycloudy:{el:"Μερική συννεφιά",en:"Partly cloudy"},rainy:{el:"Βροχή",en:"Rainy"},pouring:{el:"Έντονη βροχή",en:"Pouring"},fog:{el:"Ομίχλη",en:"Fog"},windy:{el:"Άνεμος",en:"Windy"}};
    const icons = {sunny:"mdi:weather-sunny","clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",partlycloudy:"mdi:weather-partly-cloudy",rainy:"mdi:weather-rainy",pouring:"mdi:weather-pouring",fog:"mdi:weather-fog",windy:"mdi:weather-windy"};
    const temp = state.attributes.temperature;
    const text = `${labels[condition]?.[this.language] || condition}${temp == null ? "" : ` · ${temp}°`}`;
    return {icon:icons[condition] || "mdi:weather-partly-cloudy",text};
  }
  formatDate(value) { try { return new Intl.DateTimeFormat(this.language === "el" ? "el-GR" : "en-GB", {dateStyle:"medium",timeStyle:"short"}).format(new Date(value)); } catch { return value; } }
  notificationLevel(value) {
    const key = {failure:"notificationFailure",warning:"notificationWarning",success:"notificationSuccess",low_battery:"notificationLowBattery",test:"notificationTest"}[value];
    return key ? this.t(key) : this.esc(value || "—");
  }
  reason(value) {
    if (!value) return "—";
    const map = {
      manual_duration:{el:"Χειροκίνητη διάρκεια",en:"Manual duration"},
      soil_dry:{el:"Στεγνό χώμα",en:"Dry soil"},
      soil_partly_dry:{el:"Μερικώς στεγνό χώμα",en:"Partly dry soil"},
      soil_wet:{el:"Το χώμα είναι υγρό",en:"Soil is wet"},
      sensor_conflict_short_run:{el:"Διαφωνία αισθητήρων – σύντομο πότισμα",en:"Sensor conflict – short watering"},
      sensors_unavailable:{el:"Οι αισθητήρες δεν είναι διαθέσιμοι",en:"Sensors unavailable"},
      sensors_unavailable_base_duration:{el:"Αισθητήρες εκτός – βασική διάρκεια",en:"Sensors unavailable – base duration"},
      minimum_interval:{el:"Δεν πέρασε το ελάχιστο διάστημα",en:"Minimum interval not reached"},
      system_disabled:{el:"Το σύστημα είναι ανενεργό",en:"System disabled"},
      maintenance_mode:{el:"Λειτουργία συντήρησης ενεργή",en:"Maintenance mode is active"},
      paused:{el:"Παύση έως την επιλεγμένη ημερομηνία",en:"Paused until selected date"},
      no_moisture_sensors:{el:"Χωρίς αισθητήρες υγρασίας",en:"No moisture sensors configured"},
      valve_entity_required:{el:"Δεν έχει οριστεί βάνα",en:"Valve entity is required"},
      valve_test_passed:{el:"Η δοκιμή βάνας ολοκληρώθηκε",en:"Valve test passed"},
      test_notification:{el:"Δοκιμαστική ειδοποίηση",en:"Test notification"},
      battery_low:{el:"Χαμηλή μπαταρία βάνας",en:"Low valve battery"},
      stopped_by_user:{el:"Διακοπή από τον χρήστη",en:"Stopped by user"},
      flow_sensor_unavailable:{el:"Ο αισθητήρας ροής δεν είναι διαθέσιμος",en:"Flow sensor unavailable"},
      flow_too_low:{el:"Πολύ χαμηλή ή μηδενική ροή",en:"Flow too low or absent"},
      flow_too_high:{el:"Υπερβολική ροή – πιθανή διαρροή",en:"Excessive flow – possible leak"},
      valve_failed_to_close:{el:"Η βάνα δεν επιβεβαιώθηκε κλειστή",en:"Valve closure could not be confirmed"},
      flow_after_close:{el:"Ροή νερού μετά το κλείσιμο",en:"Water flow detected after closing"},
      interrupted_by_restart:{el:"Διακοπή λόγω επανεκκίνησης – η βάνα έκλεισε με fail-safe",en:"Interrupted by restart – valve closed by fail-safe"},
      moisture_verified:{el:"Επιβεβαιώθηκε αύξηση υγρασίας",en:"Moisture increase verified"},
      moisture_not_increased:{el:"Η υγρασία δεν αυξήθηκε αρκετά",en:"Moisture did not increase enough"},
      moisture_response_not_detected:{el:"Δεν ανιχνεύτηκε απόκριση υγρασίας",en:"No moisture response detected"},
      emergency_runtime_exceeded:{el:"Υπέρβαση ορίου έκτακτης διάρκειας",en:"Emergency runtime limit exceeded"},
      not_configured:{el:"Δεν έχει οριστεί",en:"Not configured"},
      unavailable:{el:"Μη διαθέσιμο",en:"Unavailable"},
      stale:{el:"Παρωχημένη μέτρηση",en:"Stale reading"},
      not_numeric:{el:"Μη αριθμητική τιμή",en:"Non-numeric value"}
    };
    return map[value]?.[this.language] || value.replaceAll("_", " ");
  }

  bindEvents() {
    this.shadowRoot.getElementById("language")?.addEventListener("change", (event) => { this.language = event.target.value; localStorage.setItem("watering-manager-language", this.language); this.render(); });
    this.shadowRoot.getElementById("refresh")?.addEventListener("click", () => this.loadState());
    ["new-system","create-first"].forEach((id) => this.shadowRoot.getElementById(id)?.addEventListener("click", () => this.showCreateDialog()));
    this.shadowRoot.getElementById("system-select")?.addEventListener("change", (event) => { this.selectedId = event.target.value; this.previewData = null; this.tab = "overview"; this.render(); });
    this.shadowRoot.querySelectorAll("[data-tab]").forEach((button) => button.addEventListener("click", () => { this.tab = button.dataset.tab; this.render(); if (this.tab === "preview") this.loadPreview(); }));
    this.shadowRoot.getElementById("save")?.addEventListener("click", () => this.save());
    this.shadowRoot.getElementById("delete")?.addEventListener("click", () => this.remove());
    this.shadowRoot.getElementById("run")?.addEventListener("click", () => this.run());
    this.shadowRoot.getElementById("stop")?.addEventListener("click", () => this.stop());
    this.shadowRoot.getElementById("add-recipient")?.addEventListener("click", () => this.addRecipient());
    this.shadowRoot.querySelectorAll(".remove-recipient").forEach((button) => button.addEventListener("click", () => this.removeRecipient(Number(button.dataset.index))));
    this.shadowRoot.querySelectorAll(".test-recipient").forEach((button) => button.addEventListener("click", () => this.testNotification(Number(button.dataset.index))));
    this.shadowRoot.getElementById("calibrate-flow")?.addEventListener("click", () => this.startCalibration("flow"));
    this.shadowRoot.getElementById("calibrate-duration")?.addEventListener("click", () => this.startCalibration("duration"));
    this.shadowRoot.getElementById("apply-calibration")?.addEventListener("click", () => this.applyCalibration());
    this.shadowRoot.getElementById("refresh-preview")?.addEventListener("click", () => this.loadPreview());
    this.shadowRoot.getElementById("test-valve")?.addEventListener("click", () => this.testValve());
    this.shadowRoot.querySelectorAll("[data-stats-range]").forEach((button) => button.addEventListener("click", () => { this.statsRange = button.dataset.statsRange; this.render(); }));
    this.shadowRoot.querySelectorAll(".help-button").forEach((button) => button.addEventListener("click", () => this.showHelpDialog(button.dataset.help)));
  }

  showHelpDialog(key) {
    const help = WM_HELP[key];
    if (!help) return;
    const dialog = document.createElement("dialog");
    dialog.className = "wm-dialog help-dialog";
    const title = this.t(WM_HELP_LABELS[key]);
    dialog.innerHTML = `<section><div class="help-dialog-title"><span class="help-mark">!</span><h2>${this.esc(title)}</h2></div><p>${this.esc(help[this.language] || help.en)}</p><button type="button" class="primary help-close">${this.t("close")}</button></section>`;
    this.shadowRoot.appendChild(dialog);
    dialog.querySelector(".help-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => dialog.remove());
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
    dialog.showModal();
  }

  collectForm() {
    const form = this.shadowRoot.getElementById("settings-form");
    if (!form) return {};
    const data = Object.fromEntries(new FormData(form).entries());
    if (this.tab === "schedule") {
      data.enabled = form.elements.enabled.checked;
      data.maintenance_mode = form.elements.maintenance_mode.checked;
      data.days = [...form.querySelectorAll('input[name="days"]:checked')].map((input) => Number(input.value));
    }
    if (this.tab === "automatic") {
      data.post_check_enabled = form.elements.post_check_enabled.checked;
    }
    if (this.tab === "notifications") {
      data.notification_targets = [...form.querySelectorAll(".recipient-row")].map((row) => ({
        name: row.querySelector("[data-recipient-name]").value.trim(),
        destination: row.querySelector("[data-recipient-destination]").value,
        failure: row.querySelector('[data-recipient-event="failure"]').checked,
        warning: row.querySelector('[data-recipient-event="warning"]').checked,
        success: row.querySelector('[data-recipient-event="success"]').checked,
        low_battery: row.querySelector('[data-recipient-event="low_battery"]').checked,
      }));
    }
    const numeric = ["manual_duration","base_duration","minimum_duration","maximum_duration","conflict_duration","dry_threshold","wet_threshold","sensor_max_age_minutes","weather_sensitivity","minimum_interval_hours","soak_cycles","soak_pause_minutes","flow_minimum","flow_maximum","flow_grace_seconds","emergency_max_runtime","valve_confirmation_seconds","leak_flow_threshold","post_check_delay_minutes","post_check_min_increase","flow_calibration_seconds","duration_calibration_minutes","duration_calibration_wait_minutes","normal_flow_rate","flow_tolerance_percent","valve_test_seconds","battery_low_threshold"];
    numeric.forEach((key) => { if (key in data) data[key] = Number(data[key]); });
    return data;
  }

  async save(render = true) {
    try {
      const updated = await this.call("update_system", { system_id: this.selectedId, system: this.collectForm() });
      Object.assign(this.system, updated);
      this.message(this.t("saved"));
      if (render) this.render();
      return true;
    } catch (error) { this.message(error.message || String(error), true); return false; }
  }

  async run() {
    if (!this.system.valve_entity) { this.message(this.t("valveRequired"), true); return; }
    try { await this.call("run_system", {system_id:this.selectedId}); await this.loadState(); }
    catch (error) { this.message(error.message || String(error), true); }
  }
  async stop() { try { await this.call("stop_system", {system_id:this.selectedId}); await this.loadState(); } catch (error) { this.message(error.message || String(error), true); } }
  addRecipient() {
    Object.assign(this.system, this.collectForm());
    this.system.notification_targets = [...(this.system.notification_targets || []), {name:"",destination:"",failure:true,warning:true,success:false,low_battery:true}];
    this.render();
  }
  removeRecipient(index) {
    Object.assign(this.system, this.collectForm());
    this.system.notification_targets = (this.system.notification_targets || []).filter((_, itemIndex) => itemIndex !== index);
    this.render();
  }
  async testNotification(index) {
    try {
      const values = this.collectForm();
      const target = values.notification_targets?.[index];
      if (!target?.destination || !target?.name) { this.message(this.t("notConfigured"), true); return; }
      if (!(await this.save(false))) return;
      await this.call("test_notification", {system_id:this.selectedId, destination:target.destination});
      this.message(this.t("testNotification"));
    } catch (error) { this.message(error.message || String(error), true); }
  }
  async startCalibration(kind) {
    if (!confirm(this.t("startCalibrationConfirm"))) return;
    try {
      if (!(await this.save(false))) return;
      await this.call("start_calibration", {system_id:this.selectedId, kind});
      await this.loadState();
    } catch (error) { this.message(error.message || String(error), true); }
  }
  async testValve() {
    if (!confirm(this.t("valveTestConfirm"))) return;
    try {
      if (!(await this.save(false))) return;
      await this.call("test_valve", {system_id:this.selectedId});
      await this.loadState();
    } catch (error) { this.message(error.message || String(error), true); }
  }
  async applyCalibration() {
    try {
      const updated = await this.call("apply_calibration", {system_id:this.selectedId});
      Object.assign(this.system, updated);
      await this.loadState();
      this.message(this.t("saved"));
    } catch (error) { this.message(error.message || String(error), true); }
  }
  async remove() { if (!confirm(this.t("confirmDelete"))) return; try { await this.call("delete_system", {system_id:this.selectedId}); this.selectedId = null; await this.loadState(); this.message(this.t("deleted")); } catch (error) { this.message(error.message || String(error), true); } }

  showCreateDialog() {
    const dialog = document.createElement("dialog");
    dialog.className = "wm-dialog";
    dialog.innerHTML = `<form method="dialog"><h2>${this.t("addTitle")}</h2><p>${this.t("addHelp")}</p><label>${this.t("name")}<input name="name" required autofocus></label><div><button value="cancel">${this.t("cancel")}</button><button value="default" class="primary">${this.t("create")}</button></div></form>`;
    this.shadowRoot.appendChild(dialog);
    dialog.addEventListener("close", async () => {
      if (dialog.returnValue === "default") {
        const name = dialog.querySelector("input").value.trim();
        if (name) {
          try { const created = await this.call("create_system", {system:{name}}); this.selectedId = created.id; this.tab = "schedule"; await this.loadState(); this.message(this.t("created")); }
          catch (error) { this.message(error.message || String(error), true); }
        }
      }
      dialog.remove();
    });
    dialog.showModal();
  }

  message(text, error = false) {
    const toast = this.shadowRoot?.getElementById("toast");
    if (!toast) return;
    toast.textContent = text;
    toast.className = `toast show ${error ? "error" : ""}`;
    setTimeout(() => toast.classList.remove("show"), 3500);
  }

  updateLiveStatus() {
    if (!this.shadowRoot || this.tab !== "overview") return;
    this.render();
  }

  styles() {
    return `
      :host{--wm-green:#39745b;--wm-green-soft:color-mix(in srgb,var(--wm-green) 12%,transparent);display:block;width:100%;max-width:100%;overflow-x:hidden;background:var(--primary-background-color);min-height:100vh;color:var(--primary-text-color);font-family:var(--paper-font-body1_-_font-family,system-ui)}*{box-sizing:border-box}.app{width:100%;max-width:100%;min-height:100vh;overflow-x:hidden}header{height:76px;padding:0 24px;display:flex;align-items:center;justify-content:space-between;background:var(--card-background-color);border-bottom:1px solid var(--divider-color);position:sticky;top:0;z-index:5}.brand,.header-actions,.actions,.title-row{display:flex;align-items:center}.brand{gap:12px}.brand>ha-icon{color:var(--wm-green);--mdc-icon-size:32px}.brand h1{font-size:20px;margin:0;display:flex;align-items:center;gap:8px}.version-badge{font-size:10px;line-height:1;padding:4px 6px;border-radius:10px;background:var(--wm-green-soft);color:var(--wm-green);font-weight:700}.brand small,.muted,.title-row p{color:var(--secondary-text-color)}.header-actions,.actions{gap:8px}button,select,input,textarea{font:inherit;color:inherit}button{border:1px solid var(--divider-color);background:var(--card-background-color);border-radius:10px;padding:10px 14px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:7px}button.primary{background:var(--wm-green);color:white;border-color:var(--wm-green)}button.danger{background:var(--error-color);color:white;border-color:var(--error-color)}button.icon{padding:10px}.danger-text{color:var(--error-color)}select,input,textarea{width:100%;max-width:100%;background:var(--card-background-color);border:1px solid var(--divider-color);border-radius:9px;padding:11px 12px;outline:none}select:focus,input:focus,textarea:focus{border-color:var(--wm-green);box-shadow:0 0 0 2px var(--wm-green-soft)}.workspace{display:grid;grid-template-columns:240px minmax(0,1fr);width:100%;max-width:1500px;margin:auto;min-height:calc(100vh - 76px)}aside{padding:24px 18px;border-right:1px solid var(--divider-color);background:var(--card-background-color)}aside>label,.field>label,.field-label label{display:block;font-size:12px;font-weight:650;color:var(--secondary-text-color)}aside>label,.field>label{margin:0 0 7px}.field-label{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0 0 7px;min-width:0}.field-label label{min-width:0;overflow-wrap:anywhere}.help-button{width:30px;height:30px;min-width:30px;padding:0;border-radius:50%;border-color:color-mix(in srgb,var(--wm-green) 42%,var(--divider-color));color:var(--wm-green);font-size:14px;font-weight:800;background:var(--wm-green-soft)}.help-button:hover,.help-button:focus{background:var(--wm-green);color:#fff;outline:none}.help-dialog-title{display:flex;align-items:center;gap:12px}.help-dialog-title h2{margin:0}.help-mark{display:grid;place-items:center;width:34px;height:34px;min-width:34px;border-radius:50%;background:var(--wm-green);color:#fff;font-weight:800}.help-dialog section{padding:24px}.help-dialog p{line-height:1.6;white-space:pre-line;margin:18px 0 24px}.help-dialog .help-close{width:100%;min-height:44px}aside nav{display:grid;gap:5px;margin-top:24px}aside nav button{justify-content:flex-start;border:0;background:transparent;padding:11px}aside nav button.active{background:var(--wm-green-soft);color:var(--wm-green)}.aside-status{margin-top:24px;padding:12px;border-top:1px solid var(--divider-color);display:flex;align-items:center;gap:8px;font-size:13px}.dot{width:9px;height:9px;background:#9ca3af;border-radius:50%}.dot.on{background:#22c55e;box-shadow:0 0 0 5px rgba(34,197,94,.12)}main,form,.grid,.card,.fields,.field,.suffix{min-width:0;max-width:100%}main{padding:28px}.title-row{justify-content:space-between;margin-bottom:24px;gap:16px}.title-row h2{font-size:26px;margin:0 0 4px}.title-row p{margin:0}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;width:100%}.automatic-form{width:100%;max-width:1000px}.automatic-grid{grid-template-columns:minmax(0,1fr);max-width:1000px}.card{background:var(--card-background-color);border:1px solid var(--divider-color);border-radius:14px;padding:20px;box-shadow:var(--ha-card-box-shadow,none)}.wide{grid-column:1/-1}.stat{display:flex;align-items:center;gap:16px}.stat>ha-icon{color:var(--wm-green);background:var(--wm-green-soft);padding:12px;border-radius:12px;box-sizing:content-box}.stat small,.stat strong{display:block}.stat strong{font-size:20px;margin-top:5px}.card h3{margin:0 0 18px}.reason{font-size:18px;margin:0}.info{display:flex;gap:12px;align-items:flex-start}.info ha-icon,.info-line ha-icon{color:var(--wm-green);flex:none}.info p{margin:0}.form-card{width:100%;max-width:1000px}.fields{display:grid;gap:17px}.fields.two{grid-template-columns:repeat(2,minmax(0,1fr))}.field{margin-bottom:17px}.suffix{display:flex;width:100%}.suffix input{width:0;min-width:0;flex:1 1 auto;border-radius:9px 0 0 9px}.suffix span{flex:0 0 auto;border:1px solid var(--divider-color);border-left:0;border-radius:0 9px 9px 0;padding:11px;background:var(--secondary-background-color);white-space:nowrap;color:var(--secondary-text-color)}.toggle{display:inline-flex!important;align-items:center;gap:10px;margin:5px 0 22px;min-height:28px;cursor:pointer}.toggle input{position:absolute;opacity:0;pointer-events:none}.toggle-track{display:block;flex:0 0 42px;width:42px;height:24px;background:#9ca3af;border-radius:20px;position:relative}.toggle-track:after{content:"";position:absolute;width:18px;height:18px;top:3px;left:3px;background:white;border-radius:50%;transition:.2s}.toggle input:checked+.toggle-track{background:var(--wm-green)}.toggle input:checked+.toggle-track:after{left:21px}.toggle-text{display:block;flex:0 0 auto;width:auto;height:auto;position:static;background:transparent;border-radius:0;white-space:nowrap;color:var(--primary-text-color)}.days{display:flex;gap:8px;flex-wrap:wrap}.days input{display:none}.days span{display:flex;width:44px;height:44px;align-items:center;justify-content:center;border:1px solid var(--divider-color);border-radius:50%;cursor:pointer}.days input:checked+span{background:var(--wm-green);border-color:var(--wm-green);color:white}.info-line{display:flex;align-items:flex-start;gap:9px;min-width:0;padding:12px;margin:12px 0;background:var(--wm-green-soft);border-radius:10px;font-size:13px;overflow-wrap:anywhere}.empty{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:12px;color:var(--secondary-text-color)}.empty>ha-icon{--mdc-icon-size:60px;color:var(--wm-green)}.empty.compact{min-height:300px}.loading{min-height:60vh;display:grid;place-items:center}.log-card{padding:0;overflow:hidden}.table-wrap{overflow:auto}table{width:100%;border-collapse:collapse;white-space:nowrap}th,td{text-align:left;padding:14px;border-bottom:1px solid var(--divider-color);font-size:13px}th{color:var(--secondary-text-color);background:var(--secondary-background-color)}.pill{padding:4px 8px;border-radius:20px;background:var(--secondary-background-color)}.pill.completed{color:#15803d;background:#dcfce7}.pill.failed{color:#b91c1c;background:#fee2e2}.toast{position:fixed;right:24px;bottom:24px;background:#1f2937;color:white;border-radius:10px;padding:13px 18px;opacity:0;transform:translateY(20px);pointer-events:none;transition:.2s;z-index:20}.toast.show{opacity:1;transform:none}.toast.error{background:var(--error-color)}
      .overview-view{display:grid;gap:26px;max-width:1100px}.overview-hero{display:flex;align-items:center;gap:18px;padding:22px 24px;background:linear-gradient(135deg,var(--card-background-color),color-mix(in srgb,var(--wm-green) 8%,var(--card-background-color)));overflow:hidden;position:relative}.overview-hero:before{content:"";position:absolute;right:-45px;top:-75px;width:180px;height:180px;border-radius:50%;background:var(--wm-green-soft)}.overview-status-icon{width:58px;height:58px;border-radius:17px;display:grid;place-items:center;background:var(--wm-green-soft);color:var(--wm-green);flex:none}.overview-status-icon ha-icon{--mdc-icon-size:30px}.overview-hero.active .overview-status-icon{background:var(--wm-green);color:#fff}.overview-status-copy{display:grid;gap:3px;position:relative}.overview-status-copy small,.overview-status-copy span,.overview-metric small,.soil-sensor-card header small,.soil-reading small{color:var(--secondary-text-color)}.overview-status-copy strong{font-size:23px}.overview-status-pill{margin-left:auto;display:inline-flex;align-items:center;gap:8px;padding:7px 11px;border-radius:20px;background:var(--secondary-background-color);font-size:12px;font-weight:650;position:relative}.overview-status-pill>span{width:8px;height:8px;border-radius:50%;background:#9ca3af}.overview-status-pill.enabled>span{background:#22c55e;box-shadow:0 0 0 4px rgba(34,197,94,.12)}.overview-section{display:grid;gap:12px}.overview-section-title{display:flex;align-items:center;gap:9px;padding:0 3px}.overview-section-title ha-icon{color:var(--wm-green)}.overview-section-title h3{margin:0;font-size:15px}.sensor-card-grid,.overview-metric-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.soil-sensor-card{padding:0;overflow:hidden}.soil-sensor-card header{display:flex;align-items:center;gap:12px;padding:17px 18px;border-bottom:1px solid var(--divider-color)}.soil-sensor-card header>span{width:40px;height:40px;display:grid;place-items:center;border-radius:12px;background:var(--wm-green-soft);color:var(--wm-green)}.soil-sensor-card header small,.soil-sensor-card header strong{display:block}.soil-sensor-card header strong{margin-top:2px}.soil-reading-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.soil-reading{display:flex;align-items:center;gap:11px;padding:18px}.soil-reading+.soil-reading{border-left:1px solid var(--divider-color)}.soil-reading>ha-icon{color:var(--wm-green)}.soil-reading small,.soil-reading strong{display:block}.soil-reading strong{font-size:21px;margin-top:4px}.overview-metric-grid .overview-metric{background:var(--card-background-color);border:1px solid var(--divider-color);border-radius:14px;padding:18px}.overview-metric{display:flex;align-items:center;gap:13px;min-width:0}.overview-metric-icon{width:42px;height:42px;display:grid;place-items:center;border-radius:12px;background:var(--wm-green-soft);color:var(--wm-green);flex:none}.overview-metric small,.overview-metric strong{display:block}.overview-metric strong{margin-top:4px;font-size:15px;overflow-wrap:anywhere}.watering-summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));padding:0}.watering-summary .overview-metric{padding:20px}.watering-summary .overview-metric+.overview-metric{border-left:1px solid var(--divider-color)}.overview-mode-info{display:flex;align-items:flex-start;gap:12px;padding:16px 18px;background:var(--wm-green-soft);border-color:color-mix(in srgb,var(--wm-green) 25%,var(--divider-color))}.overview-mode-info ha-icon{color:var(--wm-green);flex:none}.overview-mode-info p{margin:0;line-height:1.5}
      .statistics-view{display:grid;gap:16px}.range-tabs{display:flex;gap:6px;padding:4px;background:var(--secondary-background-color);border-radius:12px;width:max-content;max-width:100%}.range-tabs button{border:0;background:transparent;min-width:92px}.range-tabs button.active{background:var(--wm-green);color:#fff}.chart-card{overflow:hidden}.chart-scroll{overflow-x:auto;padding:4px 0 8px}.bar-chart{height:220px;display:flex;align-items:stretch;gap:8px;min-width:max-content}.bar-column{width:38px;display:grid;grid-template-rows:22px 1fr 22px;align-items:end;text-align:center}.bar-column>span{font-size:10px;color:var(--secondary-text-color);align-self:center}.bar-track{height:150px;width:22px;margin:auto;background:var(--secondary-background-color);border-radius:7px;overflow:hidden;display:flex;align-items:flex-end}.bar-track i{display:block;width:100%;background:var(--wm-green);border-radius:7px 7px 0 0;min-height:0}.bar-column small{font-size:11px;color:var(--secondary-text-color);overflow:hidden;text-overflow:ellipsis}.statistics-view>.info-line{margin:0}.statistics-view .stats{grid-template-columns:repeat(4,minmax(0,1fr))}
      .diagnostics-view{display:grid;gap:16px;max-width:1000px}.health-summary{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:14px}.health-summary>ha-icon{--mdc-icon-size:34px}.health-summary small,.health-summary strong,.health-row small,.health-row strong,.calibration-result small{display:block}.health-summary strong{font-size:20px}.health-summary.healthy>ha-icon,.health-row.ok>ha-icon{color:#22a05a}.health-summary.warning>ha-icon,.health-row.warning>ha-icon{color:#d08a00}.health-summary.critical>ha-icon,.health-row.error>ha-icon{color:var(--error-color)}.health-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.health-row{display:flex;align-items:center;gap:10px;padding:12px;background:var(--secondary-background-color);border-radius:10px}.health-row small,.calibration-result small,.calibration-progress small{margin-top:3px;color:var(--secondary-text-color)}.calibration-actions{display:flex;gap:10px;flex-wrap:wrap;margin:8px 0 18px}.calibration-result,.calibration-progress{display:flex;align-items:center;gap:14px;padding:14px;border-radius:10px;background:var(--wm-green-soft)}.calibration-result{justify-content:space-between;flex-wrap:wrap}.notifications-view{display:grid;gap:16px;max-width:1100px}.section-title,.recipient-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.section-title h3{margin-bottom:4px}.section-title p{margin:0 0 18px}.recipient-list{display:grid;gap:14px}.recipient-row{border:1px solid var(--divider-color);border-radius:12px;padding:16px;background:var(--secondary-background-color)}.recipient-head{align-items:center;margin-bottom:14px}.recipient-events{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:0 0 14px}.recipient-events input{display:none}.recipient-events span{min-height:54px;display:flex;align-items:center;justify-content:center;gap:7px;text-align:center;padding:9px;border:1px solid var(--divider-color);border-radius:9px;background:var(--card-background-color);cursor:pointer;font-size:12px}.recipient-events input:checked+span{background:var(--wm-green-soft);border-color:var(--wm-green);color:var(--wm-green);font-weight:650}.empty-notifications{display:flex;align-items:center;gap:10px;padding:18px;border:1px dashed var(--divider-color);border-radius:10px;color:var(--secondary-text-color)}.table-title{padding:20px 20px 0}.destination{display:block;margin-top:4px;color:var(--secondary-text-color);font-size:11px}.error-text{color:var(--error-color)}.pill.warning{color:#a16207;background:#fef3c7}.pill.low_battery{color:#b45309;background:#ffedd5}.pill.test{color:#2563eb;background:#dbeafe}
      .preview-view{display:grid;gap:16px;max-width:1100px}.decision-hero{display:grid;grid-template-columns:auto 1fr auto;gap:16px;align-items:center}.decision-hero>ha-icon{--mdc-icon-size:42px}.decision-hero.go>ha-icon{color:#22a05a}.decision-hero.stop>ha-icon{color:var(--error-color)}.decision-hero strong,.decision-hero small{display:block}.decision-hero strong{font-size:22px;margin:4px 0}.decision-hero p{margin:0;color:var(--secondary-text-color)}.decision-list{display:grid}.decision-row{display:flex;justify-content:space-between;gap:18px;padding:12px 0;border-bottom:1px solid var(--divider-color)}.decision-row:last-child{border:0}.decision-row span{color:var(--secondary-text-color)}.decision-row strong{text-align:right}
      dialog{border:0;border-radius:16px;background:var(--card-background-color);color:var(--primary-text-color);padding:0;box-shadow:0 20px 60px rgba(0,0,0,.35);max-width:460px;width:calc(100% - 32px)}dialog::backdrop{background:rgba(0,0,0,.5)}dialog form{padding:24px}dialog h2{margin:0 0 8px}dialog p{color:var(--secondary-text-color);margin-bottom:20px}dialog label{display:grid;gap:7px;font-size:13px;font-weight:650}dialog form>div{display:flex;justify-content:flex-end;gap:8px;margin-top:22px}
      @media(max-width:800px){header{height:auto;min-height:68px;padding:12px 14px}.brand small{display:none}.brand h1{font-size:17px}.version-badge{font-size:9px}.header-actions .primary{font-size:0}.header-actions .primary ha-icon{font-size:initial}.workspace{display:block}.workspace aside{border-right:0;border-bottom:1px solid var(--divider-color);padding:12px 14px;position:sticky;top:68px;z-index:4}aside>label,.aside-status{display:none}aside nav{display:flex;margin-top:10px;overflow:auto}aside nav button{min-width:max-content;font-size:12px;flex-direction:column;gap:3px;padding:8px 10px}main{padding:18px 14px}.title-row{align-items:flex-start}.title-row h2{font-size:21px}.actions{flex-wrap:wrap;justify-content:flex-end}.actions button{font-size:0;padding:9px}.actions button ha-icon{font-size:initial}.grid,.fields.two,.health-list{grid-template-columns:1fr}.stats,.statistics-view .stats{grid-template-columns:1fr 1fr}.stat{padding:14px}.stat strong{font-size:16px}.wide{grid-column:1/-1}.form-card{padding:16px}.days{justify-content:space-between}.days span{width:39px;height:39px}.help-button{width:36px;height:36px;min-width:36px}.help-dialog{max-height:calc(100vh - 24px);overflow:auto}.help-dialog section{padding:20px}.range-tabs{width:100%;overflow:auto}.range-tabs button{min-width:68px;flex:1;padding:10px 8px}.health-summary,.decision-hero{grid-template-columns:auto 1fr}.health-summary>span,.decision-hero>button{grid-column:1/-1}.decision-hero>button{width:100%}.decision-row{display:grid;gap:4px}.decision-row strong{text-align:left}.calibration-actions button{width:100%}.section-title{display:grid}.section-title>button{width:100%}.recipient-events{grid-template-columns:1fr}.recipient-events span{justify-content:flex-start}.test-recipient{width:100%}.overview-view{gap:21px}.overview-hero{padding:18px}.sensor-card-grid,.overview-metric-grid{grid-template-columns:1fr}.watering-summary{grid-template-columns:1fr}.watering-summary .overview-metric+.overview-metric{border-left:0;border-top:1px solid var(--divider-color)}.toast{left:14px;right:14px;bottom:14px}}
      @media(max-width:450px){.stats{grid-template-columns:1fr}.header-actions select{max-width:105px}.brand>ha-icon{display:none}.overview-status-icon{width:48px;height:48px;border-radius:14px}.overview-status-copy strong{font-size:19px}.overview-status-pill{display:none}.soil-reading-grid{grid-template-columns:1fr}.soil-reading+.soil-reading{border-left:0;border-top:1px solid var(--divider-color)}}
    `;
  }
}

if (!customElements.get("watering-manager-panel")) {
  customElements.define("watering-manager-panel", WateringManagerPanel);
}
