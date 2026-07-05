'use client';

import { useState } from 'react';
import { getReadyCases } from '@/data/cases';
import { Badge, PlaceholderNote } from './ui';
import { IconLock, IconStar, IconCheck } from './icons';

const ratingDims = [
  { key: 'relevance', label: 'Relevance', help: 'Is the case relevant to NMC CBME competencies and community practice?' },
  { key: 'validity', label: 'Content validity', help: 'Is the clinical content accurate, current, and complete?' },
  { key: 'feasibility', label: 'Feasibility', help: 'Is the case feasible to implement in the UG posting?' },
] as const;

type DimKey = (typeof ratingDims)[number]['key'];

const checklist = [
  'Learning objectives are clear and competency-linked.',
  'Clinical content is accurate and evidence-based.',
  'Decision points reflect authentic clinical uncertainty.',
  'Feedback is constructive and educationally sound.',
  'Community/public-health perspective is well integrated.',
  'Language and level are appropriate for MBBS students.',
];

export function ExpertReview() {
  const cases = getReadyCases();
  const [selected, setSelected] = useState(cases[0].slug);
  const [ratings, setRatings] = useState<Record<DimKey, number>>({
    relevance: 0,
    validity: 0,
    feasibility: 0,
  });
  const [checks, setChecks] = useState<Record<number, boolean>>({});
  const [suggestion, setSuggestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const active = cases.find((c) => c.slug === selected)!;

  function submit() {
    setSubmitted(true);
    // FUTURE: POST expert responses to a Delphi round table in the database.
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Login placeholder + instructions */}
      <aside className="space-y-5">
        <div className="card p-5">
          <h3 className="flex items-center gap-2 font-bold">
            <IconLock width={18} height={18} className="text-brand-600" /> Expert login
          </h3>
          <p className="mt-2 text-sm text-ink-600">
            Reviewers receive a secure link per Delphi round. Authentication is a placeholder in this
            build.
          </p>
          <div className="mt-3 space-y-2">
            <input
              disabled
              placeholder="Expert email"
              className="w-full rounded-lg border border-ink-200 bg-ink-50 px-3 py-2 text-sm text-ink-400"
            />
            <button disabled className="btn-secondary w-full">
              Sign in (placeholder)
            </button>
          </div>
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
              setSubmitted(false);
              setRatings({ relevance: 0, validity: 0, feasibility: 0 });
              setChecks({});
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

          <button onClick={submit} className="btn-primary mt-5">
            Submit review
          </button>

          {submitted && (
            <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800">
              Thank you — your Round-1 ratings for <strong>{active.title}</strong> have been recorded
              (locally in this demo). Relevance {ratings.relevance}/5 · Validity {ratings.validity}/5
              · Feasibility {ratings.feasibility}/5.
            </div>
          )}
        </div>

        {/* Consensus summary placeholder */}
        <div className="mt-6 card p-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold">Consensus summary</h3>
            <Badge tone="muted">Delphi Round 1</Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {ratingDims.map((d) => (
              <div key={d.key} className="rounded-xl border border-ink-200 p-4 text-center">
                <p className="text-xs uppercase tracking-wide text-ink-500">{d.label}</p>
                <p className="mt-1 text-2xl font-bold text-ink-900">4.3</p>
                <p className="text-xs text-ink-400">median · IQR 4–5</p>
              </div>
            ))}
          </div>
          <PlaceholderNote>
            {/* FUTURE: compute from stored expert responses. */}
            Consensus placeholder — median, IQR and % agreement across the expert panel will be
            computed automatically once responses are stored, with items below threshold flagged for
            Round 2.
          </PlaceholderNote>
        </div>
      </div>
    </div>
  );
}
