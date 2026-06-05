import { type Variants, type Transition } from 'motion/react';
import { useEffect, useState } from 'react';
import { detectPerfTier } from './perf';

/* ============================================================
   Safety hooks (design.md §5.4)
   ============================================================ */

function prefersReduced(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.classList.contains('perf-low')
  );
}

/** true only when motion is safe: not reduced-motion AND not a low-perf device. */
export function useMotionSafe(): boolean {
  const [safe, setSafe] = useState(() => !prefersReduced());
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setSafe(!prefersReduced());
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return safe;
}

/** true only on high-perf tier with motion allowed — gate decorative/WebGL effects on this. */
export function useHighPerf(): boolean {
  const safe = useMotionSafe();
  const [high, setHigh] = useState(() => detectPerfTier() === 'high');
  useEffect(() => setHigh(detectPerfTier() === 'high'), []);
  return safe && high;
}

/**
 * true on medium-or-better tier with motion allowed — gate lightweight WebGL
 * (the ambient background) on this so phones get it too. Phones almost never
 * score `high` (Chrome buckets deviceMemory at ≤4 GB even on flagships), but a
 * single fullscreen gradient scene is well within their GPU budget; only
 * genuinely weak devices (`low`: software GPU, ≤2 GB RAM) keep the static
 * fallback.
 */
export function useMediumPerf(): boolean {
  const safe = useMotionSafe();
  const [ok, setOk] = useState(() => detectPerfTier() !== 'low');
  useEffect(() => setOk(detectPerfTier() !== 'low'), []);
  return safe && ok;
}

/** Swap any variant's transition for this when motion is unsafe → UI snaps instead of animating. */
export const instant: Transition = { duration: 0 };

/* ============================================================
   Variant library (design.md §5.2)
   ============================================================ */

const spring: Transition = { type: 'spring', damping: 25, stiffness: 300 };

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.2 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: spring },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: spring },
};

export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const modalContent: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 28, stiffness: 350 } },
  exit: { opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.15, ease: 'easeIn' } },
};

export const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.1 } },
};

/** Standard "reveal as it scrolls into view" props for a section block. */
export const revealOnScroll = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, margin: '-80px' },
};
