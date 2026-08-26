import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// Home page
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
await page.screenshot({ path: 'screenshots/01-home.png', fullPage: true });
console.log('✓ Home page captured');

// Catalog page
await page.goto('http://localhost:3000/catalogo', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
await page.screenshot({ path: 'screenshots/02-catalogo.png', fullPage: true });
console.log('✓ Catalog page captured');

// Equipment detail
await page.goto('http://localhost:3000/equipo/rode-ntg1', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
await page.screenshot({ path: 'screenshots/03-equipo.png', fullPage: true });
console.log('✓ Equipment detail captured');

// Planning page
await page.goto('http://localhost:3000/planificar', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
await page.screenshot({ path: 'screenshots/04-planificar.png', fullPage: true });
console.log('✓ Planning page captured');

await browser.close();
console.log('\n📸 All screenshots saved to screenshots/');
