import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useHighPerf } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees at the card edges. */
  max?: number;
  /** Show a glare highlight that tracks the cursor. */
  glare?: boolean;
}

/**
 * 3D perspective hover tilt (design.md §1 "physical/liquid" feel). Pointer
 * position maps to rotateX/rotateY; a translucent glare follows the cursor.
 * Static on low-perf / reduced-motion.
 */
export function TiltCard({ children, className, max = 8, glare = true }: TiltCardProps) {
  const enabled = useHighPerf();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { damping: 20, stiffness: 200 });
  const glareX = useTransform(px, [0, 1], ['0%', '100%']);
  const glareY = useTransform(py, [0, 1], ['0%', '100%']);
  // Hoisted to top level so the hook is called unconditionally (rules of hooks).
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.10), transparent 45%)`
  );

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className={cn('relative', className)}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}
