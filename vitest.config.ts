import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

/**
 * Vitest configuration for CaseStep component/unit tests.
 *
 * Tests run in jsdom (no browser) so the `npm test` step stays fast and stable
 * as the CI quality gate. `next/link` and `next/navigation` are aliased to
 * lightweight stubs (tests/mocks) so client components render without an app
 * router. End-to-end browser flows live separately under tests/e2e (Playwright).
 */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/unit/**/*.test.{ts,tsx}'],
    css: false,
    restoreMocks: true,
  },
  resolve: {
    alias: [
      { find: 'next/link', replacement: resolve(__dirname, 'tests/mocks/next-link.tsx') },
      { find: 'next/navigation', replacement: resolve(__dirname, 'tests/mocks/next-navigation.ts') },
      { find: '@', replacement: resolve(__dirname, '.') },
    ],
  },
});
