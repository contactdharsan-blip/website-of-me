import { lazy, Suspense, useEffect, useState } from 'react';
import { useHighPerf } from '@/lib/motion';
import { hasWebGL, isPrerender } from '@/lib/perf';
import { toolGallery } from '@/data/profile';
import { SafeEffect } from './SafeEffect';

// Lazy so the WebGL gallery (ogl + shaders) ships as its own chunk, fetched
// only on high-perf + WebGL devices — never on first paint. Mirrors the
// lazy/perf/SafeEffect wiring of AmbientBackground (design.md §5.4 / §7.0).
const CircularGallery = lazy(() => import('./CircularGallery'));

/** Static branded-card grid — the only layer on low-perf / no-WebGL / reduced-motion. */
function FallbackGrid() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      {toolGallery.map((tool) => (
        <li
          key={tool.text}
          className="group/tool flex w-24 flex-col items-center gap-2 sm:w-28"
          title={tool.text}
        >
          <img
            src={tool.image}
            alt={`${tool.text} logo`}
            loading="lazy"
            className="aspect-[7/9] w-full rounded-2xl border border-white/10 object-cover transition-all duration-300 group-hover/tool:-translate-y-1 group-hover/tool:border-primary-400/40"
          />
          <span className="text-xs text-text-secondary transition-colors group-hover/tool:text-text-primary">
            {tool.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * "Tools I use" band. High-perf + WebGL → an interactive curved CircularGallery
 * of branded tool cards (drag / scroll to spin). Otherwise → the static grid.
 */
export function ToolsGallery() {
  const highPerf = useHighPerf();
  const [webgl, setWebgl] = useState(false);
  useEffect(() => setWebgl(hasWebGL()), []);

  // ?fx forces the WebGL layer on regardless of perf tier (debug/preview aid).
  const forced =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('fx');

  // During react-snap prerender, render the static grid (real <img>/text → crawlable)
  // instead of the opaque WebGL canvas.
  const showGL = (highPerf || forced) && webgl && !isPrerender();

  if (!showGL) return <FallbackGrid />;

  return (
    <SafeEffect fallback={<FallbackGrid />}>
      <Suspense fallback={<FallbackGrid />}>
        {/* CircularGallery fills its parent — it reads container client width/height. */}
        <div className="relative h-[26rem] w-full sm:h-[30rem]">
          <CircularGallery
            items={toolGallery}
            bend={3}
            borderRadius={0.05}
            textColor="#e8eaed"
            font="bold 28px 'General Sans', system-ui, sans-serif"
            scrollEase={0.04}
          />
        </div>
      </Suspense>
    </SafeEffect>
  );
}
