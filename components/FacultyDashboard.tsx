'use client';

import { useState } from 'react';
import {
  cohortSummary,
  caseStats,
  sctStats,
  osceStats,
  commonReasoningErrors,
  teachingRecommendations,
  feedbackQueue,
  type FeedbackItem,
} from '@/data/cohort';
import { StatCard, ProgressBar, Badge, PlaceholderNote } from './ui';
import { DemoDataBanner, ProgressRing } from './premium';
import { IconUsers, IconStethoscope, IconBrain, IconChart, IconClipboard, IconTarget } from './icons';

/** Builds a CSV string from the mock analytics and triggers a client download. */
function exportCSV() {
  const rows: string[][] = [
    ['Section', 'Metric', 'Value'],
    ['Cohort', 'Students', String(cohortSummary.students)],
    ['Cohort', 'Active this week', String(cohortSummary.activeThisWeek)],
    ['Cohort', 'Mean completion %', String(cohortSummary.meanCompletion)],
    ...caseStats.map((c) => ['Case', `${c.condition} — completion %`, String(c.completion)]),
    ...caseStats.map((c) => ['Case', `${c.condition} — decision accuracy %`, String(c.avgDecisionAccuracy)]),
    ...sctStats.map((s) => ['SCT', `${s.module} — mean %`, String(s.meanScore)]),
    ...osceStats.map((o) => ['OSCE', `${o.station} — mean %`, String(o.meanScore)]),
    ...commonReasoningErrors.map((e) => ['Reasoning error', e.error, `${e.frequency}%`]),
    ...teachingRecommendations.map((r) => ['Teaching recommendation', r.title, r.action]),
  ];
  const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'casestep-faculty-analytics.csv';
  a.click();
  URL.revokeObjectURL(url);
}

/** Colour band for a heatmap cell — illustrative thresholds only, not a validated cut-off. */
function heatClass(pct: number): string {
  if (pct >= 75) return 'bg-brand-500/80 text-white';
  if (pct >= 50) return 'bg-accent-400/60 text-ink-900';
  return 'bg-rose-400/70 text-white';
}

