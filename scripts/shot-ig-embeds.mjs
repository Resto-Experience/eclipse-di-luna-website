import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(`http://localhost:3001/?v=${Date.now()}`, { waitUntil: 'networkidle', timeout: 60000 });
await p.waitForTimeout(3000);
// Scroll to events and then down past the banners
await p.evaluate(() => {
  const iframes = document.querySelectorAll('iframe[src*="instagram"]');
  if (iframes[0]) iframes[0].scrollIntoView({ block: 'start' });
});
await p.waitForTimeout(3500);
await p.screenshot({ path: 'home-ig-embeds.png' });
await b.close();
