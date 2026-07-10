'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { Case, CaseStep } from '@/lib/types';
import {
  saveCaseProgress,
  clearCaseProgress,
  readStore,
  type CaseProgress,
} from '@/lib/storage';
import { ProgressBar, Badge } from './ui';
import {
  IconArrowLeft,
  IconArrowRight,
  IconSave,
  IconRefresh,
  IconCheck,
  IconX,
  IconFlag,
  IconGlobe,
  IconBrain,
  IconClipboard,
  IconStethoscope,
  IconBook,
} from './icons';
import { Illustration, VideoPlaceholder } from './media';
import { caseIllustration, caseVideos } from '@/data/media';

const kindMeta: Record<
  CaseStep['kind'],
  { label: string; icon: React.ReactNode; tint: string }
> = {
  scenario: { label: 'Patient Scenario', icon: <IconStethoscope width={16} height={16} />, tint: 'text-brand-600' },
  history: { label: 'History', icon: <IconClipboard width={16} height={16} />, tint: 'text-brand-600' },
  examination: { label: 'Examination', icon: <IconStethoscope width={16} height={16} />, tint: 'text-brand-600' },
  investigation: { label: 'Investigations', icon: <IconClipboard width={16} height={16} />, tint: 'text-brand-600' },
  decision: { label: 'Decision Point', icon: <IconBrain width={16} height={16} />, tint: 'text-accent-600' },
  reasoning: { label: 'Clinical Reasoning', icon: <IconBrain width={16} height={16} />, tint: 'text-accent-600' },
  community: { label: 'Community / Public Health', icon: <IconGlobe width={16} height={16} />, tint: 'text-brand-600' },
  management: { label: 'Management & Counseling', icon: <IconClipboard width={16} height={16} />, tint: 'text-brand-600' },
  reflection: { label: 'Reflection', icon: <IconBook width={16} height={16} />, tint: 'text-accent-600' },
  summary: { label: 'Summary', icon: <IconCheck width={16} height={16} />, tint: 'text-brand-600' },
};

