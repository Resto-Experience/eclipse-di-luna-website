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
    const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.display !== 'none'; };
    // Location headings in footer
    const locHead = Array.from(document.querySelectorAll('a.text-block-5, div.text-block-5')).filter(vis).slice(0, 2).map(el => {
      const s = getComputedStyle(el);
      const icon = el.parentElement?.querySelector('img');
      return {
        text: el.textContent?.trim(), font: s.fontFamily, size: s.fontSize, weight: s.fontWeight, color: s.color,
        iconSrc: icon?.src, iconW: Math.round(icon?.getBoundingClientRect().width || 0),
        parentHTML: el.parentElement?.outerHTML?.slice(0, 400),
      };
    });
    // Sublinks under location (Menu, Entertainment etc)
    const subLinks = Array.from(document.querySelectorAll('a')).filter(vis).filter(a => {
      const t = a.textContent?.trim() || '';
      const r = a.getBoundingClientRect();
      return /^(menu|entertainment|deals|order online)$/i.test(t) && r.top > 4000;
    }).slice(0, 4).map(a => ({
      text: a.textContent.trim(), font: getComputedStyle(a).fontFamily, size: getComputedStyle(a).fontSize,
      weight: getComputedStyle(a).fontWeight, color: getComputedStyle(a).color,
    }));
    // Resto Experience footer
    const restoEl = Array.from(document.querySelectorAll('*')).filter(vis).find(el => /powered by/i.test(el.textContent || '') && el.textContent.trim().length < 120);
    const restoData = restoEl ? {
      text: restoEl.textContent.trim(),
      html: restoEl.outerHTML?.slice(0, 800),
      parent: restoEl.parentElement?.outerHTML?.slice(0, 800),
    } : null;
    // Footer mobile layout direction
    const footer = document.querySelector('footer, [class*="footer"]');
    const footerLayout = footer ? (() => {
      const s = getComputedStyle(footer);
      const r = footer.getBoundingClientRect();
      return { w: Math.round(r.width), textAlign: s.textAlign };
    })() : null;
    return { locHead, subLinks, restoData, footerLayout };
  });
  if (ctx) await ctx.close(); else await p.close();
  return data;
}

console.log('\n=== DESKTOP ===\n', JSON.stringify(await inspect(false), null, 2));
console.log('\n=== MOBILE ===\n', JSON.stringify(await inspect(true), null, 2));
await b.close();
