'use client';

import { getSupabase } from './supabase';

/**
 * Expert (Delphi) review persistence.
 *
 * Writes to the `expert_reviews` table defined in supabase/schema.sql. Row-level
 * security requires an authenticated expert whose `auth.uid()` matches
 * `expert_id`, so a signed-in session is mandatory to submit. When Supabase is
 * not configured the UI falls back to a local-only acknowledgement.
 */

export interface ExpertReviewInput {
  caseSlug: string;
  relevance: number;
  validity: number;
  feasibility: number;
  checklist: Record<string, boolean>;
  comments: string;
  round?: number;
}

export interface ExpertReviewRow extends ExpertReviewInput {
  id: string;
  created_at: string;
}

const TABLE = 'expert_reviews';

/** Insert a review. Returns { error } on failure, or the created row. */
export async function submitExpertReview(
  expertId: string,
  input: ExpertReviewInput,
): Promise<{ error?: string; row?: ExpertReviewRow }> {
  const supabase = getSupabase();
  if (!supabase) return { error: 'Backend not configured.' };
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      expert_id: expertId,
      case_slug: input.caseSlug,
      relevance: input.relevance,
      validity: input.validity,
      feasibility: input.feasibility,
      checklist: input.checklist,
      comments: input.comments || null,
      round: input.round ?? 1,
    })
    .select()
    .single();
  if (error) return { error: error.message };
  return { row: data as unknown as ExpertReviewRow };
}

export interface ConsensusRow {
  dimension: 'relevance' | 'validity' | 'feasibility';
  n: number;
  median: number;
  q1: number;
  q3: number;
  pct_agree: number;
}

/**
 * Panel-wide Delphi consensus for a case. Calls the SECURITY DEFINER RPC
 * `expert_review_consensus` (see supabase/schema.sql), which returns only
 * aggregates — never individual experts' rows — so it is safe under RLS.
 */
export async function getConsensus(caseSlug: string): Promise<ConsensusRow[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase.rpc('expert_review_consensus', {
    p_case_slug: caseSlug,
  });
  if (error || !data) return [];
  return data as ConsensusRow[];
}

/** Fetch the signed-in expert's own past reviews (RLS restricts to their rows). */
export async function getMyReviews(): Promise<ExpertReviewRow[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data as unknown as ExpertReviewRow[];
}
