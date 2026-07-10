import type { Case } from '@/lib/types';

/**
 * Additional fully-authored CaseStep cases (8), following the same step model
 * as the flagship three in data/cases.ts. See that file for the DB-integration
 * notes — these are combined into the exported `cases` array there.
 */

const postnatal: Case = {
  slug: 'postnatal-care',
  title: 'The Fourth Day — Postnatal Care',
  condition: 'Postnatal Care',
  summary:
    'A 26-year-old woman on day 4 after a home-area delivery. Assess mother and newborn, spot danger signs, and support breastfeeding and family planning.',
  competency: {
    code: 'CM 9.x / OG 2.x',
    text:
      'Provide postnatal care, identify maternal and neonatal danger signs, and counsel on breastfeeding and family planning.',
  },
  difficulty: 'Foundation',
  minutes: 20,
  reasoningFocus:
    'Parallel assessment of mother and newborn, danger-sign recognition, and preventive postnatal counseling.',
  tags: ['MCH', 'Newborn', 'Counseling', 'Preventive'],
  status: 'ready',
  keyLearningPoints: [
    'The postnatal period is high-risk for both mother and baby — most maternal and neonatal deaths occur in the first week.',
    'Assess the mother and newborn together at every postnatal contact.',
    'Fever with foul lochia and uterine tenderness suggests puerperal sepsis — act promptly.',
    'Support exclusive breastfeeding and correct attachment; it is preventive care for the newborn.',
    'Postnatal care is the entry point for immunisation, newborn care, and postpartum family planning.',
  ],
  steps: [
    {
      id: 'scenario',
      kind: 'scenario',
      title: 'Patient scenario',
      body:
        'Mrs. Kavya, 26 years, delivered a baby boy four days ago at the district hospital and is now home. The ASHA has brought her to the sub-centre because she reports mild fever and difficulty feeding the baby.',
      bullets: [
        'Full-term normal vaginal delivery; birth weight 2.6 kg.',
        'First baby; lives in a joint family; breastfeeding attempted but "not enough milk".',
        'No prior medical illness.',
      ],
      media: { type: 'image', caption: 'Illustrative figure — clinical photography to follow institutional approval. Postnatal home visit / sub-centre assessment.' },
    },
    {
      id: 'history',
      kind: 'history',
      title: 'History — mother and baby',
      bullets: [
        'Mother: low-grade fever 1 day; mild lower abdominal discomfort; lochia present, not foul-smelling today.',
        'No excessive bleeding, no severe headache, no calf pain or breathlessness.',
        'Breast: mild fullness, sore nipple on the right; baby latches briefly then cries.',
        'Baby: passing urine and stool, active, no fever, no convulsions, feeding poorly per mother.',
        'Immunisation: BCG, OPV-0 and Hepatitis-B birth dose given at hospital.',
      ],
      redFlags: ['Maternal fever in the puerperium — actively exclude puerperal sepsis and breast infection.'],
    },
    {
      id: 'exam',
      kind: 'examination',
      title: 'Examination',
      bullets: [
        'Mother: T 37.9°C, PR 88, BP 116/74; mild uterine tenderness, uterus appropriately involuted; lochia rubra, not offensive.',
        'Breasts: right nipple cracked, no abscess/localized hot swelling; good milk expression.',
        'Baby: alert, warm, RR 44, no chest indrawing, weight 2.5 kg (physiological early loss), mild jaundice to face only.',
        'Baby latch observed: poor attachment — not taking areola, chin away from breast.',
      ],
      media: { type: 'video', caption: 'Illustrative figure — clinical video to follow institutional approval. Breastfeeding attachment assessment video.' },
    },
    {
      id: 'decision',
      kind: 'decision',
      title: 'Decision point — the poor feeding',
      body: 'The baby is well but feeding poorly, the mother has a sore cracked nipple and thinks she has "no milk". What is the most appropriate first action?',
      decision: {
        prompt: 'Choose the best next step:',
        options: [
          {
            id: 'a',
            label: 'Assess and correct breastfeeding attachment, then reassess',
            correct: true,
            feedback:
              'Correct. Poor attachment causes sore nipples and ineffective feeding and is the usual reason for perceived "low milk". Correcting the latch fixes both problems.',
          },
          {
            id: 'b',
            label: 'Advise top-up formula feeds immediately',
            feedback:
              'Not first-line. Introducing formula for a correctable latch problem undermines breastfeeding and adds infection risk; supply responds to effective, frequent feeding.',
          },
          {
            id: 'c',
            label: 'Tell her milk is genuinely insufficient and prescribe a galactagogue',
            feedback:
              'Premature. True insufficiency is uncommon; the latch has not yet been corrected. Reassurance and positioning come first.',
          },
        ],
      },
    },
    {
      id: 'invest',
      kind: 'investigation',
      title: 'Bedside assessment',
      bullets: [
        'Maternal temperature trend and lochia character monitored; no offensive discharge, uterus non-boggy.',
        'Baby: transcutaneous/clinical jaundice limited to face (low zone); feeding, urine and stool adequate.',
        'No laboratory tests urgently indicated; safety-net advice given for escalation.',
      ],
    },
    {
      id: 'reasoning',
      kind: 'reasoning',
      title: 'Clinical reasoning',
      body:
        'The mother has a mild, early puerperal fever without features of established sepsis (no offensive lochia, no significant uterine tenderness, stable vitals) — most consistent with a settling response plus nipple trauma; she needs close review and clear danger-sign safety-netting rather than immediate antibiotics on this picture. The baby is thriving with physiological jaundice and weight change; the real problem is a correctable latch.',
      bullets: [
        'Mother: low-risk puerperal fever + sore nipple from poor attachment — review and safety-net.',
        'Baby: healthy newborn with physiological jaundice; feeding issue is latch, not supply.',
      ],
    },
    {
      id: 'community',
      kind: 'community',
      title: 'Community MCH angle',
      bullets: [
        'Home-Based Newborn Care (HBNC) visits by ASHA on the recommended schedule (days 3, 7, 14…).',
        'Track weight gain and jaundice; know local referral pathway for newborn danger signs.',
        'Postpartum family-planning counseling (LAM, spacing methods) begins now.',
        'Reinforce warmth, hygiene, exclusive breastfeeding and immunisation follow-up.',
      ],
    },
    {
      id: 'management',
      kind: 'management',
      title: 'Management & counseling',
      bullets: [
        'Demonstrate correct positioning and attachment; treat sore nipple with hindmilk and air-drying.',
        'Advise frequent, on-demand exclusive breastfeeding; reassure about supply.',
        'Maternal danger signs to return immediately: high fever, foul-smelling lochia, heavy bleeding, severe headache, calf pain/breathlessness, breast becoming red and painful.',
        'Newborn danger signs: poor feeding, lethargy, fever (axillary ≥37.5°C) or hypothermia, fast breathing (RR ≥60/min, per IMNCI) or chest indrawing, deepening or palms-and-soles jaundice, convulsions.',
        'Confirm schedule for the next HBNC visit and immunisation.',
      ],
    },
    {
      id: 'reflection',
      kind: 'reflection',
      title: 'Reflection',
      reflectionPrompt:
        'How did assessing the mother and baby together change your plan, and which single danger sign would most worry you if the family reported it by phone tomorrow?',
    },
    {
      id: 'summary',
      kind: 'summary',
      title: 'Summary & key learning points',
      bullets: [
        'Assess mother and newborn together at every postnatal contact.',
        'Distinguish a settling low-grade fever from puerperal sepsis; safety-net clearly.',
        'Most "low milk" is a latch problem — fix attachment before formula.',
        'Teach maternal and newborn danger signs explicitly.',
        'Use the visit as a gateway to HBNC, immunisation, and family planning.',
      ],
    },
  ],
};

