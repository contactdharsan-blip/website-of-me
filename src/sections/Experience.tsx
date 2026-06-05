import { Fragment, useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { experience, type ExperienceItem } from '@/data/profile';
import { SectionWrapper } from '@/components/primitives/SectionWrapper';
import { GlassCard } from '@/components/primitives/GlassCard';
import { useMotionSafe } from '@/lib/motion';

function TimelineRow({ item, index }: { item: ExperienceItem; index: number }) {
  const safe = useMotionSafe();
  const initials = item.org
    .split(/[\s—]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <motion.li
      initial={safe ? { opacity: 0, y: 24 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={safe ? { type: 'spring', damping: 22, stiffness: 160, delay: index * 0.04 } : { duration: 0 }}
      className="relative pl-14 sm:pl-20"
    >
      {/* Node */}
      <motion.div
        initial={safe ? { scale: 0 } : false}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={safe ? { type: 'spring', damping: 14, stiffness: 260, delay: index * 0.04 + 0.05 } : { duration: 0 }}
        className="absolute left-2 top-2 z-10 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-xl border border-white/10 bg-ink-secondary text-[11px] font-bold text-primary-300 shadow-glow sm:left-3 sm:h-11 sm:w-11 sm:text-xs"
      >
        {initials}
      </motion.div>

      <GlassCard className="p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="typo-h3">
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 transition-colors hover:text-primary-300"
              >
                {item.org}
                <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
              </a>
            ) : (
              item.org
            )}
          </h3>
          <span className="typo-mono shrink-0">{item.period}</span>
        </div>

        <p className="mt-0.5 text-sm font-medium text-primary-300/90">
          {item.role}
          {item.meta && <span className="text-text-tertiary"> · {item.meta}</span>}
        </p>

        <p className="typo-body mt-3">{item.summary}</p>

        {item.bullets.length > 0 && (
          <ul className="mt-4 space-y-2">
            {item.bullets.map((b, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-text-secondary">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-400" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </GlassCard>
    </motion.li>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 70%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  let lastCategory = '';

  return (
    <SectionWrapper
      id="experience"
      eyebrow="Journey"
      title="Experience"
      description="Two parallel tracks — shipping software and building clinical depth on the pre-med path."
    >
      <div ref={containerRef} className="relative">
        {/* Connector track + animated fill */}
        <div className="absolute left-2 top-0 h-full w-px bg-white/[0.08] sm:left-3" aria-hidden />
        <motion.div
          aria-hidden
          style={{ scaleY }}
          className="absolute left-2 top-0 h-full w-px origin-top bg-gradient-to-b from-primary-300 via-accent-400 to-transparent sm:left-3"
        />

        <ul className="space-y-6">
          {experience.map((item, i) => {
            const showHeader = item.category !== lastCategory;
            lastCategory = item.category;
            return (
              <Fragment key={item.org + item.role}>
                {showHeader && (
                  <li className="relative pl-14 pt-2 sm:pl-20">
                    <h4 className="typo-label text-primary-300/80">{item.category}</h4>
                  </li>
                )}
                <TimelineRow item={item} index={i} />
              </Fragment>
            );
          })}
        </ul>
      </div>
    </SectionWrapper>
  );
}
