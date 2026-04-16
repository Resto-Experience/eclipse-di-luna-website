import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ModalProvider } from '@/components/providers/ModalProvider';
import { Navbar } from './Navbar';

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

function renderNavbar() {
  return render(
    <ModalProvider>
      <Navbar />
    </ModalProvider>
  );
}

describe('Navbar', () => {
  beforeEach(() => {
    // Reset scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('renders a nav element', () => {
    renderNavbar();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('has fixed positioning class', () => {
    renderNavbar();
    const nav = screen.getByRole('navigation');
    expect(nav.className).toMatch(/fixed/);
  });

  it('renders logo linked to "/"', () => {
    renderNavbar();
    const logoLink = screen.getByRole('link', { name: /Eclipse di Luna/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('desktop: renders all 5 NAV_ITEMS', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: /^Menu$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Locations/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Private Events/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Catering/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Blog$/i })).toBeInTheDocument();
  });

  it('renders "Reserve A Table" CTA button', () => {
    renderNavbar();
    expect(screen.getAllByText(/Reserve A Table/i).length).toBeGreaterThan(0);
  });

  it('renders hamburger button with aria-label "Open navigation menu"', () => {
    renderNavbar();
    const hamburger = screen.getByRole('button', {
      name: /Open navigation menu/i,
    });
    expect(hamburger).toBeInTheDocument();
  });

  it('hamburger button has aria-expanded="false" initially', () => {
    renderNavbar();
    const hamburger = screen.getByRole('button', {
      name: /Open navigation menu/i,
    });
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('mobile menu is not visible initially', () => {
    renderNavbar();
    expect(
      screen.queryByRole('navigation', { name: /Mobile navigation/i })
    ).not.toBeInTheDocument();
  });

  it('clicking hamburger opens the mobile menu', () => {
    renderNavbar();
    const hamburger = screen.getByRole('button', {
      name: /Open navigation menu/i,
    });
    fireEvent.click(hamburger);
    expect(
      screen.getByRole('navigation', { name: /Mobile navigation/i })
    ).toBeInTheDocument();
  });

  it('hamburger aria-expanded becomes "true" when menu opens', () => {
    renderNavbar();
    const hamburger = screen.getByRole('button', {
      name: /Open navigation menu/i,
    });
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
  });

  it('close button exists in mobile menu with correct aria-label', () => {
    renderNavbar();
    fireEvent.click(screen.getByRole('button', { name: /Open navigation menu/i }));
    expect(
      screen.getByRole('button', { name: /Close navigation menu/i })
    ).toBeInTheDocument();
  });

  it('clicking close button closes the mobile menu', () => {
    renderNavbar();
    fireEvent.click(screen.getByRole('button', { name: /Open navigation menu/i }));
    expect(
      screen.getByRole('navigation', { name: /Mobile navigation/i })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Close navigation menu/i }));
    expect(
      screen.queryByRole('navigation', { name: /Mobile navigation/i })
    ).not.toBeInTheDocument();
  });

  it('pressing Escape closes the mobile menu', () => {
    renderNavbar();
    fireEvent.click(screen.getByRole('button', { name: /Open navigation menu/i }));
    expect(
      screen.getByRole('navigation', { name: /Mobile navigation/i })
    ).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(
      screen.queryByRole('navigation', { name: /Mobile navigation/i })
    ).not.toBeInTheDocument();
  });

  it('transparent background when scrollY = 0', () => {
    renderNavbar();
    const nav = screen.getByRole('navigation');
    // Should not have solid background when at top
    expect(nav.className).not.toMatch(/bg-dark-brown/);
  });

  it('solid background when scrollY > 50', async () => {
    renderNavbar();

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 60, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    const nav = screen.getByRole('navigation');
    expect(nav.className).toMatch(/bg-dark-brown/);
  });
});
