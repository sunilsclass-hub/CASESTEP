import { describe, it, expect } from 'vitest';
import { cases, getReadyCases, getCase } from '@/data/cases';
import { sctModules, sctScale } from '@/data/sct';
import { osceStations } from '@/data/osce';

describe('case catalogue data', () => {
  it('exposes 11 ready-to-play cases', () => {
    expect(getReadyCases()).toHaveLength(11);
    expect(cases.length).toBeGreaterThanOrEqual(11);
  });

  it('every ready case is fully authored with a competency and steps', () => {
    for (const c of getReadyCases()) {
      expect(c.competency.code, `${c.slug} competency`).toBeTruthy();
      expect(c.steps && c.steps.length, `${c.slug} steps`).toBeGreaterThan(3);
      expect(c.status).toBe('ready');
    }
  });

  it('the Type 2 Diabetes case includes a decision, reflection, and summary', () => {
    const c = getCase('type-2-diabetes-mellitus');
    expect(c).toBeDefined();
    const kinds = new Set(c!.steps!.map((s) => s.kind));
    expect(kinds.has('decision')).toBe(true);
    expect(kinds.has('reflection')).toBe(true);
    expect(kinds.has('summary')).toBe(true);
    expect(c!.keyLearningPoints!.length).toBeGreaterThan(0);
    // Every decision step offers exactly one clinically-preferred option.
    for (const step of c!.steps!.filter((s) => s.kind === 'decision')) {
      const correct = step.decision!.options.filter((o) => o.correct);
      expect(correct.length).toBe(1);
    }
  });

  it('case slugs are unique', () => {
    const slugs = cases.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe('assessment data', () => {
  it('SCT uses the −2…+2 concordance scale and has authored items', () => {
    expect(sctScale.map((s) => s.value)).toEqual([-2, -1, 0, 1, 2]);
    expect(sctModules.length).toBeGreaterThan(0);
    for (const m of sctModules) {
      expect(m.items.length).toBeGreaterThan(0);
      for (const item of m.items) {
        expect(item.expertMode).toBeGreaterThanOrEqual(-2);
        expect(item.expertMode).toBeLessThanOrEqual(2);
      }
    }
  });

  it('OSCE stations carry weighted checklists and rating scales', () => {
    expect(osceStations.length).toBeGreaterThan(0);
    for (const s of osceStations) {
      expect(s.checklist.length).toBeGreaterThan(0);
      expect(s.globalRating.length).toBeGreaterThan(0);
      expect(s.checklist.every((i) => i.weight > 0)).toBe(true);
    }
  });
});
