'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'edl-home-popup-dismissed';
const LINK_HREF = '/location-dunwoody/#Entertainment-Dunwoody';

export function HomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') return;
    } catch (_) {}
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch (_) {}
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[995] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Latin Thursday Night — Dunwoody"
    >
      <button
        type="button"
        aria-label="Close popup background"
        onClick={close}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        tabIndex={-1}
      />
      <div className="relative w-full max-w-[600px]">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute z-10 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer shadow-md"
          style={{ top: '10px', right: '10px' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {/* Desktop bg — 600×400 landscape */}
        <Link
          href={LINK_HREF}
          onClick={close}
          aria-label="See Latin Thursday Night events at Dunwoody"
          className="hidden md:block overflow-hidden rounded-[12px] shadow-2xl"
          style={{
            aspectRatio: '600 / 400',
            backgroundImage: 'url(/images/popups/latin-thursday-desktop.avif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <span className="sr-only">Latin Thursday Night — Dunwoody</span>
        </Link>
        {/* Mobile bg — 370×480 portrait */}
        <Link
          href={LINK_HREF}
          onClick={close}
          aria-label="See Latin Thursday Night events at Dunwoody"
          className="md:hidden block overflow-hidden rounded-[12px] shadow-2xl mx-auto"
          style={{
            width: '100%',
            maxWidth: '370px',
            aspectRatio: '370 / 480',
            backgroundImage: 'url(/images/popups/latin-thursday-mobile.avif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <span className="sr-only">Latin Thursday Night — Dunwoody</span>
        </Link>
      </div>
    </div>
  );
}
