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
    await page.goto(baseUrl)
    //await loginPage.loginInAzure()
  })

  test('cicd azure simple login test', async ({ page }) => {
    await loginPage.loginInAzure()    
  })

})

