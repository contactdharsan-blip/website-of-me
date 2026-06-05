/**
 * Hard-fail check that the prerender actually captured page content into
 * dist/index.html's <main> — for use in a CI gate or a pre-push hook:
 *
 *     npm run build && npm run verify:prerender
 *
 * Deliberately SEPARATE from `build`: the build/postbuild path is intentionally
 * resilient (ships the CSR shell, exit 0, if no Chrome is available) so Vercel
 * deploys never break. This script is the opt-in "was the snapshot real?" assert
 * you run where a modern Chrome IS guaranteed.
 */
import { existsSync, readFileSync } from 'node:fs';

const INDEX = 'dist/index.html';
if (!existsSync(INDEX)) {
  console.error('❌ [verify:prerender] dist/index.html missing — run `npm run build` first.');
  process.exit(1);
}

const html = readFileSync(INDEX, 'utf8');
const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? '';
const text = main.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

// Markers that only exist in RENDERED body content, never in the static <head>.
const markers = ['Avorio', 'BioPath', 'Dharsan Kesavan, in plain terms'];
const missing = markers.filter((m) => !text.includes(m));

if (text.length < 400 || missing.length) {
  console.error(
    `❌ [verify:prerender] <main> looks like an empty CSR shell.\n` +
      `   text length: ${text.length} (need > 400)\n` +
      (missing.length ? `   missing markers: ${missing.join(', ')}\n` : '') +
      `   → Prerender did not run (no Chrome?) or produced no content.`
  );
  process.exit(1);
}

console.log(`✅ [verify:prerender] <main> has ${text.length} chars and all key content.`);
