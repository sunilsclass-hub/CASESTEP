# Changelog

All notable changes to CaseStep are documented in this file. The format is
based on [Keep a Changelog](https://keepachangelog.com/), and the project
adheres to [Semantic Versioning](https://semver.org/).

## [1.7.0] — 2026-07-14

### New logo and favicon assets

Integrates the new navy/gold CaseStep logo and icon set (11 files,
supplied by Dr. Kumar) into `public/media/logo/`. Strictly a visual
asset swap — no colors, typography, copy, taglines, or component
structure were changed.

- `components/Navbar.tsx`, `components/Footer.tsx`: the gradient
  icon-box + stethoscope-icon mark (the only two places the site
  actually renders a logo) is replaced with `casestep-icon.svg`, at the
  same footprint it occupied before (36px header / 32px footer). The
  adjacent "CaseStep" text and tagline are untouched — the current
  header/footer layout is an icon-plus-separate-HTML-wordmark, not a
  space sized for a full lockup, so `casestep-logo-primary.svg` (which
  bakes "CaseStep" into the graphic) was not used, per the brief's
  guidance not to force a wordmark into an icon-sized slot.
  `casestep-logo-reverse.svg` was not used anywhere: the one dark
  (navy) background section on the site — "Grounded in established
  frameworks" — does not currently show a logo, and none was added
  there (asset swap only, no new placements).
- `app/layout.tsx`: `metadata.icons` now serves `casestep-favicon.svg`
  as the primary favicon, with `favicon-32.png` and `favicon.ico` as
  fallbacks, plus `app-icon-180.png` as the `apple-touch-icon`.
- `app/manifest.ts` (new): a static web-app manifest — following the
  same `MetadataRoute` pattern as the existing `robots.ts`/`sitemap.ts`
  — referencing `app-icon-192.png` and `app-icon-512.png`. No manifest
  existed before; one is needed for the two PWA-sized icons supplied to
  mean anything. `theme_color`/`background_color` are set to the site's
  existing teal brand token (`#0d9488`) rather than the logo's navy,
  since this controls browser/OS chrome around the still-teal-themed
  UI, not the logo itself.
- `favicon.ico`, `favicon-32.png`, `app-icon-180/192/512/1024.png`,
  `social-avatar-1000.png`, `casestep-favicon.svg`,
  `casestep-logo-primary.svg`, `casestep-logo-reverse.svg` are all
  present in `public/media/logo/` for future use but not yet wired up
  anywhere beyond what's listed above (`social-avatar-1000.png` in
  particular isn't referenced — no `openGraph.images`/Twitter card
  image was requested, so none was added).
- `CASESTEP-BUILD-PROMPT.md` was not present on the `image-upload`
  branch — nothing to discard.
- **Flagged for follow-up, per the brief's request**: the new logo's
  navy/gold palette doesn't match the site's existing teal-based brand
  tokens (CTA buttons, links, hero gradient). At the current icon size
  (32–36px) in the header/footer this reads as a minor, not jarring,
  accent difference — but it's a genuine palette mismatch that will be
  more visible if the icon or wordmark is used larger elsewhere (e.g. a
  future social-card image). No recoloring was attempted, per
  instruction.
- Verified locally: `typecheck`, `lint`, `build` (static export intact,
  `/manifest.webmanifest` builds as a static route), `vitest` (17/17),
  `verify.mjs` (11/11), and a headless-browser check confirming both
  logo `<img>` elements load successfully (non-zero `naturalWidth`) and
  render correctly at desktop (1440px) and mobile (390px) widths, plus
  confirmed the favicon/apple-touch-icon/manifest `<link>` tags and the
  manifest JSON content are all correct in the static HTML output.

## [1.6.2] — 2026-07-11

### Simplify the Contact page enquiries sentence

- `app/contact/page.tsx`: the "Enquiries" card's sentence no longer names
  a contact route that doesn't exist on the page (no email address is
  listed) — it now reads "For collaboration, review, or research
  enquiries about CaseStep, please use the form below."
- Verified locally: `typecheck`, `lint`, `build`, `vitest` (17/17),
  `verify.mjs` (11/11).

## [1.6.1] — 2026-07-11

### Branding reposition follow-up: two loose ends

