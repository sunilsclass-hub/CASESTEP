import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import CasesPage from '@/app/cases/page';
import { OSCEStationCard } from '@/components/OSCEStationCard';
import { ExpertReview } from '@/components/ExpertReview';
import { StudentDashboard } from '@/components/StudentDashboard';
import { osceStations } from '@/data/osce';

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
  it('renders the review form and consensus panel', async () => {
    render(<ExpertReview />);
    expect(await screen.findByText(/Case under review/i)).toBeInTheDocument();
    expect(screen.getByText(/Consensus summary/i)).toBeInTheDocument();
    // The three Delphi rating dimensions are present (also echoed in the
    // consensus panel, so there may be more than one match each).
    expect(screen.getAllByText(/^Relevance$/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Content validity/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/^Feasibility$/).length).toBeGreaterThan(0);
    // The suggestions textarea (the core of the review form) is present.
    expect(screen.getByPlaceholderText(/actionable feedback/i)).toBeInTheDocument();
  });
});

describe('student dashboard loading', () => {
  it('renders the progress view after mount', async () => {
    render(<StudentDashboard />);
    expect(await screen.findByText(/Case progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Cases completed/i)).toBeInTheDocument();
  });
});
