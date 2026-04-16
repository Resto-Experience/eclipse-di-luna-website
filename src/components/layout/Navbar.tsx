'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NAV_ITEMS, SITE_INSTAGRAM } from '@/data/site';

const FONT_BODY = 'var(--font-nunito-sans), "Nunito Sans", sans-serif';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1f1815]/95 backdrop-blur-md border-b border-white/10'
          : 'bg-black/20 backdrop-blur-md border-b border-white/20'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-9 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Eclipse di Luna" className="flex-shrink-0">
          <Image
            src="/images/hero/logo-white.png"
            alt="Eclipse di Luna"
            width={50}
            height={50}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav items — hidden on mobile */}
        <div className="hidden lg:flex items-center">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
              onMouseLeave={() => item.dropdown && setOpenDropdown(null)}
            >
              {item.dropdown ? (
                <button
                  type="button"
                  className="flex items-center gap-1 px-4 py-3 text-white/90 hover:text-white text-base capitalize transition-colors"
                  style={{ fontFamily: FONT_BODY }}
                >
                  {item.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="px-4 py-3 text-white/90 hover:text-white text-base capitalize transition-colors block"
                  style={{ fontFamily: FONT_BODY }}
                >
                  {item.label}
                </Link>
              )}

              {/* Dropdown */}
              {item.dropdown && openDropdown === item.label && (
                <div className="absolute top-full left-0 min-w-[200px] bg-[#1f1815] border border-white/10 rounded-md shadow-xl py-2">
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-5 py-2.5 text-white/80 hover:text-[#f4ce9f] hover:bg-white/5 text-base capitalize transition-colors"
                      style={{ fontFamily: FONT_BODY }}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side: Reservations (always visible) + Instagram (desktop) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center justify-center h-[36px] lg:h-[42px] px-4 lg:px-5 rounded-full uppercase font-semibold text-sm lg:text-base cursor-pointer hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: '#810D06',
              color: '#F6D8B2',
              border: '1px solid #F6D8B2',
              fontFamily: FONT_BODY,
              fontWeight: 600,
            }}
          >
            Reservations
          </button>

          <a
            href={SITE_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hidden lg:flex items-center justify-center w-[42px] h-[42px] rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Image src="/images/icons/instagram.svg" alt="" width={22} height={22} />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          className="lg:hidden text-white p-2 cursor-pointer"
          onClick={() => setMobileOpen(true)}
        >
          <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
            <path d="M0 1H24M0 9H24M0 17H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#1f1815] flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <Image src="/images/hero/logo-white.png" alt="Eclipse di Luna" width={50} height={50} className="h-12 w-auto" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="text-white p-2"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col flex-1 px-6 py-6 gap-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.dropdown ? (
                  <>
                    <div
                      className="text-white/60 uppercase text-sm py-3 tracking-wider"
                      style={{ fontFamily: FONT_BODY }}
                    >
                      {item.label}
                    </div>
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-3 pl-4 text-white text-lg capitalize"
                        style={{ fontFamily: FONT_BODY }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-4 text-white text-lg capitalize border-b border-white/10"
                    style={{ fontFamily: FONT_BODY }}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <button
              type="button"
              className="mt-6 flex items-center justify-center gap-2 h-[48px] rounded-full uppercase font-semibold"
              style={{
                backgroundColor: '#810D06',
                color: '#F6D8B2',
                border: '1px solid #F6D8B2',
                fontFamily: FONT_BODY,
                fontWeight: 600,
              }}
            >
              <Image
                src="/images/icons/circle-dot-filled.svg"
                alt=""
                width={20}
                height={20}
              />
              Reservations
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
