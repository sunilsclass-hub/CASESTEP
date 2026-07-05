# CaseStep

**Digital Case-Based Learning to Enhance Clinical Reasoning in Community Medicine**

An educational platform delivering interactive, branching clinical cases, Script Concordance Testing, and OSCE/OSPE practice for MBBS students — built for the International FAIMER Fellowship project _“Integrating Digital Case-Based Learning to Enhance Clinical Reasoning in Community Medicine.”_

> Principal Investigator: **Dr. D. Sunil Kumar** — Dean (Student’s Welfare), Professor of Community Medicine, International FAIMER Fellow, JSS Academy of Higher Education & Research, Mysuru.

---

## ✨ What’s inside

| Module | Route | Description |
| --- | --- | --- |
| **Home** | `/` | Academic landing page with learning journey and featured cases. |
| **About the Project** | `/about` | Rationale, objectives, FAIMER & NMC CBME alignment, Kern & ADDIE. |
| **Digital Case Library** | `/cases` | Card-based library of 11 case topics (3 fully authored). |
| **Interactive Case** | `/cases/[slug]` | Stepwise, branching case player with decisions, feedback, red flags, community angle, reflection, and summary. |
| **Script Concordance Test** | `/sct` | −2 to +2 reasoning-under-uncertainty items scored against an expert panel. |
| **OSCE / OSPE** | `/osce` | Stations with weighted checklists, global rating scales, examiner notes, and printable rubrics. |
| **Student Dashboard** | `/dashboard/student` | Progress, SCT/OSCE scores, reflections, strengths & improvement areas. |
| **Faculty Dashboard** | `/dashboard/faculty` | Cohort analytics, common reasoning errors, CSV export, feedback management. |
| **Expert Review / Delphi** | `/expert-review` | Relevance / validity / feasibility ratings + checklist, saved to Supabase (`expert_reviews`); **live consensus** (median, IQR, % agreement, Round-2 flags) computed across the panel via an RLS-safe aggregate function. |
| **Research & Evaluation** | `/research` | Study design, phases, evaluation tools, publications. |
| **Contact & Team** | `/contact` | Principal investigator and team placeholders. |

**All 11 case topics are fully authored** with the complete interactive journey (scenario → history → examination → investigations → branching decisions → clinical reasoning → community diagnosis → management → reflection → summary): Type 2 Diabetes Mellitus, Hypertension, Antenatal Care, Postnatal Care, Acute Diarrhoea, URTI, UTI, Chest Pain, Paediatric Growth & Nutrition, Vector-borne Outbreak Investigation, and Environmental/Occupational Health. The three flagship cases live in `data/cases.ts`; the other eight in `data/cases-extra.ts`.

---

## 🧰 Tech stack

