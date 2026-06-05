import { motion } from 'motion/react';
import { skillGroups } from '@/data/profile';
import { SectionWrapper } from '@/components/primitives/SectionWrapper';
import { GlassCard } from '@/components/primitives/GlassCard';
import { ToolsGallery } from '@/components/effects/ToolsGallery';
import { revealOnScroll, staggerContainer, staggerItem, useMotionSafe } from '@/lib/motion';

export function Skills() {
  const safe = useMotionSafe();

  return (
    <SectionWrapper
      id="skills"
      eyebrow="Capabilities"
      title="Skills & tooling"
      description="The stack I reach for — from a memory-safe Rust core to ML pipelines and the bench-to-bedside science behind them."
    >
      <motion.div
        {...revealOnScroll}
        variants={staggerContainer}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillGroups.map((group) => (
          <motion.div key={group.category} variants={staggerItem} transition={safe ? undefined : { duration: 0 }}>
            <GlassCard className="h-full p-5 sm:p-6">
              <h3 className="typo-label mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary-300 to-accent-400" />
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="group/skill cursor-default rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-400/40 hover:bg-gradient-to-br hover:from-primary-400/15 hover:to-accent-400/10 hover:text-text-primary"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
