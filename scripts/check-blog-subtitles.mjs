import { chromium } from 'playwright';
const b = await chromium.launch();
const urls = [
  'tapas-bar-good-food-and-fresh-drinks-in-alpharetta-ga',
  'ensalada-de-manzana-a-fresh-counterpoint-on-the-tapas-table-y4321',
  'ceviche-de-pescado-at-eclipse-di-luna',
  'mejillones-en-salsa-de-jitomate-the-perfect-coastal-meal',
  'pulpo-a-la-gallega-experience-galicias-signature-octopus',
];
for (const slug of urls) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  try { await p.goto(`https://www.eclipsediluna.com/blog/${slug}`, { waitUntil: 'domcontentloaded', timeout: 45000 }); } catch {}
  await p.waitForTimeout(2000);
  const data = await p.evaluate(() => {
    const h1 = document.querySelector('h1');
    const sub = Array.from(document.querySelectorAll('p')).find(p => {
      const r = p.getBoundingClientRect();
      return r.top < 600 && /[A-Z]{3,}/.test(p.textContent || '') && p.textContent.trim().length < 80;
    });
    const hero = document.querySelector('section');
    return { h1: h1?.textContent?.trim(), subtitle: sub?.textContent?.trim(), heroBg: hero ? getComputedStyle(hero).backgroundImage?.slice(0, 180) : null };
  });
  console.log(`${slug}: "${data.subtitle}"`);
  await p.close();
}
await b.close();
