import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useHighPerf } from '@/lib/motion';

/**
 * A soft accent glow that trails the pointer (design.md §7.0 pointer effects).
 * High-perf tier only; never rendered on touch/low devices. Spring-damped so
 * it lags slightly behind the cursor for a "liquid" feel.
 */
export function CursorGlow() {
  const enabled = useHighPerf();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { damping: 30, stiffness: 200, mass: 0.5 });
  const sy = useSpring(y, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[1] h-[480px] w-[480px] rounded-full"
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
        background:
          'radial-gradient(circle, rgba(var(--theme-primary-rgb), 0.07) 0%, transparent 60%)',
      }}
    />
  );
}
