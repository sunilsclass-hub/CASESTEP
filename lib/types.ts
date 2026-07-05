/**
 * CaseStep domain types.
 *
 * These interfaces describe the mock/local-JSON data model used across the
 * platform. They are intentionally decoupled from any storage layer so that a
 * future backend (Supabase / Firebase) can implement the same shapes without
 * touching the UI. See `data/*.ts` for the seed content.
 */

export type Difficulty = 'Foundation' | 'Intermediate' | 'Advanced';

export interface CompetencyRef {
  /** NMC CBME competency code, e.g. "CM 3.4". */
  code: string;
  /** Human-readable competency statement. */
  text: string;
}

/** A single option at a branching decision point. */
export interface DecisionOption {
  id: string;
  label: string;
  /** Whether this is the clinically preferred choice. */
  correct?: boolean;
  /** Immediate formative feedback shown after selection. */
  feedback: string;
}

export type StepKind =
  | 'scenario'
  | 'history'
  | 'examination'
  | 'investigation'
  | 'decision'
  | 'reasoning'
  | 'community'
  | 'management'
  | 'reflection'
  | 'summary';

/** One screen/step in the interactive case journey. */
export interface CaseStep {
  id: string;
  kind: StepKind;
  title: string;
  /** Rich narrative body (supports simple line breaks). */
  body?: string;
  /** Bullet list content (history prompts, findings, results, key points). */
  bullets?: string[];
  /** Media placeholder caption (image/video to be added later). */
  media?: { type: 'image' | 'video'; caption: string };
  /** Red-flag callouts for this step. */
  redFlags?: string[];
  /** Branching decision — when present the learner must choose to proceed. */
  decision?: {
    prompt: string;
    options: DecisionOption[];
  };
  /** Reflective free-text prompt (captured to localStorage). */
  reflectionPrompt?: string;
}

export interface Case {
  slug: string;
  title: string;
  condition: string;
  /** Short one-line teaser for the library card. */
  summary: string;
  competency: CompetencyRef;
  difficulty: Difficulty;
  /** Estimated completion time in minutes. */
  minutes: number;
  reasoningFocus: string;
  tags: string[];
  /** Fully authored cases have steps; placeholders are marked `status`. */
  status: 'ready' | 'coming-soon';
  steps?: CaseStep[];
  keyLearningPoints?: string[];
}

/* ------------------------------- SCT ------------------------------------- */

export interface SCTItem {
  id: string;
  /** The clinical vignette establishing baseline uncertainty. */
  scenario: string;
  /** "If you were thinking of ..." hypothesis. */
  ifThinking: string;
  /** "and then you find ..." new information. */
  andThen: string;
  /** The effect question, always the same 5-point structure. */
  question: string;
  /** Aggregated expert-panel modal answer (-2..2) — placeholder values. */
  expertMode: number;
  /** Rationale from the expert panel for the feedback page. */
  rationale: string;
}

export interface SCTModule {
  id: string;
  title: string;
  condition: string;
  intro: string;
  items: SCTItem[];
}

/* ------------------------------ OSCE ------------------------------------- */

export interface OSCEChecklistItem {
  id: string;
  text: string;
  /** Max marks for this step. */
  weight: number;
}

export interface OSCEStation {
  id: string;
  title: string;
  competency: CompetencyRef;
  type: 'OSCE' | 'OSPE';
  minutes: number;
  candidateInstructions: string;
  checklist: OSCEChecklistItem[];
  /** Global rating scale anchors (low → high). */
  globalRating: string[];
  examinerNotes: string[];
  studentFeedbackPrompts: string[];
}
