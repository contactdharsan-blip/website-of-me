import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

/**
 * Floating "back to top" affordance. A long single-page résumé site has no
 * other way back to the nav once you're deep in Experience/Projects — this
 * appears once you've scrolled past the first viewport and jumps to #home
 * (not just y:0) so focus/scroll-spy state stays consistent with the nav.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function goTop() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('home')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ type: 'spring', damping: 22, stiffness: 300 }}
          className="fixed bottom-5 right-5 z-40 pb-safe sm:bottom-8 sm:right-8"
        >
          <MagneticButton>
            <button
              onClick={goTop}
              aria-label="Back to top"
              className="btn-glass grid h-11 w-11 place-items-center rounded-full shadow-glow"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </MagneticButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