const diarrhoea: Case = {
  slug: 'acute-diarrhoea',
  title: 'The Restless Toddler — Acute Diarrhoea',
  condition: 'Acute Diarrhoea',
  summary:
    'An 18-month-old with acute watery diarrhoea. Classify dehydration, choose the right rehydration plan, and prevent the next episode in the community.',
  competency: {
    code: 'CM 10.x / PE 20.x',
    text:
      'Assess and classify dehydration, manage acute diarrhoea using ORS and zinc (IMNCI), and apply community prevention.',
  },
  difficulty: 'Foundation',
  minutes: 18,
  reasoningFocus:
    'Structured dehydration assessment and threshold-based selection of rehydration Plan A/B/C.',
  tags: ['Communicable', 'Paediatric', 'IMNCI', 'Prevention'],
  status: 'ready',
  keyLearningPoints: [
    'Assess dehydration systematically: general condition, eyes, thirst, and skin pinch.',
    'Match the plan to the classification — Plan A (no dehydration), B (some), C (severe).',
    'ORS + zinc is the cornerstone; zinc reduces duration and future episodes.',
    'Antibiotics are NOT routine — reserve for dysentery, cholera, or specific indications.',
    'Prevention is the community win: safe water, sanitation, hand-washing, breastfeeding, and rotavirus vaccine.',
  ],
  steps: [
    {
      id: 'scenario',
      kind: 'scenario',
      title: 'Patient scenario',
      body:
        'Baby Arjun, 18 months, is brought by his mother with loose watery stools 6–7 times a day for two days and two episodes of vomiting. The family uses water from a shared open source.',
      bullets: [
        'Still breastfeeding; also takes family food.',
        'No blood in stool; no high fever reported.',
        'Mother stopped feeds "to rest the stomach".',
      ],
      media: { type: 'image', caption: 'Illustrative figure — clinical photography to follow institutional approval. Child being assessed at the OPD.' },
    },
    {
      id: 'history',
      kind: 'history',
      title: 'History',
      bullets: [
        'Watery, non-bloody stools ×2 days; vomiting settling.',
        'Urine output reduced (fewer wet nappies); child irritable but drinking.',
        'No convulsions, no abdominal distension, no recent measles.',
        'Immunisation up to date; not received rotavirus vaccine.',
        'Water stored uncovered; hands not routinely washed before feeding.',
      ],
    },
    {
      id: 'exam',
      kind: 'examination',
      title: 'Examination — dehydration assessment',
      bullets: [
        'General condition: restless/irritable (not lethargic).',
        'Eyes: slightly sunken.',
        'Thirst: drinks eagerly, thirsty.',
        'Skin pinch: goes back slowly.',
        'Vitals: afebrile, RR 34, pulse good volume; weight 10 kg.',
      ],
      redFlags: ['Lethargy/unconsciousness, inability to drink, or very slow skin pinch would signal SEVERE dehydration (Plan C).'],
    },
    {
      id: 'decision',
      kind: 'decision',
      title: 'Decision point — which rehydration plan?',
      body: 'Using IMNCI signs — restless/irritable, sunken eyes, drinks eagerly, skin pinch slow — classify the dehydration and choose the plan.',
      decision: {
        prompt: 'Select the correct management plan:',
        options: [
          {
            id: 'a',
            label: 'Some dehydration → Plan B: supervised ORS ~75 mL/kg over 4 hours',
            correct: true,
            feedback:
              'Correct. Two or more of (restless/irritable, sunken eyes, drinks eagerly, slow skin pinch) = "some dehydration" → Plan B with supervised ORS and reassessment.',
          },
          {
            id: 'b',
            label: 'Severe dehydration → Plan C: immediate IV fluids',
            feedback:
              'Overtreatment. The child is drinking and not lethargic; there are no severe signs. IV is reserved for severe dehydration/shock.',
          },
          {
            id: 'c',
            label: 'No dehydration → Plan A: home fluids only',
            feedback:
              'Undertreatment. Sunken eyes, eager thirst and a slow skin pinch indicate some dehydration; home fluids alone are not enough now.',
          },
          {
            id: 'd',
            label: 'Start antibiotics and an anti-motility drug',
            feedback:
              'Inappropriate. Non-bloody watery diarrhoea does not need antibiotics; anti-motility drugs are harmful in young children.',
          },
        ],
      },
    },
    {
      id: 'invest',
      kind: 'investigation',
      title: 'Investigations',
      bullets: [
        'Acute watery diarrhoea is a clinical diagnosis — routine stool tests are not required.',
        'Reassess hydration after the ORS trial (eyes, thirst, skin pinch, alertness).',
        'Consider tests only if dysentery, prolonged course, or systemic illness.',
      ],
    },
    {
      id: 'reasoning',
      kind: 'reasoning',
      title: 'Clinical reasoning',
      body:
        'This is acute watery diarrhoea with "some dehydration" (Plan B). The mother has made two avoidable errors — stopping feeds and not giving fluids — that increase dehydration risk. There is no indication for antibiotics. Zinc will shorten the illness and reduce recurrence over the coming months.',
      bullets: [
        'Diagnosis: acute watery diarrhoea with some dehydration.',
        'Correct the feeding myth: continue breastfeeding and feeding throughout.',
        'Management is ORS + zinc, not antibiotics.',
      ],
    },
    {
      id: 'community',
      kind: 'community',
      title: 'Community / prevention angle',
      bullets: [
        'Safe drinking water: storage in covered containers, boiling/chlorination.',
        'Sanitation and hand-washing with soap at critical times.',
        'Promote exclusive breastfeeding and continued feeding during illness.',
        'Rotavirus vaccine and vitamin A per schedule; ORS-zinc corner in the community.',
      ],
    },
    {
      id: 'management',
      kind: 'management',
      title: 'Management & counseling',
      bullets: [
        'Plan B: supervised ORS ~75 mL/kg over 4 hours; reassess and step to Plan A when hydrated.',
        'Zinc: 20 mg/day for 14 days (10 mg if <6 months).',
        'Continue breastfeeding and age-appropriate feeding throughout.',
        'Teach the mother to prepare ORS correctly and to recognise danger signs (not drinking, becoming lethargic, blood in stool, persistent vomiting).',
        'Advise on safe water and hand-washing before she leaves.',
      ],
    },
    {
      id: 'reflection',
      kind: 'reflection',
      title: 'Reflection',
      reflectionPrompt:
        'Which examination signs moved this child from "no dehydration" to "some dehydration", and how will you counter the common belief that feeding should stop during diarrhoea?',
    },
    {
      id: 'summary',
      kind: 'summary',
      title: 'Summary & key learning points',
      bullets: [
        'Classify dehydration with the four IMNCI signs before choosing a plan.',
        'Plan A/B/C is threshold-based — match treatment to severity.',
        'ORS + zinc + continued feeding is the core; antibiotics are not routine.',
        'Correct feeding myths at the visit.',
        'Prevention (WASH, breastfeeding, rotavirus) is the community-level solution.',
      ],
    },
  ],
};

