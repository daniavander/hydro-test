import { test, expect } from "@playwright/test"
import { loginToIMS } from "../fixtures/helpers"
import { LoginPage } from "../page-objects/LoginPage"


test.describe("cicd azure simple login test", () => {
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    const baseUrl = 'https://stage-app-avander-ims-ui.azurewebsites.net'
    await page.goto(baseUrl, { timeout: 50000 })
    await loginPage.loginInAzure(page)
  })

  

  test("testinfo", async ({ page }, testInfo) => {
    await page.goto('https://www.example.com')
    console.log(testInfo.title)
  })

  test('cicd azure simple login test', async ({ page }) => {
    //await page.pause()
    await page.screenshot({ path: 'screenshot0.png', fullPage: true });
    await page.locator('#i0116').type('imstestglobaladmin1@avander.hu')
    await page.keyboard.press('Enter');
    await page.screenshot({ path: 'screenshot1.png', fullPage: true });
    await page.waitForSelector('#displayName')
    await page.locator('#i0118').type('123ims456!')
    await page.screenshot({ path: 'screenshot2.png', fullPage: true });
    await page.keyboard.press('Enter')
    await page.waitForSelector('text=Yes')
    await page.locator('text=Yes').click()
    await console.log("last step next")
    await page.screenshot({ path: 'screenshot3.png', fullPage: true });
    //await page.pause()
    await page.locator(".top-menu-container").screenshot({ path: 'side-panel-content.png' })
    await page.locator(".dashboard-qr-code-a").screenshot({ path: 'side-panel-content.png' })
  })
})

