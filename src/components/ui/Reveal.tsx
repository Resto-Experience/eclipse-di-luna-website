'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type Variant = 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'zoom-in';

const TRANSFORM_INIT: Record<Variant, string> = {
  'fade-up': 'translate3d(0, 24px, 0)',
  'fade-in': 'none',
  'fade-left': 'translate3d(-24px, 0, 0)',
  'fade-right': 'translate3d(24px, 0, 0)',
  'zoom-in': 'scale(0.96)',
};

export function Reveal({
  children,
  as: Tag = 'div',
  variant = 'fade-up',
  delay = 0,
  duration = 600,
  className,
  style,
  threshold = 0.15,
  once = true,
  onMount = false,
}: {
  children: ReactNode;
  as?: keyof HTMLElementTagNameMap;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  threshold?: number;
  once?: boolean;
  onMount?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    if (onMount) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(e.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold, rootMargin: '0px 0px -80px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once, onMount]);

  const combinedStyle: CSSProperties = {
    ...style,
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : TRANSFORM_INIT[variant],
    transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    willChange: visible ? 'auto' : 'opacity, transform',
  };

  const RefTag = Tag as unknown as React.ElementType;
  return (
    <RefTag ref={ref as React.Ref<HTMLElement>} className={className} style={combinedStyle}>
      {children}
    </RefTag>
  );
}

export function Stagger({
  children,
  step = 80,
  initialDelay = 0,
  variant = 'fade-up',
  duration = 600,
  className,
  style,
}: {
  children: ReactNode[];
  step?: number;
  initialDelay?: number;
  variant?: Variant;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      {children.map((child, i) => (
        <Reveal key={i} variant={variant} delay={initialDelay + i * step} duration={duration}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
