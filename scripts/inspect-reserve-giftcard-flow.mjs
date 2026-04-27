// Inspect Reserve + GiftCard flow across home + per-location pages.
// Usage: node scripts/inspect-reserve-giftcard-flow.mjs [path]
// Defaults to '/'. Outputs JSON to stdout.
import { chromium } from 'playwright';

const path = process.argv[2] || '/';
const url = `https://www.eclipsediluna.com${path}`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(4000);

// Force-reveal every popup we can find
await p.evaluate(() => {
  const sels = [
    '.popup-reservetable',
    '.popup-orderonline',
    '.popup-giftcard',
    '[class*="popup-reserve"]',
    '[class*="popup-gift"]',
    '[class*="popup-order"]',
  ];
  sels.forEach((s) => {
    document.querySelectorAll(s).forEach((el) => {
      el.style.display = 'flex';
      el.style.zIndex = '99999';
      el.style.visibility = 'visible';
      el.style.opacity = '1';
    });
  });
});
await p.waitForTimeout(1500);

const data = await p.evaluate(() => {
  const out = { url: location.href, popups: {}, reserveButtons: [], giftCardButtons: [] };

  // Catalog every popup-* class element on the page
  const popupEls = Array.from(document.querySelectorAll('[class*="popup-"]'));
  const seen = new Set();
  popupEls.forEach((el) => {
    const cls = el.className?.toString() || '';
    if (!cls || seen.has(cls)) return;
    seen.add(cls);
    // only top-level popup wrappers (heuristic: contain h2 or iframe)
    const h2 = el.querySelector('h2');
    const p1 = el.querySelector('p');
    const iframes = Array.from(el.querySelectorAll('iframe')).map((f) => ({
      src: f.getAttribute('src') || '',
      id: f.id,
    }));
    const links = Array.from(el.querySelectorAll('a')).map((a) => ({
      text: a.textContent?.trim().slice(0, 80),
      href: a.getAttribute('href'),
    }));
    // OpenTable widget config: data-rid / data-multi / scripts
    const otScripts = Array.from(el.querySelectorAll('script')).map((s) => ({
      src: s.getAttribute('src') || '',
      text: s.textContent?.slice(0, 400) || '',
    }));
    const otDiv = el.querySelector('[data-rid], [data-multi], #ot-reservation-widget, [class*="ot-"]');
    const otAttrs = otDiv
      ? Object.fromEntries(Array.from(otDiv.attributes).map((a) => [a.name, a.value]))
      : null;
    if (h2 || iframes.length || links.length) {
      out.popups[cls.trim()] = {
        h2: h2?.textContent?.trim() || null,
        p: p1?.textContent?.trim() || null,
        iframes,
        links,
        otScripts: otScripts.filter((s) => s.src.includes('opentable') || s.text.includes('rid=') || s.text.includes('OT_widget')),
        otAttrs,
        outerHTMLslice: el.outerHTML.slice(0, 2500),
      };
    }
  });

  // Reserve / Book / Reservation buttons
  const all = Array.from(document.querySelectorAll('a, button'));
  all.forEach((b) => {
    const t = (b.textContent || '').trim();
    if (!t) return;
    if (/reserve|book|reservation/i.test(t) && t.length < 60) {
      out.reserveButtons.push({
        text: t,
        href: b.getAttribute('href'),
        cls: b.className?.toString().slice(0, 150),
        // popup target attribute (Webflow uses data-w-id / w-popup or onclick)
        onclick: b.getAttribute('onclick'),
        dataAttrs: Object.fromEntries(
          Array.from(b.attributes)
            .filter((a) => a.name.startsWith('data-'))
            .map((a) => [a.name, a.value]),
        ),
      });
    }
    if (/gift card|gift-card|giftcard|buy here/i.test(t) && t.length < 80) {
      out.giftCardButtons.push({
        text: t,
        href: b.getAttribute('href'),
        cls: b.className?.toString().slice(0, 150),
        onclick: b.getAttribute('onclick'),
      });
    }
  });

  // Also dig the raw page HTML for any rid= references and toasttab gift-card URLs
  const html = document.documentElement.outerHTML;
  const rids = Array.from(html.matchAll(/rid=(\d+)/g)).map((m) => m[1]);
  const ridUnique = [...new Set(rids)];
  const toast = Array.from(html.matchAll(/https?:\/\/(?:www\.)?toasttab\.com\/[^"'\s<>]+/g)).map((m) => m[0]);
  const toastUnique = [...new Set(toast)];
  const otIframeSrcs = Array.from(html.matchAll(/https?:\/\/(?:www\.)?opentable\.com\/[^"'\s<>]+/g)).map((m) => m[0]);
  out.rawScan = { rids: ridUnique, toastUrls: toastUnique, openTableUrls: [...new Set(otIframeSrcs)] };

  return out;
});

console.log(JSON.stringify(data, null, 2));
await b.close();
