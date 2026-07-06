'use client';

import { ErrorFallback } from '@/components/ErrorFallback';

export default function ExpertReviewError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorFallback error={error} reset={reset} title="Couldn't load Expert Review" />;
}