const urti: Case = {
  slug: 'upper-respiratory-tract-infection',
  title: 'The Sore Throat — Upper Respiratory Tract Infection',
  condition: 'URTI',
  summary:
    'A 22-year-old with sore throat and cough asking for antibiotics. Practise viral-vs-bacterial reasoning and antibiotic stewardship.',
  competency: {
    code: 'CM 4.x / IM 4.x',
    text:
      'Differentiate viral from bacterial URTI, practise rational antibiotic use, and counsel on self-care and red flags.',
  },
  difficulty: 'Foundation',
  minutes: 15,
  reasoningFocus:
    'Applying clinical prediction (Centor-type) reasoning to avoid unnecessary antibiotics while catching red flags.',
  tags: ['Communicable', 'Stewardship', 'Rational prescribing'],
  status: 'ready',
  keyLearningPoints: [
    'Most acute sore throats and colds are viral and self-limiting.',
    'Use clinical features (Centor/McIsaac criteria) to estimate streptococcal likelihood.',
    'Antibiotics give little benefit in low-probability sore throat and drive resistance and side-effects.',
    'Know the red flags that change the game: airway compromise, unilateral swelling, drooling, severe unilateral pain.',
    'Antibiotic stewardship is a public-health responsibility, not just an individual choice.',
  ],
  steps: [
    {
      id: 'scenario',
      kind: 'scenario',
      title: 'Patient scenario',
      body:
        'Mr. Farhan, 22, a college student, comes with three days of sore throat, runny nose, mild cough, and a "blocked" feeling. He asks directly for an antibiotic because he has exams and "wants to recover fast".',
      bullets: [
        'No difficulty swallowing saliva or breathing; no drooling.',
        'Low-grade feverishness; body ache; no rash.',
        'No drug allergies; not immunocompromised.',
      ],
    },
    {
      id: 'history',
      kind: 'history',
      title: 'History',
      bullets: [
        'Coryza (runny nose) and cough alongside the sore throat — features that point to a viral cause.',
        'No high fever, no pus points noticed, no tender neck lumps volunteered.',
        'Able to eat and drink; no voice change, no neck stiffness.',
        'Several classmates have similar colds.',
      ],
    },
    {
      id: 'exam',
      kind: 'examination',
      title: 'Examination',
      bullets: [
        'Temperature 37.6°C; comfortable, not toxic.',
        'Throat: mild pharyngeal redness, NO tonsillar exudate.',
        'Neck: no tender anterior cervical lymphadenopathy.',
        'Chest clear; no stridor; no unilateral tonsillar swelling or uvular deviation.',
      ],
      redFlags: ['Drooling, muffled "hot-potato" voice, trismus, or unilateral swelling would suggest peritonsillar abscess/epiglottitis — refer urgently.'],
      media: { type: 'image', caption: 'Illustrative figure — clinical photography to follow institutional approval. Pharyngeal examination — inspecting for tonsillar exudate and erythema.' },
    },
    {
      id: 'decision',
      kind: 'decision',
      title: 'Decision point — the antibiotic request',
      body: 'He is low-probability for strep with no red flags, but he is asking insistently for antibiotics. What is the best response?',
      decision: {
        prompt: 'Choose the most appropriate action:',
        options: [
          {
            id: 'a',
            label: 'Explain it is viral, advise symptomatic care and safety-net; no antibiotic',
            correct: true,
            feedback:
              'Correct. Shared, clear explanation plus symptomatic care and red-flag advice is best practice — it treats the patient well and protects against resistance.',
          },
          {
            id: 'b',
            label: 'Prescribe an antibiotic to satisfy the patient and save time',
            feedback:
              'Poor practice. It offers negligible benefit, exposes him to side-effects, reinforces expectations, and contributes to antimicrobial resistance.',
          },
          {
            id: 'c',
            label: 'Prescribe a delayed antibiotic to start today anyway',
            feedback:
              'Not indicated here. A delayed prescription can be a tool in borderline cases, but with a clearly low-probability viral picture, no prescription with good counseling is preferred.',
          },
        ],
      },
    },
    {
      id: 'invest',
      kind: 'investigation',
      title: 'Investigations',
      bullets: [
        'No investigations are routinely needed for a classic, low-probability viral sore throat.',
        'A rapid antigen detection test (RADT) or throat culture is reserved for an intermediate/high Centor–McIsaac score (typically ≥2–3), where the result would actually change management.',
        'Routine blood tests, imaging, or throat swabs add no value here and would only delay reassurance.',
      ],
    },
    {
      id: 'reasoning',
      kind: 'reasoning',
      title: 'Clinical reasoning — Centor/McIsaac',
      body:
        'Apply the Centor/McIsaac criteria: fever ≥38°C (absent, 0), tonsillar exudate (absent, 0), tender anterior cervical nodes (absent, 0), and absence of cough (cough is present, so 0) — a Centor score of 0 out of 4. His age (22, in the 15–44 bracket) adds no McIsaac adjustment, so the total McIsaac score is 0, corresponding to a low (~1–2.5%) probability of streptococcal pharyngitis. A bacterial (Group A strep) throat is unlikely and this is most consistent with a viral URTI.',
      bullets: [
        'Centor/McIsaac score: 0/4 (no fever ≥38°C, no exudate, no tender nodes, cough present) → low (~1–2.5%) strep probability.',
        'Diagnosis: viral upper respiratory tract infection.',
        'No red flags for a deep-space infection.',
      ],
    },
    {
      id: 'community',
      kind: 'community',
      title: 'Public-health angle — stewardship',
      bullets: [
        'Every avoided unnecessary antibiotic slows community antimicrobial resistance.',
        'Consistent messaging reduces patient expectation and future demand.',
        'Cough etiquette and hand hygiene limit spread of respiratory viruses.',
        'Rational-prescribing audit and feedback are health-system levers.',
      ],
    },
    {
      id: 'management',
      kind: 'management',
      title: 'Management & counseling',
      bullets: [
        'Symptomatic care: fluids, rest, paracetamol for pain/fever, saline gargles/steam.',
        'Explain the expected course (usually settles in about a week) and why antibiotics will not speed a viral illness.',
        'Safety-net: return if unable to swallow saliva, difficulty breathing, drooling, one-sided severe pain/swelling, high fever persisting, or no improvement after ~7 days.',
        'Advise cough hygiene and hand-washing to protect classmates.',
      ],
    },
    {
      id: 'reflection',
      kind: 'reflection',
      title: 'Reflection',
      reflectionPrompt:
        'How will you phrase the "no antibiotic needed" message so the patient feels cared for rather than dismissed? What one red flag would make you change your plan?',
    },
    {
      id: 'summary',
      kind: 'summary',
      title: 'Summary & key learning points',
      bullets: [
        'Most sore throats are viral and self-limiting.',
        'Use Centor/McIsaac features to estimate strep probability.',
        'Counsel and safety-net instead of prescribing in low-probability cases.',
        'Know the deep-space-infection red flags.',
        'Stewardship protects the individual and the community.',
      ],
    },
  ],
};

