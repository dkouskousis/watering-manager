const WMC_VERSION = "0.4.5";

const WMC_TEXT = {
  en: {
    name: "Watering Manager",
    description: "Live status and controls for one watering system",
    system: "Watering system",
    selectSystem: "Select a system",
    loadingSystems: "Loading systems…",
    systemsError: "Unable to load systems. Close the card editor and try again.",
    noSystems: "No watering systems have been created.",
    unavailable: "Watering Manager is unavailable.",
    loading: "Loading watering system…",
    idle: "Idle",
    running: "Watering",
    disabled: "Disabled",
    paused: "Paused",
    maintenance: "Maintenance",
    auto: "Auto",
    manual: "Manual",
    nextRun: "Next watering",
    schedule: "Schedule",
    duration: "Duration",
    lastRun: "Last watering",
    soilSensor: "Soil sensor",
    moisture: "Moisture",
    soilTemperature: "Soil temperature",
    battery: "Valve battery",
    runNow: "Run now",
    stop: "Stop",
    details: "More settings",
    minutes: "min",
    today: "Today",
    tomorrow: "Tomorrow",
    never: "Not scheduled",
    showControls: "Show watering controls",
    confirmRun: "Start watering now?",
    confirmStop: "Stop the active watering?",
    completed: "Completed",
    soilWet: "Soil is wet",
    soilDry: "Soil is dry",
    soilPartlyDry: "Soil is partly dry",
    sensorConflict: "Sensors disagree",
    sensorsUnavailable: "Sensors unavailable",
    minimumInterval: "Minimum interval active",
    monday: "Mon", tuesday: "Tue", wednesday: "Wed", thursday: "Thu",
    friday: "Fri", saturday: "Sat", sunday: "Sun",
  },
  el: {
    name: "Διαχείριση ποτίσματος",
    description: "Ζωντανή κατάσταση και χειρισμός ενός συστήματος ποτίσματος",
    system: "Σύστημα ποτίσματος",
    selectSystem: "Επίλεξε σύστημα",
    loadingSystems: "Φόρτωση συστημάτων…",
    systemsError: "Δεν ήταν δυνατή η φόρτωση των συστημάτων. Κλείσε και άνοιξε ξανά τον editor της κάρτας.",
    noSystems: "Δεν έχουν δημιουργηθεί συστήματα ποτίσματος.",
    unavailable: "Το Watering Manager δεν είναι διαθέσιμο.",
    loading: "Φόρτωση συστήματος…",
    idle: "Σε αναμονή",
    running: "Ποτίζει",
    disabled: "Ανενεργό",
    paused: "Σε παύση",
    maintenance: "Συντήρηση",
    auto: "Auto",
    manual: "Manual",
    nextRun: "Επόμενο πότισμα",
    schedule: "Πρόγραμμα",
    duration: "Διάρκεια",
    lastRun: "Τελευταίο πότισμα",
    soilSensor: "Αισθητήρας χώματος",
    moisture: "Υγρασία",
    soilTemperature: "Θερμοκρασία χώματος",
    battery: "Μπαταρία βάνας",
    runNow: "Πότισμα τώρα",
    stop: "Διακοπή",
    details: "Περισσότερες ρυθμίσεις",
    minutes: "λεπτά",
    today: "Σήμερα",
    tomorrow: "Αύριο",
    never: "Δεν έχει προγραμματιστεί",
    showControls: "Εμφάνιση κουμπιών χειρισμού",
    confirmRun: "Να ξεκινήσει πότισμα τώρα;",
    confirmStop: "Να διακοπεί το ενεργό πότισμα;",
    completed: "Ολοκληρώθηκε",
    soilWet: "Το χώμα είναι υγρό",
    soilDry: "Το χώμα είναι στεγνό",
    soilPartlyDry: "Το χώμα είναι μερικώς στεγνό",
    sensorConflict: "Οι αισθητήρες διαφωνούν",
    sensorsUnavailable: "Οι αισθητήρες δεν είναι διαθέσιμοι",
    minimumInterval: "Δεν έχει περάσει το ελάχιστο διάστημα",
    monday: "Δε", tuesday: "Τρ", wednesday: "Τε", thursday: "Πε",
    friday: "Πα", saturday: "Σα", sunday: "Κυ",
  },
};

class WateringManagerCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._state = null;
    this._loading = false;
    this._error = "";
  }

  static getConfigElement() {
    return document.createElement("watering-manager-card-editor");
  }

  static getStubConfig() {
    return { system_id: "", show_controls: true };
  }

  setConfig(config) {
    this._config = {
      system_id: config.system_id || "",
      show_controls: config.show_controls !== false,
    };
    this.render();
  }

  set hass(value) {
    const first = !this._hass;
    this._hass = value;
    this._language = (value.language || "en").startsWith("el") ? "el" : "en";
    if (first || !this._state) this.loadState();
    else this.render();
  }

  get hass() { return this._hass; }

  connectedCallback() {
    this.render();
    this._timer = window.setInterval(() => this.loadState(), 15000);
  }

  disconnectedCallback() {
    window.clearInterval(this._timer);
  }

  getCardSize() { return 7; }

  getGridOptions() {
    return { rows: 6, columns: 6, min_rows: 4, min_columns: 3 };
  }

  t(key) {
    return WMC_TEXT[this._language]?.[key] || WMC_TEXT.en[key] || key;
  }

  esc(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
    })[character]);
  }

  async call(type, data = {}) {
    return this.hass.callWS({
      type: `watering_manager/${type}`,
      ...data,
    });
  }

  async loadState() {
    if (!this.hass || this._loading) return;
    this._loading = true;
    try {
      this._state = await this.call("get_state");
      this._error = "";
    } catch (error) {
      this._error = error.message || String(error);
    } finally {
      this._loading = false;
      this.render();
    }
  }

  get system() {
    const systems = this._state?.systems || [];
    if (!systems.length) return null;
    return systems.find((system) => system.id === this._config?.system_id) || systems[0];
  }

  get running() {
    return Boolean(this.system && this._state?.active_system_ids?.includes(this.system.id));
  }

  render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `<style>${this.styles()}</style>${this.content()}`;
    this.bindEvents();
  }

  content() {
    if (!this._config || !this.hass || (!this._state && !this._error)) {
      return `<ha-card><div class="message"><ha-circular-progress active></ha-circular-progress><span>${this.t("loading")}</span></div></ha-card>`;
    }
    if (this._error) {
      return `<ha-card><div class="message error"><ha-icon icon="mdi:alert-circle-outline"></ha-icon><span>${this.t("unavailable")}</span></div></ha-card>`;
    }
    const system = this.system;
    if (!system) {
      return `<ha-card><div class="message"><ha-icon icon="mdi:sprinkler-variant"></ha-icon><span>${this.t("noSystems")}</span></div></ha-card>`;
    }

    const status = this.status(system);
    const sensorCards = [
      this.sensorCard(1, system.moisture_sensor_1, system.soil_temperature_sensor),
      this.sensorCard(2, system.moisture_sensor_2, system.soil_temperature_sensor_2),
    ].filter(Boolean).join("");
    const environment = system.battery_sensor
      ? this.environmentItem("mdi:battery", this.t("battery"), this.entityValue(system.battery_sensor))
      : "";
    const duration = system.mode === "auto" ? `${system.minimum_duration}–${system.maximum_duration} ${this.t("minutes")}` : `${system.manual_duration} ${this.t("minutes")}`;

    return `<ha-card class="${this.running ? "is-running" : ""}">
      <div class="hero">
        <div class="system-icon"><ha-icon icon="${this.running ? "mdi:water-pump" : "mdi:sprinkler-variant"}"></ha-icon></div>
        <div class="system-title"><h2>${this.esc(system.name)}</h2><p><span class="mode">${this.t(system.mode === "auto" ? "auto" : "manual")}</span><span class="status-dot ${status.className}"></span>${this.esc(status.label)}</p></div>
      </div>
      <div class="schedule-grid">
        ${this.summary("mdi:calendar-clock", this.t("nextRun"), this.nextRun(system))}
        ${this.summary("mdi:timer-outline", this.t("duration"), duration)}
        ${this.summary("mdi:history", this.t("lastRun"), system.last_run_at ? this.formatDate(system.last_run_at) : "—")}
      </div>
      ${sensorCards ? `<div class="sensor-grid">${sensorCards}</div>` : ""}
      ${environment ? `<div class="environment">${environment}</div>` : ""}
      ${system.last_reason ? `<div class="last-decision"><ha-icon icon="mdi:information-outline"></ha-icon><span>${this.esc(this.reason(system.last_reason))}${system.last_duration == null ? "" : ` · ${system.last_duration} ${this.t("minutes")}`}</span></div>` : ""}
      ${this.controls(system)}
      <div class="version">Watering Manager v${WMC_VERSION}</div>
    </ha-card>`;
  }

  status(system) {
    if (this.running) return { label: this.t("running"), className: "running" };
    if (system.maintenance_mode) return { label: this.t("maintenance"), className: "warning" };
    if (system.paused_until && new Date(`${system.paused_until}T00:00:00`) > new Date()) return { label: this.t("paused"), className: "warning" };
    if (!system.enabled) return { label: this.t("disabled"), className: "off" };
    return { label: this.t("idle"), className: "ready" };
  }

  summary(icon, label, value) {
    return `<div class="summary"><ha-icon icon="${icon}"></ha-icon><div><small>${this.esc(label)}</small><strong>${this.esc(value)}</strong></div></div>`;
  }

  sensorCard(index, moistureEntity, temperatureEntity) {
    if (!moistureEntity && !temperatureEntity) return "";
    return `<section class="sensor"><div class="sensor-head"><span><ha-icon icon="mdi:sprout-outline"></ha-icon></span><strong>${this.t("soilSensor")} ${index}</strong></div><div class="readings">
      ${moistureEntity ? this.reading("mdi:water-percent", this.t("moisture"), this.entityValue(moistureEntity)) : ""}
      ${temperatureEntity ? this.reading("mdi:thermometer-lines", this.t("soilTemperature"), this.entityValue(temperatureEntity)) : ""}
    </div></section>`;
  }

  reading(icon, label, value) {
    return `<div class="reading"><ha-icon icon="${icon}"></ha-icon><div><small>${this.esc(label)}</small><strong>${this.esc(value)}</strong></div></div>`;
  }

  environmentItem(icon, label, value) {
    return `<div><ha-icon icon="${icon}"></ha-icon><span><small>${this.esc(label)}</small><strong>${this.esc(value)}</strong></span></div>`;
  }

  controls(system) {
    let action = "";
    if (this._config.show_controls && this.hass?.user?.is_admin) {
      if (this.running) action = `<button class="stop" id="wmc-stop"><ha-icon icon="mdi:stop"></ha-icon>${this.t("stop")}</button>`;
      else if (!system.maintenance_mode) action = `<button id="wmc-run"><ha-icon icon="mdi:play"></ha-icon>${this.t("runNow")}</button>`;
    }
    return `<div class="controls ${action ? "" : "single"}">${action}<a href="/watering-manager"><ha-icon icon="mdi:tune-variant"></ha-icon>${this.t("details")}</a></div>`;
  }

  bindEvents() {
    this.shadowRoot?.getElementById("wmc-run")?.addEventListener("click", async () => {
      if (!window.confirm(this.t("confirmRun"))) return;
      await this.operate("run_system");
    });
    this.shadowRoot?.getElementById("wmc-stop")?.addEventListener("click", async () => {
      if (!window.confirm(this.t("confirmStop"))) return;
      await this.operate("stop_system");
    });
  }

  async operate(type) {
    const button = this.shadowRoot.querySelector(".controls button");
    if (button) button.disabled = true;
    try {
      await this.call(type, { system_id: this.system.id });
      await this.loadState();
    } catch (error) {
      this._error = error.message || String(error);
      this.render();
    }
  }

  entityValue(entityId) {
    const entity = this.hass?.states?.[entityId];
    if (!entity || ["unknown", "unavailable"].includes(entity.state)) return "—";
    const unit = entity.attributes.unit_of_measurement || "";
    return `${entity.state}${unit ? ` ${unit}` : ""}`;
  }

  nextRun(system) {
    if (!system.enabled || system.maintenance_mode || !system.days?.length) return this.t("never");
    const now = new Date();
    const [hours, minutes] = String(system.start_time || "00:00").split(":").map(Number);
    const pauseDate = system.paused_until ? new Date(`${system.paused_until}T00:00:00`) : null;
    const searchStart = pauseDate && pauseDate > now ? pauseDate : now;
    for (let offset = 0; offset < 15; offset += 1) {
      const candidate = new Date(searchStart);
      candidate.setDate(searchStart.getDate() + offset);
      candidate.setHours(hours, minutes, 0, 0);
      const weekday = (candidate.getDay() + 6) % 7;
      if (!system.days.includes(weekday) || candidate <= now || (pauseDate && candidate < pauseDate)) continue;
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const candidateDay = new Date(candidate.getFullYear(), candidate.getMonth(), candidate.getDate());
      const dayDifference = Math.round((candidateDay - today) / 86400000);
      const day = dayDifference === 0 ? this.t("today") : dayDifference === 1 ? this.t("tomorrow") : candidate.toLocaleDateString(this._language === "el" ? "el-GR" : "en-GB", { weekday: "short", day: "numeric", month: "short" });
      return `${day} · ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    }
    return this.t("never");
  }

  formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleString(this._language === "el" ? "el-GR" : "en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  }

  reason(value) {
    const key = ({
      watering_completed: "completed", completed: "completed", soil_wet: "soilWet", soil_dry: "soilDry",
      soil_partly_dry: "soilPartlyDry", sensor_conflict_short_run: "sensorConflict",
      sensors_unavailable: "sensorsUnavailable", sensors_unavailable_base_duration: "sensorsUnavailable",
      minimum_interval: "minimumInterval", system_disabled: "disabled", paused: "paused", maintenance_mode: "maintenance",
    })[value];
    return key ? this.t(key) : String(value).replaceAll("_", " ");
  }

  styles() {
    return `
      :host{--wmc-green:#39745b;--wmc-soft:color-mix(in srgb,var(--wmc-green) 12%,transparent);display:block}*{box-sizing:border-box}ha-card{position:relative;overflow:hidden;padding:0;color:var(--primary-text-color);background:var(--ha-card-background,var(--card-background-color));border-radius:var(--ha-card-border-radius,16px)}.hero{display:flex;align-items:center;gap:13px;padding:18px 18px 15px;background:linear-gradient(135deg,var(--ha-card-background,var(--card-background-color)),color-mix(in srgb,var(--wmc-green) 9%,var(--ha-card-background,var(--card-background-color))))}.system-icon{width:48px;height:48px;display:grid;place-items:center;flex:none;border-radius:15px;background:var(--wmc-soft);color:var(--wmc-green)}.system-icon ha-icon{--mdc-icon-size:27px}.is-running .system-icon{background:var(--wmc-green);color:#fff}.system-title{min-width:0}.system-title h2{margin:0 0 5px;font-size:19px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.system-title p{margin:0;display:flex;align-items:center;gap:7px;color:var(--secondary-text-color);font-size:12px}.mode{padding:3px 7px;border-radius:20px;background:var(--wmc-soft);color:var(--wmc-green);font-weight:700}.status-dot{width:7px;height:7px;border-radius:50%;background:#9ca3af}.status-dot.ready,.status-dot.running{background:#22a05a}.status-dot.running{box-shadow:0 0 0 4px rgba(34,160,90,.14)}.status-dot.warning{background:#d08a00}.schedule-grid{display:grid;grid-template-columns:1.35fr .8fr 1fr;border-top:1px solid var(--divider-color);border-bottom:1px solid var(--divider-color)}.summary{display:flex;align-items:center;gap:10px;padding:14px;min-width:0}.summary+.summary{border-left:1px solid var(--divider-color)}.summary>ha-icon,.reading>ha-icon,.environment ha-icon{color:var(--wmc-green);flex:none}.summary small,.summary strong,.reading small,.reading strong,.environment small,.environment strong{display:block}.summary small,.reading small,.environment small{color:var(--secondary-text-color);font-size:10px}.summary strong{margin-top:3px;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sensor-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:14px}.sensor{border:1px solid var(--divider-color);border-radius:12px;overflow:hidden}.sensor-head{display:flex;align-items:center;gap:9px;padding:10px 12px;background:var(--secondary-background-color);font-size:12px}.sensor-head>span{width:28px;height:28px;display:grid;place-items:center;border-radius:9px;background:var(--wmc-soft);color:var(--wmc-green)}.sensor-head ha-icon{--mdc-icon-size:18px}.readings{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.reading{display:flex;align-items:center;gap:8px;padding:12px;min-width:0}.reading+.reading{border-left:1px solid var(--divider-color)}.reading strong{margin-top:3px;font-size:16px}.environment{display:flex;gap:10px;padding:0 14px 14px}.environment>div{display:flex;align-items:center;gap:9px;flex:1;padding:11px 12px;border-radius:11px;background:var(--secondary-background-color);min-width:0}.environment strong{font-size:12px;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.last-decision{display:flex;align-items:center;gap:9px;margin:0 14px 14px;padding:10px 12px;border-radius:10px;background:var(--wmc-soft);color:var(--secondary-text-color);font-size:11px}.last-decision ha-icon{color:var(--wmc-green);--mdc-icon-size:18px}.controls{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;padding:0 14px 14px}.controls.single{grid-template-columns:1fr}.controls button,.controls a{width:100%;min-height:42px;border:0;border-radius:11px;font:inherit;font-weight:650;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;text-decoration:none}.controls button{background:var(--wmc-green);color:#fff}.controls a{border:1px solid var(--divider-color);background:var(--secondary-background-color);color:var(--primary-text-color)}.controls a:hover{border-color:var(--wmc-green);color:var(--wmc-green)}.controls button.stop{background:var(--error-color)}.controls button:disabled{opacity:.55;cursor:wait}.version{text-align:right;padding:0 14px 10px;color:var(--secondary-text-color);font-size:9px}.message{min-height:150px;display:flex;align-items:center;justify-content:center;gap:12px;padding:24px;color:var(--secondary-text-color)}.message.error ha-icon{color:var(--error-color)}
      @media(max-width:520px){.schedule-grid{grid-template-columns:1fr 1fr}.summary:first-child{grid-column:1/-1;border-bottom:1px solid var(--divider-color)}.summary:nth-child(2){border-left:0}.sensor-grid{grid-template-columns:1fr}.environment{display:grid}.readings{grid-template-columns:1fr 1fr}}
      @media(max-width:350px){.readings{grid-template-columns:1fr}.reading+.reading{border-left:0;border-top:1px solid var(--divider-color)}}
    `;
  }
}

class WateringManagerCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._systems = [];
    this._loadingSystems = false;
    this._loadError = "";
  }

  setConfig(config) {
    this._config = {
      ...config,
      type: config.type || "custom:watering-manager-card",
      system_id: config.system_id || "",
      show_controls: config.show_controls !== false,
    };
    if (this._hass && !this._systems.length) this.loadSystems();
    else this.render();
  }

  set hass(value) {
    const first = !this._hass;
    const language = (value.language || "en").startsWith("el") ? "el" : "en";
    const languageChanged = Boolean(this._language && this._language !== language);
    this._hass = value;
    this._language = language;
    if (first) this.loadSystems();
    else if (languageChanged) this.render();
  }

  t(key) { return WMC_TEXT[this._language]?.[key] || WMC_TEXT.en[key] || key; }

  esc(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (character) => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[character]);
  }

  async loadSystems() {
    if (!this._hass || !this._config || this._loadingSystems) return;
    this._loadingSystems = true;
    this._loadError = "";
    this.render();
    try {
      const state = await this._hass.callWS({ type: "watering_manager/get_state" });
      this._systems = state.systems || [];
    } catch (error) {
      this._systems = [];
      this._loadError = error.message || String(error);
    } finally {
      this._loadingSystems = false;
    }
    this.render();
  }

  render() {
    if (!this.shadowRoot || !this._config) return;
    const placeholder = this._loadingSystems ? this.t("loadingSystems") : this.t("selectSystem");
    this.shadowRoot.innerHTML = `<style>:host{display:block}*{box-sizing:border-box}.editor{display:grid;gap:18px;padding:8px 0 16px}label{display:grid;gap:7px;color:var(--primary-text-color);font-size:13px;font-weight:600}select{width:100%;padding:11px 12px;border:1px solid var(--divider-color);border-radius:9px;background:var(--card-background-color);color:var(--primary-text-color);font:inherit}.toggle{display:flex;align-items:center;gap:10px}.toggle input{width:20px;height:20px}.error{display:flex;align-items:flex-start;gap:8px;padding:10px;border-radius:9px;background:color-mix(in srgb,var(--error-color) 12%,transparent);color:var(--error-color);font-size:12px}.error ha-icon{flex:none;--mdc-icon-size:18px}</style><div class="editor">
      <label>${this.t("system")}<select id="system" ${this._loadingSystems ? "disabled" : ""}><option value="">${placeholder}</option>${this._systems.map((system) => `<option value="${system.id}" ${system.id === this._config.system_id ? "selected" : ""}>${this.esc(system.name)}</option>`).join("")}</select></label>
      ${this._loadError ? `<div class="error"><ha-icon icon="mdi:alert-circle-outline"></ha-icon><span>${this.t("systemsError")}</span></div>` : ""}
      <label class="toggle"><input id="controls" type="checkbox" ${this._config.show_controls ? "checked" : ""}>${this.t("showControls")}</label>
    </div>`;
    this.shadowRoot.getElementById("system")?.addEventListener("change", (event) => this.change({ system_id: event.target.value }));
    this.shadowRoot.getElementById("controls")?.addEventListener("change", (event) => this.change({ show_controls: event.target.checked }));
  }

  change(values) {
    this._config = { ...this._config, ...values };
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: true, composed: true }));
    this.render();
  }
}

if (!customElements.get("watering-manager-card")) customElements.define("watering-manager-card", WateringManagerCard);
if (!customElements.get("watering-manager-card-editor")) customElements.define("watering-manager-card-editor", WateringManagerCardEditor);

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === "watering-manager-card")) {
  window.customCards.push({
    type: "watering-manager-card",
    name: WMC_TEXT.en.name,
    description: WMC_TEXT.en.description,
    preview: true,
    documentationURL: "https://github.com/dkouskousis/watering-manager",
  });
}
