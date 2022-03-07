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
    await console.log("login azure webkit")
    
    var emailaddress = "ImsTestGlobalAdmin1@avander.hu"

    await page.type("id=i0116",emailaddress)
    await page.locator('text=Next').click()
    await page.screenshot({ path: 'screenshot/screenshot.png' });
    //await delay(2000);

    var pwd = "123ims456!"
    await page.type("id=i0118",pwd , { timeout: 10000 } )
    //await delay(2000);
    await page.locator('text=Sign in').click( { timeout: 10000 } )
    await page.screenshot({ path: 'screenshot/screenshot2.png' });
    await delay(15000);
    console.log('after waiting 15 sec');
    await page.screenshot({ path: 'screenshot/side-panel-content2.png' })
    await page.locator('text=Yes').click( { timeout: 10000 } )
    //await delay(5000);
    await page.screenshot({ path: 'screenshot/screenshot3.png' });

    /*const ghostCard = await page.locator(".side-panel-content")
    await ghostCard.screenshot({ path: 'screenshot/side-panel-content.png' })

    console.log('before waiting');
    await ghostCard.screenshot({ path: 'screenshot/side-panel-content1.png' })
    await delay(15000);
    console.log('after waiting 15 sec');
    await ghostCard.screenshot({ path: 'screenshot/side-panel-content2.png' })*/

    //await this.page.locator(".top-menu-container").screenshot({ path: 'screenhot/header.png' })
    //await page.waitForSelector(".dashboard-qr-code-a")
    //await page.locator(".dashboard-qr-code-a").screenshot({ path: 'screenhot/qr-code.png' })
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

