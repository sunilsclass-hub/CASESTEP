'use client';

import { useState } from 'react';
import type { OSCEStation } from '@/lib/types';
import { saveOSCEResult } from '@/lib/storage';
import { Badge } from './ui';
import { IconClock, IconPrint, IconRefresh, IconCheck, IconStar } from './icons';
import { Illustration, VideoPlaceholder } from './media';
import { osceIllustration, osceVideos } from '@/data/media';

export function OSCEStationCard({ station }: { station: OSCEStation }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [rating, setRating] = useState<number>(-1);
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [scored, setScored] = useState(false);

  const illustration = osceIllustration[station.id];
  const video = osceVideos[station.id];

  const maxScore = station.checklist.reduce((s, i) => s + i.weight, 0);
  const score = station.checklist.reduce(
    (s, i) => s + (checked[i.id] ? i.weight : 0),
    0,
  );
  const pct = maxScore === 0 ? 0 : (score / maxScore) * 100;

  function toggle(id: string) {
    setChecked((c) => ({ ...c, [id]: !c[id] }));
  }

  function saveScore() {
    setScored(true);
    saveOSCEResult({
      stationId: station.id,
      checked,
      globalRating: rating,
      score,
      maxScore,
      updatedAt: Date.now(),
    });
  }

  function reset() {
    setChecked({});
    setRating(-1);
    setFeedback({});
    setScored(false);
  }

  return (
    <div className="card print-clean p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge tone="brand">{station.type}</Badge>
            <span className="flex items-center gap-1 text-xs text-ink-500">
              <IconClock width={14} height={14} /> {station.minutes} min
            </span>
          </div>
          <h3 className="text-xl font-bold text-ink-900">{station.title}</h3>
          <p className="mt-1 text-sm text-ink-600">
            <span className="font-medium">Competency {station.competency.code}:</span>{' '}
            {station.competency.text}
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="btn-secondary no-print"
          aria-label="Print rubric"
        >
          <IconPrint width={16} height={16} /> Print rubric
        </button>
      </div>

      {/* Candidate instructions */}
      <div className="mt-5 rounded-xl bg-brand-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
          Candidate instructions
        </p>
        <p className="mt-1 text-sm text-ink-700">{station.candidateInstructions}</p>
      </div>

      {/* Station media */}
      {(illustration || video) && (
        <div className="mt-6 grid gap-4 no-print sm:grid-cols-2">
          {illustration && (
            <Illustration
              src={illustration}
              alt={`Illustration for the ${station.title} OSCE station`}
              aspect="aspect-[4/3]"
            />
          )}
          {video && <VideoPlaceholder title={video.title} objective={video.objective} />}
        </div>
      )}

      {/* Checklist */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="font-semibold text-ink-900">Examiner checklist</h4>
          <span className="text-sm font-medium text-ink-600">
            {score} / {maxScore} marks · {Math.round(pct)}%
          </span>
        </div>
        <ul className="divide-y divide-ink-100 overflow-hidden rounded-xl border border-ink-200">
          {station.checklist.map((item) => (
            <li key={item.id} className="flex items-center gap-3 bg-white px-4 py-3">
              <button
                onClick={() => toggle(item.id)}
                aria-pressed={!!checked[item.id]}
                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border transition ${
                  checked[item.id]
                    ? 'border-brand-500 bg-brand-500 text-white'
                    : 'border-ink-300 bg-white text-transparent hover:border-brand-400'
                }`}
              >
                <IconCheck width={14} height={14} />
              </button>
              <span className="flex-1 text-sm text-ink-700">{item.text}</span>
              <span className="text-xs font-medium text-ink-400">{item.weight} mark{item.weight > 1 ? 's' : ''}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Global rating scale */}
      <div className="mt-6">
        <h4 className="mb-2 font-semibold text-ink-900">Global rating scale</h4>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {station.globalRating.map((label, i) => (
            <button
              key={label}
              onClick={() => setRating(i)}
              className={`rounded-lg border px-2 py-3 text-center text-xs font-medium transition ${
                rating === i
                  ? 'border-accent-500 bg-accent-400/20 text-accent-600'
                  : 'border-ink-200 bg-white text-ink-600 hover:border-accent-400'
              }`}
            >
              <IconStar
                width={14}
                height={14}
                className={`mx-auto mb-1 ${rating >= i && rating >= 0 ? 'text-accent-500' : 'text-ink-300'}`}
              />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Examiner notes */}
      <div className="mt-6 rounded-xl border border-ink-200 bg-ink-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Examiner notes</p>
        <ul className="mt-2 space-y-1 text-sm text-ink-600">
          {station.examinerNotes.map((n, i) => (
            <li key={i}>• {n}</li>
          ))}
        </ul>
      </div>

      {/* Student feedback capture */}
      <div className="mt-6 no-print">
        <h4 className="mb-2 font-semibold text-ink-900">Student feedback</h4>
        <div className="space-y-3">
          {station.studentFeedbackPrompts.map((prompt, i) => (
            <div key={i}>
              <label className="mb-1 block text-sm text-ink-600">{prompt}</label>
              <input
                type="text"
                value={feedback[`f${i}`] ?? ''}
                onChange={(e) => setFeedback((f) => ({ ...f, [`f${i}`]: e.target.value }))}
                className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
                placeholder="Type here…"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 no-print">
        <button onClick={saveScore} className="btn-primary">
          Save station score
        </button>
        <button onClick={reset} className="btn-ghost">
          <IconRefresh width={16} height={16} /> Reset
        </button>
        {scored && (
          <span className="self-center text-sm text-brand-700">
            Saved — visible on the Faculty &amp; Student dashboards.
          </span>
        )}
      </div>
    </div>
  );
}
