import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { revealOnScroll, slideUp, staggerContainer, useMotionSafe } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Center the header block (default left). */
  centered?: boolean;
}

/**
 * Standard section shell: anchor id, vertical rhythm, and a scroll-revealed
 * header. Children animate in via a stagger container so each section composes
 * the same entrance language (design.md §5.2).
 */
export function SectionWrapper({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  centered = false,
}: SectionWrapperProps) {
  const safe = useMotionSafe();

  return (
    <section
      id={id}
      className={cn('relative scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 lg:py-32', className)}
    >
      <div className="mx-auto w-full max-w-6xl">
        {(eyebrow || title || description) && (
          <motion.div
            {...revealOnScroll}
            variants={staggerContainer}
            className={cn('mb-12 sm:mb-16', centered && 'text-center')}
          >
            {eyebrow && (
              <motion.p
                variants={slideUp}
                transition={safe ? undefined : { duration: 0 }}
                className="typo-label mb-3"
              >
                <span className="inline-flex items-center gap-2">
                  <span className="h-px w-6 bg-primary-400/60" aria-hidden />
                  {eyebrow}
                </span>
              </motion.p>
            )}
            {title && (
              <motion.h2
                variants={slideUp}
                transition={safe ? undefined : { duration: 0 }}
                className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
              >
                {title}
              </motion.h2>
            )}
            {description && (
              <motion.p
                variants={slideUp}
                transition={safe ? undefined : { duration: 0 }}
                className={cn('typo-body mt-4 max-w-2xl', centered && 'mx-auto')}
              >
                {description}
              </motion.p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
