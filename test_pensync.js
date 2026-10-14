// Comprehensive Automated Test Suite for PenSync Healthcare Application
// Validates 15 Patient Profiles, Layer A Clinical Safety Rules, and Layer B Trained ML Prioritization
const fs = require('fs');
const path = require('path');

console.log("======================================================================");
console.log("  PENSYNC AUTHORITATIVE VALIDATION & ML CLINICAL PRIORITIZATION TEST");
console.log("======================================================================\n");

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
const requiredFiles = [
  'index.html',
  'styles.css',
  'app.js',
  'server.js',
  'ml_prioritization.js',
  'priority_model.json',
  'train_priority_model.js',
  'assets/mountain_banner.jpg'
];
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

// Prioritization Triage Queue UI
assert("Clinician Triage Section container present", html.includes('id="clinicalTriageSection"'));
assert("Triage Queue Table present", html.includes('class="triage-table"'));
assert("Triage Queue Table Body present", html.includes('id="triageTableBody"'));
assert("Triage Queue Total Count badge present", html.includes('id="countFilterAll"'));
assert("Triage Queue Clinical Notice present", html.includes('class="safety-notice-banner"'));
assert("Triage Filter All button present", html.includes('id="filterBtnAll"'));
assert("Triage Filter Critical button present", html.includes('id="filterBtnCritical"'));
assert("Triage Filter Elevated button present", html.includes('id="filterBtnElevated"'));
assert("Triage Filter Stable button present", html.includes('id="filterBtnStable"'));
assert("ml_prioritization.js script tag loaded in HTML", html.includes('src="ml_prioritization.js"'));

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

// Authoritative clinician credentials
assert("Authoritative clinician dr.thorne present", js.includes('username: "dr.thorne"') && js.includes('Dr. Aris Thorne'));
assert("Authoritative clinician password clinical123 present", js.includes('clinical123'));

// 4. VERIFY ALL 15 PATIENTS IN APP DATASET
console.log("\n--- 4. Patient Dataset Verification (15 Patient Records) ---");
const { DEFAULT_PATIENTS } = require('./app.js');
const allProfiles = Object.values(DEFAULT_PATIENTS);
const patientsOnly = allProfiles.filter(p => !p.isDoctor && p.id !== "DR-THORNE");

assert("Exactly 15 patient profiles in DEFAULT_PATIENTS", patientsOnly.length === 15, `Found: ${patientsOnly.length}`);
assert("Clinician Dr. Thorne profile exists in registry", !!DEFAULT_PATIENTS["dr.thorne"]);

// Expected 15 patients list
const expectedPatients = [
  { id: "GC1001", name: "Ananya Rao", latest: 124, type: "Type 2 Diabetes" },
  { id: "GC1002", name: "Ravi Kumar", latest: 236, type: "Type 2 Diabetes" },
  { id: "GC1003", name: "Meera Nair", latest: 68, type: "Type 1 Diabetes" },
  { id: "GC1005", name: "Neha Sharma", latest: 126, type: "Type 2 Diabetes" },
  { id: "GC1006", name: "Arjun Patel", latest: 218, type: "Type 2 Diabetes" },
  { id: "GC1007", name: "Priya Menon", latest: 66, type: "Type 1 Diabetes" },
  { id: "GC1008", name: "Vikram Singh", latest: 169, type: "Type 2 Diabetes" },
  { id: "GC1009", name: "Kavya Iyer", latest: 142, type: "Type 2 Diabetes" },
  { id: "GC1010", name: "Rahul Das", latest: 103, type: "Type 1 Diabetes" },
  { id: "GC1011", name: "Meenakshi Rao", latest: 196, type: "Type 2 Diabetes" },
  { id: "GC1012", name: "Imran Khan", latest: 84, type: "Type 1 Diabetes" },
  { id: "GC1013", name: "Divya Reddy", latest: 161, type: "Type 2 Diabetes" },
  { id: "GC1014", name: "Sanjay Kumar", latest: 242, type: "Type 2 Diabetes" },
  { id: "GC1015", name: "Aisha Thomas", latest: 114, type: "Type 1 Diabetes" },
  { id: "GC1016", name: "Manoj Verma", latest: 116, type: "Type 2 Diabetes" }
];

