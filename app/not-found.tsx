import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-6xl font-bold text-brand-200">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 max-w-md text-ink-600">
        The page you’re looking for doesn’t exist or has moved. Head back to the case library to keep
        learning.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="btn-secondary">
          Home
        </Link>
        <Link href="/cases" className="btn-primary">
          Case Library
        </Link>
      </div>
    </div>
  );
}