- `app/contact/page.tsx`: reworded the generic "please contact the
  principal investigator…" enquiries sentence — directly under the new
  "Founder & Academic Lead" card, it read oddly against that framing —
  to "please contact Dr. Kumar through the Department of Community
  Medicine, …, or use the form below."
- `data/site.ts`: `principalInvestigator.role` updated from "Principal
  Investigator" to "Founder & Academic Lead" — the field is unrendered
  today, but leaving a stale value inconsistent with the site-wide
  reframing risked confusing whoever wires it up next.
- Verified locally: `typecheck`, `lint`, `build`, `vitest` (17/17),
  `verify.mjs` (11/11), and confirmed via the static export that "please
  contact the principal investigator" no longer appears anywhere and
  "Principal Investigator" now appears exactly once, scoped to the
  Research page's study description.

## [1.6.0] — 2026-07-11

### Branding reposition: Dr. Kumar as founder/academic lead, FAIMER moved to supporting context

Repositions the site's framing from "a FAIMER fellowship project" to "an
independent academic platform created and led by Dr. D. Sunil Kumar,"
consistent with how the platform is actually owned and maintained. FAIMER
remains visible as accurate scholarly provenance (the fellowship shaped the
platform's development) but is no longer the primary framing, and the
"Principal Investigator" title is now scoped only to the Research page's
study description.

- `data/site.ts`: `site.program` (hero badge, footer, contact "Programme"
  field) changed from "International FAIMER Fellowship Project" to
  "Digital Case-Based Learning · Community Medicine". `VideoPlaceholderSpec`
  unaffected.
- `app/page.tsx`: hero gains a muted attribution line — "Created and
  academically led by Dr. D. Sunil Kumar, Professor of Community Medicine,
  JSS Medical College, Mysuru." — below the CTA row. The "FAIMER Project
  Framework" pill removed from "Grounded in established frameworks" (it's a
  fellowship, not an instructional-design framework, unlike Kern's/ADDIE/
  TPACK alongside it).
- `components/Footer.tsx`: affiliation line split into two — a "Created by
  Dr. D. Sunil Kumar…" line and a separate "Developed during the
  International FAIMER Fellowship…" line — and the copyright line now
  reads "© 2026 Dr. D. Sunil Kumar · CaseStep… Not a substitute for
  clinical judgment or medical advice." The standalone "Principal
  Investigator: Dr. D. Sunil Kumar · JSS AHER, Mysuru" line is removed
  (that title now lives only on the Research page, scoped to the study).
- `app/about/page.tsx`: five new blocks — "About CaseStep," "Founder &
  Academic Lead," "How CaseStep was built" (folded the "Scholarly context"
  paragraph in as its closing paragraph, plus a "Cite this platform" box),
  and a muted one-line ownership/affiliation disclaimer — inserted right
  after the page header and before the existing framework/constructive-
  alignment content, which is untouched. Page title changed to "About
  CaseStep — Founder, Frameworks & Development Story" (set via
  `title.absolute` to avoid a duplicated "· CaseStep" suffix from the
  layout's title template).
- `app/research/page.tsx`: added "Principal Investigator (DCBL evaluation
  study): Dr. D. Sunil Kumar." under Study overview. Every other section
  (design, Kirkpatrick evaluation, logic model, ethics/IEC, limitations,
  scale-up plan, timeline) is untouched. Title changed to "Research &
  Evaluation — CaseStep" (also via `title.absolute`).