export function FacultyDashboard() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>(feedbackQueue);

  function markReviewed(id: string) {
    setFeedback((f) => f.map((item) => (item.id === id ? { ...item, status: 'reviewed' } : item)));
  }

  return (
    <div className="container-page py-8">
      <DemoDataBanner title="Demo analytics">
        Illustrative cohort analytics for FAIMER demonstration; real analytics will be generated
        after authenticated deployment and ethics-approved implementation.
      </DemoDataBanner>

      <div className="mb-6 mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-500">Aggregate view of cohort performance.</p>
        <button onClick={exportCSV} className="btn-primary">
          <IconChart width={16} height={16} /> Export data (CSV)
        </button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="card flex items-center gap-4 p-5 sm:col-span-2 lg:col-span-1">
          <ProgressRing value={cohortSummary.meanCompletion} label="completion" />
          <div>
            <p className="text-sm font-medium text-ink-500">Mean completion</p>
            <p className="text-xs text-ink-400">across all live cases</p>
          </div>
        </div>
        <StatCard label="Enrolled students" value={cohortSummary.students} icon={<IconUsers />} />
        <StatCard label="Active this week" value={cohortSummary.activeThisWeek} icon={<IconUsers />} />
        <StatCard label="Cases live" value={cohortSummary.casesAvailable} icon={<IconStethoscope />} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Case-wise completion */}
        <div className="card p-6">
          <h2 className="text-lg font-bold">Case-wise completion &amp; decision accuracy</h2>
          <div className="mt-5 space-y-5">
            {caseStats.map((c) => (
              <div key={c.slug}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-ink-700">{c.condition}</span>
                  <span className="text-ink-500">{c.completion}% completed</span>
                </div>
                <ProgressBar value={c.completion} max={100} />
                <p className="mt-1 text-xs text-ink-500">
                  Mean branching-decision accuracy: {c.avgDecisionAccuracy}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SCT scores */}
        <div className="card p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <IconBrain width={18} height={18} className="text-brand-600" /> Mean SCT scores
          </h2>
          <div className="mt-5 space-y-5">
            {sctStats.map((s) => (
              <div key={s.module}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-ink-700">{s.module}</span>
                  <span className="text-ink-500">{s.meanScore}% · {s.attempts} attempts</span>
                </div>
                <ProgressBar value={s.meanScore} max={100} />
              </div>
            ))}
          </div>
          <PlaceholderNote>Chart placeholder — box-plots of concordance can render here.</PlaceholderNote>
        </div>

        {/* OSCE performance */}
        <div className="card p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <IconClipboard width={18} height={18} className="text-brand-600" /> OSCE / OSPE checklist performance
          </h2>
          <table className="mt-4 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink-200 text-xs uppercase tracking-wide text-ink-500">
                <th className="pb-2">Station</th>
                <th className="pb-2 text-right">Mean</th>
                <th className="pb-2 pl-3">Weakest step</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {osceStats.map((o) => (
                <tr key={o.station}>
                  <td className="py-2.5 pr-2 font-medium text-ink-700">{o.station}</td>
                  <td className="py-2.5 text-right text-ink-600">{o.meanScore}%</td>
                  <td className="py-2.5 pl-3 text-ink-500">{o.weakestStep}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Common reasoning errors */}
        <div className="card p-6">
          <h2 className="text-lg font-bold">Common reasoning errors</h2>
          <p className="mt-1 text-sm text-ink-500">Frequency across the cohort — targets for teaching.</p>
          <div className="mt-4 space-y-3">
            {commonReasoningErrors.map((e) => (
              <div key={e.error}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-ink-700">{e.error}</span>
                  <span className="font-medium text-ink-600">{e.frequency}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
                  <div className="h-full rounded-full bg-accent-500" style={{ width: `${e.frequency}%` }} />
                </div>
                <p className="mt-0.5 text-xs text-ink-400">Linked case: {e.linkedCase}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Topic-weakness heatmap */}
        <div className="card p-6 lg:col-span-2">
          <h2 className="text-lg font-bold">Topic-wise performance heatmap</h2>
          <p className="mt-1 text-sm text-ink-500">
            Illustrative cell colouring (green ≥75%, amber 50–74%, rose &lt;50%) — a quick scan for
            which topics need attention.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-ink-500">
                  <th className="pb-2 pr-4">Case</th>
                  <th className="pb-2 pr-2">Completion</th>
                  <th className="pb-2">Decision accuracy</th>
                </tr>
              </thead>
              <tbody>
                {caseStats.map((c) => (
                  <tr key={c.slug}>
                    <td className="py-1.5 pr-4 font-medium text-ink-800">{c.condition}</td>
                    <td className="py-1.5 pr-2">
                      <span className={`inline-block w-full rounded-md px-3 py-1.5 text-center font-semibold ${heatClass(c.completion)}`}>
                        {c.completion}%
                      </span>
                    </td>
                    <td className="py-1.5">
                      <span className={`inline-block w-full rounded-md px-3 py-1.5 text-center font-semibold ${heatClass(c.avgDecisionAccuracy)}`}>
                        {c.avgDecisionAccuracy}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Actionable teaching recommendations */}
      <div className="mt-8 card p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <IconTarget width={18} height={18} className="text-brand-600" /> Actionable teaching recommendations
        </h2>
        <p className="mt-1 text-sm text-ink-500">
          Illustrative, derived from the reasoning-error pattern above — what to do about it in the
          next facilitated session.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {teachingRecommendations.map((r) => (
            <div key={r.title} className="rounded-xl border border-ink-200 p-4">
              <p className="font-semibold text-ink-900">{r.title}</p>
              <p className="mt-1 text-xs text-ink-500">{r.rationale}</p>
              <p className="mt-2 text-sm text-ink-700">{r.action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback management */}
      <div className="mt-8 card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Feedback management</h2>
          <Badge tone="brand">{feedback.filter((f) => f.status === 'new').length} new</Badge>
        </div>
        <div className="mt-4 divide-y divide-ink-100">
          {feedback.map((f) => (
            <div key={f.id} className="flex flex-wrap items-start justify-between gap-3 py-3">
              <div className="max-w-2xl">
                <p className="text-sm text-ink-700">“{f.comment}”</p>
                <p className="mt-1 text-xs text-ink-500">
                  {f.student} · {f.case}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {f.status === 'new' ? (
                  <>
                    <Badge tone="brand">New</Badge>
                    <button onClick={() => markReviewed(f.id)} className="btn-secondary">
                      Mark reviewed
                    </button>
                  </>
                ) : (
                  <Badge tone="muted">Reviewed</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
