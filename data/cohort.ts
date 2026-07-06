/**
 * Mock cohort analytics for the Faculty Dashboard.
 *
 * FUTURE DB INTEGRATION: these figures would be computed from stored student
 * results (Supabase/Firebase aggregate queries). The shapes below mirror what
 * such queries would return, so the dashboard UI can stay unchanged.
 */

export const cohortSummary = {
  students: 48,
  activeThisWeek: 39,
  casesAvailable: 11,
  meanCompletion: 72, // %
};

export interface CaseStat {
  condition: string;
  slug: string;
  completion: number; // % of cohort completed
  avgDecisionAccuracy: number; // % correct branching choices
}

export const caseStats: CaseStat[] = [
  { condition: 'Type 2 Diabetes Mellitus', slug: 'type-2-diabetes-mellitus', completion: 81, avgDecisionAccuracy: 76 },
  { condition: 'Hypertension', slug: 'hypertension', completion: 74, avgDecisionAccuracy: 69 },
  { condition: 'Antenatal Care', slug: 'antenatal-care', completion: 61, avgDecisionAccuracy: 82 },
];

export interface SCTStat {
  module: string;
  meanScore: number; // %
  attempts: number;
}

export const sctStats: SCTStat[] = [
  { module: 'Chronic Disease Reasoning', meanScore: 68, attempts: 44 },
  { module: 'Maternal & Child Health Reasoning', meanScore: 74, attempts: 37 },
];

export interface OSCEStat {
  station: string;
  meanScore: number; // %
  weakestStep: string;
}

export const osceStats: OSCEStat[] = [
  { station: 'BP Measurement & Counseling', meanScore: 71, weakestStep: 'Explaining need for repeat readings' },
  { station: 'Antenatal Danger-Sign Counseling', meanScore: 66, weakestStep: 'Checking patient understanding' },
  { station: 'OSPE — Growth Chart', meanScore: 78, weakestStep: 'Identifying growth-faltering point' },
];

export interface ReasoningError {
  error: string;
  frequency: number; // % of students
  linkedCase: string;
}

export const commonReasoningErrors: ReasoningError[] = [
  { error: 'Treating before confirming a biochemical diagnosis', frequency: 34, linkedCase: 'Type 2 Diabetes' },
  { error: 'Acting on a single BP reading (anchoring)', frequency: 41, linkedCase: 'Hypertension' },
  { error: 'Missing complication screening at diagnosis', frequency: 28, linkedCase: 'Type 2 Diabetes' },
  { error: 'Under-ordering baseline antenatal investigations', frequency: 22, linkedCase: 'Antenatal Care' },
  { error: 'Not escalating on red-flag findings', frequency: 19, linkedCase: 'Multiple' },
];

export interface TeachingRecommendation {
  title: string;
  rationale: string;
  action: string;
  linkedError: string;
}

/**
 * Illustrative, faculty-facing recommendations derived from the reasoning-error
 * pattern above — the kind of "so what do I do about it" translation a
 * facilitator needs after reviewing cohort analytics.
 */
export const teachingRecommendations: TeachingRecommendation[] = [
  {
    title: 'Add a mini-lecture on diagnostic thresholds before the NCD cases',
    rationale: '34% of students treated before confirming a biochemical diagnosis.',
    action:
      'Run a 10-minute pre-case briefing on FPG/RBS/HbA1c thresholds and repeat-testing rules before assigning the diabetes case.',
    linkedError: 'Treating before confirming a biochemical diagnosis',
  },
  {
    title: 'Debrief anchoring bias explicitly after the hypertension case',
    rationale: '41% of students acted on a single BP reading — the most frequent error in the cohort.',
    action:
      'Facilitate a short group discussion on measurement variability and white-coat effect immediately after students complete the case.',
    linkedError: 'Acting on a single BP reading (anchoring)',
  },
  {
    title: 'Pair the diabetes case with the foot-risk OSCE station',
    rationale: '28% missed complication screening at diagnosis.',
    action:
      'Schedule the Diabetes Foot-Risk Screening OSCE station in the same week as the diabetes case to reinforce complication screening as routine.',
    linkedError: 'Missing complication screening at diagnosis',
  },
  {
    title: 'Add a checklist prompt for baseline antenatal investigations',
    rationale: '22% under-ordered baseline antenatal investigations.',
    action:
      'Introduce a one-page baseline-investigation checklist during the antenatal-care skills session, cross-referenced to the MCP card.',
    linkedError: 'Under-ordering baseline antenatal investigations',
  },
  {
    title: 'Reinforce red-flag escalation across all cases',
    rationale: '19% did not escalate on red-flag findings — a cross-cutting pattern, not case-specific.',
    action:
      'Add a standing "red flags" recap at the start of each facilitated session, referencing examples from prior cases.',
    linkedError: 'Not escalating on red-flag findings',
  },
];

export interface FeedbackItem {
  id: string;
  student: string;
  case: string;
  comment: string;
  status: 'new' | 'reviewed';
}

export const feedbackQueue: FeedbackItem[] = [
  { id: 'fb1', student: 'Student A21', case: 'Type 2 Diabetes', comment: 'The community-screening step really changed how I think about individual patients.', status: 'new' },
  { id: 'fb2', student: 'Student B07', case: 'Hypertension', comment: 'Would like more cases on resistant hypertension and secondary causes.', status: 'new' },
  { id: 'fb3', student: 'Student C14', case: 'Antenatal Care', comment: 'The danger-sign counseling checklist was very useful for OSCE prep.', status: 'reviewed' },
];
