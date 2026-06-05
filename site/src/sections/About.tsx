import { motion } from 'motion/react';
import { GraduationCap, Code2, Microscope } from 'lucide-react';
import { about, profile, education } from '@/data/profile';
import { SectionWrapper } from '@/components/primitives/SectionWrapper';
import { GlassCard } from '@/components/primitives/GlassCard';
import { TiltCard } from '@/components/effects/TiltCard';
import { Highlight } from '@/components/primitives/Highlight';
import { revealOnScroll, slideUp, staggerContainer, staggerItem, useMotionSafe } from '@/lib/motion';

const highlightIcons = [Code2, Microscope, GraduationCap];

export function About() {
  const safe = useMotionSafe();

  return (
    <SectionWrapper id="about" eyebrow="About" title="Two disciplines, one workflow">
      <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        {/* Visual — monogram card. Swap for a real <img> portrait when available. */}
        <motion.div {...revealOnScroll} variants={slideUp} className="mx-auto w-full max-w-sm lg:sticky lg:top-28">
          <TiltCard className="group" max={6}>
            <GlassCard featured className="aspect-[4/5] w-full">
              <div className="relative flex h-full flex-col items-center justify-center p-8">
                <div className="grid h-32 w-32 place-items-center rounded-3xl bg-gradient-to-br from-primary-300/90 to-accent-500/90 shadow-glow">
                  <span className="font-display text-6xl font-extrabold text-ink">
                    {profile.firstName[0]}
                  </span>
                </div>
                <p className="mt-6 font-display text-xl font-bold">{profile.name}</p>
                <p className="typo-caption mt-1">{profile.title}</p>

                <div className="mt-8 grid w-full grid-cols-3 gap-2">
                  {about.highlights.map((h, i) => {
                    const Icon = highlightIcons[i % highlightIcons.length];
                    return (
                      <div
                        key={h.label}
                        className="group/tile flex cursor-default flex-col items-center gap-1 rounded-xl border border-white/5 bg-white/[0.03] px-2 py-3 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-400/40 hover:bg-primary-400/10"
                      >
                        <Icon className="h-4 w-4 text-primary-400 transition-colors group-hover/tile:text-primary-300" />
                        <span className="typo-mono leading-tight">{h.label}</span>
                        <span className="text-xs font-semibold text-text-primary">{h.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </GlassCard>
          </TiltCard>
        </motion.div>

        {/* Copy */}
        <motion.div {...revealOnScroll} variants={staggerContainer} className="flex flex-col gap-5">
          {about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={staggerItem}
              transition={safe ? undefined : { duration: 0 }}
              className="text-lg leading-relaxed text-text-secondary sm:text-xl"
            >
              <Highlight text={p} />
            </motion.p>
          ))}

          {/* Education inline card */}
          <motion.div variants={staggerItem} transition={safe ? undefined : { duration: 0 }}>
            <GlassCard className="mt-3 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.04] text-primary-400">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3 className="typo-card-heading">{education.school}</h3>
                    <span className="typo-mono shrink-0">{education.period}</span>
                  </div>
                  <p className="typo-body mt-0.5">{education.degree}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="pill typo-badge text-primary-300">{education.track}</span>
                    {education.testing.map((t) => (
                      <span key={t.test} className="pill typo-badge text-text-secondary">
                        {t.test} {t.score} · {t.percentile}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
