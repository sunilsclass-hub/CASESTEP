# Changelog

All notable changes to CaseStep are documented in this file. The format is
based on [Keep a Changelog](https://keepachangelog.com/), and the project
adheres to [Semantic Versioning](https://semver.org/).

## [1.1.0] — 2026-07-06

### FAIMER Year 2 presentation readiness — UX and content upgrade

**Expert Review / Delphi**
- Expanded from 3 to **7 rating dimensions**: relevance, content validity,
  feasibility, NMC CBME alignment, authenticity of clinical reasoning, quality
  of feedback, and community/public-health integration.
- **Local-first demo mode**: every submission is saved to `localStorage` and
  the Delphi consensus (median, IQR, % agreement, Round-2 flagging) is now
  computed **entirely client-side** — the module is fully functional with zero
  backend, matching the deployed no-database default. Supabase sync remains
  available and optional.
- Reviewer-label field (demo-only, never a real name), CSV export of local
  submissions, and a "Clear demo data" control.
- `supabase/schema.sql` extended with the four additional rating columns and
  an idempotent migration for existing deployments.

**Student Dashboard**
- Illustrative demo-data seeding ("Load illustrative demo progress"), clearly
  labelled as non-real and explicitly user-triggered, so a first-time visitor
  (e.g. a FAIMER mentor) sees a populated dashboard on request.
- New "Recently completed case" and "Next recommended case" cards.

**Faculty Dashboard**
- New "Actionable teaching recommendations" section translating the
  common-reasoning-error pattern into concrete facilitation actions.

**OSCE/OSPE**
- Added a 4th station: **Diabetes Foot-Risk Screening & Counseling**.

**About page**
- Added an NMC CBME domain-alignment table, a TPACK mapping table, and a
  constructive-alignment table (competency → activity → assessment →
  evidence).

**Research & Evaluation page**
- Added aim/objectives, participants, intervention, comparator, and outcome
  measures; a Kirkpatrick evaluation mapping; a logic model; an evaluation
  matrix; an ethics & data-privacy section; limitations & mitigation
  strategies; a scale-up plan; and an expanded scholarly-outputs list.

**Contact & Team page**
- Replaced "?" placeholder avatars with elegant, clearly-labelled placeholder
  cards (e.g. "External expert details to be updated after consent"); added a
  fifth team group (Student & Faculty Contributors).

**Testing**
- Added unit and E2E coverage for the 7-dimension Expert Review submission +
  local consensus computation, the dashboard demo-seeding flow, and the 4th
  OSCE station.

**Deployment**
- Fixed a Vercel build failure (`out/routes-manifest.json missing`) caused by
  a `vercel.json` output-directory override conflicting with Next's
  `output: 'export'`; Vercel now auto-detects Next.js and serves the export
  natively.

## [1.0.0] — 2026-07-05

### Initial release — "CaseStep Initial Release"

**Platform**
- Next.js 14 (App Router) + TypeScript + Tailwind CSS, compiled to a static
  export deployable to Netlify, Vercel, or any static host.
- Responsive, accessible, academic UI with a custom inline-SVG icon set (no
  icon-library dependency).

**Learning modules**
- Home and About pages with NMC CBME, FAIMER, Kern, ADDIE, and TPACK alignment.
- **11 fully-authored interactive cases** with a consistent journey (scenario →
  history → examination → investigations → branching decisions with feedback →
  clinical reasoning → community diagnosis → management → reflection → summary):
  Type 2 Diabetes, Hypertension, Antenatal Care, Postnatal Care, Acute
  Diarrhoea, URTI, UTI, Chest Pain, Paediatric Growth & Nutrition, Vector-borne
  Outbreak, and Environmental/Occupational Health.
- Script Concordance Test module (−2…+2 scale, expert-panel scoring).
- OSCE/OSPE stations (weighted checklists, global rating scales, printable
  rubrics).
- Student and Faculty dashboards (progress, analytics, CSV export).
- Expert Review / Delphi, Research & Evaluation, and Contact / Team pages.

**Optional Supabase backend**
- Email/password authentication with navbar sign-in.
- Multi-device progress sync with a newest-wins merge; localStorage remains the
  source of truth so the UI is unchanged whether or not a backend is present.
- Expert Review submissions persisted to an `expert_reviews` table under
  row-level security.
- Live Delphi consensus (median, IQR, % agreement, Round-2 flagging) computed
  across the panel via an RLS-safe `SECURITY DEFINER` aggregate function.
- Environment-gated: absent `NEXT_PUBLIC_SUPABASE_*` variables, the whole
  auth/sync layer no-ops and the app runs purely locally.

**Verification**
- Production build passes (24/24 pages, all 11 case routes pre-rendered).
- Headless-browser verification: all 11 cases load, core interactivity works,
  0 console errors, 0 runtime errors.

[1.1.0]: https://github.com/sunilsclass-hub/casestep/releases/tag/v1.1.0
[1.0.0]: https://github.com/sunilsclass-hub/casestep/releases/tag/v1.0.0
