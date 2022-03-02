import { test, expect } from "@playwright/test"

const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.


test.describe("my first test suite", () => {
  
  const clientId = "5aea3d4b-9d0d-48d6-8b21-57d355cc3a3f";
  const tenantId = "56394630-8e65-4116-8410-06ee2cb2df2f";
  const client_secret = "XmZ7Q~F64qYnEk_z0FCc61wSV9mG0US14gKqC";


  test.beforeEach(async ({ page }) => {

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

