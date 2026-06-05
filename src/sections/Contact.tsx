import { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Mail, ArrowUpRight } from 'lucide-react';
import { profile, socials } from '@/data/profile';
import { SectionWrapper } from '@/components/primitives/SectionWrapper';
import { GlassCard } from '@/components/primitives/GlassCard';
import { SocialIcon } from '@/components/primitives/SocialIcon';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { revealOnScroll, scaleIn, staggerContainer, staggerItem, useMotionSafe } from '@/lib/motion';

export function Contact() {
  const safe = useMotionSafe();
  const [copied, setCopied] = useState(false);
  const liveSocials = socials.filter((s) => s.href.trim() !== '');

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  }

  return (
    <SectionWrapper id="contact" centered eyebrow="Contact" title={<>Let’s build something</>}>
      <motion.div {...revealOnScroll} variants={scaleIn} className="mx-auto max-w-2xl">
        <GlassCard featured className="p-8 text-center sm:p-12">
          <p className="typo-body mx-auto max-w-md">
            {profile.availabilityNote}. Whether it’s research, an internship, or a hard problem at
            the bio × software seam — my inbox is open.
          </p>

          {/* Email row */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <MagneticButton>
              <a
                href={`mailto:${profile.email}`}
                className="btn-primary inline-flex h-12 items-center gap-2 px-6 text-base font-medium"
              >
                <Mail className="h-5 w-5" /> {profile.email}
              </a>
            </MagneticButton>
            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              className="btn-glass inline-flex h-12 w-12 items-center justify-center sm:w-auto sm:px-4"
            >
              {copied ? (
                <span className="inline-flex items-center gap-2 text-primary-300">
                  <Check className="h-5 w-5" /> <span className="hidden sm:inline">Copied</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <Copy className="h-5 w-5" /> <span className="hidden sm:inline">Copy</span>
                </span>
              )}
            </button>
          </div>

          {/* Socials */}
          {liveSocials.length > 0 && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              {liveSocials.map((s) => (
                <motion.a
                  key={s.label}
                  variants={staggerItem}
                  transition={safe ? undefined : { duration: 0 }}
                  href={s.href}
                  target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="group grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-text-secondary transition-all duration-300 hover:-translate-y-1 hover:border-primary-400/40 hover:text-primary-300 hover:shadow-glow"
                >
                  <SocialIcon icon={s.icon} />
                </motion.a>
              ))}
            </motion.div>
          )}
        </GlassCard>
      </motion.div>

      {/* Footer */}
      <footer className="mx-auto mt-20 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-8 text-center sm:flex-row sm:text-left">
        <p className="typo-mono">© {profile.name}</p>
        <p className="typo-caption inline-flex items-center gap-1.5">
          Built with React, Tailwind & Motion
          <ArrowUpRight className="h-3.5 w-3.5" />
        </p>
      </footer>
    </SectionWrapper>
  );
}
