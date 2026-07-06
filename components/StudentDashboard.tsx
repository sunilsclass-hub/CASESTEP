'use client';

import Link from 'next/link';
import { useStore } from '@/lib/useStore';
import { useAuth } from '@/lib/auth';
import { resetAll } from '@/lib/storage';
import { loadIllustrativeDemoProgress } from '@/lib/demoSeed';
import { getReadyCases } from '@/data/cases';
import { StatCard, ProgressBar, Badge, PlaceholderNote } from './ui';
import {
  IconStethoscope,
  IconBrain,
  IconClipboard,
  IconBook,
  IconRefresh,
  IconCheck,
  IconArrowRight,
  IconTarget,
} from './icons';

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

  const hasAnyProgress =
    Object.keys(store.cases).length > 0 || sctResults.length > 0 || osceResults.length > 0;

  // Most recently completed case (for the "recently completed" card).
  const recentlyCompleted = completedCases
    .map((c) => ({ c, updatedAt: store.cases[c.slug]?.updatedAt ?? 0 }))
    .sort((a, b) => b.updatedAt - a.updatedAt)[0]?.c;

  // First not-yet-completed ready case, in library order (for "next recommended").
  const nextRecommended = readyCases.find((c) => !store.cases[c.slug]?.completed);

  return (
    <div className="container-page py-8">
      {/* Empty-state onboarding — only shown before any real progress exists */}
      {!hasAnyProgress && (
        <div className="mb-8 rounded-2xl border border-brand-200 bg-brand-50 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
                Get started
              </p>
              <h2 className="mt-1 text-xl font-bold text-ink-900">
                No activity yet on this device
              </h2>
              <p className="mt-1 max-w-xl text-sm text-ink-600">
                Start your first case to begin building a real profile, or load illustrative demo
                progress to preview what a populated dashboard looks like (clearly labelled — not
                real student data, and clearable at any time).
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-col gap-2 sm:flex-row">
              <Link href="/cases" className="btn-primary whitespace-nowrap">
                Start your first case <IconArrowRight width={16} height={16} />
              </Link>
              <button
                onClick={() => loadIllustrativeDemoProgress()}
                className="btn-secondary whitespace-nowrap"
              >
                Load illustrative demo progress
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recently completed / next recommended */}
      {hasAnyProgress && (
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="card p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink-500">
              <IconCheck width={16} height={16} className="text-brand-600" /> Recently completed case
            </p>
            {recentlyCompleted ? (
              <>
                <p className="mt-2 text-lg font-bold text-ink-900">{recentlyCompleted.condition}</p>
                <p className="mt-1 text-sm text-ink-500">{recentlyCompleted.competency.code}</p>
                <Link href={`/cases/${recentlyCompleted.slug}`} className="link mt-3 inline-flex items-center gap-1 text-sm">
                  Review case <IconArrowRight width={14} height={14} />
                </Link>
              </>
            ) : (
              <p className="mt-2 text-sm text-ink-500">No case completed yet — you&apos;re in progress.</p>
            )}
          </div>
          <div className="card p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink-500">
              <IconTarget width={16} height={16} className="text-accent-600" /> Next recommended case
            </p>
            {nextRecommended ? (
              <>
                <p className="mt-2 text-lg font-bold text-ink-900">{nextRecommended.condition}</p>
                <p className="mt-1 text-sm text-ink-500">
                  {nextRecommended.difficulty} · {nextRecommended.minutes} min
                </p>
                <Link href={`/cases/${nextRecommended.slug}`} className="btn-primary mt-3">
                  {store.cases[nextRecommended.slug] ? 'Continue case' : 'Start case'}{' '}
                  <IconArrowRight width={14} height={14} />
                </Link>
              </>
            ) : (
              <p className="mt-2 text-sm font-medium text-brand-700">
                All ready cases complete — try the SCT or OSCE/OSPE modules next!
              </p>
            )}
          </div>
        </div>
      )}

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
