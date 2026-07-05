import type { OSCEStation } from '@/lib/types';

/**
 * OSCE / OSPE station bank (seed data).
 *
 * Each station carries candidate instructions, a weighted checklist, a global
 * rating scale, examiner notes, and student-feedback prompts — the components
 * of a defensible competency assessment. The checklist supports live scoring
 * and a printable rubric in the UI.
 *
 * FUTURE DB INTEGRATION: store stations and captured scores per student to
 * feed the faculty dashboard analytics.
 */

export const osceStations: OSCEStation[] = [
  {
    id: 'osce-bp',
    title: 'Measuring Blood Pressure & Counseling',
    type: 'OSCE',
    minutes: 7,
    competency: {
      code: 'CM 3.4',
      text: 'Demonstrate correct blood-pressure measurement and counsel a patient on hypertension.',
    },
    candidateInstructions:
      'A 55-year-old attends a health camp. Measure the blood pressure using correct technique, interpret the reading, and counsel the patient about the next steps. You have 7 minutes.',
    checklist: [
      { id: 'c1', text: 'Introduces self, obtains consent, explains procedure', weight: 1 },
      { id: 'c2', text: 'Ensures patient rested ≥5 min, seated, arm supported at heart level', weight: 1 },
      { id: 'c3', text: 'Selects correct cuff size and applies it correctly', weight: 1 },
      { id: 'c4', text: 'Palpates radial/brachial to estimate systolic before auscultation', weight: 1 },
      { id: 'c5', text: 'Inflates and deflates correctly; identifies Korotkoff sounds', weight: 2 },
      { id: 'c6', text: 'Records reading accurately and interprets (stage/normal)', weight: 2 },
      { id: 'c7', text: 'Explains need for repeat readings before diagnosis', weight: 1 },
      { id: 'c8', text: 'Counsels on lifestyle and follow-up in clear language', weight: 1 },
    ],
    globalRating: ['Clear fail', 'Borderline', 'Pass', 'Good', 'Excellent'],
    examinerNotes: [
      'Common error: not resting the patient or using an undersized cuff (falsely high reading).',
      'Look for two-way communication and checking patient understanding, not just technical steps.',
    ],
    studentFeedbackPrompts: [
      'One thing I did well in this station:',
      'One thing to improve before the next attempt:',
    ],
  },
  {
    id: 'osce-anc',
    title: 'Antenatal Danger-Sign Counseling',
    type: 'OSCE',
    minutes: 7,
    competency: {
      code: 'CM 9.x',
      text: 'Counsel an antenatal woman on danger signs and birth preparedness.',
    },
    candidateInstructions:
      'A 24-year-old primigravida at 20 weeks has come for a routine visit. Counsel her on pregnancy danger signs and birth preparedness. You have 7 minutes.',
    checklist: [
      { id: 'c1', text: 'Introduces self, builds rapport, uses appropriate language', weight: 1 },
      { id: 'c2', text: 'Explains purpose of danger-sign awareness', weight: 1 },
      { id: 'c3', text: 'Covers vaginal bleeding', weight: 1 },
      { id: 'c4', text: 'Covers severe headache / blurred vision', weight: 1 },
      { id: 'c5', text: 'Covers reduced foetal movements', weight: 1 },
      { id: 'c6', text: 'Covers fever / leaking / severe swelling', weight: 1 },
      { id: 'c7', text: 'Explains where and when to seek care (referral, transport)', weight: 2 },
      { id: 'c8', text: 'Checks understanding and invites questions', weight: 2 },
    ],
    globalRating: ['Clear fail', 'Borderline', 'Pass', 'Good', 'Excellent'],
    examinerNotes: [
      'Reward a birth-preparedness plan (place, transport, money, blood donor, decision-maker).',
      'Penalise jargon and one-way lecturing without checking comprehension.',
    ],
    studentFeedbackPrompts: [
      'A danger sign I explained most clearly:',
      'A counseling skill I want to strengthen:',
    ],
  },
  {
    id: 'ospe-growth',
    title: 'OSPE — Interpreting a Growth Chart',
    type: 'OSPE',
    minutes: 5,
    competency: {
      code: 'CM 10.x',
      text: 'Plot and interpret a child growth chart and classify nutritional status.',
    },
    candidateInstructions:
      'A growth chart and a set of serial weights are provided at this station. Plot the points, interpret the growth trajectory, and classify the nutritional status. Write your interpretation on the sheet. You have 5 minutes.',
    checklist: [
      { id: 'c1', text: 'Plots serial weights accurately for age', weight: 2 },
      { id: 'c2', text: 'Identifies the growth trajectory (crossing centiles / flattening)', weight: 2 },
      { id: 'c3', text: 'Classifies nutritional status correctly', weight: 2 },
      { id: 'c4', text: 'Identifies the "growth faltering" point', weight: 2 },
      { id: 'c5', text: 'States an appropriate next action / referral', weight: 2 },
    ],
    globalRating: ['Clear fail', 'Borderline', 'Pass', 'Good', 'Excellent'],
    examinerNotes: [
      'This is a product-based (OSPE) station — score the written interpretation, not communication.',
      'Common error: reading a single point instead of the trend.',
    ],
    studentFeedbackPrompts: [
      'The interpretation step I found hardest:',
      'What I will revise before the exam:',
    ],
  },
];

export function getStation(id: string): OSCEStation | undefined {
  return osceStations.find((s) => s.id === id);
}
