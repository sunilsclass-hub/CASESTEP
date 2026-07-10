'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getReadyCases } from '@/data/cases';
import { useAuth } from '@/lib/auth';
import {
  reviewDimensions,
  submitExpertReview,
  getLocalExpertReviews,
  clearLocalExpertReviews,
  computeLocalConsensus,
  exportLocalReviewsCSV,
  type ReviewDimensionKey,
} from '@/lib/reviews';
import type { ExpertReviewLocal } from '@/lib/storage';
import { Badge, PlaceholderNote } from './ui';
import { DemoDataBanner } from './premium';
import { IconLock, IconStar, IconCheck, IconRefresh, IconChart } from './icons';

/** Delphi consensus threshold: % of ratings that must be 4–5 to "agree". */
const CONSENSUS_THRESHOLD = 75;

/** Compact number format (drops trailing .0). */
function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

const zeroRatings = (): Record<ReviewDimensionKey, number> =>
  Object.fromEntries(reviewDimensions.map((d) => [d.key, 0])) as Record<ReviewDimensionKey, number>;

const checklist = [
  'Learning objectives are clear and competency-linked.',
  'Clinical content is accurate and evidence-based.',
  'Decision points reflect authentic clinical uncertainty.',
  'Feedback is constructive and educationally sound.',
  'Community/public-health perspective is well integrated.',
  'Language and level are appropriate for MBBS students.',
];

type SubmitState = 'idle' | 'saving' | 'saved' | 'error';

