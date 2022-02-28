import { test } from "@playwright/test"

const chai = require('chai')
const expect = chai.expect



test.describe("my first test suite", () => {

  test.beforeEach(async ({ page }) => {

    const baseUrl = 'https://stage-app-avander-ims-ui.azurewebsites.net'
    await page.screenshot({ path: 'homepage.png' });
    await page.goto(baseUrl)
    await page.screenshot({ path: 'homepage0.png' });
  })

  test('Add new injury free event', async ({ page }) => {

    //await page.pause()
    //await page.locator(".side-panel-content").waitFor()
    //await page.pause()
    //console.log(await page.title())

    function delay(time) {
      return new Promise(function (resolve) {
        setTimeout(resolve, time)
      });
    }
    console.log('before waiting');
    await delay(15000);
    console.log('after waiting 15 sec');

    const response = await page.waitForResponse(response => response.status() === 200);
    console.log('RESPONSE ' + (await response.body()))
    console.log('STATUS ' + (await response.status()))

    await page.screenshot({ path: 'homepage1.png' });
    /*await page.locator("#i0116").type("ImsTestGlobalAdmin1@avander.hu")
    await page.keyboard.press("Enter");

    await page.locator("#i0118").type("123ims456!")
    await page.keyboard.press("Enter");

    await page.locator('text=No')
    page.locator('text=No').click()

    const ghostCard = await page.locator(".side-panel-content")
    await ghostCard.screenshot({ path: 'side-panel-content.png' })*/
  })
})

