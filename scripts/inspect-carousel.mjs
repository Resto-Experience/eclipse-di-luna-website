// Find About carousel slides on live: click dots, capture each slide image src.
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
await page.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(3000);
await page.evaluate(() => document.querySelectorAll('[class*="popedad"], [class*="popup"]').forEach(el => el.remove()));

// Scroll to about section (where Frame 1000008915 lives)
await page.evaluate(async () => {
  await new Promise((r) => { let t = 0; const i = setInterval(() => { window.scrollBy(0, 300); t += 300; if (t >= document.body.scrollHeight) { clearInterval(i); r(); } }, 80); });
});
await page.waitForTimeout(2000);
await page.evaluate(() => window.scrollTo(0, 600));
await page.waitForTimeout(1000);

// Detect carousel structure
const info = await page.evaluate(() => {
  // Find dots near About section. Common patterns: .swiper-pagination-bullet, .slider-dot, etc.
  const dots = document.querySelectorAll('[class*="bullet"], [class*="indicator"], [class*="dot"]');
  return {
    dotsFound: dots.length,
    dotsClasses: Array.from(dots).slice(0, 8).map(d => ({
      tag: d.tagName,
      class: d.className,
      ariaLabel: d.getAttribute('aria-label'),
      role: d.getAttribute('role'),
    })),
  };
});
console.log('Dots found:', JSON.stringify(info, null, 2));

// Look for Webflow-style slider structure
const sliderInfo = await page.evaluate(() => {
  // Webflow uses .w-slider, .w-slide, .w-slider-mask, .w-slider-dot
  const slider = document.querySelector('.w-slider');
  if (!slider) return { found: false };
  const slides = slider.querySelectorAll('.w-slide');
  const dots = slider.querySelectorAll('.w-slider-dot');
  return {
    found: true,
    slidesCount: slides.length,
    dotsCount: dots.length,
    slides: Array.from(slides).map((s, i) => ({
      i,
      class: s.className,
      inner: s.innerHTML.slice(0, 200),
      images: Array.from(s.querySelectorAll('img')).map(img => img.currentSrc || img.src),
    })),
  };
});
console.log('\nSlider info:', JSON.stringify(sliderInfo, null, 2));

await browser.close();
