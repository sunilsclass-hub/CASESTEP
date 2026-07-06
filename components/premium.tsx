'use client';

import Link from 'next/link';
import { IconInfo } from './icons';

/**
 * Shared "this is demo/illustrative data" banner — consolidates what was
 * previously three near-identical inline blocks (Faculty Dashboard, Expert
 * Review, Student Dashboard) into one component so tone, styling, and wording
 * stay consistent everywhere this disclosure is legally/academically required.
 */
export function DemoDataBanner({
  title = 'Demo data',
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-fade-in rounded-xl border border-accent-400/50 bg-accent-400/10 p-4 text-sm text-ink-700">
      <p className="flex items-center gap-1.5 font-semibold text-accent-700">
        <IconInfo width={16} height={16} /> {title}
      </p>
      <div className="mt-1.5 leading-relaxed">{children}</div>
    </div>
  );
}

/**
 * Polished empty state for any list/section with nothing in it yet — replaces
 * ad-hoc "No X yet" one-liners with a consistent, presentation-ready pattern.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="animate-fade-in flex flex-col items-center rounded-2xl border border-dashed border-ink-300 bg-ink-50/60 px-6 py-10 text-center">
      {icon && (
        <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink-400 shadow-card">
          {icon}
        </span>
      )}
      <p className="font-semibold text-ink-800">{title}</p>
      {description && <p className="mt-1.5 max-w-sm text-sm text-ink-500">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/** Homepage feature card — icon, title, description, optional link. */
export function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}) {
  const body = (
    <>
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 text-white shadow-sm">
        {icon}
      </span>
      <h3 className="mt-4 font-bold text-ink-900">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{description}</p>
    </>
  );
  const cls = 'card-interactive block p-6';
  return href ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/**
 * Circular progress ring — a compact alternative to a linear bar for
 * dashboard "overall progress"-style metrics.
 */
export function ProgressRing({
  value,
  max = 100,
  size = 88,
  strokeWidth = 8,
  label,
}: {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}) {
  const pct = Math.max(0, Math.min(100, max === 0 ? 0 : (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 transform">
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} className="stroke-ink-100" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="stroke-brand-500 transition-[stroke-dashoffset] duration-700 ease-premium"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-xl font-bold text-ink-900">{Math.round(pct)}%</span>
        {label && <span className="text-[10px] font-medium uppercase tracking-wide text-ink-400">{label}</span>}
      </div>
    </div>
  );
}

/**
 * Horizontal step indicator — formalises the dot-row pattern used inside the
 * case player into a reusable, accessible component (used wherever a
 * multi-step flow needs an at-a-glance progress readout).
 */
export function Stepper({
  steps,
  current,
  onStepClick,
}: {
  steps: { id: string; label: string }[];
  current: number;
  onStepClick?: (index: number) => void;
}) {
  return (
    <ol className="flex flex-wrap gap-1.5" aria-label="Progress through this journey">
      {steps.map((s, i) => {
        const state = i === current ? 'current' : i < current ? 'done' : 'upcoming';
        return (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => onStepClick?.(i)}
              title={s.label}
              aria-current={state === 'current' ? 'step' : undefined}
              className={`h-2 w-7 rounded-full transition-all duration-300 ease-premium ${
                state === 'current'
                  ? 'bg-brand-600'
                  : state === 'done'
                    ? 'bg-brand-300'
                    : 'bg-ink-200 hover:bg-ink-300'
              } ${onStepClick ? 'cursor-pointer' : 'cursor-default'}`}
            />
          </li>
        );
      })}
    </ol>
  );
}
