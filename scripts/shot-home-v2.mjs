import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(`http://localhost:3001/?v=${Date.now()}`, { waitUntil: 'networkidle', timeout: 60000 });
await p.waitForTimeout(2500);
await p.evaluate(() => {
  const h = Array.from(document.querySelectorAll('h2')).find(h => /vibrant/i.test(h.textContent || ''));
  if (h) h.scrollIntoView({ block: 'start' });
});
await p.waitForTimeout(2000);
await p.screenshot({ path: 'home-loc-2.png' });
await p.evaluate(() => {
  const h = Array.from(document.querySelectorAll('h2')).find(h => /celebrate|gather/i.test(h.textContent || ''));
  if (h) h.scrollIntoView({ block: 'start' });
});
await p.waitForTimeout(2000);
await p.screenshot({ path: 'home-events-2.png' });
await b.close();
