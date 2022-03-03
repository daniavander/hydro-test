import { test, expect } from "@playwright/test"


test.describe("cicd azure simple login test", () => {

  test.beforeEach(async ({ page }) => {
    const baseUrl = 'https://stage-app-avander-ims-ui.azurewebsites.net'
    await page.goto(baseUrl, { timeout: 50000 })
  })

  test('cicd azure simple login test', async ({ page }) => {
    //await page.pause()
    await page.screenshot({ path: 'screenshot0.png' , fullPage: true});
    await page.locator('#i0116').type('imstestglobaladmin1@avander.hu')
    await page.keyboard.press('Enter');
    await page.screenshot({ path: 'screenshot1.png' , fullPage: true});
    await page.waitForSelector('#displayName', {timeout: 30000})
    await page.locator('#i0118').type('123ims456!')
    await page.screenshot({ path: 'screenshot2.png' , fullPage: true});
    await page.keyboard.press('Enter')
    await page.keyboard.press('Enter')
    await console.log("last step next")
    await page.screenshot({ path: 'screenshot3.png' , fullPage: true});
    //await page.locator(".top-menu-container").screenshot({ path: 'side-panel-content.png'})
  })
})

