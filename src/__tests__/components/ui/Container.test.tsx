import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Container } from '@/components/ui/Container';

describe('Container', () => {
  it('renders a <div> by default', () => {
    render(<Container>Content</Container>);
    const el = screen.getByText('Content').closest('div');
    expect(el).toBeInTheDocument();
  });

  it('renders <section> when as="section"', () => {
    render(<Container as="section">Content</Container>);
    expect(screen.getByText('Content').closest('section')).toBeInTheDocument();
  });

  it('applies xl size classes by default', () => {
    render(<Container>Content</Container>);
    const el = screen.getByText('Content').closest('div');
    expect(el).toHaveClass('max-w-7xl', 'mx-auto', 'px-4');
  });

  it('applies sm size classes', () => {
    render(<Container size="sm">Content</Container>);
    const el = screen.getByText('Content').closest('div');
    expect(el).toHaveClass('max-w-sm', 'mx-auto', 'px-4');
  });

  it('applies md size classes', () => {
    render(<Container size="md">Content</Container>);
    const el = screen.getByText('Content').closest('div');
    expect(el).toHaveClass('max-w-3xl', 'mx-auto', 'px-4');
  });

  it('applies lg size classes', () => {
    render(<Container size="lg">Content</Container>);
    const el = screen.getByText('Content').closest('div');
    expect(el).toHaveClass('max-w-5xl', 'mx-auto', 'px-4');
  });

  it('applies full size classes', () => {
    render(<Container size="full">Content</Container>);
    const el = screen.getByText('Content').closest('div');
    expect(el).toHaveClass('w-full', 'mx-auto', 'px-4');
  });

  it('merges className prop', () => {
    render(<Container className="custom-class">Content</Container>);
    const el = screen.getByText('Content').closest('div');
    expect(el).toHaveClass('custom-class');
  });

  it('renders children', () => {
    render(<Container><span>Child</span></Container>);
    expect(screen.getByText('Child')).toBeInTheDocument();
  });
});
