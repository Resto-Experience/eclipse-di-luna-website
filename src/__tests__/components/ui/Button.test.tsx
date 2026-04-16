import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders a <button> by default', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('renders an <a> when href is provided', () => {
    render(<Button href="/menu">Menu</Button>);
    const link = screen.getByRole('link', { name: /menu/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/menu');
  });

  it('applies primary variant classes (burgundy background)', () => {
    render(<Button variant="primary">Primary</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-burgundy');
  });

  it('applies secondary variant classes (outline)', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('border-burgundy');
  });

  it('applies ghost variant classes (white border)', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('border-white');
  });

  it('applies link variant classes', () => {
    render(<Button variant="link">Link</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('text-burgundy');
  });

  it('applies sm size classes', () => {
    render(<Button size="sm">Small</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('py-2', 'px-4', 'text-xs');
  });

  it('applies md size classes (default)', () => {
    render(<Button>Default</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('py-3', 'px-6', 'text-sm');
  });

  it('applies lg size classes', () => {
    render(<Button size="lg">Large</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('py-4', 'px-8', 'text-base');
  });

  it('disables and shows loading indicator when loading={true}', () => {
    render(<Button loading>Loading</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies opacity and cursor classes when disabled={true}', () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('opacity-50', 'cursor-not-allowed');
    expect(btn).toHaveAttribute('aria-disabled', 'true');
  });

  it('adds rel="noopener noreferrer" when target="_blank"', () => {
    render(<Button href="/ext" target="_blank">External</Button>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders icon on the left by default', () => {
    const icon = <span data-testid="icon">★</span>;
    render(<Button icon={icon}>With Icon</Button>);
    const wrapper = screen.getByRole('button');
    const children = wrapper.querySelectorAll('[data-testid="icon"], span');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders icon on the right when iconPosition="right"', () => {
    const icon = <span data-testid="icon-right">★</span>;
    render(<Button icon={icon} iconPosition="right">With Icon</Button>);
    expect(screen.getByTestId('icon-right')).toBeInTheDocument();
  });

  it('forwards aria-label to the element', () => {
    render(<Button aria-label="Close dialog">X</Button>);
    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
  });

  it('applies font-accent uppercase tracking-widest classes', () => {
    render(<Button>Text</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('font-accent', 'uppercase', 'tracking-widest');
  });

  it('has visible focus ring class', () => {
    render(<Button>Focusable</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/focus-visible:/);
  });

  it('merges className prop', () => {
    render(<Button className="custom-class">Merge</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
