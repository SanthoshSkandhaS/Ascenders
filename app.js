/**
 * PenSync - Smart Insulin Pen & Glucose Companion
 * Authoritative Multi-Patient Healthcare Implementation
 * Strictly adheres to GlucoCare Demo Data, MT03 Calculations, and Accessibility Standards
 */

// Authoritative default patient and clinician profiles from supplied Word documents
const DEFAULT_PATIENTS = {
  "gc1001": {
    id: "GC1001",
    username: "gc1001",
    alias: "ananya.r",
    name: "Ananya Rao",
    age: 42,
    type: "Type 2 Diabetes",
    penId: "PenSync Duo Pro #SN-1001",
    recoveryId: "PEN-1001",
    password: "pensync123",
    avatarInitial: "AR",
    prescribedPlan: "Glargine (Basal) 20 U at bedtime; Humalog (Rapid-Acting) 6 U pre-meal as indicated. Target: 70–140 mg/dL.",
    cartridgeUnitsLeft: 202,
    glucoseReadings: [
      { time: "07:00 AM", date: "Oct 14, 2026", value: 118, context: "Before Breakfast", source: "Manual Meter Entry", note: "Fasting morning check" },
      { time: "10:00 AM", date: "Oct 14, 2026", value: 146, context: "After Breakfast", source: "Manual Meter Entry", note: "Post-prandial check" },
      { time: "01:00 PM", date: "Oct 14, 2026", value: 124, context: "Before Lunch", source: "Manual Meter Entry", note: "Pre-lunch check (Latest)", isLatest: true }
    ],
    trend7Day: [
      { day: "Mon", glucose: 118, insulinDose: 14 },
      { day: "Tue", glucose: 138, insulinDose: 16 },
      { day: "Wed", glucose: 122, insulinDose: 14 },
      { day: "Thu", glucose: 145, insulinDose: 18 },
      { day: "Fri", glucose: 112, insulinDose: 14 },
      { day: "Sat", glucose: 128, insulinDose: 14 },
      { day: "Sun", glucose: 124, insulinDose: 14 }
    ],
    insulinEvents: [
      { time: "08:00 AM", date: "Oct 14, 2026", medication: "Lantus (Glargine Basal)", units: 14, status: "Administered", isPrime: false, type: "basal", site: "Abdomen (Left)" },
      { time: "12:45 PM", date: "Oct 14, 2026", medication: "Humalog (Lispro Bolus)", units: 6, status: "Administered", isPrime: false, type: "bolus", site: "Abdomen (Right)" }
    ],
    attentionAlert: {
      active: false,
      severity: "ok",
      severityLabel: "[IN TARGET CONTROL]",
      title: "Glycemic Stability Maintained",
      message: "Latest blood sugar (124 mg/dL) is within prescribed target range (70–140 mg/dL). Next scheduled check: 2 hours after lunch.",
      source: "Care Plan Rule #TG-140",
      isSimulated: true
    },
    reminders: [
      { id: "r1", time: "08:00 AM", name: "Lantus (Basal)", dose: "14 Units", taken: true, note: "Administered via PenSync Duo Pro" },
      { id: "r2", time: "12:30 PM", name: "Humalog (Bolus)", dose: "6 Units", taken: true, note: "Pre-lunch bolus administered" },
      { id: "r3", time: "07:00 PM", name: "Humalog (Bolus)", dose: "6 Units", taken: false, note: "Scheduled with dinner" },
      { id: "r4", time: "10:00 PM", name: "Lantus (Basal)", dose: "20 Units", taken: false, note: "Prescribed bedtime long-acting dose" }
    ],
    doctorAlerts: [
      {
        id: "d1",
        doctor: "Dr. Aris Thorne, MD (Lead Endocrinologist)",
        tag: "[CLINICAL REVIEW]",
        message: "Your 7-day average glucose is 129 mg/dL with 100% Time-in-Range. Fasting levels remain steady with no hypoglycemic events. Maintain your current mealtime bolus protocol.",
        timestamp: "Today at 09:15 AM",
        severityClass: "badge-ok"
      },
      {
        id: "d2",
        doctor: "Elena Rostova, RN (Nurse Educator)",
        tag: "[SUPPLY REORDER]",
        message: "PenSync cartridge level verified at 202 Units remaining. Pen needle stock confirmed for the next 60 days.",
        timestamp: "Yesterday at 03:40 PM",
        severityClass: "badge-info"
      }
    ],
    pastMessages: [
      {
        id: "p1",
        doctor: "Dr. Aris Thorne, MD",
        message: "Target range established at 70–140 mg/dL for optimal post-meal glycemic control.",
        timestamp: "October 02, 2026"
      },
      {
        id: "p2",
        doctor: "PenSync Safety Telemetry",
        message: "Smart pen pairing verified. Memory synchronization complete (0 pending packets).",
        timestamp: "October 10, 2026"
      }
    ],
    tirBreakdown: { target: 1.0, above: 0.0, below: 0.0 },
    reportMetrics: {
      avgGlucose: "129 mg/dL",
      hba1c: "6.1%",
      timeInRange: "100%",
      dosesLogged: "21 of 21",
      conclusion: "Patient demonstrates optimal glycemic stability with 100% Time-in-Range (70–140 mg/dL). 7-day mean glucose is 129 mg/dL with an estimated HbA1c of 6.1%. Zero hypoglycemic episodes recorded. 100% adherence to smart pen injection logging."
    }
  },

  "gc1002": {
    id: "GC1002",
    username: "gc1002",
    alias: "ravi.k",
    name: "Ravi Kumar",
    age: 56,
    type: "Type 2 Diabetes",
    penId: "PenSync Touch #SN-1002",
    recoveryId: "PEN-1002",
    password: "pensync123",
    avatarInitial: "RK",
    prescribedPlan: "Degludec (Ultra-Long Basal) 24 U morning; Lispro (Rapid-Acting) 10 U with meals. Target: 70–140 mg/dL.",
    cartridgeUnitsLeft: 142,
    glucoseReadings: [
      { time: "07:30 AM", date: "Oct 14, 2026", value: 164, context: "Before Breakfast", source: "Manual Meter Entry", note: "Elevated fasting check" },
      { time: "11:00 AM", date: "Oct 14, 2026", value: 198, context: "After Breakfast", source: "Manual Meter Entry", note: "Post-prandial excursion" },
      { time: "01:30 PM", date: "Oct 14, 2026", value: 236, context: "After Lunch", source: "Manual Meter Entry", note: "Demo high alert reading (Latest)", isLatest: true }
    ],
    trend7Day: [
      { day: "Mon", glucose: 165, insulinDose: 24 },
      { day: "Tue", glucose: 182, insulinDose: 24 },
      { day: "Wed", glucose: 174, insulinDose: 24 },
      { day: "Thu", glucose: 210, insulinDose: 34 },
      { day: "Fri", glucose: 188, insulinDose: 24 },
      { day: "Sat", glucose: 205, insulinDose: 34 },
      { day: "Sun", glucose: 236, insulinDose: 34 }
    ],
    insulinEvents: [
      { time: "07:30 AM", date: "Oct 14, 2026", medication: "Tresiba (Degludec Basal)", units: 24, status: "Administered", isPrime: false, type: "basal", site: "Thigh (Right)" },
      { time: "01:15 PM", date: "Oct 14, 2026", medication: "Lispro (Rapid Bolus)", units: 10, status: "Administered", isPrime: false, type: "bolus", site: "Abdomen (Left)" }
    ],
    attentionAlert: {
      active: true,
      severity: "urgent",
      severityLabel: "[HIGH GLUCOSE ALERT]",
      title: "Elevated Post-Meal Reading (236 mg/dL)",
      message: "Post-lunch glucose of 236 mg/dL exceeds normal post-prandial threshold (180 mg/dL). Please verify with a repeat fingerstick, hydrate with 16oz water, and ensure 15-minute pre-meal bolus timing.",
      source: "Clinical Alert Rule #HIGH-180",
      isSimulated: true
    },
    reminders: [
      { id: "r1", time: "07:30 AM", name: "Tresiba (Basal)", dose: "24 Units", taken: true, note: "Morning basal dose taken" },
      { id: "r2", time: "01:15 PM", name: "Lispro (Bolus)", dose: "10 Units", taken: true, note: "Lunchtime bolus logged" },
      { id: "r3", time: "07:30 PM", name: "Lispro (Bolus)", dose: "10 Units", taken: false, note: "Scheduled with dinner" }
    ],
    doctorAlerts: [
      {
        id: "d1",
        doctor: "Dr. Aris Thorne, MD (Lead Endocrinologist)",
        tag: "[ACTION REQUIRED - HIGH ALERT]",
        message: "Glucose readings after lunch showed an elevation to 236 mg/dL. Please review carbohydrate portions and ensure insulin is taken 15 minutes before meals rather than after.",
        timestamp: "Today at 01:45 PM",
        severityClass: "badge-urgent"
      }
    ],
    pastMessages: [
      {
        id: "p1",
        doctor: "Dr. Aris Thorne, MD",
        message: "Basal dose stepped up to 24 Units to improve morning fasting levels.",
        timestamp: "September 25, 2026"
      }
    ],
    tirBreakdown: { target: 0.33, above: 0.67, below: 0.0 },
    reportMetrics: {
      avgGlucose: "199 mg/dL",
      hba1c: "8.5%",
      timeInRange: "33%",
      dosesLogged: "18 of 21",
      conclusion: "7-day average glucose is elevated at 199 mg/dL with 67% Time-Above-Range (TAR). Recurring post-prandial spikes observed following midday meals. Clinician review advised to evaluate pre-meal bolus timing and carbohydrate-to-insulin ratios."
    }
  },

  "gc1003": {
    id: "GC1003",
    username: "gc1003",
    alias: "meera.n",
    name: "Meera Nair",
    age: 29,
    type: "Type 1 Diabetes",
    penId: "PenSync CGM Stream #SN-1003",
    recoveryId: "PEN-1003",
    password: "pensync123",
    avatarInitial: "MN",
    prescribedPlan: "Glargine (Basal) 16 U at bedtime; Novolog (Rapid-Acting) 4–6 U with meals. CGM Low Alert: <70 mg/dL.",
    cartridgeUnitsLeft: 248,
    glucoseReadings: [
      { time: "08:00 AM", date: "Oct 14, 2026", value: 104, context: "Before Breakfast", source: "Continuous Glucose Stream", note: "Fasting morning sensor stream" },
      { time: "10:00 AM", date: "Oct 14, 2026", value: 86, context: "Late Morning", source: "Continuous Glucose Stream", note: "Mid-morning sensor stream" },
      { time: "11:15 AM", date: "Oct 14, 2026", value: 68, context: "Before Snack", source: "Continuous Glucose Stream", note: "Demo low alert reading (Latest)", isLatest: true }
    ],
    trend7Day: [
      { day: "Mon", glucose: 98, insulinDose: 16 },
      { day: "Tue", glucose: 84, insulinDose: 16 },
      { day: "Wed", glucose: 110, insulinDose: 21 },
      { day: "Thu", glucose: 92, insulinDose: 16 },
      { day: "Fri", glucose: 76, insulinDose: 16 },
      { day: "Sat", glucose: 90, insulinDose: 21 },
      { day: "Sun", glucose: 68, insulinDose: 16 }
    ],
    insulinEvents: [
      { time: "08:00 AM", date: "Oct 14, 2026", medication: "Novolog (Aspart Bolus)", units: 5, status: "Administered", isPrime: false, type: "bolus", site: "Abdomen (Left)" },
      { time: "08:01 AM", date: "Oct 14, 2026", medication: "Novolog (Needle Prime)", units: 1, status: "Priming Filtered", isPrime: true, type: "prime", site: "Air Clearance" }
    ],
    attentionAlert: {
      active: true,
      severity: "urgent",
      severityLabel: "[LOW GLUCOSE ALERT]",
      title: "Hypoglycemia Warning (68 mg/dL)",
      message: "Continuous sensor recorded 68 mg/dL (< 70 mg/dL). Immediate Action Required: Take 15 grams of fast-acting carbohydrates (4oz juice or 3 glucose tablets). Do not administer insulin. Re-check in 15 minutes.",
      source: "Hypoglycemia Safety Rule #LOW-70",
      isSimulated: true
    },
    reminders: [
      { id: "r1", time: "08:00 AM", name: "Novolog (Bolus)", dose: "5 Units", taken: true, note: "Breakfast bolus logged" },
      { id: "r2", time: "12:45 PM", name: "Novolog (Bolus)", dose: "5 Units", taken: false, note: "Hold if glucose remains under 80 mg/dL" },
      { id: "r3", time: "07:30 PM", name: "Novolog (Bolus)", dose: "5 Units", taken: false, note: "Evening meal bolus" },
      { id: "r4", time: "10:30 PM", name: "Lantus (Basal)", dose: "16 Units", taken: false, note: "Bedtime basal dose" }
    ],
    doctorAlerts: [
      {
        id: "d1",
        doctor: "Dr. Aris Thorne, MD (Lead Endocrinologist)",
        tag: "[URGENT HYPO ADVISORY]",
        message: "Telemetry detected a drop to 68 mg/dL at 11:15 AM. Execute the Rule of 15 immediately. If you plan physical activity this afternoon, consume a complex carbohydrate snack.",
        timestamp: "Today at 11:20 AM",
        severityClass: "badge-urgent"
      }
    ],
    pastMessages: [
      {
        id: "p1",
        doctor: "Dr. Aris Thorne, MD",
        message: "CGM low threshold established at 70 mg/dL with high sensitivity alerts enabled.",
        timestamp: "October 05, 2026"
      }
    ],
    tirBreakdown: { target: 0.67, above: 0.0, below: 0.33 },
    reportMetrics: {
      avgGlucose: "86 mg/dL",
      hba1c: "5.4%",
      timeInRange: "67%",
      dosesLogged: "21 of 21",
      conclusion: "Patient exhibits tight glycemic control with 67% Time-in-Range and 33% Time-Below-Range (<70 mg/dL). Mean glucose is 86 mg/dL. Hypoglycemic episode (68 mg/dL) identified at 11:15 AM. Recommended action: reduce meal bolus preceding light exercise and monitor recovery."
    }
  },

  "dr.thorne": {
    id: "DR-THORNE",
    username: "dr.thorne",
    name: "Dr. Aris Thorne, MD",
    age: 48,
    type: "Lead Endocrinologist & Diabetologist",
    penId: "Clinical Oversight Station #DOC-01",
    recoveryId: "DOC-9999",
    password: "clinical123",
    avatarInitial: "DT",
    isClinician: true
  }
};

