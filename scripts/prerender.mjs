/**
 * Prerender the built SPA to static HTML so crawlers (and first paint) get real
 * content without running JS. Runs as a `postbuild` hook after `vite build`.
 *
 * Design principles (intentional):
 *
 *  1. MODERN CHROME REQUIRED. react-snap@1.23 bundles Chromium ~v77 (2019), which
 *     cannot parse the optional-chaining / nullish operators in our es2020 bundle →
 *     React crashes → an EMPTY snapshot that still exits 0 (silent SEO failure). So
 *     we force a modern Chrome via puppeteerExecutablePath.
 *
 *  2. ENHANCEMENT, NEVER A BLOCKER. If no modern Chrome can be found/launched (e.g. a
 *     CI/Vercel build image without one), we WARN loudly and exit 0 so the deploy
 *     still ships the fully-functional CSR build (which already carries all meta +
 *     JSON-LD). A failed enhancement must not break production.
 *
 *  3. NO SILENT EMPTY SNAPSHOT. When prerender *does* run, we assert the output HTML
 *     actually contains rendered content; if it's empty we restore CSR and warn.
 *
 * Chrome resolution order: $PUPPETEER_EXECUTABLE_PATH → bundled modern puppeteer →
 * common local install paths.
 */
import { existsSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

async function resolveChrome() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH && existsSync(process.env.PUPPETEER_EXECUTABLE_PATH)) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }
  // Prefer the modern Chrome installed by the `puppeteer` devDep (portable: macOS + Linux/Vercel).
  // puppeteer ≥ v23 returns a Promise from executablePath(); older returns a string.
  try {
    const p = await require('puppeteer').executablePath();
    if (p && existsSync(p)) return p;
  } catch {
    /* puppeteer not installed or browser not downloaded — fall through to system paths */
  }
  const system = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ];
  return system.find((p) => existsSync(p)) || null;
}

function warnSkip(msg) {
  console.warn(
    `\n⚠️  [prerender] ${msg}\n` +
      '   → Shipping the CSR build instead (fully functional; meta tags + JSON-LD intact).\n' +
      '   → To enable prerender, set PUPPETEER_EXECUTABLE_PATH to a Chrome ≥ v80.\n'
  );
}

const INDEX = 'dist/index.html';
const SITEMAP = 'dist/sitemap.xml';

/**
 * Refresh freshness signals to the build date so they never rot:
 *   • JSON-LD `dateModified` in dist/index.html
 *   • every <lastmod> in dist/sitemap.xml
 * Runs UNCONDITIONALLY (before the Chrome check below) so even a CSR-only build
 * on an image without Chrome still ships an honest, current date. Non-fatal.
 */
function refreshBuildDates() {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
  try {
    if (existsSync(INDEX)) {
      const html = readFileSync(INDEX, 'utf8').replace(
        /("dateModified":\s*")\d{4}-\d{2}-\d{2}(")/,
        `$1${today}$2`
      );
      writeFileSync(INDEX, html);
    }
    if (existsSync(SITEMAP)) {
      const xml = readFileSync(SITEMAP, 'utf8').replace(
        /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g,
        `<lastmod>${today}</lastmod>`
      );
      writeFileSync(SITEMAP, xml);
    }
    console.log(`[prerender] refreshed build dates → ${today}`);
  } catch (e) {
    console.warn(`[prerender] date refresh skipped: ${e?.message ?? e}`);
  }
}

refreshBuildDates();

// Snapshot a copy of the pre-render HTML (with fresh dates) so we can restore CSR if the snapshot is empty.
const csrBackup = existsSync(INDEX) ? readFileSync(INDEX, 'utf8') : null;

const chrome = await resolveChrome();
if (!chrome) {
  warnSkip('No modern Chrome found.');
  process.exit(0);
}

console.log(`[prerender] using Chrome: ${chrome}`);

let run;
try {
  ({ run } = require('react-snap'));
} catch (e) {
  warnSkip(`react-snap not available: ${e.message}`);
  process.exit(0);
}

try {
  await run({
    source: 'dist',
    minifyHtml: { collapseWhitespace: false, removeComments: false },
    inlineCss: false,
    // Block the Unicorn Studio CDN + Google Fonts during snapshot so the crawl can't
    // hang on a third-party request; static text content is what we want captured.
    skipThirdPartyRequests: true,
    puppeteerExecutablePath: chrome,
    puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
} catch (err) {
  // react-snap can reject on a stray pageerror even after writing good HTML — so don't
  // trust the rejection alone; fall through to the content assertion below.
  console.warn(`[prerender] react-snap reported: ${err?.message ?? err}`);
}

// --- Assertion: did we actually capture rendered content? ---
const out = existsSync(INDEX) ? readFileSync(INDEX, 'utf8') : '';
const main = out.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? '';
const ok = main.replace(/<[^>]+>/g, '').trim().length > 400;

if (ok) {
  console.log(`✅ [prerender] success — <main> has ${main.length} bytes of static HTML.`);
} else {
  if (csrBackup) writeFileSync(INDEX, csrBackup); // restore the working CSR shell
  warnSkip('Snapshot produced no content (empty <main>); CSR shell restored.');
}
