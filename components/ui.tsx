import Link from 'next/link';
import type { Difficulty } from '@/lib/types';

/** Page header band used at the top of section pages. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-ink-200 bg-gradient-to-b from-brand-50/60 to-white">
      <div className="container-page py-10 sm:py-14">
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-700">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink-600">{description}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </header>
  );
}

export function Section({
  title,
  description,
  children,
  className = '',
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`container-page py-10 ${className}`}>
      {title && <h2 className="text-2xl font-bold">{title}</h2>}
      {description && <p className="mt-2 max-w-3xl text-ink-600">{description}</p>}
      <div className={title ? 'mt-6' : ''}>{children}</div>
    </section>
  );
}

const diffStyles: Record<Difficulty, string> = {
  Foundation: 'bg-brand-100 text-brand-800',
  Intermediate: 'bg-accent-400/20 text-accent-600',
  Advanced: 'bg-rose-100 text-rose-700',
};

export function DifficultyBadge({ level }: { level: Difficulty }) {
  return <span className={`badge ${diffStyles[level]}`}>{level}</span>;
}

export function Badge({
  children,
  tone = 'default',
}: {
  children: React.ReactNode;
  tone?: 'default' | 'brand' | 'muted';
}) {
  const tones = {
    default: 'bg-ink-100 text-ink-700',
    brand: 'bg-brand-100 text-brand-800',
    muted: 'bg-ink-50 text-ink-500 border border-ink-200',
  };
  return <span className={`badge ${tones[tone]}`}>{children}</span>;
}

export function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-ink-500">{label}</p>
        {icon && <span className="text-brand-500">{icon}</span>}
      </div>
      <p className="mt-2 text-3xl font-bold text-ink-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink-500">{hint}</p>}
    </div>
  );
}

/** Simple horizontal progress bar. */
export function ProgressBar({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.max(0, Math.min(100, max === 0 ? 0 : (value / max) * 100));
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-ink-100" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${pct}%` }} />
    </div>
  );
}

/** Placeholder that visually communicates "not yet built / demo data". */
export function PlaceholderNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-ink-300 bg-ink-50 p-4 text-sm text-ink-500">
      {children}
    </div>
  );
}

export function CTALink({
  href,
  variant = 'primary',
  children,
}: {
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}) {
  const cls =
    variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : 'btn-ghost';
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
