/**
 * Media manifest — maps case slugs and OSCE station ids to their original SVG
 * illustration in /public/media. Centralising this here means components
 * never hardcode a media path, and it is obvious at a glance which topics
 * have dedicated artwork.
 *
 * FUTURE MEDIA: when institution-approved photography/video is available,
 * replace the referenced file (same path) or point the entry at a new one —
 * no component changes are needed.
 */

export const caseIllustration: Record<string, string> = {
  'type-2-diabetes-mellitus': '/media/cases/type-2-diabetes-mellitus.svg',
  hypertension: '/media/cases/hypertension.svg',
  'antenatal-care': '/media/cases/antenatal-care.svg',
  'postnatal-care': '/media/cases/postnatal-care.svg',
  'acute-diarrhoea': '/media/cases/acute-diarrhoea.svg',
  'upper-respiratory-tract-infection': '/media/cases/upper-respiratory-tract-infection.svg',
  'urinary-tract-infection': '/media/cases/urinary-tract-infection.svg',
  'chest-pain': '/media/cases/chest-pain.svg',
  'paediatric-growth-nutrition': '/media/cases/paediatric-growth-nutrition.svg',
  'vector-borne-outbreak': '/media/cases/vector-borne-outbreak.svg',
  'environmental-occupational-health': '/media/cases/environmental-occupational-health.svg',
};

export const osceIllustration: Record<string, string> = {
  'osce-bp': '/media/cases/hypertension.svg',
  'osce-anc': '/media/cases/antenatal-care.svg',
  'ospe-growth': '/media/cases/paediatric-growth-nutrition.svg',
  'osce-diabetes-foot': '/media/osce/diabetes-foot-risk-screening.svg',
};

/** SCT modules reuse the closest case illustration — same visual language, no new assets needed. */
export const sctIllustration: Record<string, string> = {
  'sct-t2dm': '/media/cases/type-2-diabetes-mellitus.svg',
  'sct-htn': '/media/cases/hypertension.svg',
  'sct-anc': '/media/cases/antenatal-care.svg',
  'sct-diarrhoea': '/media/cases/acute-diarrhoea.svg',
  'sct-tb-outbreak': '/media/cases/vector-borne-outbreak.svg',
  'sct-urti': '/media/cases/upper-respiratory-tract-infection.svg',
  'sct-uti': '/media/cases/urinary-tract-infection.svg',
  'sct-postnatal': '/media/cases/postnatal-care.svg',
  'sct-outbreak': '/media/cases/vector-borne-outbreak.svg',
  'sct-chest-pain': '/media/cases/chest-pain.svg',
  'sct-growth': '/media/cases/paediatric-growth-nutrition.svg',
  'sct-environmental': '/media/cases/environmental-occupational-health.svg',
};

/** Video placeholders keyed by an id referenced from case-step data or OSCE stations. */
export interface VideoPlaceholderSpec {
  title: string;
  objective: string;
}

export const caseVideos: Record<string, VideoPlaceholderSpec[]> = {
  'type-2-diabetes-mellitus': [
    {
      title: 'How to perform diabetic foot screening',
      objective: 'Demonstrate 10-g monofilament technique and visual inspection for foot-risk stratification.',
    },
    {
      title: 'Lifestyle counseling for diabetes in primary care',
      objective: 'Model a brief, structured counseling conversation on diet, activity, and adherence.',
    },
  ],
  hypertension: [
    {
      title: 'Correct BP measurement technique',
      objective: 'Demonstrate patient positioning, cuff size selection, and auscultatory technique.',
    },
    {
      title: 'Counseling for hypertension lifestyle modification',
      objective: 'Model salt-reduction and adherence counseling for a newly diagnosed hypertensive patient.',
    },
  ],
  'antenatal-care': [
    {
      title: 'Antenatal counseling and danger signs',
      objective: 'Demonstrate structured counseling on pregnancy danger signs at a routine ANC visit.',
    },
    {
      title: 'Birth preparedness and complication readiness counseling',
      objective: 'Model a birth-preparedness planning conversation with an antenatal woman and her family.',
    },
  ],
};

export const osceVideos: Record<string, VideoPlaceholderSpec> = {
  'osce-bp': { title: 'BP measurement station demonstration', objective: 'Model the full candidate walkthrough for this OSCE station.' },
  'osce-anc': { title: 'Antenatal counseling station demonstration', objective: 'Model the full candidate walkthrough for this OSCE station.' },
  'ospe-growth': { title: 'Growth chart interpretation demonstration', objective: 'Model plotting and interpreting a growth trajectory.' },
  'osce-diabetes-foot': { title: 'Diabetic foot screening station demonstration', objective: 'Model the full candidate walkthrough for this OSCE station.' },
};
