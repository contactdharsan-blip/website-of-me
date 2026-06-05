// Generates branded "tool card" SVGs for the Skills CircularGallery.
//
// Why local assets (not a runtime logo CDN): the gallery loads each image via
// `new Image()` with a fire-and-forget `onload` — a failed fetch is a silently
// blank card (see tasks/lessons.md: SafeEffect swallows decorative failures,
// CDN/stale loads fail invisibly). Generating once into public/tools/ makes the
// gallery offline-safe, deterministic, and CORS-free.
//
// Each card is a 700×900 rounded card (matches the gallery plane aspect so the
// "contain" shader fills it edge-to-edge) painted in the tool's real brand
// color with its real logo glyph centered. Run: `node scripts/gen-tool-cards.mjs`

import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'tools');

// Card geometry — matches the gallery plane (700w × 900h ⇒ contain = full bleed).
const W = 700;
const H = 900;
const ICON_BOX = 280; // target logo width in px (Simple Icons paths are a 24×24 viewBox)

/**
 * Tool config. `slug` resolves a Simple Icons glyph unless `iconUrl` overrides
 * the source or `inlinePath` supplies a custom 24×24 path (for logos not in
 * Simple Icons). `bg` = brand background, `fg` = logo color.
 */
const TOOLS = [
  { id: 'vercel', label: 'Vercel', slug: 'vercel', bg: '#000000', fg: '#ffffff' },
  { id: 'claude-code', label: 'Claude Code', slug: 'claude', bg: '#D97757', fg: '#ffffff' },
  { id: 'cursor', label: 'Cursor', slug: 'cursor', bg: '#0A0A0A', fg: '#ffffff' },
  // Google Antigravity is not in Simple Icons — custom upward "rising" mark.
  {
    id: 'antigravity',
    label: 'Antigravity',
    bg: '#10131F',
    fg: '#ffffff',
    accent: '#8AB4F8',
    inlinePath:
      'M12 1.6 4.2 14.2a.6.6 0 0 0 .73.89L11 13v9.4a.6.6 0 0 0 1.2 0V13l6.07 2.09a.6.6 0 0 0 .73-.89Z',
  },
  { id: 'anthropic', label: 'Anthropic', slug: 'anthropic', bg: '#141413', fg: '#ffffff' },
  // OpenAI was removed from Simple Icons (trademark) — pull from a pinned version.
  {
    id: 'openai',
    label: 'OpenAI',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@11/icons/openai.svg',
    bg: '#000000',
    fg: '#ffffff',
  },
  { id: 'supabase', label: 'Supabase', slug: 'supabase', bg: '#121212', fg: '#3ECF8E' },
  { id: 'github', label: 'GitHub', slug: 'github', bg: '#181717', fg: '#ffffff' },
  { id: 'figma', label: 'Figma', slug: 'figma', bg: '#1A1A1A', fg: '#ffffff' },
  { id: 'ollama', label: 'Ollama', slug: 'ollama', bg: '#0A0A0A', fg: '#ffffff' },
  { id: 'gemini', label: 'Gemini', slug: 'googlegemini', bg: '#161B2E', fg: '#ffffff' },
  { id: 'copilot', label: 'GitHub Copilot', slug: 'githubcopilot', bg: '#000000', fg: '#ffffff' },
];

/** Extract the single `d="…"` path from a Simple Icons SVG string. */
function extractPath(svg) {
  const m = svg.match(/\sd="([^"]+)"/);
  if (!m) throw new Error('no <path d> found');
  return m[1];
}

async function fetchPath(tool) {
  if (tool.inlinePath) return tool.inlinePath;
  const url = tool.iconUrl ?? `https://cdn.simpleicons.org/${tool.slug}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${tool.id}: HTTP ${res.status} from ${url}`);
  return extractPath(await res.text());
}

/** Compose the final card SVG (explicit width/height ⇒ reliable Image.naturalWidth). */
function cardSvg(tool, path) {
  const scale = ICON_BOX / 24;
  // Center the 24×24 glyph in the card: translate to centre, scale, recentre glyph.
  const cx = W / 2;
  const cy = H / 2;
  const transform = `translate(${cx} ${cy}) scale(${scale}) translate(-12 -12)`;
  // Soft brand-tinted glow behind the logo for depth.
  const glow = tool.accent ?? tool.fg;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="g" cx="50%" cy="44%" r="55%">
      <stop offset="0%" stop-color="${glow}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" rx="48" fill="${tool.bg}"/>
  <rect x="0" y="0" width="${W}" height="${H}" rx="48" fill="url(#g)"/>
  <rect x="3" y="3" width="${W - 6}" height="${H - 6}" rx="45" fill="none" stroke="#ffffff" stroke-opacity="0.10" stroke-width="2"/>
  <g transform="${transform}" fill="${tool.fg}">
    <path d="${path}"/>
  </g>
</svg>
`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const results = [];
  for (const tool of TOOLS) {
    try {
      const path = await fetchPath(tool);
      const svg = cardSvg(tool, path);
      const file = join(OUT_DIR, `${tool.id}.svg`);
      await writeFile(file, svg, 'utf8');
      results.push({ id: tool.id, label: tool.label, file: `tools/${tool.id}.svg` });
      console.log(`✓ ${tool.id.padEnd(14)} → public/tools/${tool.id}.svg`);
    } catch (err) {
      console.error(`✗ ${tool.id}: ${err.message}`);
      process.exitCode = 1;
    }
  }
  // Emit a manifest the data layer can mirror.
  console.log('\nMANIFEST:\n' + JSON.stringify(results, null, 2));
}

main();
