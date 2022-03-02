import { test, expect } from "@playwright/test"
import { Dashboard } from "../page-objects/common/Dashboard"

const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.


test.describe("my first test suite", () => {
  
  const clientId = "5aea3d4b-9d0d-48d6-8b21-57d355cc3a3f";
  const tenantId = "56394630-8e65-4116-8410-06ee2cb2df2f";
  const client_secret = "XmZ7Q~F64qYnEk_z0FCc61wSV9mG0US14gKqC";

  let dashBoard: Dashboard

  test.beforeEach(async ({ page }) => {

    dashBoard = new Dashboard(page)

    const baseUrl = 'https://stage-app-avander-ims-ui.azurewebsites.net'
    await page.goto(baseUrl, { timeout: 50000 })

    
  })

  test('cicd simple login test', async ({ page }) => {


    // Click input[name="search"]
    await page.pause()
    await page.locator('#i0116').type('imstestglobaladmin1@avander.hu')
    await page.keyboard.press('Enter');
    await page.locator('#i0118').type('123ims456!s')
    await page.keyboard.press('Enter')
    await page.keyboard.press('Enter')
    await console.log("last step next")
    await page.screenshot({ path: 'screenshot.png' });

    const ghostCard = await page.locator(".top-menu-container")
    await ghostCard.screenshot({ path: 'side-panel-content.png' })
  })

})

