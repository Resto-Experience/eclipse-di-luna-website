// Quick focused capture of just the hero (375x812) — live + ours composed.
import { chromium } from 'playwright';
import sharp from 'sharp';

const browser = await chromium.launch();

const ours = await browser.newPage({ viewport: { width: 375, height: 812 } });
await ours.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
await ours.waitForTimeout(3000);
await ours.screenshot({ path: 'extracted/qa/hero-ours.png', clip: { x: 0, y: 0, width: 375, height: 812 } });

const live = await browser.newPage({ viewport: { width: 375, height: 812 } });
await live.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await live.waitForTimeout(5000);
await live.evaluate(() => document.querySelectorAll('[class*="popedad"], [class*="popup"]').forEach(el => el.remove()));
await live.screenshot({ path: 'extracted/qa/hero-live.png', clip: { x: 0, y: 0, width: 375, height: 812 } });

await browser.close();

await sharp({ create: { width: 766, height: 812, channels: 4, background: { r: 240, g: 240, b: 240, alpha: 1 } } })
  .composite([
    { input: 'extracted/qa/hero-live.png', top: 0, left: 0 },
    { input: 'extracted/qa/hero-ours.png', top: 0, left: 391 },
  ])
  .png()
  .toFile('extracted/qa/hero-compose.png');

await sharp('extracted/qa/hero-compose.png').resize({ width: 600 }).toFile('extracted/qa/hero-compose-sm.png');
console.log('done');
