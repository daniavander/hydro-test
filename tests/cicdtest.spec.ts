import { test, expect } from "@playwright/test"

import { Navbar } from "../page-objects/common/Navbar"
import { Dashboard } from "../page-objects/common/Dashboard"
import { CasePage } from "../page-objects/CasePage"
import { caseType, secLevels, departments } from "../page-objects/common/constans"


test.describe("my first test suite", () => {
  let navBar: Navbar
  let dashBoard: Dashboard
  let casePage: CasePage

  test.beforeEach(async ({ page }) => {
    navBar = new Navbar(page)
    dashBoard = new Dashboard(page)
    casePage = new CasePage(page)
    //const baseUrl = 'https://stage-app-avander-ims-ui.azurewebsites.net/app/'
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

