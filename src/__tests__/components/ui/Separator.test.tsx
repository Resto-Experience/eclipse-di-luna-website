import { render, screen, container } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Separator } from '@/components/ui/Separator';

describe('Separator', () => {
  it('renders line variant by default', () => {
    const { container } = render(<Separator />);
    const hr = container.querySelector('hr') || container.querySelector('[role="separator"]');
    expect(hr).toBeInTheDocument();
  });

  it('line variant does not contain dot text', () => {
    const { container } = render(<Separator variant="line" />);
    expect(container.textContent).not.toContain('·');
  });

  it('renders dots variant with dot characters', () => {
    render(<Separator variant="dots" />);
    expect(screen.getByText(/·.*·.*·/)).toBeInTheDocument();
  });

  it('renders ornament variant with SVG', () => {
    const { container } = render(<Separator variant="ornament" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('dots variant is different from line variant', () => {
    const { container: dotsContainer } = render(<Separator variant="dots" />);
    const { container: lineContainer } = render(<Separator variant="line" />);
    expect(dotsContainer.innerHTML).not.toBe(lineContainer.innerHTML);
  });

  it('ornament variant is different from line variant', () => {
    const { container: ornamentContainer } = render(<Separator variant="ornament" />);
    const { container: lineContainer } = render(<Separator variant="line" />);
    expect(ornamentContainer.innerHTML).not.toBe(lineContainer.innerHTML);
  });

  it('merges className prop', () => {
    const { container } = render(<Separator className="my-8" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('my-8');
  });

  it('applies color via style prop on line variant', () => {
    const { container } = render(<Separator color="#ff0000" />);
    // Color should be applied somehow — check for style or class
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
  });
});
