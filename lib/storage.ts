'use client';

/**
 * Lightweight client-side persistence for learner progress.
 *
 * This deliberately uses `localStorage` so the platform works fully offline and
 * deploys as a static site with no backend. Every read/write is guarded for SSR
 * (window may be undefined during build/prerender).
 *
 * FUTURE DB INTEGRATION:
 *   Swap these functions for authenticated calls to Supabase/Firebase, e.g.
 *     await supabase.from('progress').upsert({ user_id, case_slug, ... })
 *   Keep the same function signatures and the UI will not need to change.
 */

const KEY = 'casestep:v1';

export interface CaseProgress {
  completed: boolean;
  lastStepIndex: number;
  /** Map of decision stepId -> chosen optionId. */
  decisions: Record<string, string>;
  /** Map of reflection stepId -> free text. */
  reflections: Record<string, string>;
  updatedAt: number;
}

export interface SCTResult {
  moduleId: string;
  /** itemId -> chosen value (-2..2). */
  answers: Record<string, number>;
  score: number;
  maxScore: number;
  updatedAt: number;
}

export interface OSCEResult {
  stationId: string;
  /** checklist itemId -> achieved (boolean). */
  checked: Record<string, boolean>;
  globalRating: number;
  score: number;
  maxScore: number;
  updatedAt: number;
}

export interface Store {
  cases: Record<string, CaseProgress>;
  sct: Record<string, SCTResult>;
  osce: Record<string, OSCEResult>;
}

const empty: Store = { cases: {}, sct: {}, osce: {} };

/**
 * Optional cloud-sync hook. The auth layer (lib/auth.tsx) registers a handler
 * here when a user signs in; every local write is then mirrored to Supabase.
 * When no handler is registered, the app is purely local — this keeps storage
 * decoupled from Supabase (no import cycle) and offline-first.
 */
let syncHandler: ((store: Store) => void) | null = null;

export function setSyncHandler(fn: ((store: Store) => void) | null) {
  syncHandler = fn;
}

/** Overwrite the local store (e.g. after pulling/merging from the cloud). */
export function hydrateStore(store: Store) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(store));
    window.dispatchEvent(new Event('casestep:update'));
  } catch {
    /* ignore */
  }
}

export function readStore(): Store {
  if (typeof window === 'undefined') return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...empty };
    return { ...empty, ...(JSON.parse(raw) as Store) };
  } catch {
    return { ...empty };
  }
}

export function writeStore(store: Store) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(store));
    // Notify same-tab listeners (storage event only fires cross-tab).
    window.dispatchEvent(new Event('casestep:update'));
    // Mirror to the cloud if a signed-in user has registered a sync handler.
    syncHandler?.(store);
  } catch {
    /* storage may be full or blocked; fail silently for a demo build */
  }
}

export function saveCaseProgress(slug: string, progress: Partial<CaseProgress>) {
  const store = readStore();
  const prev = store.cases[slug] ?? {
    completed: false,
    lastStepIndex: 0,
    decisions: {},
    reflections: {},
    updatedAt: Date.now(),
  };
  store.cases[slug] = { ...prev, ...progress, updatedAt: Date.now() };
  writeStore(store);
}

export function clearCaseProgress(slug: string) {
  const store = readStore();
  delete store.cases[slug];
  writeStore(store);
}

export function saveSCTResult(result: SCTResult) {
  const store = readStore();
  store.sct[result.moduleId] = result;
  writeStore(store);
}

export function saveOSCEResult(result: OSCEResult) {
  const store = readStore();
  store.osce[result.stationId] = result;
  writeStore(store);
}

export function resetAll() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event('casestep:update'));
}
