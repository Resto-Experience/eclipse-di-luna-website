// For each location page, find every link/iframe that mentions opentable.com (outside the popup-reservetable),
// and find any inline OT widget config (rid=...) embedded in body sections.
// Also check whether 'popup-giftcard' or 'popup-orderonline' or 'buy a gift card' / 'order online' buttons exist.
import { chromium } from 'playwright';

const path = process.argv[2] || '/location-alpharetta';
const url = `https://www.eclipsediluna.com${path}`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3500);

const out = await p.evaluate(() => {
  const result = { url: location.href };

  // Are these popups present?
  result.hasGiftCardPopup = !!document.querySelector('.popup-giftcard');
  result.hasOrderOnlinePopup = !!document.querySelector('.popup-orderonline');
  result.hasReservePopup = !!document.querySelector('.popup-reservetable');

  // Every anchor with opentable in its href
  result.openTableLinks = Array.from(document.querySelectorAll('a[href*="opentable"]')).map((a) => ({
    text: (a.textContent || '').trim().slice(0, 80),
    href: a.getAttribute('href'),
    cls: a.className?.toString().slice(0, 120),
  }));

  // Every script src containing opentable
  result.openTableScripts = Array.from(document.querySelectorAll('script[src*="opentable"]')).map((s) => ({
    src: s.getAttribute('src'),
    parentCls: s.parentElement?.className?.toString().slice(0, 160),
    parentChain: (() => {
      let n = s.parentElement;
      const chain = [];
      while (n && n !== document.body && chain.length < 6) {
        chain.push(n.tagName + '.' + (n.className?.toString().slice(0, 80) || ''));
        n = n.parentElement;
      }
      return chain;
    })(),
  }));

  // Buttons that say "order online", "buy a gift card", "gift", reservations
  const all = Array.from(document.querySelectorAll('a, button'));
  result.relevantButtons = all
    .filter((a) => {
      const t = (a.textContent || '').trim().toLowerCase();
      return /order online|gift card|buy a gift|reserve|reservation|book now/i.test(t) && t.length < 60;
    })
    .map((a) => ({
      text: (a.textContent || '').trim(),
      href: a.getAttribute('href'),
      cls: a.className?.toString().slice(0, 140),
    }));

  return result;
});

console.log(JSON.stringify(out, null, 2));
await b.close();