const uti: Case = {
  slug: 'urinary-tract-infection',
  title: 'Burning and Frequency — Urinary Tract Infection',
  condition: 'UTI',
  summary:
    'A 28-year-old woman with dysuria and frequency. Diagnose uncomplicated cystitis, decide when to investigate, and spot complicated features.',
  competency: {
    code: 'CM 4.x / IM 5.x',
    text:
      'Diagnose and manage uncomplicated UTI, recognise complicated/upper-tract features, and counsel on prevention.',
  },
  difficulty: 'Intermediate',
  minutes: 16,
  reasoningFocus:
    'Separating uncomplicated cystitis from complicated/pyelonephritis and reasoning about when tests add value.',
  tags: ['Communicable', 'Diagnosis', 'Rational prescribing'],
  status: 'ready',
  keyLearningPoints: [
    'Typical dysuria + frequency + urgency without vaginal symptoms strongly predicts uncomplicated cystitis.',
    'Healthy non-pregnant women with classic cystitis often need no culture before treatment.',
    'Red flags — fever, flank pain, vomiting, pregnancy, male sex, recurrent/complicated features — change management.',
    'Choose short-course, guideline-concordant antibiotics and counsel on prevention.',
    'Do not treat asymptomatic bacteriuria except in pregnancy or before urological procedures.',
  ],
  steps: [
    {
      id: 'scenario',
      kind: 'scenario',
      title: 'Patient scenario',
      body:
        'Ms. Priya, 28, presents with two days of burning during urination, needing to pass urine frequently and urgently, and lower abdominal discomfort. She is otherwise well.',
      bullets: [
        'Sexually active; not pregnant (LMP recent, normal); no contraceptive issues.',
        'No fever, no back pain, no vaginal discharge or itch.',
        'No previous kidney disease; first such episode.',
      ],
    },
    {
      id: 'history',
      kind: 'history',
      title: 'History',
      bullets: [
        'Dysuria, urinary frequency and urgency; suprapubic discomfort.',
        'Urine slightly cloudy; no visible blood reported.',
        'No fever, rigors, flank pain, nausea or vomiting.',
        'No vaginal discharge or itching (makes vaginitis/cervicitis less likely).',
        'Not pregnant; no diabetes; no recent catheter or instrumentation.',
      ],
      redFlags: ['Fever, flank pain, rigors or vomiting would suggest pyelonephritis (upper-tract) — a different, more serious pathway.'],
    },
    {
      id: 'exam',
      kind: 'examination',
      title: 'Examination',
      bullets: [
        'Vitals: T 37.0°C (afebrile), BP 118/74 mmHg, PR 78/min, RR 14/min — comfortable, not toxic.',
        'Abdomen: mild suprapubic tenderness; NO renal-angle (flank) tenderness.',
        'No signs of systemic sepsis.',
      ],
      media: { type: 'image', caption: 'Illustrative figure — clinical photography to follow institutional approval. Renal-angle (flank) tenderness examination technique.' },
    },
    {
      id: 'decision',
      kind: 'decision',
      title: 'Decision point — investigate or treat?',
      body: 'A healthy non-pregnant woman with classic cystitis symptoms and no red flags. What is the most appropriate approach?',
      decision: {
        prompt: 'Choose the best step:',
        options: [
          {
            id: 'a',
            label: 'Treat empirically for uncomplicated cystitis; urine culture not routinely required',
            correct: true,
            feedback:
              'Correct. In a non-pregnant woman with typical symptoms and no complicating features, empirical short-course treatment is appropriate; routine culture adds little.',
          },
          {
            id: 'b',
            label: 'Order an urgent ultrasound KUB and CT before any treatment',
            feedback:
              'Over-investigation. Imaging is not needed for a first episode of uncomplicated cystitis without red flags.',
          },
          {
            id: 'c',
            label: 'Withhold treatment until a culture result returns in 48–72 hours',
            feedback:
              'Unnecessary delay. Symptomatic uncomplicated cystitis is treated empirically; waiting prolongs discomfort without benefit.',
          },
        ],
      },
    },
    {
      id: 'invest',
      kind: 'investigation',
      title: 'Investigations',
      bullets: [
        'Urine dipstick (if available): leucocyte esterase and/or nitrite positive supports UTI.',
        'Urine culture: reserve for pregnancy, treatment failure, recurrence, or complicated features.',
        'A pregnancy test where pregnancy is possible and not excluded.',
      ],
    },
    {
      id: 'reasoning',
      kind: 'reasoning',
      title: 'Clinical reasoning',
      body:
        'Classic lower-urinary-tract symptoms without vaginal symptoms give a high probability of uncomplicated cystitis. The absence of fever, flank pain, vomiting, pregnancy, and other complicating factors means this is not pyelonephritis and not "complicated". Empirical short-course therapy is justified, with clear return advice.',
      bullets: [
        'Diagnosis: uncomplicated acute cystitis.',
        'No upper-tract or complicated features.',
        'Empirical treatment with safety-netting is appropriate.',
      ],
    },
    {
      id: 'community',
      kind: 'community',
      title: 'Public-health / stewardship angle',
      bullets: [
        'Follow local antibiograms and guidelines to preserve first-line agents.',
        'Avoid treating asymptomatic bacteriuria (except pregnancy/pre-procedure).',
        'Educate on prevention to reduce recurrence and repeat prescribing.',
        'Recurrent UTI in the community may flag hygiene, hydration, or comorbidity issues.',
      ],
    },
    {
      id: 'management',
      kind: 'management',
      title: 'Management & counseling',
      bullets: [
        'Short-course, guideline-concordant antibiotic (per local sensitivity, e.g., nitrofurantoin) — avoid unnecessary broad-spectrum agents.',
        'Advice: adequate fluids, complete the course, analgesia for discomfort.',
        'Prevention: hydration, post-coital voiding, appropriate hygiene.',
        'Safety-net: return if fever, flank pain, vomiting, symptoms persist beyond 48–72 hours, or recur — reassess for pyelonephritis/complicated UTI and culture.',
      ],
    },
    {
      id: 'reflection',
      kind: 'reflection',
      title: 'Reflection',
      reflectionPrompt:
        'Which features let you safely skip a culture here, and which single new symptom tomorrow would make you escalate to a complicated-UTI/pyelonephritis pathway?',
    },
    {
      id: 'summary',
      kind: 'summary',
      title: 'Summary & key learning points',
      bullets: [
        'Typical dysuria/frequency without vaginal symptoms = likely uncomplicated cystitis.',
        'Empirical short-course therapy suits healthy non-pregnant women; culture is selective.',
        'Fever/flank pain/vomiting/pregnancy/male sex change the pathway.',
        'Choose narrow, guideline-concordant antibiotics.',
        'Don’t treat asymptomatic bacteriuria outside pregnancy/procedures.',
      ],
    },
  ],
};

