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
          <div>
            <label htmlFor="contact-name" className="sr-only">
              Your name
            </label>
            <input id="contact-name" required className="input" placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="contact-email" className="sr-only">
              Email address
            </label>
            <input id="contact-email" type="email" required className="input" placeholder="Email address" />
          </div>
          <div>
            <label htmlFor="contact-message" className="sr-only">
              Message
            </label>
            <textarea id="contact-message" required rows={4} className="input" placeholder="Message" />
          </div>
          <button className="btn-primary w-full" type="submit">
            Send message
          </button>
        </form>
      )}
    </div>
  );
}
