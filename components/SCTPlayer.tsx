'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { SCTModule } from '@/lib/types';
import { sctScale } from '@/data/sct';
import { saveSCTResult } from '@/lib/storage';
import { Badge } from './ui';
import { ProgressRing } from './premium';
import { IconBrain, IconRefresh, IconArrowRight } from './icons';

/**
 * Aggregate-style SCT scoring (simplified for a demo panel).
 * Full credit when the learner matches the expert modal answer; partial credit
 * (0.5) when within one point; zero otherwise. Real SCT normalises credit to
 * the distribution of a full expert panel — see data/sct.ts.
 */
function itemCredit(answer: number | undefined, expertMode: number): number {
  if (answer === undefined) return 0;
  const diff = Math.abs(answer - expertMode);
  if (diff === 0) return 1;
  if (diff === 1) return 0.5;
  return 0;
}

function interpret(pct: number): { label: string; note: string; tone: string } {
  if (pct >= 80)
    return {
      label: 'Strong concordance',
      note: 'Your reasoning under uncertainty closely tracks the expert panel. You weigh new information appropriately.',
      tone: 'text-brand-700',
    };
  if (pct >= 60)
    return {
      label: 'Developing concordance',
      note: 'Sound reasoning overall, with some items where your interpretation diverged from the panel. Review the rationales.',
      tone: 'text-accent-600',
    };
  return {
    label: 'Needs consolidation',
    note: 'Several judgements diverged from the panel. Revisit how each finding should shift the hypothesis and re-attempt.',
    tone: 'text-rose-600',
  };
}

/**
 * Compares the learner's answer to the expert-panel modal answer on the same
 * -2..+2 track. This is an illustrative single modal value, not a fabricated
 * full-panel distribution — a real panel's median/IQR would render here once
 * ethics-approved data collection begins (see the Research & Evaluation page).
 */
function ScaleTrack({ expertValue, studentValue }: { expertValue: number; studentValue?: number }) {
  const pos = (v: number) => ((v + 2) / 4) * 100;
  return (
    <div className="mt-3">
      <div className="relative h-2 w-full rounded-full bg-gradient-to-r from-rose-200 via-ink-100 to-brand-200">
        <span
          className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-ink-800 shadow"
          style={{ left: `${pos(expertValue)}%` }}
          title="Expert panel modal answer"
        />
        {studentValue !== undefined && (
          <span
            className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-brand-500 shadow"
            style={{ left: `${pos(studentValue)}%` }}
            title="Your answer"
          />
        )}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-ink-400">
        <span>-2</span>
        <span>-1</span>
        <span>0</span>
        <span>+1</span>
        <span>+2</span>
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[11px] text-ink-500">
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-800" /> Expert panel (modal)
        </span>
        {studentValue !== undefined && (
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-500" /> Your answer
          </span>
        )}
      </div>
    </div>
  );
}

