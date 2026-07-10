import type { Case } from '@/lib/types';
import { extraCases } from './cases-extra';

/**
 * CaseStep seed content — local mock data.
 *
 * FUTURE DB INTEGRATION:
 *   Replace this module with a data-access layer, e.g.
 *     export async function getCases(): Promise<Case[]> {
 *       const { data } = await supabase.from('cases').select('*');
 *       return data as Case[];
 *     }
 *   The `Case` shape (see lib/types.ts) is the contract the UI depends on, so a
 *   Supabase/Firebase table mirroring these fields is a drop-in replacement.
 *
 * All 11 case topics are fully authored: three flagship cases live in this file
 * (Type 2 Diabetes, Hypertension, Antenatal Care) and the remaining eight are
 * authored in data/cases-extra.ts, following the identical step model.
 */

const t2dm: Case = {
  slug: 'type-2-diabetes-mellitus',
  title: 'The Tired Shopkeeper — Type 2 Diabetes Mellitus',
  condition: 'Type 2 Diabetes Mellitus',
  summary:
    'A 48-year-old shopkeeper with fatigue and polyuria. Build a stepwise diagnosis, risk-stratify, and design community-level management.',
  competency: {
    code: 'CM 3.4 / IM 3.x',
    text:
      'Enumerate, elicit and describe the risk factors, screening, diagnosis and management of Type 2 Diabetes at individual and community level.',
  },
  difficulty: 'Intermediate',
  minutes: 25,
  reasoningFocus:
    'Hypothesis generation from vague symptoms, threshold-based diagnosis, and translating individual care into population screening.',
  tags: ['NCD', 'Screening', 'Chronic care', 'Counseling'],
  status: 'ready',
  keyLearningPoints: [
    'Classic osmotic symptoms (polyuria, polydipsia, weight loss) plus recurrent infections should trigger a diabetes hypothesis.',
    'Diagnosis requires a defined biochemical threshold — FPG ≥126 mg/dL, RBS/2-h PG ≥200 mg/dL, or HbA1c ≥6.5% — confirmed on a repeat where asymptomatic.',
    'Community diagnosis: opportunistic and targeted screening of high-risk adults (Indian Diabetes Risk Score ≥60) is more effective than universal screening.',
    'Management is a package: therapeutic lifestyle change, metformin as first-line, complication surveillance (eye, foot, renal), and structured follow-up.',
    'Counseling and self-management support drive long-term glycaemic control more than clinic visits alone.',
  ],
  steps: [
    {
      id: 'scenario',
      kind: 'scenario',
      title: 'Patient scenario',
      body:
        'Mr. Rajanna, a 48-year-old shopkeeper, presents to the Urban Health & Training Centre with three months of tiredness and passing urine more often, especially at night. He mentions his clothes feel looser. He runs a busy provision store, eats out often, and rarely walks.',
      media: { type: 'image', caption: 'Illustrative figure — clinical photography to follow institutional approval. OPD photograph of the patient (to be added).' },
      bullets: [
        'Age 48, male, urban, sedentary occupation.',
        'Father had "sugar problem"; elder brother on tablets for diabetes.',
        'BMI on arrival: 28.6 kg/m² (measured at triage).',
      ],
    },
    {
      id: 'history',
      kind: 'history',
      title: 'Focused history-taking',
      body: 'Which lines of questioning best sharpen your working hypothesis? Review the responses you would gather.',
      bullets: [
        'Polyuria & nocturia for ~3 months, increasing thirst (polydipsia).',
        'Unintentional weight loss of ~4 kg despite normal appetite.',
        'Two episodes of skin boils and slow-healing cut on the foot.',
        'No chest pain, no visual blurring reported today.',
        'Smokes 4–5 bidis/day; alcohol occasionally; no regular exercise.',
        'No prior blood-sugar testing; no known hypertension.',
      ],
      redFlags: [
        'Slow-healing foot wound — screen actively for neuropathy and infection.',
      ],
    },
    {
      id: 'exam',
      kind: 'examination',
      title: 'Physical examination',
      bullets: [
        'General: alert, mildly dehydrated mucosa. No pallor/icterus.',
        'Vitals: BP 134/86 mmHg, PR 82/min, RR 16/min, afebrile.',
        'Anthropometry: BMI 28.6 kg/m²; waist circumference 98 cm.',
        'Skin: healing furuncle over right forearm; superficial ulcer on left sole.',
        'Feet: reduced 10-g monofilament sensation over both great toes.',
        'Systemic exam (CVS/RS/abdomen): unremarkable.',
      ],
      media: { type: 'image', caption: 'Illustrative figure — clinical photography to follow institutional approval. Monofilament foot-sensation testing technique.' },
    },
    {
      id: 'decision-invest',
      kind: 'decision',
      title: 'Decision point — first investigation',
      body: 'Given the history and examination, what is the single most appropriate first-line investigation?',
      decision: {
        prompt: 'Select your next step:',
        options: [
          {
            id: 'a',
            label: 'Random blood glucose now, plus fasting plasma glucose and HbA1c',
            correct: true,
            feedback:
              'Correct. In a symptomatic patient this confirms hyperglycaemia quickly (RBS) while FPG/HbA1c establish the formal diagnosis and baseline control.',
          },
          {
            id: 'b',
            label: 'Start empirical metformin without any test',
            feedback:
              'Not appropriate. Never label or treat diabetes without a biochemical diagnosis — you also miss the baseline HbA1c needed to monitor therapy.',
          },
          {
            id: 'c',
            label: 'Urine dipstick for glucose only',
            feedback:
              'Insufficient. Glycosuria supports the hypothesis but is neither sensitive nor diagnostic; plasma glucose thresholds are required.',
          },
          {
            id: 'd',
            label: 'Reassure and review in 3 months',
            feedback:
              'Unsafe. Osmotic symptoms with weight loss and a non-healing ulcer warrant prompt evaluation, not watchful waiting.',
          },
        ],
      },
    },
    {
      id: 'invest',
      kind: 'investigation',
      title: 'Investigation results',
      bullets: [
        'Random blood glucose: 268 mg/dL.',
        'Fasting plasma glucose: 156 mg/dL (repeat next day 162 mg/dL).',
        'HbA1c: 8.9%.',
        'Urine: glucose 3+, ketones negative.',
        'Fasting lipid profile: LDL 138, HDL 34, TG 210 mg/dL.',
        'Serum creatinine 0.9 mg/dL; urine albumin-creatinine ratio 45 mg/g (mildly elevated).',
      ],
      redFlags: ['Albuminuria signals early diabetic kidney disease — needs surveillance and BP/lipid control.'],
    },
    {
      id: 'reasoning',
      kind: 'reasoning',
      title: 'Clinical reasoning checkpoint',
      body:
        'Synthesise the evidence. The combination of osmotic symptoms + FPG ≥126 (confirmed) + RBS ≥200 + HbA1c ≥6.5% satisfies the diagnostic criteria for Type 2 Diabetes Mellitus. The absence of ketosis and the adult, obese, family-history profile favour type 2 over type 1. Comorbid dyslipidaemia, borderline BP, early neuropathy and albuminuria define the risk landscape.',
      bullets: [
        'Diagnosis: Type 2 Diabetes Mellitus (newly detected).',
        'Complications already present: peripheral neuropathy, early nephropathy, skin sepsis.',
        'Cardiometabolic risk: central obesity, dyslipidaemia, tobacco use.',
      ],
    },
    {
      id: 'decision-mgmt',
      kind: 'decision',
      title: 'Decision point — first-line pharmacotherapy',
      body: 'His HbA1c is 8.9% with no contraindication to metformin (normal renal function). What do you initiate alongside lifestyle change?',
      decision: {
        prompt: 'Choose the first-line drug:',
        options: [
          {
            id: 'a',
            label: 'Metformin, titrated with meals',
            correct: true,
            feedback:
              'Correct. Metformin is first-line for T2DM with preserved renal function — weight-neutral, low hypoglycaemia risk, and cardiovascular benefit.',
          },
          {
            id: 'b',
            label: 'Start insulin immediately',
            feedback:
              'Not first choice here. Insulin is reserved for very high glucose with ketosis, symptomatic decompensation, or failure of oral agents. He is non-ketotic and stable.',
          },
          {
            id: 'c',
            label: 'Sulfonylurea alone as first agent',
            feedback:
              'Suboptimal first choice. Sulfonylureas carry hypoglycaemia and weight-gain risk; metformin is preferred initial therapy.',
          },
        ],
      },
    },
    {
      id: 'community',
      kind: 'community',
      title: 'Public-health / community diagnosis angle',
      body:
        'Step back from the individual to the population. Mr. Rajanna represents a large pool of undiagnosed adults in his neighbourhood.',
      bullets: [
        'Apply the Indian Diabetes Risk Score (IDRS: age, waist, physical activity, family history) to prioritise screening.',
        'Opportunistic screening of adults >30 years attending the health centre (NPCDCS approach).',
        'Map determinants: food environment, sedentary work, tobacco — targets for health promotion.',
        'Link to NCD clinic and community health worker follow-up for adherence.',
      ],
    },
    {
      id: 'management',
      kind: 'management',
      title: 'Management & counseling package',
      bullets: [
        'Therapeutic lifestyle change: individualised diet (portion & carbohydrate advice), 150 min/week activity, tobacco cessation.',
        'Pharmacotherapy: metformin; add statin for dyslipidaemia; BP monitoring with ACE-inhibitor if persistently raised (also renoprotective given albuminuria).',
        'Foot care education + wound management and referral if infection worsens.',
        'Complication surveillance: annual fundus exam, foot exam each visit, renal function and ACR review.',
        'Counseling: teach self-monitoring, hypoglycaemia recognition, sick-day rules; set a shared HbA1c target (~7%).',
      ],
      media: { type: 'video', caption: 'Illustrative figure — clinical video to follow institutional approval. Short counseling demonstration video (to be added).' },
    },
    {
      id: 'reflection',
      kind: 'reflection',
      title: 'Reflection',
      reflectionPrompt:
        'What cue first made you suspect diabetes, and how did the community-level view change your management plan compared with a purely clinical approach? Note one thing you would ask differently next time.',
    },
    {
      id: 'summary',
      kind: 'summary',
      title: 'Summary & key learning points',
      bullets: [
        'Vague fatigue + osmotic symptoms = generate and test a diabetes hypothesis.',
        'Confirm with threshold-based biochemistry before labelling or treating.',
        'Screen for complications at diagnosis — they are often already present.',
        'Metformin + lifestyle is first-line; individualise targets.',
        'Every individual case is an entry point to community screening and prevention.',
      ],
    },
  ],
};

