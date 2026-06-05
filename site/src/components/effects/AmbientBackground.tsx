import { lazy, Suspense, useEffect, useState } from 'react';
import { useHighPerf } from '@/lib/motion';
import { hasWebGL } from '@/lib/perf';
import { SafeEffect } from './SafeEffect';

// Lazy so the Unicorn Studio scene (its bundled WebGL SDK + hosted scene) ships
// as its own chunk, fetched only when the gradient layer is actually rendered
// (high-perf + WebGL devices). The component is a named export, so we adapt it
// to the default-export shape React.lazy expects.
const RaycastScene = lazy(() =>
  import('@/components/ui/raycast-animated-background').then((m) => ({ default: m.Component })),
);

/**
 * Ambient dark canvas.
 *
 * High-perf tier → a Raycast-style animated gradient: a full-screen hosted
 * Unicorn Studio WebGL scene drifting soft glow blobs behind all content.
 * Medium/low tier & reduced-motion → just the faint static grid.
 * (design.md §5.4: decorative WebGL is high-tier only, with a static fallback.)
 */
export function AmbientBackground() {
  const highPerf = useHighPerf();
  // WebGL check runs client-side only (after mount) so SSR/first paint is safe.
  const [webgl, setWebgl] = useState(false);
  useEffect(() => setWebgl(hasWebGL()), []);

  // ?fx forces the particle layer on regardless of perf tier (debug/preview aid).
  const forced =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('fx');

  const showGradient = (highPerf || forced) && webgl;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {showGradient && (
        <SafeEffect>
          <Suspense fallback={null}>
            {/* The scene's own div is a centered flow element; this absolute
                wrapper stretches it to cover the fixed-inset-0 parent. */}
            <div className="absolute inset-0 opacity-90 [&>div]:h-full [&>div]:w-full">
              <RaycastScene />
            </div>
          </Suspense>
        </SafeEffect>
      )}

      {/* Faint grid texture for depth (always on; the only layer on low-perf) */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />
    </div>
  );
}