const chestPain: Case = {
  slug: 'chest-pain',
  title: 'Sudden Chest Pain — Emergency Triage',
  condition: 'Chest Pain',
  summary:
    'A 58-year-old man with acute central chest pain at a rural health centre. Triage the cannot-miss diagnoses, act on time, and arrange safe referral.',
  competency: {
    code: 'CM 4.x / IM 1.x',
    text:
      'Triage acute chest pain, recognise cardiac and other emergencies, initiate first-response management, and refer safely.',
  },
  difficulty: 'Advanced',
  minutes: 22,
  reasoningFocus:
    'Prioritising life-threatening differentials under time pressure and initiating time-critical first response.',
  tags: ['Emergency', 'Triage', 'CVD', 'Referral'],
  status: 'ready',
  keyLearningPoints: [
    'In acute chest pain, first exclude the cannot-miss diagnoses (ACS, aortic dissection, PE, tension pneumothorax).',
    'Time is muscle — recognise ACS early and start first-response treatment while arranging referral.',
    'An ECG within 10 minutes is central to triage where available.',
    'Even a primary-care/rural setting can deliver life-saving first response and a safe transfer.',
    'Safe referral with a pre-alert and continued monitoring is part of the treatment.',
  ],
  steps: [
    {
      id: 'scenario',
      kind: 'scenario',
      title: 'Patient scenario',
      body:
        'Mr. Ramesh, 58, arrives at a primary health centre with 40 minutes of severe central chest pain, sweating, and mild breathlessness. He is a smoker with hypertension.',
      bullets: [
        'Pain heavy/pressing, radiating to the left arm and jaw; started at rest.',
        'Associated sweating and nausea; not clearly pleuritic.',
        'Known hypertensive, current smoker, family history of early heart disease.',
      ],
      redFlags: ['Central crushing pain with sweating and radiation in a high-risk patient — treat as acute coronary syndrome until proven otherwise.'],
    },
    {
      id: 'history',
      kind: 'history',
      title: 'Focused, time-critical history',
      bullets: [
        'Onset, character, radiation: sudden, pressing, to arm/jaw — typical of cardiac ischaemia.',
        'No tearing interscapular pain (less likely dissection), no recent immobilisation/leg swelling (lowers PE probability), no preceding pleuritic sudden breathlessness.',
        'Risk factors: smoking, hypertension, age, family history.',
        'No prior similar episodes; no known allergies; last meal noted.',
      ],
    },
    {
      id: 'exam',
      kind: 'examination',
      title: 'Rapid examination',
      bullets: [
        'Anxious, diaphoretic; BP 148/92 both arms (no significant differential), PR 96 regular, RR 20, SpO₂ 96%.',
        'Chest: bilateral air entry, no tracheal shift, no unilateral hyper-resonance (against tension pneumothorax).',
        'Heart sounds normal, no new murmur; calves soft, non-tender.',
        'No signs of shock currently.',
      ],
    },
    {
      id: 'decision',
      kind: 'decision',
      title: 'Decision point — first action',
      body: 'High-risk central chest pain suggestive of ACS at a PHC. What is your immediate priority?',
      decision: {
        prompt: 'Choose the best immediate action:',
        options: [
          {
            id: 'a',
            label: 'Do an ECG now (≤10 min), give aspirin, monitor, and arrange urgent referral',
            correct: true,
            feedback:
              'Correct. Time-critical ACS care: early ECG, chewable aspirin (no contraindication), oxygen if hypoxic, IV access and monitoring, and immediate pre-alerted transfer.',
          },
          {
            id: 'b',
            label: 'Reassure, prescribe an antacid, and send home',
            feedback:
              'Dangerous. This presentation is high-risk ACS; discharging without ECG/treatment risks a fatal missed myocardial infarction.',
          },
          {
            id: 'c',
            label: 'Wait and observe for an hour to see if the pain settles before acting',
            feedback:
              'Unsafe delay. In suspected ACS, delaying assessment and aspirin loses myocardium and lives — act immediately.',
          },
        ],
      },
    },
    {
      id: 'invest',
      kind: 'investigation',
      title: 'Investigations & monitoring',
      bullets: [
        'ECG immediately — look for ST-elevation/depression, new changes (repeat if evolving).',
        'Continuous vitals and rhythm monitoring; SpO₂.',
        'Cardiac troponin if point-of-care available (do not delay referral for it).',
        'Blood glucose; brief screen for contraindications to aspirin/antiplatelet.',
      ],
    },
    {
      id: 'reasoning',
      kind: 'reasoning',
      title: 'Clinical reasoning — cannot-miss first',
      body:
        'The pattern (exertion-independent onset, pressing central pain, radiation, diaphoresis, high-risk profile) makes acute coronary syndrome the leading and most dangerous diagnosis. Equal-arm BP and no tearing pain lower dissection probability; clear symmetrical chest and no shift argue against tension pneumothorax; no PE risk features. The task is to treat the most lethal likely cause and transfer — not to wait for certainty.',
      bullets: [
        'Working diagnosis: acute coronary syndrome.',
        'Cannot-miss alternatives considered and made less likely on exam.',
        'Priority: first response + safe, rapid referral.',
      ],
    },
    {
      id: 'community',
      kind: 'community',
      title: 'System / community angle',
      bullets: [
        'Community CVD risk reduction: tobacco control, hypertension screening and control.',
        'Strengthen referral pathways and pre-hospital transport (108/ambulance).',
        'Awareness campaigns: recognise heart-attack symptoms and call for help early.',
        'Hub-and-spoke STEMI networks improve rural outcomes.',
      ],
    },
    {
      id: 'management',
      kind: 'management',
      title: 'First-response management & referral',
      bullets: [
        'Aspirin (chewed) if no contraindication; oxygen only if hypoxic; analgesia as available.',
        'IV access, continuous monitoring, keep resuscitation equipment ready.',
        'Immediate referral to a facility with ECG/cath capability; pre-alert the receiving team.',
        'Accompany with monitoring and a clear referral note (time of onset, ECG, treatment given).',
        'Counsel patient/family briefly and calmly about the emergency and transfer.',
      ],
    },
    {
      id: 'reflection',
      kind: 'reflection',
      title: 'Reflection',
      reflectionPrompt:
        'Under time pressure, how did you decide to treat before you had certainty? Which finding would most change your leading diagnosis away from ACS?',
    },
    {
      id: 'summary',
      kind: 'summary',
      title: 'Summary & key learning points',
      bullets: [
        'Exclude the cannot-miss causes first in acute chest pain.',
        'Suspected ACS = ECG ≤10 min, aspirin, monitor, refer — don’t wait.',
        'A rural/PHC setting can still deliver life-saving first response.',
        'Safe, pre-alerted referral with monitoring is part of care.',
        'Community CVD prevention and transport systems save lives upstream.',
      ],
    },
  ],
};

