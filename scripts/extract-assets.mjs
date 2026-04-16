import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, existsSync, createWriteStream } from 'fs';
import { join, basename } from 'path';
import https from 'https';
import http from 'http';

const BASE_URL = 'https://www.eclipsediluna.com';
const OUT = join(import.meta.dirname, '..', 'extracted');
const IMG_DIR = join(OUT, 'images');
const SCREENSHOTS_DIR = join(OUT, 'screenshots');

[OUT, IMG_DIR, SCREENSHOTS_DIR].forEach(d => {
  if (!existsSync(d)) mkdirSync(d, { recursive: true });
});

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) { resolve(false); return; }
      const file = createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(true); });
    }).on('error', () => resolve(false));
  });
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Full page screenshots
  console.log('📸 Full-page screenshots...');
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(5000);
  await page.screenshot({ path: join(SCREENSHOTS_DIR, 'home-desktop.png'), fullPage: true });
  console.log('  ✅ home-desktop.png');

  // Mobile
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: join(SCREENSHOTS_DIR, 'home-mobile.png'), fullPage: true });
  console.log('  ✅ home-mobile.png');

  // Reset to desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(1000);

  // 2. Extract ALL image URLs
  console.log('\n🖼️  Extracting images...');
  const images = await page.evaluate(() => {
    const imgs = new Map();
    // <img> tags
    document.querySelectorAll('img').forEach(img => {
      const src = img.currentSrc || img.src || '';
      if (src && !src.startsWith('data:')) {
        imgs.set(src, { src, alt: img.alt || '', type: 'img' });
      }
      // srcset
      if (img.srcset) {
        img.srcset.split(',').forEach(s => {
          const url = s.trim().split(' ')[0];
          if (url && !url.startsWith('data:')) {
            imgs.set(url, { src: url, alt: img.alt || '', type: 'srcset' });
          }
        });
      }
    });
    // <source> inside <picture>
    document.querySelectorAll('source').forEach(src => {
      if (src.srcset) {
        src.srcset.split(',').forEach(s => {
          const url = s.trim().split(' ')[0];
          if (url && !url.startsWith('data:')) {
            imgs.set(url, { src: url, alt: '', type: 'picture-source' });
          }
        });
      }
    });
    // background-image CSS
    document.querySelectorAll('*').forEach(el => {
      const bg = getComputedStyle(el).backgroundImage;
      if (bg && bg !== 'none' && bg.includes('url(')) {
        const match = bg.match(/url\(["']?(.+?)["']?\)/);
        if (match && !match[1].startsWith('data:')) {
          imgs.set(match[1], { src: match[1], alt: 'bg', type: 'background' });
        }
      }
    });
    return Array.from(imgs.values());
  });
  writeFileSync(join(OUT, 'images.json'), JSON.stringify(images, null, 2));
  console.log(`  Found ${images.length} unique images`);

  // 3. Download images
  console.log('\n⬇️  Downloading images...');
  let downloaded = 0;
  for (const img of images) {
    try {
      const url = new URL(img.src, BASE_URL);
      const ext = basename(url.pathname).split('?')[0] || 'img';
      const filename = `${downloaded}-${ext}`;
      const ok = await download(url.href, join(IMG_DIR, filename));
      if (ok) downloaded++;
    } catch {}
  }
  console.log(`  Downloaded ${downloaded}/${images.length}`);

  // 4. Extract videos
  console.log('\n🎬 Videos...');
  const videos = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('video')).map(v => ({
      src: v.src || '',
      poster: v.poster || '',
      sources: Array.from(v.querySelectorAll('source')).map(s => ({ src: s.src, type: s.type }))
    }));
  });
  writeFileSync(join(OUT, 'videos.json'), JSON.stringify(videos, null, 2));
  console.log(`  Found ${videos.length} videos`);

  // Download video files
  for (const vid of videos) {
    const srcs = [vid.src, vid.poster, ...vid.sources.map(s => s.src)].filter(Boolean);
    for (const src of srcs) {
      try {
        const url = new URL(src, BASE_URL);
        const filename = basename(url.pathname).split('?')[0];
        if (filename) {
          console.log(`  ⬇️  ${filename}...`);
          await download(url.href, join(OUT, filename));
        }
      } catch {}
    }
  }

  // 5. Extract design tokens
  console.log('\n🎨 Design tokens...');
  const tokens = await page.evaluate(() => {
    const getS = (el) => {
      if (!el) return null;
      const s = getComputedStyle(el);
      return {
        fontFamily: s.fontFamily, fontSize: s.fontSize, fontWeight: s.fontWeight,
        color: s.color, backgroundColor: s.backgroundColor, lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing, borderRadius: s.borderRadius
      };
    };
    return {
      body: getS(document.body),
      nav: getS(document.querySelector('[class*="navbar"]')),
      h1: getS(document.querySelector('h1')),
      h2: getS(document.querySelector('h2')),
      h3: getS(document.querySelector('h3')),
      button: getS(document.querySelector('[class*="button"]')),
      footer: getS(document.querySelector('footer, [class*="footer"]'))
    };
  });
  writeFileSync(join(OUT, 'tokens.json'), JSON.stringify(tokens, null, 2));

  // 6. Section content + structure
  console.log('\n📋 Section content...');
  const content = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('section')).map((s, i) => ({
      index: i,
      id: s.id,
      classes: s.className,
      innerHTML_length: s.innerHTML.length,
      headings: Array.from(s.querySelectorAll('h1,h2,h3,h4')).map(h => ({ tag: h.tagName, text: h.textContent.trim() })),
      paragraphs: Array.from(s.querySelectorAll('p')).map(p => p.textContent.trim()).filter(Boolean).slice(0, 10),
      links: Array.from(s.querySelectorAll('a[href]')).map(a => ({ text: a.textContent.trim().substring(0, 50), href: a.href })).slice(0, 15),
      images: Array.from(s.querySelectorAll('img')).map(img => ({ src: (img.currentSrc || img.src || '').substring(0, 100), alt: img.alt })).slice(0, 10)
    }));
  });
  writeFileSync(join(OUT, 'sections.json'), JSON.stringify(content, null, 2));
  console.log(`  ${content.length} sections extracted`);

  await browser.close();
  console.log('\n✅ Done! Check:', OUT);
}

main().catch(console.error);
