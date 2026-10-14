/**
 * PenSync - Smart Insulin Pen & Glucose Companion
 * Accessible, High-Contrast Healthcare Interface
 */

// Initial pre-seeded patient accounts with history
const DEFAULT_PATIENTS = {
  "arthur.p": {
    username: "arthur.p",
    name: "Arthur Pendelton",
    age: 68,
    type: "Type 2 Diabetes",
    penId: "PenSync Duo Pro #SN-8820",
    recoveryId: "PEN-9021",
    password: "insulin123",
    avatarInitial: "AP",
    attentionAlert: {
      active: true,
      severity: "warning", // 'urgent' | 'warning' | 'ok'
      severityLabel: "[ATTENTION REQUIRED]",
      title: "Scheduled Lunchtime Bolus Pending",
      message: "Scheduled at 12:30 PM — 8 Units Rapid-Acting Insulin (Humalog). Please check your glucose before administering.",
      source: "Configured Schedule Rule #BL-1230",
      isSimulated: true
    },
    reminders: [
      { id: "r1", time: "08:00 AM", name: "Lantus (Basal)", dose: "14 Units", taken: true, note: "Taken on schedule via PenSync" },
      { id: "r2", time: "12:30 PM", name: "Humalog (Bolus)", dose: "8 Units", taken: false, note: "Pre-meal injection window open" },
      { id: "r3", time: "07:00 PM", name: "Humalog (Bolus)", dose: "10 Units", taken: false, note: "Scheduled with evening meal" },
      { id: "r4", time: "10:00 PM", name: "Lantus (Basal)", dose: "16 Units", taken: false, note: "Bedtime long-acting dose" }
    ],
    doctorAlerts: [
      {
        id: "d1",
        doctor: "Dr. Aris Thorne, MD (Endocrinology)",
        tag: "[CLINICAL NOTICE]",
        message: "Your post-breakfast readings showed a slight upward curve on Tuesday. Please ensure a 15-minute wait between bolus injection and your meal.",
        timestamp: "Today at 09:15 AM",
        severityClass: "badge-warning"
      },
      {
        id: "d2",
        doctor: "Elena Rostova, RN (Care Coordinator)",
        tag: "[PRESCRIPTION CONFIRMATION]",
        message: "Your 90-day cartridge refill for Humalog U-100 has been verified with Green Valley Pharmacy and is ready for pickup.",
        timestamp: "Yesterday at 03:40 PM",
        severityClass: "badge-info"
      }
    ],
    pastMessages: [
      {
        id: "p1",
        doctor: "Dr. Aris Thorne, MD",
        message: "Quarterly HbA1c lab order submitted to Quest Diagnostics. Fasting required for 8 hours prior.",
        timestamp: "October 02, 2026"
      },
      {
        id: "p2",
        doctor: "PenSync Safety Telemetry",
        message: "System auto-check passed. Pen battery at 94%. Cartridge plunger calibration nominal.",
        timestamp: "September 28, 2026"
      }
    ],
    reportMetrics: {
      avgGlucose: "126 mg/dL",
      hba1c: "6.2%",
      timeInRange: "82%",
      dosesLogged: "21 of 21",
      conclusion: "Your 7-day average blood glucose is 126 mg/dL with 82% Time-in-Range (target 70–140 mg/dL). Fasting levels remain steady with no recorded hypoglycemic episodes. Excellent adherence observed across all PenSync scheduled doses."
    }
  },
  "martha.v": {
    username: "martha.v",
    name: "Martha Vance",
    age: 72,
    type: "Type 1 Diabetes",
    penId: "PenSync Touch #SN-3041",
    recoveryId: "PEN-4410",
    password: "vital456",
    avatarInitial: "MV",
    attentionAlert: {
      active: true,
      severity: "urgent",
      severityLabel: "[URGENT ALERT]",
      title: "Elevated Post-Meal Glucose Detected",
      message: "Continuous telemetry logged 218 mg/dL at 11:15 AM. Please perform a manual fingerstick verification and review correctional dosage guidance.",
      source: "Sensor Telemetry Rule #HIGH-210",
      isSimulated: true
    },
    reminders: [
      { id: "mr1", time: "07:30 AM", name: "Tresiba (Basal)", dose: "18 Units", taken: true, note: "Logged automatically by PenSync" },
      { id: "mr2", time: "12:00 PM", name: "Novolog (Bolus)", dose: "6 Units", taken: false, note: "Due shortly" }
    ],
    doctorAlerts: [
      {
        id: "md1",
        doctor: "Dr. Sarah Jenkins, MD",
        tag: "[URGENT CLINICAL GUIDANCE]",
        message: "If daytime glucose exceeds 200 mg/dL twice consecutively, please administer 2 units correction bolus and hydrate with 16oz water.",
        timestamp: "Today at 08:30 AM",
        severityClass: "badge-urgent"
      }
    ],
    pastMessages: [
      {
        id: "mp1",
        doctor: "Dr. Sarah Jenkins, MD",
        message: "Adjusted basal units from 16 to 18 units to manage early morning dawn phenomenon.",
        timestamp: "September 15, 2026"
      }
    ],
    reportMetrics: {
      avgGlucose: "142 mg/dL",
      hba1c: "6.7%",
      timeInRange: "74%",
      dosesLogged: "19 of 21",
      conclusion: "Your 7-day glucose shows moderate stability with 74% Time-in-Range. Isolated post-prandial spikes detected around midday. Overall basal stabilization is performing well."
    }
  }
};

