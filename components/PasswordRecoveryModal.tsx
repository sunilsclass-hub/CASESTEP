'use client';

import { useAuth } from '@/lib/auth';
import { ResetPasswordForm } from './ResetPasswordForm';

/**
 * Full-screen, non-dismissable gate rendered once at the app root. It shows
 * whenever Supabase reports a PASSWORD_RECOVERY session — i.e. the user
 * arrived via an emailed "reset your password" link — no matter which page
 * that link actually lands them on (the redirect target is not guaranteed:
 * it depends on the Supabase "Redirect URLs" configuration, and this must
 * work correctly even if that landing page is the homepage).
 *
 * Without this, a recovery link would silently sign the user in with their
 * OLD password still active and no way to actually change it.
 */
export function PasswordRecoveryModal() {
  const { passwordRecovery, completePasswordRecovery, signOut } = useAuth();

  if (!passwordRecovery) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md">
        <ResetPasswordForm onSuccess={completePasswordRecovery} />
        <button
          onClick={() => signOut()}
          className="mt-4 block w-full text-center text-xs text-white/80 hover:text-white hover:underline"
        >
          This link isn&apos;t working? Sign out and try again
        </button>
      </div>
    </div>
  );
}
