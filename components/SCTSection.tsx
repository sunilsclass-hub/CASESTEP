'use client';

import { useState } from 'react';
import { sctModules } from '@/data/sct';
import { SCTPlayer } from './SCTPlayer';

export function SCTSection() {
  const [active, setActive] = useState(sctModules[0].id);
  const activeModule = sctModules.find((m) => m.id === active)!;

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {sctModules.map((m) => (
          <button
            key={m.id}
            onClick={() => setActive(m.id)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
              active === m.id
                ? 'border-brand-500 bg-brand-600 text-white'
                : 'border-ink-200 bg-white text-ink-700 hover:border-brand-300'
            }`}
          >
            {m.title}
          </button>
        ))}
      </div>

      <div className="mb-6 rounded-xl border border-ink-200 bg-ink-50 p-4">
        <p className="text-sm leading-relaxed text-ink-600">{activeModule.intro}</p>
      </div>

      <SCTPlayer key={activeModule.id} module={activeModule} />
    </div>
  );
}
