import { chromium } from 'playwright';

// Quickly probe live pages to confirm: Footer links, location page hero buttons,
// "Order Online" tab destinations (Toast vs UberEats), and form actions.
async function probe(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  // Wait a beat for JS to attach handlers.
  await page.waitForTimeout(800);
  return await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('a, button').forEach((el) => {
      const tag = el.tagName.toLowerCase();
      const text = (el.innerText || el.textContent || '').trim().slice(0, 80);
      const aria = el.getAttribute('aria-label') || '';
      const href = el.getAttribute('href') || '';
      const target = el.getAttribute('target') || '';
      const dataWId = el.getAttribute('data-w-id') || '';
      const onclick = el.getAttribute('onclick') || '';
      const cls = el.className || '';
      if (!text && !aria && !href) return;
      out.push({ tag, text, aria, href, target, dataWId, onclick, cls: typeof cls === 'string' ? cls.slice(0, 80) : '' });
    });
    const forms = [];
    document.querySelectorAll('form').forEach((f) => {
      forms.push({ action: f.getAttribute('action') || '', method: f.getAttribute('method') || '', dataName: f.getAttribute('data-name') || '', id: f.id || '' });
    });
    return { buttons: out, forms };
  });
}

const URLS = [
  'https://www.eclipsediluna.com/',
  'https://www.eclipsediluna.com/location-alpharetta',
  'https://www.eclipsediluna.com/location-beltline',
  'https://www.eclipsediluna.com/location-buckhead',
  'https://www.eclipsediluna.com/location-dunwoody',
  'https://www.eclipsediluna.com/menu',
  'https://www.eclipsediluna.com/menu/menu-alpharetta',
  'https://www.eclipsediluna.com/private-party',
  'https://www.eclipsediluna.com/catering',
  'https://www.eclipsediluna.com/jobs',
  'https://www.eclipsediluna.com/contact-us',
  'https://www.eclipsediluna.com/blog',
];

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const all = {};
  for (const url of URLS) {
    process.stderr.write(`probing ${url}\n`);
    try {
      all[url] = await probe(page, url);
    } catch (e) {
      all[url] = { error: e.message };
    }
  }
  console.log(JSON.stringify(all, null, 2));
  await browser.close();
})();
