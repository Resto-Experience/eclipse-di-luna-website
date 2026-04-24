import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(4000);

const data = await p.evaluate(() => {
  const el = document.querySelector('.popup-reservetable');
  if (!el) return { found: false };
  // outerHTML with deeper dive
  return {
    found: true,
    outerHTML: el.outerHTML,
    childrenStructure: Array.from(el.querySelectorAll('*')).slice(0, 40).map(c => ({
      tag: c.tagName,
      cls: c.className?.toString().slice(0, 100),
      text: c.textContent?.trim().slice(0, 80),
    })),
  };
});
console.log(JSON.stringify(data, null, 2).slice(0, 8000));
await b.close();
