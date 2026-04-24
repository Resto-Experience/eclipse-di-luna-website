import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(`http://localhost:3001/?v=${Date.now()}`, { waitUntil: 'networkidle', timeout: 60000 });
await p.waitForTimeout(2500);
await p.screenshot({ path: 'home-fold.png' });
// Also test mid scroll to see reveals mid-journey
await p.evaluate(() => window.scrollTo(0, 1200));
await p.waitForTimeout(1500);
await p.screenshot({ path: 'home-mid.png' });
await b.close();
