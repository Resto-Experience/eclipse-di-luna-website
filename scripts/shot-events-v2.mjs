import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(`http://localhost:3001/?v=${Date.now()}`, { waitUntil: 'networkidle', timeout: 60000 });
await p.waitForTimeout(2500);
// Scroll to events cards
await p.evaluate(() => {
  const btns = Array.from(document.querySelectorAll('button')).filter(b => /celebrate|book|cater/i.test(b.textContent || ''));
  if (btns[0]) btns[0].scrollIntoView({ block: 'start' });
});
await p.waitForTimeout(1500);
await p.screenshot({ path: 'events-cards.png' });
// Click first card to trigger modal
const firstBtn = await p.$('button:has-text("Celebrate")');
if (firstBtn) {
  await firstBtn.click();
  await p.waitForTimeout(2500);
  await p.screenshot({ path: 'events-modal.png' });
}
await b.close();
