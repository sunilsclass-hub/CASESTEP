import type { Metadata } from 'next';
import { PageHeader, Section, Badge, PlaceholderNote } from '@/components/ui';
import { IconChart, IconUsers, IconBook, IconCheck, IconLock, IconArrowRight } from '@/components/icons';
import {
  studyOverview,
  design,
  kirkpatrick,
  logicModel,
  evaluationMatrix,
  ethics,
  limitations,
  scaleUpPlan,
  scholarlyOutputs,
} from '@/data/research';

export const metadata: Metadata = {
  title: 'Research & Evaluation',
  description:
    'Study design, aims, participants, outcome measures, Kirkpatrick evaluation, logic model, ethics, limitations, and scale-up plan for the CaseStep FAIMER project.',
  alternates: { canonical: '/research/' },
  openGraph: { url: '/research/' },
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
    text: 'Panel of experts rates candidate cases across seven dimensions (relevance, validity, feasibility, CBME alignment, reasoning authenticity, feedback quality, community integration) across iterative rounds to a defined consensus threshold.',
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

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research & Evaluation"
        title="A scholarly, mixed-methods design"
        description="CaseStep is built as an educational research project — from needs assessment and expert consensus to a piloted, evaluated intervention informed by implementation science."
      />

      {/* Aim, objectives, background/problem/innovation */}
      <Section title="Study overview">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="card p-5">
              <p className="text-sm font-medium text-ink-500">Background</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-700">{studyOverview.background}</p>
            </div>
            <div className="card p-5">
              <p className="text-sm font-medium text-ink-500">Educational problem</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-700">{studyOverview.problem}</p>
            </div>
            <div className="card p-5">
              <p className="text-sm font-medium text-ink-500">Innovation</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-700">{studyOverview.innovation}</p>
            </div>
          </div>
          <div className="card p-5">
            <p className="text-sm font-medium text-ink-500">Aim</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-ink-900">{studyOverview.aim}</p>
            <p className="mt-4 text-sm font-medium text-ink-500">Objectives</p>
            <ul className="mt-2 space-y-2">
              {studyOverview.objectives.map((o) => (
                <li key={o} className="flex gap-2 text-sm text-ink-700">
                  <IconCheck width={16} height={16} className="mt-0.5 flex-shrink-0 text-brand-500" /> {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Design, participants, intervention, comparator, outcome measures */}
      <Section title="Study design" className="border-t border-ink-200">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="card p-5">
            <p className="text-sm font-medium text-ink-500">Design</p>
            <p className="mt-1 text-sm font-semibold text-ink-900">{design.type}</p>
          </div>
          <div className="card p-5">
            <p className="text-sm font-medium text-ink-500">Participants</p>
            <p className="mt-1 text-sm text-ink-700">{design.participants}</p>
          </div>
          <div className="card p-5">
            <p className="text-sm font-medium text-ink-500">Intervention</p>
            <p className="mt-1 text-sm text-ink-700">{design.intervention}</p>
          </div>
          <div className="card p-5">
            <p className="text-sm font-medium text-ink-500">Comparator / control</p>
            <p className="mt-1 text-sm text-ink-700">{design.comparator}</p>
          </div>
        </div>
        <div className="mt-4 card p-5">
          <p className="text-sm font-medium text-ink-500">Outcome measures</p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {design.outcomeMeasures.map((o) => (
              <li key={o} className="flex gap-2 text-sm text-ink-700">
                <IconCheck width={16} height={16} className="mt-0.5 flex-shrink-0 text-brand-500" /> {o}
              </li>
            ))}
          </ul>
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

      {/* Kirkpatrick mapping */}
      <Section title="Kirkpatrick evaluation mapping" className="border-t border-ink-200">
        <div className="mb-6 flex flex-col items-center gap-1.5">
          {kirkpatrick.map((row, i) => (
            <div
              key={row.level}
              className="flex items-center justify-center rounded-lg bg-brand-600 py-2 text-center text-xs font-semibold text-white"
              style={{ width: `${100 - i * 16}%`, opacity: 0.65 + i * 0.09 }}
            >
              {row.level}
            </div>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink-200 text-xs uppercase tracking-wide text-ink-500">
                <th className="py-2 pr-4">Level</th>
                <th className="py-2 pr-4">What is measured</th>
                <th className="py-2">Tool</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {kirkpatrick.map((row) => (
                <tr key={row.level} className="tr-hover">
                  <td className="py-3 pr-4 align-top font-semibold text-ink-900">{row.level}</td>
                  <td className="py-3 pr-4 align-top text-ink-700">{row.measure}</td>
                  <td className="py-3 align-top text-ink-700">{row.tool}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Logic model */}
      <Section
        title="Logic model"
        description="A planned, illustrative program logic — Inputs flow through Activities and Outputs to the Outcomes and Impact the project aims to demonstrate."
        className="border-t border-ink-200"
      >
        <div className="grid gap-3 sm:grid-cols-5">
          {(
            [
              ['Inputs', logicModel.inputs],
              ['Activities', logicModel.activities],
              ['Outputs', logicModel.outputs],
              ['Outcomes', logicModel.outcomes],
              ['Impact', logicModel.impact],
            ] as const
          ).map(([label, items], i, arr) => (
            <div key={label} className="relative card p-4">
              <Badge tone="brand">{label}</Badge>
              <ul className="mt-3 space-y-1.5">
                {items.map((it) => (
                  <li key={it} className="text-xs leading-relaxed text-ink-700">
                    {it}
                  </li>
                ))}
              </ul>
              {i < arr.length - 1 && (
                <span
                  className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 text-ink-300 sm:block"
                  aria-hidden
                >
                  <IconArrowRight width={14} height={14} />
                </span>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Evaluation matrix */}
      <Section title="Evaluation matrix" className="border-t border-ink-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink-200 text-xs uppercase tracking-wide text-ink-500">
                <th className="py-2 pr-4">Objective</th>
                <th className="py-2 pr-4">Data source</th>
                <th className="py-2 pr-4">Method</th>
                <th className="py-2">Timing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {evaluationMatrix.map((row) => (
                <tr key={row.objective} className="tr-hover">
                  <td className="py-3 pr-4 align-top font-medium text-ink-900">{row.objective}</td>
                  <td className="py-3 pr-4 align-top text-ink-700">{row.dataSource}</td>
                  <td className="py-3 pr-4 align-top text-ink-700">{row.method}</td>
                  <td className="py-3 align-top text-ink-700">{row.timing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Ethics & data privacy */}
      <Section title="Ethical considerations & data privacy" className="border-t border-ink-200">
        <div className="card p-6">
          <div className="mb-3 flex items-center gap-2">
            <IconLock width={18} height={18} className="text-brand-600" />
            <h3 className="font-bold">Commitments</h3>
          </div>
          <ul className="space-y-2">
            {ethics.map((e) => (
              <li key={e} className="flex gap-2 text-sm text-ink-700">
                <IconCheck width={16} height={16} className="mt-0.5 flex-shrink-0 text-brand-500" /> {e}
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg border border-ink-200 bg-ink-50 p-4 text-sm">
            <p className="font-semibold text-ink-900">Institutional Ethics Committee</p>
            <p className="mt-1 text-ink-700">
              Approval will be sought from the{' '}
              <a
                href="https://jssuni.edu.in/jssaher/medical-college/mc-iec-home.html"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                Institutional Ethics Committee, JSS Medical College (IEC, JSSMC)
              </a>
              , which is:
            </p>
            <ul className="mt-2 space-y-1 text-ink-600">
              <li>
                Re-Registered vide No. ECR/387/Inst/KA/2013/RR-22 under Rule 122DD of the Drugs &amp;
                Cosmetics Rules 1945, CDSCO
              </li>
              <li>NECRBHR-registered: EC/NEW/INST/2021/2254</li>
              <li>NABH-accredited: Certificate No. E-CT-2018-0018 (re-accredited April 2024–April 2027)</li>
            </ul>
          </div>
          <PlaceholderNote>
            The registration/accreditation numbers above identify the committee itself, not a
            study-specific approval. No study-specific ethics-approval number is quoted anywhere on
            this platform; one will be obtained from the IEC, and cited here, before any real
            participant data are collected.
          </PlaceholderNote>
        </div>
      </Section>

      {/* Limitations & mitigation */}
      <Section title="Limitations & mitigation strategies" className="border-t border-ink-200">
        <div className="grid gap-4 sm:grid-cols-2">
          {limitations.map((l) => (
            <div key={l.limitation} className="card p-5">
              <p className="text-sm font-semibold text-ink-900">{l.limitation}</p>
              <p className="mt-2 text-sm text-ink-600">
                <span className="font-medium text-ink-700">Mitigation: </span>
                {l.mitigation}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Scale-up plan */}
      <Section title="Scale-up plan" className="border-t border-ink-200">
        <div className="card p-6">
          <ol className="space-y-2">
            {scaleUpPlan.map((s, i) => (
              <li key={s} className="flex gap-3 text-sm text-ink-700">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Publications & manuscripts */}
      <Section title="Expected scholarly outputs" className="border-t border-ink-200">
        <div className="card p-6">
          <div className="mb-3 flex items-center gap-2">
            <IconBook width={18} height={18} className="text-brand-600" />
            <h3 className="font-bold">Dissemination plan</h3>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
            {scholarlyOutputs.map((o, i) => (
              <div key={o.title} className="flex flex-1 items-center gap-3">
                <div className="flex-1 rounded-lg border border-ink-200 p-3 text-sm text-ink-700">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                    {i + 1}
                  </span>
                  <p className="mt-2">
                    <span className="font-semibold text-ink-800">{o.title} (planned): </span>
                    {o.text}
                  </p>
                </div>
                {i < scholarlyOutputs.length - 1 && (
                  <span className="hidden flex-shrink-0 text-ink-300 lg:block" aria-hidden>
                    <IconArrowRight width={16} height={16} />
                  </span>
                )}
              </div>
            ))}
          </div>
          <PlaceholderNote>
            Publication details, DOIs and links will be added here as outputs are produced.
          </PlaceholderNote>
        </div>
      </Section>

      {/* Evaluation tools summary (quant/qual) */}
      <Section title="Evaluation tools at a glance" className="border-t border-ink-200">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h3 className="flex items-center gap-2 font-bold">
              <IconChart width={18} height={18} className="text-brand-600" /> Quantitative outcomes
            </h3>
            <ul className="mt-3 space-y-2">
              {design.outcomeMeasures.slice(0, 5).map((t) => (
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
              {[
                'Semi-structured student interviews / focus groups',
                'Open-ended reflection analysis (thematic)',
                'Faculty facilitator feedback',
                'Expert (Delphi) qualitative suggestions',
              ].map((t) => (
                <li key={t} className="flex gap-2 text-sm text-ink-700">
                  <IconCheck width={16} height={16} className="mt-0.5 flex-shrink-0 text-brand-500" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
