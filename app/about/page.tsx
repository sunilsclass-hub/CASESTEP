import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader, Section, Badge } from '@/components/ui';
import { IconCheck, IconTarget, IconBrain, IconGlobe, IconArrowRight, IconClipboard } from '@/components/icons';

const faimerLogic = [
  { icon: <IconGlobe />, title: 'Fellowship', text: 'International FAIMER Fellowship: structured mentorship and peer review.' },
  { icon: <IconTarget />, title: 'Needs assessment', text: 'Identify the applied-reasoning gap in Community Medicine teaching.' },
  { icon: <IconBrain />, title: 'Curriculum innovation', text: 'Design and build digital case-based learning, SCT, and OSCE/OSPE modules.' },
  { icon: <IconClipboard />, title: 'Evaluation', text: 'Pilot, evaluate, and iterate using a mixed-methods design.' },
  { icon: <IconCheck />, title: 'Dissemination', text: 'Share outcomes with FAIMER, the institution, and the wider medical-education community.' },
];

export const metadata: Metadata = {
  title: 'About the Project',
  description:
    'Background, rationale, objectives and framework alignment of the CaseStep FAIMER project on digital case-based learning in Community Medicine.',
  alternates: { canonical: '/about/' },
  openGraph: { url: '/about/' },
};

const objectives = [
  'Develop and validate digital case-based learning (DCBL) modules in Community Medicine aligned with NMC CBME competencies.',
  'Enhance students’ applied clinical reasoning through branching cases and script-concordance reasoning.',
  'Integrate community-diagnosis and public-health perspectives into individual clinical cases.',
  'Assess competence using OSCE/OSPE stations with structured checklists and global rating scales.',
  'Evaluate the educational impact using a mixed-methods, implementation-science-informed design.',
];

const outcomes = [
  'Improved clinical-reasoning scores (case decisions and SCT concordance).',
  'Higher student engagement and self-reported confidence in applied reasoning.',
  'A validated, reusable bank of digital cases and assessment stations.',
  'Faculty capacity to author and facilitate digital cases.',
  'Evidence for scale-up and publication in medical-education literature.',
];

const kern = [
  ['1. Problem identification & general needs', 'Gap in applied clinical reasoning within Community Medicine teaching.'],
  ['2. Targeted needs assessment', 'Survey students and faculty; map NMC CBME competencies.'],
  ['3. Goals & objectives', 'Define competency-linked reasoning outcomes for each case.'],
  ['4. Educational strategies', 'Digital branching cases, SCT, OSCE/OSPE, reflection.'],
  ['5. Implementation', 'Pilot within the Community Medicine posting and skills lab.'],
  ['6. Evaluation & feedback', 'Mixed-methods evaluation feeding iterative improvement.'],
];

const addie = [
  ['Analyse', 'Learner and curriculum analysis; competency mapping.'],
  ['Design', 'Case blueprint, decision trees, assessment rubrics.'],
  ['Develop', 'Author digital cases, SCT items, OSCE stations.'],
  ['Implement', 'Deploy platform; run guided and self-directed sessions.'],
  ['Evaluate', 'Formative and summative evaluation; iterate.'],
];

const cbmeDomains = [
  ['Knowledge', 'Case investigations, differential reasoning, and management steps rehearse applied biomedical and public-health knowledge, not recall alone.'],
  ['Skill', 'OSCE/OSPE stations assess hands-on and interpretive skills (BP measurement, foot-risk screening, growth-chart interpretation) with weighted checklists.'],
  ['Communication', 'Counseling steps within cases and OSCE stations explicitly assess patient communication and shared understanding.'],
  ['Professionalism', 'Reflection prompts after each case cultivate self-awareness, humility about uncertainty, and a public-health orientation to individual care.'],
];

const tpack = [
  ['Technology', 'A branching digital-case engine, instant formative feedback, and analytics dashboards — chosen because they enable rehearsal and feedback at a scale lectures cannot.'],
  ['Pedagogy', 'Case-based learning, script-concordance theory, and constructive alignment (competency → activity → assessment) drive the design, not the tool.'],
  ['Content', 'NMC CBME Community Medicine competencies — NCDs, MCH, communicable disease, emergencies, occupational/environmental health — authored by a subject-matter specialist.'],
];

