import Link from 'next/link';
import { CTALink, Badge } from '@/components/ui';
import { CaseCard } from '@/components/CaseCard';
import { getReadyCases } from '@/data/cases';
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
} from '@/components/icons';

const journey = [
  { icon: <IconStethoscope />, title: 'Encounter the case', text: 'Read a realistic community-medicine patient scenario.' },
  { icon: <IconClipboard />, title: 'Gather & examine', text: 'Work through history, examination, and investigations.' },
  { icon: <IconBrain />, title: 'Decide & reason', text: 'Make branching decisions and get instant feedback.' },
  { icon: <IconGlobe />, title: 'Think community', text: 'Translate the case into public-health action.' },
  { icon: <IconCheck />, title: 'Reflect & consolidate', text: 'Reflect, review key points, track your growth.' },
];

const features = [
  { icon: <IconStethoscope />, title: 'Digital Case Library', text: 'Structured, branching cases across NCDs, MCH, communicable disease and outbreaks.', href: '/cases' },
  { icon: <IconBrain />, title: 'Script Concordance Test', text: 'Probe clinical reasoning under uncertainty against an expert panel.', href: '/sct' },
  { icon: <IconClipboard />, title: 'OSCE / OSPE Prep', text: 'Weighted checklists, global rating scales, and printable rubrics.', href: '/osce' },
  { icon: <IconChart />, title: 'Dashboards & Analytics', text: 'Student progress and faculty-level cohort insights.', href: '/dashboard/student' },
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

export default function HomePage() {
  const ready = getReadyCases();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-200 bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="container-page grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div className="animate-fade-in">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold text-brand-700">
              <IconTarget width={14} height={14} /> {site.program}
            </div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Enhancing{' '}
              <span className="text-brand-600">Clinical Reasoning</span> in Community Medicine
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
              {site.name} delivers digital, case-based learning for MBBS students — structured
              cases, branching decisions, script-concordance reasoning, and OSCE/OSPE practice that
              turn knowledge into applied clinical judgement.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTALink href="/cases">
                Start Learning <IconArrowRight width={16} height={16} />
              </CTALink>
              <CTALink href="/cases" variant="secondary">
                View Cases
              </CTALink>
              <CTALink href="/dashboard/faculty" variant="secondary">
                Faculty Dashboard
              </CTALink>
              <CTALink href="/about" variant="ghost">
                About the Project
              </CTALink>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              <div>
                <dt className="text-3xl font-bold text-ink-900">11</dt>
                <dd className="text-sm text-ink-500">Case topics</dd>
              </div>
              <div>
                <dt className="text-3xl font-bold text-ink-900">2</dt>
                <dd className="text-sm text-ink-500">SCT modules</dd>
              </div>
              <div>
                <dt className="text-3xl font-bold text-ink-900">3</dt>
                <dd className="text-sm text-ink-500">OSCE/OSPE stations</dd>
              </div>
            </dl>
          </div>

          {/* Hero card mock */}
          <div className="animate-fade-in lg:justify-self-end">
            <div className="card w-full max-w-md p-6">
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

      {/* What is DCBL */}
      <section className="container-page py-14">
        <div className="grid gap-8 lg:grid-cols-3">
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
              <Link
                key={f.title}
                href={f.href}
                className="card group p-5 transition hover:-translate-y-0.5 hover:shadow-cardhover"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  {f.icon}
                </span>
                <h3 className="mt-3 font-bold text-ink-900">{f.title}</h3>
                <p className="mt-1 text-sm text-ink-600">{f.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Learning journey */}
      <section className="border-y border-ink-200 bg-white">
        <div className="container-page py-14">
          <h2 className="text-2xl font-bold">The stepwise learning journey</h2>
          <p className="mt-2 max-w-2xl text-ink-600">
            Every case follows a consistent, evidence-informed path — mirroring how clinical
            reasoning develops from encounter to reflection.
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {journey.map((s, i) => (
              <li key={s.title} className="relative card p-5">
                <span className="absolute right-4 top-4 text-3xl font-bold text-ink-100">
                  {i + 1}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
                  {s.icon}
                </span>
                <h3 className="mt-3 font-semibold text-ink-900">{s.title}</h3>
                <p className="mt-1 text-sm text-ink-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Featured cases */}
      <section className="container-page py-14">
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
          {ready.map((c) => (
            <CaseCard key={c.slug} case={c} />
          ))}
        </div>
      </section>

      {/* Frameworks */}
      <section className="border-t border-ink-200 bg-ink-900 text-white">
        <div className="container-page py-14">
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
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/research" className="btn-primary">
              Research &amp; Evaluation
            </Link>
            <Link href="/about" className="btn-secondary border-white/20 bg-transparent text-white hover:bg-white/10">
              About the Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
