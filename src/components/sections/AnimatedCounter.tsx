'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Counter that animates from 0 to the numeric value in `value`.
 * Accepts strings like "27", "35+", "500+", "1000+" — animates only the numeric part, preserves suffix.
 */
export function AnimatedCounter({
  value,
  durationMs = 1400,
  className,
  style,
}: {
  value: string;
  durationMs?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const match = value.match(/(\d+)(.*)/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';

  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!ref.current || hasRun.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / durationMs, 1);
              const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
              setCurrent(Math.round(target * eased));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, durationMs]);

  return (
    <span ref={ref} className={className} style={style}>
      {current}
      {suffix}
    </span>
  );
}
