import { motion } from 'motion/react';
import { faq } from '@/data/profile';
import { SectionWrapper } from '@/components/primitives/SectionWrapper';
import { GlassCard } from '@/components/primitives/GlassCard';
import { revealOnScroll, staggerContainer, staggerItem, useMotionSafe } from '@/lib/motion';

/**
 * "In brief" — answer-engine surface (design.md voice, AEO purpose).
 *
 * Plain third-person Q&A in self-contained sentences, so a search snippet or
 * an AI assistant ("Who is Dharsan Kesavan?") can quote one clean line. This is
 * intentionally VISIBLE prose with NO FAQPage/QAPage JSON-LD — the answerability
 * win comes from extractable text, and FAQ rich results were retired for
 * non-gov/health sites in 2023 (markup would add risk, not reach).
 */
export function Faq() {
  const safe = useMotionSafe();

  return (
    <SectionWrapper id="in-brief" eyebrow="In brief" title="Dharsan Kesavan, in plain terms">
      <motion.dl
        {...revealOnScroll}
        variants={staggerContainer}
        className="grid gap-4 sm:grid-cols-2"
      >
        {faq.map((item) => (
          <motion.div
            key={item.q}
            variants={staggerItem}
            transition={safe ? undefined : { duration: 0 }}
          >
            <GlassCard className="h-full p-5 sm:p-6">
              <dt className="typo-card-heading text-text-primary">{item.q}</dt>
              <dd className="typo-body mt-2 leading-relaxed text-text-secondary">{item.a}</dd>
            </GlassCard>
          </motion.div>
        ))}
      </motion.dl>
    </SectionWrapper>
  );
}
