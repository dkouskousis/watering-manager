const WM_VERSION = "0.1.6";

const WM_TRANSLATIONS = {
  en: {
    app: "Watering Manager", systems: "Watering systems", newSystem: "New system",
    selectSystem: "Select system", overview: "Overview", schedule: "Schedule",
    automatic: "Automatic", hardware: "Entities", statistics: "Statistics", logs: "Logs", save: "Save",
    delete: "Delete", duplicate: "Duplicate", runNow: "Run now", stop: "Stop",
    noSystems: "No watering systems yet.", createFirst: "Create the first system",
    name: "Name", enabled: "Enabled", mode: "Mode", manual: "Manual", auto: "Auto",
    modeHelp: "Manual always uses the fixed duration. Auto decides whether to water and adjusts the duration using soil moisture, weather, rain and safety limits.",
    days: "Watering days", startTime: "Start time", manualDuration: "Manual duration",
    minutes: "minutes", valve: "Valve or switch", moisture1: "Soil moisture sensor 1",
    moisture2: "Soil moisture sensor 2", soilTemperature1: "Soil temperature sensor 1", soilTemperature2: "Soil temperature sensor 2", weather: "Weather entity",
    rain: "Measured rain (last 24h)", flow: "Flow sensor (optional)",
    flowMinimum: "Minimum safe flow", flowMaximum: "Maximum safe flow", flowGrace: "Flow check delay",
    entityHelp: "Choose an existing Home Assistant entity. The system never creates or renames your hardware entities.",
    baseDuration: "Dry-to-wet base duration", minDuration: "Minimum duration",
    maxDuration: "Maximum duration", conflictDuration: "Duration when sensors disagree",
    dryThreshold: "Dry threshold", wetThreshold: "Wet threshold",
    maxSensorAge: "Maximum sensor age", failureMode: "If both sensors fail",
    skip: "Skip watering", useBase: "Use base duration", exposure: "Rain exposure",
    exposed: "Exposed", partial: "Partly covered", covered: "Covered",
    rainReach: "Rain reaching the pots", rainThreshold: "Rain threshold",
    weatherSensitivity: "Weather sensitivity", minimumInterval: "Minimum interval",
    soakCycles: "Watering cycles", soakPause: "Pause between cycles",
    safety: "Safety", currentStatus: "Current status", idle: "Idle", running: "Running",
    lastRun: "Last run", lastReason: "Last decision", lastDuration: "Last duration",
    sensorValues: "Current sensor values", notConfigured: "Not configured",
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
    weatherInfo: "Auto uses the current weather as a correction, not as proof that the pots received rain. Measured rain is only used when a rain entity is configured.",
    addTitle: "Create watering system", addHelp: "Give the system a name. All entities and automatic settings can be selected immediately afterwards.",
    cancel: "Cancel", create: "Create", percent: "%", hours: "hours",
    sensorStale: "minutes", systemsCount: "systems", updated: "Updated",
    help: "Help", close: "Close", day: "Day", week: "Week", month: "Month",
    totalWateringTime: "Total watering time", totalWaterVolume: "Total water volume",
    averageTemperature: "Average air temperature", averageSoilTemperature1: "Average soil temperature 1", averageSoilTemperature2: "Average soil temperature 2", averageMoisture: "Average soil moisture",
    wateringRuns: "Watering runs", successfulRuns: "Completed", skippedRuns: "Skipped",
    failedRuns: "Failed", durationChart: "Watering time by period", noStatistics: "No watering data for this period.",
    statisticsNote: "Air temperature, soil temperature and moisture averages use readings captured when watering was evaluated. Soil temperature is recorded for information only and never changes watering duration. Water volume is estimated from the configured flow sensor and is shown only for supported flow-rate units.",
    volumePartial: "Volume is based only on runs with available flow data.",
  },
  el: {
    app: "Διαχείριση ποτίσματος", systems: "Συστήματα ποτίσματος", newSystem: "Νέο σύστημα",
    selectSystem: "Επιλογή συστήματος", overview: "Επισκόπηση", schedule: "Πρόγραμμα",
    automatic: "Αυτόματο", hardware: "Entities", statistics: "Στατιστικά", logs: "Ιστορικό", save: "Αποθήκευση",
    delete: "Διαγραφή", duplicate: "Αντιγραφή", runNow: "Πότισμα τώρα", stop: "Διακοπή",
    noSystems: "Δεν υπάρχουν ακόμη συστήματα ποτίσματος.", createFirst: "Δημιουργία πρώτου συστήματος",
    name: "Όνομα", enabled: "Ενεργό", mode: "Λειτουργία", manual: "Manual", auto: "Auto",
    modeHelp: "Το Manual χρησιμοποιεί πάντα τη σταθερή διάρκεια. Το Auto αποφασίζει αν χρειάζεται πότισμα και προσαρμόζει τη διάρκεια από την υγρασία χώματος, τον καιρό, τη βροχή και τα όρια ασφαλείας.",
    days: "Ημέρες ποτίσματος", startTime: "Ώρα έναρξης", manualDuration: "Διάρκεια Manual",
    minutes: "λεπτά", valve: "Βάνα ή διακόπτης", moisture1: "Αισθητήρας υγρασίας χώματος 1",
    moisture2: "Αισθητήρας υγρασίας χώματος 2", soilTemperature1: "Αισθητήρας θερμοκρασίας χώματος 1", soilTemperature2: "Αισθητήρας θερμοκρασίας χώματος 2", weather: "Entity καιρού",
    rain: "Μετρημένη βροχή τελευταίου 24ώρου", flow: "Αισθητήρας ροής (προαιρετικός)",
    flowMinimum: "Ελάχιστη ασφαλής ροή", flowMaximum: "Μέγιστη ασφαλής ροή", flowGrace: "Καθυστέρηση ελέγχου ροής",
    entityHelp: "Επίλεξε υπάρχον entity του Home Assistant. Η εφαρμογή δεν δημιουργεί ούτε μετονομάζει τα entities του εξοπλισμού.",
    baseDuration: "Βασική διάρκεια στεγνό → υγρό", minDuration: "Ελάχιστη διάρκεια",
    maxDuration: "Μέγιστη διάρκεια", conflictDuration: "Διάρκεια όταν διαφωνούν οι αισθητήρες",
    dryThreshold: "Όριο στεγνού", wetThreshold: "Όριο υγρού",
    maxSensorAge: "Μέγιστη ηλικία μέτρησης", failureMode: "Αν αποτύχουν και οι δύο αισθητήρες",
    skip: "Παράλειψη ποτίσματος", useBase: "Χρήση βασικής διάρκειας", exposure: "Έκθεση στη βροχή",
    exposed: "Εκτεθειμένο", partial: "Μερικώς στεγασμένο", covered: "Στεγασμένο",
    rainReach: "Βροχή που φτάνει στις γλάστρες", rainThreshold: "Όριο βροχής",
    weatherSensitivity: "Ευαισθησία στον καιρό", minimumInterval: "Ελάχιστο διάστημα",
    soakCycles: "Κύκλοι ποτίσματος", soakPause: "Παύση μεταξύ κύκλων",
    safety: "Ασφάλεια", currentStatus: "Τρέχουσα κατάσταση", idle: "Σε αναμονή", running: "Ποτίζει",
    lastRun: "Τελευταίο πότισμα", lastReason: "Τελευταία απόφαση", lastDuration: "Τελευταία διάρκεια",
    sensorValues: "Τρέχουσες τιμές αισθητήρων", notConfigured: "Δεν έχει οριστεί",
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
    weatherInfo: "Το Auto χρησιμοποιεί τον τρέχοντα καιρό μόνο ως διόρθωση, όχι ως απόδειξη ότι οι γλάστρες δέχτηκαν βροχή. Πραγματική βροχή υπολογίζεται μόνο όταν έχει οριστεί αντίστοιχο entity.",
    addTitle: "Δημιουργία συστήματος ποτίσματος", addHelp: "Δώσε ένα όνομα. Τα entities και οι ρυθμίσεις Auto επιλέγονται αμέσως μετά.",
    cancel: "Ακύρωση", create: "Δημιουργία", percent: "%", hours: "ώρες",
    sensorStale: "λεπτά", systemsCount: "συστήματα", updated: "Ενημερώθηκε",
    help: "Βοήθεια", close: "Κλείσιμο", day: "Ημέρα", week: "Εβδομάδα", month: "Μήνας",
    totalWateringTime: "Συνολικός χρόνος ποτίσματος", totalWaterVolume: "Συνολικός όγκος νερού",
    averageTemperature: "Μέση θερμοκρασία αέρα", averageSoilTemperature1: "Μέση θερμοκρασία χώματος 1", averageSoilTemperature2: "Μέση θερμοκρασία χώματος 2", averageMoisture: "Μέση υγρασία χώματος",
    wateringRuns: "Ποτίσματα", successfulRuns: "Ολοκληρωμένα", skippedRuns: "Παραλείψεις",
    failedRuns: "Αποτυχίες", durationChart: "Χρόνος ποτίσματος ανά περίοδο", noStatistics: "Δεν υπάρχουν δεδομένα ποτίσματος για αυτή την περίοδο.",
    statisticsNote: "Οι μέσες τιμές θερμοκρασίας αέρα, θερμοκρασίας χώματος και υγρασίας βασίζονται στις μετρήσεις που καταγράφηκαν όταν αξιολογήθηκε το πότισμα. Η θερμοκρασία χώματος είναι μόνο ενημερωτική και δεν αλλάζει ποτέ τη διάρκεια. Ο όγκος νερού είναι εκτίμηση από τον αισθητήρα ροής και εμφανίζεται μόνο για υποστηριζόμενες μονάδες ροής.",
    volumePartial: "Ο όγκος βασίζεται μόνο στα ποτίσματα με διαθέσιμα δεδομένα ροής.",
  },
};