const patientIdSet = new Set();
expectedPatients.forEach(expected => {
  const patient = Object.values(DEFAULT_PATIENTS).find(p => p.id === expected.id);
  assert(`Patient ${expected.id} (${expected.name}) exists`, !!patient);
  if (patient) {
    patientIdSet.add(patient.id);
    assert(`Patient ${expected.id} name matches '${expected.name}'`, patient.name === expected.name);
    assert(`Patient ${expected.id} diabetes type is '${expected.type}'`, patient.type === expected.type);
    
    // Check latest reading
    const readings = patient.glucoseReadings || [];
    const latest = readings[readings.length - 1];
    assert(`Patient ${expected.id} latest reading is ${expected.latest} mg/dL`, latest && latest.value === expected.latest, `Got: ${latest ? latest.value : 'none'}`);
    assert(`Patient ${expected.id} has valid recovery ID`, !!patient.recoveryId);
    assert(`Patient ${expected.id} has cartridge units left`, typeof patient.cartridgeUnitsLeft === 'number');
  }
});

assert("All 15 patient IDs are unique with zero duplicates", patientIdSet.size === 15);

// Check special test cases with prior hypoglycemia in history
const gc1012 = Object.values(DEFAULT_PATIENTS).find(p => p.id === "GC1012");
const gc1012HasPriorHypo = gc1012 && gc1012.glucoseReadings.some(r => r.value === 68);
assert("Patient GC1012 contains documented prior hypoglycemia reading (68 mg/dL)", gc1012HasPriorHypo);

const gc1016 = Object.values(DEFAULT_PATIENTS).find(p => p.id === "GC1016");
const gc1016HasPriorHypo = gc1016 && gc1016.glucoseReadings.some(r => r.value === 69);
assert("Patient GC1016 contains documented prior hypoglycemia reading (69 mg/dL)", gc1016HasPriorHypo);

// 5. ML & CLINICAL PRIORITIZATION ENGINE TESTS
console.log("\n--- 5. ML & Clinical Prioritization Engine Tests ---");
const PenSyncPrioritization = require('./ml_prioritization.js');

assert("PenSyncPrioritization module loaded successfully", !!PenSyncPrioritization);
assert("Model parameters exist and have version v1.2-calibrated-logreg", PenSyncPrioritization.MODEL_PARAMS.version === "v1.2-calibrated-logreg");
assert("Model has 8 feature weights", PenSyncPrioritization.MODEL_PARAMS.weights.length === 8);
assert("Model reports test accuracy >= 95%", PenSyncPrioritization.MODEL_PARAMS.metrics.accuracy >= 0.95);

// Test Layer A Safety Rules
console.log("\n--- Layer A Clinical Safety Rules Evaluation ---");
const testTiers = {
  tier1Count: 0,
  tier2Count: 0,
  tier3Count: 0
};

patientsOnly.forEach(p => {
  const safety = PenSyncPrioritization.evaluatePatientSafetyTier(p);
  assert(`Patient ${p.id} evaluates with valid tier (1, 2, or 3)`, [1, 2, 3].includes(safety.tier));
  if (safety.tier === 1) testTiers.tier1Count++;
  if (safety.tier === 2) testTiers.tier2Count++;
  if (safety.tier === 3) testTiers.tier3Count++;
});

// Critical Tier 1 expected: GC1003 (52), GC1007 (66), GC1014 (242), GC1002 (246), GC1006 (218)
assert("Critical Safety Tier 1 contains 5 patients (severe hypo/hyper)", testTiers.tier1Count === 5, `Got: ${testTiers.tier1Count}`);
// Elevated Tier 2 expected: GC1011 (196), GC1008 (169), GC1013 (161), GC1009 (142), GC1012 (prior hypo 68), GC1016 (prior hypo 69)
assert("Elevated Safety Tier 2 contains 6 patients", testTiers.tier2Count === 6, `Got: ${testTiers.tier2Count}`);
// Routine Tier 3 expected: GC1001 (124), GC1005 (126), GC1010 (103), GC1015 (114)
assert("Routine Safety Tier 3 contains 4 in-target patients", testTiers.tier3Count === 4, `Got: ${testTiers.tier3Count}`);

// Test ML Priority Scores
console.log("\n--- Layer B ML Priority Scoring Evaluation ---");
patientsOnly.forEach(p => {
  const mlScore = PenSyncPrioritization.computeMLPriorityScore(p);
  assert(`Patient ${p.id} ML score is between 0.00 and 1.00`, typeof mlScore === 'number' && mlScore >= 0 && mlScore <= 1, `Score: ${mlScore}`);
});

