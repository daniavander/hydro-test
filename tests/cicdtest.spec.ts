import { test, expect } from "@playwright/test"

const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.


test.describe("my first test suite", () => {

  test.beforeEach(async () => {
    const browser = await chromium.connect({ 
      timeout: 1000,
      wsEndpoint: 'ws://100.94.43.39:4444/wd/hub' 
    });
    const page = await browser.newPage();
    const baseUrl = 'https://www.kapu.hu'
    await page.goto(baseUrl, { timeout: 50000 })
  })

  test('cicd test', async ({ page }) => {

    // Click input[name="search"]
    await page.locator('input[name="search"]').type('avander')
    await console.log("last step next")
    await page.locator('.gsc-search-button.gsc-search-button-v2').click();
  })
})