class PenSyncApp {
  constructor() {
    this.patients = this.loadPatients();
    this.currentPatient = null;
    this.currentTab = "latest-glucose";

    this.initDOMElements();
    this.initEventListeners();
    this.checkSession();
  }

  loadPatients() {
    try {
      const stored = localStorage.getItem("pensync_patients");
      if (stored) {
        return JSON.parse(stored);
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

    // Reminders containers
    this.insulinRemindersList = document.getElementById("insulinRemindersList");
    this.doctorAlertsList = document.getElementById("doctorAlertsList");
    this.pastMessagesList = document.getElementById("pastMessagesList");

    // Report Elements
    this.reportConclusionText = document.getElementById("reportConclusionText");
    this.metricAvgGlucose = document.getElementById("metricAvgGlucose");
    this.metricHba1c = document.getElementById("metricHba1c");
    this.metricTir = document.getElementById("metricTir");
    this.metricDoses = document.getElementById("metricDoses");
    this.printReportBtn = document.getElementById("printReportBtn");

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
        this.showToast("Manual fingerstick logged: 118 mg/dL (In target range)", "success");
      });
    }

    // Print report
    if (this.printReportBtn) {
      this.printReportBtn.addEventListener("click", () => {
        window.print();
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
          this.showToast(`Auto-filled credentials for ${user}`, "info");
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

    // Swap SVG icon
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
    this.switchTab(this.currentTab);
  }

  checkSession() {
    const activeUser = sessionStorage.getItem("pensync_active_user");
    if (activeUser && this.patients[activeUser]) {
      this.currentPatient = this.patients[activeUser];
      this.showDashboardView();
    } else {
      this.showLoginView();
    }
  }

  handleLogin() {
    const username = this.usernameInput.value.trim().toLowerCase();
    const password = this.passwordInput.value;

    const patient = this.patients[username];
    if (patient && patient.password === password) {
      this.currentPatient = patient;
      sessionStorage.setItem("pensync_active_user", username);
      this.loginErrorAlert.style.display = "none";
      this.showToast(`Welcome back, ${patient.name}`, "success");
      this.showDashboardView();
    } else {
      this.loginErrorAlert.textContent = "Invalid username or password. Please re-check or use the demo buttons below.";
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

    // Find patient matching recovery ID
    const matchedUsername = Object.keys(this.patients).find(
      (u) => this.patients[u].recoveryId.toUpperCase() === recoveryId
    );

    if (matchedUsername) {
      this.recoveryTargetUser = matchedUsername;
      this.recoveryErrorAlert.style.display = "none";
      this.passwordResetFields.style.display = "block";
      this.newPasswordInput.focus();
      this.showToast(`Recovery ID verified for ${this.patients[matchedUsername].name}`, "info");
    } else {
      this.recoveryErrorAlert.textContent = "Recovery ID not recognized. Please check your card or test with PEN-9021.";
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

    // Update password in patient record
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
    this.showLoginView();
    this.showToast("You have been signed out safely.", "info");
  }

  renderDashboard() {
    if (!this.currentPatient) return;
    const p = this.currentPatient;

    // Header Profile info
    this.patientNameDisplay.textContent = p.name;
    this.patientAvatarDisplay.textContent = p.avatarInitial;
    this.patientMetaDisplay.innerHTML = `
      <span class="patient-meta-item"><strong>Age:</strong> ${p.age}</span>
      <span class="patient-meta-item">|</span>
      <span class="patient-meta-item"><strong>Condition:</strong> ${p.type}</span>
      <span class="patient-meta-item">|</span>
      <span class="patient-meta-item"><strong>Device:</strong> ${p.penId}</span>
    `;

    // Attention / Emergency Alert Window
    this.renderAttentionWindow();

    // Render Reminders
    this.renderReminders();

    // Render My Report data
    this.renderReport();
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
  }

  handleAttentionPrimaryAction() {
    const p = this.currentPatient;
    if (p.attentionAlert && p.attentionAlert.active) {
      // Mark scheduled dose as taken
      p.attentionAlert.active = false;
      // Mark reminder as taken
      const lunchReminder = p.reminders.find((r) => r.time.includes("12:30") || r.name.includes("Bolus"));
      if (lunchReminder) {
        lunchReminder.taken = true;
      }
      this.savePatients();
      this.renderAttentionWindow();
      this.renderReminders();
      this.showToast("Dose Confirmed & Logged to PenSync Telemetry (8 Units)", "success");
    }
  }

  switchTab(tabId) {
    this.currentTab = tabId;

    // Update nav buttons
    this.navButtons.forEach((btn) => {
      const isTarget = btn.getAttribute("data-tab") === tabId;
      btn.classList.toggle("active", isTarget);
      btn.setAttribute("aria-selected", isTarget ? "true" : "false");
    });

    // Update tab panels
    this.tabPanels.forEach((panel) => {
      const isTarget = panel.getAttribute("id") === `tab-${tabId}`;
      panel.classList.toggle("active", isTarget);
    });

    // If report tab is selected, draw charts
    if (tabId === "my-report") {
      setTimeout(() => {
        this.drawReportCharts();
      }, 50);
    }
  }

  renderReminders() {
    const p = this.currentPatient;
    if (!p) return;

    // 1. Insulin Reminders
    if (this.insulinRemindersList) {
      this.insulinRemindersList.innerHTML = p.reminders
        .map(
          (rem) => `
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
      `
        )
        .join("");

      // Bind reminder toggles
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

    // 2. Doctor Alert Messages
    if (this.doctorAlertsList) {
      this.doctorAlertsList.innerHTML = p.doctorAlerts
        .map(
          (doc) => `
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
      `
        )
        .join("");
    }

    // 3. Past Messages Archive
    if (this.pastMessagesList) {
      this.pastMessagesList.innerHTML = p.pastMessages
        .map(
          (msg) => `
        <div class="past-message-item">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.35rem;">
            <strong style="color:var(--color-primary);">${msg.doctor}</strong>
            <span style="font-size:var(--font-size-xs); color:var(--color-text-muted);">${msg.timestamp}</span>
          </div>
          <p style="margin:0; font-size:var(--font-size-sm);">${msg.message}</p>
        </div>
      `
        )
        .join("");
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
    // Canvas 1: 7-Day Glucose Trend Curve
    const trendCanvas = document.getElementById("glucoseTrendCanvas");
    if (trendCanvas) {
      this.renderTrendChart(trendCanvas);
    }

    // Canvas 2: Time-in-Range Distribution Chart
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

    // Coordinate settings
    const padLeft = 55;
    const padRight = 25;
    const padTop = 30;
    const padBottom = 40;
    const chartW = w - padLeft - padRight;
    const chartH = h - padTop - padBottom;

    // Y-Axis scale: 40 to 240 mg/dL
    const minY = 40;
    const maxY = 240;
    const getY = (val) => padTop + chartH - ((val - minY) / (maxY - minY)) * chartH;

    // 1. Target In-Range Green Band (70 - 140 mg/dL)
    const targetTop = getY(140);
    const targetBottom = getY(70);
    ctx.fillStyle = "rgba(35, 122, 87, 0.12)";
    ctx.fillRect(padLeft, targetTop, chartW, targetBottom - targetTop);

    // Target band guideline
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
    [70, 100, 140, 180, 220].forEach((val) => {
      ctx.fillText(`${val}`, padLeft - 10, getY(val) + 5);
      ctx.strokeStyle = "#E2E8F0";
      ctx.beginPath();
      ctx.moveTo(padLeft, getY(val));
      ctx.lineTo(padLeft + chartW, getY(val));
      ctx.stroke();
    });

    // 7-day readings dataset (Days: Mon - Sun)
    const dataPoints = [
      { day: "Mon", glucose: 118, insulinDose: 14 },
      { day: "Tue", glucose: 138, insulinDose: 16 },
      { day: "Wed", glucose: 122, insulinDose: 14 },
      { day: "Thu", glucose: 145, insulinDose: 18 },
      { day: "Fri", glucose: 112, insulinDose: 14 },
      { day: "Sat", glucose: 128, insulinDose: 14 },
      { day: "Sun", glucose: 120, insulinDose: 14 }
    ];

    const getX = (idx) => padLeft + (idx / (dataPoints.length - 1)) * chartW;

    // Draw Smooth Line in Deep Navy #16324F
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

    // Draw Data points and Insulin markers #5B4B8A
    dataPoints.forEach((dp, i) => {
      const x = getX(i);
      const y = getY(dp.glucose);

      // Glucose circle
      ctx.fillStyle = dp.glucose <= 140 && dp.glucose >= 70 ? "#237A57" : "#9A5B00";
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

    // Time-in-range segments
    // In Target: 82% (#237A57), Above Target: 14% (#9A5B00), Below Target: 4% (#B42318)
    const segments = [
      { label: "Target (70-140)", percent: 0.82, color: "#237A57" },
      { label: "Above (>140)", percent: 0.14, color: "#9A5B00" },
      { label: "Below (<70)", percent: 0.04, color: "#B42318" }
    ];

    let startAngle = -Math.PI / 2;

    segments.forEach((seg) => {
      const sliceAngle = seg.percent * (Math.PI * 2);
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();

      startAngle = endAngle;
    });

    // Center text
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 28px -apple-system, sans-serif";
    ctx.fillStyle = "#16324F";
    ctx.fillText("82%", centerX, centerY - 6);

    ctx.font = "14px -apple-system, sans-serif";
    ctx.fillStyle = "#334D64";
    ctx.fillText("IN TARGET", centerX, centerY + 18);
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
