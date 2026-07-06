import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E configuration for CaseStep.
 *
 * Runs against the built static export (`out/`) served over a plain static
 * server, so the tests exercise the real, production artifact with no backend.
 * Build first (`npm run build`) — CI does this before `npm run test:e2e`.
 */
const PORT = 4321;

// Local override: in this dev container the pre-installed Chromium revision may
// differ from the one @playwright/test expects, so allow pointing at an existing
// binary via PW_CHROMIUM_PATH. In CI, `npx playwright install chromium` provides
// the matching browser and this stays unset.
const executablePath = process.env.PW_CHROMIUM_PATH || undefined;

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? 'line' : 'list',
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: executablePath ? { executablePath } : {},
      },
    },
  ],
  webServer: {
    command: `python3 -m http.server ${PORT} --directory out`,
    url: `http://127.0.0.1:${PORT}`,
    timeout: 60_000,
    reuseExistingServer: !process.env.CI,
  },
});
