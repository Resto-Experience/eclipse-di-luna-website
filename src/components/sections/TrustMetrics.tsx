import Image from 'next/image';
import { AnimatedCounter } from './AnimatedCounter';

const METRICS = [
  { value: '27', label: 'Years Of Experience' },
  { value: '35+', label: 'Tapas' },
  { value: '500+', label: 'Successful Events' },
  { value: '1000+', label: 'Five Stars Rated' },
];

/**
 * Dark burgundy banner with 4 metrics + counter animation.
 * Per live: 1180×212, bg #3C1816, radius 8px, padding 40px 24px.
 * Width matches nav (max-w-[1180px]).
 */
export function TrustMetrics() {
  return (
    <div
      className="mx-auto rounded-[8px] grid grid-cols-2 md:grid-cols-4 text-center"
      style={{
        backgroundColor: '#3C1816',
        padding: '40px 24px',
        maxWidth: '1180px',
        width: '100%',
      }}
    >
      {METRICS.map((m) => (
        <div key={m.label} className="px-2">
          <AnimatedCounter
            value={m.value}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(48px, 6vw, 72px)',
              lineHeight: '72px',
              fontWeight: 400,
              color: '#FFFFFF',
              display: 'block',
            }}
          />
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              lineHeight: '20px',
              fontWeight: 400,
              color: '#FFFFFF',
              marginTop: '4px',
            }}
          >
            {m.label}
          </div>
        </div>
      ))}
    </div>
  );
}
