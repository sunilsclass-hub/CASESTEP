# Changelog

All notable changes to CaseStep are documented in this file. The format is
based on [Keep a Changelog](https://keepachangelog.com/), and the project
adheres to [Semantic Versioning](https://semver.org/).

## [1.3.7] — 2026-07-10

### Fix "Forgot password?" flow actually letting a user set a new password

The previous recovery flow silently signed the user in with their OLD
password still active — Supabase establishes a session as soon as the
recovery link's tokens land in the URL, and nothing distinguished that from
a normal sign-in, so the user was dropped straight onto the homepage with
no way to change their password.

- `lib/auth.tsx`: `onAuthStateChange` now checks for the `PASSWORD_RECOVERY`
  event specifically and holds the user in a new `passwordRecovery` gated
  state instead of treating it as a normal login (no store reconciliation,
  no "signed in" UI) until the password has actually been changed. A
  `recoveryRef` guard ignores the other session-carrying events Supabase
  fires while recovery is active (`INITIAL_SESSION` on load, `USER_UPDATED`
  once `updateUser()` succeeds, occasional `TOKEN_REFRESHED`) so they can't
  silently close the gate; only the new `completePasswordRecovery()` call or
  a session-less event (sign-out) can end it. `getSession()` no longer
  triggers login directly — `onAuthStateChange` is now the single source of
  truth, since only it knows a session came from a recovery link.
- New `components/PasswordRecoveryModal.tsx`: a full-screen, non-dismissable
  modal mounted once at the app root (`app/layout.tsx`) that appears
  whenever `passwordRecovery` is true, regardless of which page the
  recovery link actually lands on. Reuses `ResetPasswordForm`, plus a
  "Sign out and try again" escape hatch for an invalid/expired link.
- `components/ResetPasswordForm.tsx`: accepts an optional `onSuccess`
  callback so the modal's "Continue to CaseStep" button can end recovery
  mode and proceed into the app; the standalone `/reset-password/` page
  keeps its original "Return to CaseStep" link behavior when used directly.
- Verified locally with a headless-browser pass against a simulated
  `PASSWORD_RECOVERY` session (constructed a well-formed fake JWT and mocked
  the Supabase Auth/REST endpoints, since real project credentials are not
  available in this sandbox): the modal appears over whatever page the
  recovery link lands on (reproducing and then fixing the reported bug),
  a successful password update shows a "Password updated" confirmation
  that stays up until "Continue" is clicked, a failed update shows the
  error and the sign-out escape hatch works, and normal (non-recovery)
  sign-in is unaffected.

## [1.3.6] — 2026-07-09

### Add "Forgot password?" flow

Completes the email+password auth flow with password recovery.

- `lib/auth.tsx`: adds `resetPassword(email)` (calls Supabase
  `resetPasswordForEmail`, redirecting to `/reset-password/` on the current
  origin) and `updatePassword(newPassword)` (calls `auth.updateUser`).
- `components/AuthWidget.tsx`: adds a "Forgot password?" link on the sign-in
  form, a third form mode (email-only, no password field) that sends the
  reset email, and a "Check your email…" confirmation panel. Error/info
  messages now use consistent brand/rose card styling instead of the old
  single-tone text (matching the Contact form's error-panel treatment).
- New route `app/reset-password/page.tsx` + `components/ResetPasswordForm.tsx`
  — the page a user lands on after clicking the emailed link. Supabase's
  client automatically establishes a recovery session from the URL; the
  form then sets a new password via `updateUser`, with a success screen and
  a clear error panel if the link was invalid/expired or the request
  otherwise fails. `noindex, nofollow` — this is a utility page, not
  content.
- Verified locally with a full mocked-response headless-browser pass
  (Supabase's real project credentials are not available in this sandbox):
  forgot-password success and rate-limited-error paths from the navbar
  widget; the reset-password page's invalid-session error path, client-side
  password-mismatch validation, and a full successful password update via a
  seeded recovery session + mocked `updateUser` response.
- `README.md`: documents the required Supabase dashboard step (adding
  `/reset-password/` to the Redirect URLs allow-list) and corrects an
  outdated "not connected to the public live demo" limitations bullet — the
  Supabase backend is in fact configured on the production deployment.

## [1.3.5] — 2026-07-08

### Wire the Contact page form to Web3Forms

`components/ContactForm.tsx` — the contact form was previously a UI-only
placeholder (`e.preventDefault()` and a static "thanks" message, explicitly
labelled as a demo). It now submits directly to Web3Forms
(`https://api.web3forms.com/submit`) via `fetch`, entirely client-side — no
backend code needed, consistent with this project's static-export
architecture.

- Adds `name`/`email`/`message` field names so `FormData` captures them, and
  a hidden `botcheck` honeypot field (standard Web3Forms spam-prevention
  pattern) — a non-empty value is treated as a bot and the request is never
  sent.
- Submit button reads "Sending…" and is disabled for the duration of the
  request, preventing double-submission.
- Success shows a "Thank you — your message has been sent" panel; failure
  shows an inline error panel — both styled with the existing design system
  (no `alert()`).
- Removed the now-inaccurate "Demo contact form" `DemoDataBanner` from
  `app/contact/page.tsx`, since the form is functional.
- Verified end-to-end with a mocked Web3Forms response (success and failure
  paths) via a headless-browser test: correct JSON payload, loading state,
  and both outcome messages all behave as expected.

The Web3Forms access key is intentionally embedded client-side — per
Web3Forms' own integration model there is no server-only/secret variant of
this key; it identifies a delivery destination, not an authentication
credential.

## [1.3.4] — 2026-07-08

### Add per-page og:url and canonical link tags to complete the casestep.in migration

- `app/layout.tsx`: added `alternates: { canonical: '/' }` and
  `openGraph.url: '/'`, resolved against `metadataBase` to
  `https://casestep.in/`.
- Every route's `metadata` export (`/about`, `/cases`, `/sct`, `/osce`,
  `/research`, `/contact`, `/dashboard/student`, `/dashboard/faculty`,
  `/expert-review`) and the dynamic `generateMetadata` in
  `app/cases/[slug]/page.tsx` now set its own `alternates.canonical` and
  `openGraph.url`, so every page emits a distinct, correct
  `<link rel="canonical">` and `og:url` rather than relying on
  `metadataBase` alone (which does not by itself emit either tag).
- Verified against the built static output for all page types, including a
  case-detail page — each renders its own correct absolute URL.

## [1.3.3] — 2026-07-08

### Point site metadata at casestep.in; add sitemap and robots.txt

- `app/layout.tsx`: `metadataBase` now resolves to `https://casestep.in` (was
  `https://casestep.vercel.app`), which every relative OpenGraph/Twitter URL
  in the app's metadata is built from.
- `README.md`: the live-site link now points to `casestep.in`.
- New `app/sitemap.ts` and `app/robots.ts` — both statically generated at
  build time (compatible with `output: 'export'`), listing all 10 static
  routes and all 11 case pages, and pointing search engines at
  `https://casestep.in/sitemap.xml`. Neither file existed before this
  release.
- No other hardcoded `casestep.vercel.app` references were found anywhere in
  the codebase (footer, contact page, etc. link internally via Next's
  `Link`, never a hardcoded absolute URL).

## [1.3.2] — 2026-07-07

### Remove the site-wide "FAIMER demonstration mode" banner

Removed the `LaunchBanner` component (previously mounted once in
`app/layout.tsx`, showing "FAIMER demonstration mode. All learner, expert,
and analytics data shown on this platform are illustrative. No real patient
data is used anywhere." on every page) ahead of launch with a production
domain and backend storage. The narrower, page-specific illustrative-data
notices (Faculty Dashboard cohort analytics, Student Dashboard local-data
note, SCT expert-panel scoring caveat, Contact form notice) are unchanged —
each describes a specific dataset that remains illustrative independent of
domain/hosting.

## [1.3.1] — 2026-07-06

### Launch Completion Pass — multimedia and visual completion across SCT, dashboards, research, about, and contact pages

Extends the v1.3.0 media system to every remaining page, so the whole
platform now shares one consistent visual language. No case data, scoring
logic, or existing v1.3.0 components (media system, `CasePlayer`,
`OSCEStationCard`, `LaunchBanner`) were changed structurally — this pass only
adds presentation on top.

**SCT** (`components/SCTSection.tsx`, `components/SCTPlayer.tsx`,
`data/media.ts`) — each module now shows a topic illustration (reusing the
matching case SVG — no new assets, no fabricated per-module artwork); every
clinical vignette is presented in a dedicated card; after submission, an
expert-vs-learner position is shown on a −2…+2 scale track (a single
illustrative modal value, not a fabricated full-panel distribution); the
score card gains a `ProgressRing`; the module tab bar scrolls horizontally on
narrow screens; the "expert panel placeholder" note is now the shared
`DemoDataBanner` component for visual consistency with the rest of the site.

**Student Dashboard** (`components/StudentDashboard.tsx`) — a `DemoDataBanner`
now states plainly that the view reflects only this browser's local data; the
empty state shows the learning-pathway illustration; the "Next recommended
case" card gains a topic-illustration thumbnail; a new illustrative
achievement-badges row (first case, SCT attempted, OSCE attempted, reflective
learner — motivational UI, not a credential) and a reflection-engagement
indicator were added. The "Load illustrative demo progress" flow and the
always-synchronous, never-indefinitely-loading `useStore()` behaviour are
unchanged.

**Faculty Dashboard** (`components/FacultyDashboard.tsx`) — adds a topic-wise
performance heatmap (colour-banded completion/decision-accuracy table) beside
the existing reasoning-error list. The exact required disclaimer text
("Illustrative cohort analytics for FAIMER demonstration; real analytics will
be generated after authenticated deployment and ethics-approved
implementation.") was already present via `DemoDataBanner` and is unchanged.

**Research & Evaluation** (`app/research/page.tsx`) — the logic-model grid
now reads as a connected diagram (arrows between Inputs → Impact); a
Kirkpatrick-level pyramid visual sits above the existing mapping table; the
expected-scholarly-outputs list is now a connected pipeline. All wording
remains "planned" / "illustrative" — no real data or outcomes are shown.

**About** (`app/about/page.tsx`) — adds a "Clinical reasoning pathway" visual
(the same learning-pathway illustration, reused for consistency) and a
5-step "FAIMER project logic" diagram, alongside the existing Kern/ADDIE/
TPACK/CBME/constructive-alignment content.

**Contact & Team** (`app/contact/page.tsx`) — the PI card now shows academic
credential badges; team-group headings get a distinct icon per group; a
collaboration-invitation card and an explicit consent/institutional-approval
note were added; the contact form now sits beside a `DemoDataBanner` stating
it is not yet wired to a delivery backend. No names were invented — every
team entry remains the existing placeholder structure from `data/site.ts`.

Verified with the full unit test suite, a static build (24/24 routes), and a
headless-browser pass (0 console/runtime errors) covering home, cases,
case-decision flow, SCT scoring, OSCE, both dashboards, Expert Review, and
About; Research and Contact were checked by direct static-HTML inspection of
the build output.

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
