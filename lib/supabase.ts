'use client';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Optional Supabase client.
 *
 * CaseStep is designed to run with OR without a backend:
 *   - If NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set,
 *     `getSupabase()` returns a real client and the app enables cloud accounts
 *     + multi-device sync (see lib/auth.tsx and lib/sync.ts).
 *   - If they are absent (the default demo build), `getSupabase()` returns null
 *     and everything falls back to localStorage — no errors, no network.
 *
 * The anon key is a public, browser-safe value; data is protected by row-level
 * security policies defined in supabase/schema.sql.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (typeof window === 'undefined') return null; // client-side only (static export)
  if (!client) {
    client = createClient(url as string, anonKey as string, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return client;
}
