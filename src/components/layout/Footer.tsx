'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_CREDIT } from '@/data/site';

const FONT_BODY = 'var(--font-nunito-sans), "Nunito Sans", sans-serif';
const FONT_HEADING = '"Swarsh Daisy", var(--font-display), Georgia, serif';

const LOCATIONS = [
  {
    name: 'Alpharetta',
    slug: 'alpharetta',
    links: [
      { label: 'Menu', href: '/menu/menu-alpharetta' },
      { label: 'Entertainment', href: '/location-alpharetta/#Entertainment' },
      { label: 'Deals', href: '/location-alpharetta/#Deals' },
      { label: 'Order Online', href: '/location-alpharetta/#Order' },
    ],
  },
  {
    name: 'Beltline',
    slug: 'beltline',
    links: [
      { label: 'Menu', href: '/menu/menu-beltline' },
      { label: 'Entertainment', href: '/location-beltline/#Entertainment-Beltline' },
      { label: 'Deals', href: '/location-beltline/#Deals-Beltline' },
      { label: 'Order Online', href: '/location-beltline/#Order-Beltline' },
    ],
  },
  {
    name: 'Buckhead',
    slug: 'buckhead',
    links: [
      { label: 'Menu', href: '/menu/menu-buckhead' },
      { label: 'Entertainment', href: '/location-buckhead/#Entertainment-Buckhead' },
      { label: 'Deals', href: '/location-buckhead/#Deals-Buckhead' },
      { label: 'Order Online', href: '/location-buckhead/#Order-Buckhead' },
    ],
  },
  {
    name: 'Dunwoody',
    slug: 'dunwoody',
    links: [
      { label: 'Menu', href: '/menu/menu-dunwoody' },
      { label: 'Entertainment', href: '/location-dunwoody/#Entertainment-Dunwoody' },
      { label: 'Deals', href: '/location-dunwoody/#Deals-Dunwoody' },
      { label: 'Order Online', href: '/location-dunwoody/#Order-Dunwoody' },
    ],
  },
];

const MORE_LINKS = [
  { label: 'Private Party', href: '/private-party' },
  { label: 'Catering', href: '/catering' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Blog', href: '/blog' },
];

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4CE9F" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4CE9F" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <circle cx="8" cy="12" r="0.5" fill="#F4CE9F" />
      <circle cx="12" cy="12" r="0.5" fill="#F4CE9F" />
      <circle cx="16" cy="12" r="0.5" fill="#F4CE9F" />
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer style={{ backgroundColor: '#201814' }}>
      {/* Newsletter section */}
      <div className="px-9 py-12">
        <div
          className="max-w-[1280px] mx-auto rounded-2xl px-8 py-10 text-center"
          style={{
            backgroundColor: '#3D0E0B',
            backgroundImage: 'url(/images/textures/newsletter-pattern.svg)',
            backgroundSize: 'cover',
          }}
        >
          <h2
            className="leading-tight mb-2"
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 'clamp(24px, 3vw, 36px)',
              color: '#FFFFFF',
              fontWeight: 400,
            }}
          >
            Join our newsletter
          </h2>
          <p
            className="mb-6"
            style={{
              fontFamily: FONT_BODY,
              fontSize: '18px',
              color: '#F4CE9F',
            }}
          >
            Be the first to know about events, menus, and specials
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-[600px] mx-auto items-stretch"
          >
            <div className="flex-1 text-left">
              <label
                htmlFor="newsletter-email"
                className="block text-white text-sm mb-1"
                style={{ fontFamily: FONT_BODY }}
              >
                Email Address*
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full h-[46px] px-4 rounded-full bg-transparent border focus:outline-none focus:ring-2 focus:ring-[#F4CE9F]/50"
                style={{
                  borderColor: '#F4CE9F',
                  color: '#F4CE9F',
                  fontFamily: FONT_BODY,
                }}
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="h-[46px] px-8 rounded-full uppercase font-semibold text-base hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: '#F4CE9F',
                  color: '#3D0E0B',
                  fontFamily: FONT_BODY,
                  fontWeight: 600,
                }}
              >
                {submitted ? 'Subscribed!' : 'Subscribe'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer columns */}
      <div className="max-w-[1280px] mx-auto px-9 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-12">
          {/* Logo column */}
          <div className="flex flex-col items-center lg:items-start">
            <Image
              src="/images/hero/logo-beige.png"
              alt="Eclipse di Luna"
              width={200}
              height={240}
              className="w-[180px] h-auto"
            />
          </div>

          {/* Locations grid (2x2) — always 2 cols, including mobile */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8">
            {LOCATIONS.map((loc) => (
              <div key={loc.slug} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <PinIcon />
                  <h3
                    className="text-white"
                    style={{
                      fontFamily: FONT_HEADING,
                      fontSize: '22px',
                      fontWeight: 400,
                    }}
                  >
                    {loc.name}
                  </h3>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {loc.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[#F4CE9F] hover:text-white transition-colors"
                        style={{ fontFamily: FONT_BODY, fontSize: '16px' }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* More column */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MoreIcon />
              <h3
                className="text-white"
                style={{
                  fontFamily: FONT_HEADING,
                  fontSize: '22px',
                  fontWeight: 400,
                }}
              >
                More
              </h3>
            </div>
            <ul className="flex flex-col gap-1.5">
              {MORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#F4CE9F] hover:text-white transition-colors"
                    style={{ fontFamily: FONT_BODY, fontSize: '16px' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center h-[42px] px-5 rounded-full uppercase font-semibold text-sm hover:opacity-90 transition-opacity self-start mt-3"
              style={{
                backgroundColor: '#780C06',
                color: '#F4CE9F',
                border: '1px solid #F4CE9F',
                fontFamily: FONT_BODY,
                fontWeight: 600,
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Credit strip — "powered by RestoExperience" on left, marketing credit on right */}
      <div className="border-t border-white/10 py-3 px-9 bg-[#FCF8EE]">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between flex-wrap gap-2">
          <a
            href={SITE_CREDIT.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-[#1f1815]/70 hover:text-[#1f1815] transition-colors"
            style={{ fontFamily: FONT_BODY }}
          >
            <span>powered by</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#1f1815] text-[#F4CE9F]">
              <span className="w-4 h-4 rounded-full bg-[#780C06]" />
              <span className="font-semibold">Resto Experience®</span>
            </span>
          </a>
          <a
            href={SITE_CREDIT.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#1f1815]/70 hover:text-[#1f1815] transition-colors"
            style={{ fontFamily: FONT_BODY }}
          >
            {SITE_CREDIT.label} <span className="mx-2">|</span> {SITE_CREDIT.year}
          </a>
        </div>
      </div>
    </footer>
  );
}
