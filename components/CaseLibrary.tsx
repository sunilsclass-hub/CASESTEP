'use client';

import { useMemo, useState } from 'react';
import type { Case, Difficulty } from '@/lib/types';
import { CaseCard } from './CaseCard';
import { EmptyState } from './premium';
import { IconSearch, IconFilter, IconStethoscope, IconX } from './icons';

const difficulties: Difficulty[] = ['Foundation', 'Intermediate', 'Advanced'];

/**
 * Client-side, filterable case catalogue. Filtering happens entirely in the
 * browser over the local case data (no network round-trip needed) — search
 * by free text, topic tag, difficulty, competency code, and status.
 */
export function CaseLibrary({ cases }: { cases: Case[] }) {
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');
  const [tag, setTag] = useState<string | 'all'>('all');
  const [competency, setCompetency] = useState<string | 'all'>('all');
  const [status, setStatus] = useState<'all' | 'ready' | 'coming-soon'>('all');

  const allTags = useMemo(
    () => Array.from(new Set(cases.flatMap((c) => c.tags))).sort(),
    [cases],
  );
  const allCompetencies = useMemo(
    () => Array.from(new Set(cases.map((c) => c.competency.code))).sort(),
    [cases],
  );

  const filtered = cases.filter((c) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q.length === 0 ||
      c.title.toLowerCase().includes(q) ||
      c.condition.toLowerCase().includes(q) ||
      c.summary.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q));
    const matchesDifficulty = difficulty === 'all' || c.difficulty === difficulty;
    const matchesTag = tag === 'all' || c.tags.includes(tag);
    const matchesCompetency = competency === 'all' || c.competency.code === competency;
    const matchesStatus = status === 'all' || c.status === status;
    return matchesQuery && matchesDifficulty && matchesTag && matchesCompetency && matchesStatus;
  });

  const activeFilterCount = [difficulty, tag, competency, status].filter((v) => v !== 'all').length;

  function resetFilters() {
    setQuery('');
    setDifficulty('all');
    setTag('all');
    setCompetency('all');
    setStatus('all');
  }

  return (
    <div>
      {/* Search + filters */}
      <div className="card p-4 sm:p-5">
        <div className="relative">
          <IconSearch width={18} height={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cases by condition, title, or focus…"
            aria-label="Search cases"
            className="input rounded-xl py-2.5 pl-10 pr-4"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-ink-400">
            <IconFilter width={14} height={14} /> Filters
          </span>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty | 'all')}
            aria-label="Filter by difficulty"
            className="input w-auto px-2.5 py-1.5"
          >
            <option value="all">All difficulties</option>
            {difficulties.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            aria-label="Filter by topic"
            className="input w-auto px-2.5 py-1.5"
          >
            <option value="all">All topics</option>
            {allTags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            value={competency}
            onChange={(e) => setCompetency(e.target.value)}
            aria-label="Filter by competency"
            className="input w-auto px-2.5 py-1.5"
          >
            <option value="all">All competencies</option>
            {allCompetencies.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'all' | 'ready' | 'coming-soon')}
            aria-label="Filter by status"
            className="input w-auto px-2.5 py-1.5"
          >
            <option value="all">All statuses</option>
            <option value="ready">Ready to play</option>
            <option value="coming-soon">Coming soon</option>
          </select>

          {(activeFilterCount > 0 || query) && (
            <button onClick={resetFilters} className="btn-ghost ml-auto text-xs">
              <IconX width={14} height={14} /> Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-ink-500">
          {filtered.length} case{filtered.length === 1 ? '' : 's'} found
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            icon={<IconStethoscope width={22} height={22} />}
            title="No cases match these filters"
            description="Try a broader search term or clear the filters to see the full library."
            action={
              <button onClick={resetFilters} className="btn-secondary">
                Clear filters
              </button>
            }
          />
        </div>
      ) : (
        <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <CaseCard key={c.slug} case={c} />
          ))}
        </div>
      )}
    </div>
  );
}
