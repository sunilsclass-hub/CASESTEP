'use client';

import { useState } from 'react';

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <div className="card p-6">
      <h3 className="font-bold">Send a message</h3>
      <p className="mt-1 text-xs text-ink-500">
        {/* FUTURE: connect to a form backend (e.g. Formspree, Supabase Edge Function, or email API). */}
        Demo form — wire to an email/form service before going live.
      </p>
      {sent ? (
        <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800">
          Thanks for your message. In this demo build the form is not yet connected to a backend —
          add a form service to enable delivery.
        </div>
      ) : (
        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <input
            required
            className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
            placeholder="Your name"
          />
          <input
            type="email"
            required
            className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
            placeholder="Email address"
          />
          <textarea
            required
            rows={4}
            className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
            placeholder="Message"
          />
          <button className="btn-primary w-full" type="submit">
            Send message
          </button>
        </form>
      )}
    </div>
  );
}
