import { motion } from 'motion/react';
import { stats } from '@/data/profile';
import { GlassCard } from '@/components/primitives/GlassCard';
import { AnimatedCounter } from '@/components/effects/AnimatedCounter';
import { revealOnScroll, staggerContainer, staggerItem, useMotionSafe } from '@/lib/motion';

/** Social-proof band — animated KPI counters (design.md §5.3 / data display). */
export function Stats() {
  const safe = useMotionSafe();

  return (
    <section aria-label="By the numbers" className="relative px-5 py-10 sm:px-8">
      <motion.div
        {...revealOnScroll}
        variants={staggerContainer}
        className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={staggerItem} transition={safe ? undefined : { duration: 0 }}>
            <GlassCard className="flex h-full flex-col items-center justify-center p-5 text-center sm:p-7">
              <span className="typo-metric bg-gradient-to-br from-primary-200 to-accent-400 bg-clip-text text-3xl text-transparent sm:text-4xl lg:text-5xl">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </span>
              <span className="typo-caption mt-2 leading-tight">{stat.label}</span>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
