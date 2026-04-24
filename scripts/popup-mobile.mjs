import { chromium, devices } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ ...devices['iPhone 13'] });
const p = await ctx.newPage();
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3500);
const d = await p.evaluate(() => {
  const el = document.querySelector('.container-138, .ppup');
  if (!el) return null;
  const s = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  return { bg: s.backgroundImage, w: Math.round(r.width), h: Math.round(r.height) };
});
console.log(JSON.stringify(d, null, 2));
await b.close();