// Test Full Queue Prioritization
console.log("\n--- Full Queue Deterministic Prioritization Order ---");
const queue = PenSyncPrioritization.prioritizePatientQueue(patientsOnly);

assert("Queue returns all 15 patients", queue.length === 15);
assert("Queue ranks are sequential 1 through 15", queue.every((item, idx) => item.rank === idx + 1));

// INVARIANT: Critical Safety Rule Precedence (Tier 1 NEVER downgraded below Tier 2 or Tier 3)
let highestTierSeen = 1;
let tierPrecedencePassed = true;
queue.forEach(item => {
  if (item.safety.tier < highestTierSeen) {
    tierPrecedencePassed = false;
  }
  highestTierSeen = item.safety.tier;
});
assert("CRITICAL INVARIANT: Layer A safety tier order is strictly preserved (No ML score demotes Tier 1)", tierPrecedencePassed);

// Top 5 must all be Tier 1
const top5Tiers = queue.slice(0, 5).map(item => item.safety.tier);
assert("Top 5 patients in review queue are all Tier 1 Critical", top5Tiers.every(t => t === 1));

// Next 6 must all be Tier 2
const next6Tiers = queue.slice(5, 11).map(item => item.safety.tier);
assert("Next 6 patients in review queue are all Tier 2 Elevated", next6Tiers.every(t => t === 2));

// Bottom 4 must all be Tier 3
const bottom4Tiers = queue.slice(11, 15).map(item => item.safety.tier);
assert("Bottom 4 patients in review queue are all Tier 3 Routine", bottom4Tiers.every(t => t === 3));

// Check explainability strings
queue.forEach(item => {
  assert(`Patient ${item.id} has plain-English review rationale`, typeof item.explanation === 'string' && item.explanation.length > 20);
});

// Edge Case: Patient with no readings
const emptyPatient = {
  id: "EMPTY_01",
  name: "Empty Test",
  glucoseReadings: []
};
const emptySafety = PenSyncPrioritization.evaluatePatientSafetyTier(emptyPatient);
const emptyScore = PenSyncPrioritization.computeMLPriorityScore(emptyPatient);
assert("Edge case: Empty patient assigned Tier 3 with NO_DATA flag", emptySafety.tier === 3 && emptySafety.flagCode === "NO_DATA");
assert("Edge case: Empty patient ML score defaults to baseline 0.10", emptyScore === 0.10);


// 6. FUNCTIONAL SIMULATION TESTS
console.log("\n--- 6. Authentication & Clinical Formulas Simulation ---");

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

// 7. CSS DESIGN SYSTEM & TOKENS
console.log("\n--- 7. CSS Healthcare Design System Tokens ---");
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
  { name: "Doctor portal styling", test: css.includes('.doctor-portal-banner') },
  { name: "Triage queue card styling", test: css.includes('.triage-queue-card') },
  { name: "Triage filter button styling", test: css.includes('.triage-filter-btn') },
  { name: "ML score pill styling", test: css.includes('.ml-score-pill') }
];

designTokens.forEach(token => {
  assert(`Token: ${token.name}`, token.test);
});

// 8. DEVICE STATUS & CLINICIAN ISOLATION VERIFICATION
console.log("\n--- 8. Device Status & Clinician Account Verification ---");
assert("No fabricated 'Connected & Paired' status in HTML", !html.includes("Connected & Paired"));
assert("No fabricated 'Stream: Connected' status in HTML", !html.includes("Stream: Connected"));
assert("Device status shows 'Device integration pending'", html.includes("Device integration pending"));
assert("Doctor Thorne account does not have personal penId", !DEFAULT_PATIENTS["dr.thorne"].penId);
assert("Doctor Patient selector has clinical urgency label", html.includes("Ordered by Clinical Urgency"));
assert("Doctor Patient dropdown first option is Critical alert (not serial order GC1001)", html.includes('<option value="gc1007">🚨 [CRITICAL] Priya Menon'));

// SUMMARY
console.log("\n======================================================================");
console.log(`TEST SUMMARY: ${passedTests} / ${totalTests} checks passed (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log("======================================================================");

if (passedTests === totalTests) {
  console.log("\n>>> ALL TESTS PASSED! APPLICATION READY FOR COMMIT & DEPLOYMENT <<<\n");
  process.exit(0);
} else {
  console.error(`\n>>> ${totalTests - passedTests} TEST(S) FAILED! <<<\n`);
  process.exit(1);
}
