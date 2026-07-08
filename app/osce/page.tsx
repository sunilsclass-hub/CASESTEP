import type { Metadata } from 'next';
import { PageHeader, Section } from '@/components/ui';
import { OSCEStationCard } from '@/components/OSCEStationCard';
import { osceStations } from '@/data/osce';

export const metadata: Metadata = {
  title: 'OSCE / OSPE Module',
  description:
    'OSCE and OSPE preparation stations with weighted checklists, global rating scales, examiner notes, student feedback, and printable rubrics.',
  alternates: { canonical: '/osce/' },
  openGraph: { url: '/osce/' },
};

export default function OSCEPage() {
  return (
    <>
      <PageHeader
        eyebrow="OSCE / OSPE Module"
        title="Practise competency-based assessment"
        description="Structured stations for skills and product assessment — each with candidate instructions, a weighted checklist, a global rating scale, examiner notes, and a printable rubric."
      />

      <Section>
        <div className="space-y-8">
          {osceStations.map((s) => (
            <OSCEStationCard key={s.id} station={s} />
          ))}
        </div>
      </Section>
    </>
  );
}
