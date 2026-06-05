import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { profile, sections } from '@/data/profile';
import { cn } from '@/lib/utils';

/**
 * Fixed glass top-bar with a sliding "liquid" active-section indicator
 * (design.md §7.4 segmented control feel) driven by a scroll-spy
 * IntersectionObserver. On mobile the links collapse to a horizontally
 * scrollable glass pill row so every anchor stays reachable without a menu.
 */
export function Nav() {
  const [active, setActive] = useState<string>('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function go(e: React.MouseEvent, id: string) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300 pt-safe',
        scrolled ? 'pt-3 pb-3' : 'pt-7 pb-4 sm:pt-8'
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => go(e, 'home')}
          className="group flex shrink-0 items-center gap-2 rounded-full px-1 font-display text-base font-bold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary-300 to-accent-500 text-sm font-extrabold text-ink">
            D
          </span>
          <span className="hidden text-text-primary xs:inline">{profile.firstName}</span>
        </a>

        {/* Section links — desktop: centered pill; mobile: scrollable */}
        <div
          className={cn(
            'glass-track flex items-center gap-1 overflow-x-auto rounded-full border border-white/10 p-1',
            'no-scrollbar max-w-[58vw] sm:max-w-none'
          )}
          style={{ scrollbarWidth: 'none' }}
        >
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => go(e, s.id)}
                className={cn(
                  'relative shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 sm:px-4',
                  isActive ? 'text-ink' : 'text-text-tertiary hover:text-text-primary'
                )}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-primary-300 to-accent-400"
                      transition={{ type: 'spring', damping: 22, stiffness: 320 }}
                    />
                  )}
                </AnimatePresence>
                {s.label}
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => go(e, 'contact')}
          className="btn-primary hidden h-10 shrink-0 items-center gap-1.5 px-4 text-sm font-medium md:inline-flex"
        >
          Let’s talk <ArrowUpRight className="h-4 w-4" />
        </a>
      </nav>
    </header>
  );
}
