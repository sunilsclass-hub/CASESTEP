import Link from 'next/link';
import Image from 'next/image';
import { CTALink, Badge } from '@/components/ui';
import { FeatureCard } from '@/components/premium';
import { CaseCard } from '@/components/CaseCard';
import { getReadyCases } from '@/data/cases';
import { sctModules } from '@/data/sct';
import { osceStations } from '@/data/osce';
import { site } from '@/data/site';
import {
  IconBrain,
  IconStethoscope,
  IconClipboard,
  IconChart,
  IconGlobe,
  IconArrowRight,
  IconCheck,
  IconTarget,
  IconSparkle,
} from '@/components/icons';

const journey = [
  { icon: <IconStethoscope />, title: 'Scenario', text: 'Meet a realistic Community Medicine patient.' },
  { icon: <IconBrain />, title: 'Reasoning', text: 'Work through history, exam, and investigations.' },
  { icon: <IconTarget />, title: 'Decision', text: 'Make a branching clinical decision.' },
  { icon: <IconCheck />, title: 'Feedback', text: 'Get immediate, reasoned feedback.' },
  { icon: <IconGlobe />, title: 'Reflection', text: 'Reflect and add the community lens.' },
  { icon: <IconClipboard />, title: 'Assessment', text: 'Consolidate via SCT and OSCE/OSPE.' },
];

const features = [
  { icon: <IconStethoscope width={20} height={20} />, title: 'Digital Case Library', text: 'Structured, branching cases across NCDs, MCH, communicable disease and outbreaks.', href: '/cases' },
  { icon: <IconBrain width={20} height={20} />, title: 'Script Concordance Test', text: 'Reasoning under uncertainty, scored against an illustrative expert panel.', href: '/sct' },
  { icon: <IconClipboard width={20} height={20} />, title: 'OSCE / OSPE Practice', text: 'Weighted checklists, global rating scales, and printable rubrics.', href: '/osce' },
  { icon: <IconChart width={20} height={20} />, title: 'Student & Faculty Dashboards', text: 'Individual progress, and cohort-level analytics for facilitators.', href: '/dashboard/student' },
];

const frameworks = [
  'NMC CBME Curriculum',
  'FAIMER Project Framework',
  'Kern’s 6-Step Model',
  'ADDIE Model',
  'TPACK Framework',
  'Clinical Reasoning',
  'Script Concordance Testing',
  'OSCE / OSPE Assessment',
  'Mixed-Methods Research',
  'Implementation Science',
];

const trust = [
  {
    icon: <IconTarget />,
    title: 'Academically grounded',
    text: 'Every module is deliberately mapped to Kern’s 6-step model, ADDIE, TPACK, and NMC CBME competencies — not retrofitted after the fact.',
  },
  {
    icon: <IconBrain />,
    title: 'Reasoning-focused, not recall-focused',
    text: 'Branching decisions, Script Concordance items, and OSCE/OSPE stations are designed to assess applied judgement under uncertainty.',
  },
  {
    icon: <IconGlobe />,
    title: 'Honest by design',
    text: 'All cohort analytics, expert consensus, and demo progress are clearly labelled illustrative data until an ethics-approved deployment generates real results.',
  },
];

