'use client';

import { useEffect, useState } from 'react';
import { readStore, emptyStore, type Store } from './storage';

/**
 * React hook that returns the current progress store and re-renders whenever it
 * changes (in this tab via a custom event, or in other tabs via `storage`).
 *
 * Initial value: an empty (but fully-shaped, never `null`) store — identical
 * on the server-rendered markup and the client's first paint, so there is no
 * server/client hydration mismatch to recover from (calling `readStore()`
 * directly in the initializer would differ between server, where
 * `localStorage` never exists, and the client, where it may already hold
 * data — producing exactly that mismatch). The real, localStorage-derived
 * store is applied via the effect below immediately after mount.
 *
 * Consuming components must therefore treat the empty store as ordinary,
 * renderable content (e.g. a "get started" prompt) rather than a "loading"
 * placeholder — there is no loading state here, and no code path that can get
 * stuck waiting for one. A previous version of this hook started at `null`
 * and depended entirely on this effect to ever produce real content; if
 * hydration for a given page was ever interrupted, nothing else could replace
 * that placeholder, which is exactly what caused the Student Dashboard to
 * freeze on "Loading your progress…" in production.
 */
export function useStore(): Store {
  const [store, setStore] = useState<Store>(emptyStore);

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