export function SCTPlayer({ module }: { module: SCTModule }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === module.items.length;

  const score = module.items.reduce(
    (sum, it) => sum + itemCredit(answers[it.id], it.expertMode),
    0,
  );
  const maxScore = module.items.length;
  const pct = maxScore === 0 ? 0 : (score / maxScore) * 100;
  const verdict = interpret(pct);

  function submit() {
    setSubmitted(true);
    saveSCTResult({
      moduleId: module.id,
      answers,
      score,
      maxScore,
      updatedAt: Date.now(),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="space-y-6">
      {submitted && (
        <div className="card animate-fade-in p-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <ProgressRing value={pct} label="concordance" />
              <div>
                <p className="text-sm font-medium text-ink-500">Your SCT score</p>
                <p className="mt-1 text-4xl font-bold text-ink-900">
                  {score.toFixed(1)}
                  <span className="text-xl text-ink-400"> / {maxScore}</span>
                </p>
                <p className={`mt-1 font-semibold ${verdict.tone}`}>{verdict.label}</p>
              </div>
            </div>
            <div className="max-w-md text-sm text-ink-600">
              <p>{verdict.note}</p>
              <p className="mt-2">
                Saved to your{' '}
                <Link href="/dashboard/student" className="link">
                  Student Dashboard
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      )}

      {module.items.map((item, i) => {
        const answer = answers[item.id];
        return (
          <div key={item.id} className="card overflow-hidden p-0">
            <div className="border-l-4 border-brand-500 p-6">
            <div className="mb-2 flex items-center gap-2">
              <Badge tone="brand">Item {i + 1}</Badge>
              <span className="flex items-center gap-1 text-xs text-ink-500">
                <IconBrain width={14} height={14} /> Reasoning under uncertainty
              </span>
            </div>

            <p className="rounded-lg bg-ink-50 p-3 text-ink-700">
              <span className="mr-1.5 text-xs font-semibold uppercase tracking-wide text-ink-400">
                Clinical vignette
              </span>
              <br />
              {item.scenario}
            </p>

            <div className="mt-4 grid gap-3 rounded-xl bg-ink-50 p-4 text-sm sm:grid-cols-3">
              <div>
                <p className="font-semibold text-ink-500">If you were thinking of…</p>
                <p className="mt-1 text-ink-800">{item.ifThinking}</p>
              </div>
              <div>
                <p className="font-semibold text-ink-500">…and then you find</p>
                <p className="mt-1 text-ink-800">{item.andThen}</p>
              </div>
              <div>
                <p className="font-semibold text-ink-500">Effect on hypothesis</p>
                <p className="mt-1 text-ink-800">{item.question}</p>
              </div>
            </div>

            {/* Likert -2..+2 */}
            <fieldset className="mt-4" disabled={submitted}>
              <legend className="sr-only">Score from -2 to +2</legend>
              <div className="grid grid-cols-5 gap-2">
                {sctScale.map((s) => {
                  const active = answer === s.value;
                  return (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setAnswers((a) => ({ ...a, [item.id]: s.value }))}
                      className={`rounded-lg border px-2 py-3 text-center transition ${
                        active
                          ? 'border-brand-500 bg-brand-600 text-white'
                          : 'border-ink-200 bg-white text-ink-700 hover:border-brand-300'
                      }`}
                      title={s.label}
                    >
                      <span className="block text-lg font-bold">
                        {s.value > 0 ? `+${s.value}` : s.value}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-1 flex justify-between text-[11px] text-ink-500">
                <span>Strongly against</span>
                <span>No effect</span>
                <span>Strongly supports</span>
              </div>
            </fieldset>

            {/* Feedback after submission */}
            {submitted && (
              <div className="mt-4 rounded-xl border border-ink-200 bg-white p-4 text-sm">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-semibold text-ink-800">
                    Expert panel answer: {item.expertMode > 0 ? `+${item.expertMode}` : item.expertMode}
                  </span>
                  <span className="text-ink-500">
                    Your answer: {answer === undefined ? '—' : answer > 0 ? `+${answer}` : answer}
                  </span>
                  <span
                    className={`badge ${
                      itemCredit(answer, item.expertMode) === 1
                        ? 'bg-brand-100 text-brand-800'
                        : itemCredit(answer, item.expertMode) === 0.5
                          ? 'bg-accent-400/20 text-accent-600'
                          : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    +{itemCredit(answer, item.expertMode)} credit
                  </span>
                </div>
                <p className="mt-2 text-ink-600">
                  <span className="font-medium">Rationale: </span>
                  {item.rationale}
                </p>
                <ScaleTrack expertValue={item.expertMode} studentValue={answer} />
              </div>
            )}
            </div>
          </div>
        );
      })}

      <div className="flex flex-wrap items-center gap-3">
        {!submitted ? (
          <>
            <button onClick={submit} disabled={!allAnswered} className="btn-primary">
              Submit &amp; score <IconArrowRight width={16} height={16} />
            </button>
            <span className="text-sm text-ink-500">
              {answeredCount} / {module.items.length} answered
            </span>
          </>
        ) : (
          <button onClick={reset} className="btn-secondary">
            <IconRefresh width={16} height={16} /> Re-attempt
          </button>
        )}
      </div>
    </div>
  );
}