- **[Next.js 14](https://nextjs.org/)** (App Router) with **static export** (`output: 'export'`)
- **TypeScript**
- **Tailwind CSS**
- **No backend required** — learner progress is stored client-side in `localStorage`
- **Optional [Supabase](https://supabase.com) backend** — add cloud accounts + multi-device sync with two environment variables (see below); the app runs identically without it
- Custom inline SVG icons (no icon-library dependency)
- Responsive, mobile-friendly, accessible (skip link, focus rings, semantic landmarks)

Because the app compiles to plain static files, it hosts anywhere (Netlify, Vercel, GitHub Pages, S3, institutional web server) with no server runtime.

---

## 🚀 Run locally

Requires **Node.js 20+**.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (hot reload)
npm run dev
# open http://localhost:3000

# 3. Production build → static site in ./out
npm run build

# 4. Preview the static build locally
npx serve out
# or: python3 -m http.server 8080 --directory out
```

---

## ☁️ Deploy live

### Option A — Vercel (recommended, zero config)

1. Push this repository to GitHub.
2. Go to **[vercel.com](https://vercel.com)** → **Add New Project** → import the repo.
3. Vercel auto-detects Next.js. Keep defaults and click **Deploy**.
   - `vercel.json` pins the build command and `out` output directory.
4. Your site goes live at `https://<project>.vercel.app`.

Or from the CLI:

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

### Option B — Netlify

1. Push this repository to GitHub.
2. Go to **[netlify.com](https://netlify.com)** → **Add new site** → **Import an existing project**.
3. Netlify reads `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
4. Click **Deploy site**.

Or from the CLI:

```bash
npm i -g netlify-cli
netlify deploy --build            # draft
netlify deploy --build --prod     # production
```

### Option C — Any static host / GitHub Pages

Run `npm run build` and upload the contents of the `out/` folder to any static host.

---

## ☁️ Cloud accounts & multi-device sync (optional Supabase)

By default CaseStep stores each learner's progress in the browser (`localStorage`).
To enable **real accounts** and **sync across devices**, connect a free Supabase project:

1. Create a project at **[supabase.com](https://supabase.com)**.
2. Open **Project Settings → API** and copy the **Project URL** and the **anon/public** key.
3. Copy `.env.example` to `.env.local` and paste both values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
4. In the Supabase **SQL editor**, run the contents of **`supabase/schema.sql`** (creates the
   `user_progress` table + RLS policies, the `expert_reviews` table, and the
   `expert_review_consensus()` aggregation function that powers the live Delphi consensus).
5. Rebuild/redeploy. A **Sign in** control appears in the navbar; signing in reconciles local and
   cloud progress (newest-wins merge) and keeps them in sync.

On Netlify/Vercel, add the same two `NEXT_PUBLIC_*` variables in the site's **Environment
variables** settings. They are browser-safe public values — never add the `service_role` key.

**How it works (no UI rewrite):** `lib/storage.ts` remains the single source of truth for the UI.
`lib/auth.tsx` registers a sync handler that mirrors every local write to Supabase, and
`lib/sync.ts` merges cloud + local on sign-in. If the env vars are absent, `getSupabase()` returns
`null` and the whole auth/sync layer no-ops — the app stays purely local.

---

## 🗂️ Project structure

```
casestep/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout (Navbar, Footer, metadata)
│   ├── page.tsx              # Home
│   ├── about/                # About the project
│   ├── cases/                # Case library + [slug] interactive player
│   ├── sct/                  # Script Concordance Test
│   ├── osce/                 # OSCE / OSPE stations
│   ├── dashboard/            # Student & Faculty dashboards
│   ├── expert-review/        # Expert review / Delphi
│   ├── research/             # Research & evaluation
│   └── contact/              # Contact & team
├── components/               # Reusable UI + interactive players
│   ├── Navbar.tsx  Footer.tsx  ui.tsx  icons.tsx
│   ├── Providers.tsx  AuthWidget.tsx
│   ├── CaseCard.tsx  CasePlayer.tsx
│   ├── SCTPlayer.tsx  SCTSection.tsx
│   ├── OSCEStationCard.tsx
│   ├── StudentDashboard.tsx  FacultyDashboard.tsx
│   ├── ExpertReview.tsx  ContactForm.tsx
├── data/                     # Local mock data (JSON-like TS modules)
│   ├── cases.ts  cases-extra.ts   # 3 flagship + 8 additional full cases
│   ├── sct.ts  osce.ts  cohort.ts  site.ts
├── lib/                      # Types, storage, and optional Supabase layer
│   ├── types.ts  storage.ts  useStore.ts
│   ├── supabase.ts  auth.tsx  sync.ts
├── supabase/schema.sql       # Tables + RLS for cloud sync
├── .env.example              # Optional Supabase env vars
├── next.config.js  tailwind.config.ts  tsconfig.json
├── netlify.toml  vercel.json
└── README.md
```

---

## 🔌 Future database / API integration

The app is intentionally structured so a backend can be added **without changing the UI**:

- **Data source** — `data/*.ts` export plain objects typed by `lib/types.ts`. Replace each
  exported constant/getter with async calls (e.g. `getCases()` → a Supabase/Firebase query returning
  the same `Case[]` shape). Look for the `FUTURE DB INTEGRATION` comments in `data/cases.ts`,
  `data/sct.ts`, `data/osce.ts`, and `data/cohort.ts`.
- **Progress & results** — `lib/storage.ts` wraps all persistence behind functions
  (`saveCaseProgress`, `saveSCTResult`, `saveOSCEResult`). Cloud sync is **already wired**: when
  Supabase is configured, every write mirrors to `user_progress` (see the section above). To move to
  fully normalised per-result tables, implement the reference schema in `supabase/schema.sql`.
- **Auth** — **implemented** (optional) via Supabase email/password in `lib/auth.tsx` +
  `components/AuthWidget.tsx`. The Expert Review page also has an expert-login placeholder ready to
  reuse the same auth.
- **Forms** — the contact form (`components/ContactForm.tsx`) has a `FUTURE` marker for wiring a
  form/email service (Formspree, Supabase Edge Function, etc.).

### Suggested Supabase schema (starter)

```
cases(id, slug, title, condition, competency_code, difficulty, minutes, ...)
case_steps(id, case_id, kind, title, body, bullets jsonb, decision jsonb, ...)
progress(user_id, case_slug, completed, last_step, decisions jsonb, reflections jsonb, updated_at)
sct_items(id, module_id, scenario, if_thinking, and_then, expert_mode, rationale)
sct_results(user_id, module_id, answers jsonb, score, max_score, updated_at)
osce_stations(id, title, competency, checklist jsonb, ...)
osce_results(user_id, station_id, checked jsonb, global_rating, score, updated_at)
expert_reviews(expert_id, case_slug, relevance, validity, feasibility, comments, round)
```

---

## 🎓 Educational frameworks reflected

NMC CBME curriculum · FAIMER project framework · Kern’s 6-step model · ADDIE · TPACK ·
Clinical-reasoning theory · Script Concordance Testing · OSCE/OSPE competency assessment ·
Mixed-methods educational research · Implementation science.

---

## 📄 Notes & disclaimer

- Clinical content is for **undergraduate medical education** and reasoning practice only; it is not
  a clinical guideline or a substitute for authoritative national protocols.
- SCT “expert panel” values and faculty-dashboard cohort figures are **illustrative placeholders**
  for the demo build; they are replaced by real expert responses and student data in the research
  deployment.

© CaseStep — For educational and research use. JSS AHER, Mysuru.