export default function HomePage() {
  const ready = getReadyCases();
  const featured = ready.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-200 bg-mesh-hero bg-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
        <div className="container-page relative grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div className="animate-fade-in-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-3 py-1 text-xs font-semibold text-brand-700 backdrop-blur">
              <IconSparkle width={14} height={14} /> {site.program}
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Enhancing{' '}
              <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">
                Clinical Reasoning
              </span>{' '}
              in Community Medicine
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
              CaseStep is a digital case-based learning platform designed to strengthen clinical
              reasoning in undergraduate Community Medicine — through structured scenarios,
              branching decisions, reflective prompts, Script Concordance Testing, OSCE/OSPE
              practice, and faculty analytics.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTALink href="/cases">
                Start Learning <IconArrowRight width={16} height={16} />
              </CTALink>
              <CTALink href="/cases" variant="secondary">
                Explore Case Library
              </CTALink>
              <CTALink href="/dashboard/faculty" variant="secondary">
                View Faculty Dashboard
              </CTALink>
              <CTALink href="/research" variant="ghost">
                View Research Framework
              </CTALink>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              <div>
                <dt className="text-3xl font-bold text-ink-900">{ready.length}</dt>
                <dd className="text-sm text-ink-500">Case topics</dd>
              </div>
              <div>
                <dt className="text-3xl font-bold text-ink-900">{sctModules.length}</dt>
                <dd className="text-sm text-ink-500">SCT modules</dd>
              </div>
              <div>
                <dt className="text-3xl font-bold text-ink-900">{osceStations.length}</dt>
                <dd className="text-sm text-ink-500">OSCE/OSPE stations</dd>
              </div>
            </dl>
          </div>

          {/* Hero card mock */}
          <div className="animate-scale-in lg:justify-self-end">
            <div className="card shadow-premium w-full max-w-md p-6">
              <div className="flex items-center justify-between">
                <Badge tone="brand">Case Preview</Badge>
                <span className="text-xs text-ink-500">Decision point 2 of 4</span>
              </div>
              <h3 className="mt-3 text-lg font-bold">The Tired Shopkeeper — Type 2 Diabetes</h3>
              <p className="mt-2 text-sm text-ink-600">
                FPG 156 mg/dL, HbA1c 8.9%, non-healing foot ulcer. What is your next step?
              </p>
              <div className="mt-4 space-y-2">
                <div className="rounded-lg border border-brand-400 bg-brand-50 p-3 text-sm">
                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white">
                    <IconCheck width={12} height={12} />
                  </span>
                  Confirm diagnosis &amp; screen for complications
                </div>
                <div className="rounded-lg border border-ink-200 p-3 text-sm text-ink-500">
                  Start insulin immediately
                </div>
                <div className="rounded-lg border border-ink-200 p-3 text-sm text-ink-500">
                  Reassure and review in 3 months
                </div>
              </div>
              <p className="mt-3 rounded-lg bg-brand-50 p-3 text-xs text-brand-800">
                Correct. Confirm the biochemical diagnosis and screen for early complications before
                treating.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is DCBL + feature grid */}
      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold">What is Digital Case-Based Learning?</h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              Digital Case-Based Learning (DCBL) presents authentic patient problems as interactive,
              branching journeys. Instead of memorising facts, students practise the reasoning
              clinicians actually use — generating hypotheses, weighing evidence, deciding under
              uncertainty, and connecting the individual patient to the health of the community.
            </p>
            <Link href="/about" className="link mt-4 inline-flex items-center gap-1">
              Read the rationale <IconArrowRight width={14} height={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {features.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.text} href={f.href} />
            ))}
          </div>
        </div>
      </section>

      {/* Learning journey */}
      <section className="border-y border-ink-200 bg-white">
        <div className="container-page py-16">
          <h2 className="text-2xl font-bold">The stepwise learning journey</h2>
          <p className="mt-2 max-w-2xl text-ink-600">
            Every case follows the same evidence-informed path, from first encounter to
            consolidated reflection.
          </p>
          <Image
            src="/media/home/learning-pathway.svg"
            alt="Visual learning pathway: Scenario, Reasoning, Decision, Feedback, Reflection, Assessment"
            width={640}
            height={220}
            className="mt-8 hidden w-full max-w-3xl sm:block"
          />
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {journey.map((s, i) => (
              <li key={s.title} className="card-interactive relative p-4">
                <span className="absolute right-3 top-3 text-2xl font-bold text-ink-100">
                  {i + 1}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
                  {s.icon}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-ink-900">{s.title}</h3>
                <p className="mt-1 text-xs leading-snug text-ink-500">{s.text}</p>
                {i < journey.length - 1 && (
                  <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-ink-300 lg:block" aria-hidden>
                    <IconArrowRight width={14} height={14} />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Featured cases */}
      <section className="container-page py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Featured cases</h2>
            <p className="mt-2 text-ink-600">Fully authored, ready-to-play clinical journeys.</p>
          </div>
          <Link href="/cases" className="btn-secondary hidden sm:inline-flex">
            All cases <IconArrowRight width={16} height={16} />
          </Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <CaseCard key={c.slug} case={c} />
          ))}
        </div>
      </section>

      {/* Trust indicators */}
      <section className="border-y border-ink-200 bg-ink-50/60">
        <div className="container-page py-16">
          <h2 className="text-2xl font-bold">Built to be shown, not just used</h2>
          <p className="mt-2 max-w-2xl text-ink-600">
            CaseStep is designed to withstand scrutiny from FAIMER mentors, curriculum reviewers,
            and journal editors — not just to demo well.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {trust.map((t) => (
              <div key={t.title} className="card p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  {t.icon}
                </span>
                <h3 className="mt-4 font-bold text-ink-900">{t.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks + closing CTA */}
      <section className="border-t border-ink-200 bg-ink-900 text-white">
        <div className="container-page py-16">
          <h2 className="text-2xl font-bold text-white">Grounded in established frameworks</h2>
          <p className="mt-2 max-w-2xl text-ink-300">
            {site.name} is designed as a serious educational innovation, aligned with curriculum,
            assessment, and research frameworks recognised by medical educators.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {frameworks.map((f) => (
              <span
                key={f}
                className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-ink-100"
              >
                {f}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-bold text-white">See the platform in one sitting</h3>
              <p className="mt-1 text-sm text-ink-300">
                A single case, one SCT module, and the faculty dashboard are enough to show the
                whole idea.
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-wrap gap-3">
              <Link href="/cases" className="btn-primary">
                Start Learning <IconArrowRight width={16} height={16} />
              </Link>
              <Link href="/research" className="btn-secondary border-white/20 bg-transparent text-white hover:bg-white/10">
                Research &amp; Evaluation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