const htn: Case = {
  slug: 'hypertension',
  title: 'The Silent Pressure — Essential Hypertension',
  condition: 'Hypertension',
  summary:
    'A 55-year-old teacher with an incidental high BP reading. Practise correct measurement, staging, risk assessment, and stepped management.',
  competency: {
    code: 'CM 3.4 / IM 1.x',
    text:
      'Describe screening, diagnosis, staging, and evidence-based management of essential hypertension and its cardiovascular risk at community level.',
  },
  difficulty: 'Intermediate',
  minutes: 22,
  reasoningFocus:
    'Distinguishing true hypertension from measurement artefact/white-coat effect, cardiovascular risk stratification, and stepped pharmacological reasoning.',
  tags: ['NCD', 'Screening', 'CVD risk', 'Counseling'],
  status: 'ready',
  keyLearningPoints: [
    'A single high reading does not diagnose hypertension — confirm with correct technique on multiple visits (or out-of-office measurement).',
    'Stage the BP and estimate total cardiovascular risk, not just the number.',
    'Look for target-organ damage and secondary causes before labelling "essential".',
    'Lifestyle modification is foundational; drug choice follows evidence-based first-line classes.',
    'Population approach: salt reduction, tobacco control and opportunistic screening reduce community BP burden.',
  ],
  steps: [
    {
      id: 'scenario',
      kind: 'scenario',
      title: 'Patient scenario',
      body:
        'Mrs. Latha, a 55-year-old school teacher, attends a health camp for a "general check-up". Her blood pressure is recorded at 158/96 mmHg. She feels well and has no complaints. She is worried after a colleague recently had a stroke.',
      bullets: [
        'No known chronic illness; not on any regular medication.',
        'Mother hypertensive; adds extra salt/pickle to meals.',
        'BMI 27.4 kg/m²; non-smoker; minimal physical activity.',
      ],
      media: { type: 'image', caption: 'Illustrative figure — clinical photography to follow institutional approval. Correct BP measurement setup at a health camp.' },
    },
    {
      id: 'decision-confirm',
      kind: 'decision',
      title: 'Decision point — how do you respond to one high reading?',
      body: 'She is asymptomatic with a single elevated camp reading. What is the correct next step?',
      decision: {
        prompt: 'Select the best action:',
        options: [
          {
            id: 'a',
            label: 'Re-measure with correct technique and arrange repeat readings on separate occasions',
            correct: true,
            feedback:
              'Correct. Hypertension is diagnosed on repeated, properly measured readings (or ambulatory/home BP), not one camp value — this avoids over-diagnosis and white-coat error.',
          },
          {
            id: 'b',
            label: 'Start two antihypertensive drugs immediately',
            feedback:
              'Premature. You have not confirmed sustained hypertension, staged it, or assessed risk and organ damage.',
          },
          {
            id: 'c',
            label: 'Tell her it is normal because she feels well',
            feedback:
              'Incorrect. Hypertension is usually asymptomatic ("silent") — symptoms are a poor guide. The reading must be evaluated.',
          },
        ],
      },
    },
    {
      id: 'history',
      kind: 'history',
      title: 'Focused history',
      bullets: [
        'No headache, chest pain, breathlessness, or visual symptoms.',
        'High dietary salt; frequent pickles and papad; low fruit/vegetable intake.',
        'Sedentary; sleeps ~6 h; moderate work stress.',
        'No symptoms suggesting secondary causes (no spells, no muscle weakness, no snoring/daytime sleepiness volunteered).',
        'No oral contraceptive/NSAID/steroid use.',
      ],
    },
    {
      id: 'exam',
      kind: 'examination',
      title: 'Examination & confirmed readings',
      bullets: [
        'Repeat seated readings (rested, correct cuff): 156/94 and 160/98 mmHg; similar on a second visit one week later.',
        'BMI 27.4 kg/m²; waist 92 cm.',
        'CVS: normal S1S2, no added sounds; apex not displaced.',
        'Fundus: mild arteriolar narrowing (grade I).',
        'No radio-femoral delay; peripheral pulses normal.',
      ],
      redFlags: ['Fundal changes indicate early hypertensive target-organ effect — reinforces need to treat.'],
    },
    {
      id: 'invest',
      kind: 'investigation',
      title: 'Baseline investigations',
      body: 'Baseline work-up screens for target-organ damage, cardiovascular risk factors, and clues to secondary hypertension.',
      bullets: [
        'ECG: mild LV hypertrophy pattern.',
        'Fasting glucose 104 mg/dL; HbA1c 5.9% (pre-diabetes).',
        'Lipid profile: LDL 142, HDL 46, TG 168 mg/dL.',
        'Serum creatinine 0.8 mg/dL (eGFR normal); urine routine normal, no albuminuria.',
        'Serum electrolytes normal.',
      ],
    },
    {
      id: 'reasoning',
      kind: 'reasoning',
      title: 'Clinical reasoning checkpoint',
      body:
        'Sustained office BP ~158/96 on repeated correct measurement stages this as Grade 2 hypertension. No features point to a secondary cause, so this is essential (primary) hypertension. Total cardiovascular risk is raised by age, dyslipidaemia, pre-diabetes, central obesity, and early LVH/fundal changes.',
      bullets: [
        'Diagnosis: Essential hypertension, Grade 2.',
        'Target-organ evidence: LVH on ECG, grade I retinopathy.',
        'Added risk factors: dyslipidaemia, pre-diabetes, central obesity.',
      ],
    },
    {
      id: 'decision-drug',
      kind: 'decision',
      title: 'Decision point — initial pharmacotherapy',
      body: 'She has confirmed Grade 2 hypertension with organ damage. Alongside lifestyle change, which first-line option is most appropriate?',
      decision: {
        prompt: 'Choose initial therapy:',
        options: [
          {
            id: 'a',
            label: 'Start a first-line agent (ACE-inhibitor/ARB or calcium-channel blocker), review response',
            correct: true,
            feedback:
              'Correct. Grade 2 hypertension with organ damage warrants prompt drug therapy from an evidence-based first-line class, combined with lifestyle change and monitoring.',
          },
          {
            id: 'b',
            label: 'Lifestyle advice only for 6 months, no drug',
            feedback:
              'Insufficient for Grade 2 with target-organ damage — lifestyle alone will not achieve timely control and leaves cardiovascular risk untreated.',
          },
          {
            id: 'c',
            label: 'Short-acting sublingual nifedipine to "bring it down fast"',
            feedback:
              'Unsafe and outdated. Rapid uncontrolled BP lowering risks ischaemia; she needs sustained control with a long-acting agent, not acute drops.',
          },
        ],
      },
    },
    {
      id: 'community',
      kind: 'community',
      title: 'Public-health / community angle',
      bullets: [
        'Population salt-reduction messaging (a leading modifiable driver of BP in India).',
        'Opportunistic BP screening of all adults attending facilities (NPCDCS).',
        'Address clustering of NCD risk — same lifestyle drivers as diabetes and CVD.',
        'Ensure drug continuity and follow-up via NCD clinic and community health workers.',
      ],
    },
    {
      id: 'management',
      kind: 'management',
      title: 'Management & counseling',
      bullets: [
        'Lifestyle: DASH-style diet, salt <5 g/day, weight reduction, 150 min/week activity, limit alcohol.',
        'Pharmacotherapy: evidence-based first-line agent, up-titrate or combine to reach target (<140/90, individualised).',
        'Manage total risk: statin for dyslipidaemia, monitor glycaemia.',
        'Follow-up schedule with home BP monitoring where feasible; check adherence and side-effects.',
        'Counsel that hypertension is usually lifelong and symptom-free — adherence prevents stroke/MI.',
      ],
    },
    {
      id: 'reflection',
      kind: 'reflection',
      title: 'Reflection',
      reflectionPrompt:
        'How did confirming the diagnosis over multiple readings change your confidence compared with acting on the single camp value? What will you tell a patient who "feels fine" about why treatment matters?',
    },
    {
      id: 'summary',
      kind: 'summary',
      title: 'Summary & key learning points',
      bullets: [
        'Confirm hypertension with correct, repeated measurement before diagnosis.',
        'Stage the BP and assess total cardiovascular risk and organ damage.',
        'Exclude secondary causes before calling it "essential".',
        'Lifestyle change is foundational; add first-line drugs per evidence and staging.',
        'Salt reduction and screening are the community-level levers.',
      ],
    },
  ],
};

