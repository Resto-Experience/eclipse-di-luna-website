import { chromium, devices } from 'playwright';
const b = await chromium.launch();

async function inspect(isMobile) {
  const ctx = isMobile ? await b.newContext({ ...devices['iPhone 13'] }) : null;
  const p = ctx ? await ctx.newPage() : await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await p.waitForTimeout(3000);
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await p.waitForTimeout(1500);
  const data = await p.evaluate(() => {
    // Find powered by bar at very bottom (white bg)
    const allDivs = Array.from(document.querySelectorAll('div')).filter(d => {
      const s = getComputedStyle(d);
      return s.backgroundColor === 'rgb(255, 255, 255)' || s.backgroundColor.startsWith('rgb(255, 255, 255)');
    });
    const restos = allDivs.filter(d => /resto.*experience|powered by|restaurant marketing/i.test(d.textContent || '')).slice(0, 3).map(d => ({
      cls: d.className?.slice(0, 80),
      text: d.textContent?.trim().slice(0, 200),
      html: d.outerHTML?.slice(0, 1500),
    }));
    // Mobile layout of location columns
    const footer = document.querySelector('footer, [class*="footer"]');
    const locGrid = footer?.querySelector('[class*="container"] [class*="grid"]');
    const locData = locGrid ? (() => {
      const s = getComputedStyle(locGrid);
      return { textAlign: s.textAlign, display: s.display, gridTemplateColumns: s.gridTemplateColumns, justifyContent: s.justifyContent, alignItems: s.alignItems };
    })() : null;
    // Find any location heading element to check if centered
    const locHeadAlign = Array.from(document.querySelectorAll('a.text-block-5')).slice(0, 2).map(el => {
      let par = el.parentElement;
      const chain = [];
      for (let i = 0; i < 4; i++) {
        if (!par) break;
        const s = getComputedStyle(par);
        chain.push({ cls: par.className?.slice(0, 50), flex: s.flexFlow, justify: s.justifyContent, align: s.alignItems, textAlign: s.textAlign });
        par = par.parentElement;
      }
      return chain;
    });
    return { restos, locData, locHeadAlign };
  });
  if (ctx) await ctx.close(); else await p.close();
  return data;
}

console.log('\n=== DESKTOP ===');
const d = await inspect(false);
console.log('RESTOEXP:', JSON.stringify(d.restos, null, 2));
console.log('\n=== MOBILE ===');
const m = await inspect(true);
console.log('RESTOEXP:', JSON.stringify(m.restos, null, 2));
console.log('\nLocation head chain:', JSON.stringify(m.locHeadAlign, null, 2));
await b.close();