const growth: Case = {
  slug: 'paediatric-growth-nutrition',
  title: 'Falling Off the Curve — Growth & Nutrition',
  condition: 'Paediatric Growth/Nutrition',
  summary:
    'A 14-month-old whose weight is faltering. Interpret the growth chart, classify undernutrition, and plan community-based management.',
  competency: {
    code: 'CM 10.x / PE 10.x',
    text:
      'Plot and interpret growth, classify undernutrition, identify danger signs, and manage at community level.',
  },
  difficulty: 'Intermediate',
  minutes: 20,
  reasoningFocus:
    'Reading a growth trajectory (not a single point) and classifying to drive the right level of intervention.',
  tags: ['Paediatric', 'Nutrition', 'Screening', 'Prevention'],
  status: 'ready',
  keyLearningPoints: [
    'Growth is a trajectory — interpret serial points, not one measurement.',
    'Crossing centiles downward (growth faltering) is an early warning before frank malnutrition.',
    'Classify with weight-for-height/MUAC and check for oedema to identify severe acute malnutrition.',
    'Screen for danger signs and complications that require inpatient/facility care.',
    'Most undernutrition is managed in the community with feeding, micronutrients, and follow-up.',
  ],
  steps: [
    {
      id: 'scenario',
      kind: 'scenario',
      title: 'Patient scenario',
      body:
        'Baby Meena, 14 months, is brought for a routine Anganwadi weighing. Her mother says she is "small and a poor eater". Serial weights are available on the growth card.',
      bullets: [
        'Serial weights show the line flattening and crossing downward over 3 months.',
        'Breastfed; complementary feeding started late and is mostly diluted gruel.',
        'Recurrent minor illnesses over the last few months.',
      ],
      media: { type: 'image', caption: 'Illustrative figure — clinical photography to follow institutional approval. Growth chart / MCP card with plotted points.' },
    },
    {
      id: 'history',
      kind: 'history',
      title: 'History',
      bullets: [
        'Feeding: infrequent, low-energy-density complementary feeds; limited diversity.',
        'Repeated episodes of diarrhoea and URTI (infection–malnutrition cycle).',
        'Immunisation up to date; vitamin A given.',
        'No swelling of feet, alert and playful, appetite reduced but present.',
        'Family: food insecurity and competing sibling demands.',
      ],
    },
    {
      id: 'exam',
      kind: 'examination',
      title: 'Examination & anthropometry',
      bullets: [
        'Weight-for-age below expected; weight-for-height reduced; MUAC 12.0 cm.',
        'No bilateral pedal oedema; no visible severe wasting of the "old man" facies.',
        'No danger signs: feeding, alert, no lethargy, no dehydration today.',
        'Mild pallor; skin and hair changes minimal.',
      ],
      redFlags: ['Bilateral pedal oedema, MUAC <11.5 cm, or inability to feed would indicate SAM with need for facility care.'],
    },
    {
      id: 'decision',
      kind: 'decision',
      title: 'Decision point — interpret the chart',
      body: 'The card shows the weight line flattening and crossing centiles downward over three months. How do you interpret and act?',
      decision: {
        prompt: 'Select the correct interpretation:',
        options: [
          {
            id: 'a',
            label: 'Growth faltering — assess nutrition/illness and start community-based management with follow-up',
            correct: true,
            feedback:
              'Correct. A downward-crossing trajectory is growth faltering. With no SAM danger signs, she is managed in the community with feeding support, micronutrients, infection care, and close weight follow-up.',
          },
          {
            id: 'b',
            label: 'Normal — she is just constitutionally small; reassure and do nothing',
            feedback:
              'Incorrect. A falling trajectory across centiles is not reassuring; it signals faltering that needs assessment and action.',
          },
          {
            id: 'c',
            label: 'Assume severe acute malnutrition and admit immediately regardless of signs',
            feedback:
              'Not yet. Classification depends on WFH/MUAC and oedema and danger signs. Without SAM criteria, community management is appropriate.',
          },
        ],
      },
    },
    {
      id: 'invest',
      kind: 'investigation',
      title: 'Assessment',
      bullets: [
        'Confirm anthropometry: weight-for-height Z-score, MUAC, check for bilateral oedema, appetite test.',
        'Haemoglobin for anaemia; look for treatable infection.',
        'Dietary and feeding-practice assessment (frequency, density, diversity).',
      ],
    },
    {
      id: 'reasoning',
      kind: 'reasoning',
      title: 'Clinical reasoning',
      body:
        'Meena shows growth faltering driven by inadequate complementary feeding compounded by recurrent infections. She has moderate acute malnutrition features (reduced WFH, MUAC 12.0 cm) but no SAM danger signs (no oedema, MUAC ≥11.5 cm, feeding, alert). This is community-manageable with feeding correction, micronutrients, infection control and structured follow-up.',
      bullets: [
        'Interpretation: growth faltering / moderate undernutrition.',
        'No SAM criteria → community-based management.',
        'Target the feeding and infection drivers.',
      ],
    },
    {
      id: 'community',
      kind: 'community',
      title: 'Community / programme angle',
      bullets: [
        'Link to ICDS/Anganwadi supplementary nutrition and growth monitoring.',
        'Counsel on age-appropriate complementary feeding (frequency, energy density, diversity, responsive feeding).',
        'Address underlying determinants: food security, hygiene, birth spacing.',
        'Community-based management of acute malnutrition (CMAM) referral if it worsens.',
      ],
    },
    {
      id: 'management',
      kind: 'management',
      title: 'Management & counseling',
      bullets: [
        'Feeding: increase frequency and energy density; add oil, pulses, and diverse foods; continue breastfeeding.',
        'Micronutrients: treat anaemia, ensure vitamin A; deworming per schedule.',
        'Treat/prevent infections; complete immunisation.',
        'Follow-up: re-weigh at defined intervals; escalate to facility/CMAM if weight falls further, oedema appears, or appetite fails.',
        'Counsel and support the mother; involve the Anganwadi worker.',
      ],
    },
    {
      id: 'reflection',
      kind: 'reflection',
      title: 'Reflection',
      reflectionPrompt:
        'Why is the trajectory more informative than a single weight, and which finding at follow-up would make you refer Meena to facility-based care?',
    },
    {
      id: 'summary',
      kind: 'summary',
      title: 'Summary & key learning points',
      bullets: [
        'Interpret the growth trajectory, not a single point.',
        'Downward centile-crossing = growth faltering, an early warning.',
        'Classify with WFH/MUAC and oedema to find SAM.',
        'Screen for danger signs needing facility care.',
        'Most undernutrition is managed in the community with feeding, micronutrients, and follow-up.',
      ],
    },
  ],
};

