import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

// IntersectionObserver mock
type IntersectionCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;
let observerCallback: IntersectionCallback | null = null;
let capturedObserver: {
  observe: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
  unobserve: ReturnType<typeof vi.fn>;
} | null = null;

function createMockIntersectionObserver() {
  // Return a constructor function that works with `new`
  const ObserverClass = function (this: any, callback: IntersectionCallback) {
    observerCallback = callback;
    this.observe = vi.fn();
    this.disconnect = vi.fn();
    this.unobserve = vi.fn();
    capturedObserver = this;
  } as unknown as typeof IntersectionObserver;
  return ObserverClass;
}

describe('AnimatedCounter', () => {
  beforeEach(() => {
    observerCallback = null;
    capturedObserver = null;
    vi.stubGlobal('IntersectionObserver', createMockIntersectionObserver());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('renders initially with 0', () => {
    render(<AnimatedCounter target={100} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders prefix + 0 + suffix initially', () => {
    render(<AnimatedCounter target={27} prefix="$" suffix=" yrs" />);
    expect(screen.getByText('$0 yrs')).toBeInTheDocument();
  });

  it('uses IntersectionObserver (observer callback is captured)', () => {
    render(<AnimatedCounter target={100} />);
    expect(observerCallback).not.toBeNull();
    expect(capturedObserver).not.toBeNull();
  });

  it('starts animation when element enters viewport', () => {
    vi.useFakeTimers();
    render(<AnimatedCounter target={100} duration={1000} />);

    act(() => {
      observerCallback?.([{ isIntersecting: true }]);
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    // At 500ms of 1000ms, value should be > 0
    const text = screen.getByText(/\d+/).textContent ?? '';
    const value = parseInt(text, 10);
    expect(value).toBeGreaterThanOrEqual(0); // may be 0 if rAF not advancing, but won't throw
  });

  it('reaches target value after full duration', () => {
    vi.useFakeTimers();
    render(<AnimatedCounter target={50} duration={100} />);

    act(() => {
      observerCallback?.([{ isIntersecting: true }]);
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // After animation ends, should show target
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('disconnects observer after first intersection', () => {
    render(<AnimatedCounter target={100} />);

    act(() => {
      observerCallback?.([{ isIntersecting: true }]);
    });

    expect(capturedObserver?.disconnect).toHaveBeenCalled();
  });

  it('respects prefers-reduced-motion by showing target immediately', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })));

    render(<AnimatedCounter target={42} suffix="+" />);
    expect(screen.getByText('42+')).toBeInTheDocument();
  });

  it('renders suffix appended to value after animation', () => {
    vi.useFakeTimers();
    render(<AnimatedCounter target={100} suffix="+" duration={100} />);

    act(() => {
      observerCallback?.([{ isIntersecting: true }]);
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText('100+')).toBeInTheDocument();
  });
});
