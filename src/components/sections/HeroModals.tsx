'use client';

import { useEffect, useRef, type ReactNode } from 'react';

const ORDER_LINKS: Array<{ name: string; href: string }> = [
  { name: 'Alpharetta', href: 'https://order.toasttab.com/online/eclipsehalcyon' },
  { name: 'Beltline', href: 'https://www.toasttab.com/local/order/eclipse-di-luna-beltline' },
  { name: 'Buckhead', href: 'https://order.toasttab.com/online/eclipse-di-luna-buckhead-764-miami-circle' },
  { name: 'Dunwoody', href: 'https://order.toasttab.com/online/eclipse-di-luna-dunwoody-4505-ashford-dunwoody-road' },
];

const GIFTCARD_LINKS: Array<{ name: string; href: string }> = [
  { name: 'Alpharetta', href: 'https://order.toasttab.com/egiftcards/eclipsehalcyon' },
  { name: 'Beltline', href: 'https://order.toasttab.com/egiftcards/eclipse-di-luna-beltline' },
  { name: 'Buckhead', href: 'https://order.toasttab.com/egiftcards/eclipse-di-luna-buckhead-764-miami-circle' },
  { name: 'Dunwoody', href: 'https://order.toasttab.com/egiftcards/eclipse-di-luna-dunwoody-4505-ashford-dunwoody-road' },
];

// Multi-restaurant OpenTable loader: all 4 rids joined in query string per live.
const OPENTABLE_SRC =
  'https://www.opentable.com/widget/reservation/loader?rid=1442356&rid=6454&rid=1215004&rid=2801&type=multi&theme=standard&color=1&dark=false&iframe=false&domain=com&lang=en-US&newtab=false&ot_source=Google&cfe=true';

const FONT_HEADING = '"Swarsh Daisy", var(--font-display), Georgia, serif';
const FONT_BODY = 'var(--font-body), "Nunito", sans-serif';

type ModalShellProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: ReactNode;
  maxWidth?: string;
  textAlign?: 'center' | 'left';
};

function ModalShell({ open, onClose, title, description, children, maxWidth = '940px', textAlign = 'left' }: ModalShellProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[995] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        aria-label="Close background"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        tabIndex={-1}
      />
      <div
        className="relative w-full bg-white rounded-[12px] shadow-2xl overflow-hidden"
        style={{ maxWidth, maxHeight: '90vh' }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute z-10 w-7 h-7 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          style={{ top: '14px', right: '14px', backgroundColor: '#F4CE9F', borderRadius: '8px' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M13 1L1 13M1 1L13 13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div
          className="overflow-y-auto"
          style={{ padding: 'clamp(24px, 4vw, 40px)', maxHeight: '90vh' }}
        >
          <div style={{ marginBottom: '24px', textAlign }}>
            <h2
              style={{
                fontFamily: FONT_HEADING,
                fontSize: 'clamp(22px, 3vw, 42px)',
                lineHeight: 1,
                fontWeight: 400,
                color: '#3C1816',
                margin: '0 0 10px',
                paddingBottom: '10px',
                borderBottom: '1px solid #000',
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(16px, 1.3vw, 18px)',
                lineHeight: 'clamp(16px, 1.4vw, 20px)',
                fontWeight: 400,
                color: '#333333',
                margin: 0,
                paddingTop: '10px',
              }}
            >
              {description}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function LocationGrid({ links, cta }: { links: typeof ORDER_LINKS; cta: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '20px', marginTop: '20px' }}>
      {links.map((loc) => (
        <div
          key={loc.name}
          style={{
            backgroundColor: '#FCF0E1',
            borderRadius: '8px',
            padding: '24px',
          }}
        >
          <h3
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 'clamp(28px, 2.7vw, 36px)',
              lineHeight: 1,
              fontWeight: 400,
              color: '#903934',
              margin: '0 0 12px',
            }}
          >
            {loc.name}
          </h3>
          <a
            href={loc.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center transition-colors duration-200"
            style={{
              width: '100%',
              height: '52px',
              backgroundColor: '#780C06',
              color: '#F4CE9F',
              border: '1px solid #F4CE9F',
              borderRadius: '500px',
              fontFamily: FONT_BODY,
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '20px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#000000')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#780C06')}
          >
            {cta}
          </a>
        </div>
      ))}
    </div>
  );
}

export function OrderOnlineModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Order Online"
      description="Please select the location where you'd like to purchase the Order."
      maxWidth="740px"
    >
      <LocationGrid links={ORDER_LINKS} cta="Order Here" />
    </ModalShell>
  );
}

export function GiftCardModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="A Gift Everyone Will Enjoy"
      description="Please select the location where you'd like to purchase the gift card."
      maxWidth="740px"
    >
      <LocationGrid links={GIFTCARD_LINKS} cta="Buy Here" />
    </ModalShell>
  );
}

export function ReserveTableModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !ref.current) return;
    // Fresh script each open so OpenTable's loader remounts its iframe into this container.
    ref.current.innerHTML = '';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = OPENTABLE_SRC;
    script.async = true;
    ref.current.appendChild(script);
  }, [open]);

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Reserve a Table"
      description="Please select the location where you'd like to purchase Reserve a table."
      maxWidth="740px"
      textAlign="left"
    >
      <div
        ref={ref}
        style={{ minHeight: '420px', display: 'flex', justifyContent: 'center' }}
      />
    </ModalShell>
  );
}
