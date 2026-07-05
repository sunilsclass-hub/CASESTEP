import type { SCTModule } from '@/lib/types';

/**
 * Script Concordance Test seed data.
 *
 * SCT probes clinical reasoning under uncertainty: given a situation, a
 * plausible hypothesis, and a new piece of information, how does that
 * information shift the likelihood? Answers use the classic 5-point scale
 * (-2 strongly against … +2 strongly supports). Scoring is aggregate-based:
 * credit reflects how closely the learner matches an EXPERT PANEL.
 *
 * FUTURE DB INTEGRATION: `expertMode` here is a placeholder for a real panel
 * of experts whose modal/averaged responses would be stored per item and used
 * for aggregate scoring. Store panel responses in a table and compute
 * normalised credit per option at runtime.
 */

export const sctScale = [
  { value: -2, label: 'Strongly against / much less likely' },
  { value: -1, label: 'Somewhat against / less likely' },
  { value: 0, label: 'No effect on the hypothesis' },
  { value: 1, label: 'Somewhat supports / more likely' },
  { value: 2, label: 'Strongly supports / much more likely' },
];

export const sctModules: SCTModule[] = [
  {
    id: 'sct-ncd',
    title: 'SCT — Chronic Disease Reasoning',
    condition: 'Diabetes & Hypertension',
    intro:
      'Each item gives a clinical situation, a diagnostic or management hypothesis, and one new finding. Decide how that new finding changes the hypothesis. There is no single "right" answer — your score reflects agreement with an expert panel.',
    items: [
      {
        id: 'sct-ncd-1',
        scenario:
          'A 50-year-old man with 3 months of polyuria and 4 kg weight loss attends the clinic.',
        ifThinking: 'you are thinking the diagnosis is Type 2 Diabetes Mellitus',
        andThen: 'you find his fasting plasma glucose is 148 mg/dL',
        question: 'This new information on the hypothesis (Type 2 DM) has the effect:',
        expertMode: 2,
        rationale:
          'FPG ≥126 mg/dL in a symptomatic patient strongly supports the diagnosis of diabetes.',
      },
      {
        id: 'sct-ncd-2',
        scenario: 'The same 50-year-old man is being assessed for the cause of his diabetes.',
        ifThinking: 'you are thinking this is Type 1 (not Type 2) Diabetes',
        andThen: 'you find he is obese with a strong family history and no ketonuria',
        question: 'This new information on the hypothesis (Type 1 DM) has the effect:',
        expertMode: -2,
        rationale:
          'Obesity, family history, and absence of ketosis argue strongly against Type 1 and favour Type 2.',
      },
      {
        id: 'sct-ncd-3',
        scenario:
          'A 55-year-old asymptomatic woman has a single clinic BP of 158/96 mmHg at a health camp.',
        ifThinking: 'you are thinking she has sustained (true) hypertension requiring drugs',
        andThen: 'you find her home BP over one week averages 122/78 mmHg',
        question: 'This new information on the hypothesis (sustained hypertension) has the effect:',
        expertMode: -2,
        rationale:
          'Normal out-of-office readings point to white-coat effect and argue strongly against sustained hypertension.',
      },
      {
        id: 'sct-ncd-4',
        scenario: 'A newly diagnosed hypertensive man aged 34 has BP 170/104 despite lifestyle change.',
        ifThinking: 'you are thinking of a secondary cause of hypertension',
        andThen: 'you find hypokalaemia with a raised aldosterone-to-renin ratio',
        question: 'This new information on the hypothesis (secondary hypertension) has the effect:',
        expertMode: 2,
        rationale:
          'Young age with resistant hypertension and hypokalaemia/high ARR strongly supports a secondary (e.g., primary aldosteronism) cause.',
      },
      {
        id: 'sct-ncd-5',
        scenario: 'A diabetic patient on metformin has an HbA1c of 9.2% after 6 months.',
        ifThinking: 'you are thinking of intensifying therapy by adding a second agent',
        andThen: 'you learn he has been skipping doses and rarely follows dietary advice',
        question: 'This new information on the hypothesis (add a second drug now) has the effect:',
        expertMode: -1,
        rationale:
          'Poor adherence should be addressed first; escalating drugs without fixing adherence is less appropriate, though not absolutely contraindicated.',
      },
    ],
  },
  {
    id: 'sct-mch',
    title: 'SCT — Maternal & Child Health Reasoning',
    condition: 'Antenatal & Child Health',
    intro:
      'Reason under uncertainty across common MCH scenarios. Rate how each new finding shifts the stated hypothesis relative to an expert panel.',
    items: [
      {
        id: 'sct-mch-1',
        scenario: 'A 24-year-old primigravida at 12 weeks looks pale on examination.',
        ifThinking: 'you are thinking she has anaemia needing iron therapy',
        andThen: 'you find her haemoglobin is 9.4 g/dL',
        question: 'This new information on the hypothesis (anaemia needing treatment) has the effect:',
        expertMode: 2,
        rationale: 'Hb 9.4 g/dL confirms anaemia in pregnancy and supports therapeutic iron-folic acid.',
      },
      {
        id: 'sct-mch-2',
        scenario: 'A pregnant woman at 34 weeks reports a headache and some facial puffiness.',
        ifThinking: 'you are thinking of pre-eclampsia',
        andThen: 'you find BP 150/100 mmHg and urine albumin 2+',
        question: 'This new information on the hypothesis (pre-eclampsia) has the effect:',
        expertMode: 2,
        rationale: 'New hypertension with proteinuria in the third trimester strongly supports pre-eclampsia.',
      },
      {
        id: 'sct-mch-3',
        scenario: 'A 2-year-old has acute watery diarrhoea for one day.',
        ifThinking: 'you are thinking he needs IV fluids for severe dehydration',
        andThen: 'you find he is alert, drinking eagerly, with normal skin pinch and moist eyes',
        question: 'This new information on the hypothesis (severe dehydration needing IV) has the effect:',
        expertMode: -2,
        rationale: 'These are signs of no/some dehydration — oral rehydration is appropriate, arguing strongly against IV therapy.',
      },
    ],
  },
];

export function getSCTModule(id: string): SCTModule | undefined {
  return sctModules.find((m) => m.id === id);
}
