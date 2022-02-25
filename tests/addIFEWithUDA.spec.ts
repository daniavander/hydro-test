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
    const baseUrl = 'https://stage-app-avander-ims-ui.azurewebsites.net/app/'
    await page.goto(baseUrl, { timeout: 50000 })
  })

  test('Add new injury free event', async ({ page }) => {

    await dashBoard.sidebarIsVisible()
    await dashBoard.topBarIsAvailable()
    //await page.pause()
    //await dashBoard.snapshotTopBar()

    await navBar.clickOnTopMenu("Add New Case")

    await casePage.setSite("Extrusion-Hungary-Szekesfehervar")

    await casePage.setDepartment(departments.administration)

    await casePage.setTypeAndSev(caseType.ife, secLevels.low)

    await casePage.fillDescription("lorem ipsum set dolor sit amen")

    await casePage.addMainAndSubTag("Add Csilla teszt", "Csilla2")

    await page.click("//button[text()='Save']")

    expect(page.isVisible(".ghost-action-card-tile-title"))
    await (await page.waitForSelector('.p-state-filled')).isVisible()
    await page.pause()
    //await casePage.snapshotGhostCard()

    await addUserAction.addNewAction("description","instruction","Kovács Dániel","Add Action tag", "action1")

    await casePage.pageContainsActionCorrectly("description","instruction")

    const locator = page.locator('.fullopacity');
    await expect(locator).toHaveClass("tile fadein action list-mode ng-star-inserted fullopacity my-task active");
  })
})

