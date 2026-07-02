import { clsx, type ClassValue } from 'clsx';

/** Tailwind-friendly className combiner. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Scrolls to a section, honoring prefers-reduced-motion. `scrollIntoView({behavior:'smooth'})`
 * is a JS-level directive that browsers do NOT auto-downgrade for reduced-motion users, so we
 * check the media query ourselves rather than relying on the CSS `scroll-behavior` override.
 */
export function scrollToSection(id: string): void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
}
