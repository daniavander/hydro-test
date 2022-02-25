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
    const baseUrl = 'https://stage-app-avander-ims-ui.azurewebsites.net/app/'
    //const baseUrl = 'https://steeldecor.hu'
    await page.goto(baseUrl, { timeout: 50000 })
  })

  test('cicd test', async ({ page }) => {

    await dashBoard.sidebarIsVisible()
    await dashBoard.topBarIsAvailable()
    //await page.pause()

    await navBar.clickOnTopMenu("Add New Case")

    await casePage.setSite("Extrusion-Hungary-Szekesfehervar")

    await casePage.setDepartment(departments.administration)

    await casePage.setTypeAndSev(caseType.ife, secLevels.low)
    await console.log("first playwright test in ci cd")
    //await casePage.setTypeAndSev(caseType.ife, secLevels.verylow)*/
  })
})

