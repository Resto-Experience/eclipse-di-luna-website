import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionHeading } from '@/components/ui/SectionHeading';

describe('SectionHeading', () => {
  it('renders <h2> by default', () => {
    render(<SectionHeading>Our Story</SectionHeading>);
    expect(screen.getByRole('heading', { level: 2, name: /our story/i })).toBeInTheDocument();
  });

  it('renders <h1> when as="h1"', () => {
    render(<SectionHeading as="h1">Title</SectionHeading>);
    expect(screen.getByRole('heading', { level: 1, name: /title/i })).toBeInTheDocument();
  });

  it('renders <h3> when as="h3"', () => {
    render(<SectionHeading as="h3">Sub</SectionHeading>);
    expect(screen.getByRole('heading', { level: 3, name: /sub/i })).toBeInTheDocument();
  });

  it('renders eyebrow text above heading in burgundy', () => {
    render(<SectionHeading eyebrow="Our Story">Title</SectionHeading>);
    const eyebrow = screen.getByText('Our Story');
    expect(eyebrow).toBeInTheDocument();
    expect(eyebrow).toHaveClass('text-burgundy');
  });

  it('renders subheading text below heading', () => {
    render(<SectionHeading subheading="Paragraph text">Title</SectionHeading>);
    expect(screen.getByText('Paragraph text')).toBeInTheDocument();
  });

  it('renders ornament SVG above when ornamentTop={true}', () => {
    const { container } = render(<SectionHeading ornamentTop>Title</SectionHeading>);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(1);
  });

  it('renders ornament SVG below when ornamentBottom={true}', () => {
    const { container } = render(<SectionHeading ornamentBottom>Title</SectionHeading>);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(1);
  });

  it('applies center alignment class by default', () => {
    const { container } = render(<SectionHeading>Title</SectionHeading>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('text-center');
  });

  it('applies left alignment class', () => {
    const { container } = render(<SectionHeading align="left">Title</SectionHeading>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('text-left');
  });

  it('applies right alignment class', () => {
    const { container } = render(<SectionHeading align="right">Title</SectionHeading>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('text-right');
  });

  it('applies dark theme class (cream heading color)', () => {
    const { container } = render(<SectionHeading theme="dark">Title</SectionHeading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-cream');
  });

  it('applies light theme class (dark-brown heading color)', () => {
    const { container } = render(<SectionHeading theme="light">Title</SectionHeading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-dark-brown');
  });

  it('applies cream theme class (dark-brown heading color)', () => {
    render(<SectionHeading theme="cream">Title</SectionHeading>);
    expect(screen.getByRole('heading')).toHaveClass('text-dark-brown');
  });

  it('heading has font-heading class', () => {
    render(<SectionHeading>Title</SectionHeading>);
    expect(screen.getByRole('heading')).toHaveClass('font-heading');
  });

  it('merges className prop on wrapper', () => {
    const { container } = render(<SectionHeading className="mb-8">Title</SectionHeading>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('mb-8');
  });
});
