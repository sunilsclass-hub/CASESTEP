/**
 * Structured content for the Research & Evaluation page.
 *
 * Kept as data (not hard-coded JSX) so it is easy to review, cite, and revise
 * as the protocol matures — e.g. once ethics approval and the finalised
 * evaluation plan are in hand. Everything here is illustrative/planned; no
 * real results, ethics numbers, or participant data are included.
 */

export const studyOverview = {
  title:
    'Integrating Digital Case-Based Learning to Enhance Clinical Reasoning in Community Medicine',
  background:
    'Community Medicine teaching often remains fact-heavy and didactic, leaving a gap between knowledge and applied, context-aware clinical reasoning — the skill undergraduate assessment and practice ultimately demand.',
  problem:
    'There is no structured, scalable way for MBBS students in this setting to repeatedly rehearse applied clinical reasoning that integrates individual patient care with a community/public-health lens, with standardised, measurable feedback.',
  innovation:
    'CaseStep: branching digital cases, Script Concordance Testing, and OSCE/OSPE stations combined in one platform, explicitly designed against Kern’s 6-step model, ADDIE, and TPACK, and validated through expert (Delphi) review.',
  aim: 'To develop, validate, and pilot-evaluate a digital case-based learning platform that measurably strengthens applied clinical reasoning among MBBS students in Community Medicine.',
  objectives: [
    'Conduct a targeted needs assessment of students and faculty against NMC CBME reasoning competencies.',
    'Develop and Delphi-validate a bank of digital cases, SCT items, and OSCE/OSPE stations.',
    'Pilot the platform within the Community Medicine posting.',
    'Evaluate its effect on clinical-reasoning outcomes using a mixed-methods design.',
    'Disseminate findings to inform scale-up within the institution and beyond.',
  ],
};

export const design = {
  type: 'Mixed-methods, quasi-experimental (single-arm pre/post) with a preceding development & validation phase.',
  participants:
    'MBBS students in the Community Medicine clinical posting (illustrative cohort size: ~50/batch); Community Medicine faculty as facilitators; external subject/assessment experts for Delphi validation.',
  intervention:
    'Structured use of the CaseStep platform (digital cases, SCT, OSCE/OSPE practice) integrated into the existing posting schedule, alongside usual teaching.',
  comparator:
    'Within-subject pre/post comparison (each student is their own control) in the pilot phase; a parallel-group comparison against a standard-teaching cohort is a possible extension once resources allow — not assumed at this stage.',
  outcomeMeasures: [
    'Case branching-decision accuracy (per case and pooled).',
    'Script Concordance Test concordance score against the expert panel.',
    'OSCE/OSPE checklist and global-rating scores.',
    'Pre/post confidence and self-reported reasoning-skill ratings.',
    'Engagement analytics: completion rate, time-on-task, reflection submission.',
    'Qualitative themes from reflections, focus groups, and faculty feedback.',
  ],
};

export const kirkpatrick = [
  {
    level: 'Level 1 — Reaction',
    measure: 'Student satisfaction and engagement with the platform.',
    tool: 'Post-module feedback survey; engagement analytics (completion, time-on-task).',
  },
  {
    level: 'Level 2 — Learning',
    measure: 'Change in clinical-reasoning knowledge/skill.',
    tool: 'Pre/post SCT concordance; OSCE/OSPE scores; case-decision accuracy.',
  },
  {
    level: 'Level 3 — Behaviour',
    measure: 'Transfer to applied reasoning in subsequent clinical/skills settings.',
    tool: 'Facilitator-observed reasoning during ward-based/skills-lab encounters (planned); reflective-practice quality.',
  },
  {
    level: 'Level 4 — Results',
    measure: 'Broader curricular/programmatic impact.',
    tool: 'Uptake across batches; faculty adoption; contribution to programme-level CBME assessment evidence (longer-term, aspirational).',
  },
];

