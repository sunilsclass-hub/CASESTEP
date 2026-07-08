import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui';
import { StudentDashboard } from '@/components/StudentDashboard';

export const metadata: Metadata = {
  title: 'Student Dashboard',
  description:
    'Track cases completed, SCT and OSCE scores, time invested, reflections, strengths and areas for improvement.',
  alternates: { canonical: '/dashboard/student/' },
  openGraph: { url: '/dashboard/student/' },
};

export default function StudentDashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Student Dashboard"
        title="Your learning journey"
        description="A personalised view of your progress across cases, script-concordance reasoning, OSCE/OSPE practice, and reflection."
      />
      <StudentDashboard />
    </>
  );
}
