//import * as data from "../../Login.cred.json"
import { matchers } from 'playwright-expect';
import { allure } from "allure-playwright";
import { expect } from "@fixtures/basePages"
import test from "@fixtures/basePages"

import { siteNames, entities, caseType, secLevels, departments, stringConstants, classesUnderAction3Dot, siteShortNames, raMenuNames, frequency, riskMainTypes } from "@fixtures/constans"

/// <reference path="@fixtures/basePages" />

namespace Constants{
//test.describe.configure({ mode: 'parallel' })
test.use({
  baseURL: "https://google.com"
})

test.describe("Smoke test pack", () => {
  const baseURL = "https://stage-app-avander-ims-ui.azurewebsites.net/"
  //const baseURL = "https://ims2uat.hydro.com/"

  test.beforeEach(async ({ loginPage, page, dashBoard }) => {
    await page.goto(baseURL, { timeout: 100000 })
    //fyi comment out when run locally
    //await loginPage.loginInAzure()
  })
  test.afterEach(async ({ page }, testInfo) => {
    await page.waitForTimeout(6000)
  })
  test.afterAll(async ({ browser }) => {
    await browser.close()
  })
  test('31035 - Smoke test - Activity list @response', async ({ dashBoard, navBar, page, commonFunc, raPage }) => {
    //await dashBoard.sidebarIsVisible()
    //page.locator(".side-panel-content")
    await navBar.clickOnTopMenu("Risk Assessment")

    try {
      console.log("try to reset the filters")
      await page.click("#reset-filter-button", { timeout: 5000 })
      console.log("reseted")
    } catch (error) {
      console.log(error)
    }

    await expect(page.locator("data-testid=site-selector")).toHaveAttribute('title', 'All MY sites')

    await commonFunc.searchCaseWithFilters("Risk Assessment", siteNames.auto, departments.hse)
    //await page.pause()
    //hover three dot
    for (let index = 2; index < 20; index++) {
      await page.hover("(//div[contains(@class,'submenu submenu-comp')])[2]")
      //detailed page
      await page.click("(//a[@class='icon-details'])[1]")
      await raPage.addRADetails(raMenuNames.delete)
      await page.waitForTimeout(2000)
      console.log("loop: " + index)
    }
  })


})
}
