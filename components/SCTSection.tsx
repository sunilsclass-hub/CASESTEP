'use client';

import { useState } from 'react';
import Image from 'next/image';
import { sctModules } from '@/data/sct';
import { sctIllustration } from '@/data/media';
import { SCTPlayer } from './SCTPlayer';
import { DemoDataBanner } from './premium';

export function SCTSection() {
  const [active, setActive] = useState(sctModules[0].id);
  const activeModule = sctModules.find((m) => m.id === active)!;

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2 overflow-x-auto pb-1">
        {sctModules.map((m) => (
          <button
            key={m.id}
            onClick={() => setActive(m.id)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-lg border px-3 py-2 text-sm font-medium transition sm:px-4 ${
              active === m.id
                ? 'border-brand-500 bg-brand-600 text-white'
                : 'border-ink-200 bg-white text-ink-700 hover:border-brand-300'
            }`}
          >
            {sctIllustration[m.id] && (
              <span className="relative h-6 w-6 flex-shrink-0 overflow-hidden rounded-full bg-white/70">
                <Image src={sctIllustration[m.id]} alt="" fill className="object-contain p-0.5" />
              </span>
            )}
            {m.title}
          </button>
        ))}
      </div>

      <div className="mb-6 flex flex-col gap-4 rounded-xl border border-ink-200 bg-ink-50 p-4 sm:flex-row sm:items-center">
        {sctIllustration[activeModule.id] && (
          <span className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-white">
            <Image
              src={sctIllustration[activeModule.id]}
              alt={`Illustration for the ${activeModule.title} module`}
              fill
              className="object-contain p-2"
            />
          </span>
        )}
        <p className="text-sm leading-relaxed text-ink-600">{activeModule.intro}</p>
      </div>

      <SCTPlayer key={activeModule.id} module={activeModule} />

      <DemoDataBanner title="Illustrative expert-panel scoring">
        Scores here compare against illustrative expert modal answers, not a real Delphi panel. In
        the research deployment, a panel of Community Medicine experts will complete each item and
        their aggregated, ethics-approved responses will generate the scoring key.
      </DemoDataBanner>
    </div>
  );
}
