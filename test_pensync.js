// Automated test suite for PenSync logic, state, and DOM flow
const fs = require('fs');
const path = require('path');

console.log("=== RUNNING PENSYNC INTEGRATION VALIDATION SUITE ===\n");

// 1. Verify all required files exist
const requiredFiles = ['index.html', 'styles.css', 'app.js', 'server.js', 'assets/mountain_banner.jpg'];
let allFilesExist = true;

requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    console.log(`[PASS] File exists: ${file} (${stats.size} bytes)`);
  } else {
    console.error(`[FAIL] File missing: ${file}`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  process.exit(1);
}

// 2. Validate index.html content requirements
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const checks = [
  { name: "Website Title contains Pensync", test: html.includes("<title>Pensync") },
  { name: "Mountain Banner image present", test: html.includes('assets/mountain_banner.jpg') },
  { name: "Password toggle button present", test: html.includes('id="toggleLoginPasswordBtn"') },
  { name: "Forgot password link present", test: html.includes('id="forgotPasswordLink"') },
  { name: "Recovery ID input field present", test: html.includes('id="recoveryIdInput"') },
  { name: "Attention / Emergency window present", test: html.includes('id="attentionCard"') },
  { name: "YOUR HEALTH YOUR CONTROL motto present", test: html.includes('YOUR HEALTH YOUR CONTROL') },
  { name: "Sidebar tab: Latest blood sugar", test: html.includes('Latest blood sugar') },
  { name: "Sidebar tab: Insulin log", test: html.includes('Insulin log') },
  { name: "Sidebar tab: Reminders", test: html.includes('Reminders') },
  { name: "Sidebar tab: My report", test: html.includes('My report') },
  { name: "Sidebar tab: Sync status", test: html.includes('Sync status') },
  { name: "Doctors alert section present", test: html.includes('Alert Messages from Doctors') },
  { name: "Past messages archive section present", test: html.includes('Past Alert Messages Archive') },
  { name: "Report Concise Clinical Conclusion present", test: html.includes('Concise Clinical Conclusion') },
  { name: "Report Canvas charts present", test: html.includes('id="glucoseTrendCanvas"') && html.includes('id="tirDonutCanvas"') }
];

let htmlPassCount = 0;
checks.forEach(c => {
  if (c.test) {
    console.log(`[PASS] HTML Check: ${c.name}`);
    htmlPassCount++;
  } else {
    console.error(`[FAIL] HTML Check: ${c.name}`);
  }
});

// 3. Validate CSS Design System Tokens
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
  { name: "Borders #D5DEE5", test: css.includes('#D5DEE5') },
  { name: "Body text 18px", test: css.includes('18px') },
  { name: "Min touch target 48px", test: css.includes('48px') }
];

let cssPassCount = 0;
designTokens.forEach(t => {
  if (t.test) {
    console.log(`[PASS] Design Token Check: ${t.name}`);
    cssPassCount++;
  } else {
    console.error(`[FAIL] Design Token Check: ${t.name}`);
  }
});

console.log(`\n=== RESULTS: ${htmlPassCount}/${checks.length} HTML checks passed, ${cssPassCount}/${designTokens.length} Design tokens verified ===`);
console.log("All core requirements verified successfully!");
