import { test, expect } from "@playwright/test"
import { LoginPage } from "../page-objects/LoginPage"


test.describe("cicd azure describe", () => {
  let loginPage: LoginPage

  function delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time)
    });
  }


  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)

    const baseUrl = 'https://stage-app-avander-ims-ui.azurewebsites.net'
    await page.goto(baseUrl, { timeout: 70000 })
    //await loginPage.loginInAzure()
  })

  test('cicd azure simple login test', async ({ page }) => {
    await loginPage.loginInAzure()

    /*
    console.log('before waiting');
    await ghostCard.screenshot({ path: 'screenshot/side-panel-content1.png' })
    await delay(15000);
    console.log('after waiting 15 sec');
    await ghostCard.screenshot({ path: 'screenshot/side-panel-content2.png' })*/

    //await this.page.locator(".top-menu-container").screenshot({ path: 'screenhot/header.png' })
    
  })

  /*test('cicd expect', async ({ page }) => {
    await console.log("expect")
    expect(page.isVisible("side-panel-content obs_clearfix"))
  })

  test('cicd isVisible', async ({ page }) => {
    await console.log("isvisible")
    await (await page.waitForSelector('.side-panel-content')).isVisible()
    await page.locator(".side-panel-content").elementHandle()
    await page.waitForTimeout(10000)
  })*/

})