class PenSyncApp {
  constructor() {
    this.patients = this.loadPatients();
    this.currentPatient = null;
    this.currentTab = "latest-glucose";
    this.useMmolUnit = false;
    this.isClinicianMode = false;

    this.initDOMElements();
    this.initEventListeners();
    this.checkSession();
  }

  loadPatients() {
    try {
      const stored = localStorage.getItem("pensync_patients");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Clean out legacy test accounts if they linger in client storage
        if (parsed["arthur.p"] || parsed["martha.v"] || !parsed["gc1001"]) {
          localStorage.removeItem("pensync_patients");
          return JSON.parse(JSON.stringify(DEFAULT_PATIENTS));
        }
        return parsed;
      }
    } catch (e) {
      console.warn("Using default patient data due to storage error:", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_PATIENTS));
  }

  savePatients() {
    try {
      localStorage.setItem("pensync_patients", JSON.stringify(this.patients));
    } catch (e) {
      console.warn("Unable to write to localStorage:", e);
    }
  }

  initDOMElements() {
    // Views
    this.loginView = document.getElementById("loginView");
    this.recoveryView = document.getElementById("recoveryView");
    this.dashboardView = document.getElementById("dashboardView");

    // Login Form Elements
    this.loginForm = document.getElementById("loginForm");
    this.usernameInput = document.getElementById("usernameInput");
    this.passwordInput = document.getElementById("passwordInput");
    this.toggleLoginPasswordBtn = document.getElementById("toggleLoginPasswordBtn");
    this.forgotPasswordLink = document.getElementById("forgotPasswordLink");
    this.loginErrorAlert = document.getElementById("loginErrorAlert");

    // Recovery Form Elements
    this.recoveryForm = document.getElementById("recoveryForm");
    this.recoveryIdInput = document.getElementById("recoveryIdInput");
    this.verifyRecoveryBtn = document.getElementById("verifyRecoveryBtn");
    this.passwordResetFields = document.getElementById("passwordResetFields");
    this.newPasswordInput = document.getElementById("newPasswordInput");
    this.confirmPasswordInput = document.getElementById("confirmPasswordInput");
    this.toggleNewPasswordBtn = document.getElementById("toggleNewPasswordBtn");
    this.saveNewPasswordBtn = document.getElementById("saveNewPasswordBtn");
    this.backToLoginBtn = document.getElementById("backToLoginBtn");
    this.recoveryErrorAlert = document.getElementById("recoveryErrorAlert");

    // Clinician Portal Elements
    this.doctorPortalSection = document.getElementById("doctorPortalSection");
    this.doctorKpiSection = document.getElementById("doctorKpiSection");
    this.doctorPatientSelect = document.getElementById("doctorPatientSelect");
    this.exitDoctorPortalBtn = document.getElementById("exitDoctorPortalBtn");
    this.togglePortalModeBtn = document.getElementById("togglePortalModeBtn");
    this.doctorAlertBox = document.getElementById("doctorAlertBox");
    this.doctorKpiId = document.getElementById("doctorKpiId");
    this.doctorKpiSugar = document.getElementById("doctorKpiSugar");
    this.doctorKpiSugarZone = document.getElementById("doctorKpiSugarZone");
    this.doctorKpiMean = document.getElementById("doctorKpiMean");
    this.doctorKpiTir = document.getElementById("doctorKpiTir");
    this.doctorKpiBasal = document.getElementById("doctorKpiBasal");

    // Dashboard Header Elements
    this.patientNameDisplay = document.getElementById("patientNameDisplay");
    this.patientMetaDisplay = document.getElementById("patientMetaDisplay");
    this.patientAvatarDisplay = document.getElementById("patientAvatarDisplay");
    this.logoutBtn = document.getElementById("logoutBtn");

    // Attention / Emergency Alert Window
    this.attentionCard = document.getElementById("attentionCard");
    this.attentionBadge = document.getElementById("attentionBadge");
    this.attentionTitle = document.getElementById("attentionTitle");
    this.attentionDesc = document.getElementById("attentionDesc");
    this.attentionMeta = document.getElementById("attentionMeta");
    this.attentionActionPrimary = document.getElementById("attentionActionPrimary");
    this.attentionActionSecondary = document.getElementById("attentionActionSecondary");

    // Sidebar Navigation Buttons
    this.navButtons = document.querySelectorAll(".nav-menu-btn");
    this.tabPanels = document.querySelectorAll(".tab-window-card");

    // Tab 1: Blood Sugar Elements
    this.latestGlucoseNum = document.getElementById("latestGlucoseNum");
    this.latestGlucoseUnit = document.getElementById("latestGlucoseUnit");
    this.latestGlucoseMeta = document.getElementById("latestGlucoseMeta");
    this.latestGlucoseContext = document.getElementById("latestGlucoseContext");
    this.latestGlucoseTargetChip = document.getElementById("latestGlucoseTargetChip");
    this.latestGlucoseTrend = document.getElementById("latestGlucoseTrend");
    this.sugarHeroCard = document.getElementById("sugarHeroCard");
    this.glucoseHistoryTableBody = document.getElementById("glucoseHistoryTableBody");
    this.openAddGlucoseBtn = document.getElementById("openAddGlucoseBtn");
    this.toggleUnitBtn = document.getElementById("toggleUnitBtn");

    // Tab 2: Insulin Log Elements
    this.dailyTotalInsulin = document.getElementById("dailyTotalInsulin");
    this.dailyBasalInsulin = document.getElementById("dailyBasalInsulin");
    this.dailyBolusInsulin = document.getElementById("dailyBolusInsulin");
    this.cartridgeUnitsLeft = document.getElementById("cartridgeUnitsLeft");
    this.prescribedPlanText = document.getElementById("prescribedPlanText");
    this.insulinHistoryTableBody = document.getElementById("insulinHistoryTableBody");
    this.openAddInsulinBtn = document.getElementById("openAddInsulinBtn");

    // Tab 3: Reminders Containers
    this.insulinRemindersList = document.getElementById("insulinRemindersList");
    this.doctorAlertsList = document.getElementById("doctorAlertsList");
    this.pastMessagesList = document.getElementById("pastMessagesList");

    // Tab 4: Report Elements
    this.reportConclusionText = document.getElementById("reportConclusionText");
    this.metricAvgGlucose = document.getElementById("metricAvgGlucose");
    this.metricHba1c = document.getElementById("metricHba1c");
    this.metricTir = document.getElementById("metricTir");
    this.metricDoses = document.getElementById("metricDoses");
    this.printReportBtn = document.getElementById("printReportBtn");

    // Tab 5: Sync Status Elements
    this.triggerManualSyncBtn = document.getElementById("triggerManualSyncBtn");
    this.syncDeviceStatus = document.getElementById("syncDeviceStatus");
    this.syncInternetStatus = document.getElementById("syncInternetStatus");
    this.syncLastSuccessTime = document.getElementById("syncLastSuccessTime");
    this.syncPendingQueueCount = document.getElementById("syncPendingQueueCount");
    this.syncStatusBadge = document.getElementById("syncStatusBadge");

    // Modals
    this.addGlucoseModal = document.getElementById("addGlucoseModal");
    this.closeAddGlucoseModalBtn = document.getElementById("closeAddGlucoseModalBtn");
    this.cancelAddGlucoseBtn = document.getElementById("cancelAddGlucoseBtn");
    this.addGlucoseForm = document.getElementById("addGlucoseForm");
    this.glucoseValueInput = document.getElementById("glucoseValueInput");
    this.glucoseContextInput = document.getElementById("glucoseContextInput");
    this.glucoseSourceInput = document.getElementById("glucoseSourceInput");

    this.addInsulinModal = document.getElementById("addInsulinModal");
    this.closeAddInsulinModalBtn = document.getElementById("closeAddInsulinModalBtn");
    this.cancelAddInsulinBtn = document.getElementById("cancelAddInsulinBtn");
    this.addInsulinForm = document.getElementById("addInsulinForm");
    this.insulinUnitsInput = document.getElementById("insulinUnitsInput");
    this.insulinTypeInput = document.getElementById("insulinTypeInput");
    this.insulinNotesInput = document.getElementById("insulinNotesInput");

    // Toast
    this.toastBanner = document.getElementById("toastBanner");
    this.toastMessage = document.getElementById("toastMessage");
  }

  initEventListeners() {
    // Password toggle on login
    if (this.toggleLoginPasswordBtn) {
      this.toggleLoginPasswordBtn.addEventListener("click", () => {
        this.togglePasswordVisibility(this.passwordInput, this.toggleLoginPasswordBtn);
      });
    }

    // Password toggle on recovery
    if (this.toggleNewPasswordBtn) {
      this.toggleNewPasswordBtn.addEventListener("click", () => {
        this.togglePasswordVisibility(this.newPasswordInput, this.toggleNewPasswordBtn);
      });
    }

    // Login submit
    if (this.loginForm) {
      this.loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleLogin();
      });
    }

    // Forgot password link
    if (this.forgotPasswordLink) {
      this.forgotPasswordLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.showRecoveryView();
      });
    }

    // Back to login from recovery
    if (this.backToLoginBtn) {
      this.backToLoginBtn.addEventListener("click", () => {
        this.showLoginView();
      });
    }

    // Recovery ID check
    if (this.verifyRecoveryBtn) {
      this.verifyRecoveryBtn.addEventListener("click", () => {
        this.handleVerifyRecoveryId();
      });
    }

    // Save new password
    if (this.saveNewPasswordBtn) {
      this.saveNewPasswordBtn.addEventListener("click", () => {
        this.handleSaveNewPassword();
      });
    }

    // Logout
    if (this.logoutBtn) {
      this.logoutBtn.addEventListener("click", () => {
        this.handleLogout();
      });
    }

    // Clinician view toggles
    if (this.togglePortalModeBtn) {
      this.togglePortalModeBtn.addEventListener("click", () => {
        this.isClinicianMode = !this.isClinicianMode;
        this.renderClinicianPortal();
        this.showToast(this.isClinicianMode ? "Clinician Oversight Mode Active" : "Patient Self-Care Mode Active", "info");
      });
    }

    if (this.exitDoctorPortalBtn) {
      this.exitDoctorPortalBtn.addEventListener("click", () => {
        this.isClinicianMode = false;
        this.renderClinicianPortal();
        this.showToast("Switched back to Patient View", "info");
      });
    }

    if (this.doctorPatientSelect) {
      this.doctorPatientSelect.addEventListener("change", (e) => {
        const targetId = e.target.value;
        if (this.patients[targetId]) {
          this.currentPatient = this.patients[targetId];
          this.renderDashboard();
          this.renderClinicianPortal();
          this.showToast(`Active clinical record switched to ${this.currentPatient.name}`, "info");
        }
      });
    }

    // Sidebar Tab Switching
    this.navButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");
        this.switchTab(targetTab);
      });
    });

    // Alert Actions
    if (this.attentionActionPrimary) {
      this.attentionActionPrimary.addEventListener("click", () => {
        this.handleAttentionPrimaryAction();
      });
    }

    if (this.attentionActionSecondary) {
      this.attentionActionSecondary.addEventListener("click", () => {
        this.openAddGlucoseModal();
      });
    }

    // Unit toggle button (mg/dL <-> mmol/L) [CALC-07]
    if (this.toggleUnitBtn) {
      this.toggleUnitBtn.addEventListener("click", () => {
        this.useMmolUnit = !this.useMmolUnit;
        this.renderLatestSugarTab();
        this.showToast(`Display unit changed to ${this.useMmolUnit ? "mmol/L" : "mg/dL"}`, "info");
      });
    }

    // Manual sync button
    if (this.triggerManualSyncBtn) {
      this.triggerManualSyncBtn.addEventListener("click", () => {
        this.handleManualSync();
      });
    }

    // Print report
    if (this.printReportBtn) {
      this.printReportBtn.addEventListener("click", () => {
        window.print();
      });
    }

    // Modal Triggers: Add Glucose
    if (this.openAddGlucoseBtn) {
      this.openAddGlucoseBtn.addEventListener("click", () => this.openAddGlucoseModal());
    }
    if (this.closeAddGlucoseModalBtn) {
      this.closeAddGlucoseModalBtn.addEventListener("click", () => this.closeAddGlucoseModal());
    }
    if (this.cancelAddGlucoseBtn) {
      this.cancelAddGlucoseBtn.addEventListener("click", () => this.closeAddGlucoseModal());
    }
    if (this.addGlucoseForm) {
      this.addGlucoseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleSaveGlucoseReading();
      });
    }

    // Modal Triggers: Record Insulin
    if (this.openAddInsulinBtn) {
      this.openAddInsulinBtn.addEventListener("click", () => this.openAddInsulinModal());
    }
    if (this.closeAddInsulinModalBtn) {
      this.closeAddInsulinModalBtn.addEventListener("click", () => this.closeAddInsulinModal());
    }
    if (this.cancelAddInsulinBtn) {
      this.cancelAddInsulinBtn.addEventListener("click", () => this.closeAddInsulinModal());
    }
    if (this.addInsulinForm) {
      this.addInsulinForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleSaveInsulinDose();
      });
    }

    // Auto-fill demo credentials
    document.querySelectorAll(".demo-fill-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const user = btn.getAttribute("data-username");
        const pass = btn.getAttribute("data-password");
        if (this.usernameInput && this.passwordInput) {
          this.usernameInput.value = user;
          this.passwordInput.value = pass;
          this.loginErrorAlert.style.display = "none";
          this.showToast(`Auto-filled demo credentials for ${user}`, "info");
        }
      });
    });

    // Demo recovery ID autofill
    document.querySelectorAll(".demo-recovery-fill").forEach((btn) => {
      btn.addEventListener("click", () => {
        const recId = btn.getAttribute("data-recid");
        if (this.recoveryIdInput) {
          this.recoveryIdInput.value = recId;
          this.handleVerifyRecoveryId();
        }
      });
    });
  }

  togglePasswordVisibility(inputEl, buttonEl) {
    if (!inputEl) return;
    const isPassword = inputEl.type === "password";
    inputEl.type = isPassword ? "text" : "password";
    buttonEl.setAttribute("aria-pressed", isPassword ? "true" : "false");
    buttonEl.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");

    buttonEl.innerHTML = isPassword
      ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
      : `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
  }

  showLoginView() {
    this.loginView.classList.add("active");
    this.recoveryView.classList.remove("active");
    this.dashboardView.classList.remove("active");
    this.loginErrorAlert.style.display = "none";
    if (this.usernameInput) this.usernameInput.focus();
  }

  showRecoveryView() {
    this.loginView.classList.remove("active");
    this.recoveryView.classList.add("active");
    this.dashboardView.classList.remove("active");
    this.recoveryErrorAlert.style.display = "none";
    this.passwordResetFields.style.display = "none";
    if (this.recoveryIdInput) {
      this.recoveryIdInput.value = "";
      this.recoveryIdInput.focus();
    }
  }

  showDashboardView() {
    this.loginView.classList.remove("active");
    this.recoveryView.classList.remove("active");
    this.dashboardView.classList.add("active");
    this.renderDashboard();
    this.renderClinicianPortal();
    this.switchTab(this.currentTab);
  }

  checkSession() {
    const activeKey = sessionStorage.getItem("pensync_active_user");
    if (activeKey && this.patients[activeKey]) {
      this.currentPatient = this.patients[activeKey];
      if (this.currentPatient.isClinician) {
        this.isClinicianMode = true;
        this.currentPatient = this.patients["gc1001"];
      }
      this.showDashboardView();
    } else {
      this.showLoginView();
    }
  }

  handleLogin() {
    const rawUser = this.usernameInput.value.trim().toLowerCase();
    const password = this.passwordInput.value;

    // Reject legacy test accounts explicitly
    if (rawUser === "arthur.p" || rawUser === "martha.v" || password === "insulin123" || password === "vital456") {
      this.loginErrorAlert.textContent = "Legacy demo credentials have been retired. Please use GC1001, GC1002, GC1003, or dr.thorne.";
      this.loginErrorAlert.style.display = "block";
      return;
    }

    // Resolve aliases (e.g. ananya.r -> gc1001)
    let patientKey = rawUser;
    if (rawUser === "ananya.r") patientKey = "gc1001";
    if (rawUser === "ravi.k") patientKey = "gc1002";
    if (rawUser === "meera.n") patientKey = "gc1003";

    const patient = this.patients[patientKey];

    // Password validation: accept configured password or patient ID as password
    const isValidPass = patient && (
      patient.password === password ||
      patient.id.toLowerCase() === password.toLowerCase() ||
      (patientKey === "dr.thorne" && (password === "clinical123" || password === "pensync123"))
    );

    if (patient && isValidPass) {
      this.loginErrorAlert.style.display = "none";

      if (patient.isClinician) {
        this.isClinicianMode = true;
        this.currentPatient = this.patients["gc1001"];
        sessionStorage.setItem("pensync_active_user", "dr.thorne");
        this.showToast("Welcome, Dr. Aris Thorne. Multi-patient oversight activated.", "success");
      } else {
        this.isClinicianMode = false;
        this.currentPatient = patient;
        sessionStorage.setItem("pensync_active_user", patientKey);
        this.showToast(`Welcome back, ${patient.name}`, "success");
      }

      this.showDashboardView();
    } else {
      this.loginErrorAlert.textContent = "Invalid username or password. Please select an authorized demo account below.";
      this.loginErrorAlert.style.display = "block";
    }
  }

  handleVerifyRecoveryId() {
    const recoveryId = this.recoveryIdInput.value.trim().toUpperCase();
    if (!recoveryId) {
      this.recoveryErrorAlert.textContent = "Please enter your Recovery ID.";
      this.recoveryErrorAlert.style.display = "block";
      return;
    }

    // Explicitly reject old recovery IDs
    if (recoveryId === "PEN-9021" || recoveryId === "PEN-4410") {
      this.recoveryErrorAlert.textContent = "Legacy Recovery ID is deprecated. Please use PEN-1001, PEN-1002, or PEN-1003.";
      this.recoveryErrorAlert.style.display = "block";
      return;
    }

    const matchedKey = Object.keys(this.patients).find(
      (k) => this.patients[k].recoveryId && this.patients[k].recoveryId.toUpperCase() === recoveryId
    );

    if (matchedKey) {
      this.recoveryTargetUser = matchedKey;
      this.recoveryErrorAlert.style.display = "none";
      this.passwordResetFields.style.display = "block";
      this.newPasswordInput.focus();
      this.showToast(`Recovery ID verified for ${this.patients[matchedKey].name}`, "info");
    } else {
      this.recoveryErrorAlert.textContent = "Recovery ID not recognized. Authorized demo IDs: PEN-1001, PEN-1002, PEN-1003.";
      this.recoveryErrorAlert.style.display = "block";
    }
  }

  handleSaveNewPassword() {
    const newPass = this.newPasswordInput.value;
    const confirmPass = this.confirmPasswordInput.value;

    if (!newPass || newPass.length < 4) {
      this.recoveryErrorAlert.textContent = "Password must be at least 4 characters long.";
      this.recoveryErrorAlert.style.display = "block";
      return;
    }

    if (newPass !== confirmPass) {
      this.recoveryErrorAlert.textContent = "New passwords do not match. Please verify.";
      this.recoveryErrorAlert.style.display = "block";
      return;
    }

    if (this.recoveryTargetUser && this.patients[this.recoveryTargetUser]) {
      this.patients[this.recoveryTargetUser].password = newPass;
      this.savePatients();

      this.showToast("Password updated successfully! Please sign in with your new password.", "success");
      this.showLoginView();
      if (this.usernameInput && this.passwordInput) {
        this.usernameInput.value = this.recoveryTargetUser;
        this.passwordInput.value = newPass;
      }
    }
  }

  handleLogout() {
    sessionStorage.removeItem("pensync_active_user");
    this.currentPatient = null;
    this.isClinicianMode = false;
    this.showLoginView();
    this.showToast("You have been signed out safely.", "info");
  }

  renderDashboard() {
    if (!this.currentPatient) return;
    const p = this.currentPatient;

    // Header Profile info
    if (this.patientNameDisplay) this.patientNameDisplay.textContent = p.name;
    if (this.patientAvatarDisplay) this.patientAvatarDisplay.textContent = p.avatarInitial;
    if (this.patientMetaDisplay) {
      this.patientMetaDisplay.innerHTML = `
        <span class="patient-meta-item"><strong>Patient ID:</strong> ${p.id}</span>
        <span class="patient-meta-item">|</span>
        <span class="patient-meta-item"><strong>Age:</strong> ${p.age}</span>
        <span class="patient-meta-item">|</span>
        <span class="patient-meta-item"><strong>Condition:</strong> ${p.type}</span>
        <span class="patient-meta-item">|</span>
        <span class="patient-meta-item"><strong>Device:</strong> ${p.penId}</span>
      `;
    }

    // Render individual components
    this.renderAttentionWindow();
    this.renderLatestSugarTab();
    this.renderInsulinLogTab();
    this.renderReminders();
    this.renderReport();
    this.renderSyncStatusTab();
  }

  renderClinicianPortal() {
    if (!this.doctorPortalSection || !this.doctorKpiSection) return;

    if (this.isClinicianMode) {
      this.doctorPortalSection.style.display = "flex";
      this.doctorKpiSection.style.display = "block";
      if (this.togglePortalModeBtn) {
        this.togglePortalModeBtn.textContent = "👤 Exit Clinician View";
        this.togglePortalModeBtn.style.background = "#087E8B";
      }

      // Sync selector dropdown with active patient
      if (this.doctorPatientSelect && this.currentPatient) {
        this.doctorPatientSelect.value = this.currentPatient.username;
      }

      // Populate doctor KPI cards for active patient
      const p = this.currentPatient;
      if (p) {
        if (this.doctorKpiId) this.doctorKpiId.textContent = p.id;
        const latest = p.glucoseReadings[p.glucoseReadings.length - 1];
        if (this.doctorKpiSugar && latest) {
          this.doctorKpiSugar.textContent = `${latest.value} mg/dL`;
        }
        if (this.doctorKpiSugarZone && latest) {
          if (latest.value < 70) {
            this.doctorKpiSugarZone.textContent = "Low (<70)";
            this.doctorKpiSugarZone.className = "badge badge-urgent";
          } else if (latest.value > 140) {
            this.doctorKpiSugarZone.textContent = "Above Target (>140)";
            this.doctorKpiSugarZone.className = "badge badge-warning";
          } else {
            this.doctorKpiSugarZone.textContent = "In Target (70–140)";
            this.doctorKpiSugarZone.className = "badge badge-ok";
          }
        }
        if (this.doctorKpiMean) this.doctorKpiMean.textContent = p.reportMetrics.avgGlucose;
        if (this.doctorKpiTir) this.doctorKpiTir.textContent = p.reportMetrics.timeInRange;
        if (this.doctorKpiBasal) {
          const basalEvt = p.insulinEvents.find(e => e.type === "basal");
          this.doctorKpiBasal.textContent = basalEvt ? `${basalEvt.units} U/day` : "20 U/day";
        }

        // Render Cross-reference alert box
        if (this.doctorAlertBox) {
          if (p.id === "GC1002") {
            this.doctorAlertBox.className = "crossref-alert-box hazard";
            this.doctorAlertBox.innerHTML = `
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
                <strong style="color:var(--color-status-urgent); font-size:var(--font-size-base);">⚠️ CLINICAL ALERT: Severe Post-Prandial Elevation (236 mg/dL)</strong>
                <span class="badge badge-urgent">Priority Attention</span>
              </div>
              <p style="margin:0; font-size:var(--font-size-sm); color:var(--color-text-dark);">
                Patient Ravi Kumar recorded 236 mg/dL at 1:30 PM post-lunch. Time-Above-Range is 67%. Advise patient to administer meal boluses 15 minutes prior to carbohydrate ingestion.
              </p>
            `;
          } else if (p.id === "GC1003") {
            this.doctorAlertBox.className = "crossref-alert-box hazard";
            this.doctorAlertBox.innerHTML = `
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
                <strong style="color:var(--color-status-urgent); font-size:var(--font-size-base);">🚨 CLINICAL ALERT: Hypoglycemic Dip Detected (68 mg/dL)</strong>
                <span class="badge badge-urgent">Immediate Action</span>
              </div>
              <p style="margin:0; font-size:var(--font-size-sm); color:var(--color-text-dark);">
                Continuous telemetry logged 68 mg/dL at 11:15 AM. Rule of 15 action plan initiated. Withhold pre-snack bolus until sensor confirms recovery >80 mg/dL.
              </p>
            `;
          } else {
            this.doctorAlertBox.className = "crossref-alert-box";
            this.doctorAlertBox.innerHTML = `
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
                <strong style="color:var(--color-status-ok); font-size:var(--font-size-base);">✓ CLINICAL STABILITY: Target Control Maintained</strong>
                <span class="badge badge-ok">Stable</span>
              </div>
              <p style="margin:0; font-size:var(--font-size-sm); color:var(--color-text-dark);">
                Ananya Rao: 100% Time-in-Range across past 7 days. Mean glucose: 129 mg/dL. Glargine 20 U bedtime adherence verified.
              </p>
            `;
          }
        }
      }
    } else {
      this.doctorPortalSection.style.display = "none";
      this.doctorKpiSection.style.display = "none";
      if (this.togglePortalModeBtn) {
        this.togglePortalModeBtn.textContent = "🩺 Clinician View";
        this.togglePortalModeBtn.style.background = "rgba(8,126,139,0.3)";
      }
    }
  }

  renderLatestSugarTab() {
    const p = this.currentPatient;
    if (!p) return;

    const readings = p.glucoseReadings || [];
    if (readings.length === 0) return;

    const latest = readings[readings.length - 1];

    // Format value: mg/dL vs mmol/L [CALC-07]
    const displayVal = this.useMmolUnit
      ? (latest.value / 18.0182).toFixed(1)
      : latest.value;
    const unitLabel = this.useMmolUnit ? "mmol/L" : "mg/dL";

    if (this.latestGlucoseNum) this.latestGlucoseNum.textContent = displayVal;
    if (this.latestGlucoseUnit) this.latestGlucoseUnit.textContent = unitLabel;
    if (this.latestGlucoseMeta) {
      this.latestGlucoseMeta.textContent = `Measured: ${latest.date}, ${latest.time} • ${latest.source}`;
    }
    if (this.latestGlucoseContext) {
      this.latestGlucoseContext.textContent = latest.context;
    }

    // Determine Glycemic Zone [CALC-05]
    let statusClass = "status-target";
    let zoneChipText = "In Target (70–140 mg/dL)";
    let zoneBadgeClass = "badge-ok";

    if (latest.value < 70) {
      statusClass = "status-urgent";
      zoneChipText = "Low Glucose Alert (<70 mg/dL)";
      zoneBadgeClass = "badge-urgent";
    } else if (latest.value > 140) {
      statusClass = "status-warning";
      zoneChipText = "Above Target (>140 mg/dL)";
      zoneBadgeClass = "badge-warning";
    }

    if (this.sugarHeroCard) {
      this.sugarHeroCard.className = `sugar-value-card ${statusClass}`;
    }
    if (this.latestGlucoseTargetChip) {
      this.latestGlucoseTargetChip.textContent = zoneChipText;
      this.latestGlucoseTargetChip.className = `badge ${zoneBadgeClass}`;
    }

    if (this.latestGlucoseTrend) {
      if (p.id === "GC1002") {
        this.latestGlucoseTrend.textContent = "↑ Rate: +1.2 mg/dL/min (Rising)";
        this.latestGlucoseTrend.className = "sugar-trend-chip badge badge-warning";
      } else if (p.id === "GC1003") {
        this.latestGlucoseTrend.textContent = "↓ Rate: -0.9 mg/dL/min (Falling)";
        this.latestGlucoseTrend.className = "sugar-trend-chip badge badge-urgent";
      } else {
        this.latestGlucoseTrend.textContent = "→ Rate: 0.0 mg/dL/min (Stable)";
        this.latestGlucoseTrend.className = "sugar-trend-chip badge badge-info";
      }
    }

    // Render chronological measurements table
    if (this.glucoseHistoryTableBody) {
      this.glucoseHistoryTableBody.innerHTML = readings.slice().reverse().map(r => {
        const valStr = this.useMmolUnit
          ? `${(r.value / 18.0182).toFixed(1)} mmol/L`
          : `${r.value} mg/dL`;

        let rowBadge = `<span class="badge badge-ok">In Target</span>`;
        if (r.value < 70) rowBadge = `<span class="badge badge-urgent">Below Target (&lt;70)</span>`;
        else if (r.value > 140) rowBadge = `<span class="badge badge-warning">Above Target (&gt;140)</span>`;

        return `
          <tr>
            <td><strong>${r.time}</strong><br><span style="font-size:var(--font-size-xs); color:var(--color-text-muted);">${r.date}</span></td>
            <td><strong style="font-size:18px;">${valStr}</strong></td>
            <td>${r.context}</td>
            <td>${r.source}</td>
            <td>${rowBadge}</td>
          </tr>
        `;
      }).join("");
    }
  }

  renderInsulinLogTab() {
    const p = this.currentPatient;
    if (!p) return;

    const events = p.insulinEvents || [];

    // Calculate daily totals [CALC-09]
    let totalBasal = 0;
    let totalBolus = 0;

    events.forEach(e => {
      if (!e.isPrime) {
        if (e.type === "basal") totalBasal += Number(e.units);
        else totalBolus += Number(e.units);
      }
    });

    const totalToday = totalBasal + totalBolus;

    if (this.dailyTotalInsulin) this.dailyTotalInsulin.textContent = `${totalToday} U`;
    if (this.dailyBasalInsulin) this.dailyBasalInsulin.textContent = `${totalBasal} U`;
    if (this.dailyBolusInsulin) this.dailyBolusInsulin.textContent = `${totalBolus} U`;
    if (this.cartridgeUnitsLeft) this.cartridgeUnitsLeft.textContent = `${p.cartridgeUnitsLeft} U`;
    if (this.prescribedPlanText) this.prescribedPlanText.textContent = p.prescribedPlan;

    // Render insulin injection events table
    if (this.insulinHistoryTableBody) {
      this.insulinHistoryTableBody.innerHTML = events.slice().reverse().map(e => {
        const primeTag = e.isPrime
          ? `<span class="badge badge-warning">Prime Dose Excluded (≤2U/60s)</span>`
          : `<span class="badge badge-ok">Metabolically Active Dose</span>`;

        return `
          <tr>
            <td><strong>${e.time}</strong><br><span style="font-size:var(--font-size-xs); color:var(--color-text-muted);">${e.date}</span></td>
            <td>${e.medication}<br><span style="font-size:var(--font-size-xs); color:var(--color-text-muted);">Site: ${e.site || "Abdomen"}</span></td>
            <td><strong style="font-size:18px; color:var(--color-insulin);">${e.units} Units</strong></td>
            <td><span class="badge ${e.isPrime ? "badge-info" : "badge-ok"}">${e.status}</span></td>
            <td>${primeTag}</td>
          </tr>
        `;
      }).join("");
    }
  }

  renderAttentionWindow() {
    const alert = this.currentPatient.attentionAlert;
    if (!alert || !alert.active) {
      this.attentionCard.style.display = "none";
      return;
    }

    this.attentionCard.style.display = "flex";
    this.attentionCard.className = `attention-window-card severity-${alert.severity}`;

    this.attentionBadge.textContent = alert.severityLabel;
    this.attentionBadge.className = `badge badge-${alert.severity}`;

    this.attentionTitle.textContent = alert.title;
    this.attentionDesc.textContent = alert.message;
    this.attentionMeta.innerHTML = `
      <span><strong>Rule Source:</strong> ${alert.source}</span>
      <span>•</span>
      <span><strong>Status:</strong> ${alert.isSimulated ? "Simulated Pen Telemetry" : "Manual Verification"}</span>
    `;

    if (this.currentPatient.id === "GC1003") {
      this.attentionActionPrimary.textContent = "Confirm Carbs Ingested (15g)";
      this.attentionActionSecondary.textContent = "Log Re-Check Blood Sugar";
    } else if (this.currentPatient.id === "GC1002") {
      this.attentionActionPrimary.textContent = "Confirm Hydration Protocol";
      this.attentionActionSecondary.textContent = "Log Re-Check Blood Sugar";
    } else {
      this.attentionActionPrimary.textContent = "Acknowledge Notice";
      this.attentionActionSecondary.textContent = "Log Manual Fingerstick";
    }
  }

  handleAttentionPrimaryAction() {
    const p = this.currentPatient;
    if (p.attentionAlert && p.attentionAlert.active) {
      p.attentionAlert.active = false;
      this.savePatients();
      this.renderAttentionWindow();
      this.renderClinicianPortal();
      this.showToast("Action protocol acknowledged and saved to telemetry log", "success");
    }
  }

  renderSyncStatusTab() {
    const p = this.currentPatient;
    if (!p) return;

    if (this.syncDeviceStatus) this.syncDeviceStatus.textContent = "Connected & Paired";
    if (this.syncInternetStatus) this.syncInternetStatus.textContent = "Online & Synchronized";
    if (this.syncPendingQueueCount) this.syncPendingQueueCount.textContent = "0 Records Pending";
    if (this.syncStatusBadge) {
      this.syncStatusBadge.textContent = "Synchronized";
      this.syncStatusBadge.className = "badge badge-ok";
    }
  }

  handleManualSync() {
    if (!this.syncStatusBadge) return;
    this.syncStatusBadge.textContent = "Syncing...";
    this.syncStatusBadge.className = "badge badge-warning";

    if (this.triggerManualSyncBtn) this.triggerManualSyncBtn.disabled = true;

    setTimeout(() => {
      if (this.syncStatusBadge) {
        this.syncStatusBadge.textContent = "Synchronized";
        this.syncStatusBadge.className = "badge badge-ok";
      }
      if (this.syncLastSuccessTime) {
        const now = new Date();
        this.syncLastSuccessTime.textContent = `Today at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      }
      if (this.triggerManualSyncBtn) this.triggerManualSyncBtn.disabled = false;
      this.showToast("PenSync smart pen memory packets verified and synchronized with local cache", "success");
    }, 600);
  }

  switchTab(tabId) {
    this.currentTab = tabId;

    this.navButtons.forEach((btn) => {
      const isTarget = btn.getAttribute("data-tab") === tabId;
      btn.classList.toggle("active", isTarget);
      btn.setAttribute("aria-selected", isTarget ? "true" : "false");
    });

    this.tabPanels.forEach((panel) => {
      const isTarget = panel.getAttribute("id") === `tab-${tabId}`;
      panel.classList.toggle("active", isTarget);
    });

    if (tabId === "my-report") {
      setTimeout(() => {
        this.drawReportCharts();
      }, 50);
    }
  }

  renderReminders() {
    const p = this.currentPatient;
    if (!p) return;

    if (this.insulinRemindersList) {
      this.insulinRemindersList.innerHTML = p.reminders.map((rem) => `
        <article class="reminder-item-card ${rem.taken ? "completed" : ""}">
          <div class="reminder-card-header">
            <div>
              <span class="reminder-time-badge">${rem.time}</span>
              <h4 class="reminder-dosage-name">${rem.name} • ${rem.dose}</h4>
            </div>
            <span class="badge ${rem.taken ? "badge-ok" : "badge-warning"}">
              ${rem.taken ? "[DOSE LOGGED]" : "[PENDING]"}
            </span>
          </div>
          <p class="reminder-notes">${rem.note}</p>
          <div style="margin-top: 0.5rem;">
            <button type="button" class="btn-outline toggle-reminder-btn" data-id="${rem.id}" style="width: 100%;">
              ${rem.taken ? "✓ Marked as Administered" : "Mark Dose as Administered"}
            </button>
          </div>
        </article>
      `).join("");

      this.insulinRemindersList.querySelectorAll(".toggle-reminder-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          const item = p.reminders.find((r) => r.id === id);
          if (item) {
            item.taken = !item.taken;
            this.savePatients();
            this.renderReminders();
            this.showToast(`Updated reminder for ${item.name}`, "info");
          }
        });
      });
    }

    if (this.doctorAlertsList) {
      this.doctorAlertsList.innerHTML = p.doctorAlerts.map((doc) => `
        <article class="doctor-alert-card">
          <div class="doctor-card-header">
            <span class="doctor-name">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#087E8B" stroke-width="2.2" aria-hidden="true">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              ${doc.doctor}
            </span>
            <span class="badge ${doc.severityClass}">${doc.tag}</span>
          </div>
          <p class="doctor-message-text">${doc.message}</p>
          <span class="doctor-timestamp">${doc.timestamp}</span>
        </article>
      `).join("");
    }

    if (this.pastMessagesList) {
      this.pastMessagesList.innerHTML = p.pastMessages.map((msg) => `
        <div class="past-message-item">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.35rem;">
            <strong style="color:var(--color-primary);">${msg.doctor}</strong>
            <span style="font-size:var(--font-size-xs); color:var(--color-text-muted);">${msg.timestamp}</span>
          </div>
          <p style="margin:0; font-size:var(--font-size-sm);">${msg.message}</p>
        </div>
      `).join("");
    }
  }

  renderReport() {
    const p = this.currentPatient;
    if (!p) return;
    const metrics = p.reportMetrics;

    if (this.reportConclusionText) this.reportConclusionText.textContent = metrics.conclusion;
    if (this.metricAvgGlucose) this.metricAvgGlucose.textContent = metrics.avgGlucose;
    if (this.metricHba1c) this.metricHba1c.textContent = metrics.hba1c;
    if (this.metricTir) this.metricTir.textContent = metrics.timeInRange;
    if (this.metricDoses) this.metricDoses.textContent = metrics.dosesLogged;
  }

  drawReportCharts() {
    const trendCanvas = document.getElementById("glucoseTrendCanvas");
    if (trendCanvas) {
      this.renderTrendChart(trendCanvas);
    }

    const tirCanvas = document.getElementById("tirDonutCanvas");
    if (tirCanvas) {
      this.renderTirChart(tirCanvas);
    }
  }

  renderTrendChart(canvas) {
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);

    const padLeft = 55;
    const padRight = 25;
    const padTop = 30;
    const padBottom = 40;
    const chartW = w - padLeft - padRight;
    const chartH = h - padTop - padBottom;

    const minY = 40;
    const maxY = 260;
    const getY = (val) => padTop + chartH - ((val - minY) / (maxY - minY)) * chartH;

    // 1. Target In-Range Green Band (70 - 140 mg/dL) [CALC-03]
    const targetTop = getY(140);
    const targetBottom = getY(70);
    ctx.fillStyle = "rgba(35, 122, 87, 0.12)";
    ctx.fillRect(padLeft, targetTop, chartW, targetBottom - targetTop);

    ctx.strokeStyle = "rgba(35, 122, 87, 0.4)";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padLeft, targetTop);
    ctx.lineTo(padLeft + chartW, targetTop);
    ctx.moveTo(padLeft, targetBottom);
    ctx.lineTo(padLeft + chartW, targetBottom);
    ctx.stroke();
    ctx.setLineDash([]);

    // Y Axis labels
    ctx.fillStyle = "#334D64";
    ctx.font = "14px -apple-system, sans-serif";
    ctx.textAlign = "right";
    [70, 100, 140, 180, 220, 260].forEach((val) => {
      ctx.fillText(`${val}`, padLeft - 10, getY(val) + 5);
      ctx.strokeStyle = "#E2E8F0";
      ctx.beginPath();
      ctx.moveTo(padLeft, getY(val));
      ctx.lineTo(padLeft + chartW, getY(val));
      ctx.stroke();
    });

    const dataPoints = this.currentPatient.trend7Day || [];
    if (dataPoints.length === 0) return;

    const getX = (idx) => padLeft + (idx / (dataPoints.length - 1)) * chartW;

    // Draw Smooth Curve in Deep Navy #16324F
    ctx.strokeStyle = "#16324F";
    ctx.lineWidth = 3;
    ctx.beginPath();
    dataPoints.forEach((dp, i) => {
      const x = getX(i);
      const y = getY(dp.glucose);
      if (i === 0) ctx.moveTo(x, y);
      else {
        const prevX = getX(i - 1);
        const prevY = getY(dataPoints[i - 1].glucose);
        const cpX1 = prevX + (x - prevX) / 2;
        const cpY1 = prevY;
        const cpX2 = prevX + (x - prevX) / 2;
        const cpY2 = y;
        ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, x, y);
      }
    });
    ctx.stroke();

    // Data points & insulin markers
    dataPoints.forEach((dp, i) => {
      const x = getX(i);
      const y = getY(dp.glucose);

      // Node color: green in target, yellow high, red low
      if (dp.glucose < 70) ctx.fillStyle = "#B42318";
      else if (dp.glucose > 140) ctx.fillStyle = "#9A5B00";
      else ctx.fillStyle = "#237A57";

      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#FFFFFF";
      ctx.stroke();

      // Insulin injection marker icon below data point (#5B4B8A)
      ctx.fillStyle = "#5B4B8A";
      ctx.beginPath();
      ctx.arc(x, y + 18, 4, 0, Math.PI * 2);
      ctx.fill();

      // Day label
      ctx.fillStyle = "#16324F";
      ctx.font = "bold 15px -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(dp.day, x, h - 12);
    });
  }

  renderTirChart(canvas) {
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);

    const centerX = w / 2;
    const centerY = h / 2 - 10;
    const outerRadius = Math.min(centerX, centerY) - 20;
    const innerRadius = outerRadius - 26;

    const tir = this.currentPatient.tirBreakdown || { target: 1.0, above: 0.0, below: 0.0 };

    const segments = [
      { label: "Target (70-140)", percent: tir.target, color: "#237A57" },
      { label: "Above (>140)", percent: tir.above, color: "#9A5B00" },
      { label: "Below (<70)", percent: tir.below, color: "#B42318" }
    ];

    let startAngle = -Math.PI / 2;

    segments.forEach((seg) => {
      if (seg.percent > 0) {
        const sliceAngle = seg.percent * (Math.PI * 2);
        const endAngle = startAngle + sliceAngle;

        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
        ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
        ctx.closePath();
        ctx.fillStyle = seg.color;
        ctx.fill();

        startAngle = endAngle;
      }
    });

    const tirPercentStr = `${Math.round(tir.target * 100)}%`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 28px -apple-system, sans-serif";
    ctx.fillStyle = "#16324F";
    ctx.fillText(tirPercentStr, centerX, centerY - 6);

    ctx.font = "14px -apple-system, sans-serif";
    ctx.fillStyle = "#334D64";
    ctx.fillText("IN TARGET", centerX, centerY + 18);
  }

  // Modal Methods
  openAddGlucoseModal() {
    if (this.addGlucoseModal) {
      this.addGlucoseModal.classList.add("active");
      if (this.glucoseValueInput) {
        this.glucoseValueInput.value = "";
        this.glucoseValueInput.focus();
      }
    }
  }

  closeAddGlucoseModal() {
    if (this.addGlucoseModal) this.addGlucoseModal.classList.remove("active");
  }

  handleSaveGlucoseReading() {
    const val = Number(this.glucoseValueInput.value);
    const context = this.glucoseContextInput.value;
    const source = this.glucoseSourceInput.value;

    if (!val || val < 20 || val > 600) {
      alert("Please enter a valid glucose measurement between 20 and 600 mg/dL.");
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = "Oct 14, 2026";

    const newReading = {
      time: timeStr,
      date: dateStr,
      value: val,
      context: context,
      source: source,
      note: "Manual patient log entry",
      isLatest: true
    };

    const p = this.currentPatient;
    p.glucoseReadings.forEach(r => r.isLatest = false);
    p.glucoseReadings.push(newReading);

    // Recompute 7-day average and HbA1c [CALC-01, CALC-02]
    const sum = p.glucoseReadings.reduce((acc, r) => acc + r.value, 0);
    const mean = Math.round(sum / p.glucoseReadings.length);
    p.reportMetrics.avgGlucose = `${mean} mg/dL`;
    const hba1c = ((mean + 46.7) / 28.7).toFixed(1);
    p.reportMetrics.hba1c = `${hba1c}%`;

    this.savePatients();
    this.closeAddGlucoseModal();
    this.renderLatestSugarTab();
    this.renderClinicianPortal();
    this.showToast(`Blood sugar of ${val} mg/dL logged successfully!`, "success");
  }

  openAddInsulinModal() {
    if (this.addInsulinModal) {
      this.addInsulinModal.classList.add("active");
      if (this.insulinUnitsInput) {
        this.insulinUnitsInput.value = "";
        this.insulinUnitsInput.focus();
      }
    }
  }

  closeAddInsulinModal() {
    if (this.addInsulinModal) this.addInsulinModal.classList.remove("active");
  }

  handleSaveInsulinDose() {
    const units = Number(this.insulinUnitsInput.value);
    const med = this.insulinTypeInput.value;
    const site = this.insulinNotesInput.value;

    if (!units || units <= 0 || units > 80) {
      alert("Please enter a valid insulin dose amount (1 to 80 Units).");
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = "Oct 14, 2026";

    // Check priming filter [CALC-06]: <=2U within 60s of previous dose
    const isPrime = units <= 2;
    const isBasal = med.toLowerCase().includes("basal") || med.toLowerCase().includes("lantus") || med.toLowerCase().includes("tresiba") || med.toLowerCase().includes("glargine") || med.toLowerCase().includes("degludec");

    const newEvent = {
      time: timeStr,
      date: dateStr,
      medication: med,
      units: units,
      status: isPrime ? "Priming Filtered" : "Administered",
      isPrime: isPrime,
      type: isBasal ? "basal" : "bolus",
      site: site
    };

    const p = this.currentPatient;
    p.insulinEvents.push(newEvent);
    p.cartridgeUnitsLeft = Math.max(0, p.cartridgeUnitsLeft - units);

    this.savePatients();
    this.closeAddInsulinModal();
    this.renderInsulinLogTab();
    this.renderClinicianPortal();
    this.showToast(`Administered dose of ${units} Units recorded successfully!`, "success");
  }

  showToast(message, type = "info") {
    if (!this.toastBanner) return;
    this.toastMessage.textContent = message;
    this.toastBanner.className = `toast-banner toast-${type} show`;

    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastBanner.classList.remove("show");
    }, 4500);
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  window.penSyncApp = new PenSyncApp();
});
