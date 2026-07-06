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
 *
 * One dedicated module is provided per topic (Type 2 Diabetes, Hypertension,
 * Antenatal Care, Acute Diarrhoea, and Tuberculosis/fever-outbreak reasoning)
 * so each can be attempted, reviewed, and cited independently.
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
    id: 'sct-t2dm',
    title: 'SCT — Type 2 Diabetes Mellitus',
    condition: 'Type 2 Diabetes Mellitus',
    intro:
      'Each item gives a clinical situation, a diagnostic or management hypothesis, and one new finding. Decide how that new finding changes the hypothesis. There is no single "right" answer — your score reflects agreement with an expert panel.',
    items: [
      {
        id: 'sct-t2dm-1',
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
        id: 'sct-t2dm-2',
        scenario: 'The same 50-year-old man is being assessed for the cause of his diabetes.',
        ifThinking: 'you are thinking this is Type 1 (not Type 2) Diabetes',
        andThen: 'you find he is obese with a strong family history and no ketonuria',
        question: 'This new information on the hypothesis (Type 1 DM) has the effect:',
        expertMode: -2,
        rationale:
          'Obesity, family history, and absence of ketosis argue strongly against Type 1 and favour Type 2.',
      },
      {
        id: 'sct-t2dm-3',
        scenario: 'A diabetic patient on metformin has an HbA1c of 9.2% after 6 months.',
        ifThinking: 'you are thinking of intensifying therapy by adding a second agent',
        andThen: 'you learn he has been skipping doses and rarely follows dietary advice',
        question: 'This new information on the hypothesis (add a second drug now) has the effect:',
        expertMode: -1,
        rationale:
          'Poor adherence should be addressed first; escalating drugs without fixing adherence is less appropriate, though not absolutely contraindicated.',
      },
      {
        id: 'sct-t2dm-4',
        scenario: 'A 48-year-old newly diagnosed diabetic has no symptoms other than incidental hyperglycaemia.',
        ifThinking: 'you are thinking he already has diabetic retinopathy',
        andThen: 'you find a normal dilated fundus examination',
        question: 'This new information on the hypothesis (established retinopathy at diagnosis) has the effect:',
        expertMode: -1,
        rationale:
          'A normal fundus lowers the likelihood of established retinopathy at diagnosis, though annual screening is still required regardless.',
      },
    ],
  },
  {
    id: 'sct-htn',
    title: 'SCT — Hypertension',
    condition: 'Hypertension',
    intro:
      'Each item gives a clinical situation, a diagnostic or management hypothesis, and one new finding. Decide how that new finding changes the hypothesis relative to an expert panel.',
    items: [
      {
        id: 'sct-htn-1',
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
        id: 'sct-htn-2',
        scenario: 'A newly diagnosed hypertensive man aged 34 has BP 170/104 despite lifestyle change.',
        ifThinking: 'you are thinking of a secondary cause of hypertension',
        andThen: 'you find hypokalaemia with a raised aldosterone-to-renin ratio',
        question: 'This new information on the hypothesis (secondary hypertension) has the effect:',
        expertMode: 2,
        rationale:
          'Young age with resistant hypertension and hypokalaemia/high ARR strongly supports a secondary (e.g., primary aldosteronism) cause.',
      },
      {
        id: 'sct-htn-3',
        scenario: 'A 60-year-old man with hypertension on three drugs at maximal doses still has BP 162/98 mmHg.',
        ifThinking: 'you are thinking of poor adherence as the main explanation',
        andThen: 'a pharmacy refill check shows he has consistently collected all three medicines on time',
        question: 'This new information on the hypothesis (poor adherence) has the effect:',
        expertMode: -1,
        rationale:
          'Confirmed refill adherence makes non-adherence less likely as the sole explanation and should prompt evaluation for true resistant hypertension.',
      },
      {
        id: 'sct-htn-4',
        scenario: 'A 45-year-old woman on a new antihypertensive reports ankle swelling after two weeks.',
        ifThinking: 'you are thinking this is a calcium-channel-blocker side effect',
        andThen: 'you confirm the new drug started two weeks ago was amlodipine',
        question: 'This new information on the hypothesis (CCB-related ankle oedema) has the effect:',
        expertMode: 2,
        rationale: 'Ankle oedema is a well-recognised, dose-related side effect of dihydropyridine calcium-channel blockers like amlodipine.',
      },
    ],
  },
  {
    id: 'sct-anc',
    title: 'SCT — Antenatal Care',
    condition: 'Antenatal Care',
    intro:
      'Reason under uncertainty across common antenatal scenarios. Rate how each new finding shifts the stated hypothesis relative to an expert panel.',
    items: [
      {
        id: 'sct-anc-1',
        scenario: 'A 24-year-old primigravida at 12 weeks looks pale on examination.',
        ifThinking: 'you are thinking she has anaemia needing iron therapy',
        andThen: 'you find her haemoglobin is 9.4 g/dL',
        question: 'This new information on the hypothesis (anaemia needing treatment) has the effect:',
        expertMode: 2,
        rationale: 'Hb 9.4 g/dL confirms anaemia in pregnancy and supports therapeutic iron-folic acid.',
      },
      {
        id: 'sct-anc-2',
        scenario: 'A pregnant woman at 34 weeks reports a headache and some facial puffiness.',
        ifThinking: 'you are thinking of pre-eclampsia',
        andThen: 'you find BP 150/100 mmHg and urine albumin 2+',
        question: 'This new information on the hypothesis (pre-eclampsia) has the effect:',
        expertMode: 2,
        rationale: 'New hypertension with proteinuria in the third trimester strongly supports pre-eclampsia.',
      },
      {
        id: 'sct-anc-3',
        scenario: 'A primigravida at 28 weeks has a fundal height measuring smaller than expected for gestation.',
        ifThinking: 'you are thinking of fetal growth restriction',
        andThen: 'a dating ultrasound at 10 weeks confirms her gestational age is actually 2 weeks less than assumed from her last period',
        question: 'This new information on the hypothesis (growth restriction) has the effect:',
        expertMode: -2,
        rationale: 'A corrected, earlier gestational age fully explains the smaller fundal height and strongly argues against true growth restriction.',
      },
      {
        id: 'sct-anc-4',
        scenario: 'A woman at 32 weeks reports she has not felt fetal movements since the previous evening.',
        ifThinking: 'you are thinking of intrauterine fetal demise',
        andThen: 'a bedside Doppler confirms a normal fetal heart rate of 140/min with active movement on palpation',
        question: 'This new information on the hypothesis (fetal demise) has the effect:',
        expertMode: -2,
        rationale: 'A confirmed normal fetal heart rate and movement strongly argue against fetal demise, though continued monitoring is still reasonable.',
      },
    ],
  },
  {
    id: 'sct-diarrhoea',
    title: 'SCT — Acute Diarrhoea',
    condition: 'Acute Diarrhoea',
    intro:
      'Reason under uncertainty when assessing a child with acute diarrhoea. Rate how each new finding shifts the stated hypothesis relative to an expert panel.',
    items: [
      {
        id: 'sct-diarrhoea-1',
        scenario: 'A 2-year-old has acute watery diarrhoea for one day.',
        ifThinking: 'you are thinking he needs IV fluids for severe dehydration',
        andThen: 'you find he is alert, drinking eagerly, with normal skin pinch and moist eyes',
        question: 'This new information on the hypothesis (severe dehydration needing IV) has the effect:',
        expertMode: -2,
        rationale: 'These are signs of no/some dehydration — oral rehydration is appropriate, arguing strongly against IV therapy.',
      },
      {
        id: 'sct-diarrhoea-2',
        scenario: 'A 3-year-old with 3 days of watery diarrhoea is brought in lethargic and unable to drink.',
        ifThinking: 'you are thinking of severe dehydration requiring urgent IV rehydration (Plan C)',
        andThen: 'you find sunken eyes, a very slow skin pinch, and a weak radial pulse',
        question: 'This new information on the hypothesis (severe dehydration, Plan C) has the effect:',
        expertMode: 2,
        rationale: 'Lethargy, inability to drink, sunken eyes, a very slow skin pinch, and a weak pulse together define severe dehydration requiring urgent IV fluids.',
      },
      {
        id: 'sct-diarrhoea-3',
        scenario: 'A 4-year-old with acute diarrhoea has visible blood and mucus in the stool with fever.',
        ifThinking: 'you are thinking this is simple viral watery diarrhoea not needing antibiotics',
        andThen: 'stool examination confirms blood and mucus with high fever persisting',
        question: 'This new information on the hypothesis (simple viral diarrhoea, no antibiotics needed) has the effect:',
        expertMode: -2,
        rationale: 'Bloody diarrhoea (dysentery) with fever suggests a bacterial cause (e.g. Shigella) and typically warrants antibiotic therapy — arguing strongly against the "no antibiotics needed" hypothesis.',
      },
    ],
  },
  {
    id: 'sct-tb-outbreak',
    title: 'SCT — Tuberculosis & Fever/Outbreak Reasoning',
    condition: 'Tuberculosis / Fever & Outbreak',
    intro:
      'Reason under uncertainty across pulmonary tuberculosis and febrile-outbreak scenarios. Rate how each new finding shifts the stated hypothesis relative to an expert panel.',
    items: [
      {
        id: 'sct-tb-1',
        scenario: 'A 30-year-old has cough for 3 weeks with evening low-grade fever and weight loss.',
        ifThinking: 'you are thinking of pulmonary tuberculosis',
        andThen: 'you find his sputum is positive on CBNAAT (rapid molecular test) for M. tuberculosis',
        question: 'This new information on the hypothesis (pulmonary TB) has the effect:',
        expertMode: 2,
        rationale: 'A positive CBNAAT is a highly specific confirmatory test and strongly supports the diagnosis of pulmonary TB.',
      },
      {
        id: 'sct-tb-2',
        scenario: 'A patient on standard 4-drug anti-TB therapy for 2 months still has a persistent cough.',
        ifThinking: 'you are thinking of drug-resistant TB',
        andThen: 'a follow-up sputum smear at 2 months has converted to negative and symptoms are improving',
        question: 'This new information on the hypothesis (drug-resistant TB) has the effect:',
        expertMode: -2,
        rationale: 'Smear conversion with clinical improvement indicates the standard regimen is working and strongly argues against drug resistance.',
      },
      {
        id: 'sct-tb-3',
        scenario: 'Several households in one locality report fever, headache, and joint pains during the monsoon.',
        ifThinking: 'you are thinking of a dengue outbreak in the area',
        andThen: 'a cluster investigation finds high Aedes breeding indices in stored-water containers nearby',
        question: 'This new information on the hypothesis (dengue outbreak) has the effect:',
        expertMode: 1,
        rationale: 'High vector breeding indices support the plausibility of a dengue outbreak, though laboratory confirmation in a sample of cases is still needed for certainty.',
      },
      {
        id: 'sct-tb-4',
        scenario: 'A febrile-illness cluster is being investigated in a village after monsoon flooding.',
        ifThinking: 'you are thinking of a leptospirosis outbreak (water/rodent exposure)',
        andThen: 'several affected individuals report wading through flood water and none have the typical dengue rash or retro-orbital pain',
        question: 'This new information on the hypothesis (leptospirosis outbreak) has the effect:',
        expertMode: 1,
        rationale: 'Flood-water exposure without typical dengue features raises the relative likelihood of leptospirosis, supporting (not confirming) the hypothesis pending serology.',
      },
    ],
  },
];

export function getSCTModule(id: string): SCTModule | undefined {
  return sctModules.find((m) => m.id === id);
}
