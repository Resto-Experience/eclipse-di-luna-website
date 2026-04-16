import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Footer } from './Footer';

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

describe('Footer', () => {
  it('renders with role="contentinfo"', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders logo image with alt text', () => {
    render(<Footer />);
    const logo = screen.getByAltText(/Eclipse di Luna/i);
    expect(logo).toBeInTheDocument();
  });

  it('renders all 4 location column headings', () => {
    render(<Footer />);
    expect(screen.getByText(/Alpharetta/i)).toBeInTheDocument();
    expect(screen.getByText(/Beltline/i)).toBeInTheDocument();
    expect(screen.getByText(/Buckhead/i)).toBeInTheDocument();
    expect(screen.getByText(/Dunwoody/i)).toBeInTheDocument();
  });

  it('Alpharetta Menu link points to /menu/menu-alpharetta', () => {
    render(<Footer />);
    const menuLinks = screen.getAllByRole('link', { name: /Menu/i });
    const alphaMenu = menuLinks.find((l) =>
      l.getAttribute('href') === '/menu/menu-alpharetta'
    );
    expect(alphaMenu).toBeDefined();
  });

  it('Alpharetta Entertainment link points to /location-alpharetta/#Entertainment', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /Entertainment.*Alpharetta|Alpharetta.*Entertainment/i });
    expect(link).toHaveAttribute('href', '/location-alpharetta/#Entertainment');
  });

  it('Alpharetta Deals link points to /location-alpharetta/#Deals', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /Deals.*Alpharetta|Alpharetta.*Deals/i });
    expect(link).toHaveAttribute('href', '/location-alpharetta/#Deals');
  });

  it('Buckhead Menu link points to /menu/menu-buckhead', () => {
    render(<Footer />);
    const menuLinks = screen.getAllByRole('link', { name: /Menu/i });
    const buckheadMenu = menuLinks.find((l) =>
      l.getAttribute('href') === '/menu/menu-buckhead'
    );
    expect(buckheadMenu).toBeDefined();
  });

  it('Beltline Order Online link points to /location-beltline/#Order-Beltline', () => {
    render(<Footer />);
    const orderLinks = screen.getAllByRole('link', { name: /Order Online/i });
    const beltlineOrder = orderLinks.find((l) =>
      l.getAttribute('href') === '/location-beltline/#Order-Beltline'
    );
    expect(beltlineOrder).toBeDefined();
  });

  it('Dunwoody Menu link points to /menu/menu-dunwoody', () => {
    render(<Footer />);
    const menuLinks = screen.getAllByRole('link', { name: /Menu/i });
    const dunwoodyMenu = menuLinks.find((l) =>
      l.getAttribute('href') === '/menu/menu-dunwoody'
    );
    expect(dunwoodyMenu).toBeDefined();
  });

  it('renders "More" column with Private Party link', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /Private Party/i });
    expect(link).toHaveAttribute('href', '/private-party');
  });

  it('renders "More" column with Catering link', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /Catering/i });
    expect(link).toHaveAttribute('href', '/catering');
  });

  it('renders "More" column with Jobs link', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /Jobs/i });
    expect(link).toHaveAttribute('href', '/jobs');
  });

  it('renders "More" column with Blog link', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /Blog/i });
    expect(link).toHaveAttribute('href', '/blog');
  });

  it('renders "More" column with Contact Us link', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /Contact Us/i });
    expect(link).toHaveAttribute('href', '/contact-us');
  });

  it('renders credit strip with year 2026', () => {
    render(<Footer />);
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  it('renders credit strip linking to restoexp.com', () => {
    render(<Footer />);
    const creditLink = screen.getByRole('link', { name: /restoexp|Restaurant Marketing/i });
    expect(creditLink).toHaveAttribute('href', 'https://restoexp.com/');
  });

  it('credit link opens in new tab with rel noopener', () => {
    render(<Footer />);
    const creditLink = screen.getByRole('link', { name: /restoexp|Restaurant Marketing/i });
    expect(creditLink).toHaveAttribute('target', '_blank');
    expect(creditLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
