import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cases, getCase } from '@/data/cases';
import { CasePlayer } from '@/components/CasePlayer';
import { DifficultyBadge, Badge, PageHeader, CTALink } from '@/components/ui';
import { IconArrowLeft, IconClock, IconTarget } from '@/components/icons';

interface Params {
  params: { slug: string };
}

/** Pre-render every case route for static export. */
export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const c = getCase(params.slug);
  if (!c) return { title: 'Case not found' };
  return { title: c.title, description: c.summary };
}

export default function CaseDetailPage({ params }: Params) {
  const c = getCase(params.slug);
  if (!c) notFound();

  // Placeholder cases show a structured "coming soon" view.
  if (c.status !== 'ready' || !c.steps) {
    return (
      <>
        <PageHeader eyebrow="Case in development" title={c.title} description={c.summary}>
          <Link href="/cases" className="btn-secondary">
            <IconArrowLeft width={16} height={16} /> Back to library
          </Link>
        </PageHeader>
        <div className="container-page py-12">
          <div className="card mx-auto max-w-2xl p-8 text-center">
            <p className="text-ink-600">
              This case is part of the CaseStep pipeline and follows the same interactive model as
              the published cases (scenario → history → examination → investigations → decisions →
              community diagnosis → management → reflection → summary).
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-left sm:grid-cols-3">
              <div>
                <dt className="text-xs text-ink-500">Competency</dt>
                <dd className="font-medium">{c.competency.code}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-500">Difficulty</dt>
                <dd className="font-medium">{c.difficulty}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-500">Est. time</dt>
                <dd className="font-medium">{c.minutes} min</dd>
              </div>
            </dl>
            <div className="mt-8">
              <CTALink href="/cases" variant="secondary">
                Explore ready cases
              </CTALink>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Case header */}
      <header className="border-b border-ink-200 bg-gradient-to-b from-brand-50/60 to-white">
        <div className="container-page py-8">
          <Link
            href="/cases"
            className="inline-flex items-center gap-1 text-sm font-medium text-ink-500 hover:text-brand-700"
          >
            <IconArrowLeft width={16} height={16} /> Case Library
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <DifficultyBadge level={c.difficulty} />
            {c.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{c.title}</h1>
          <p className="mt-2 max-w-3xl text-ink-600">{c.summary}</p>
          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div className="flex items-center gap-2">
              <IconTarget width={16} height={16} className="text-brand-600" />
              <dt className="text-ink-500">Competency:</dt>
              <dd className="font-medium text-ink-800">{c.competency.code}</dd>
            </div>
            <div className="flex items-center gap-2">
              <IconClock width={16} height={16} className="text-brand-600" />
              <dt className="text-ink-500">Estimated time:</dt>
              <dd className="font-medium text-ink-800">{c.minutes} min</dd>
            </div>
          </dl>
          <p className="mt-3 max-w-3xl rounded-lg bg-white/70 p-3 text-sm text-ink-600 ring-1 ring-ink-200">
            <span className="font-semibold text-ink-800">Reasoning focus: </span>
            {c.reasoningFocus}
          </p>
        </div>
      </header>

      <CasePlayer case={c} />
    </>
  );
}
