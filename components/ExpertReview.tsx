'use client';

import { useCallback, useEffect, useState } from 'react';
import { getReadyCases } from '@/data/cases';
import { useAuth } from '@/lib/auth';
import {
  submitExpertReview,
  getMyReviews,
  getConsensus,
  type ExpertReviewRow,
  type ConsensusRow,
} from '@/lib/reviews';
import { Badge, PlaceholderNote } from './ui';
import { IconLock, IconStar, IconCheck, IconRefresh } from './icons';

const ratingDims = [
  { key: 'relevance', label: 'Relevance', help: 'Is the case relevant to NMC CBME competencies and community practice?' },
  { key: 'validity', label: 'Content validity', help: 'Is the clinical content accurate, current, and complete?' },
  { key: 'feasibility', label: 'Feasibility', help: 'Is the case feasible to implement in the UG posting?' },
] as const;

type DimKey = (typeof ratingDims)[number]['key'];

/** Delphi consensus threshold: % of ratings that must be 4–5 to "agree". */
const CONSENSUS_THRESHOLD = 75;

/** Compact number format (drops trailing .0). */
function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

const checklist = [
  'Learning objectives are clear and competency-linked.',
  'Clinical content is accurate and evidence-based.',
  'Decision points reflect authentic clinical uncertainty.',
  'Feedback is constructive and educationally sound.',
  'Community/public-health perspective is well integrated.',
  'Language and level are appropriate for MBBS students.',
];

type SubmitState = 'idle' | 'saving' | 'saved-cloud' | 'saved-local' | 'error';

