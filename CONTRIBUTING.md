# Contributing to CaseStep

Thank you for your interest in improving CaseStep. This project is an academic,
open educational resource; contributions from medical educators, clinicians, and
developers are welcome — whether that is authoring a new case, refining clinical
content, improving accessibility, or adding features.

## Ways to contribute

- **Author or review clinical cases** (highest value). Follow the existing case
  model so new cases stay pedagogically consistent.
- **Improve assessment items** (SCT items, OSCE/OSPE stations).
- **Fix bugs, improve accessibility, or refine the UI.**
- **Enhance documentation.**

## Development setup

```bash
git clone https://github.com/sunilsclass-hub/casestep.git
cd casestep
npm install
npm run dev        # http://localhost:3000
npm run build      # production static export in ./out
```

Requires **Node.js 20+**. See the [README](README.md) for the optional Supabase
backend setup.

## Authoring a new case

Cases are plain, typed data — no database needed to add one.

1. Open `data/cases-extra.ts` (or `data/cases.ts` for the flagship three).
2. Add a `Case` object. The `Case` type in [`lib/types.ts`](lib/types.ts) is the
   contract; TypeScript will guide you.
3. Include the full journey of `steps` for a high-quality case: `scenario`,
   `history`, `examination`, `investigation`, at least one `decision` (branching
   with feedback), `reasoning`, `community`, `management`, `reflection`, and
   `summary`. Add `keyLearningPoints`.
4. Map the case to an NMC CBME `competency` and set `status: 'ready'`.
5. Run `npm run build` to confirm it compiles and the route pre-renders.

**Clinical-content standard:** content must be accurate, evidence-based, and
appropriate for MBBS students. It is a teaching aid for reasoning practice, not a
clinical guideline. Prefer principles and thresholds over drug doses; cite
national programmes (NPCDCS, IMNCI, MCH) where relevant.

## Coding conventions

- **TypeScript** throughout; keep the data/UI boundary clean (`data/*` typed by
  `lib/types.ts`).
- Match the surrounding style: Tailwind utility classes, existing component
  patterns, and the shared primitives in `components/ui.tsx`.
- Keep the app **static-export-safe** (client-only browser APIs must be guarded
  for SSR) and **backend-optional** (never assume Supabase is configured).
- Preserve **accessibility**: semantic elements, labels, focus states.

## Tests

CaseStep uses **Vitest + React Testing Library** for unit/component tests
(`tests/unit`) and **Playwright** for end-to-end tests (`tests/e2e`).

```bash
npm test            # Vitest (the CI quality gate)
npm run build       # required before E2E
npm run test:e2e    # Playwright (installs a browser on first run)
```

Please add or update tests when you add a case, an assessment item, or a
feature, and keep them lightweight and deterministic.

## Pull request process

1. Branch from `main`.
2. Make focused commits with clear, descriptive messages.
3. Ensure `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`
   all pass locally (this is exactly what CI checks).
4. Open a pull request describing the change and its educational rationale.
5. For clinical content, please note your qualification/role so reviewers can
   appropriately weigh the medical accuracy.

## Repository governance

`main` is protected: changes land via pull request with a green CI run. See
**[docs/BRANCH_PROTECTION.md](docs/BRANCH_PROTECTION.md)** for the exact
recommended settings (required checks, no force-push, no deletion, conversation
resolution, and optional review approval).

## Code of conduct

Be respectful and constructive. This is an educational project serving students
and educators; assume good faith and prioritise learner benefit.
