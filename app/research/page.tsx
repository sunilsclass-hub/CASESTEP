import type { Metadata } from 'next';
import { PageHeader, Section, Badge, PlaceholderNote } from '@/components/ui';
import { IconChart, IconUsers, IconBook, IconCheck } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Research & Evaluation',
  description:
    'Study design, needs assessment, Delphi consensus, module development, pilot implementation, evaluation tools, and outcomes for the CaseStep FAIMER project.',
};

const phases = [
  {
    n: '01',
    title: 'Needs assessment',
    text: 'Survey MBBS students and Community Medicine faculty; map gaps in applied clinical reasoning against NMC CBME competencies.',
    method: 'Cross-sectional survey · competency mapping',
  },
  {
    n: '02',
    title: 'Delphi consensus',
    text: 'Panel of experts rates candidate cases for relevance, content validity, and feasibility across iterative rounds to a defined consensus threshold.',
    method: 'Modified Delphi · median/IQR & % agreement',
  },
  {
    n: '03',
    title: 'Module development',
    text: 'Author digital branching cases, SCT items, and OSCE/OSPE stations using ADDIE and Kern’s model; align with TPACK.',
    method: 'Instructional design · blueprinting',
  },
  {
    n: '04',
    title: 'Pilot implementation',
    text: 'Deploy the platform in the Community Medicine posting; run guided and self-directed sessions with the student cohort.',
    method: 'Implementation science · fidelity monitoring',
  },
  {
    n: '05',
    title: 'Evaluation',
    text: 'Assess reasoning outcomes, engagement, and satisfaction using validated tools and qualitative feedback; iterate.',
    method: 'Mixed-methods · pre/post · thematic analysis',
  },
];

const quantTools = [
  'Clinical-reasoning case-decision accuracy (branching)',
  'Script Concordance Test concordance scores',
  'OSCE/OSPE checklist and global-rating scores',
  'Pre/post knowledge and confidence scales',
  'Engagement analytics (completion, time-on-task)',
];

const qualTools = [
  'Semi-structured student interviews / focus groups',
  'Open-ended reflection analysis (thematic)',
  'Faculty facilitator feedback',
  'Expert (Delphi) qualitative suggestions',
];

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research & Evaluation"
        title="A scholarly, mixed-methods design"
        description="CaseStep is built as an educational research project — from needs assessment and expert consensus to a piloted, evaluated intervention informed by implementation science."
      />

      <Section title="Study design at a glance">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="card p-5">
            <p className="text-sm font-medium text-ink-500">Design</p>
            <p className="mt-1 font-semibold text-ink-900">Mixed-methods, quasi-experimental (pre/post) with a development &amp; validation phase.</p>
          </div>
          <div className="card p-5">
            <p className="text-sm font-medium text-ink-500">Setting &amp; participants</p>
            <p className="mt-1 font-semibold text-ink-900">MBBS students in the Community Medicine posting; faculty and external experts.</p>
          </div>
          <div className="card p-5">
            <p className="text-sm font-medium text-ink-500">Frameworks</p>
            <p className="mt-1 font-semibold text-ink-900">Kern · ADDIE · TPACK · Implementation science · Clinical-reasoning theory.</p>
          </div>
        </div>
      </Section>

      <Section title="Research phases" className="border-t border-ink-200">
        <ol className="relative space-y-5 border-l-2 border-brand-100 pl-6">
          {phases.map((p) => (
            <li key={p.n} className="relative">
              <span className="absolute -left-[34px] flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                {p.n}
              </span>
              <div className="card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-ink-900">{p.title}</h3>
                  <Badge tone="brand">{p.method}</Badge>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Evaluation tools" className="border-t border-ink-200">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h3 className="flex items-center gap-2 font-bold">
              <IconChart width={18} height={18} className="text-brand-600" /> Quantitative outcomes
            </h3>
            <ul className="mt-3 space-y-2">
              {quantTools.map((t) => (
                <li key={t} className="flex gap-2 text-sm text-ink-700">
                  <IconCheck width={16} height={16} className="mt-0.5 flex-shrink-0 text-brand-500" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="flex items-center gap-2 font-bold">
              <IconUsers width={18} height={18} className="text-brand-600" /> Qualitative feedback
            </h3>
            <ul className="mt-3 space-y-2">
              {qualTools.map((t) => (
                <li key={t} className="flex gap-2 text-sm text-ink-700">
                  <IconCheck width={16} height={16} className="mt-0.5 flex-shrink-0 text-brand-500" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Publications & manuscripts" className="border-t border-ink-200">
        <div className="card p-6">
          <div className="mb-3 flex items-center gap-2">
            <IconBook width={18} height={18} className="text-brand-600" />
            <h3 className="font-bold">Dissemination plan</h3>
          </div>
          <ul className="space-y-3 text-sm text-ink-700">
            <li className="rounded-lg border border-ink-200 p-3">
              <span className="font-semibold text-ink-800">Manuscript 1 (planned): </span>
              Development and Delphi validation of digital case-based learning modules in Community
              Medicine.
            </li>
            <li className="rounded-lg border border-ink-200 p-3">
              <span className="font-semibold text-ink-800">Manuscript 2 (planned): </span>
              Effect of digital case-based learning on clinical reasoning — a mixed-methods pilot.
            </li>
            <li className="rounded-lg border border-ink-200 p-3">
              <span className="font-semibold text-ink-800">Conference abstracts: </span>
              FAIMER, medical-education and public-health conferences.
            </li>
          </ul>
          <PlaceholderNote>
            Publication details, DOIs and links will be added here as outputs are produced.
          </PlaceholderNote>
        </div>
      </Section>
    </>
  );
}
