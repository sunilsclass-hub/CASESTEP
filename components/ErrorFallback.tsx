'use client';

import Link from 'next/link';
import { IconRefresh } from './icons';

/**
 * Shared UI for Next.js route error boundaries (app/**\/error.tsx).
 *
 * These boundaries catch unexpected runtime errors during client rendering
 * and show a recoverable fallback instead of a frozen or blank page — the
 * "defensive checks" layer requested for the dashboards and Expert Review,
 * which must never appear broken during a live demonstration.
 */
export function ErrorFallback({
  error,
  reset,
  title = 'Something went wrong loading this page',
}: {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
}) {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
      <div className="card max-w-md p-8">
        <h2 className="text-xl font-bold text-ink-900">{title}</h2>
        <p className="mt-2 text-sm text-ink-600">
          This is a client-side rendering error, not a data-loss event — your saved progress (if
          any) is untouched in this browser. Try again, or head back to the case library.
        </p>
        {process.env.NODE_ENV !== 'production' && (
          <p className="mt-3 rounded-lg bg-rose-50 p-3 text-left text-xs text-rose-700">
            {error.message}
          </p>
        )}
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button onClick={reset} className="btn-primary">
            <IconRefresh width={16} height={16} /> Try again
          </button>
          <Link href="/cases" className="btn-secondary">
            Case Library
          </Link>
        </div>
      </div>
    </div>
  );
}
