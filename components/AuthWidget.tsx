'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { IconUsers, IconLock, IconRefresh, IconX, IconCheck } from './icons';

/**
 * Navbar account control.
 * - When Supabase is not configured, renders nothing (pure local demo).
 * - When configured, shows Sign in / account state and a compact auth form,
 *   enabling cloud accounts + multi-device progress sync.
 */
export function AuthWidget() {
  const { enabled, loading, user, syncing, signIn, signUp, signOut, resetPassword } = useAuth();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'in' | 'up' | 'reset'>('in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [msgTone, setMsgTone] = useState<'error' | 'info'>('error');
  const [busy, setBusy] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  function switchMode(next: 'in' | 'up' | 'reset') {
    setMode(next);
    setMsg(null);
    setResetSent(false);
  }

  if (!enabled) return null; // No backend configured — stay purely local.

  if (loading) {
    return <span className="text-xs text-ink-400">…</span>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden items-center gap-1 text-xs text-ink-500 sm:flex">
          {syncing ? (
            <>
              <IconRefresh width={12} height={12} className="animate-spin" /> Syncing
            </>
          ) : (
            <>
              <IconCheck width={12} height={12} className="text-brand-500" /> Synced
            </>
          )}
        </span>
        <span className="hidden max-w-[140px] truncate text-sm font-medium text-ink-700 md:inline">
          {user.email}
        </span>
        <button onClick={() => signOut()} className="btn-secondary px-3 py-2 text-xs">
          Sign out
        </button>
      </div>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);

    if (mode === 'reset') {
      const res = await resetPassword(email);
      setBusy(false);
      if (res.error) {
        setMsgTone('error');
        setMsg(res.error);
      } else {
        setResetSent(true);
      }
      return;
    }

    const res = mode === 'in' ? await signIn(email, password) : await signUp(email, password);
    setBusy(false);
    if (res.error) {
      setMsgTone('error');
      setMsg(res.error);
    } else if ('needsConfirm' in res && res.needsConfirm) {
      setMsgTone('info');
      setMsg('Check your email to confirm your account, then sign in.');
    } else {
      setOpen(false);
      setEmail('');
      setPassword('');
    }
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="btn-secondary px-3 py-2 text-xs">
        <IconUsers width={14} height={14} /> Sign in
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute right-0 z-50 mt-2 w-72 rounded-xl border border-ink-200 bg-white p-4 shadow-cardhover">
            <div className="mb-3 flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-ink-800">
                <IconLock width={14} height={14} className="text-brand-600" />
                {mode === 'in' ? 'Sign in' : mode === 'up' ? 'Create account' : 'Reset password'}
              </p>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <IconX width={16} height={16} className="text-ink-400" />
              </button>
            </div>

            {mode === 'reset' && resetSent ? (
              <div className="rounded-lg border border-brand-200 bg-brand-50 p-3 text-sm text-brand-800">
                Check your email for a password reset link. Follow it to set a new password.
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-2">
                <label htmlFor="auth-email" className="sr-only">
                  Email
                </label>
                <input
                  id="auth-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="input"
                  disabled={busy}
                />
                {mode !== 'reset' && (
                  <>
                    <label htmlFor="auth-password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="auth-password"
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password (min 6 chars)"
                      className="input"
                      disabled={busy}
                    />
                  </>
                )}
                <button type="submit" disabled={busy} className="btn-primary w-full text-sm">
                  {busy
                    ? 'Please wait…'
                    : mode === 'in'
                      ? 'Sign in'
                      : mode === 'up'
                        ? 'Sign up'
                        : 'Send reset link'}
                </button>
              </form>
            )}

            {msg && (
              <p
                className={`mt-2 rounded-lg border p-2 text-xs ${
                  msgTone === 'error'
                    ? 'border-rose-200 bg-rose-50 text-rose-700'
                    : 'border-brand-200 bg-brand-50 text-brand-800'
                }`}
              >
                {msg}
              </p>
            )}

            {mode === 'in' && (
              <button
                onClick={() => switchMode('reset')}
                className="mt-3 block text-xs text-ink-500 hover:text-brand-700 hover:underline"
              >
                Forgot password?
              </button>
            )}

            <button
              onClick={() => switchMode(mode === 'reset' ? 'in' : mode === 'in' ? 'up' : 'in')}
              className="mt-1.5 block text-xs text-brand-700 hover:underline"
            >
              {mode === 'in'
                ? 'New here? Create an account'
                : mode === 'up'
                  ? 'Have an account? Sign in'
                  : 'Back to sign in'}
            </button>

            <p className="mt-2 text-[11px] leading-snug text-ink-400">
              Signing in syncs your progress across devices. Your data is stored locally too.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
