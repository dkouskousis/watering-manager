const WM_TRANSLATIONS = {
  en: {
    app: "Watering Manager", systems: "Watering systems", newSystem: "New system",
    selectSystem: "Select system", overview: "Overview", schedule: "Schedule",
    automatic: "Automatic", hardware: "Entities", logs: "Logs", save: "Save",
    delete: "Delete", duplicate: "Duplicate", runNow: "Run now", stop: "Stop",
    noSystems: "No watering systems yet.", createFirst: "Create the first system",
    name: "Name", enabled: "Enabled", mode: "Mode", manual: "Manual", auto: "Auto",
    modeHelp: "Manual always uses the fixed duration. Auto decides whether to water and adjusts the duration using soil moisture, weather, rain and safety limits.",
    days: "Watering days", startTime: "Start time", manualDuration: "Manual duration",
    minutes: "minutes", valve: "Valve or switch", moisture1: "Soil moisture sensor 1",
    moisture2: "Soil moisture sensor 2", weather: "Weather entity",
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
  },
  el: {
    app: "Διαχείριση ποτίσματος", systems: "Συστήματα ποτίσματος", newSystem: "Νέο σύστημα",
    selectSystem: "Επιλογή συστήματος", overview: "Επισκόπηση", schedule: "Πρόγραμμα",
    automatic: "Αυτόματο", hardware: "Entities", logs: "Ιστορικό", save: "Αποθήκευση",
    delete: "Διαγραφή", duplicate: "Αντιγραφή", runNow: "Πότισμα τώρα", stop: "Διακοπή",
    noSystems: "Δεν υπάρχουν ακόμη συστήματα ποτίσματος.", createFirst: "Δημιουργία πρώτου συστήματος",
    name: "Όνομα", enabled: "Ενεργό", mode: "Λειτουργία", manual: "Manual", auto: "Auto",
    modeHelp: "Το Manual χρησιμοποιεί πάντα τη σταθερή διάρκεια. Το Auto αποφασίζει αν χρειάζεται πότισμα και προσαρμόζει τη διάρκεια από την υγρασία χώματος, τον καιρό, τη βροχή και τα όρια ασφαλείας.",
    days: "Ημέρες ποτίσματος", startTime: "Ώρα έναρξης", manualDuration: "Διάρκεια Manual",
    minutes: "λεπτά", valve: "Βάνα ή διακόπτης", moisture1: "Αισθητήρας υγρασίας χώματος 1",
    moisture2: "Αισθητήρας υγρασίας χώματος 2", weather: "Entity καιρού",
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
  },
};

class WateringManagerPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.state = { systems: [], logs: [], active_system_ids: [] };
    this.selectedId = null;
    this.tab = "overview";
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
          <div class="brand"><ha-icon icon="mdi:sprinkler-variant"></ha-icon><div><h1>${this.t("app")}</h1><small>${this.state.systems.length} ${this.t("systemsCount")}</small></div></div>
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
          <nav>${["overview","schedule","automatic","hardware","logs"].map((tab) => `<button data-tab="${tab}" class="${this.tab === tab ? "active" : ""}"><ha-icon icon="${this.tabIcon(tab)}"></ha-icon>${this.t(tab)}</button>`).join("")}</nav>
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

  tabIcon(tab) { return ({overview:"mdi:view-dashboard-outline",schedule:"mdi:calendar-clock",automatic:"mdi:auto-fix",hardware:"mdi:chip",logs:"mdi:format-list-bulleted"})[tab]; }

  tabContent(system) {
    if (this.tab === "overview") return this.overview(system);
    if (this.tab === "schedule") return this.schedule(system);
    if (this.tab === "automatic") return this.automatic(system);
    if (this.tab === "hardware") return this.hardware(system);
    return this.logs(system);
  }

  overview(system) {
    const running = this.state.active_system_ids.includes(system.id);
    const moisture = [system.moisture_sensor_1, system.moisture_sensor_2].map((id) => this.entityState(id));
    const weather = this.weatherSummary(system.weather_entity);
    return `<div class="grid stats">
      ${this.stat("mdi:water-percent", this.t("sensorValues"), moisture.map((v) => v == null ? "—" : `${v}%`).join(" / "))}
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
      ${this.entityField("rain_sensor", this.t("rain"), system.rain_sensor, ["sensor"])}
      ${this.entityField("flow_sensor", this.t("flow"), system.flow_sensor, ["sensor"])}
      ${this.number("flow_minimum", this.t("flowMinimum"), system.flow_minimum, 0, 10000, "")}
      ${this.number("flow_maximum", this.t("flowMaximum"), system.flow_maximum, 0, 10000, "")}
      ${this.number("flow_grace_seconds", this.t("flowGrace"), system.flow_grace_seconds, 1, 120, "sec")}
    </div></section></form>`;
  }

  logs(system) {
    const rows = this.state.logs.filter((log) => log.system_id === system.id).slice().reverse().slice(0, 10);
    if (!rows.length) return `<section class="empty compact"><ha-icon icon="mdi:format-list-bulleted"></ha-icon><h3>${this.t("noLogs")}</h3></section>`;
    return `<section class="card log-card"><div class="table-wrap"><table><thead><tr><th>${this.t("date")}</th><th>${this.t("status")}</th><th>${this.t("reason")}</th><th>${this.t("trigger")}</th><th>${this.t("planned")}</th><th>${this.t("actual")}</th></tr></thead><tbody>${rows.map((log) => `<tr><td>${this.formatDate(log.timestamp)}</td><td><span class="pill ${log.status}">${this.esc(log.status)}</span></td><td>${this.reason(log.reason)}</td><td>${this.esc(log.trigger)}</td><td>${log.planned_duration} ${this.t("minutes")}</td><td>${log.actual_duration == null ? "—" : `${log.actual_duration} ${this.t("minutes")}`}</td></tr>`).join("")}</tbody></table></div></section>`;
  }

  input(name, label, value, type) { return `<div class="field"><label for="${name}">${label}</label><input id="${name}" name="${name}" type="${type}" value="${this.esc(value)}"></div>`; }
  number(name, label, value, min, max, suffix) { return `<div class="field"><label for="${name}">${label}</label><div class="suffix"><input id="${name}" name="${name}" type="number" min="${min}" max="${max}" step="1" value="${this.esc(value)}"><span>${suffix}</span></div></div>`; }
  textarea(name, label, value) { return `<div class="field"><label for="${name}">${label}</label><textarea id="${name}" name="${name}" rows="3">${this.esc(value)}</textarea></div>`; }
  selectField(name, label, value, options) { return `<div class="field"><label for="${name}">${label}</label><select id="${name}" name="${name}">${options.map(([key,text]) => `<option value="${key}" ${key === value ? "selected" : ""}>${text}</option>`).join("")}</select></div>`; }
  entityField(name, label, value, domains) {
    const options = Object.values(this.hass.states).filter((state) => domains.includes(state.entity_id.split(".")[0])).sort((a,b) => this.entityName(a).localeCompare(this.entityName(b)));
    return `<div class="field"><label for="${name}">${label}</label><select id="${name}" name="${name}"><option value="">— ${this.t("notConfigured")} —</option>${options.map((state) => `<option value="${state.entity_id}" ${state.entity_id === value ? "selected" : ""}>${this.esc(this.entityName(state))} · ${state.entity_id}</option>`).join("")}</select></div>`;
  }
  entityName(state) { return state.attributes.friendly_name || state.entity_id; }
  entityState(id) { const state = id && this.hass.states[id]; if (!state || ["unknown","unavailable"].includes(state.state)) return null; const value = Number(state.state); return Number.isFinite(value) ? value : state.state; }
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
      :host{--wm-green:#39745b;--wm-green-soft:color-mix(in srgb,var(--wm-green) 12%,transparent);display:block;background:var(--primary-background-color);min-height:100vh;color:var(--primary-text-color);font-family:var(--paper-font-body1_-_font-family,system-ui)}*{box-sizing:border-box}.app{min-height:100vh}header{height:76px;padding:0 24px;display:flex;align-items:center;justify-content:space-between;background:var(--card-background-color);border-bottom:1px solid var(--divider-color);position:sticky;top:0;z-index:5}.brand,.header-actions,.actions,.title-row{display:flex;align-items:center}.brand{gap:12px}.brand>ha-icon{color:var(--wm-green);--mdc-icon-size:32px}.brand h1{font-size:20px;margin:0}.brand small,.muted,.title-row p{color:var(--secondary-text-color)}.header-actions,.actions{gap:8px}button,select,input,textarea{font:inherit;color:inherit}button{border:1px solid var(--divider-color);background:var(--card-background-color);border-radius:10px;padding:10px 14px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:7px}button.primary{background:var(--wm-green);color:white;border-color:var(--wm-green)}button.danger{background:var(--error-color);color:white;border-color:var(--error-color)}button.icon{padding:10px}.danger-text{color:var(--error-color)}select,input,textarea{width:100%;background:var(--card-background-color);border:1px solid var(--divider-color);border-radius:9px;padding:11px 12px;outline:none}select:focus,input:focus,textarea:focus{border-color:var(--wm-green);box-shadow:0 0 0 2px var(--wm-green-soft)}.workspace{display:grid;grid-template-columns:240px minmax(0,1fr);max-width:1500px;margin:auto;min-height:calc(100vh - 76px)}aside{padding:24px 18px;border-right:1px solid var(--divider-color);background:var(--card-background-color)}aside>label,.field>label{display:block;font-size:12px;font-weight:650;margin:0 0 7px;color:var(--secondary-text-color)}aside nav{display:grid;gap:5px;margin-top:24px}aside nav button{justify-content:flex-start;border:0;background:transparent;padding:11px}aside nav button.active{background:var(--wm-green-soft);color:var(--wm-green)}.aside-status{margin-top:24px;padding:12px;border-top:1px solid var(--divider-color);display:flex;align-items:center;gap:8px;font-size:13px}.dot{width:9px;height:9px;background:#9ca3af;border-radius:50%}.dot.on{background:#22c55e;box-shadow:0 0 0 5px rgba(34,197,94,.12)}main{padding:28px;min-width:0}.title-row{justify-content:space-between;margin-bottom:24px;gap:16px}.title-row h2{font-size:26px;margin:0 0 4px}.title-row p{margin:0}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.card{background:var(--card-background-color);border:1px solid var(--divider-color);border-radius:14px;padding:20px;box-shadow:var(--ha-card-box-shadow,none)}.wide{grid-column:1/-1}.stat{display:flex;align-items:center;gap:16px}.stat>ha-icon{color:var(--wm-green);background:var(--wm-green-soft);padding:12px;border-radius:12px;box-sizing:content-box}.stat small,.stat strong{display:block}.stat strong{font-size:20px;margin-top:5px}.card h3{margin:0 0 18px}.reason{font-size:18px;margin:0}.info{display:flex;gap:12px;align-items:flex-start}.info ha-icon,.info-line ha-icon{color:var(--wm-green);flex:none}.info p{margin:0}.form-card{max-width:1000px}.fields{display:grid;gap:17px}.fields.two{grid-template-columns:repeat(2,minmax(0,1fr))}.field{margin-bottom:17px}.suffix{display:flex}.suffix input{border-radius:9px 0 0 9px}.suffix span{border:1px solid var(--divider-color);border-left:0;border-radius:0 9px 9px 0;padding:11px;background:var(--secondary-background-color);white-space:nowrap;color:var(--secondary-text-color)}.toggle{display:flex;align-items:center;gap:10px;margin:5px 0 22px}.toggle input{display:none}.toggle span{width:42px;height:24px;background:#9ca3af;border-radius:20px;position:relative}.toggle span:after{content:"";position:absolute;width:18px;height:18px;top:3px;left:3px;background:white;border-radius:50%;transition:.2s}.toggle input:checked+span{background:var(--wm-green)}.toggle input:checked+span:after{left:21px}.days{display:flex;gap:8px;flex-wrap:wrap}.days input{display:none}.days span{display:flex;width:44px;height:44px;align-items:center;justify-content:center;border:1px solid var(--divider-color);border-radius:50%;cursor:pointer}.days input:checked+span{background:var(--wm-green);border-color:var(--wm-green);color:white}.info-line{display:flex;align-items:flex-start;gap:9px;padding:12px;margin:12px 0;background:var(--wm-green-soft);border-radius:10px;font-size:13px}.empty{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:12px;color:var(--secondary-text-color)}.empty>ha-icon{--mdc-icon-size:60px;color:var(--wm-green)}.empty.compact{min-height:300px}.loading{min-height:60vh;display:grid;place-items:center}.log-card{padding:0;overflow:hidden}.table-wrap{overflow:auto}table{width:100%;border-collapse:collapse;white-space:nowrap}th,td{text-align:left;padding:14px;border-bottom:1px solid var(--divider-color);font-size:13px}th{color:var(--secondary-text-color);background:var(--secondary-background-color)}.pill{padding:4px 8px;border-radius:20px;background:var(--secondary-background-color)}.pill.completed{color:#15803d;background:#dcfce7}.pill.failed{color:#b91c1c;background:#fee2e2}.toast{position:fixed;right:24px;bottom:24px;background:#1f2937;color:white;border-radius:10px;padding:13px 18px;opacity:0;transform:translateY(20px);pointer-events:none;transition:.2s;z-index:20}.toast.show{opacity:1;transform:none}.toast.error{background:var(--error-color)}
      dialog{border:0;border-radius:16px;background:var(--card-background-color);color:var(--primary-text-color);padding:0;box-shadow:0 20px 60px rgba(0,0,0,.35);max-width:460px;width:calc(100% - 32px)}dialog::backdrop{background:rgba(0,0,0,.5)}dialog form{padding:24px}dialog h2{margin:0 0 8px}dialog p{color:var(--secondary-text-color);margin-bottom:20px}dialog label{display:grid;gap:7px;font-size:13px;font-weight:650}dialog form>div{display:flex;justify-content:flex-end;gap:8px;margin-top:22px}
      @media(max-width:800px){header{height:auto;min-height:68px;padding:12px 14px}.brand small{display:none}.brand h1{font-size:17px}.header-actions .primary{font-size:0}.header-actions .primary ha-icon{font-size:initial}.workspace{display:block}.workspace aside{border-right:0;border-bottom:1px solid var(--divider-color);padding:12px 14px;position:sticky;top:68px;z-index:4}aside>label,.aside-status{display:none}aside nav{display:flex;margin-top:10px;overflow:auto}aside nav button{min-width:max-content;font-size:12px;flex-direction:column;gap:3px;padding:8px 10px}main{padding:18px 14px}.title-row{align-items:flex-start}.title-row h2{font-size:21px}.actions{flex-wrap:wrap;justify-content:flex-end}.actions button{font-size:0;padding:9px}.actions button ha-icon{font-size:initial}.grid,.fields.two{grid-template-columns:1fr}.stats{grid-template-columns:1fr 1fr}.stat{padding:14px}.stat strong{font-size:16px}.wide{grid-column:1/-1}.form-card{padding:16px}.days{justify-content:space-between}.days span{width:39px;height:39px}.toast{left:14px;right:14px;bottom:14px}}
      @media(max-width:450px){.stats{grid-template-columns:1fr}.header-actions select{max-width:105px}.brand>ha-icon{display:none}}
    `;
  }
}

customElements.define("watering-manager-panel", WateringManagerPanel);
