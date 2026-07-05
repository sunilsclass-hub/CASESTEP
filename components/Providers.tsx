'use client';

import { AuthProvider } from '@/lib/auth';

/** Client-side provider tree mounted once in the root layout. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
