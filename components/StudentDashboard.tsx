'use client';

import Link from 'next/link';
import { useStore } from '@/lib/useStore';
import { useAuth } from '@/lib/auth';
import { resetAll } from '@/lib/storage';
import { cases, getReadyCases } from '@/data/cases';
import { sctModules } from '@/data/sct';
import { getStation } from '@/data/osce';
import { StatCard, ProgressBar, Badge, PlaceholderNote } from './ui';
import { IconStethoscope, IconBrain, IconClipboard, IconBook, IconRefresh, IconCheck } from './icons';

export function StudentDashboard() {
  const store = useStore();
  const { enabled, user } = useAuth();

  if (!store) {
    return (
      <div className="container-page py-16 text-center text-ink-500">Loading your progress…</div>
    );
  }

  const readyCases = getReadyCases();
  const completedCases = readyCases.filter((c) => store.cases[c.slug]?.completed);
  const totalReflections = Object.values(store.cases).reduce(
    (n, cp) => n + Object.values(cp.reflections ?? {}).filter((t) => t && t.trim().length > 0).length,
    0,
  );
  const totalDecisions = Object.values(store.cases).reduce(
    (n, cp) => n + Object.keys(cp.decisions ?? {}).length,
    0,
  );

  // Estimated time spent = sum of completed-case minutes + partial.
  const estMinutes = readyCases.reduce((sum, c) => {
    const cp = store.cases[c.slug];
    if (!cp) return sum;
    if (cp.completed) return sum + c.minutes;
    const frac = c.steps ? (cp.lastStepIndex + 1) / c.steps.length : 0;
    return sum + Math.round(c.minutes * frac);
  }, 0);

  const sctResults = Object.values(store.sct);
  const meanSCT =
    sctResults.length === 0
      ? null
      : sctResults.reduce((s, r) => s + (r.maxScore ? (r.score / r.maxScore) * 100 : 0), 0) /
        sctResults.length;

  const osceResults = Object.values(store.osce);
  const meanOSCE =
    osceResults.length === 0
      ? null
      : osceResults.reduce((s, r) => s + (r.maxScore ? (r.score / r.maxScore) * 100 : 0), 0) /
        osceResults.length;

  // Simple strengths / improvement heuristics.
  const strengths: string[] = [];
  const improvements: string[] = [];
  if (completedCases.length >= 2) strengths.push('Consistent case completion across topics.');
  if (meanSCT !== null && meanSCT >= 70) strengths.push('Strong reasoning under uncertainty (SCT).');
  if (meanOSCE !== null && meanOSCE >= 70) strengths.push('Solid OSCE/OSPE checklist performance.');
  if (totalReflections >= 2) strengths.push('Engaged, reflective learner.');
  if (completedCases.length < readyCases.length)
    improvements.push(`Complete the remaining ${readyCases.length - completedCases.length} ready case(s).`);
  if (meanSCT !== null && meanSCT < 70) improvements.push('Revisit SCT rationales to sharpen probabilistic reasoning.');
  if (sctResults.length === 0) improvements.push('Attempt a Script Concordance Test module.');
  if (osceResults.length === 0) improvements.push('Try an OSCE/OSPE station for skills practice.');
  if (totalReflections === 0) improvements.push('Add reflections to consolidate learning.');
  if (strengths.length === 0) strengths.push('Start a case to begin building your profile.');

  // Progress "graph" data — completion fraction per ready case.
  const graph = readyCases.map((c) => {
    const cp = store.cases[c.slug];
    const frac = cp?.completed ? 1 : cp && c.steps ? (cp.lastStepIndex + 1) / c.steps.length : 0;
    return { label: c.condition, pct: Math.round(frac * 100) };
  });

  return (
    <div className="container-page py-8">
      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Cases completed"
          value={`${completedCases.length}/${readyCases.length}`}
          hint="Fully finished ready cases"
          icon={<IconStethoscope />}
        />
        <StatCard
          label="Mean SCT score"
          value={meanSCT === null ? '—' : `${Math.round(meanSCT)}%`}
          hint={`${sctResults.length} module attempt(s)`}
          icon={<IconBrain />}
        />
        <StatCard
          label="Mean OSCE/OSPE"
          value={meanOSCE === null ? '—' : `${Math.round(meanOSCE)}%`}
          hint={`${osceResults.length} station(s) scored`}
          icon={<IconClipboard />}
        />
        <StatCard
          label="Time invested"
          value={`${estMinutes} min`}
          hint={`${totalReflections} reflection(s) · ${totalDecisions} decision(s)`}
          icon={<IconBook />}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Progress graph */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Case progress</h2>
            <span className="text-xs text-ink-500">completion %</span>
          </div>
          <div className="mt-5 space-y-4">
            {graph.map((g) => (
              <div key={g.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-ink-700">{g.label}</span>
                  <span className="text-ink-500">{g.pct}%</span>
                </div>
                <ProgressBar value={g.pct} max={100} />
              </div>
            ))}
          </div>
          <PlaceholderNote>
            {/* FUTURE: replace with a charting library fed by DB analytics. */}
            Chart placeholder — a richer time-series/skills radar can be wired here once results are
            stored in a database.
          </PlaceholderNote>
        </div>

        {/* Strengths / improvements */}
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <IconCheck width={18} height={18} className="text-brand-600" /> Strengths
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-700">
              {strengths.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <IconRefresh width={18} height={18} className="text-accent-600" /> Areas for improvement
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-700">
              {improvements.length === 0 ? (
                <li className="text-ink-500">You’re on track — keep going!</li>
              ) : (
                improvements.map((s) => (
                  <li key={s} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-500" />
                    {s}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Detailed tables */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-lg font-bold">Cases</h2>
          <div className="mt-3 divide-y divide-ink-100">
            {readyCases.map((c) => {
              const cp = store.cases[c.slug];
              return (
                <div key={c.slug} className="flex items-center justify-between py-3">
                  <div>
                    <Link href={`/cases/${c.slug}`} className="font-medium text-ink-800 hover:text-brand-700">
                      {c.condition}
                    </Link>
                    <p className="text-xs text-ink-500">{c.competency.code}</p>
                  </div>
                  {cp?.completed ? (
                    <Badge tone="brand">Completed</Badge>
                  ) : cp ? (
                    <Badge>In progress</Badge>
                  ) : (
                    <Badge tone="muted">Not started</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold">Reflections submitted</h2>
          {totalReflections === 0 ? (
            <p className="mt-3 text-sm text-ink-500">
              No reflections yet. Add reflections inside cases to see them here.
            </p>
          ) : (
            <div className="mt-3 space-y-3">
              {readyCases.map((c) => {
                const refs = store.cases[c.slug]?.reflections ?? {};
                const entries = Object.entries(refs).filter(([, v]) => v && v.trim());
                if (entries.length === 0) return null;
                return (
                  <div key={c.slug}>
                    <p className="text-sm font-semibold text-ink-800">{c.condition}</p>
                    {entries.map(([k, v]) => (
                      <p key={k} className="mt-1 rounded-lg bg-ink-50 p-2 text-sm text-ink-600">
                        “{v}”
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-xs text-ink-500">
          {enabled
            ? user
              ? `Signed in as ${user.email} — your progress syncs to the cloud across devices.`
              : 'Data is stored locally on this device. Sign in (top-right) to sync across devices.'
            : 'Data is stored locally on this device (no login in the demo build).'}
        </p>
        <button
          onClick={() => {
            if (confirm('Reset all local progress? This cannot be undone.')) resetAll();
          }}
          className="btn-ghost text-rose-600 hover:bg-rose-50"
        >
          <IconRefresh width={16} height={16} /> Reset my data
        </button>
      </div>
    </div>
  );
}
