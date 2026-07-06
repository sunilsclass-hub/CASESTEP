'use client';

import { getSupabase } from './supabase';
import {
  saveLocalExpertReview,
  getLocalExpertReviews,
  clearLocalExpertReviews,
  type ExpertReviewLocal,
} from './storage';

/**
 * Expert (Delphi) review persistence — a local-first design.
 *
 * Every submission is always saved locally (`lib/storage.ts`), so the Expert
 * Review module works as a complete demo with zero backend — this is the
 * primary path on a no-database deployment. When Supabase is additionally
 * configured and the reviewer is signed in, the same submission is ALSO
 * written to the `expert_reviews` table (see supabase/schema.sql) for durable,
 * multi-device, RLS-protected storage. Consensus (median/IQR/% agreement) is
 * computed the same way in both places — locally in JS here, and via the
 * `expert_review_consensus` SQL function for the cloud path.
 */

/** The seven Delphi rating dimensions used throughout the review form. */
export const reviewDimensions = [
  { key: 'relevance', label: 'Relevance', help: 'Is the case relevant to NMC CBME competencies and community practice?' },
  { key: 'validity', label: 'Content validity', help: 'Is the clinical content accurate, current, and complete?' },
  { key: 'feasibility', label: 'Feasibility', help: 'Is the case feasible to implement in the UG posting?' },
  { key: 'cbmeAlignment', label: 'Alignment with NMC CBME', help: 'Does the case map clearly to a stated competency and assessment method?' },
  { key: 'reasoningAuthenticity', label: 'Authenticity of clinical reasoning', help: 'Do the decision points reflect genuine diagnostic/management uncertainty?' },
  { key: 'feedbackQuality', label: 'Quality of feedback', help: 'Is the formative feedback after each decision clear, correct, and constructive?' },
  { key: 'communityIntegration', label: 'Community / public-health integration', help: 'Is the population/public-health lens well integrated, not bolted on?' },
] as const;

export type ReviewDimensionKey = (typeof reviewDimensions)[number]['key'];

/** camelCase form-state key -> snake_case Supabase column name. */
const dbColumn: Record<ReviewDimensionKey, string> = {
  relevance: 'relevance',
  validity: 'validity',
  feasibility: 'feasibility',
  cbmeAlignment: 'cbme_alignment',
  reasoningAuthenticity: 'reasoning_authenticity',
  feedbackQuality: 'feedback_quality',
  communityIntegration: 'community_integration',
};

export interface ExpertReviewInput {
  caseSlug: string;
  reviewerLabel: string;
  ratings: Record<ReviewDimensionKey, number>;
  checklist: Record<string, boolean>;
  comments: string;
  round?: number;
}

export interface ExpertReviewRow {
  id: string;
  case_slug: string;
  created_at: string;
  [column: string]: unknown;
}

const TABLE = 'expert_reviews';

/**
 * Submit a review. Always saves locally; additionally writes to Supabase when
 * configured and signed in. Returns which paths succeeded so the UI can show
 * an accurate confirmation.
 */
export async function submitExpertReview(
  input: ExpertReviewInput,
  expertId?: string,
): Promise<{ local: ExpertReviewLocal; cloud: boolean; cloudError?: string }> {
  const local = saveLocalExpertReview({
    caseSlug: input.caseSlug,
    reviewerLabel: input.reviewerLabel,
    ratings: input.ratings,
    checklist: input.checklist,
    comments: input.comments,
    round: input.round ?? 1,
  });

  const supabase = getSupabase();
  if (!supabase || !expertId) return { local, cloud: false };

  const row: Record<string, unknown> = {
    expert_id: expertId,
    case_slug: input.caseSlug,
    checklist: input.checklist,
    comments: input.comments || null,
    round: input.round ?? 1,
  };
  for (const dim of reviewDimensions) {
    row[dbColumn[dim.key]] = input.ratings[dim.key] ?? null;
  }

  const { error } = await supabase.from(TABLE).insert(row);
  if (error) return { local, cloud: false, cloudError: error.message };
  return { local, cloud: true };
}

export interface ConsensusRow {
  dimension: string;
  n: number;
  median: number;
  q1: number;
  q3: number;
  pct_agree: number;
}

function quantile(sorted: number[], q: number): number {
  if (sorted.length === 0) return 0;
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  }
  return sorted[base];
}

/** Compute median/IQR/% agreement (rating ≥4) per dimension from a set of local reviews. */
export function computeLocalConsensus(reviews: ExpertReviewLocal[]): ConsensusRow[] {
  const rows: ConsensusRow[] = [];
  for (const dim of reviewDimensions) {
    const values = reviews
      .map((r) => r.ratings[dim.key])
      .filter((v): v is number => typeof v === 'number' && v > 0)
      .sort((a, b) => a - b);
    if (values.length === 0) continue;
    const agree = values.filter((v) => v >= 4).length;
    rows.push({
      dimension: dim.key,
      n: values.length,
      median: quantile(values, 0.5),
      q1: quantile(values, 0.25),
      q3: quantile(values, 0.75),
      pct_agree: Math.round((100 * agree) / values.length),
    });
  }
  return rows;
}

/** Panel-wide consensus for a case using ONLY this device's local submissions. */
export function getLocalConsensus(caseSlug: string): ConsensusRow[] {
  return computeLocalConsensus(getLocalExpertReviews(caseSlug));
}

/**
 * Panel-wide Delphi consensus for a case from the cloud. Calls the SECURITY
 * DEFINER RPC `expert_review_consensus` (see supabase/schema.sql), which
 * returns only aggregates — never individual experts' rows — so it is safe
 * under RLS.
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

/** Fetch the signed-in expert's own past cloud reviews (RLS restricts to their rows). */
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

export { getLocalExpertReviews, clearLocalExpertReviews };

/** Build a CSV string of all locally stored expert reviews (for the demo export). */
export function exportLocalReviewsCSV(reviews: ExpertReviewLocal[]): string {
  const header = [
    'id',
    'case_slug',
    'reviewer_label',
    'round',
    ...reviewDimensions.map((d) => d.key),
    'comments',
    'created_at',
  ];
  const rows = reviews.map((r) => [
    r.id,
    r.caseSlug,
    r.reviewerLabel,
    String(r.round),
    ...reviewDimensions.map((d) => String(r.ratings[d.key] ?? '')),
    r.comments.replace(/\n/g, ' '),
    new Date(r.createdAt).toISOString(),
  ]);
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  return [header, ...rows].map((row) => row.map(escape).join(',')).join('\n');
}
