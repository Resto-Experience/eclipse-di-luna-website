import { chromium } from 'playwright';
import fs from 'node:fs';

const PAGES = [
  { slug: '', out: 'home' },
  { slug: 'menu', out: 'menu' },
  { slug: 'menu/menu-alpharetta', out: 'menu-alpharetta' },
  { slug: 'location-alpharetta', out: 'location-alpharetta' },
  { slug: 'locations', out: 'locations' },
  { slug: 'private-party', out: 'private-party' },
  { slug: 'catering', out: 'catering' },
  { slug: 'contact-us', out: 'contact-us' },
  { slug: 'jobs', out: 'jobs' },
  { slug: 'blog', out: 'blog' },
];

const b = await chromium.launch();
const results = {};
for (const { slug, out } of PAGES) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await p.goto(`https://www.eclipsediluna.com/${slug}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await p.waitForTimeout(1500);
  } catch (e) { console.error(`fail ${slug}: ${e.message.slice(0,60)}`); await p.close(); continue; }
  const seo = await p.evaluate(() => {
    const meta = (n) => document.querySelector(`meta[name="${n}"]`)?.content || document.querySelector(`meta[property="${n}"]`)?.content;
    const link = (rel) => document.querySelector(`link[rel="${rel}"]`)?.href;
    const jsonld = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => s.textContent);
    return {
      title: document.title,
      description: meta('description'),
      keywords: meta('keywords'),
      ogTitle: meta('og:title'),
      ogDescription: meta('og:description'),
      ogImage: meta('og:image'),
      ogUrl: meta('og:url'),
      ogType: meta('og:type'),
      twitterCard: meta('twitter:card'),
      twitterTitle: meta('twitter:title'),
      twitterDescription: meta('twitter:description'),
      twitterImage: meta('twitter:image'),
      canonical: link('canonical'),
      favicon: link('icon') || link('shortcut icon'),
      lang: document.documentElement.lang,
      jsonld,
    };
  });
  results[out] = seo;
  console.log(`[${out}] ${seo.title?.slice(0, 50)}`);
  await p.close();
}
fs.writeFileSync('seo-live.json', JSON.stringify(results, null, 2));
console.log('\nSaved to seo-live.json');
await b.close();
