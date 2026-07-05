-- CaseStep — Supabase schema
-- Run this in the Supabase SQL editor (Project → SQL → New query) after
-- creating a project. It enables cloud accounts + multi-device progress sync.
--
-- Model: one JSON blob per user holds the entire progress `Store`
-- (cases, sct, osce). This mirrors the client data model in lib/storage.ts and
-- is the pragmatic first step. A normalised, analytics-ready design is sketched
-- at the bottom for when you outgrow the blob.

-- =====================================================================
-- 1. Per-user progress blob
-- =====================================================================
create table if not exists public.user_progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_progress enable row level security;

-- Each user can read/write ONLY their own row.
drop policy if exists "own progress - select" on public.user_progress;
create policy "own progress - select" on public.user_progress
  for select using (auth.uid() = user_id);

drop policy if exists "own progress - insert" on public.user_progress;
create policy "own progress - insert" on public.user_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "own progress - update" on public.user_progress;
create policy "own progress - update" on public.user_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =====================================================================
-- 2. (Optional) Expert review submissions for the Delphi module
-- =====================================================================
create table if not exists public.expert_reviews (
  id           uuid primary key default gen_random_uuid(),
  expert_id    uuid references auth.users (id) on delete set null,
  case_slug    text not null,
  relevance    smallint check (relevance between 1 and 5),
  validity     smallint check (validity between 1 and 5),
  feasibility  smallint check (feasibility between 1 and 5),
  checklist    jsonb default '{}'::jsonb,
  comments     text,
  round        smallint not null default 1,
  created_at   timestamptz not null default now()
);

alter table public.expert_reviews enable row level security;

-- Experts can insert and read back their own reviews.
drop policy if exists "insert own review" on public.expert_reviews;
create policy "insert own review" on public.expert_reviews
  for insert with check (auth.uid() = expert_id);

drop policy if exists "read own review" on public.expert_reviews;
create policy "read own review" on public.expert_reviews
  for select using (auth.uid() = expert_id);

-- =====================================================================
-- 3. Cross-expert consensus (aggregate-only, RLS-safe)
-- =====================================================================
-- RLS on expert_reviews stops one expert reading another's rows. To build a
-- Delphi consensus we still need panel-wide aggregates — but NOT the individual
-- rows. A SECURITY DEFINER function solves this cleanly: it runs with the
-- owner's rights (bypassing RLS) yet returns only aggregated numbers per
-- dimension, never raw reviews. "% agreement" = share of ratings that are 4–5.
create or replace function public.expert_review_consensus(p_case_slug text)
returns table (
  dimension  text,
  n          integer,
  median     numeric,
  q1         numeric,
  q3         numeric,
  pct_agree  numeric
)
language sql
security definer
set search_path = public
as $$
  with vals as (
    select 'relevance'::text as dimension, relevance::numeric as v
      from public.expert_reviews where case_slug = p_case_slug and relevance is not null
    union all
    select 'validity', validity::numeric
      from public.expert_reviews where case_slug = p_case_slug and validity is not null
    union all
    select 'feasibility', feasibility::numeric
      from public.expert_reviews where case_slug = p_case_slug and feasibility is not null
  )
  select
    dimension,
    count(*)::int                                             as n,
    percentile_cont(0.5)  within group (order by v)           as median,
    percentile_cont(0.25) within group (order by v)           as q1,
    percentile_cont(0.75) within group (order by v)           as q3,
    round(100.0 * avg((v >= 4)::int), 0)                      as pct_agree
  from vals
  group by dimension;
$$;

-- Any signed-in user may read the aggregate consensus (not the raw rows).
grant execute on function public.expert_review_consensus(text) to authenticated;

-- =====================================================================
-- 4. Future normalised, analytics-ready tables (reference only)
-- =====================================================================
-- create table public.case_progress (
--   user_id uuid references auth.users(id) on delete cascade,
--   case_slug text,
--   completed boolean default false,
--   last_step int default 0,
--   decisions jsonb default '{}'::jsonb,
--   reflections jsonb default '{}'::jsonb,
--   updated_at timestamptz default now(),
--   primary key (user_id, case_slug)
-- );
-- create table public.sct_results ( user_id uuid, module_id text, answers jsonb,
--   score numeric, max_score numeric, updated_at timestamptz,
--   primary key (user_id, module_id) );
-- create table public.osce_results ( user_id uuid, station_id text, checked jsonb,
--   global_rating int, score numeric, max_score numeric, updated_at timestamptz,
--   primary key (user_id, station_id) );
-- Faculty dashboards would then query aggregates across these tables (with
-- appropriate RLS / a faculty role) instead of the mock data in data/cohort.ts.
