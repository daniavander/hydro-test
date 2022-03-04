import { test, expect } from "@playwright/test"
import { LoginPage } from "../page-objects/LoginPage"


test.describe("cicd azure describe", () => {
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    
    const baseUrl = 'https://stage-app-avander-ims-ui.azurewebsites.net'
    await page.goto(baseUrl, { timeout: 50000 })
    //await loginPage.loginInAzure()
  })  

  test('cicd azure simple login test', async ({ page }) => {
    await console.log("loog")
    await page.locator(".dashboard-qr-code-a").screenshot({ path: 'side-panel-content.png' })
  })

  test('cicd expect', async ({ page }) => {
    await console.log("expect")
    expect(page.isVisible(".side-panel-content"))
  })

  test('cicd isVisible', async ({ page }) => {
    await console.log("isvisible")
    await (await page.waitForSelector('.side-panel-content')).isVisible()
    await page.locator(".side-panel-content").elementHandle()
    //await page.waitForTimeout(5000)
  })

})

