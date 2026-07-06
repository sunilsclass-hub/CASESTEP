import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// jsdom does not implement scrollTo; CasePlayer/SCTPlayer call it on navigation.
Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });

// Start every test from a clean localStorage so progress state never leaks.
afterEach(() => {
  cleanup();
  window.localStorage.clear();
});
