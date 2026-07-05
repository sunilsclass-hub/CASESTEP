import type { Metadata } from 'next';
import { PageHeader, Section } from '@/components/ui';
import { SCTSection } from '@/components/SCTSection';
import { IconBrain, IconCheck } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Script Concordance Test',
  description:
    'Script Concordance Test module: probe clinical reasoning under uncertainty using a −2 to +2 scale scored against an expert panel.',
};

export default function SCTPage() {
  return (
    <>
      <PageHeader
        eyebrow="Script Concordance Test"
        title="Reasoning under uncertainty"
        description="SCT captures how experienced clinicians actually think — by measuring how a new piece of information shifts a working hypothesis. Your responses are compared with an expert panel."
      />

      <Section>
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: <IconBrain />, title: 'A situation', text: 'A short clinical vignette establishing genuine uncertainty.' },
            { icon: <IconBrain />, title: 'A hypothesis', text: '“If you were thinking of …” — a plausible diagnosis or action.' },
            { icon: <IconCheck />, title: 'New information', text: '“… and then you find …” — decide how it shifts the hypothesis (−2 to +2).' },
          ].map((s) => (
            <div key={s.title} className="card p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                {s.icon}
              </span>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-ink-600">{s.text}</p>
            </div>
          ))}
        </div>

        <SCTSection />

        <div className="mt-10 rounded-xl border border-dashed border-ink-300 bg-ink-50 p-4 text-sm text-ink-500">
          <span className="font-semibold text-ink-700">Expert panel placeholder:</span> scores here
          compare against illustrative expert modal answers. In the research deployment, a panel of
          Community Medicine experts completes each item and their aggregated responses generate the
          scoring key.
        </div>
      </Section>
    </>
  );
}
