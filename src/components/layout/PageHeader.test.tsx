import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PageHeader } from './PageHeader';

// Mock next/image
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    fill,
    ...props
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    [key: string]: unknown;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-fill={fill ? 'true' : undefined} {...props} />
  ),
}));

describe('PageHeader', () => {
  it('renders the title', () => {
    render(
      <PageHeader
        title="Our Menu"
        backgroundImage="/images/hero/page-header.avif"
      />
    );
    expect(screen.getByRole('heading', { name: /Our Menu/i })).toBeInTheDocument();
  });

  it('renders the subtitle when provided', () => {
    render(
      <PageHeader
        title="Our Menu"
        subtitle="RESTAURANT & TAPAS BAR"
        backgroundImage="/images/hero/page-header.avif"
      />
    );
    expect(screen.getByText(/RESTAURANT & TAPAS BAR/i)).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(
      <PageHeader
        title="Our Menu"
        backgroundImage="/images/hero/page-header.avif"
      />
    );
    expect(screen.queryByText(/RESTAURANT & TAPAS BAR/i)).not.toBeInTheDocument();
  });

  it('renders background image with next/image (fill prop)', () => {
    render(
      <PageHeader
        title="Our Menu"
        backgroundImage="/images/hero/page-header.avif"
      />
    );
    const img = screen.getByAltText(/page header background|Our Menu background/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/hero/page-header.avif');
    expect(img).toHaveAttribute('data-fill', 'true');
  });

  it('title renders as h1 element', () => {
    render(
      <PageHeader
        title="Private Events"
        backgroundImage="/images/hero/page-header.avif"
      />
    );
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toContain('Private Events');
  });

  it('default height is md', () => {
    const { container } = render(
      <PageHeader
        title="Test"
        backgroundImage="/images/hero/page-header.avif"
      />
    );
    // Check that the root element includes a medium height class
    const section = container.firstChild as HTMLElement;
    expect(section.className).toMatch(/h-\[360px\]|h-90/);
  });

  it('height="sm" applies 240px height', () => {
    const { container } = render(
      <PageHeader
        title="Test"
        backgroundImage="/images/hero/page-header.avif"
        height="sm"
      />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toMatch(/h-\[240px\]|h-60/);
  });

  it('height="lg" applies 480px height', () => {
    const { container } = render(
      <PageHeader
        title="Test"
        backgroundImage="/images/hero/page-header.avif"
        height="lg"
      />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toMatch(/h-\[480px\]|h-120/);
  });

  it('align="center" centers content (default)', () => {
    const { container } = render(
      <PageHeader
        title="Test"
        backgroundImage="/images/hero/page-header.avif"
      />
    );
    // Find content wrapper — should contain text-center or items-center
    const section = container.firstChild as HTMLElement;
    expect(section.innerHTML).toMatch(/text-center|items-center/);
  });

  it('align="left" left-aligns content', () => {
    const { container } = render(
      <PageHeader
        title="Test"
        backgroundImage="/images/hero/page-header.avif"
        align="left"
      />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.innerHTML).toMatch(/text-left|items-start/);
  });
});
