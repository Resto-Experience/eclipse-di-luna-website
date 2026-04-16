import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from '@/components/ui/Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Featured</Badge>);
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('applies default variant classes (dark-brown bg, cream text)', () => {
    render(<Badge variant="default">Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge).toHaveClass('bg-dark-brown', 'text-cream');
  });

  it('applies burgundy variant classes', () => {
    render(<Badge variant="burgundy">Burgundy</Badge>);
    const badge = screen.getByText('Burgundy');
    expect(badge).toHaveClass('bg-burgundy', 'text-white');
  });

  it('applies gold variant classes', () => {
    render(<Badge variant="gold">Gold</Badge>);
    const badge = screen.getByText('Gold');
    expect(badge).toHaveClass('bg-gold', 'text-dark-brown');
  });

  it('applies outline variant classes', () => {
    render(<Badge variant="outline">Outline</Badge>);
    const badge = screen.getByText('Outline');
    expect(badge).toHaveClass('bg-transparent', 'border', 'border-dark-brown', 'text-dark-brown');
  });

  it('applies font-accent uppercase tracking-wider classes', () => {
    render(<Badge>Label</Badge>);
    const badge = screen.getByText('Label');
    expect(badge).toHaveClass('font-accent', 'uppercase', 'tracking-wider');
  });

  it('applies pill border-radius class', () => {
    render(<Badge>Pill</Badge>);
    const badge = screen.getByText('Pill');
    expect(badge).toHaveClass('rounded-full');
  });

  it('merges className prop', () => {
    render(<Badge className="mt-2">Extra</Badge>);
    expect(screen.getByText('Extra')).toHaveClass('mt-2');
  });
});
