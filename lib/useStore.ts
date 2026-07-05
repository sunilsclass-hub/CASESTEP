'use client';

import { useEffect, useState } from 'react';
import { readStore, type Store } from './storage';

/**
 * React hook that returns the current progress store and re-renders whenever it
 * changes (in this tab via a custom event, or in other tabs via `storage`).
 * Returns `null` until mounted to avoid SSR/CSR hydration mismatches.
 */
export function useStore(): Store | null {
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    const sync = () => setStore(readStore());
    sync();
    window.addEventListener('casestep:update', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('casestep:update', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return store;
}
