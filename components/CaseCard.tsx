'use client';

import Link from 'next/link';
import type { Case } from '@/lib/types';
import { DifficultyBadge, Badge } from './ui';
import { IconClock, IconBrain, IconTarget, IconArrowRight, IconCheck } from './icons';
import { useStore } from '@/lib/useStore';

export function CaseCard({ case: c }: { case: Case }) {
  const store = useStore();
  const done = store?.cases[c.slug]?.completed;
  const ready = c.status === 'ready';

  return (
    <article
      className={`card flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-cardhover ${
        ready ? '' : 'opacity-90'
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <DifficultyBadge level={c.difficulty} />
          {!ready && <Badge tone="muted">Coming soon</Badge>}
          {done && (
            <span className="badge bg-brand-100 text-brand-800">
              <IconCheck width={12} height={12} className="mr-1" /> Completed
            </span>
          )}
        </div>
        <span className="flex items-center gap-1 text-xs text-ink-500">
          <IconClock width={14} height={14} /> {c.minutes} min
        </span>
      </div>

      <h3 className="text-lg font-bold leading-snug text-ink-900">{c.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{c.summary}</p>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex gap-2">
          <dt className="mt-0.5 text-brand-600">
            <IconTarget width={16} height={16} />
          </dt>
          <dd className="text-ink-700">
            <span className="font-medium text-ink-800">Competency:</span> {c.competency.code}
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="mt-0.5 text-brand-600">
            <IconBrain width={16} height={16} />
          </dt>
          <dd className="text-ink-700">
            <span className="font-medium text-ink-800">Reasoning focus:</span> {c.reasoningFocus}
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {c.tags.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>

      <div className="mt-5 pt-1">
        {ready ? (
          <Link href={`/cases/${c.slug}`} className="btn-primary w-full">
            Start case <IconArrowRight width={16} height={16} />
          </Link>
        ) : (
          <button className="btn-secondary w-full" disabled>
            In development
          </button>
        )}
      </div>
    </article>
  );
}