const anc: Case = {
  slug: 'antenatal-care',
  title: 'The First Visit — Antenatal Care',
  condition: 'Antenatal Care',
  summary:
    'A 24-year-old primigravida at 12 weeks. Deliver risk-stratified antenatal care, recognise danger signs, and apply the community MCH package.',
  competency: {
    code: 'CM 9.x / OG 2.x',
    text:
      'Provide comprehensive antenatal care, identify high-risk pregnancy, counsel on danger signs and nutrition, and apply the national MCH programme.',
  },
  difficulty: 'Foundation',
  minutes: 24,
  reasoningFocus:
    'Risk stratification of pregnancy, recognition of danger signs, and integrating preventive/promotive care with the national MCH programme.',
  tags: ['MCH', 'Preventive', 'Screening', 'Counseling'],
  status: 'ready',
  keyLearningPoints: [
    'Early registration and a structured first visit set the trajectory of a safe pregnancy.',
    'Every antenatal contact is a screening opportunity — anaemia, BP, blood group, infections, and danger signs.',
    'Risk stratification decides the level and place of care and referral.',
    'Iron-folic acid, calcium, TT/Td immunisation and nutrition counseling are core preventive components.',
    'Community MCH: ANC links to institutional delivery, JSY/JSSK entitlements, and ASHA follow-up.',
  ],
  steps: [
    {
      id: 'scenario',
      kind: 'scenario',
      title: 'Patient scenario',
      body:
        'Mrs. Anjali, 24 years, primigravida, comes to the sub-centre for her first antenatal visit. Her last menstrual period was 12 weeks ago. She feels well but is anxious as this is her first pregnancy. She has come with her ASHA worker.',
      bullets: [
        'Married 1 year; planned pregnancy; no prior illnesses.',
        'Vegetarian diet; lives in a joint family in a rural area.',
        'No medications; immunisation history uncertain.',
      ],
      media: { type: 'image', caption: 'Illustrative figure — clinical photography to follow institutional approval. Sub-centre antenatal registration.' },
    },
    {
      id: 'history',
      kind: 'history',
      title: 'History-taking at the first visit',
      bullets: [
        'Menstrual: regular cycles; LMP fixes gestational age ≈12 weeks; calculate EDD (Naegele’s rule).',
        'Obstetric: primigravida; no prior abortions/losses.',
        'Medical: no diabetes, hypertension, cardiac disease, thyroid disorder, TB, or epilepsy.',
        'Family: no twins, no hereditary disorders reported.',
        'Diet & lifestyle: vegetarian, possible low iron intake; no tobacco/alcohol.',
        'Danger-sign review today: no bleeding, severe headache, blurring, swelling, reduced foetal movement (early).',
      ],
    },
    {
      id: 'exam',
      kind: 'examination',
      title: 'Examination',
      bullets: [
        'General: mild pallor; no pedal oedema; no icterus.',
        'Vitals: BP 112/72 mmHg, PR 80/min, afebrile.',
        'Weight 49 kg; height 152 cm (baseline for monitoring gain).',
        'Systemic: CVS/RS normal.',
        'Obstetric: uterus not yet palpable per abdomen at 12 weeks; foetal heart to be checked as gestation advances.',
      ],
      redFlags: ['Pallor suggests possible anaemia — confirm with haemoglobin and treat promptly.'],
    },
    {
      id: 'decision-invest',
      kind: 'decision',
      title: 'Decision point — first-visit investigations',
      body: 'What baseline antenatal investigation panel do you order at this booking visit?',
      decision: {
        prompt: 'Choose the most complete appropriate panel:',
        options: [
          {
            id: 'a',
            label:
              'Hb, blood group & Rh, blood sugar, urine albumin/sugar, HIV, HBsAg, VDRL, and offer/plan a dating ultrasound',
            correct: true,
            feedback:
              'Correct. This is the recommended baseline package — it screens for anaemia, isoimmunisation risk, diabetes, pre-eclampsia, and infections that alter management, and dating improves accuracy.',
          },
          {
            id: 'b',
            label: 'Only haemoglobin because she looks pale',
            feedback:
              'Incomplete. Anaemia matters, but you would miss blood group/Rh, infections and glucose screening that change antenatal management.',
          },
          {
            id: 'c',
            label: 'No tests — reassure and review at term',
            feedback:
              'Unsafe. The first visit is a key screening opportunity; skipping it misses treatable, high-impact conditions.',
          },
        ],
      },
    },
    {
      id: 'invest',
      kind: 'investigation',
      title: 'Investigation results',
      bullets: [
        'Haemoglobin: 9.4 g/dL (mild-to-moderate anaemia).',
        'Blood group: O Positive.',
        'Random blood sugar: 96 mg/dL.',
        'Urine: albumin nil, sugar nil.',
        'HIV / HBsAg / VDRL: non-reactive.',
        'Dating ultrasound (planned): confirm gestational age and viability.',
      ],
    },
    {
      id: 'reasoning',
      kind: 'reasoning',
      title: 'Clinical reasoning — risk stratification',
      body:
        'Anjali is a primigravida at 12 weeks with mild-moderate anaemia but no other high-risk features (normal BP, no medical/obstetric red flags, non-reactive infection screen). Anaemia is the one active issue requiring treatment and monitoring. She is otherwise low-risk and suitable for care at the sub-centre/PHC level with a clear referral plan.',
      bullets: [
        'Current issue: nutritional anaemia (needs iron-folic acid therapy and dietary counseling).',
        'No high-risk markers today — continue routine ANC schedule.',
        'Safety-net: educate on danger signs that would upgrade risk.',
      ],
    },
    {
      id: 'community',
      kind: 'community',
      title: 'Community MCH package',
      bullets: [
        'Register in the MCP (Mother-Child Protection) card; ensure ≥4 (ideally 8) antenatal contacts.',
        'Iron-folic acid and calcium supplementation; deworming as per schedule.',
        'TT/Td immunisation as per national schedule.',
        'Link to entitlements: JSY/JSSK, institutional delivery, ASHA accompaniment.',
        'Birth-preparedness & complication-readiness plan with the family.',
      ],
    },
    {
      id: 'management',
      kind: 'management',
      title: 'Management & counseling',
      bullets: [
        'Treat anaemia: therapeutic oral iron-folic acid, recheck Hb; escalate if no response or if severe.',
        'Nutrition counseling: iron-rich foods, protein, calcium; address dietary myths and food taboos.',
        'Danger-sign counseling: bleeding, severe headache/blurred vision, reduced foetal movement, swelling, fever, leaking — report immediately.',
        'Schedule next contacts and tests (e.g., glucose screening, repeat Hb, growth monitoring).',
        'Emotional support and partner/family involvement in birth planning.',
      ],
      media: { type: 'video', caption: 'Illustrative figure — clinical video to follow institutional approval. Danger-sign counseling demonstration video.' },
    },
    {
      id: 'reflection',
      kind: 'reflection',
      title: 'Reflection',
      reflectionPrompt:
        'Which findings moved Anjali between "routine" and "needs-attention" care, and how does the ASHA/community link change what happens after she leaves the clinic? Note one counseling point you want to improve.',
    },
    {
      id: 'summary',
      kind: 'summary',
      title: 'Summary & key learning points',
      bullets: [
        'Early registration + structured first visit = safer pregnancy.',
        'Every contact is a screening opportunity (anaemia, BP, infections, danger signs).',
        'Risk-stratify to decide level and place of care and referral.',
        'Deliver the preventive package: IFA, calcium, immunisation, counseling.',
        'ANC is a gateway to the community MCH programme and institutional delivery.',
      ],
    },
  ],
};

/**
 * The eight remaining topics (Postnatal Care, Acute Diarrhoea, URTI, UTI, Chest
 * Pain, Paediatric Growth/Nutrition, Vector-borne Outbreak, and
 * Environmental/Occupational Health) are fully authored in data/cases-extra.ts.
 */
export const cases: Case[] = [t2dm, htn, anc, ...extraCases];

export function getCase(slug: string): Case | undefined {
  return cases.find((c) => c.slug === slug);
}

export function getReadyCases(): Case[] {
  return cases.filter((c) => c.status === 'ready');
}
