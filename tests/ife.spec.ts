import { test, expect } from "@playwright/test"

import { Navbar } from "../page-objects/common/Navbar"
import { Dashboard } from "../page-objects/common/Dashboard"
import { AddUserAction } from "../page-objects/common/AddUserAction"
import { CasePage } from "../page-objects/CasePage"
import { CaseList } from "../page-objects/CaseList"
import { LoginPage } from "../page-objects/LoginPage"
//import { secLevels } from "../page-objects/common/constans"
import { caseType, secLevels, departments } from "../page-objects/common/constans"

//import { waitForClass } from "../helpers"

test.describe("my first test suite", () => {
  let navBar: Navbar
  let dashBoard: Dashboard
  let casePage: CasePage
  let caseList: CaseList
  let addUserAction: AddUserAction
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)

    navBar = new Navbar(page)
    dashBoard = new Dashboard(page)
    casePage = new CasePage(page)
    caseList = new CaseList(page)
    addUserAction = new AddUserAction(page)
    const baseUrl = 'https://stage-app-avander-ims-ui.azurewebsites.net/app/'
    await page.goto(baseUrl, { timeout: 50000 })
    await loginPage.loginInAzure()
  })

  test('Add new injury free event', async ({ page }) => {

    await dashBoard.sidebarIsVisible()
    const ghostCard = await page.locator(".side-panel-content")
    await ghostCard.screenshot({ path: 'side-panel-content.png' })

    await dashBoard.topBarIsAvailable()

    await navBar.clickOnTopMenu("Add New Case")

    await casePage.setSite("Extrusion-Hungary-Szekesfehervar")

    await casePage.setDepartment(departments.administration)

    await casePage.setTypeAndSev(caseType.ife, secLevels.low)

    await casePage.fillDescription("lorem ipsum set dolor sit amen")

    await casePage.addMainAndSubTag("Add Csilla teszt", "Csilla2")
    await casePage.addMainAndSubTagWithoutBtn("Add Műszak meghatározása", "Nappali műszak")

    await page.click("//button[text()='Save']")

    expect(page.isVisible(".ghost-action-card-tile-title"))
    await (await page.waitForSelector('.p-state-filled')).isVisible()
    //await casePage.snapshotGhostCard()

    await addUserAction.addNewAction("description", "instruction", "kovacs.daniel@avander.hu", "Add Action tag", "action1")

    await casePage.pageContainsActionCorrectly("description", "instruction")

    const locator = page.locator('.fullopacity');
    await expect(locator).toHaveClass("tile fadein action list-mode ng-star-inserted fullopacity active");
    await page.locator('text=Close').click();

    await caseList.getCaseByDescriptionAndDo("lorem ipsum set dolor sit amen", "Delete")
  })
})

