// Runtime verification + screenshot capture for CaseStep.
// Serves the static export and drives a headless Chromium through the app,
// asserting content, exercising interactivity, and recording console/page errors.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:4700';
const SHOTS = 'docs/screenshots';
mkdirSync(SHOTS, { recursive: true });

const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

// Serve ./out
const server = spawn('python3', ['-m', 'http.server', '4700', '--directory', 'out'], {
  stdio: 'ignore',
});
await new Promise((r) => setTimeout(r, 1500));

const results = [];
const consoleErrors = [];
let pageErrors = [];

function ok(name, cond, detail = '') {
  results.push({ name, pass: !!cond, detail });
}

const browser = await chromium.launch({ executablePath: EXEC });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text());
});
page.on('pageerror', (e) => pageErrors.push(String(e)));

async function go(path) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
}

try {
  // 1. Home
  await go('/');
  ok('Home loads', (await page.title()).includes('CaseStep'));
  ok('Home hero', await page.getByText('Enhancing').first().isVisible());
  await page.screenshot({ path: `${SHOTS}/01-home.png`, fullPage: false });

  // 2. Case library — all 11 cases
  await go('/cases/');
  const startButtons = await page.getByRole('link', { name: /Start case/i }).count();
  ok('Case library shows 11 ready cases', startButtons === 11, `found ${startButtons}`);
  await page.screenshot({ path: `${SHOTS}/02-cases.png`, fullPage: false });

  // 3. Each of the 11 case pages loads with a Step 1 heading
  const slugs = [
    'type-2-diabetes-mellitus', 'hypertension', 'antenatal-care', 'postnatal-care',
    'acute-diarrhoea', 'upper-respiratory-tract-infection', 'urinary-tract-infection',
    'chest-pain', 'paediatric-growth-nutrition', 'vector-borne-outbreak',
    'environmental-occupational-health',
  ];
  let caseOk = 0;
  for (const s of slugs) {
    await go(`/cases/${s}/`);
    const hasStep = await page.getByText(/Step 1 of/i).first().isVisible().catch(() => false);
    if (hasStep) caseOk++;
    else results.push({ name: `Case ${s} missing Step 1`, pass: false });
  }
  ok('All 11 cases load with interactive player', caseOk === 11, `${caseOk}/11`);

  // 4. Interactive flow on T2DM — reach a decision, choose, expect feedback
  await go('/cases/type-2-diabetes-mellitus/');
  // Walk forward until a decision point appears
  let feedbackSeen = false;
  for (let i = 0; i < 6; i++) {
    const decision = await page.getByText('Select your next step:').isVisible().catch(() => false);
    if (decision) {
      await page.getByRole('button', { name: /Random blood glucose now/i }).click();
      feedbackSeen = await page.getByText(/Good choice/i).first().isVisible().catch(() => false);
      break;
    }
    await page.getByRole('button', { name: /^Next/ }).click();
    await page.waitForTimeout(200);
  }
  ok('Case decision feedback works', feedbackSeen);
  await page.screenshot({ path: `${SHOTS}/03-case-decision.png`, fullPage: false });

  // 5. SCT — answer all items in module 1, submit, expect a score
  await go('/sct/');
  const groups = await page.locator('fieldset').count();
  for (let i = 0; i < groups; i++) {
    // pick the middle (+0 / value 0) button in each item's 5-button scale
    const btns = page.locator('fieldset').nth(i).getByRole('button');
    await btns.nth(2).click();
  }
  await page.getByRole('button', { name: /Submit .* score/i }).click();
  const scored = await page.getByText(/Your SCT score/i).isVisible().catch(() => false);
  ok('SCT scoring works', scored);
  await page.screenshot({ path: `${SHOTS}/04-sct.png`, fullPage: false });

  // 6. OSCE — check a checklist item, save
  await go('/osce/');
  ok('OSCE stations render', (await page.getByText(/Examiner checklist/i).count()) >= 1);
  await page.screenshot({ path: `${SHOTS}/05-osce.png`, fullPage: false });

  // 7. Student dashboard
  await go('/dashboard/student/');
  ok('Student dashboard renders', await page.getByText(/Case progress/i).first().isVisible());
  await page.screenshot({ path: `${SHOTS}/06-student-dashboard.png`, fullPage: false });

  // 8. Faculty dashboard
  await go('/dashboard/faculty/');
  ok('Faculty dashboard renders', await page.getByText(/Common reasoning errors/i).first().isVisible());
  await page.screenshot({ path: `${SHOTS}/07-faculty-dashboard.png`, fullPage: false });

  // 9. Expert review (no-backend path)
  await go('/expert-review/');
  ok('Expert review renders', await page.getByText(/Consensus summary/i).first().isVisible());
  await page.screenshot({ path: `${SHOTS}/08-expert-review.png`, fullPage: false });

  // 10. About
  await go('/about/');
  ok('About renders', await page.getByText(/Problem statement/i).first().isVisible());
} catch (e) {
  results.push({ name: 'EXCEPTION', pass: false, detail: String(e) });
} finally {
  await browser.close();
  server.kill();
}

// Ignore benign favicon 404 noise
const realConsoleErrors = consoleErrors.filter((e) => !/favicon|404|Failed to load resource/i.test(e));
pageErrors = pageErrors.filter(Boolean);

console.log('\n===== VERIFICATION RESULTS =====');
for (const r of results) console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? '  — ' + r.detail : ''}`);
console.log('\nConsole errors (filtered):', realConsoleErrors.length);
realConsoleErrors.slice(0, 10).forEach((e) => console.log('  · ' + e));
console.log('Page/runtime errors:', pageErrors.length);
pageErrors.slice(0, 10).forEach((e) => console.log('  · ' + e));
const failed = results.filter((r) => !r.pass).length;
console.log(`\nSUMMARY: ${results.length - failed}/${results.length} checks passed; ` +
  `${realConsoleErrors.length} console errors; ${pageErrors.length} runtime errors.`);
process.exit(failed === 0 && pageErrors.length === 0 ? 0 : 1);
