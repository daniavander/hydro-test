import { test, expect } from "@playwright/test"

import { Navbar } from "../page-objects/common/Navbar"
import { Dashboard } from "../page-objects/common/Dashboard"
import { AddUserAction } from "../page-objects/common/AddUserAction"
import { CasePage } from "../page-objects/CasePage"
//import { secLevels } from "../page-objects/common/constans"
import { caseType, secLevels, departments } from "../page-objects/common/constans"

import { waitForClass } from "../helpers"

test.describe("my first test suite", () => {
  let navBar: Navbar
  let dashBoard: Dashboard
  let casePage: CasePage
  let addUserAction: AddUserAction

  test.beforeEach(async ({ page }) => {
    navBar = new Navbar(page)
    dashBoard = new Dashboard(page)
    casePage = new CasePage(page)
    addUserAction = new AddUserAction(page)
    const baseUrl = 'https://stage-app-avander-ims-ui.azurewebsites.net'
    await page.screenshot({ path: 'homepage.png' });
    await page.goto(baseUrl)
    await page.screenshot({ path: 'homepage0.png' });
  })

  test('Add new injury free event', async ({ page }) => {

    await page.locator(".side-panel-content").waitFor()
    /*await page.screenshot({ path: 'homepage1.png' });
    await page.locator("#i0116").type("ImsTestGlobalAdmin1@avander.hu")
    await page.keyboard.press("Enter");

    await page.locator("#i0118").type("123ims456!")
    await page.keyboard.press("Enter");

    const ghostCard = await page.locator(".side-panel-content")
    await ghostCard.screenshot({ path: 'side-panel-content.png' })*/
  })
})

