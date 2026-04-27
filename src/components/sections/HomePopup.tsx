'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const LINK_HREF = '/location-dunwoody/#Entertainment-Dunwoody';

export function HomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
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

  const close = () => setOpen(false);

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
      <div className="relative w-full max-w-[600px] md:max-w-[600px] max-w-[370px]">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute z-10 w-7 h-7 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          style={{
            top: '10px',
            right: '10px',
            backgroundColor: '#F4CE9F',
            borderRadius: '8px',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M13 1L1 13M1 1L13 13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {/* Full page nav via plain <a> guarantees the hash lands in window.location
            before LocationPage's mount useEffect reads it (Next/Link does client-side
            routing which can race with the tab-hash resolver). */}
        <a
          href={LINK_HREF}
          aria-label="See Latin Thursday Night events at Dunwoody"
          className="block overflow-hidden rounded-[12px] shadow-2xl"
        >
          <span className="sr-only">Latin Thursday Night — Dunwoody</span>
          <Image
            src="/images/popups/latin-thursday-desktop.avif"
            alt="Latin Thursday Night — Every week DJ 10pm-2am, live music from 7pm, delicious tapas and special drinks at Dunwoody"
            width={600}
            height={400}
            priority
            sizes="(max-width: 767px) 0px, 600px"
            className="hidden md:block w-full h-auto"
          />
          <Image
            src="/images/popups/latin-thursday-mobile.avif"
            alt="Latin Thursday Night — Every week DJ 10pm-2am, live music from 7pm, delicious tapas and special drinks at Dunwoody"
            width={740}
            height={960}
            priority
            sizes="(max-width: 767px) 370px, 0px"
            className="md:hidden w-full h-auto"
          />
        </a>
      </div>
    </div>
  );
}
