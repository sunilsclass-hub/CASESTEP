import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui';
import { FacultyDashboard } from '@/components/FacultyDashboard';

export const metadata: Metadata = {
  title: 'Faculty Dashboard',
  description:
    'Cohort analytics: case-wise completion, mean SCT scores, OSCE checklist performance, common reasoning errors, data export, and feedback management.',
  alternates: { canonical: '/dashboard/faculty/' },
  openGraph: { url: '/dashboard/faculty/' },
};

export default function FacultyDashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Faculty Dashboard"
        title="Cohort insight & feedback"
        description="Monitor progress across the cohort, surface common reasoning errors, and manage student feedback — the evidence base for iterative course improvement."
      />
      <FacultyDashboard />
    </>
  );
}
