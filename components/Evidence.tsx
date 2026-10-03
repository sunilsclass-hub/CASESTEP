import type { EvidenceStatus } from '@/data/evidence';

const statusStyles: Record<EvidenceStatus, string> = {
  Published: 'bg-emerald-100 text-emerald-800',
  Completed: 'bg-brand-100 text-brand-800',
  Approved: 'bg-indigo-100 text-indigo-800',
  Live: 'bg-sky-100 text-sky-800',
  Planned: 'bg-ink-50 text-ink-500 border border-ink-200',
};

/** Small pill that states the evidence status of a study or figure. */
export function StatusBadge({ status }: { status: EvidenceStatus }) {
  return <span className={`badge ${statusStyles[status]}`}>{status}</span>;
}