const constructiveAlignment = [
  {
    competency: 'Diagnose & manage Type 2 Diabetes (CM 3.4)',
    activity: 'Type 2 Diabetes digital case — branching decisions on diagnosis and first-line therapy',
    assessment: 'In-case decision scoring + SCT item on diagnostic thresholds',
    evidence: 'Case-decision accuracy; SCT concordance score',
  },
  {
    competency: 'Measure BP and counsel on hypertension (CM 3.4)',
    activity: 'Hypertension case + BP-measurement OSCE station',
    assessment: 'Weighted OSCE checklist + global rating scale',
    evidence: 'OSCE station score; examiner global rating',
  },
  {
    competency: 'Provide risk-stratified antenatal care (CM 9.x)',
    activity: 'Antenatal Care case + danger-sign counseling OSCE station',
    assessment: 'Branching decisions + OSCE checklist on danger-sign counseling',
    evidence: 'Case completion; OSCE checklist score',
  },
  {
    competency: 'Investigate an outbreak (CM 8.x)',
    activity: 'Vector-borne outbreak-investigation case',
    assessment: 'Decision points on case definition and control measures',
    evidence: 'Case-decision accuracy; reflection quality',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the Project"
        title="Integrating Digital Case-Based Learning to Enhance Clinical Reasoning in Community Medicine"
        description="A FAIMER fellowship project that reimagines how MBBS students build applied clinical reasoning — connecting the individual patient to the health of the community."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div>
              <h2 className="text-xl font-bold">Background &amp; rationale</h2>
              <p className="mt-2 leading-relaxed text-ink-700">
                Community Medicine equips future doctors to prevent disease and promote health at
                individual and population level. Yet much undergraduate teaching remains
                fact-heavy and didactic, and students often struggle to apply knowledge to real,
                uncertain clinical situations. Clinical reasoning — the cognitive process of
                gathering, interpreting and acting on information — is central to competent practice
                but is difficult to teach through lectures alone.
              </p>
              <p className="mt-3 leading-relaxed text-ink-700">
                Digital Case-Based Learning offers a scalable, engaging way to practise reasoning
                repeatedly and safely. Interactive branching cases, script-concordance items and
                structured feedback let students rehearse the judgement clinicians use every day,
                while embedding the public-health lens that defines Community Medicine.
              </p>
            </div>

            <div className="rounded-2xl border border-accent-400/40 bg-accent-400/10 p-5">
              <h3 className="flex items-center gap-2 font-bold text-ink-900">
                <IconTarget width={18} height={18} className="text-accent-600" /> Problem statement
              </h3>
              <p className="mt-2 leading-relaxed text-ink-700">
                There is a need to strengthen <strong>applied clinical reasoning</strong> in
                Community Medicine, moving beyond knowledge recall to competent, context-aware
                decision-making that integrates clinical and community perspectives — in a form that
                is engaging, standardised, and measurable.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold">Project objectives</h2>
              <ul className="mt-3 space-y-2.5">
                {objectives.map((o) => (
                  <li key={o} className="flex gap-2.5 text-ink-700">
                    <IconCheck width={18} height={18} className="mt-0.5 flex-shrink-0 text-brand-500" />
                    <span className="leading-relaxed">{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold">Expected outcomes</h2>
              <ul className="mt-3 space-y-2.5">
                {outcomes.map((o) => (
                  <li key={o} className="flex gap-2.5 text-ink-700">
                    <IconCheck width={18} height={18} className="mt-0.5 flex-shrink-0 text-brand-500" />
                    <span className="leading-relaxed">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="card p-5">
              <h3 className="flex items-center gap-2 font-bold">
                <IconTarget width={18} height={18} className="text-brand-600" /> FAIMER alignment
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                Developed within the International FAIMER Fellowship, the project applies structured
                curriculum development, scholarly educational research, and a leadership-and-change
                approach to a real institutional need — with mentorship and peer review built in.
              </p>
            </div>
            <div className="card p-5">
              <h3 className="flex items-center gap-2 font-bold">
                <IconCheck width={18} height={18} className="text-brand-600" /> NMC CBME alignment
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                Each case is mapped to NMC Competency-Based Medical Education competencies, embedding
                the domains of Knowledge, Skills, Communication, and Professionalism, and supporting
                competency-based assessment through OSCE/OSPE.
              </p>
            </div>
            <div className="card p-5">
              <h3 className="flex items-center gap-2 font-bold">
                <IconBrain width={18} height={18} className="text-brand-600" /> Educational innovation
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                Combines branching digital cases, script-concordance testing, reflective practice
                and analytics into one platform — a novel, integrated approach to teaching reasoning
                in Community Medicine.
              </p>
            </div>
            <div className="card p-5">
              <h3 className="flex items-center gap-2 font-bold">
                <IconGlobe width={18} height={18} className="text-brand-600" /> TPACK
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                Intentionally integrates <strong>Technology</strong>, <strong>Pedagogy</strong>, and{' '}
                <strong>Content</strong> knowledge — digital tools chosen to serve sound teaching of
                specific Community Medicine content.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      {/* Clinical reasoning pathway */}
      <Section
        title="The clinical reasoning pathway"
        description="Every module — case, SCT item, or OSCE/OSPE station — rehearses the same underlying pathway."
        className="border-t border-ink-200"
      >
        <Image
          src="/media/home/learning-pathway.svg"
          alt="Visual learning pathway: Scenario, Reasoning, Decision, Feedback, Reflection, Assessment"
          width={640}
          height={220}
          className="mx-auto w-full max-w-3xl"
        />
      </Section>

      {/* Kern + ADDIE */}
      <Section title="Curriculum development frameworks" className="border-t border-ink-200">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Badge tone="brand">Kern’s 6-Step Model</Badge>
            </div>
            <ol className="space-y-3">
              {kern.map(([step, text]) => (
                <li key={step} className="card p-4">
                  <p className="font-semibold text-ink-900">{step}</p>
                  <p className="mt-1 text-sm text-ink-600">{text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Badge tone="brand">ADDIE Model</Badge>
            </div>
            <ol className="space-y-3">
              {addie.map(([step, text]) => (
                <li key={step} className="card p-4">
                  <p className="font-semibold text-ink-900">{step}</p>
                  <p className="mt-1 text-sm text-ink-600">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* NMC CBME domain alignment */}
      <Section title="NMC CBME domain alignment" description="How each competency domain is addressed by the platform's activities." className="border-t border-ink-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink-200 text-xs uppercase tracking-wide text-ink-500">
                <th className="w-40 py-2 pr-4">Domain</th>
                <th className="py-2">How CaseStep addresses it</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {cbmeDomains.map(([domain, text]) => (
                <tr key={domain} className="tr-hover">
                  <td className="py-3 pr-4 align-top font-semibold text-ink-900">{domain}</td>
                  <td className="py-3 align-top text-ink-700">{text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* TPACK */}
      <Section title="TPACK — technology in service of pedagogy and content" className="border-t border-ink-200">
        <div className="grid gap-4 sm:grid-cols-3">
          {tpack.map(([k, text]) => (
            <div key={k} className="card p-5">
              <Badge tone="brand">{k}</Badge>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAIMER project logic */}
      <Section
        title="FAIMER project logic"
        description="How the fellowship structure translates into this platform, end to end."
        className="border-t border-ink-200"
      >
        <ol className="grid gap-3 sm:grid-cols-5">
          {faimerLogic.map((s, i) => (
            <li key={s.title} className="card-interactive relative p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
                {s.icon}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-ink-900">{s.title}</h3>
              <p className="mt-1 text-xs leading-snug text-ink-500">{s.text}</p>
              {i < faimerLogic.length - 1 && (
                <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-ink-300 sm:block" aria-hidden>
                  <IconArrowRight width={14} height={14} />
                </span>
              )}
            </li>
          ))}
        </ol>
      </Section>

      {/* Constructive alignment */}
      <Section
        title="Constructive alignment"
        description="Competency, learning activity, assessment, and evidence are deliberately linked for every module — illustrative examples below."
        className="border-t border-ink-200"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink-200 text-xs uppercase tracking-wide text-ink-500">
                <th className="py-2 pr-4">Competency</th>
                <th className="py-2 pr-4">Learning activity</th>
                <th className="py-2 pr-4">Assessment</th>
                <th className="py-2">Evidence collected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {constructiveAlignment.map((row) => (
                <tr key={row.competency} className="tr-hover">
                  <td className="py-3 pr-4 align-top font-medium text-ink-900">{row.competency}</td>
                  <td className="py-3 pr-4 align-top text-ink-700">{row.activity}</td>
                  <td className="py-3 pr-4 align-top text-ink-700">{row.assessment}</td>
                  <td className="py-3 align-top text-ink-700">{row.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