export function ExpertReview() {
  const cases = getReadyCases();
  const { enabled, user } = useAuth();
  const [selected, setSelected] = useState(cases[0].slug);
  const [reviewerLabel, setReviewerLabel] = useState('Reviewer A');
  const [ratings, setRatings] = useState<Record<ReviewDimensionKey, number>>(zeroRatings());
  const [checks, setChecks] = useState<Record<number, boolean>>({});
  const [suggestion, setSuggestion] = useState('');
  const [state, setState] = useState<SubmitState>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [cloudSaved, setCloudSaved] = useState(false);
  const [allLocalReviews, setAllLocalReviews] = useState<ExpertReviewLocal[]>([]);

  const active = cases.find((c) => c.slug === selected)!;
  const allRated = reviewDimensions.every((d) => ratings[d.key] > 0);

  const refreshLocal = useCallback(() => {
    setAllLocalReviews(getLocalExpertReviews());
  }, []);

  useEffect(() => {
    refreshLocal();
  }, [refreshLocal]);

  const reviewsForCase = useMemo(
    () => allLocalReviews.filter((r) => r.caseSlug === selected),
    [allLocalReviews, selected],
  );
  const consensus = useMemo(() => computeLocalConsensus(reviewsForCase), [reviewsForCase]);
  const consensusByDim = useMemo(
    () => Object.fromEntries(consensus.map((c) => [c.dimension, c])),
    [consensus],
  );

  function resetForm() {
    setState('idle');
    setErrorMsg(null);
    setRatings(zeroRatings());
    setChecks({});
    setSuggestion('');
    setCloudSaved(false);
  }

  async function submit() {
    setErrorMsg(null);
    if (!allRated) {
      setErrorMsg('Please rate all seven dimensions before submitting.');
      return;
    }
    if (!reviewerLabel.trim()) {
      setErrorMsg('Please enter a reviewer label (e.g. "Reviewer A").');
      return;
    }

    const checklistMap: Record<string, boolean> = {};
    checklist.forEach((item, i) => {
      checklistMap[item] = Boolean(checks[i]);
    });

    setState('saving');
    const res = await submitExpertReview(
      {
        caseSlug: selected,
        reviewerLabel: reviewerLabel.trim(),
        ratings,
        checklist: checklistMap,
        comments: suggestion,
        round: 1,
      },
      user?.id,
    );
    setState('saved');
    setCloudSaved(res.cloud);
    refreshLocal();
  }

  function exportCSV() {
    const csv = exportLocalReviewsCSV(allLocalReviews);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'casestep-expert-reviews.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  function clearDemoData() {
    if (!confirm('Clear all locally stored expert reviews on this device? This cannot be undone.')) return;
    clearLocalExpertReviews();
    refreshLocal();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Instructions + status */}
      <aside className="space-y-5">
        <DemoDataBanner title="Illustrative Expert Review status">
          <p>
            Ratings and consensus below are <strong>single-author illustrative judgments</strong>{' '}
            captured locally on this device — not yet a validated Delphi panel. No sign-in or real
            expert identities are required to use this mode.
          </p>
          <p className="mt-2 text-xs text-ink-500">
            A secure, sign-in-based workflow (Supabase-backed submissions and cross-device
            consensus) remains available as an optional research-deployment mode — see the
            reviewer-identity panel below.
          </p>
        </DemoDataBanner>

        <div className="card p-5">
          <h3 className="flex items-center gap-2 font-bold">
            <IconLock width={18} height={18} className="text-brand-600" /> Reviewer identity
          </h3>
          <p className="mt-2 text-sm text-ink-600">
            Enter a label to identify your review on this device (e.g. “Reviewer A”, “Reviewer B”).
            Submitting under multiple labels builds up a multi-reviewer consensus view.
          </p>
          <label htmlFor="reviewer-label" className="sr-only">
            Reviewer label
          </label>
          <input
            id="reviewer-label"
            value={reviewerLabel}
            onChange={(e) => setReviewerLabel(e.target.value)}
            placeholder="Reviewer A"
            className="input mt-3"
          />
          {enabled && (
            <p className="mt-3 text-xs text-ink-500">
              {user ? (
                <>
                  <IconCheck width={12} height={12} className="mr-1 inline text-brand-500" />
                  Signed in as {user.email} — reviews also sync to the secure database.
                </>
              ) : (
                'Sign in (top-right) to additionally sync reviews to the database across devices.'
              )}
            </p>
          )}
        </div>

        <div className="card p-5">
          <h3 className="font-bold">Delphi process</h3>
          <ol className="mt-3 space-y-2 text-sm text-ink-600">
            <li>1. Round 1 — rate all seven dimensions per case.</li>
            <li>2. Analyse consensus (median &amp; IQR / % agreement).</li>
            <li>3. Round 2 — re-rate items below the consensus threshold.</li>
            <li>4. Finalise the validated case bank.</li>
          </ol>
        </div>

        <div className="card p-5">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-bold">Submissions</h3>
            <Badge tone="brand">{allLocalReviews.length}</Badge>
          </div>
          <p className="text-sm text-ink-600">Stored locally on this device across all cases.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={exportCSV}
              disabled={allLocalReviews.length === 0}
              className="btn-secondary text-xs"
            >
              <IconChart width={14} height={14} /> Export CSV
            </button>
            <button
              onClick={clearDemoData}
              disabled={allLocalReviews.length === 0}
              className="btn-ghost text-xs text-rose-600 hover:bg-rose-50"
            >
              <IconRefresh width={14} height={14} /> Clear data
            </button>
          </div>
        </div>
      </aside>

      {/* Review form */}
      <div className="lg:col-span-2">
        <div className="card p-6">
          <label htmlFor="expert-review-case" className="mb-2 block text-sm font-medium text-ink-700">
            Case under review
          </label>
          <select
            id="expert-review-case"
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
              resetForm();
            }}
            className="input"
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

          {/* Rating dimensions (5-point, all 7) */}
          <div className="mt-6 space-y-5">
            {reviewDimensions.map((dim) => (
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
            <p className="mb-2 font-medium text-ink-800">Case review quality checklist</p>
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
            <label htmlFor="expert-review-suggestion" className="mb-2 block font-medium text-ink-800">
              Suggestions / comments
            </label>
            <textarea
              id="expert-review-suggestion"
              rows={4}
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="Provide specific, actionable feedback to improve this case…"
              className="input p-3"
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button onClick={submit} disabled={state === 'saving'} className="btn-primary">
              {state === 'saving' ? (
                <>
                  <IconRefresh width={16} height={16} className="animate-spin" /> Submitting…
                </>
              ) : (
                'Submit review'
              )}
            </button>
            {state === 'saved' && (
              <button onClick={resetForm} className="btn-ghost">
                Submit another (e.g. as a different reviewer)
              </button>
            )}
          </div>

          {errorMsg && (
            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              {errorMsg}
            </div>
          )}

          {state === 'saved' && (
            <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800">
              Recorded as <strong>{reviewerLabel}</strong> for <strong>{active.title}</strong> (saved
              on this device).{' '}
              {cloudSaved && 'Also synced to the database.'}
            </div>
          )}
        </div>

        {/* Consensus summary — computed live from local demo submissions */}
        <div className="mt-6 card p-6">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="text-lg font-bold">Consensus summary</h3>
            <Badge tone="muted">Delphi Round 1</Badge>
          </div>
          <p className="mb-3 text-sm text-ink-500">
            {active.title} · consensus threshold ≥ {CONSENSUS_THRESHOLD}% rating 4–5 · computed from{' '}
            {reviewsForCase.length} submission{reviewsForCase.length === 1 ? '' : 's'} on this device
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reviewDimensions.map((d) => {
              const row = consensusByDim[d.key];
              const hasData = row && row.n > 0;
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
                      {row.n} rating{row.n === 1 ? '' : 's'} · {Math.round(row.pct_agree)}% agree ·{' '}
                      {met ? 'consensus' : 'Round 2'}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {reviewsForCase.length === 0 ? (
            <PlaceholderNote>
              No reviews submitted for this case yet. Submit one above — you can submit several times
              under different reviewer labels to see a multi-reviewer consensus build up.
            </PlaceholderNote>
          ) : (
            <p className="mt-4 text-xs text-ink-500">
              Dimensions below the threshold are flagged for a Round-2 re-rating. A validated panel
              consensus will be computed once a real Delphi panel completes Round 1 after ethics
              approval.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
