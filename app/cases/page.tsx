import type { Metadata } from 'next';
import { PageHeader, Section } from '@/components/ui';
import { CaseCard } from '@/components/CaseCard';
import { cases } from '@/data/cases';

export const metadata: Metadata = {
  title: 'Digital Case Library',
  description:
    'A structured library of digital, case-based learning modules across NCDs, maternal & child health, communicable disease, and public-health scenarios in Community Medicine.',
};

export default function CasesPage() {
  const ready = cases.filter((c) => c.status === 'ready');
  const soon = cases.filter((c) => c.status === 'coming-soon');

  return (
    <>
      <PageHeader
        eyebrow="Digital Case Library"
        title="Learn by reasoning through real cases"
        description="Each case is a branching clinical journey mapped to NMC CBME competencies — with decisions, feedback, red flags, a community-health lens, and reflection."
      />

      <Section title="Ready to play">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ready.map((c) => (
            <CaseCard key={c.slug} case={c} />
          ))}
        </div>
      </Section>

      <Section title="Case pipeline" description="Structured placeholders following the same model, ready to be authored." className="border-t border-ink-200">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {soon.map((c) => (
            <CaseCard key={c.slug} case={c} />
          ))}
        </div>
      </Section>
    </>
  );
}
