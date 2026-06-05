import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useHighPerf } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** How far the element is pulled toward the cursor (px at edge). */
  strength?: number;
}

/**
 * Wraps content and pulls it toward the cursor while hovered, snapping back on
 * leave via a spring (design.md signature spring feel). Degrades to a static
 * wrapper on low-perf / reduced-motion.
 */
export function MagneticButton({ children, className, strength = 18 }: MagneticButtonProps) {
  const enabled = useHighPerf();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 15, stiffness: 250, mass: 0.4 });
  const sy = useSpring(y, { damping: 15, stiffness: 250, mass: 0.4 });

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  if (!enabled) return <div className={cn('inline-flex', className)}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn('inline-flex', className)}
    >
      {children}
    </motion.div>
  );
}
