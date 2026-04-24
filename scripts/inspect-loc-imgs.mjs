import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3000);

const imgs = await p.evaluate(() => {
  const a = Array.from(document.querySelectorAll('img')).filter(i => {
    const r = i.getBoundingClientRect();
    const y = r.top + window.scrollY;
    return r.width > 200 && y > 1000 && y < 4500;
  });
  return a.slice(0, 8).map(i => ({
    src: i.src.slice(-80),
    w: Math.round(i.getBoundingClientRect().width),
    h: Math.round(i.getBoundingClientRect().height),
    y: Math.round(i.getBoundingClientRect().top + window.scrollY),
    radius: getComputedStyle(i).borderRadius,
    parentRadius: getComputedStyle(i.parentElement || i).borderRadius,
    alt: i.alt?.slice(0, 40),
  }));
});
console.log(JSON.stringify(imgs, null, 2));
await b.close();
