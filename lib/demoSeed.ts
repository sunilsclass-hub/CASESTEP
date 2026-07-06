'use client';

/**
 * Illustrative demo-data seeding for the Student Dashboard.
 *
 * This is NOT real student data. It exists purely so a first-time visitor
 * (e.g. a FAIMER mentor previewing the platform) can see what a populated
 * dashboard looks like without having to play through every module first.
 * Seeding only happens when the learner explicitly clicks "Load illustrative
 * demo progress" — never automatically — and can be cleared at any time via
 * the existing "Reset my data" control (both write to the same localStorage
 * key, so demo and real progress never mix silently).
 */

import { cases } from '@/data/cases';
import { sctModules } from '@/data/sct';
import { osceStations } from '@/data/osce';
import { writeStore, type Store, type CaseProgress, type SCTResult, type OSCEResult } from './storage';

/** Mirrors the partial-credit rule used by SCTPlayer (exact=1, off-by-one=0.5). */
function sctCredit(answer: number, expertMode: number): number {
  const diff = Math.abs(answer - expertMode);
  if (diff === 0) return 1;
  if (diff === 1) return 0.5;
  return 0;
}

export function buildIllustrativeDemoStore(): Store {
  const ready = cases.filter((c) => c.status === 'ready');
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  const caseEntries: Record<string, CaseProgress> = {};

  // First case: fully completed, with a reflection, a few days ago.
  const c0 = ready[0];
  if (c0?.steps) {
    const decisions: Record<string, string> = {};
    const reflections: Record<string, string> = {};
    for (const step of c0.steps) {
      if (step.kind === 'decision' && step.decision) {
        const preferred = step.decision.options.find((o) => o.correct) ?? step.decision.options[0];
        decisions[step.id] = preferred.id;
      }
      if (step.reflectionPrompt) {
        reflections[step.id] =
          'Recognising the community-screening angle changed how I would manage this patient beyond the clinic visit.';
      }
    }
    caseEntries[c0.slug] = {
      completed: true,
      lastStepIndex: c0.steps.length - 1,
      decisions,
      reflections,
      updatedAt: now - 3 * day,
    };
  }

  // Second case: also completed, more recently (shows up as "recently completed").
  const c1 = ready[1];
  if (c1?.steps) {
    const decisions: Record<string, string> = {};
    for (const step of c1.steps) {
      if (step.kind === 'decision' && step.decision) {
        const preferred = step.decision.options.find((o) => o.correct) ?? step.decision.options[0];
        decisions[step.id] = preferred.id;
      }
    }
    caseEntries[c1.slug] = {
      completed: true,
      lastStepIndex: c1.steps.length - 1,
      decisions,
      reflections: {},
      updatedAt: now - day,
    };
  }

  // Third case: in progress, partway through (shows up as "next recommended" is the one after this).
  const c2 = ready[2];
  if (c2?.steps && c2.steps.length > 2) {
    caseEntries[c2.slug] = {
      completed: false,
      lastStepIndex: Math.floor(c2.steps.length / 2),
      decisions: {},
      reflections: {},
      updatedAt: now - 2 * day,
    };
  }

  // One SCT attempt with strong (not perfect) concordance.
  const sctEntries: Record<string, SCTResult> = {};
  const sctModule = sctModules[0];
  if (sctModule) {
    const answers: Record<string, number> = {};
    let score = 0;
    sctModule.items.forEach((item, i) => {
      // Mostly concordant with the expert panel; one item slightly off for realism.
      const answer = i === 1 ? Math.max(-2, Math.min(2, item.expertMode - 1)) : item.expertMode;
      answers[item.id] = answer;
      score += sctCredit(answer, item.expertMode);
    });
    sctEntries[sctModule.id] = {
      moduleId: sctModule.id,
      answers,
      score,
      maxScore: sctModule.items.length,
      updatedAt: now - 2 * day,
    };
  }

  // One OSCE station scored at a solid (not perfect) level.
  const osceEntries: Record<string, OSCEResult> = {};
  const station = osceStations[0];
  if (station) {
    const checked: Record<string, boolean> = {};
    let score = 0;
    const maxScore = station.checklist.reduce((s, i) => s + i.weight, 0);
    station.checklist.forEach((item, i) => {
      const got = i !== station.checklist.length - 1; // miss the last item, for realism
      checked[item.id] = got;
      if (got) score += item.weight;
    });
    osceEntries[station.id] = {
      stationId: station.id,
      checked,
      globalRating: 3,
      score,
      maxScore,
      updatedAt: now - day,
    };
  }

  return {
    cases: caseEntries,
    sct: sctEntries,
    osce: osceEntries,
    expertReviews: [],
  };
}

/** Seed illustrative demo progress into localStorage (explicit user action only). */
export function loadIllustrativeDemoProgress() {
  writeStore(buildIllustrativeDemoStore());
}
