import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(4000);

// Force-reveal and inspect popup sections directly (they're in DOM, just hidden)
const data = await p.evaluate(() => {
  const result = {};
  ['popup-reservetable', 'popup-orderonline', 'popup-giftcard'].forEach(name => {
    const el = document.querySelector(`.${name}`);
    if (el) {
      result[name] = {
        cls: el.className,
        outerHTML: el.outerHTML?.slice(0, 4000),
      };
    }
  });
  // Hero buttons
  const btns = Array.from(document.querySelectorAll('a.link-block.linkreserve, a[class*="order"], a.btn-location')).slice(0, 6).map(el => ({
    text: el.textContent?.trim().slice(0, 40),
    href: el.getAttribute('href'),
    cls: el.className?.slice(0, 120),
    dataId: el.getAttribute('data-w-id'),
  }));
  return { popups: result, btns };
});
console.log(JSON.stringify(data, null, 2));
await b.close();
