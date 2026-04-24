import { chromium, devices } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ ...devices['iPhone 13'] });
const p = await ctx.newPage();
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3000);
await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await p.waitForTimeout(1500);
await p.screenshot({ path: 'live-footer-mobile.png', fullPage: false });
// full screenshot of just the bottom
await p.screenshot({ path: 'live-footer-full.png', fullPage: true, clip: { x: 0, y: 0, width: 390, height: 844 } });
// structure
const data = await p.evaluate(() => {
  const loc = document.querySelector('.container-34, [class*="container-34"]');
  const chain = [];
  let el = loc;
  for (let i = 0; i < 4; i++) {
    if (!el) break;
    const s = getComputedStyle(el);
    chain.push({ cls: el.className?.slice(0, 60), textAlign: s.textAlign, flex: s.flexFlow, justify: s.justifyContent, align: s.alignItems });
    el = el.parentElement;
  }
  // RestoExp mobile order
  const restoMobile = document.querySelector('.mobile-div, [class*="mobile-div"]');
  const restoHTML = restoMobile?.outerHTML?.slice(0, 2000);
  return { locChain: chain, restoHTML };
});
console.log(JSON.stringify(data, null, 2));
await b.close();
