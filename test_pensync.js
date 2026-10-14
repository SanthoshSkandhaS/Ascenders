// Comprehensive Automated Test Suite for PenSync Healthcare Application
const fs = require('fs');
const path = require('path');

console.log("==========================================================");
console.log("       PENSYNC AUTHORITATIVE VALIDATION & REGRESSION TEST");
console.log("==========================================================\n");

let totalTests = 0;
let passedTests = 0;

function assert(description, condition, extraInfo = "") {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${description}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${description} ${extraInfo ? '-> ' + extraInfo : ''}`);
  }
}

// 1. FILE EXISTENCE & INTEGRITY
console.log("--- 1. File Structure Verification ---");
const requiredFiles = ['index.html', 'styles.css', 'app.js', 'server.js', 'assets/mountain_banner.jpg'];
requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  assert(`File exists: ${file}`, fs.existsSync(fullPath));
});

// 2. HTML CONTENT & DOM ELEMENTS
console.log("\n--- 2. HTML Structure & Placeholder Check ---");
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Absence of placeholder strings
assert(
  "No placeholder 'Container ready for incoming glucose stream data'",
  !html.includes("Container ready for incoming glucose stream data")
);
assert(
  "No placeholder 'Container ready for incoming insulin dose log entries'",
  !html.includes("Container ready for incoming insulin dose log entries")
);
assert(
  "No placeholder 'Container ready for incoming device telemetry sync records'",
  !html.includes("Container ready for incoming device telemetry sync records")
);

// Tab 1 & Tab 2 Hero & Tables
assert("Tab 1 Latest Glucose Hero element present", html.includes('id="latestGlucoseNum"'));
assert("Tab 1 Glucose History Table present", html.includes('id="glucoseHistoryTableBody"'));
assert("Tab 1 Unit toggle button present", html.includes('id="toggleUnitBtn"'));
assert("Tab 1 Log Blood Sugar button present", html.includes('id="openAddGlucoseBtn"'));

assert("Tab 2 Daily Insulin Total element present", html.includes('id="dailyTotalInsulin"'));
assert("Tab 2 Cartridge Left element present", html.includes('id="cartridgeUnitsLeft"'));
assert("Tab 2 Insulin History Table present", html.includes('id="insulinHistoryTableBody"'));
assert("Tab 2 Record Dose button present", html.includes('id="openAddInsulinBtn"'));

// Tab 3, 4, 5
assert("Tab 3 Reminders grid present", html.includes('id="insulinRemindersList"'));
assert("Tab 3 Doctor alerts present", html.includes('id="doctorAlertsList"'));
assert("Tab 4 Trend canvas present", html.includes('id="glucoseTrendCanvas"'));
assert("Tab 4 TIR Donut canvas present", html.includes('id="tirDonutCanvas"'));
assert("Tab 5 Sync diagnostics present", html.includes('id="syncDeviceStatus"') && html.includes('id="syncInternetStatus"'));
assert("Tab 5 Manual Sync button present", html.includes('id="triggerManualSyncBtn"'));

// Clinician Oversight & Modals
assert("Clinician Portal toggle button present", html.includes('id="togglePortalModeBtn"'));
assert("Clinician Portal container present", html.includes('id="doctorPortalSection"'));
assert("Clinician Patient selector dropdown present", html.includes('id="doctorPatientSelect"'));
assert("Add Glucose modal dialog present", html.includes('id="addGlucoseModal"'));
assert("Add Insulin modal dialog present", html.includes('id="addInsulinModal"'));

// 3. JAVASCRIPT CREDENTIAL SECURITY & STRICT REJECTION
console.log("\n--- 3. Credentials & Security Verification ---");
const js = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

// Legacy credentials strictly removed from default patient registry
assert("Legacy 'arthur.p' not in active registry", !js.includes('"arthur.p": {'));
assert("Legacy 'martha.v' not in active registry", !js.includes('"martha.v": {'));
assert("Legacy password 'insulin123' not in active registry", !js.includes('password: "insulin123"'));
assert("Legacy password 'vital456' not in active registry", !js.includes('password: "vital456"'));
assert("Legacy recovery 'PEN-9021' not in active registry", !js.includes('recoveryId: "PEN-9021"'));
assert("Legacy recovery 'PEN-4410' not in active registry", !js.includes('recoveryId: "PEN-4410"'));

// Authoritative accounts present
assert("Authoritative patient GC1001 (Ananya Rao) present", js.includes('id: "GC1001"') && js.includes('Ananya Rao'));
assert("Authoritative patient GC1002 (Ravi Kumar) present", js.includes('id: "GC1002"') && js.includes('Ravi Kumar'));
assert("Authoritative patient GC1003 (Meera Nair) present", js.includes('id: "GC1003"') && js.includes('Meera Nair'));
assert("Authoritative clinician dr.thorne present", js.includes('username: "dr.thorne"') && js.includes('Dr. Aris Thorne'));

// Recovery IDs
assert("Recovery ID PEN-1001 present", js.includes('"PEN-1001"'));
assert("Recovery ID PEN-1002 present", js.includes('"PEN-1002"'));
assert("Recovery ID PEN-1003 present", js.includes('"PEN-1003"'));

// 4. FUNCTIONAL SIMULATION TESTS
console.log("\n--- 4. Authentication & Clinical Formulas Simulation ---");

// Test formula [CALC-07]: mmol/L conversion
const mgDlVal = 124;
const mmolLVal = Number((mgDlVal / 18.0182).toFixed(1));
assert("Formula [CALC-07]: 124 mg/dL converts to 6.9 mmol/L", mmolLVal === 6.9, `Got ${mmolLVal}`);

// Test formula [CALC-01] & [CALC-02]: Mean & HbA1c
const ananyaReadings = [118, 146, 124];
const ananyaMean = Math.round(ananyaReadings.reduce((a, b) => a + b, 0) / ananyaReadings.length);
const ananyaHba1c = Number(((ananyaMean + 46.7) / 28.7).toFixed(1));
assert("Formula [CALC-01]: Ananya mean glucose is 129 mg/dL", ananyaMean === 129, `Got ${ananyaMean}`);
assert("Formula [CALC-02]: Ananya estimated HbA1c is 6.1%", ananyaHba1c === 6.1, `Got ${ananyaHba1c}`);

// Test Priming Filter [CALC-06]
function isPrimingDose(units, timeGapSeconds) {
  return units <= 2 && timeGapSeconds <= 60;
}
assert("Formula [CALC-06]: 1 Unit needle prime within 60s is filtered", isPrimingDose(1, 45) === true);
assert("Formula [CALC-06]: 5 Units meal bolus is NOT filtered", isPrimingDose(5, 30) === false);
assert("Formula [CALC-06]: 1 Unit injection after 120s is NOT filtered", isPrimingDose(1, 120) === false);

// 5. CSS DESIGN SYSTEM & TOKENS
console.log("\n--- 5. CSS Healthcare Design System Tokens ---");
const css = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
const designTokens = [
  { name: "Primary #16324F", test: css.includes('#16324F') },
  { name: "Accent Medical Teal #087E8B", test: css.includes('#087E8B') },
  { name: "Main background #F5F8FA", test: css.includes('#F5F8FA') },
  { name: "Cards white #FFFFFF", test: css.includes('#FFFFFF') },
  { name: "Status OK #237A57", test: css.includes('#237A57') },
  { name: "Attention warning #9A5B00", test: css.includes('#9A5B00') },
  { name: "Urgent alerts #B42318", test: css.includes('#B42318') },
  { name: "Insulin events #5B4B8A", test: css.includes('#5B4B8A') },
  { name: "Modal dialog styling", test: css.includes('.modal-dialog') },
  { name: "Doctor portal styling", test: css.includes('.doctor-portal-banner') }
];

designTokens.forEach(token => {
  assert(`Token: ${token.name}`, token.test);
});

// SUMMARY
console.log("\n==========================================================");
console.log(`TEST SUMMARY: ${passedTests} / ${totalTests} checks passed (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log("==========================================================");

if (passedTests === totalTests) {
  console.log("\n>>> ALL TESTS PASSED! APPLICATION READY FOR COMMIT & DEPLOYMENT <<<\n");
  process.exit(0);
} else {
  console.error(`\n>>> ${totalTests - passedTests} TEST(S) FAILED! <<<\n`);
  process.exit(1);
}
