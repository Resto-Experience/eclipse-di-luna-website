'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, SITE_INSTAGRAM } from '@/data/site';

const FONT_BODY = 'var(--font-body), "Nunito", sans-serif';
const FONT_BUTTON = 'var(--font-button), Arial, sans-serif';

const TAB_CLASS_BASE = 'relative px-4 capitalize transition-colors duration-200';
const TAB_STYLE: React.CSSProperties = {
  fontFamily: FONT_BODY,
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '18px',
  letterSpacing: 'normal',
};

function isActive(pathname: string, href: string, subHrefs?: string[]): boolean {
  if (pathname === href) return true;
  if (href !== '/' && pathname.startsWith(href)) return true;
  if (subHrefs?.some((h) => pathname === h || pathname.startsWith(h))) return true;
  return false;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setMounted(true);
    } else {
      const raf = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(raf);
    }
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Delayed close prevents flicker when the cursor crosses the gap into the dropdown.
  const openDropdownFor = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 140);
  };

  const navClass = scrolled
    ? 'bg-[#1f1815]/95 backdrop-blur-md border-b border-white/10'
    : isHome
      ? 'bg-black/20 backdrop-blur-md border-b border-white/20'
      : 'bg-transparent backdrop-blur-md border-b border-white/20';

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${navClass}`}
        style={{
          transform: mounted ? 'translateY(0)' : 'translateY(-100%)',
          opacity: mounted ? 1 : 0,
          transitionProperty: 'transform, opacity, background-color, border-color',
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          transitionDuration: '500ms',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 lg:px-9 py-4 flex items-center justify-between relative">
          <Link href="/" aria-label="Eclipse di Luna" className="flex-shrink-0">
            <Image
              src="/images/hero/logo-white.png"
              alt="Eclipse di Luna"
              width={1836}
              height={1570}
              className="h-14 w-auto"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item) => {
              const subHrefs = item.dropdown?.map((s) => s.href);
              const active = isActive(pathname, item.href, subHrefs);
              if (item.dropdown) {
                // Real-page items (href !== '#') navigate on click; the dropdown still opens on hover.
                const hasPage = item.href !== '#';
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => openDropdownFor(item.label)}
                    onMouseLeave={scheduleClose}
                  >
                    {hasPage ? (
                      <Link
                        href={item.href}
                        className={`${TAB_CLASS_BASE} flex items-center gap-1 group py-[9px]`}
                        style={{ ...TAB_STYLE, color: active ? '#F2C873' : '#F8F8F8' }}
                      >
                        {item.label}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`}>
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                        <span
                          className={`pointer-events-none absolute inset-x-3 bottom-0 h-[2px] bg-current origin-center transition-transform duration-300 ${active || openDropdown === item.label ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                          aria-hidden
                        />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className={`${TAB_CLASS_BASE} flex items-center gap-1 group py-[9px]`}
                        style={{ ...TAB_STYLE, color: active ? '#F2C873' : '#F8F8F8' }}
                      >
                        {item.label}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`}>
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                        <span
                          className={`pointer-events-none absolute inset-x-3 bottom-0 h-[2px] bg-current origin-center transition-transform duration-300 ${active || openDropdown === item.label ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                          aria-hidden
                        />
                      </button>
                    )}

                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-full transition-all duration-200 ${openDropdown === item.label ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}`}
                      style={{ paddingTop: '16px' }}
                    >
                      <div
                        className="rounded-[8px]"
                        style={{
                          width: '282px',
                          backgroundColor: '#FCF0E1',
                          padding: '24px 20px',
                        }}
                      >
                        <ul className="flex flex-col gap-2">
                          {item.dropdown.map((sub) => {
                            const subActive = pathname === sub.href || pathname.startsWith(sub.href);
                            return (
                              <li key={sub.href}>
                                <Link
                                  href={sub.href}
                                  className="block transition-all duration-150 capitalize"
                                  style={{
                                    padding: '12px 16px',
                                    fontFamily: FONT_BUTTON,
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    lineHeight: '22px',
                                    color: '#3C1816',
                                    backgroundColor: subActive ? 'rgba(242, 200, 115, 0.25)' : 'transparent',
                                    borderRadius: subActive ? '12px' : '12px',
                                  }}
                                  onMouseEnter={(e) => {
                                    if (!subActive) {
                                      e.currentTarget.style.backgroundColor = 'rgba(181, 130, 29, 0.1)';
                                      e.currentTarget.style.borderRadius = '16px';
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    if (!subActive) {
                                      e.currentTarget.style.backgroundColor = 'transparent';
                                      e.currentTarget.style.borderRadius = '12px';
                                    }
                                  }}
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`${TAB_CLASS_BASE} group py-[9px]`}
                  style={{ ...TAB_STYLE, color: active ? '#F2C873' : '#F8F8F8' }}
                >
                  {item.label}
                  <span
                    className={`pointer-events-none absolute inset-x-3 bottom-0 h-[2px] bg-current origin-center transition-transform duration-300 ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                    aria-hidden
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            <button
              type="button"
              className="flex items-center justify-center h-[36px] lg:h-[42px] px-4 lg:px-5 rounded-full uppercase font-semibold text-sm lg:text-base cursor-pointer bg-[#810D06] hover:bg-[#030E17] text-[#F6D8B2] hover:text-[#F2C873] border border-[#F6D8B2] hover:border-[#F2C873] transition-colors duration-200"
              style={{
                fontFamily: FONT_BUTTON,
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
              className="hidden lg:flex items-center justify-center w-[42px] h-[42px] bg-[#524E4D] hover:bg-[#711A10] transition-colors duration-200"
              style={{ borderRadius: '20px' }}
            >
              <Image src="/images/icons/instagram.svg" alt="" width={22} height={22} />
            </a>

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
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] flex flex-col" style={{ backgroundColor: '#372822' }}>
          <div className="flex items-center justify-between px-4 py-4">
            <Image src="/images/hero/logo-white.png" alt="Eclipse di Luna" width={1836} height={1570} className="h-14 w-auto" />
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
          <div className="flex-1 flex flex-col items-center justify-start pt-8 gap-7 px-4">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              style={{ fontFamily: FONT_BUTTON, fontSize: '18px', fontWeight: 600, color: pathname === '/' ? '#F2C873' : '#F8F8F8' }}
            >
              Home
            </Link>
            {NAV_ITEMS.map((item) => {
              const subHrefs = item.dropdown?.map((s) => s.href);
              const active = isActive(pathname, item.href, subHrefs);
              if (item.dropdown) {
                const open = openDropdown === `mobile-${item.label}`;
                return (
                  <div key={item.label} className="flex flex-col items-center gap-5 w-full">
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(open ? null : `mobile-${item.label}`)}
                      className="flex items-center gap-2"
                      style={{ fontFamily: FONT_BUTTON, fontSize: '18px', fontWeight: 600, color: active ? '#F2C873' : '#F8F8F8' }}
                    >
                      {item.label}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    {open && (
                      <div className="flex flex-col items-stretch gap-3 w-full max-w-[280px] rounded-[8px]" style={{ backgroundColor: '#FCF0E1', padding: '20px 16px' }}>
                        {item.dropdown.map((sub) => {
                          const subActive = pathname === sub.href || pathname.startsWith(sub.href);
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="block text-center transition-colors capitalize"
                              style={{
                                padding: '12px 16px',
                                fontFamily: FONT_BUTTON,
                                fontSize: '16px',
                                fontWeight: 600,
                                lineHeight: '22px',
                                color: '#3C1816',
                                borderRadius: '12px',
                                backgroundColor: subActive ? 'rgba(242, 200, 115, 0.25)' : 'transparent',
                              }}
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ fontFamily: FONT_BUTTON, fontSize: '18px', fontWeight: 600, color: active ? '#F2C873' : '#F8F8F8' }}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/contact-us"
              onClick={() => setMobileOpen(false)}
              className="mt-4 flex items-center justify-center w-full max-w-[320px] capitalize transition-colors duration-200"
              style={{
                padding: '10px 14px',
                backgroundColor: '#810D06',
                border: '1px solid #F6D8B2',
                borderRadius: '500px',
                fontFamily: FONT_BODY,
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: '24px',
                color: '#F4CE9F',
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
