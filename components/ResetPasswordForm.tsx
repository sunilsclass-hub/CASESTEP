'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

type Status = 'idle' | 'saving' | 'saved' | 'error';

export function ResetPasswordForm() {
  const { enabled, updatePassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setStatus('saving');
    const res = await updatePassword(password);
    if (res.error) {
      setStatus('error');
      setError(res.error);
    } else {
      setStatus('saved');
    }
  }

  if (!enabled) {
    return (
      <div className="card mx-auto max-w-md p-8 text-center">
        <p className="text-sm text-ink-600">
          Cloud accounts are not enabled on this deployment, so there is no password to reset.
        </p>
        <Link href="/" className="btn-secondary mt-5 inline-flex">
          Return to CaseStep
        </Link>
      </div>
    );
  }

  if (status === 'saved') {
    return (
      <div className="card mx-auto max-w-md p-8 text-center">
        <h2 className="text-lg font-bold text-ink-900">Password updated</h2>
        <p className="mt-2 text-sm text-ink-600">
          Your password has been changed. You can now sign in with your new password.
        </p>
        <Link href="/" className="btn-primary mt-5 inline-flex">
          Return to CaseStep
        </Link>
      </div>
    );
  }

  return (
    <div className="card mx-auto max-w-md p-8">
      <h2 className="text-lg font-bold text-ink-900">Set a new password</h2>
      <p className="mt-1 text-sm text-ink-600">
        Enter a new password for your account. This only works if you arrived here from a valid
        password-reset link sent to your email.
      </p>
      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <div>
          <label htmlFor="new-password" className="sr-only">
            New password
          </label>
          <input
            id="new-password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password (min 6 chars)"
            className="input"
            disabled={status === 'saving'}
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="sr-only">
            Confirm new password
          </label>
          <input
            id="confirm-password"
            type="password"
            required
            minLength={6}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm new password"
            className="input"
            disabled={status === 'saving'}
          />
        </div>
        {error && (
          <p className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
            {error}
          </p>
        )}
        <button type="submit" disabled={status === 'saving'} className="btn-primary w-full">
          {status === 'saving' ? 'Saving…' : 'Set new password'}
        </button>
      </form>
    </div>
  );
}