const WM_HELP_LABELS = {
  mode: "mode", base_duration: "baseDuration", conflict_duration: "conflictDuration",
  dry_threshold: "dryThreshold", wet_threshold: "wetThreshold",
  weather_sensitivity: "weatherSensitivity", sensor_max_age_minutes: "maxSensorAge",
  sensor_failure: "failureMode", exposure: "exposure", rain_reach_percent: "rainReach",
  measured_rain_threshold: "rainThreshold", minimum_duration: "minDuration",
  maximum_duration: "maxDuration", minimum_interval_hours: "minimumInterval",
  soak_cycles: "soakCycles", soak_pause_minutes: "soakPause", valve_entity: "valve",
  weather_entity: "weather", moisture_sensor_1: "moisture1", moisture_sensor_2: "moisture2", soil_temperature_sensor: "soilTemperature1", soil_temperature_sensor_2: "soilTemperature2",
  rain_sensor: "rain", flow_sensor: "flow", flow_minimum: "flowMinimum",
  flow_maximum: "flowMaximum", flow_grace_seconds: "flowGrace",
};

const WM_HELP = {
  mode: {
    el: "Manual: το προγραμματισμένο και το άμεσο πότισμα χρησιμοποιούν τη σταθερή Διάρκεια Manual. Δεν λαμβάνονται υπόψη υγρασία χώματος, καιρός ή βροχή. Auto: πριν ανοίξει η βάνα, το σύστημα ελέγχει τους αισθητήρες υγρασίας, τον καιρό, τη μετρημένη βροχή και τα όρια ασφαλείας. Μπορεί να μειώσει ή να αυξήσει τη διάρκεια ή να παραλείψει εντελώς το πότισμα. Το κουμπί «Πότισμα τώρα» εκτελεί πάντα τη χειροκίνητη διάρκεια.",
    en: "Manual: scheduled and immediate watering use the fixed Manual duration. Soil moisture, weather and rain are ignored. Auto: before opening the valve, the system evaluates soil sensors, current weather, measured rain and safety limits. It may shorten, extend or completely skip watering. The Run now button always uses the manual duration.",
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
  sensor_max_age_minutes: {
    el: "Η μέγιστη ηλικία μιας μέτρησης υγρασίας για να θεωρείται αξιόπιστη. Παλαιότερη μέτρηση χαρακτηρίζεται μη διαθέσιμη και εφαρμόζεται η ρύθμιση αποτυχίας αισθητήρων.",
    en: "The maximum age of a soil-moisture reading before it is considered unreliable. Older readings are treated as unavailable and the sensor-failure rule is applied.",
  },
  sensor_failure: {
    el: "Καθορίζει τι θα γίνει όταν κανένας αισθητήρας υγρασίας δεν δίνει έγκυρη, πρόσφατη μέτρηση. «Παράλειψη» δεν ποτίζει. «Χρήση βασικής διάρκειας» ποτίζει με τον βασικό χρόνο, μέσα στα όρια ασφαλείας.",
    en: "Controls what happens when neither soil sensor provides a valid recent reading. Skip watering does not run. Use base duration waters for the configured base time within the safety limits.",
  },
  exposure: {
    el: "Δηλώνει αν οι γλάστρες δέχονται τη βροχή. Εκτεθειμένο: πλήρης επίδραση. Μερικώς στεγασμένο: μειωμένη επίδραση. Στεγασμένο: η βροχή θεωρείται ότι δεν φτάνει στις γλάστρες.",
    en: "Describes whether rain reaches the pots. Exposed: full effect. Partly covered: reduced effect. Covered: rain is treated as not reaching the pots.",
  },
  rain_reach_percent: {
    el: "Επιπλέον διόρθωση για το ποσοστό της μετρημένης βροχής που πραγματικά φτάνει στις γλάστρες. Παράδειγμα: 50% σημαίνει ότι από 10 mm βροχής υπολογίζονται μόνο 5 mm.",
    en: "Additional correction for the proportion of measured rain that actually reaches the pots. For example, 50% means only 5 mm is counted from 10 mm of measured rain.",
  },
  measured_rain_threshold: {
    el: "Αν η βροχή που υπολογίζεται ότι έφτασε στις γλάστρες είναι ίση ή μεγαλύτερη από αυτό το όριο, το Auto παραλείπει το πότισμα.",
    en: "If the rain calculated to have reached the pots is equal to or above this limit, Auto skips watering.",
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
  rain_sensor: {
    el: "Αριθμητικό sensor entity που δίνει τα πραγματικά χιλιοστά βροχής των τελευταίων 24 ωρών. Δεν είναι η πιθανότητα βροχής από την πρόγνωση.",
    en: "A numeric sensor entity containing actual rain in millimetres over the last 24 hours. It is not the forecast rain probability.",
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
};

class WateringManagerPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.state = { systems: [], logs: [], active_system_ids: [] };
    this.selectedId = null;
    this.tab = "overview";
    this.statsRange = "week";
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
          <nav>${["overview","schedule","automatic","hardware","statistics","logs"].map((tab) => `<button data-tab="${tab}" class="${this.tab === tab ? "active" : ""}"><ha-icon icon="${this.tabIcon(tab)}"></ha-icon>${this.t(tab)}</button>`).join("")}</nav>
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
    const editable = ["schedule", "automatic", "hardware"].includes(this.tab);
    return `<div class="actions">${running ? `<button class="danger" id="stop"><ha-icon icon="mdi:stop"></ha-icon>${this.t("stop")}</button>` : `<button id="run"><ha-icon icon="mdi:play"></ha-icon>${this.t("runNow")}</button>`}${editable ? `<button class="primary" id="save"><ha-icon icon="mdi:content-save"></ha-icon>${this.t("save")}</button>` : ""}<button class="icon danger-text" id="delete"><ha-icon icon="mdi:delete-outline"></ha-icon></button></div>`;
  }

  tabIcon(tab) { return ({overview:"mdi:view-dashboard-outline",schedule:"mdi:calendar-clock",automatic:"mdi:auto-fix",hardware:"mdi:chip",statistics:"mdi:chart-bar",logs:"mdi:format-list-bulleted"})[tab]; }

  tabContent(system) {
    if (this.tab === "overview") return this.overview(system);
    if (this.tab === "schedule") return this.schedule(system);
    if (this.tab === "automatic") return this.automatic(system);
    if (this.tab === "hardware") return this.hardware(system);
    if (this.tab === "statistics") return this.statistics(system);
    return this.logs(system);
  }

  overview(system) {
    const running = this.state.active_system_ids.includes(system.id);
    const moisture = [system.moisture_sensor_1, system.moisture_sensor_2].map((id) => this.entityState(id));
    const soilTemperature1 = this.entityValueWithUnit(system.soil_temperature_sensor);
    const soilTemperature2 = this.entityValueWithUnit(system.soil_temperature_sensor_2);
    const weather = this.weatherSummary(system.weather_entity);
    return `<div class="grid stats">
      ${this.stat("mdi:water-percent", this.t("sensorValues"), moisture.map((v) => v == null ? "—" : `${v}%`).join(" / "))}
      ${this.stat("mdi:thermometer-lines", this.t("soilTemperature1"), soilTemperature1)}
      ${this.stat("mdi:thermometer-lines", this.t("soilTemperature2"), soilTemperature2)}
      ${this.stat(weather.icon, this.t("weather"), weather.text)}
      ${this.stat("mdi:clock-outline", this.t("lastRun"), system.last_run_at ? this.formatDate(system.last_run_at) : "—")}
      ${this.stat("mdi:timer-outline", this.t("lastDuration"), system.last_duration == null ? "—" : `${system.last_duration} ${this.t("minutes")}`)}
      ${this.stat(running ? "mdi:water-pump" : "mdi:check-circle-outline", this.t("currentStatus"), running ? this.t("running") : this.t("idle"))}
      <section class="card wide"><h3>${this.t("lastReason")}</h3><p class="reason">${this.reason(system.last_reason)}</p></section>
      <section class="card wide info"><ha-icon icon="mdi:information-outline"></ha-icon><p>${this.t("modeHelp")}</p></section>
    </div>`;
  }

  stat(icon, label, value) { return `<section class="card stat"><ha-icon icon="${icon}"></ha-icon><div><small>${label}</small><strong>${this.esc(value)}</strong></div></section>`; }

  schedule(system) {
    const days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
    return `<form id="settings-form"><section class="card form-card"><div class="fields two">
      ${this.input("name", this.t("name"), system.name, "text")}
      ${this.selectField("mode", this.t("mode"), system.mode, [["manual",this.t("manual")],["auto",this.t("auto")]])}
      ${this.input("start_time", this.t("startTime"), system.start_time, "time")}
      ${this.number("manual_duration", this.t("manualDuration"), system.manual_duration, 1, 240, this.t("minutes"))}
    </div>
    <label class="toggle"><input name="enabled" type="checkbox" ${system.enabled ? "checked" : ""}><span></span>${this.t("enabled")}</label>
    <div class="field"><label>${this.t("days")}</label><div class="days">${days.map((day, index) => `<label><input type="checkbox" name="days" value="${index}" ${system.days.includes(index) ? "checked" : ""}><span>${this.t(day)}</span></label>`).join("")}</div></div>
    <div class="info-line"><ha-icon icon="mdi:information-outline"></ha-icon>${this.t("modeHelp")}</div>
    ${this.textarea("notes", this.t("notes"), system.notes)}</section></form>`;
  }

  automatic(system) {
    return `<form id="settings-form"><div class="grid">
      <section class="card form-card"><h3>${this.t("automatic")}</h3><div class="fields two">
        ${this.number("base_duration", this.t("baseDuration"), system.base_duration, 1, 240, this.t("minutes"))}
        ${this.number("conflict_duration", this.t("conflictDuration"), system.conflict_duration, 1, 60, this.t("minutes"))}
        ${this.number("dry_threshold", this.t("dryThreshold"), system.dry_threshold, 0, 100, "%")}
        ${this.number("wet_threshold", this.t("wetThreshold"), system.wet_threshold, 0, 100, "%")}
        ${this.number("weather_sensitivity", this.t("weatherSensitivity"), system.weather_sensitivity, 0, 100, "%")}
        ${this.number("sensor_max_age_minutes", this.t("maxSensorAge"), system.sensor_max_age_minutes, 5, 1440, this.t("minutes"))}
        ${this.selectField("sensor_failure", this.t("failureMode"), system.sensor_failure, [["skip",this.t("skip")],["base_duration",this.t("useBase")]])}
        ${this.selectField("exposure", this.t("exposure"), system.exposure, [["exposed",this.t("exposed")],["partial",this.t("partial")],["covered",this.t("covered")]])}
        ${this.number("rain_reach_percent", this.t("rainReach"), system.rain_reach_percent, 0, 100, "%")}
        ${this.number("measured_rain_threshold", this.t("rainThreshold"), system.measured_rain_threshold, 0, 100, "mm")}
      </div><div class="info-line"><ha-icon icon="mdi:weather-partly-cloudy"></ha-icon>${this.t("weatherInfo")}</div><div class="info-line"><ha-icon icon="mdi:alert-circle-outline"></ha-icon>${this.t("sensorConflict")}</div></section>
      <section class="card form-card"><h3>${this.t("safety")}</h3><div class="fields two">
        ${this.number("minimum_duration", this.t("minDuration"), system.minimum_duration, 1, 60, this.t("minutes"))}
        ${this.number("maximum_duration", this.t("maxDuration"), system.maximum_duration, 1, 240, this.t("minutes"))}
        ${this.number("minimum_interval_hours", this.t("minimumInterval"), system.minimum_interval_hours, 0, 168, this.t("hours"))}
        ${this.number("soak_cycles", this.t("soakCycles"), system.soak_cycles, 1, 10, "")}
        ${this.number("soak_pause_minutes", this.t("soakPause"), system.soak_pause_minutes, 0, 60, this.t("minutes"))}
      </div></section>
    </div></form>`;
  }

  hardware(system) {
    return `<form id="settings-form"><section class="card form-card"><h3>${this.t("hardware")}</h3><p class="muted">${this.t("entityHelp")}</p><div class="fields two">
      ${this.entityField("valve_entity", this.t("valve"), system.valve_entity, ["switch","valve","input_boolean"])}
      ${this.entityField("weather_entity", this.t("weather"), system.weather_entity, ["weather"])}
      ${this.entityField("moisture_sensor_1", this.t("moisture1"), system.moisture_sensor_1, ["sensor"])}
      ${this.entityField("moisture_sensor_2", this.t("moisture2"), system.moisture_sensor_2, ["sensor"])}
      ${this.entityField("soil_temperature_sensor", this.t("soilTemperature1"), system.soil_temperature_sensor, ["sensor"])}
      ${this.entityField("soil_temperature_sensor_2", this.t("soilTemperature2"), system.soil_temperature_sensor_2, ["sensor"])}
      ${this.entityField("rain_sensor", this.t("rain"), system.rain_sensor, ["sensor"])}
      ${this.entityField("flow_sensor", this.t("flow"), system.flow_sensor, ["sensor"])}
      ${this.number("flow_minimum", this.t("flowMinimum"), system.flow_minimum, 0, 10000, "")}
      ${this.number("flow_maximum", this.t("flowMaximum"), system.flow_maximum, 0, 10000, "")}
      ${this.number("flow_grace_seconds", this.t("flowGrace"), system.flow_grace_seconds, 1, 120, "sec")}
    </div></section></form>`;
  }

  statistics(system) {
    const { start, end } = this.statisticsWindow();
    const logs = this.state.logs.filter((log) => {
      if (log.system_id !== system.id) return false;
      const timestamp = new Date(log.timestamp);
      return timestamp >= start && timestamp < end;
    });
    const wateringLogs = logs.filter((log) => Number(log.actual_duration) > 0);
    const totalMinutes = wateringLogs.reduce((sum, log) => sum + Number(log.actual_duration || 0), 0);
    const volumeLogs = wateringLogs.filter((log) => log.water_volume_liters != null && Number.isFinite(Number(log.water_volume_liters)));
    const totalLiters = volumeLogs.reduce((sum, log) => sum + Number(log.water_volume_liters), 0);
    const temperatures = wateringLogs.map((log) => log.inputs?.weather?.temperature).filter((value) => value != null && Number.isFinite(Number(value))).map(Number);
    const soilTemperatures1 = wateringLogs.map((log) => log.inputs?.soil_temperatures?.[0] ?? log.inputs?.soil_temperature).filter((value) => value != null && Number.isFinite(Number(value))).map(Number);
    const soilTemperatures2 = wateringLogs.map((log) => log.inputs?.soil_temperatures?.[1]).filter((value) => value != null && Number.isFinite(Number(value))).map(Number);
    const moisture = wateringLogs.flatMap((log) => (log.inputs?.moisture || []).filter((reading) => reading.valid).map((reading) => Number(reading.value))).filter(Number.isFinite);
    const averageTemperature = this.average(temperatures);
    const averageSoilTemperature1 = this.average(soilTemperatures1);
    const averageSoilTemperature2 = this.average(soilTemperatures2);
    const averageMoisture = this.average(moisture);
    const soilTemperatureUnit1 = this.hass.states[system.soil_temperature_sensor]?.attributes?.unit_of_measurement || "°";
    const soilTemperatureUnit2 = this.hass.states[system.soil_temperature_sensor_2]?.attributes?.unit_of_measurement || "°";
    const completed = logs.filter((log) => log.status === "completed").length;
    const skipped = logs.filter((log) => log.status === "skipped").length;
    const failed = logs.filter((log) => log.status === "failed").length;
    const buckets = this.statisticsBuckets(wateringLogs, start);
    const maxMinutes = Math.max(0, ...buckets.map((bucket) => bucket.minutes));
    return `<div class="statistics-view">
      <div class="range-tabs">${["day","week","month"].map((range) => `<button type="button" data-stats-range="${range}" class="${this.statsRange === range ? "active" : ""}">${this.t(range)}</button>`).join("")}</div>
      <div class="grid stats">
        ${this.stat("mdi:timer-outline", this.t("totalWateringTime"), this.formatMinutes(totalMinutes))}
        ${this.stat("mdi:water-outline", this.t("totalWaterVolume"), volumeLogs.length ? this.formatVolume(totalLiters) : "—")}
        ${this.stat("mdi:thermometer", this.t("averageTemperature"), averageTemperature == null ? "—" : `${averageTemperature.toFixed(1)}°`)}
        ${this.stat("mdi:thermometer-lines", this.t("averageSoilTemperature1"), averageSoilTemperature1 == null ? "—" : `${averageSoilTemperature1.toFixed(1)} ${soilTemperatureUnit1}`)}
        ${this.stat("mdi:thermometer-lines", this.t("averageSoilTemperature2"), averageSoilTemperature2 == null ? "—" : `${averageSoilTemperature2.toFixed(1)} ${soilTemperatureUnit2}`)}
        ${this.stat("mdi:water-percent", this.t("averageMoisture"), averageMoisture == null ? "—" : `${averageMoisture.toFixed(1)}%`)}
        ${this.stat("mdi:sprinkler-variant", this.t("wateringRuns"), String(wateringLogs.length))}
        ${this.stat("mdi:check-circle-outline", this.t("successfulRuns"), String(completed))}
        ${this.stat("mdi:skip-next-outline", this.t("skippedRuns"), String(skipped))}
        ${this.stat("mdi:alert-circle-outline", this.t("failedRuns"), String(failed))}
      </div>
      <section class="card chart-card"><h3>${this.t("durationChart")}</h3>
        ${wateringLogs.length ? `<div class="chart-scroll"><div class="bar-chart">${buckets.map((bucket) => {
          const height = maxMinutes ? Math.max(3, Math.round(bucket.minutes / maxMinutes * 100)) : 0;
          return `<div class="bar-column" title="${this.esc(bucket.label)}: ${this.esc(this.formatMinutes(bucket.minutes))}"><span>${bucket.minutes ? this.formatCompactMinutes(bucket.minutes) : ""}</span><div class="bar-track"><i style="height:${height}%"></i></div><small>${this.esc(bucket.label)}</small></div>`;
        }).join("")}</div></div>` : `<p class="muted">${this.t("noStatistics")}</p>`}
      </section>
      ${volumeLogs.length && volumeLogs.length < wateringLogs.length ? `<div class="info-line"><ha-icon icon="mdi:information-outline"></ha-icon>${this.t("volumePartial")}</div>` : ""}
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
    return `<section class="card log-card"><div class="table-wrap"><table><thead><tr><th>${this.t("date")}</th><th>${this.t("status")}</th><th>${this.t("reason")}</th><th>${this.t("trigger")}</th><th>${this.t("planned")}</th><th>${this.t("actual")}</th></tr></thead><tbody>${rows.map((log) => `<tr><td>${this.formatDate(log.timestamp)}</td><td><span class="pill ${log.status}">${this.esc(log.status)}</span></td><td>${this.reason(log.reason)}</td><td>${this.esc(log.trigger)}</td><td>${log.planned_duration} ${this.t("minutes")}</td><td>${log.actual_duration == null ? "—" : `${log.actual_duration} ${this.t("minutes")}`}</td></tr>`).join("")}</tbody></table></div></section>`;
  }

  fieldLabel(name, label) { return `<div class="field-label"><label for="${name}">${label}</label>${WM_HELP[name] ? `<button type="button" class="help-button" data-help="${name}" aria-label="${this.t("help")}: ${this.esc(label)}">!</button>` : ""}</div>`; }
  input(name, label, value, type) { return `<div class="field">${this.fieldLabel(name, label)}<input id="${name}" name="${name}" type="${type}" value="${this.esc(value)}"></div>`; }
  number(name, label, value, min, max, suffix) { return `<div class="field">${this.fieldLabel(name, label)}<div class="suffix"><input id="${name}" name="${name}" type="number" min="${min}" max="${max}" step="1" value="${this.esc(value)}"><span>${suffix}</span></div></div>`; }
  textarea(name, label, value) { return `<div class="field"><label for="${name}">${label}</label><textarea id="${name}" name="${name}" rows="3">${this.esc(value)}</textarea></div>`; }
  selectField(name, label, value, options) { return `<div class="field">${this.fieldLabel(name, label)}<select id="${name}" name="${name}">${options.map(([key,text]) => `<option value="${key}" ${key === value ? "selected" : ""}>${text}</option>`).join("")}</select></div>`; }
  entityField(name, label, value, domains) {
    const options = Object.values(this.hass.states).filter((state) => domains.includes(state.entity_id.split(".")[0])).sort((a,b) => this.entityName(a).localeCompare(this.entityName(b)));
    return `<div class="field">${this.fieldLabel(name, label)}<select id="${name}" name="${name}"><option value="">— ${this.t("notConfigured")} —</option>${options.map((state) => `<option value="${state.entity_id}" ${state.entity_id === value ? "selected" : ""}>${this.esc(this.entityName(state))} · ${state.entity_id}</option>`).join("")}</select></div>`;
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
  reason(value) {
    if (!value) return "—";
    const map = {manual_duration:{el:"Χειροκίνητη διάρκεια",en:"Manual duration"},soil_dry:{el:"Στεγνό χώμα",en:"Dry soil"},soil_partly_dry:{el:"Μερικώς στεγνό χώμα",en:"Partly dry soil"},soil_wet:{el:"Το χώμα είναι υγρό",en:"Soil is wet"},sensor_conflict_short_run:{el:"Διαφωνία αισθητήρων – σύντομο πότισμα",en:"Sensor conflict – short watering"},sensors_unavailable:{el:"Οι αισθητήρες δεν είναι διαθέσιμοι",en:"Sensors unavailable"},sensors_unavailable_base_duration:{el:"Αισθητήρες εκτός – βασική διάρκεια",en:"Sensors unavailable – base duration"},measured_rain:{el:"Έχει μετρηθεί αρκετή βροχή",en:"Enough measured rain"},minimum_interval:{el:"Δεν πέρασε το ελάχιστο διάστημα",en:"Minimum interval not reached"},system_disabled:{el:"Το σύστημα είναι ανενεργό",en:"System disabled"},stopped_by_user:{el:"Διακοπή από τον χρήστη",en:"Stopped by user"},flow_sensor_unavailable:{el:"Ο αισθητήρας ροής δεν είναι διαθέσιμος",en:"Flow sensor unavailable"},flow_too_low:{el:"Πολύ χαμηλή ή μηδενική ροή",en:"Flow too low or absent"},flow_too_high:{el:"Υπερβολική ροή – πιθανή διαρροή",en:"Excessive flow – possible leak"}};
    return map[value]?.[this.language] || value.replaceAll("_", " ");
  }

  bindEvents() {
    this.shadowRoot.getElementById("language")?.addEventListener("change", (event) => { this.language = event.target.value; localStorage.setItem("watering-manager-language", this.language); this.render(); });
    this.shadowRoot.getElementById("refresh")?.addEventListener("click", () => this.loadState());
    ["new-system","create-first"].forEach((id) => this.shadowRoot.getElementById(id)?.addEventListener("click", () => this.showCreateDialog()));
    this.shadowRoot.getElementById("system-select")?.addEventListener("change", (event) => { this.selectedId = event.target.value; this.tab = "overview"; this.render(); });
    this.shadowRoot.querySelectorAll("[data-tab]").forEach((button) => button.addEventListener("click", () => { this.tab = button.dataset.tab; this.render(); }));
    this.shadowRoot.getElementById("save")?.addEventListener("click", () => this.save());
    this.shadowRoot.getElementById("delete")?.addEventListener("click", () => this.remove());
    this.shadowRoot.getElementById("run")?.addEventListener("click", () => this.run());
    this.shadowRoot.getElementById("stop")?.addEventListener("click", () => this.stop());
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
      data.days = [...form.querySelectorAll('input[name="days"]:checked')].map((input) => Number(input.value));
    }
    const numeric = ["manual_duration","base_duration","minimum_duration","maximum_duration","conflict_duration","dry_threshold","wet_threshold","sensor_max_age_minutes","rain_reach_percent","measured_rain_threshold","weather_sensitivity","minimum_interval_hours","soak_cycles","soak_pause_minutes","flow_minimum","flow_maximum","flow_grace_seconds"];
    numeric.forEach((key) => { if (key in data) data[key] = Number(data[key]); });
    return data;
  }

  async save() {
    try {
      const updated = await this.call("update_system", { system_id: this.selectedId, system: this.collectForm() });
      Object.assign(this.system, updated);
      this.message(this.t("saved"));
      this.render();
    } catch (error) { this.message(error.message || String(error), true); }
  }

  async run() {
    if (!this.system.valve_entity) { this.message(this.t("valveRequired"), true); return; }
    try { await this.call("run_system", {system_id:this.selectedId}); await this.loadState(); }
    catch (error) { this.message(error.message || String(error), true); }
  }
  async stop() { try { await this.call("stop_system", {system_id:this.selectedId}); await this.loadState(); } catch (error) { this.message(error.message || String(error), true); } }
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
      :host{--wm-green:#39745b;--wm-green-soft:color-mix(in srgb,var(--wm-green) 12%,transparent);display:block;background:var(--primary-background-color);min-height:100vh;color:var(--primary-text-color);font-family:var(--paper-font-body1_-_font-family,system-ui)}*{box-sizing:border-box}.app{min-height:100vh}header{height:76px;padding:0 24px;display:flex;align-items:center;justify-content:space-between;background:var(--card-background-color);border-bottom:1px solid var(--divider-color);position:sticky;top:0;z-index:5}.brand,.header-actions,.actions,.title-row{display:flex;align-items:center}.brand{gap:12px}.brand>ha-icon{color:var(--wm-green);--mdc-icon-size:32px}.brand h1{font-size:20px;margin:0;display:flex;align-items:center;gap:8px}.version-badge{font-size:10px;line-height:1;padding:4px 6px;border-radius:10px;background:var(--wm-green-soft);color:var(--wm-green);font-weight:700}.brand small,.muted,.title-row p{color:var(--secondary-text-color)}.header-actions,.actions{gap:8px}button,select,input,textarea{font:inherit;color:inherit}button{border:1px solid var(--divider-color);background:var(--card-background-color);border-radius:10px;padding:10px 14px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:7px}button.primary{background:var(--wm-green);color:white;border-color:var(--wm-green)}button.danger{background:var(--error-color);color:white;border-color:var(--error-color)}button.icon{padding:10px}.danger-text{color:var(--error-color)}select,input,textarea{width:100%;background:var(--card-background-color);border:1px solid var(--divider-color);border-radius:9px;padding:11px 12px;outline:none}select:focus,input:focus,textarea:focus{border-color:var(--wm-green);box-shadow:0 0 0 2px var(--wm-green-soft)}.workspace{display:grid;grid-template-columns:240px minmax(0,1fr);max-width:1500px;margin:auto;min-height:calc(100vh - 76px)}aside{padding:24px 18px;border-right:1px solid var(--divider-color);background:var(--card-background-color)}aside>label,.field>label,.field-label label{display:block;font-size:12px;font-weight:650;color:var(--secondary-text-color)}aside>label,.field>label{margin:0 0 7px}.field-label{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0 0 7px}.help-button{width:30px;height:30px;min-width:30px;padding:0;border-radius:50%;border-color:color-mix(in srgb,var(--wm-green) 42%,var(--divider-color));color:var(--wm-green);font-size:14px;font-weight:800;background:var(--wm-green-soft)}.help-button:hover,.help-button:focus{background:var(--wm-green);color:#fff;outline:none}.help-dialog-title{display:flex;align-items:center;gap:12px}.help-dialog-title h2{margin:0}.help-mark{display:grid;place-items:center;width:34px;height:34px;min-width:34px;border-radius:50%;background:var(--wm-green);color:#fff;font-weight:800}.help-dialog section{padding:24px}.help-dialog p{line-height:1.6;white-space:pre-line;margin:18px 0 24px}.help-dialog .help-close{width:100%;min-height:44px}aside nav{display:grid;gap:5px;margin-top:24px}aside nav button{justify-content:flex-start;border:0;background:transparent;padding:11px}aside nav button.active{background:var(--wm-green-soft);color:var(--wm-green)}.aside-status{margin-top:24px;padding:12px;border-top:1px solid var(--divider-color);display:flex;align-items:center;gap:8px;font-size:13px}.dot{width:9px;height:9px;background:#9ca3af;border-radius:50%}.dot.on{background:#22c55e;box-shadow:0 0 0 5px rgba(34,197,94,.12)}main{padding:28px;min-width:0}.title-row{justify-content:space-between;margin-bottom:24px;gap:16px}.title-row h2{font-size:26px;margin:0 0 4px}.title-row p{margin:0}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.card{background:var(--card-background-color);border:1px solid var(--divider-color);border-radius:14px;padding:20px;box-shadow:var(--ha-card-box-shadow,none)}.wide{grid-column:1/-1}.stat{display:flex;align-items:center;gap:16px}.stat>ha-icon{color:var(--wm-green);background:var(--wm-green-soft);padding:12px;border-radius:12px;box-sizing:content-box}.stat small,.stat strong{display:block}.stat strong{font-size:20px;margin-top:5px}.card h3{margin:0 0 18px}.reason{font-size:18px;margin:0}.info{display:flex;gap:12px;align-items:flex-start}.info ha-icon,.info-line ha-icon{color:var(--wm-green);flex:none}.info p{margin:0}.form-card{max-width:1000px}.fields{display:grid;gap:17px}.fields.two{grid-template-columns:repeat(2,minmax(0,1fr))}.field{margin-bottom:17px}.suffix{display:flex}.suffix input{border-radius:9px 0 0 9px}.suffix span{border:1px solid var(--divider-color);border-left:0;border-radius:0 9px 9px 0;padding:11px;background:var(--secondary-background-color);white-space:nowrap;color:var(--secondary-text-color)}.toggle{display:flex;align-items:center;gap:10px;margin:5px 0 22px}.toggle input{display:none}.toggle span{width:42px;height:24px;background:#9ca3af;border-radius:20px;position:relative}.toggle span:after{content:"";position:absolute;width:18px;height:18px;top:3px;left:3px;background:white;border-radius:50%;transition:.2s}.toggle input:checked+span{background:var(--wm-green)}.toggle input:checked+span:after{left:21px}.days{display:flex;gap:8px;flex-wrap:wrap}.days input{display:none}.days span{display:flex;width:44px;height:44px;align-items:center;justify-content:center;border:1px solid var(--divider-color);border-radius:50%;cursor:pointer}.days input:checked+span{background:var(--wm-green);border-color:var(--wm-green);color:white}.info-line{display:flex;align-items:flex-start;gap:9px;padding:12px;margin:12px 0;background:var(--wm-green-soft);border-radius:10px;font-size:13px}.empty{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:12px;color:var(--secondary-text-color)}.empty>ha-icon{--mdc-icon-size:60px;color:var(--wm-green)}.empty.compact{min-height:300px}.loading{min-height:60vh;display:grid;place-items:center}.log-card{padding:0;overflow:hidden}.table-wrap{overflow:auto}table{width:100%;border-collapse:collapse;white-space:nowrap}th,td{text-align:left;padding:14px;border-bottom:1px solid var(--divider-color);font-size:13px}th{color:var(--secondary-text-color);background:var(--secondary-background-color)}.pill{padding:4px 8px;border-radius:20px;background:var(--secondary-background-color)}.pill.completed{color:#15803d;background:#dcfce7}.pill.failed{color:#b91c1c;background:#fee2e2}.toast{position:fixed;right:24px;bottom:24px;background:#1f2937;color:white;border-radius:10px;padding:13px 18px;opacity:0;transform:translateY(20px);pointer-events:none;transition:.2s;z-index:20}.toast.show{opacity:1;transform:none}.toast.error{background:var(--error-color)}
      .statistics-view{display:grid;gap:16px}.range-tabs{display:flex;gap:6px;padding:4px;background:var(--secondary-background-color);border-radius:12px;width:max-content;max-width:100%}.range-tabs button{border:0;background:transparent;min-width:92px}.range-tabs button.active{background:var(--wm-green);color:#fff}.chart-card{overflow:hidden}.chart-scroll{overflow-x:auto;padding:4px 0 8px}.bar-chart{height:220px;display:flex;align-items:stretch;gap:8px;min-width:max-content}.bar-column{width:38px;display:grid;grid-template-rows:22px 1fr 22px;align-items:end;text-align:center}.bar-column>span{font-size:10px;color:var(--secondary-text-color);align-self:center}.bar-track{height:150px;width:22px;margin:auto;background:var(--secondary-background-color);border-radius:7px;overflow:hidden;display:flex;align-items:flex-end}.bar-track i{display:block;width:100%;background:var(--wm-green);border-radius:7px 7px 0 0;min-height:0}.bar-column small{font-size:11px;color:var(--secondary-text-color);overflow:hidden;text-overflow:ellipsis}.statistics-view>.info-line{margin:0}.statistics-view .stats{grid-template-columns:repeat(4,minmax(0,1fr))}
      dialog{border:0;border-radius:16px;background:var(--card-background-color);color:var(--primary-text-color);padding:0;box-shadow:0 20px 60px rgba(0,0,0,.35);max-width:460px;width:calc(100% - 32px)}dialog::backdrop{background:rgba(0,0,0,.5)}dialog form{padding:24px}dialog h2{margin:0 0 8px}dialog p{color:var(--secondary-text-color);margin-bottom:20px}dialog label{display:grid;gap:7px;font-size:13px;font-weight:650}dialog form>div{display:flex;justify-content:flex-end;gap:8px;margin-top:22px}
      @media(max-width:800px){header{height:auto;min-height:68px;padding:12px 14px}.brand small{display:none}.brand h1{font-size:17px}.version-badge{font-size:9px}.header-actions .primary{font-size:0}.header-actions .primary ha-icon{font-size:initial}.workspace{display:block}.workspace aside{border-right:0;border-bottom:1px solid var(--divider-color);padding:12px 14px;position:sticky;top:68px;z-index:4}aside>label,.aside-status{display:none}aside nav{display:flex;margin-top:10px;overflow:auto}aside nav button{min-width:max-content;font-size:12px;flex-direction:column;gap:3px;padding:8px 10px}main{padding:18px 14px}.title-row{align-items:flex-start}.title-row h2{font-size:21px}.actions{flex-wrap:wrap;justify-content:flex-end}.actions button{font-size:0;padding:9px}.actions button ha-icon{font-size:initial}.grid,.fields.two{grid-template-columns:1fr}.stats,.statistics-view .stats{grid-template-columns:1fr 1fr}.stat{padding:14px}.stat strong{font-size:16px}.wide{grid-column:1/-1}.form-card{padding:16px}.days{justify-content:space-between}.days span{width:39px;height:39px}.help-button{width:36px;height:36px;min-width:36px}.help-dialog{max-height:calc(100vh - 24px);overflow:auto}.help-dialog section{padding:20px}.range-tabs{width:100%}.range-tabs button{min-width:0;flex:1;padding:10px 8px}.toast{left:14px;right:14px;bottom:14px}}
      @media(max-width:450px){.stats{grid-template-columns:1fr}.header-actions select{max-width:105px}.brand>ha-icon{display:none}}
    `;
  }
}

if (!customElements.get("watering-manager-panel")) {
  customElements.define("watering-manager-panel", WateringManagerPanel);
}
