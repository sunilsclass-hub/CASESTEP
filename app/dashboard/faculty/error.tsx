'use client';

import { ErrorFallback } from '@/components/ErrorFallback';

export default function FacultyDashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorFallback error={error} reset={reset} title="Couldn't load the faculty dashboard" />;
}