export const logicModel = {
  inputs: [
    'FAIMER fellowship time & mentorship',
    'Community Medicine faculty expertise',
    'External expert (Delphi) panel',
    'Digital platform (CaseStep)',
  ],
  activities: [
    'Needs assessment',
    'Case/SCT/OSCE authoring',
    'Delphi validation',
    'Pilot deployment in the posting',
    'Mixed-methods evaluation',
  ],
  outputs: [
    'Validated digital case bank (11 topics)',
    'SCT item bank',
    'OSCE/OSPE station bank',
    'Evaluation dataset & reports',
  ],
  outcomes: [
    'Improved applied clinical-reasoning scores',
    'Higher engagement & confidence',
    'Faculty capacity to author digital cases',
  ],
  impact: [
    'Stronger CBME-aligned reasoning competence at graduation',
    'A reusable, scalable model for other departments',
  ],
};

export const evaluationMatrix = [
  {
    objective: 'Validate case content and design',
    dataSource: 'Expert (Delphi) review — relevance, validity, feasibility, CBME alignment, feedback quality, community integration',
    method: 'Modified Delphi, 2 rounds; median/IQR & % agreement',
    timing: 'Before pilot deployment',
  },
  {
    objective: 'Assess change in clinical reasoning',
    dataSource: 'SCT scores, case-decision accuracy, OSCE/OSPE scores',
    method: 'Pre/post comparison; descriptive & inferential statistics as appropriate',
    timing: 'Start and end of the posting',
  },
  {
    objective: 'Understand learner experience',
    dataSource: 'Reflections, focus-group discussions',
    method: 'Thematic analysis',
    timing: 'End of posting',
  },
  {
    objective: 'Understand facilitator experience',
    dataSource: 'Faculty feedback interviews/survey',
    method: 'Thematic analysis / descriptive summary',
    timing: 'End of pilot',
  },
  {
    objective: 'Monitor engagement & usability',
    dataSource: 'Platform analytics (completion, time-on-task)',
    method: 'Descriptive analytics',
    timing: 'Throughout the pilot',
  },
];

export const ethics = [
  'Ethics committee approval will be obtained before any real student or expert data are collected; the current build uses no real participant data.',
  'Participation will be voluntary with informed consent; non-participation will not disadvantage any student academically.',
  'No patient-identifiable data are used anywhere in the platform — all clinical cases are synthetic/composite teaching scenarios.',
  'Student performance data collected during a real pilot will be de-identified for analysis and reported only in aggregate.',
  'Any future database (e.g. Supabase) will apply authentication and row-level security so learners can access only their own records; policy details are documented in supabase/schema.sql.',
];

export const limitations = [
  {
    limitation: 'Single-institution, single-arm pilot limits generalisability.',
    mitigation: 'Report findings as a pilot/feasibility study; plan a multi-site or comparator-arm extension for scale-up.',
  },
  {
    limitation: 'Illustrative SCT expert-panel keys are placeholders until a real panel completes scoring.',
    mitigation: 'Run a dedicated expert-panel SCT scoring exercise as part of Delphi validation before using scores for high-stakes decisions.',
  },
  {
    limitation: 'Self-reported confidence may not equal demonstrated competence.',
    mitigation: 'Triangulate with objective measures (OSCE scores, case-decision accuracy) rather than relying on self-report alone.',
  },
  {
    limitation: 'Novelty effect may inflate early engagement metrics.',
    mitigation: 'Track engagement across multiple cohorts/terms rather than a single pilot window.',
  },
];

export const scaleUpPlan = [
  'Expand from the pilot batch to all Community Medicine postings at the institution.',
  'Extend the validated case-authoring workflow to other departments (e.g. Medicine, Paediatrics) using the same schema.',
  'Formalise the expert panel and complete Round 2 Delphi validation for all 11 case topics.',
  'Integrate a database backend (Supabase, already scaffolded) for real multi-cohort analytics.',
  'Pursue inter-institutional collaboration once single-site feasibility is demonstrated.',
];

export const scholarlyOutputs = [
  { title: 'Needs-assessment paper', text: 'Gaps in applied clinical reasoning among MBBS students in Community Medicine — a mixed-methods needs assessment.' },
  { title: 'Delphi validation paper', text: 'Development and expert consensus validation of a digital case bank for Community Medicine.' },
  { title: 'Module development report', text: 'An ADDIE/Kern-informed process for authoring digital case-based learning modules.' },
  { title: 'Pilot evaluation paper', text: 'Effect of a digital case-based learning platform on clinical reasoning — a mixed-methods pilot.' },
  { title: 'Educational innovation report / FAIMER poster', text: 'CaseStep as a scalable model for digital case-based learning in Community Medicine.' },
];
