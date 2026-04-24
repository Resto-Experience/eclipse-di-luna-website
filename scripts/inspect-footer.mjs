import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3000);
await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await p.waitForTimeout(1500);
const data = await p.evaluate(() => {
  const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.display !== 'none'; };
  const footer = document.querySelector('footer, [class*="footer"]');
  const locHeads = Array.from(document.querySelectorAll('h3, h4, [class*="heading"]')).filter(vis).filter(el => {
    const t = el.textContent?.trim();
    return /alpharetta|beltline|buckhead|dunwoody|more/i.test(t || '') && t.length < 30;
  });
  const locHeadData = locHeads.slice(0, 6).map(h => ({
    text: h.textContent.trim(),
    font: getComputedStyle(h).fontFamily, size: getComputedStyle(h).fontSize, weight: getComputedStyle(h).fontWeight, color: getComputedStyle(h).color,
    icon: h.querySelector('img, svg')?.outerHTML?.slice(0, 200),
  }));
  const footerLinks = footer ? Array.from(footer.querySelectorAll('a')).filter(vis).slice(0, 10).map(a => ({
    text: a.textContent.trim(),
    href: a.getAttribute('href'),
    font: getComputedStyle(a).fontFamily, size: getComputedStyle(a).fontSize, weight: getComputedStyle(a).fontWeight, color: getComputedStyle(a).color,
  })) : [];
  return { locHeadData, footerLinks };
});
console.log(JSON.stringify(data, null, 2));
await b.close();