export function CasePlayer({ case: c }: { case: Case }) {
  const steps = c.steps ?? [];
  const [index, setIndex] = useState(0);
  const [decisions, setDecisions] = useState<Record<string, string>>({});
  const [reflections, setReflections] = useState<Record<string, string>>({});
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Restore saved progress on mount.
  useEffect(() => {
    const prev = readStore().cases[c.slug];
    if (prev) {
      setIndex(Math.min(prev.lastStepIndex ?? 0, steps.length - 1));
      setDecisions(prev.decisions ?? {});
      setReflections(prev.reflections ?? {});
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [c.slug]);

  const step = steps[index];
  const meta = kindMeta[step.kind];
  const isDecision = step.kind === 'decision' && step.decision;
  const chosen = isDecision ? decisions[step.id] : undefined;
  const mustDecide = Boolean(isDecision && !chosen);
  const isLast = index === steps.length - 1;

  const progressPct = useMemo(
    () => ((index + 1) / steps.length) * 100,
    [index, steps.length],
  );

  function persist(partial: Partial<CaseProgress>) {
    saveCaseProgress(c.slug, {
      lastStepIndex: index,
      decisions,
      reflections,
      ...partial,
    });
  }

  function choose(optionId: string) {
    const next = { ...decisions, [step.id]: optionId };
    setDecisions(next);
    saveCaseProgress(c.slug, { lastStepIndex: index, decisions: next, reflections });
  }

  function setReflection(text: string) {
    setReflections((r) => ({ ...r, [step.id]: text }));
  }

  function goNext() {
    if (mustDecide) return;
    if (isLast) {
      persist({ completed: true, lastStepIndex: index });
      setSavedAt(Date.now());
      return;
    }
    const nextIndex = index + 1;
    setIndex(nextIndex);
    saveCaseProgress(c.slug, { lastStepIndex: nextIndex, decisions, reflections });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goBack() {
    if (index === 0) return;
    const prev = index - 1;
    setIndex(prev);
    saveCaseProgress(c.slug, { lastStepIndex: prev, decisions, reflections });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function saveNow() {
    persist({ lastStepIndex: index });
    setSavedAt(Date.now());
  }

  function restart() {
    clearCaseProgress(c.slug);
    setIndex(0);
    setDecisions({});
    setReflections({});
    setSavedAt(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!hydrated || !step) return null;

  return (
    <div className="container-page py-8">
      {/* Progress header */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-ink-600">
            Step {index + 1} of {steps.length}
          </span>
          <span className="text-ink-500">{Math.round(progressPct)}% complete</span>
        </div>
        <ProgressBar value={index + 1} max={steps.length} />
        {/* Step dots */}
        <div className="mt-3 flex flex-wrap gap-1.5" aria-hidden>
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                setIndex(i);
                saveCaseProgress(c.slug, { lastStepIndex: i, decisions, reflections });
              }}
              title={kindMeta[s.kind].label}
              className={`h-2 w-6 rounded-full transition ${
                i === index ? 'bg-brand-600' : i < index ? 'bg-brand-300' : 'bg-ink-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step card */}
      <article className="card animate-fade-in p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-2">
          <span className={meta.tint}>{meta.icon}</span>
          <span className="text-sm font-semibold uppercase tracking-wide text-ink-500">
            {meta.label}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-ink-900">{step.title}</h2>

        {step.body && (
          <p className="mt-3 whitespace-pre-line leading-relaxed text-ink-700">{step.body}</p>
        )}

        {step.bullets && step.bullets.length > 0 && (
          <ul className="mt-4 space-y-2">
            {step.bullets.map((b, i) => (
              <li key={i} className="flex gap-2.5 text-ink-700">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Media: a real topic illustration for images, a proper placeholder card for video */}
        {step.media && step.media.type === 'image' && (
          <div className="mt-5">
            {(step.media.src ?? caseIllustration[c.slug]) ? (
              <Illustration
                src={step.media.src ?? caseIllustration[c.slug]}
                alt={`Educational illustration for ${c.condition}`}
                caption={step.media.caption}
              />
            ) : (
              <figure className="overflow-hidden rounded-xl border border-dashed border-ink-300 bg-ink-50">
                <div className="flex aspect-video items-center justify-center text-ink-400">
                  <span className="text-sm">🖼 Image placeholder</span>
                </div>
                <figcaption className="border-t border-ink-200 px-4 py-2 text-xs text-ink-500">
                  {step.media.caption}
                </figcaption>
              </figure>
            )}
          </div>
        )}
        {step.media && step.media.type === 'video' && !caseVideos[c.slug] && (
          <div className="mt-5">
            <VideoPlaceholder title={step.media.caption} objective={step.media.caption} />
          </div>
        )}

        {/* Dedicated video gallery for the flagship cases, shown at the management step */}
        {step.kind === 'management' && caseVideos[c.slug] && (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {caseVideos[c.slug].map((v) => (
              <VideoPlaceholder key={v.title} title={v.title} objective={v.objective} />
            ))}
          </div>
        )}

        {/* Red flags */}
        {step.redFlags && step.redFlags.length > 0 && (
          <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-rose-700">
              <IconFlag width={16} height={16} /> Red flags
            </p>
            <ul className="mt-2 space-y-1 text-sm text-rose-700">
              {step.redFlags.map((r, i) => (
                <li key={i}>• {r}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Decision / branching */}
        {isDecision && step.decision && (
          <div className="mt-6">
            <p className="mb-3 font-semibold text-ink-900">{step.decision.prompt}</p>
            <div className="space-y-3">
              {step.decision.options.map((opt) => {
                const selected = chosen === opt.id;
                return (
                  <div key={opt.id}>
                    <button
                      onClick={() => choose(opt.id)}
                      className={`w-full rounded-xl border p-4 text-left transition ${
                        selected
                          ? opt.correct
                            ? 'border-brand-400 bg-brand-50'
                            : 'border-rose-300 bg-rose-50'
                          : 'border-ink-200 bg-white hover:border-brand-300 hover:bg-ink-50'
                      }`}
                    >
                      <span className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border text-xs ${
                            selected
                              ? opt.correct
                                ? 'border-brand-500 bg-brand-500 text-white'
                                : 'border-rose-400 bg-rose-400 text-white'
                              : 'border-ink-300 text-transparent'
                          }`}
                        >
                          {selected ? (opt.correct ? <IconCheck width={12} height={12} /> : <IconX width={12} height={12} />) : '•'}
                        </span>
                        <span className="text-sm font-medium text-ink-800">{opt.label}</span>
                      </span>
                    </button>
                    {selected && (
                      <div
                        className={`mt-2 rounded-lg p-3 text-sm ${
                          opt.correct ? 'bg-brand-50 text-brand-800' : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        <span className="font-semibold">
                          {opt.correct ? 'Good choice. ' : 'Reconsider. '}
                        </span>
                        {opt.feedback}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {mustDecide && (
              <p className="mt-3 text-sm text-accent-600">
                Select an option to reveal feedback and continue.
              </p>
            )}
          </div>
        )}

        {/* Reflection */}
        {step.reflectionPrompt && (
          <div className="mt-5">
            <label htmlFor={`reflect-${step.id}`} className="mb-2 block font-medium text-ink-800">
              {step.reflectionPrompt}
            </label>
            <textarea
              id={`reflect-${step.id}`}
              value={reflections[step.id] ?? ''}
              onChange={(e) => setReflection(e.target.value)}
              onBlur={() => persist({ lastStepIndex: index })}
              rows={5}
              placeholder="Write your reflection here — it is saved to this device."
              className="input rounded-xl p-3"
            />
            <p className="mt-1 text-xs text-ink-500">Saved locally. Reflections appear on your Student Dashboard.</p>
          </div>
        )}

        {/* Completion banner */}
        {isLast && savedAt && (
          <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800">
            <p className="font-semibold">Case completed and saved.</p>
            <p className="mt-1">
              Great work. Review your progress on the{' '}
              <Link href="/dashboard/student" className="link">
                Student Dashboard
              </Link>
              , or try the{' '}
              <Link href="/sct" className="link">
                Script Concordance Test
              </Link>
              .
            </p>
          </div>
        )}
      </article>

      {/* Controls */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <button onClick={goBack} disabled={index === 0} className="btn-secondary">
            <IconArrowLeft width={16} height={16} /> Back
          </button>
          <button onClick={goNext} disabled={mustDecide} className="btn-primary">
            {isLast ? 'Finish case' : 'Next'} <IconArrowRight width={16} height={16} />
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={saveNow} className="btn-ghost">
            <IconSave width={16} height={16} /> Save progress
          </button>
          <button onClick={restart} className="btn-ghost text-rose-600 hover:bg-rose-50">
            <IconRefresh width={16} height={16} /> Restart case
          </button>
        </div>
      </div>

      {savedAt && (
        <p className="mt-2 text-right text-xs text-ink-500">
          Saved at {new Date(savedAt).toLocaleTimeString()}
        </p>
      )}

      {/* Key learning points always available at foot */}
      {c.keyLearningPoints && (
        <details className="mt-8 card p-5">
          <summary className="cursor-pointer font-semibold text-ink-900">
            Key learning points (spoiler)
          </summary>
          <ul className="mt-3 space-y-2">
            {c.keyLearningPoints.map((p, i) => (
              <li key={i} className="flex gap-2 text-sm text-ink-700">
                <IconCheck width={16} height={16} className="mt-0.5 flex-shrink-0 text-brand-500" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
