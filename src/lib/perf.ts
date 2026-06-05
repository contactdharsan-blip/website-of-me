/**
 * Device performance tiering (design.md §5.4).
 *
 * We score the device once, cache the result, and tag <html> with a
 * `perf-low` / `perf-medium` class so pure-CSS effects can down-shift
 * (reduced blur, hidden particles) without any JS in the render path.
 */

export type PerfTier = 'high' | 'medium' | 'low';

let cached: PerfTier | null = null;

/**
 * True when the page is being rendered by react-snap's prerender crawler.
 * react-snap loads each page with a user agent containing "ReactSnap", which we
 * use to skip decorative WebGL (Unicorn Studio injects a ~1 MB Three.js bundle
 * into the DOM that would otherwise be frozen into the static snapshot) and render
 * the semantic static fallback instead — better for crawlers, lighter HTML.
 * Client-side this is always false, so real visitors get the full experience.
 */
export function isPrerender(): boolean {
  return typeof navigator !== 'undefined' && /ReactSnap/i.test(navigator.userAgent);
}

/** Whether a WebGL context can actually be created (decorative WebGL needs it). */
export function hasWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}

/** Best-effort GPU renderer string via the debug extension. */
function getGpuRenderer(): string {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      (canvas.getContext('webgl') as WebGLRenderingContext | null) ??
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (!gl) return '';
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (!ext) return '';
    return String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) ?? '').toLowerCase();
  } catch {
    return '';
  }
}

/**
 * Score the device into a perf tier.
 *
 * Heuristic weights three signals: a software/integrated GPU is the strongest
 * "low" signal; low deviceMemory and few logical cores push it down too. A
 * coarse-pointer (touch) device with little RAM is treated as mobile-low.
 */
export function detectPerfTier(): PerfTier {
  if (cached) return cached;
  if (typeof window === 'undefined') return 'high';

  const renderer = getGpuRenderer();
  // Software rasterizers / known-weak integrated GPUs.
  const softwareGpu = /swiftshader|llvmpipe|software|microsoft basic|mesa offscreen/.test(renderer);
  const weakIntegrated = /(intel).*(hd|uhd) graphics (5|6)\d{2}/.test(renderer);

  // Navigator hints (not on every browser — default generously when absent).
  const nav = navigator as Navigator & { deviceMemory?: number };
  const mem = nav.deviceMemory ?? 8; // GB; undefined on Safari/Firefox → assume capable
  const cores = navigator.hardwareConcurrency ?? 8;
  const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;

  let score = 3; // start at "high"
  if (softwareGpu) score -= 3;
  if (weakIntegrated) score -= 1;
  if (mem <= 2) score -= 2;
  else if (mem <= 4) score -= 1;
  if (cores <= 2) score -= 2;
  else if (cores <= 4) score -= 1;
  if (coarse && mem <= 4) score -= 1;

  const tier: PerfTier = score >= 3 ? 'high' : score >= 1 ? 'medium' : 'low';
  cached = tier;
  return tier;
}

/** Tag <html> with the perf tier class (called once at boot, before React). */
export function applyPerfClass(): void {
  const tier = detectPerfTier();
  const el = document.documentElement;
  el.classList.remove('perf-low', 'perf-medium', 'perf-high');
  el.classList.add(`perf-${tier}`);
}
