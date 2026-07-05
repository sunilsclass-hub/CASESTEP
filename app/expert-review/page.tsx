import type { Metadata } from 'next';
import { PageHeader, Section } from '@/components/ui';
import { ExpertReview } from '@/components/ExpertReview';

export const metadata: Metadata = {
  title: 'Expert Review / Delphi',
  description:
    'Expert review and Delphi consensus module: rate case relevance, content validity and feasibility, add suggestions, and track consensus.',
};

export default function ExpertReviewPage() {
  return (
    <>
      <PageHeader
        eyebrow="Expert Review / Delphi"
        title="Validating the cases with experts"
        description="External experts rate each case for relevance, content validity, and feasibility. Iterative Delphi rounds build consensus and produce a validated case bank."
      />
      <Section>
        <ExpertReview />
      </Section>
    </>
  );
}