export function ExpertReview() {
  const cases = getReadyCases();
  const { enabled, user } = useAuth();
  const [selected, setSelected] = useState(cases[0].slug);
  const [ratings, setRatings] = useState<Record<DimKey, number>>({
    relevance: 0,
    validity: 0,
    feasibility: 0,
  });
  const [checks, setChecks] = useState<Record<number, boolean>>({});
  const [suggestion, setSuggestion] = useState('');
  const [state, setState] = useState<SubmitState>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [myReviews, setMyReviews] = useState<ExpertReviewRow[]>([]);
  const [consensus, setConsensus] = useState<ConsensusRow[]>([]);

  const active = cases.find((c) => c.slug === selected)!;
  const allRated = ratings.relevance > 0 && ratings.validity > 0 && ratings.feasibility > 0;

  // Consensus display helpers.
  const liveConsensus = enabled && !!user;
  const consensusByDim = consensus.reduce<Partial<Record<DimKey, ConsensusRow>>>((acc, row) => {
    acc[row.dimension] = row;
    return acc;
  }, {});
  const consensusCount = consensus.reduce((max, r) => Math.max(max, r.n), 0);

  const refreshMyReviews = useCallback(async () => {
    if (enabled && user) setMyReviews(await getMyReviews());
    else setMyReviews([]);
  }, [enabled, user]);

  const refreshConsensus = useCallback(async () => {
    if (enabled && user) setConsensus(await getConsensus(selected));
    else setConsensus([]);
  }, [enabled, user, selected]);

  useEffect(() => {
    refreshMyReviews();
  }, [refreshMyReviews]);

  useEffect(() => {
    refreshConsensus();
  }, [refreshConsensus]);

  function resetForm() {
    setState('idle');
    setErrorMsg(null);
    setRatings({ relevance: 0, validity: 0, feasibility: 0 });
    setChecks({});
    setSuggestion('');
  }

  async function submit() {
    setErrorMsg(null);
    if (!allRated) {
      setErrorMsg('Please rate all three dimensions (relevance, validity, feasibility) before submitting.');
      return;
    }

    // Build a stable, human-readable checklist map (item text -> checked).
    const checklistMap: Record<string, boolean> = {};
    checklist.forEach((item, i) => {
      checklistMap[item] = Boolean(checks[i]);
    });

    // No backend configured, or not signed in → local acknowledgement only.
    if (!enabled || !user) {
      setState('saved-local');
      return;
    }

    setState('saving');
    const res = await submitExpertReview(user.id, {
      caseSlug: selected,
      relevance: ratings.relevance,
      validity: ratings.validity,
      feasibility: ratings.feasibility,
      checklist: checklistMap,
      comments: suggestion,
      round: 1,
    });
    if (res.error) {
      setState('error');
      setErrorMsg(res.error);
      return;
    }
    setState('saved-cloud');
    refreshMyReviews();
    refreshConsensus();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Login placeholder + instructions */}
      <aside className="space-y-5">
        <div className="card p-5">
          <h3 className="flex items-center gap-2 font-bold">
            <IconLock width={18} height={18} className="text-brand-600" /> Expert access
          </h3>
          {!enabled ? (
            <>
              <p className="mt-2 text-sm text-ink-600">
                A cloud backend is not configured on this deployment, so submissions are acknowledged
                locally only.
              </p>
              <PlaceholderNote>
                Add Supabase (see README) to store expert reviews securely in the{' '}
                <code>expert_reviews</code> table.
              </PlaceholderNote>
            </>
          ) : user ? (
            <>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-brand-700">
                <IconCheck width={14} height={14} /> Signed in as{' '}
                <span className="font-medium">{user.email}</span>
              </p>
              <p className="mt-2 text-sm text-ink-600">
                Your reviews are saved to the secure <code>expert_reviews</code> table (visible only
                to you under row-level security).
              </p>
              <p className="mt-3 rounded-lg bg-ink-50 p-3 text-sm text-ink-700">
                Reviews submitted: <span className="font-bold">{myReviews.length}</span>
              </p>
            </>
          ) : (
            <>
              <p className="mt-2 text-sm text-ink-600">
                Reviewing requires a signed-in expert account so submissions can be attributed and
                secured.
              </p>
              <p className="mt-2 text-sm font-medium text-accent-600">
                Please sign in using the button in the top navigation bar to submit a review.
              </p>
            </>
          )}
        </div>

        <div className="card p-5">
          <h3 className="font-bold">Delphi process</h3>
          <ol className="mt-3 space-y-2 text-sm text-ink-600">
            <li>1. Round 1 — rate relevance, validity, feasibility.</li>
            <li>2. Analyse consensus (e.g., median &amp; IQR / % agreement).</li>
            <li>3. Round 2 — re-rate items lacking consensus.</li>
            <li>4. Finalise the validated case bank.</li>
          </ol>
        </div>
      </aside>

      {/* Review form */}
      <div className="lg:col-span-2">
        <div className="card p-6">
          <label className="mb-2 block text-sm font-medium text-ink-700">Case under review</label>
          <select
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
              resetForm();
            }}
            className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
          >
            {cases.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-ink-500">
            Competency {active.competency.code} · {active.difficulty}
          </p>

          {/* Rating dimensions (5-point) */}
          <div className="mt-6 space-y-5">
            {ratingDims.map((dim) => (
              <div key={dim.key}>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-ink-800">{dim.label}</p>
                  <span className="text-xs text-ink-400">1 = low · 5 = high</span>
                </div>
                <p className="text-xs text-ink-500">{dim.help}</p>
                <div className="mt-2 flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button
                      key={v}
                      onClick={() => setRatings((r) => ({ ...r, [dim.key]: v }))}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${
                        ratings[dim.key] >= v
                          ? 'border-accent-500 bg-accent-400/20 text-accent-600'
                          : 'border-ink-200 text-ink-300 hover:border-accent-400'
                      }`}
                      aria-label={`${dim.label} ${v}`}
                    >
                      <IconStar width={18} height={18} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Checklist */}
          <div className="mt-6">
            <p className="mb-2 font-medium text-ink-800">Case review checklist</p>
            <ul className="space-y-2">
              {checklist.map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => setChecks((c) => ({ ...c, [i]: !c[i] }))}
                    className="flex w-full items-center gap-3 rounded-lg border border-ink-200 p-3 text-left text-sm hover:bg-ink-50"
                  >
                    <span
                      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border ${
                        checks[i] ? 'border-brand-500 bg-brand-500 text-white' : 'border-ink-300 text-transparent'
                      }`}
                    >
                      <IconCheck width={12} height={12} />
                    </span>
                    <span className="text-ink-700">{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggestions */}
          <div className="mt-6">
            <label className="mb-2 block font-medium text-ink-800">Suggestions / comments</label>
            <textarea
              rows={4}
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="Provide specific, actionable feedback to improve this case…"
              className="w-full rounded-lg border border-ink-200 p-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={submit}
              disabled={state === 'saving'}
              className="btn-primary"
            >
              {state === 'saving' ? (
                <>
                  <IconRefresh width={16} height={16} className="animate-spin" /> Submitting…
                </>
              ) : enabled && user ? (
                'Submit review to database'
              ) : (
                'Submit review'
              )}
            </button>
            {(state === 'saved-cloud' || state === 'saved-local') && (
              <button onClick={resetForm} className="btn-ghost">
                Submit another
              </button>
            )}
          </div>

          {errorMsg && (
            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              {errorMsg}
            </div>
          )}

          {state === 'saved-cloud' && (
            <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800">
              Saved to the database. Your Round-1 review of <strong>{active.title}</strong> was
              recorded — Relevance {ratings.relevance}/5 · Validity {ratings.validity}/5 ·
              Feasibility {ratings.feasibility}/5.
            </div>
          )}

          {state === 'saved-local' && (
            <div className="mt-4 rounded-xl border border-accent-400/40 bg-accent-400/10 p-4 text-sm text-ink-700">
              Recorded locally for <strong>{active.title}</strong> (Relevance {ratings.relevance}/5 ·
              Validity {ratings.validity}/5 · Feasibility {ratings.feasibility}/5).{' '}
              {enabled
                ? 'Sign in to store this review in the database.'
                : 'Connect Supabase to persist reviews to the database.'}
            </div>
          )}
        </div>

        {/* Consensus summary — live from the database when available */}
        <div className="mt-6 card p-6">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="text-lg font-bold">Consensus summary</h3>
            <div className="flex items-center gap-2">
              {liveConsensus && (
                <button
                  onClick={refreshConsensus}
                  className="btn-ghost px-2 py-1 text-xs"
                  aria-label="Refresh consensus"
                >
                  <IconRefresh width={14} height={14} /> Refresh
                </button>
              )}
              <Badge tone="muted">Delphi Round 1</Badge>
            </div>
          </div>
          <p className="mb-3 text-sm text-ink-500">
            {active.title} · consensus threshold ≥ {CONSENSUS_THRESHOLD}% rating 4–5
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {ratingDims.map((d) => {
              const row = consensusByDim[d.key];
              const hasData = liveConsensus && row && row.n > 0;
              const met = hasData && row.pct_agree >= CONSENSUS_THRESHOLD;
              return (
                <div
                  key={d.key}
                  className={`rounded-xl border p-4 text-center ${
                    hasData
                      ? met
                        ? 'border-brand-300 bg-brand-50'
                        : 'border-accent-400/50 bg-accent-400/10'
                      : 'border-ink-200'
                  }`}
                >
                  <p className="text-xs uppercase tracking-wide text-ink-500">{d.label}</p>
                  <p className="mt-1 text-2xl font-bold text-ink-900">
                    {hasData ? fmt(row.median) : '—'}
                  </p>
                  <p className="text-xs text-ink-400">
                    {hasData ? `median · IQR ${fmt(row.q1)}–${fmt(row.q3)}` : 'median · IQR'}
                  </p>
                  {hasData && (
                    <p
                      className={`mt-2 text-xs font-semibold ${
                        met ? 'text-brand-700' : 'text-accent-600'
                      }`}
                    >
                      {Math.round(row.pct_agree)}% agree · {met ? 'consensus' : 'Round 2'}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {liveConsensus ? (
            consensusCount > 0 ? (
              <p className="mt-4 text-xs text-ink-500">
                Based on {consensusCount} expert review{consensusCount === 1 ? '' : 's'} of this case.
                Dimensions below the threshold are flagged for a Round-2 re-rating.
              </p>
            ) : (
              <PlaceholderNote>
                No reviews stored for this case yet. Submit a review above (or have the panel submit)
                and the median, IQR and % agreement will populate here automatically.
              </PlaceholderNote>
            )
          ) : (
            <PlaceholderNote>
              Consensus is computed live from the database when Supabase is configured and you are
              signed in. {enabled ? 'Sign in to view panel consensus.' : 'Connect Supabase (see README) to enable it.'}
            </PlaceholderNote>
          )}
        </div>
      </div>
    </div>
  );
}
