import { motion, useScroll, useSpring } from 'motion/react';

/** Thin gradient progress bar pinned to the top edge, tracking page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, var(--color-primary-light), var(--color-secondary))',
      }}
    />
  );
}