- `app/contact/page.tsx`: the PI card's badge now reads "Founder &
  Academic Lead, CaseStep" instead of "Principal Investigator"; the detail
  line reads "Professor of Community Medicine, JSS Medical College · Dean
  (Students' Welfare), JSS AHER, Mysuru"; a new line invites collaboration/
  faculty-adoption/research-partnership/feedback enquiries via the form
  below. The Web3Forms contact form itself is untouched.
- `app/layout.tsx`: homepage meta/OG/Twitter description reworded to lead
  with what the platform does and who created it, rather than naming
  FAIMER first; meta title, author, and keywords unchanged (FAIMER stays
  in keywords — harmless for discoverability). Added `Person` and
  `WebSite` JSON-LD structured data (author/copyrightHolder/publisher all
  set to the same Person entity), with a `TODO` left for `sameAs`
  (ORCID/Google Scholar/LinkedIn) pending Dr. Kumar supplying them.
- Every other FAIMER/"Principal Investigator" mention (research-page
  scholarly prose, the About page's FAIMER-alignment/project-logic
  sections, the footer's small Frameworks list, contact-page team-group
  labels and collaboration copy, `data/research.ts`, `FacultyDashboard.tsx`
  demo-data note, README/CHANGELOG/CITATION.cff) is left exactly as-is —
  those are either accurate provenance records or out of the requested
  scope.
- Verified locally: `typecheck`, `lint`, `build` (static export intact),
  `vitest` (17/17), `verify.mjs` (11/11), and a headless-browser visual
  check of the hero, footer, About, and Contact pages at both desktop
  (1440px) and mobile (390px) widths — no layout breaks, both JSON-LD
  blocks present exactly once in the static HTML with the correct field
  values.

## [1.5.1] — 2026-07-11

### Replace the T2DM lifestyle-counseling video with an own-produced version

The "Lifestyle counseling for diabetes in primary care" entry in the
Type 2 Diabetes Mellitus management-step video gallery now points to a
better-quality, own-produced video with a human-written, clinically
reviewed script (AI-generated visuals and voice). It replaces the
earlier placeholder-quality video rather than adding a third entry —
the gallery still shows exactly two videos. The foot-screening video
is unchanged.

- `data/media.ts`: T2DM `caseVideos` entry 2 now carries
  `youtubeId: 'TpJrlJiJmR4'` (was `'xYAPzraMN64'`, fully removed — no
  remaining references anywhere in the repo). `title` kept as-is;
  `objective` expanded to name the Indian Plate Method, physical
  activity, medication adherence, and foot care, matching the new
  video's fuller content.
- `VideoPlaceholderSpec` gains an optional `productionNote` field so
  each embedded video can carry its own, honest description of how it
  was made instead of a single generic caption. The T2DM lifestyle
  video's caption now reads "AI-assisted illustrative video — script
  reviewed for clinical accuracy, images AI-generated — for
  illustrative teaching purposes," distinct from the foot-screening
  video's "AI-narrated educational video" caption, which is unchanged.
- `components/media.tsx`, `CasePlayer.tsx`, `OSCEStationCard.tsx`:
  thread `productionNote` through to `VideoPlaceholder`, defaulting to
  the original generic caption when omitted — every video/station
  without an explicit note is unaffected.
- Verified locally via headless browser: the management step renders
  exactly 2 iframes, with `src` and `title` matching the two YouTube
  IDs, each showing its own distinct caption, and no trace of the old
  video ID anywhere in the rendered DOM. `typecheck`, `lint`, `build`
  (static export intact), `vitest` (17/17), and `verify.mjs` (11/11)
  all pass.
- As with the previous video-embedding round, actual playback of the
  new embed could not be verified from this sandbox — outbound
  requests to `youtube-nocookie.com` are blocked by this environment's
  egress policy (`net::ERR_TUNNEL_CONNECTION_FAILED`), consistent with
  every other external host tested this session. Only the markup was
  confirmed correct; playback should be confirmed in a real browser.

## [1.5.0] — 2026-07-10

### First real embedded video: T2DM management-step gallery

Adds the platform's first real, playable video content — two
AI-narrated YouTube (unlisted) videos in the Type 2 Diabetes Mellitus
case's management-step video gallery, reviewed and approved by
Dr. Kumar. Every other case/OSCE station's video gallery is unaffected
and keeps rendering the existing static placeholder card unchanged.

- `data/media.ts`: `VideoPlaceholderSpec` gains an optional `youtubeId`
  field. The T2DM `caseVideos` entries now carry
  `youtubeId: '31D3PFN16nc'` ("How to perform diabetic foot screening")
  and `youtubeId: 'xYAPzraMN64'` ("Lifestyle counseling for diabetes in
  primary care") — `title`/`objective` unchanged.
- `components/media.tsx`: `VideoPlaceholder` now renders a real
  `youtube-nocookie.com` iframe embed when `youtubeId` is present,
  labelled "AI-narrated educational video — for illustrative teaching
  purposes."; falls back to the existing static placeholder card,
  unchanged, when it's absent (every other case and every OSCE
  station today). The file's doc comment updated to reflect the new
  three-way media model (SVG illustration / video placeholder / real
  externally-hosted video).
- `components/CasePlayer.tsx` and `components/OSCEStationCard.tsx`:
  thread `youtubeId` through to `VideoPlaceholder` at both call sites.
- `README.md`: "Media & academic integrity" section reworded — the
  video paragraph no longer claims "no video file is embedded," since
  that's no longer accurate. It now explains real video is always
  hosted externally (YouTube, unlisted) and embedded via iframe, never
  stored in the repository/deployment; that AI-narrated video is
  explicitly labelled as such; and that real institution-approved
  clinical video will follow the same ethics/consent process as any
  other real participant data. The "Highlights" bullet on illustrations
  updated to match.
- Confirmed the embed doesn't affect the static export
  (`output: 'export'`): `npm run build` still prerenders every route
  with no server route introduced; the iframe is plain static markup.
- Verified locally: `typecheck`, `lint`, `build`, `vitest` (17/17), and
  `scripts/verify.mjs` (11/11) all pass. A headless-browser check
  confirmed the management step renders both iframes with the exact
  expected `src` (`youtube-nocookie.com/embed/<id>`) and title, the new
  caption is present, and the old placeholder text is gone. **Actual
  video playback could not be verified from this sandbox** —
  `youtube-nocookie.com` is blocked by this environment's outbound
  network policy (confirmed via `ERR_TUNNEL_CONNECTION_FAILED`, the
  same class of restriction that blocked other external hosts earlier
  in this project's history); only the markup's structural correctness
  was verified. Live playback needs confirming in a real browser.

Pushed to a review branch, not merged to main — held pending review.

## [1.4.5] — 2026-07-10

### Second real per-step image: Type 2 Diabetes exam photo

Adds a per-step image to the Type 2 Diabetes Mellitus case's "Physical
examination" step, replacing that step's shared topic SVG — the same
mechanism added in 1.4.4 for the scenario step.

- `data/cases.ts`: the exam step's media now points at
  `/media/cases/type-2-diabetes-mellitus/foot-examination.jpg` with
  caption "AI-generated illustrative image — not real patient
  photography. Foot examination in progress."
- `public/media/cases/type-2-diabetes-mellitus/foot-examination.jpg`:
  new asset, optimized from a 2.1 MB PNG source to a 267 KB JPEG
  (quality 82) at its original 1448×1086 resolution.
- No other step, image, or clinical content changed in this or any
  other case. The scenario step's image (1.4.4) is unaffected.
- Verified locally: `typecheck`, `lint`, `build`, `vitest` (17/17), and
  `scripts/verify.mjs` (11/11) all pass; a targeted headless-browser
  check confirmed both images independently load (200 responses) and
  render on their respective steps with the correct captions.

Pushed to a review branch, not merged to main — held pending review.

## [1.4.4] — 2026-07-10

### First real per-step image: Type 2 Diabetes scenario

Adds the first non-SVG, per-case-step image on the platform — an
AI-generated (Gemini) illustrative photo for the Type 2 Diabetes
Mellitus case's opening "Patient scenario" step, replacing that one
step's shared topic SVG with a dedicated image.

- `lib/types.ts`: `CaseStep.media` gains an optional `src` field, letting
  a step override the case's shared illustration with a specific image.
  Every other step in every other case is unaffected (falls back to the
  existing shared-SVG behaviour when `src` is absent).
- `components/CasePlayer.tsx`: image-type steps now render `step.media.src`
  when present, falling back to `caseIllustration[slug]` otherwise.
- `data/cases.ts`: the T2DM scenario step's media now points at
  `/media/cases/type-2-diabetes-mellitus/opd-scenario.jpg` with the
  caption "AI-generated illustrative image — not real patient
  photography. OPD photograph of the patient."
- `public/media/cases/type-2-diabetes-mellitus/opd-scenario.jpg`: new
  asset, optimized from a 2.17 MB PNG source down to a 277 KB JPEG
  (quality 82) at its original 1448×1086 resolution.
- No other step, image, or clinical content in this or any other case
  was changed.
- Verified locally: `typecheck`, `lint`, `build`, `vitest` (17/17), and
  `scripts/verify.mjs` (11/11) all pass; a targeted headless-browser
  check confirmed the new photo actually loads (200 response) and
  renders on the scenario step, the new caption text is present and the
  old caption is gone, and every other case's images are unaffected.

Pushed to a review branch, not merged to main — held pending review.

## [1.4.3] — 2026-07-10

### Extend the site-copy sweep to OSCE/OSPE video placeholders

Found during the OSCE/OSPE coverage audit: the `VideoPlaceholder`
component's hardcoded text and the 4 `osceVideos` titles were missed by
the earlier site-copy sweep (1.4.2), since that round only touched
case-step media captions and the two dashboard/Expert-Review banners.

- `components/media.tsx`: `VideoPlaceholder`'s rendered text changed from
  "Video placeholder — institution-approved demonstration video to be
  uploaded after review." to "Illustrative figure — clinical video to
  follow institutional approval." — matching the exact phrase already
  used for case-step video captions.
- `data/media.ts`: the 4 `osceVideos` titles reworded to drop
  "demonstration": "BP measurement station demonstration" → "BP
  measurement technique", "Antenatal counseling station demonstration" →
  "Antenatal danger-sign counseling", "Growth chart interpretation
  demonstration" → "Growth chart interpretation", "Diabetic foot
  screening station demonstration" → "Diabetic foot screening
  technique".
- Verified locally: `typecheck`, `lint`, `build`, `vitest` (17/17), and
  `scripts/verify.mjs` (11/11) all pass; a targeted headless-browser pass
  on `/osce` confirmed the new copy renders and every old string is
  actually gone.

Pushed to a review branch, not merged to main — held pending review.

## [1.4.2] — 2026-07-10

### "Not fully real" language sweep — 5 fixes from the site-copy audit

Follow-up to a full-site sweep for language signalling "this isn't
finished" (demo/illustrative/placeholder/coming-soon), reviewed by
Dr. Kumar. Legitimate honesty disclosures (homepage "Honest by design",
/research and /about "illustrative" mentions, the `Figure` component's
"no real patient data used" caption) were explicitly left untouched.

- **Media captions**: all 15 step-level media captions across
  `data/cases.ts` and `data/cases-extra.ts` reworded from
  `"Placeholder: [description]"` to `"Illustrative figure — clinical
  photography to follow institutional approval. [Description]"` (image)
  or `"... clinical video to follow institutional approval.
  [Description]"` (video) — keeps the original per-case description
  (e.g. "Monofilament foot-sensation testing technique."), drops only the
  word "Placeholder," which read as unfinished web development rather
  than an intentional ethics choice.
- **Expert Review** (`components/ExpertReview.tsx`): consolidated ~15
  scattered "demo"/"illustrative" mentions into one banner near the top
  of the page ("Illustrative Expert Review status") stating the panel's
  actual status — single-author illustrative judgments, not yet a
  validated Delphi panel. Removed the repeated flagging from headings
  ("Reviewer identity (demo)" → "Reviewer identity", "Demo submissions"
  → "Submissions", "Consensus summary (illustrative)" → "Consensus
  summary"), buttons ("Clear demo data" → "Clear data"), the exported
  CSV filename (`casestep-expert-reviews-demo.csv` →
  `casestep-expert-reviews.csv`), and inline copy — the rest of the page
  now reads as ordinary confident academic content.
- **Student Dashboard** (`components/StudentDashboard.tsx`): the top
  banner is now conditional on `enabled && user` (a real Supabase-backed
  signed-in account) — hidden entirely in that case, since the existing
  footer status line already confirms cloud sync. Local-only visitors
  (not signed in, or no backend configured) see a lighter "Local
  progress" note instead of the previous blanket "illustrative" framing,
  which incorrectly labelled genuine self-recorded local progress the
  same as demo-seeded data.
- **Case library**: removed the dormant "Coming soon" / "In development"
  case-status UI (`CaseCard.tsx`'s badge/button, the case-detail page's
  alternate view in `app/cases/[slug]/page.tsx`, and the status filter
  dropdown in `CaseLibrary.tsx`) — unreachable today since all 11 cases
  are `status: 'ready'`. Can be re-added if a future case ships as a
  stub.
- Faculty Dashboard's illustrative-cohort-analytics banner is
  **unchanged** — cohort/aggregate data is genuinely not yet populated
  with real pilot data, which is exactly the case the disclosure exists
  for.
- Verified locally: `typecheck`, `lint`, `build`, `vitest` (17/17), and
  `scripts/verify.mjs` (11/11) all pass; additionally, a targeted
  headless-browser pass confirmed the new copy renders correctly and all
  removed strings are actually gone from each affected page (Expert
  Review, a case detail page, the case library, Student Dashboard).

Pushed to a review branch, not merged to main — held pending review.

## [1.4.1] — 2026-07-10

### Content-quality fixes from the non-flagship case review

Addresses findings from a full content-quality review of the 8 non-flagship
cases (data/cases-extra.ts), consolidating the URTI/Postnatal/UTI feedback
with 5 additional fixes:

- **URTI**: reordered so `reasoning` now follows the decision point (was
  before it, the only case in the library with this inversion); added an
  explicit `investigation` step ("no investigations routinely needed" is
  correct clinical content, not an omission); the reasoning step now states
  the actual Centor/McIsaac score (0/4, ~1–2.5% strep probability) instead
  of only narrative criteria; added a step-level image placeholder on the
  examination step (URTI previously had zero media entries).
- **Postnatal Care**: the newborn danger-sign bullet now states explicit
  numeric thresholds — fever (axillary ≥37.5°C) and fast breathing (RR
  ≥60/min, per IMNCI) — instead of the qualitative "fever"/"fast breathing"
  it previously used.
- **UTI**: the examination step now states numeric vitals (BP, PR, RR,
  temperature) instead of only "afebrile, comfortable, not toxic"; added a
  step-level image placeholder (UTI previously had zero media entries).
- **Environmental/Occupational Health**: the examination step now states
  numeric BP and PR alongside the existing numeric SpO₂.
- **Vector-borne Outbreak**: one internal-consistency fix — the
  investigation step's `id` is now `invest`, matching the convention used
  by every other case (it was uniquely `investigation`). Its missing
  history/exam steps and numbered "Step 1–2" / "Step 3" / etc. step-title
  convention are unchanged — kept as a deliberate, pedagogically justified
  exception for outbreak-investigation cases.
- **No change**: Acute Diarrhoea, Paediatric Growth & Nutrition (reviewed
  as strong as-is); Chest Pain and Environmental/Occupational Health's
  red-flag-on-scenario placement (kept as an intentional pattern for
  high-acuity, immediately-apparent-danger cases).
- Verified locally: `typecheck`, `lint`, `build`, `vitest` (17/17), and
  `scripts/verify.mjs` (11/11) all pass; additionally, all 5 edited cases
  (URTI, UTI, Postnatal Care, Environmental/Occupational Health,
  Vector-borne Outbreak) were driven end-to-end in a headless browser to
  confirm correct step order and zero console/runtime errors — URTI's new
  step sequence was explicitly confirmed as scenario → history → exam →
  decision → **Investigations** → reasoning → community → management →
  reflection → summary.

Pushed to a review branch, not merged to main — held pending final review.

## [1.4.0] — 2026-07-10

### Complete SCT coverage for all remaining case topics

Second and final installment extending Script Concordance Test coverage
(started in 1.3.9) — adds the last 5 modules so every one of the 11 case
topics now has a matching SCT module, following the existing structure
exactly (`title`, `condition`, `intro`, 4 items each with
`scenario`/`ifThinking`/`andThen`/`question`/`expertMode`/`rationale`):

- `data/sct.ts`: new `sct-postnatal`, `sct-outbreak` (Vector-borne Outbreak
  — the topic previously covered only by the thematically-adjacent
  Tuberculosis/outbreak module), `sct-chest-pain`, `sct-growth`, and
  `sct-environmental` modules. Content is grounded in the same standard
  reasoning already used in each matching case: puerperal-fever red flags
  and the latch-vs-supply distinction for Postnatal Care; outbreak-
  investigation steps (baseline confirmation, case definition, parallel
  control) for Vector-borne Outbreak; cannot-miss triage (ACS, dissection,
  tension pneumothorax) and time-critical first response for Chest Pain;
  growth-trajectory interpretation and SAM criteria for Paediatric Growth
  & Nutrition; and the exposure–disease link, silicosis–TB association, and
  hierarchy of controls for Environmental/Occupational Health. No invented
  statistics or fabricated guideline citations.
- `data/media.ts`: `sctIllustration` entries for all 5 new modules reuse
  the matching case's existing SVG — no new artwork.
- All 12 `expertMode` values across these 5 modules remain illustrative
  single-author judgments, not a validated Delphi panel, per the file-level
  disclosure added in 1.3.9 and the app's existing `DemoDataBanner`.
- Verified locally: `typecheck`, `lint`, `build`, `vitest` (17/17), and
  `scripts/verify.mjs` (11/11) all pass; all 5 new module tabs were driven
  end-to-end in a headless browser (every item answered, submit/score
  screen and per-item rationale rendering correctly for each) before the
  temporary test script was deleted.

SCT now covers all 11 case topics with a clean 1:1 match (12 modules total,
counting the original Tuberculosis/fever-outbreak module as a 12th,
freestanding topic not tied to any single case). Version bumped to 1.4.0 to
mark this feature-completion milestone. Not merged to main — held for
review per instruction.

## [1.3.9] — 2026-07-10

### Extend SCT coverage: Upper Respiratory Tract Infection, Urinary Tract Infection

First installment of extending Script Concordance Test coverage from 5 to
the remaining case topics (per the audit in the prior session), authored one
or two topics at a time for review. This round adds two modules:

- `data/sct.ts`: new `sct-urti` (Upper Respiratory Tract Infection) and
  `sct-uti` (Urinary Tract Infection) modules, 4 items each, following the
  existing structure exactly (`title`, `condition`, `intro`, and items with
  `scenario`/`ifThinking`/`andThen`/`question`/`expertMode`/`rationale`).
  Content is grounded in standard, well-established reasoning already used
  in the matching cases (Centor/McIsaac reasoning and deep-space-infection
  red flags for URTI; uncomplicated-vs-complicated cystitis, the
  asymptomatic-bacteriuria-in-pregnancy exception, and pyelonephritis red
  flags for UTI) — no invented statistics or fabricated guideline citations.
- `data/media.ts`: `sctIllustration` entries for both new modules reuse the
  existing case SVGs (`upper-respiratory-tract-infection.svg`,
  `urinary-tract-infection.svg`) — no new artwork needed.
- File-level comment in `data/sct.ts` now explicitly documents that every
  `expertMode` value is an illustrative single-author judgment, not a
  validated expert-panel consensus — consistent with the existing in-app
  `DemoDataBanner` disclosure, which already applies uniformly to all
  modules and required no code change to cover the new ones.
- `README.md`: "Known limitations" updated to 6 of 11 case topics with a
  clean 1:1 SCT match (up from 5), with the TB/outbreak module's
  thematically-adjacent (not exact) relationship to Vector-borne Outbreak
  spelled out explicitly.
- Verified locally: `typecheck`, `lint`, `build`, `vitest` (17/17), and
  `scripts/verify.mjs` (11/11) all pass; additionally, both new module tabs
  were driven end-to-end in a headless browser (all 4 items answered,
  submit/score screen and per-item rationale render correctly for each).

Remaining topics without a matching module: Postnatal Care, Chest Pain,
Paediatric Growth & Nutrition, Vector-borne Outbreak, and
Environmental/Occupational Health — planned as follow-up rounds pending
review of this one.

## [1.3.8] — 2026-07-10

### Name the Institutional Ethics Committee on the Research page

The "Ethical considerations & data privacy" section on `/research` previously
described ethics approval only in generic terms ("an ethics committee").
It now names and links to the specific committee whose approval will be
sought, without claiming approval has already been granted:

- `app/research/page.tsx`: adds an "Institutional Ethics Committee" block
  naming the Institutional Ethics Committee, JSS Medical College (IEC,
  JSSMC), linking to its page on jssuni.edu.in, and listing the committee's
  own identifying registrations — CDSCO Re-Registration No.
  ECR/387/Inst/KA/2013/RR-22 (Rule 122DD, Drugs & Cosmetics Rules 1945),
  NECRBHR registration EC/NEW/INST/2021/2254, and NABH accreditation
  Certificate No. E-CT-2018-0018 (re-accredited April 2024–April 2027).
  The existing placeholder note is updated to clarify these identify the
  committee, not a study-specific approval, which is still pending.
- `data/research.ts`: the "Ethics committee approval will be obtained…"
  commitment bullet now names the same committee for consistency.

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
