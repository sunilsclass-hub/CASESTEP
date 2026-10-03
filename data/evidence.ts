/**
 * Evidence base for CaseStep — single source of truth for the figures shown on
 * the homepage evidence strip and the Research page.
 *
 * Every figure here is drawn from (a) the peer-reviewed precursor study
 * published in BMC Medical Education (2026), (b) the completed needs
 * assessment and modified Delphi study, or (c) the ICMR ePMS status of the
 * next-phase proposal. Keep wording proportional to the data: the precursor
 * study established feasibility and acceptability, not overall effectiveness.
 * Planned next-phase figures are design targets, not results.
 */

export type EvidenceStatus = 'Published' | 'Completed' | 'Approved' | 'Live' | 'Planned';

export const ethicsStatement =
  'Approved by the Institutional Ethics Committee, JSS Medical College.';

/** Four headline figures for the homepage strip and Research page. */
export const headlineEvidence = [
  {
    value: '906',
    label: 'needs-assessment responses',
    note: 'Completed study',
    status: 'Completed' as EvidenceStatus,
  },
  {
    value: '271',
    label: 'MBBS learners in the peer-reviewed precursor study',
    note: 'BMC Medical Education, 2026',
    status: 'Published' as EvidenceStatus,
  },
  {
    value: '82.6%',
    label: 'of design elements reached expert consensus',
    note: '19 of 23 · modified Delphi',
    status: 'Completed' as EvidenceStatus,
  },
  {
    value: 'ICMR–NMC',
    label: 'multicentre next phase',
    note: 'Listed as Approved on ICMR ePMS · Sept 2026',
    status: 'Approved' as EvidenceStatus,
  },
];

export const publication = {
  authors: 'Sunil Kumar D, Dandekar S, Prakash GH.',
  title:
    'Dynamic CBME in action: rule-based digital case-based learning to evaluate antibiotic-stewardship reasoning in MBBS learners.',
  journal: 'BMC Medical Education',
  year: '2026',
  volume: '26',
  article: '1445',
  doi: '10.1186/s12909-026-09810-7',
  url: 'https://doi.org/10.1186/s12909-026-09810-7',
};

export const completedStudies = [
  {
    status: 'Completed' as EvidenceStatus,
    statusNote: 'Manuscript not yet published',
    title: 'Needs assessment',
    summary:
      'A needs assessment conducted during CaseStep’s development documented a strong learner preference for experiential and case-based learning and substantial interest in digital case scenarios.',
    figures: [
      { value: '906', label: 'responses' },
      { value: '64.6%', label: 'selected clinical postings / field visits' },
      { value: '48.9%', label: 'selected case-based learning' },
      { value: '48.0%', label: 'rated interest in digital cases 4–5 of 5' },
    ],
  },
  {
    status: 'Published' as EvidenceStatus,
    statusNote: 'Peer-reviewed',
    title: 'Precursor evaluation — rule-based digital case-based learning',
    summary:
      'A precursor rule-based digital case intervention was evaluated in a quasi-experimental, single-group pre/post study. In one 45–60-minute session, learners completed three branching antibiotic-stewardship micro-cases (URTI, UTI, acute watery diarrhoea), parallel pre/post Script Concordance Tests, and usability and workload measures.',
    figures: [
      { value: '271', label: 'MBBS learners with paired data' },
      { value: '76.0%', label: 'rated usability average or good' },
      { value: 'p = 0.003', label: 'UTI-domain SCT improvement (d = 0.18)' },
      { value: 'p = 0.33', label: 'overall SCT change (d = 0.059; not significant)' },
    ],
  },
  {
    status: 'Completed' as EvidenceStatus,
    statusNote: 'Manuscript not yet published',
    title: 'Modified Delphi — expert-informed design framework',
    summary:
      'A two-round modified Delphi translated the precursor findings into a design framework for the expanded platform (Round 1: 6 experts; Round 2: 10 experts; 100% response). Consensus supported authentic community and primary-care scenarios, progressive disclosure, interactive branching, decision justification, and OSCE/OSPE integration.',
    figures: [
      { value: '23', label: 'design elements rated' },
      { value: '19', label: 'met all predefined consensus criteria' },
      { value: '82.6%', label: 'consensus rate' },
      { value: '2', label: 'rounds · 100% response' },
    ],
  },
];

export const evidenceSupports =
  'Feasibility and acceptability of the precursor rule-based digital case intervention in routine CBME teaching, with a domain-specific reasoning signal (UTI case) that informed the redesign towards longer, repeated exposure.';

export const evidenceDoesNotClaim =
  'The precursor study did not show a statistically significant overall SCT improvement after a single session, and it is not presented as proof of the overall effectiveness of CaseStep. Faculty-dashboard cohort figures on this site are illustrative and are not study outcomes.';

export const nextPhase = {
  status: 'Approved' as EvidenceStatus,
  statusLine:
    'Listed as Approved on the ICMR ePMS portal in September 2026 under the joint ICMR–NMC medical-education initiative.',
  figures: [
    { value: '36', label: 'months' },
    { value: '4–6', label: 'medical colleges' },
    { value: '~400', label: 'students in 20–24 clusters' },
    { value: '≥24', label: 'branching cases' },
  ],
  streams: [
    {
      title: 'Content scale',
      text: 'A CBME-mapped library of at least 24 branching cases with formal content validation.',
    },
    {
      title: 'Evidence scale',
      text: 'A multicentre, cluster-randomised controlled evaluation with retention assessed at 8–12 weeks.',
    },
    {
      title: 'Implementation scale',
      text: 'RE-AIM implementation evaluation and a costed scale-up blueprint.',
    },
  ],
  caveat:
    'Figures describe the approved study design. They are planned targets, not completed results.',
};

export const milestones = [
  { when: '2024', title: 'Precursor evaluation', text: 'Rule-based digital case learning evaluated in 271 MBBS learners.' },
  { when: '2025', title: 'Needs assessment & Delphi', text: '906-response needs assessment; two-round modified Delphi (19 of 23 elements reached consensus).' },
  { when: 'Jun 2026', title: 'Peer-reviewed publication', text: 'Precursor study published in BMC Medical Education.' },
  { when: '2026', title: 'Expanded CaseStep platform', text: '11 case topics, 12 SCT modules and 4 OSCE/OSPE stations, with student and faculty dashboards.' },
  { when: 'Sep 2026', title: 'ICMR–NMC next phase', text: 'Multicentre evaluation proposal listed as Approved on ICMR ePMS.' },
];

/** Implementation barriers and how the design responds (homepage). */
export const designResponses = [
  { barrier: 'Large cohorts', response: 'Standardised cases can be repeated by every learner.' },
  { barrier: 'Uneven patient exposure', response: 'The same reasoning challenge is available without waiting for a new patient encounter.' },
  { barrier: 'Delayed feedback', response: 'Pre-authored explanatory feedback is triggered immediately at each decision point.' },
  { barrier: 'Infrastructure constraints', response: 'Runs in a browser on ordinary smartphones, tablets and laptops — no VR headsets or specialised simulation hardware.' },
];
