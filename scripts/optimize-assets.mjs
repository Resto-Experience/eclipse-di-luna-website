import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const PUBLIC = '/Users/SantiagoRWeber/Documents/Downloads/Webs/Claude/eclipse-di-luna/public';

function run(cmd) {
  try {
    execSync(cmd, { stdio: 'pipe' });
  } catch (e) {
    console.error(`FAILED: ${cmd}\n${e.message}`);
  }
}

function sizeKB(file) {
  return (fs.statSync(file).size / 1024).toFixed(0);
}

// Video was already processed in previous run. Skip re-run to avoid double compression.

// 2. BIG BACKGROUNDS — re-encode WebP at quality 70, resize if wider than 2000px
const WEBP_TARGETS = [
  'images/menu/grid-bg.webp',
  'images/about/about-2.webp',
  'images/about/about-3.webp',
  'images/about/about-5.webp',
  'images/about/about-6.webp',
  'images/about/slide-2.webp',
  'images/opentable/opentable-desktop.webp',
  'images/opentable/opentable-mobile.webp',
  'images/catering/form-bg.webp',
  'images/catering/hero-bg-mobile.webp',
  'images/menu/hero-bg.webp',
  'images/menu/hero-bg-mobile.webp',
  'images/private-party/hero-bg-mobile.webp',
];

for (const rel of WEBP_TARGETS) {
  const file = `${PUBLIC}/${rel}`;
  if (!fs.existsSync(file)) continue;
  const before = sizeKB(file);
  const tmp = `${file}.tmp.webp`;
  // Decode webp → PNG via dwebp, resize with sips, re-encode via cwebp at quality 72.
  const tmpPng = `${file}.tmp.png`;
  run(`dwebp "${file}" -o "${tmpPng}"`);
  // Resize if wider than 2000
  try {
    const dims = execSync(`sips -g pixelWidth "${tmpPng}"`).toString();
    const w = parseInt(dims.match(/pixelWidth:\s*(\d+)/)?.[1] || 0);
    if (w > 2000) run(`sips -Z 2000 "${tmpPng}" --out "${tmpPng}"`);
  } catch (_) {}
  run(`cwebp -q 72 -m 6 "${tmpPng}" -o "${tmp}" 2>&1 | tail -1`);
  if (fs.existsSync(tmpPng)) fs.unlinkSync(tmpPng);
  if (fs.existsSync(tmp)) {
    const after = sizeKB(tmp);
    // Only replace if smaller
    if (Number(after) < Number(before)) {
      fs.renameSync(tmp, file);
      console.log(`[webp] ${rel}: ${before} → ${after} KB`);
    } else {
      fs.unlinkSync(tmp);
      console.log(`[webp] ${rel}: skipped (re-encode was bigger)`);
    }
  }
}

// Logos PNG kept as-is (~500KB combined, not worth chasing — next/image serves proper variants).

console.log('\nDone. Run `node scripts/size-audit.mjs` to see final sizes.');
