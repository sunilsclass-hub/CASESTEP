import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from '@/app/page';
import CasesPage from '@/app/cases/page';
import { OSCEStationCard } from '@/components/OSCEStationCard';
import { ExpertReview } from '@/components/ExpertReview';
import { StudentDashboard } from '@/components/StudentDashboard';
import { osceStations } from '@/data/osce';
import { reviewDimensions } from '@/lib/reviews';

describe('homepage rendering', () => {
  it('renders the hero and call-to-action', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Clinical Reasoning/i);
    // "Start Learning" CTA is present.
    expect(screen.getAllByRole('link', { name: /Start Learning/i }).length).toBeGreaterThan(0);
  });
});

describe('case catalogue rendering', () => {
  it('renders a Start-case action for all 11 ready cases', () => {
    render(<CasesPage />);
    expect(screen.getAllByRole('link', { name: /Start case/i })).toHaveLength(11);
  });
});

describe('OSCE station rendering', () => {
  it('renders the station title and examiner checklist', () => {
    const station = osceStations[0];
    render(<OSCEStationCard station={station} />);
    expect(screen.getByRole('heading', { name: station.title })).toBeInTheDocument();
    expect(screen.getByText(/Examiner checklist/i)).toBeInTheDocument();
    // Each checklist item is rendered.
    for (const item of station.checklist) {
      expect(screen.getByText(item.text)).toBeInTheDocument();
    }
  });
});

describe('Expert Review form rendering', () => {
  it('renders the review form and all seven Delphi rating dimensions', async () => {
    render(<ExpertReview />);
    expect(await screen.findByText(/Case under review/i)).toBeInTheDocument();
    expect(screen.getByText(/Consensus summary/i)).toBeInTheDocument();
    for (const dim of reviewDimensions) {
      expect(screen.getAllByText(new RegExp(`^${dim.label}$`)).length).toBeGreaterThan(0);
    }
    // The suggestions textarea (the core of the review form) is present.
    expect(screen.getByPlaceholderText(/actionable feedback/i)).toBeInTheDocument();
  });

  it('submits a local demo review and computes consensus without a backend', async () => {
    const user = userEvent.setup();
    render(<ExpertReview />);
    await screen.findByText(/Case under review/i);

    // Rate all seven dimensions at 5 stars (last button in each 5-button group).
    // Each label also appears once more in the consensus panel below the form,
    // so the rating-form occurrence is always the first match.
    for (const dim of reviewDimensions) {
      const [label] = screen.getAllByText(dim.label);
      const group = label.closest('div')!.parentElement!;
      const stars = group.querySelectorAll('button');
      await user.click(stars[stars.length - 1]);
    }

    await user.click(screen.getByRole('button', { name: /^Submit review$/i }));

    expect(await screen.findByText(/Recorded as/i)).toBeInTheDocument();
    // Consensus panel now shows every dimension populated (median "5", 100% agreement).
    expect(screen.getAllByText('5').length).toBe(reviewDimensions.length);
    expect(screen.getAllByText(/100% agree/i).length).toBe(reviewDimensions.length);
  });
});

describe('student dashboard loading', () => {
  it('renders meaningful content synchronously on first render — never an indefinite loading state', () => {
    // Regression test for the production bug where the dashboard could be
    // stuck on "Loading your progress…" forever: useStore() must resolve its
    // initial value synchronously (no effect-only population), so the first
    // render already contains real content, before any `await`/microtask.
    const { container } = render(<StudentDashboard />);
    expect(container.textContent).not.toMatch(/Loading your progress/i);
    expect(container.textContent).toMatch(/Cases completed/i);
  });

  it('renders the progress view after mount', async () => {
    render(<StudentDashboard />);
    expect(await screen.findByText(/Case progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Cases completed/i)).toBeInTheDocument();
  });

  it('shows a "get started" prompt on an empty device and populates the dashboard after loading demo progress', async () => {
    const user = userEvent.setup();
    render(<StudentDashboard />);
    expect(await screen.findByText(/No activity yet on this device/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Load illustrative demo progress/i }));

    expect(await screen.findByText(/Recently completed case/i)).toBeInTheDocument();
    expect(screen.getByText(/Next recommended case/i)).toBeInTheDocument();
    expect(screen.queryByText(/No activity yet on this device/i)).not.toBeInTheDocument();
  });
});
