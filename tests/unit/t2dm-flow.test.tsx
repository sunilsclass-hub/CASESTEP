import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CasePlayer } from '@/components/CasePlayer';
import { getCase } from '@/data/cases';

/**
 * Walks the full Type 2 Diabetes case from step 1 to completion, choosing the
 * clinically-preferred option at each branching decision and asserting that
 * formative feedback and the completion state appear.
 */
describe('Type 2 Diabetes — full case flow', () => {
  it('completes the case by making correct decisions', async () => {
    const user = userEvent.setup();
    const c = getCase('type-2-diabetes-mellitus')!;
    render(<CasePlayer case={c} />);

    // Player hydrates from storage before showing step 1.
    await screen.findByText(/Step 1 of/i);

    // The two decisions in this case and their clinically-preferred options.
    const correctChoices = [/Random blood glucose now/i, /Metformin, titrated with meals/i];
    let sawGoodChoice = false;

    for (let guard = 0; guard < 40; guard++) {
      const finish = screen.queryByRole('button', { name: /Finish case/i });
      if (finish) {
        await user.click(finish);
        break;
      }

      // If a decision is on screen, pick the correct option (enables Next).
      for (const choice of correctChoices) {
        const opt = screen.queryByRole('button', { name: choice });
        if (opt) {
          await user.click(opt);
          if (screen.queryByText(/Good choice/i)) sawGoodChoice = true;
        }
      }

      const next = screen.getByRole('button', { name: /^Next$/i });
      await user.click(next);
    }

    expect(sawGoodChoice).toBe(true);
    expect(await screen.findByText(/Case completed/i)).toBeInTheDocument();
  });
});
