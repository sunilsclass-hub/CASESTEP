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
| **Expert Review / Delphi** | `/expert-review` | Relevance / validity / feasibility ratings, checklist, consensus placeholder. |
| **Research & Evaluation** | `/research` | Study design, phases, evaluation tools, publications. |
| **Contact & Team** | `/contact` | Principal investigator and team placeholders. |

Fully authored cases: **Type 2 Diabetes Mellitus**, **Hypertension**, **Antenatal Care**. The remaining eight topics are structured placeholders that follow the same data model.

---

## 🧰 Tech stack

- **[Next.js 14](https://nextjs.org/)** (App Router) with **static export** (`output: 'export'`)
- **TypeScript**
- **Tailwind CSS**
- **No backend required** — learner progress is stored client-side in `localStorage`
- Zero external runtime dependencies (custom inline SVG icons)
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
│   ├── CaseCard.tsx  CasePlayer.tsx
│   ├── SCTPlayer.tsx  SCTSection.tsx
│   ├── OSCEStationCard.tsx
│   ├── StudentDashboard.tsx  FacultyDashboard.tsx
│   ├── ExpertReview.tsx  ContactForm.tsx
├── data/                     # Local mock data (JSON-like TS modules)
│   ├── cases.ts  sct.ts  osce.ts  cohort.ts  site.ts
├── lib/                      # Types + client storage helpers
│   ├── types.ts  storage.ts  useStore.ts
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
  (`saveCaseProgress`, `saveSCTResult`, `saveOSCEResult`). Swap the `localStorage` body for
  authenticated DB writes and the components keep working unchanged.
- **Auth** — the Expert Review page and dashboards have login/identity placeholders ready to be
  connected to Supabase Auth / Firebase Auth.
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
