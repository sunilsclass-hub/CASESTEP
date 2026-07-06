'use client';

import { getSupabase } from './supabase';
import { readStore, type Store } from './storage';

/**
 * Cloud persistence of a user's progress `Store` as a single JSON blob in the
 * `user_progress` table (one row per user, protected by RLS). This keeps the
 * existing synchronous localStorage components working unchanged while adding
 * multi-device sync: localStorage is the fast local cache, Supabase is the
 * durable source of truth.
 *
 * For a production-scale analytics backend you would additionally normalise
 * results into per-result tables (see supabase/schema.sql for a starter) — this
 * blob approach is the pragmatic first step and matches the demo data model.
 */

const TABLE = 'user_progress';

/** Newest-wins merge of two stores, per entry (by `updatedAt`). */
export function mergeStores(a: Store, b: Store): Store {
  const merged: Store = {
    cases: { ...a.cases },
    sct: { ...a.sct },
    osce: { ...a.osce },
    expertReviews: [...a.expertReviews],
  };
  for (const [k, v] of Object.entries(b.cases)) {
    if (!merged.cases[k] || v.updatedAt > merged.cases[k].updatedAt) merged.cases[k] = v;
  }
  for (const [k, v] of Object.entries(b.sct)) {
    if (!merged.sct[k] || v.updatedAt > merged.sct[k].updatedAt) merged.sct[k] = v;
  }
  for (const [k, v] of Object.entries(b.osce)) {
    if (!merged.osce[k] || v.updatedAt > merged.osce[k].updatedAt) merged.osce[k] = v;
  }
  // Expert reviews are an append-only demo log — union by id rather than overwrite.
  const knownIds = new Set(merged.expertReviews.map((r) => r.id));
  for (const r of b.expertReviews) {
    if (!knownIds.has(r.id)) {
      merged.expertReviews.push(r);
      knownIds.add(r.id);
    }
  }
  return merged;
}

/** Pull the cloud store for a user, or null if none / not configured. */
export async function pullCloudStore(userId: string): Promise<Store | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from(TABLE)
    .select('data')
    .eq('user_id', userId)
    .maybeSingle();
  if (error || !data) return null;
  return data.data as Store;
}

/** Push the given store to the cloud for a user (upsert). */
export async function pushCloudStore(userId: string, store: Store): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  await supabase
    .from(TABLE)
    .upsert({ user_id: userId, data: store, updated_at: new Date().toISOString() });
}

/**
 * On sign-in: merge the local store with the cloud store (newest wins) and
 * return the merged result so the caller can hydrate localStorage and push the
 * reconciled store back.
 */
export async function reconcileOnLogin(userId: string): Promise<Store> {
  const local = readStore();
  const cloud = await pullCloudStore(userId);
  const merged = cloud ? mergeStores(local, cloud) : local;
  await pushCloudStore(userId, merged);
  return merged;
}