const outbreak: Case = {
  slug: 'vector-borne-outbreak',
  title: 'A Cluster of Fevers — Outbreak Investigation',
  condition: 'Vector-borne disease/outbreak',
  summary:
    'Several fever cases appear in one urban ward during the monsoon. Work through the steps of an outbreak investigation and vector control.',
  competency: {
    code: 'CM 8.x',
    text:
      'Investigate a suspected outbreak using epidemiological steps and plan vector-borne disease control.',
  },
  difficulty: 'Advanced',
  minutes: 28,
  reasoningFocus:
    'Applying the systematic steps of outbreak investigation and epidemiological reasoning to guide action.',
  tags: ['Epidemiology', 'Outbreak', 'Communicable', 'Vector control'],
  status: 'ready',
  keyLearningPoints: [
    'Outbreak investigation follows systematic steps — confirm, define, describe by time/place/person, hypothesise, test, control, communicate.',
    'A clear case definition is the backbone of counting and comparison.',
    'Describing the epidemic by time (curve), place (spot map), and person generates hypotheses.',
    'Control need not wait for full analysis — act on the likely source in parallel.',
    'Vector-borne outbreaks demand source reduction and community engagement, not just case treatment.',
  ],
  steps: [
    {
      id: 'scenario',
      kind: 'scenario',
      title: 'Scenario',
      body:
        'During the monsoon, the urban health centre notices 14 cases of acute febrile illness from one ward in a week — more than usual. Several have headache, retro-orbital pain, and body aches. You are asked to investigate.',
      bullets: [
        'Ward has water-storage habits and construction sites with stagnant water.',
        'A few patients have a low platelet count on initial testing.',
        'No deaths yet; some clustering around a few streets.',
      ],
      media: { type: 'image', caption: 'Illustrative figure — clinical photography to follow institutional approval. Field investigation / larval survey.' },
    },
    {
      id: 'reasoning',
      kind: 'reasoning',
      title: 'Step 1–2 — Confirm the outbreak & the diagnosis',
      body:
        'First verify that the number of cases genuinely exceeds the expected baseline for this ward and season (confirm the outbreak), and confirm the diagnosis clinically and with laboratory tests. The syndrome (fever, retro-orbital pain, myalgia, thrombocytopenia) during monsoon in an Aedes-friendly environment points toward dengue.',
      bullets: [
        'Compare current counts with the ward’s expected baseline — a true excess?',
        'Confirm diagnosis: clinical picture + lab (e.g., NS1/serology, platelet trend).',
        'Rule out look-alikes (malaria, chikungunya, leptospirosis, enteric fever).',
      ],
    },
    {
      id: 'decision',
      kind: 'decision',
      title: 'Decision point — the case definition',
      body: 'Before counting cases, you must define one. What makes the best working case definition for the descriptive phase?',
      decision: {
        prompt: 'Choose the most appropriate case definition:',
        options: [
          {
            id: 'a',
            label: 'A person in the ward with acute fever plus ≥1 of headache/retro-orbital pain/myalgia during the outbreak period (with time, place, person specified)',
            correct: true,
            feedback:
              'Correct. A good working case definition specifies clinical criteria and person/place/time, and is sensitive enough to capture cases for the descriptive epidemiology.',
          },
          {
            id: 'b',
            label: 'Only laboratory-confirmed dengue with NS1 positivity',
            feedback:
              'Too restrictive for the early descriptive phase — it will miss many true cases and delay action. Confirmed definitions are used later for classification.',
          },
          {
            id: 'c',
            label: 'Anyone in the city who feels unwell',
            feedback:
              'Too broad and non-specific — it captures unrelated illness and destroys the signal. A case definition needs clinical and person/place/time limits.',
          },
        ],
      },
    },
    {
      id: 'invest',
      kind: 'investigation',
      title: 'Step 3 — Describe by time, place, person',
      bullets: [
        'Time: plot an epidemic curve (onset dates) — shape suggests a continuing common-source/propagated pattern.',
        'Place: spot-map cases — clustering around streets with stagnant water and construction sites.',
        'Person: tabulate age, sex, occupation; note who is most affected.',
        'Line-list every case with the standard variables for analysis.',
      ],
      media: { type: 'image', caption: 'Illustrative figure — clinical photography to follow institutional approval. Epidemic curve and spot map.' },
    },
    {
      id: 'community',
      kind: 'community',
      title: 'Step 4–5 — Hypothesise & test; entomology',
      bullets: [
        'Hypothesis: dengue transmitted by Aedes breeding in stored water and construction-site collections.',
        'Test with analytic comparison where feasible (e.g., compare breeding indices in affected vs unaffected areas).',
        'Entomological survey: House Index, Container Index, Breteau Index to quantify vector density.',
        'Confirm a proportion of cases with laboratory testing.',
      ],
    },
    {
      id: 'management',
      kind: 'management',
      title: 'Step 6–7 — Control & communicate (in parallel)',
      bullets: [
        'Source reduction: eliminate breeding sites, cover/empty water containers, manage construction-site water, larvicide.',
        'Personal protection: repellents, bed nets/screens, full-sleeve clothing; community clean-up drives.',
        'Case management: supportive care, warning-sign education, referral for severe dengue; strengthen surveillance.',
        'Risk communication: engage the community, local leaders, and media; issue advisories.',
        'Document and write the outbreak report; feed back to the system.',
      ],
      redFlags: ['Warning signs of severe dengue (bleeding, persistent vomiting, severe abdominal pain, lethargy, rising haematocrit with falling platelets) need urgent referral.'],
    },
    {
      id: 'reflection',
      kind: 'reflection',
      title: 'Reflection',
      reflectionPrompt:
        'Why is it acceptable — even necessary — to begin control measures before the analytic study is complete? Which step do you think is most often skipped in practice?',
    },
    {
      id: 'summary',
      kind: 'summary',
      title: 'Summary & key learning points',
      bullets: [
        'Follow the systematic outbreak-investigation steps.',
        'A clear case definition (time/place/person) underpins good counting.',
        'Describe by time (curve), place (map), and person to build hypotheses.',
        'Begin control in parallel with investigation — don’t wait.',
        'Vector-borne control = source reduction + protection + community engagement.',
      ],
    },
  ],
};

