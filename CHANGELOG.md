# Changelog

All notable changes to CaseStep are documented in this file. The format is
based on [Keep a Changelog](https://keepachangelog.com/), and the project
adheres to [Semantic Versioning](https://semver.org/).

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

[1.0.0]: https://github.com/sunilsclass-hub/casestep/releases/tag/v1.0.0
