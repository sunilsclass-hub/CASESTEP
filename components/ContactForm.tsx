'use client';

import { useState, type FormEvent } from 'react';

/**
 * Web3Forms access key. Per Web3Forms' own integration pattern, this key is
 * designed to be called directly from the browser — it identifies where
 * submissions are delivered, it is not a secret credential (Web3Forms has no
 * concept of a private/server-only key for this flow).
 */
const WEB3FORMS_ACCESS_KEY = 'd2da813c-91e1-4f43-a506-880c0ae85fe1';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — real visitors never see or fill this field; bots that
    // auto-fill every input do, so a non-empty value means skip sending.
    if (data.get('botcheck')) {
      setStatus('sent');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New message from ${data.get('name')} via the CaseStep contact form`,
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="card p-6">
      <h3 className="font-bold">Send a message</h3>
      {status === 'sent' ? (
        <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800">
          Thank you — your message has been sent. We&apos;ll get back to you soon.
        </div>
      ) : (
        <>
          <p className="mt-1 text-xs text-ink-500">
            Messages are delivered directly to the project team — no account needed.
          </p>
          <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />
            <div>
              <label htmlFor="contact-name" className="sr-only">
                Your name
              </label>
              <input
                id="contact-name"
                name="name"
                required
                className="input"
                placeholder="Your name"
                disabled={status === 'sending'}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="sr-only">
                Email address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className="input"
                placeholder="Email address"
                disabled={status === 'sending'}
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="sr-only">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                className="input"
                placeholder="Message"
                disabled={status === 'sending'}
              />
            </div>
            {status === 'error' && (
              <p className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                Something went wrong sending your message. Please try again in a moment, or email
                the project team directly.
              </p>
            )}
            <button className="btn-primary w-full" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
