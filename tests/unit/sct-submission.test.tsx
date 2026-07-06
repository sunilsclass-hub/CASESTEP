import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SCTPlayer } from '@/components/SCTPlayer';
import { sctModules } from '@/data/sct';

/**
 * Answers every item in an SCT module and submits, asserting that a score and
 * per-item expert-panel feedback are produced.
 */
describe('Script Concordance Test — submission', () => {
  it('scores the module after every item is answered', async () => {
    const user = userEvent.setup();
    const module = sctModules[0];
    const { container } = render(<SCTPlayer module={module} />);

    // Each item renders a fieldset with the five-point (−2…+2) scale.
    const fieldsets = container.querySelectorAll('fieldset');
    expect(fieldsets.length).toBe(module.items.length);

    // Choose the middle option (0 = "no effect") for each item.
    for (const fs of Array.from(fieldsets)) {
      const buttons = fs.querySelectorAll('button');
      await user.click(buttons[2] as HTMLButtonElement);
    }

    const submit = screen.getByRole('button', { name: /Submit .* score/i });
    expect(submit).toBeEnabled();
    await user.click(submit);

    // Score summary and expert-panel feedback appear.
    expect(await screen.findByText(/Your SCT score/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Expert panel answer/i).length).toBe(module.items.length);
  });
});
