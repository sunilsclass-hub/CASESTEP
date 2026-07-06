# Changelog

All notable changes to CaseStep are documented in this file. The format is
based on [Keep a Changelog](https://keepachangelog.com/), and the project
adheres to [Semantic Versioning](https://semver.org/).

## [1.3.0] — 2026-07-06

### Multimedia launch preview

**Media system** (`components/media.tsx`, `data/media.ts`) — a small, reusable
set of primitives so no component ever hardcodes a media path:
- `Illustration` — a captioned `next/image` panel with a default
  "Educational illustration — no real patient data used" note.
- `VideoPlaceholder` — a clearly-labelled card (title, learning objective,
  planned duration, transcript/captions "to be added") for a planned
  institution-approved demonstration video. No video file is embedded
  anywhere on the platform.
- `LaunchBanner` — a site-wide strip ("FAIMER demonstration mode...") now
  mounted once in `app/layout.tsx`, above the navbar on every route.
- `data/media.ts` centralises the case-slug → illustration/video lookups
  (`caseIllustration`, `caseVideos`) and OSCE-station equivalents
  (`osceIllustration`, `osceVideos`).

**Original illustrations** (`public/media/**/*.svg`) — 13 new hand-authored,
abstract/iconographic SVGs (one per case topic, one for the diabetic-foot
OSCE station, one 6-stage learning-pathway diagram for the homepage).
All are original flat-design vector art in the existing brand palette;
none depict real people, photographs, or third-party/copyrighted content —
by construction there is nothing to clear for copyright or patient consent.

**Case Library & case pages** — `CaseCard` now shows a topic illustration
thumbnail; the case-detail header (`app/cases/[slug]/page.tsx`) shows a
larger illustration alongside the title/summary; `CasePlayer` upgrades its
existing image/video media steps to the new `Illustration`/`VideoPlaceholder`
components and adds a two-video placeholder gallery at the management step
for the three flagship cases (Type 2 Diabetes, Hypertension, Antenatal Care).

**OSCE/OSPE** — `OSCEStationCard` now renders a station illustration and a
video placeholder (walkthrough demonstration) for all four stations.

**Homepage** — the learning-pathway SVG diagram is now shown above the
existing 6-step journey grid as a visual companion.

No case data, step counts, decision options, or scoring logic changed in
this release — only presentation. Verified with the full unit test suite,
a static build, and a headless-browser pass (0 console/runtime errors)
across all 24 routes.

## [1.2.0] — 2026-07-06

### Premium academic design-system redesign

**Design tokens** (`tailwind.config.ts`, `app/globals.css`)
- Added an indigo secondary palette alongside the existing teal/slate system,
  a refined shadow scale (`card`, `cardhover`, `premium`, `glow`), subtle mesh
  gradient and grid-texture background utilities, and new keyframes
  (`fade-in-up`, `scale-in`, `shimmer`).
- New shared component classes: `.card-interactive` (hover-lift), `.skeleton`
  (shimmer, for genuinely async content), refined `.btn-primary`/`.btn-secondary`
  hover states.
- Global `prefers-reduced-motion` override disables all animation/transition
  durations site-wide for users who request it.

**New shared components** (`components/premium.tsx`)
- `DemoDataBanner` — consolidates three previously near-duplicated inline
  "this is demo data" blocks (Faculty Dashboard, Expert Review) into one
  component.
- `EmptyState`, `FeatureCard`, `ProgressRing`, `Stepper`.

**Homepage** — full rebuild: corrected stale stats (was showing "2 SCT
modules" / "3 OSCE stations" — now reads live from the data layer), the exact
requested CTA set (Start Learning / Explore Case Library / View Faculty
Dashboard / View Research Framework), a 6-stage visual learning pathway
(Scenario → Reasoning → Decision → Feedback → Reflection → Assessment), an
honest trust-indicators section, and a closing CTA band.

**Case Library** — now genuinely searchable and filterable (free-text search,
topic/tag, difficulty, competency code, and status), via a new
`CaseLibrary` client component with its own empty state.

**Dashboards** — `ProgressRing` composite "overall clinical reasoning
progress" metric (Student) and mean-completion ring (Faculty); explicit
"cases in progress" count; `DemoDataBanner`/`EmptyState` adopted in place of
ad-hoc inline markup.

**Navigation** — gradient logo mark, animated active-route underline,
backdrop-blur sticky header, refined mobile drawer transition.

**SEO** — `metadataBase`, Open Graph, and Twitter Card metadata added to the
root layout.

**Verified**: lint clean, typecheck clean, 17/17 unit tests, 10/10 E2E tests,
production build green (24/24 pages). A dedicated verification pass checked
all 13 requested routes at both a 390px mobile viewport and a 1440px desktop
viewport: every route returned 200, showed **zero horizontal overflow**, and
had **zero console/runtime errors**.

**Deliberately out of scope for this pass** (see README → Known limitations):
dark mode, Framer Motion, a full shadcn/ui migration, and a command palette —
each considered and consciously deferred rather than implemented partially.

## [1.1.1] — 2026-07-06

### Fix: Student Dashboard stuck on "Loading your progress…" in production

**Root cause**: `useStore()` initialised its state as `null` and relied entirely
on a `useEffect` to populate it after mount. The server-rendered (static-export)
HTML for `/dashboard/student/` therefore always contains the "Loading your
progress…" placeholder text; if client-side hydration for that route was ever
interrupted or delayed on the live Vercel deployment, nothing else could ever
replace it — there was no fallback, timeout, or synchronous path to real
content. This is a structural bug class (an indefinite-loading state with a
single point of failure), not a data or logic error, which is why it wasn't
reproduced in local dev, CI, or the headless-browser verification used for
prior releases (all of which hydrate reliably in a controlled environment).

**Fix**: `useStore()` now computes its initial value **synchronously** via a
lazy `useState` initializer calling `readStore()` directly during render
(`readStore()` is a pure, try/catch-guarded function of `typeof window`, so
this is always safe). There is no longer any code path that renders a bare
"loading" placeholder pending an effect — the dashboard always renders
meaningful content (real progress, or the "get started" prompt) on first
paint, in both local dev and production, with or without localStorage,
Supabase, or authentication available.

**Additional hardening**
- Fixed a missing `.catch()` on the Supabase `getSession()` call in
  `lib/auth.tsx` (a related latent bug: an unreachable/paused Supabase project
  would leave `AuthProvider`'s own loading state unresolved), plus a 4-second
  safety-net timeout so auth loading can never hang indefinitely either.
- Added Next.js `error.tsx` boundaries (root, Student Dashboard, Faculty
  Dashboard, Expert Review) so any unexpected runtime error shows a
  recoverable "Try again" fallback instead of a frozen or blank page.

### Presentation-readiness improvements

- **Expert Review**: relabelled as "Demo Expert Review Mode" — explicitly
  confirmed to require no sign-in; the illustrative rating form and consensus
  summary always render locally, with the Supabase-backed workflow described
  as an optional future/research-deployment mode.
- **SCT**: expanded from 2 to **5 dedicated modules**, one each for Type 2
  Diabetes, Hypertension, Antenatal Care, Acute Diarrhoea, and
  Tuberculosis/fever-outbreak reasoning (17 items total), all following
  correct SCT principles (−2…+2 scale, expert-panel placeholder, per-item
  rationale).
- **Faculty Dashboard**: added the explicit note "Illustrative cohort
  analytics for FAIMER demonstration; real analytics will be generated after
  authenticated deployment and ethics-approved implementation."
- **OSCE/OSPE**: confirmed the 4th station (Diabetes Foot-Risk Screening &
  Counseling) is present and fully scoring-capable (checklist, global rating,
  feedback, save, reset, print).
- **Routes**: confirmed the navbar and all internal links point to the
  correct live routes (`/dashboard/student`, `/dashboard/faculty`,
  `/expert-review`, `/sct`, `/osce`); no legacy routes exist, so no redirects
  were needed.
- **README**: added the live demo URL, a "Demo mode at a glance" summary, and
  a "Known limitations" section.

**Verified**: lint clean, typecheck clean, unit + E2E test suites green,
production build passes (24/24 pages). See the PR for the full verification
transcript.

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

[1.2.0]: https://github.com/sunilsclass-hub/casestep/releases/tag/v1.2.0
[1.1.1]: https://github.com/sunilsclass-hub/casestep/releases/tag/v1.1.1
[1.1.0]: https://github.com/sunilsclass-hub/casestep/releases/tag/v1.1.0
[1.0.0]: https://github.com/sunilsclass-hub/casestep/releases/tag/v1.0.0
