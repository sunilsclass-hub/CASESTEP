import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui';
import { CaseLibrary } from '@/components/CaseLibrary';
import { cases } from '@/data/cases';

export const metadata: Metadata = {
  title: 'Digital Case Library',
  description:
    'A structured, searchable library of digital, case-based learning modules across NCDs, maternal & child health, communicable disease, and public-health scenarios in Community Medicine.',
};

export default function CasesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Digital Case Library"
        title="Learn by reasoning through real cases"
        description="Each case is a branching clinical journey mapped to NMC CBME competencies — with decisions, feedback, red flags, a community-health lens, and reflection. Search or filter by topic, difficulty, competency, or status."
      />
      <div className="container-page py-10">
        <CaseLibrary cases={cases} />
      </div>
    </>
  );
}
