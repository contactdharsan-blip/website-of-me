import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Download, Mail, MapPin } from 'lucide-react';
import { profile } from '@/data/profile';
import { useMotionSafe } from '@/lib/motion';
import { Highlight } from '@/components/primitives/Highlight';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { TiltCard } from '@/components/effects/TiltCard';
import { cn } from '@/lib/utils';

/** Splits the display name into [first, last] for the editorial straddle. */
const nameWords = profile.name.split(' ');
const firstName = nameWords[0];
const lastName = nameWords.slice(1).join(' ');

/** Tiny print-shop registration mark used at the portrait's corners. */
function CropMark({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={cn('pointer-events-none absolute h-4 w-4 text-primary-400/70', className)}
    >
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current" />
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const safe = useMotionSafe();
  // When motion is safe we run the pinned scroll-morph; otherwise a static,
  // fully-assembled editorial hero (no scroll-jacking for reduced-motion users).
  const pinned = safe;

  // 0 → 1 as the tall section scrolls through the pinned viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // ── Scroll-driven choreography ──────────────────────────────────────────
  // Portrait materialises first…
  const portraitScale = useTransform(scrollYProgress, [0, 0.55], [0.72, 1]);
  const portraitOpacity = useTransform(scrollYProgress, [0.05, 0.5], [0, 1]);
  // …while the two name lines slide apart from a centred two-line "title" stack
  // (≈ half the final straddle gap, so they sit stacked-but-not-overlapping at p0).
  const firstY = useTransform(scrollYProgress, [0, 0.55], [60, 0]);
  const lastY = useTransform(scrollYProgress, [0, 0.55], [-60, 0]);
  // …then the journalistic overlays + masthead draw in…
  const overlayOpacity = useTransform(scrollYProgress, [0.45, 0.8], [0, 1]);
  const mastOpacity = useTransform(scrollYProgress, [0.5, 0.82], [0, 1]);
  const mastY = useTransform(scrollYProgress, [0.5, 0.82], [-12, 0]);
  const captionOpacity = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);
  // …and finally the readable content + CTAs settle in.
  const contentOpacity = useTransform(scrollYProgress, [0.66, 1], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.66, 1], [26, 0]);
  // The "scroll" cue fades the moment you start.
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const label = 'font-mono uppercase text-text-tertiary';

  // Helper: apply a scroll-style only in pinned mode (static otherwise).
  const sx = <T extends object>(style: T) => (pinned ? style : undefined);

  return (
    <section
      id="home"
      ref={ref}
      className={cn('relative', pinned ? 'h-[200vh]' : 'min-h-[100svh]')}
    >
      {/* Pinned viewport (sticky) in morph mode; plain centered box otherwise */}
      <div
        className={cn(
          'flex items-center justify-center overflow-hidden px-5 sm:px-8',
          pinned ? 'sticky top-0 h-[100svh]' : 'min-h-[100svh] py-28'
        )}
      >
        <div className="relative mx-auto w-full max-w-4xl">
          {/* ── Masthead ─────────────────────────────────────────────── */}
          <motion.div
            style={sx({ opacity: mastOpacity, y: mastY })}
            className={cn(
              label,
              'mb-10 flex items-center justify-between gap-3 border-y border-white/10 py-2.5 text-[10px] tracking-[0.25em] sm:mb-14 sm:text-xs'
            )}
          >
            <span className="text-text-secondary">Portfolio — No. 01</span>
            <span className="hidden sm:inline">Bioengineer × Software</span>
            <span>Vol. MMXXVI</span>
          </motion.div>

          {/* ── Editorial composition: name straddles the portrait ────── */}
          <div className="relative mx-auto w-full max-w-2xl">
            {/* Portrait — scales + fades in as you scroll */}
            <motion.div
              style={sx({ scale: portraitScale, opacity: portraitOpacity })}
              className="group relative z-10 mx-auto w-[min(68vw,19rem)]"
            >
              {/* Red/pink ambient bloom */}
              <div
                aria-hidden
                className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-primary-500/40 via-accent-500/30 to-transparent opacity-70 blur-3xl"
              />
              <TiltCard max={9} glare className="rounded-[1.75rem]">
                <div className="rounded-[1.75rem] bg-gradient-to-br from-primary-500/60 via-white/10 to-accent-500/50 p-[1.5px] shadow-glow-lg">
                  <div className="relative overflow-hidden rounded-[calc(1.75rem-1.5px)] bg-ink-secondary">
                    <img
                      src={profile.portraitPath}
                      alt={profile.portraitAlt}
                      width={1024}
                      height={1024}
                      loading="eager"
                      fetchPriority="high"
                      className="aspect-square w-full object-cover"
                    />
                  </div>
                </div>
              </TiltCard>

              {/* Registration / crop marks (fade in with the portrait) */}
              <CropMark className="-left-3 -top-3" />
              <CropMark className="-right-3 -top-3" />
              <CropMark className="-bottom-3 -left-3" />
              <CropMark className="-bottom-3 -right-3" />
            </motion.div>

            {/* Name — the constant. Starts stacked/centred, slides into the
                straddle as the portrait grows between the two lines. */}
            {/* aria-label gives a single clean accessible name — the two spans below
                have no separating space, so without this the h1 extracts as
                "DharsanKesavan", mismatching the title/OG/JSON-LD entity string. */}
            <h1
              aria-label={profile.name}
              className="pointer-events-none absolute inset-0 z-20 flex select-none flex-col justify-between font-display font-extrabold uppercase leading-[0.82] tracking-tight [text-shadow:0_4px_30px_rgba(0,0,0,0.6)]"
            >
              <motion.span style={sx({ y: firstY })} className="-ml-1 text-6xl xs:text-7xl sm:text-8xl">
                {firstName}
              </motion.span>
              <motion.span
                style={sx({ y: lastY })}
                className="self-end text-gradient text-6xl xs:text-7xl sm:text-8xl"
              >
                {lastName}
              </motion.span>
            </h1>

            {/* Rotated edition label — right edge (desktop only) */}
            <motion.span
              style={sx({ opacity: overlayOpacity })}
              className={cn(
                label,
                'absolute -right-2 top-1/2 hidden -translate-y-1/2 rotate-90 text-[10px] tracking-[0.4em] lg:block'
              )}
            >
              {profile.availabilityNote}
            </motion.span>

            {/* Coordinates / dateline — bottom-left (sm+) */}
            <motion.span
              style={sx({ opacity: overlayOpacity })}
              className={cn(label, 'absolute -bottom-6 left-0 hidden text-[10px] tracking-[0.3em] sm:block')}
            >
              33.4°N&nbsp;·&nbsp;112.0°W
            </motion.span>
          </div>

          {/* ── Figure caption ───────────────────────────────────────── */}
          <motion.p
            style={sx({ opacity: captionOpacity })}
            className={cn(label, 'mt-9 text-center text-[10px] tracking-[0.3em] sm:mt-10 sm:text-xs')}
          >
            <span className="text-primary-400">Fig. 01</span> — {profile.title}
          </motion.p>

          {/* ── Readable content + CTAs (settle in last) ─────────────── */}
          <motion.div style={sx({ opacity: contentOpacity, y: contentY })}>
            <p className="typo-body mx-auto mt-5 max-w-xl text-balance text-center">
              <Highlight text={profile.tagline} />
            </p>

            <p className="typo-caption mt-4 flex items-center justify-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary-400" /> {profile.location}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <MagneticButton>
                <a
                  href={profile.cvPath}
                  download
                  aria-label={`Download ${profile.name}'s CV (PDF)`}
                  className="btn-primary inline-flex h-12 items-center gap-2 px-6 text-base font-medium"
                >
                  <Download className="h-5 w-5" /> Download CV
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-glass inline-flex h-12 items-center gap-2 px-6 text-base font-medium"
                >
                  <Mail className="h-5 w-5" /> Get in touch
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue — only in pinned mode; fades as the morph begins */}
        {pinned && (
          <motion.div
            style={{ opacity: cueOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-tertiary"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="h-5 w-5" />
            </motion.span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