const environmental: Case = {
  slug: 'environmental-occupational-health',
  title: 'The Breathless Stone-Cutter — Occupational Health',
  condition: 'Environmental/occupational health',
  summary:
    'A 45-year-old stone-quarry worker with progressive breathlessness. Link exposure to disease and design prevention across the worksite.',
  competency: {
    code: 'CM 6.x / 7.x',
    text:
      'Establish the exposure–disease link, diagnose occupational lung disease, and plan hierarchy-of-control prevention.',
  },
  difficulty: 'Advanced',
  minutes: 24,
  reasoningFocus:
    'Causal reasoning from exposure to disease and shifting from individual treatment to workplace/community prevention.',
  tags: ['Occupational', 'Environmental', 'Prevention', 'Respiratory'],
  status: 'ready',
  keyLearningPoints: [
    'Always ask "what is your job?" — occupational history is the key to occupational disease.',
    'Silica exposure (quarrying, stone-cutting, sandblasting) causes silicosis and raises TB risk.',
    'Diagnosis links a compatible exposure, latency, and imaging/clinical picture.',
    'Prevention uses the hierarchy of controls — elimination/substitution > engineering > administrative > PPE.',
    'Occupational disease is a sentinel event: one case implies others are at risk at the worksite.',
  ],
  steps: [
    {
      id: 'scenario',
      kind: 'scenario',
      title: 'Patient scenario',
      body:
        'Mr. Shivu, 45, works cutting and dressing granite in a quarry. He presents with 8 months of progressive breathlessness on exertion and a dry cough. Dust control at his worksite is minimal.',
      bullets: [
        '15 years cutting stone; frequent dry-cutting with visible dust; no respirator used.',
        'Non-smoker; no cardiac history.',
        'Several co-workers reportedly have similar cough/breathlessness.',
      ],
      redFlags: ['Weight loss, evening fever, or haemoptysis would raise concern for co-existing tuberculosis, which is strongly associated with silicosis.'],
    },
    {
      id: 'history',
      kind: 'history',
      title: 'History — including occupational history',
      bullets: [
        'Occupation: 15 years stone-cutting; high respirable crystalline silica exposure; dry cutting; poor ventilation; no PPE.',
        'Symptom latency fits years of cumulative exposure.',
        'Progressive exertional dyspnoea and dry cough; no wheeze suggestive of asthma trigger at home.',
        'No TB symptoms today (no fever/weight loss/haemoptysis) — but must be screened.',
        'Others at the worksite similarly affected (a clue to a shared exposure).',
      ],
    },
    {
      id: 'exam',
      kind: 'examination',
      title: 'Examination',
      bullets: [
        'Vitals: BP 124/80 mmHg, PR 92/min; mild tachypnoea on exertion; SpO₂ 95% at rest.',
        'Chest: fine crackles; no gross wheeze; no clubbing.',
        'No signs of heart failure; no lymphadenopathy.',
      ],
    },
    {
      id: 'decision',
      kind: 'decision',
      title: 'Decision point — the crucial next question/step',
      body: 'Given progressive dyspnoea in a stone-cutter, which step is most decisive in establishing the diagnosis and protecting others?',
      decision: {
        prompt: 'Choose the best step:',
        options: [
          {
            id: 'a',
            label: 'Take a detailed occupational/exposure history and arrange a chest X-ray + TB screen',
            correct: true,
            feedback:
              'Correct. The occupational history plus imaging establishes the exposure–disease link (silicosis) and TB screening is essential given the strong association — and it flags risk to co-workers.',
          },
          {
            id: 'b',
            label: 'Treat empirically as asthma with inhalers and review in a month',
            feedback:
              'Misdirected. The picture and exposure point to occupational lung disease, not asthma; this delays diagnosis and misses the workplace hazard.',
          },
          {
            id: 'c',
            label: 'Reassure that dust is harmless and advise he keep working as usual',
            feedback:
              'Incorrect and unsafe. Respirable silica is a well-established hazard; ignoring it endangers this worker and his colleagues.',
          },
        ],
      },
    },
    {
      id: 'invest',
      kind: 'investigation',
      title: 'Investigations',
      bullets: [
        'Chest X-ray: look for small rounded opacities (upper zones) typical of silicosis; ± progressive massive fibrosis.',
        'Spirometry: restrictive (or mixed) pattern.',
        'TB screening: sputum for AFB/CBNAAT given the silicosis–TB association.',
        'Document exposure details for certification and workplace action.',
      ],
      media: { type: 'image', caption: 'Illustrative figure — clinical photography to follow institutional approval. Chest radiograph with silicotic nodules.' },
    },
    {
      id: 'reasoning',
      kind: 'reasoning',
      title: 'Clinical reasoning — the exposure–disease link',
      body:
        'The triad of a compatible high-silica exposure, an appropriate latency (years), and a compatible clinical/imaging picture supports silicosis. The clustering of similar symptoms among co-workers strengthens an occupational cause. Co-existing tuberculosis must be actively excluded because silica greatly increases TB risk.',
      bullets: [
        'Diagnosis: silicosis (occupational lung disease).',
        'Screen for and exclude co-existing tuberculosis.',
        'Sentinel case — colleagues are likely exposed and at risk.',
      ],
    },
    {
      id: 'community',
      kind: 'community',
      title: 'Workplace & community prevention (hierarchy of controls)',
      bullets: [
        'Elimination/substitution: wet-cutting instead of dry; safer processes/materials.',
        'Engineering: local exhaust ventilation, dust suppression, enclosure.',
        'Administrative: exposure limits, job rotation, training, periodic medical surveillance.',
        'PPE: appropriate respirators as the last line, correctly fitted.',
        'Screen co-workers; notify the occupational-health/labour authority; link to compensation.',
      ],
    },
    {
      id: 'management',
      kind: 'management',
      title: 'Management & counseling',
      bullets: [
        'No cure for established silicosis — halt further exposure and prevent progression.',
        'Treat/prevent TB and other infections; vaccinate (e.g., influenza/pneumococcal as advised).',
        'Symptomatic care and pulmonary rehabilitation; manage complications.',
        'Counsel on smoking avoidance and on his rights, certification, and compensation.',
        'Advocate worksite improvements and periodic surveillance for all workers.',
      ],
    },
    {
      id: 'reflection',
      kind: 'reflection',
      title: 'Reflection',
      reflectionPrompt:
        'How did the single question "what is your job?" reshape the whole case? Why is treating this one patient insufficient without acting on the worksite?',
    },
    {
      id: 'summary',
      kind: 'summary',
      title: 'Summary & key learning points',
      bullets: [
        'Take an occupational history in every relevant presentation.',
        'Silica exposure → silicosis and increased TB risk.',
        'Diagnosis links compatible exposure, latency, and imaging/clinical picture.',
        'Prevent using the hierarchy of controls — PPE is the last resort.',
        'One occupational case is a sentinel event for the whole workforce.',
      ],
    },
  ],
};

export const extraCases: Case[] = [
  postnatal,
  diarrhoea,
  urti,
  uti,
  chestPain,
  growth,
  outbreak,
  environmental,
];
