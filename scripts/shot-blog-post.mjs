import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 2400 } });
await p.goto(`http://localhost:3001/blog/tapas-bar-good-food-and-fresh-drinks-in-alpharetta-ga?v=${Date.now()}`, { waitUntil: 'networkidle', timeout: 60000 });
await p.waitForTimeout(2500);
await p.screenshot({ path: 'blog-post-mine-full.png', fullPage: true });
await b.close();
