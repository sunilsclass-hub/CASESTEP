import { test, expect } from '@playwright/test';

/**
 * End-to-end smoke tests against the built static site. These exercise the same
 * flows as the unit tests but in a real browser on the production artifact, so
 * they catch integration/runtime issues the jsdom tests cannot.
 */

test('homepage renders the hero and CTAs', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/CaseStep/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Clinical Reasoning/i);
  await expect(page.getByRole('link', { name: /Start Learning/i }).first()).toBeVisible();
});

test('case catalogue lists all 11 ready cases', async ({ page }) => {
  await page.goto('/cases/');
  await expect(page.getByRole('link', { name: /Start case/i })).toHaveCount(11);
});

test('Type 2 Diabetes case can be completed end to end', async ({ page }) => {
  await page.goto('/cases/type-2-diabetes-mellitus/');
  await expect(page.getByText(/Step 1 of/i)).toBeVisible();

  const correctChoices = [/Random blood glucose now/i, /Metformin, titrated with meals/i];
  let sawFeedback = false;

  for (let guard = 0; guard < 40; guard++) {
    const finish = page.getByRole('button', { name: /Finish case/i });
    if (await finish.count()) {
      await finish.click();
      break;
    }
    for (const choice of correctChoices) {
      const opt = page.getByRole('button', { name: choice });
      if (await opt.count()) {
        await opt.first().click();
        if (await page.getByText(/Good choice/i).count()) sawFeedback = true;
      }
    }
    await page.getByRole('button', { name: /^Next$/ }).click();
  }

  expect(sawFeedback).toBe(true);
  await expect(page.getByText(/Case completed/i)).toBeVisible();
});

test('SCT module can be answered and scored', async ({ page }) => {
  await page.goto('/sct/');
  const fieldsets = page.locator('fieldset');
  const count = await fieldsets.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    await fieldsets.nth(i).getByRole('button').nth(2).click();
  }
  await page.getByRole('button', { name: /Submit .* score/i }).click();
  await expect(page.getByText(/Your SCT score/i)).toBeVisible();
});

test('OSCE page renders stations with checklists', async ({ page }) => {
  await page.goto('/osce/');
  await expect(page.getByText(/Examiner checklist/i).first()).toBeVisible();
  await expect(page.getByText(/Global rating scale/i).first()).toBeVisible();
});

test('Expert Review page renders the form and consensus panel', async ({ page }) => {
  await page.goto('/expert-review/');
  await expect(page.getByText(/Case under review/i)).toBeVisible();
  await expect(page.getByText(/Consensus summary/i)).toBeVisible();
});

test('Expert Review demo submission updates the local consensus panel', async ({ page }) => {
  await page.goto('/expert-review/');
  const ratingGroups = page.locator('div.mt-2.flex.gap-1\\.5');
  const count = await ratingGroups.count();
  expect(count).toBe(7);
  for (let i = 0; i < count; i++) {
    await ratingGroups.nth(i).getByRole('button').last().click();
  }
  await page.getByRole('button', { name: /^Submit review$/i }).click();
  await expect(page.getByText(/Recorded as/i)).toBeVisible();
  await expect(page.getByText(/100% agree/i).first()).toBeVisible();
});

test('Student dashboard loads its progress view', async ({ page }) => {
  await page.goto('/dashboard/student/');
  await expect(page.getByText(/Case progress/i)).toBeVisible();
  await expect(page.getByText(/Cases completed/i)).toBeVisible();
});

test('Student dashboard never shows an indefinite loading state (production regression)', async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text());
  });
  page.on('pageerror', (e) => pageErrors.push(String(e)));

  // A cold navigation (not a client-side transition) is the scenario that
  // exposed the production bug: the server-rendered HTML must never contain
  // an un-escapable "Loading your progress…" placeholder.
  const response = await page.goto('/dashboard/student/', { waitUntil: 'domcontentloaded' });
  expect(response?.status()).toBe(200);

  // Assert immediately (before hydration necessarily completes) that the old
  // stuck-loading text is not present in the DOM at all.
  await expect(page.getByText(/Loading your progress/i)).toHaveCount(0);

  // And that meaningful content is visible once the page settles.
  await page.waitForLoadState('networkidle');
  await expect(page.getByText(/Cases completed/i)).toBeVisible();
  await expect(page.getByText(/Get started|Recently completed case/i)).toBeVisible();

  const realConsoleErrors = consoleErrors.filter((e) => !/favicon|404|Failed to load resource/i.test(e));
  expect(realConsoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});

test('Student dashboard demo-progress seeding populates recommended/recent cards', async ({ page }) => {
  await page.goto('/dashboard/student/');
  await expect(page.getByText(/No activity yet on this device/i)).toBeVisible();
  await page.getByRole('button', { name: /Load illustrative demo progress/i }).click();
  await expect(page.getByText(/Recently completed case/i)).toBeVisible();
  await expect(page.getByText(/Next recommended case/i)).toBeVisible();
});
