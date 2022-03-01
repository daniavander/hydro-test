const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.

(async () => {
  const browser = await chromium.connect({ 
    timeout: 1000,
    wsEndpoint: 'ws:localhost:4444/playwright/chromium' 
  });
  const page = await browser.newPage();
  const baseUrl = 'https://www.kapu.hu'
  await page.goto(baseUrl, { timeout: 50000 })
  await page.screenshot({ path: 'example.png' });
  await page.pause()
  await browser.close();
  console.log("page loaded")
})();

