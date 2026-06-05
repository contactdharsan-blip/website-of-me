import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'motion/react';
import { useMotionSafe } from '@/lib/motion';
import { isPrerender } from '@/lib/perf';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
  className?: string;
}

/**
 * Counts from 0 → value the first time it scrolls into view (design.md §5.3).
 * Respects reduced-motion: jumps straight to the final value when motion is
 * unsafe. Uses `tabular-nums` upstream so digits don't jitter while counting.
 */
export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  durationMs = 1800,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const safe = useMotionSafe();
  // Seed with the REAL value during prerender (react-snap) so the static HTML
  // crawlers read ships "375+", "1530", … — not "0". Without this the snapshot
  // counts up only on a real scroll, so an AI crawler would read "0 Products
  // shipped / 0 SAT" and could cite that self-contradiction. Real browsers still
  // start at 0 and animate. (Reduced-motion also jumps straight to the value.)
  const [display, setDisplay] = useState(isPrerender() || !safe ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (!safe) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: durationMs / 1000,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo — fast then settle
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, safe, value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
