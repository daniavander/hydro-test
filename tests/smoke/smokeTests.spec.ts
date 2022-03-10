import { test, expect } from "@playwright/test"
import { LoginPage } from "../../page-objects/LoginPage"
import { Navbar } from "../../page-objects/common/Navbar"

import { CaseList } from "../../page-objects/CaseList"
import { CasePage } from "../../page-objects/CasePage"
import { Dashboard } from "../../page-objects/common/Dashboard"
import { AddUserAction } from "../../page-objects/common/AddUserAction"

import { caseType, secLevels, departments } from "../../page-objects/common/constans"

test.describe("Smoke tests", () => {
  let loginPage: LoginPage
  let navBar: Navbar
  let dashBoard: Dashboard
  let casePage: CasePage
  let caseList: CaseList
  let addUserAction: AddUserAction

  const baseUrl = 'https://stage-app-avander-ims-ui.azurewebsites.net/'

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    navBar = new Navbar(page)
    dashBoard = new Dashboard(page)

    casePage = new CasePage(page)
    caseList = new CaseList(page)
    addUserAction = new AddUserAction(page)

    await page.goto(baseUrl, { timeout: 50000 })
    await loginPage.loginInAzure()
  })

  test('31035 - Activity list', async ({ page, request }) => {
    await dashBoard.sidebarIsVisible()
    await dashBoard.topBarIsAvailable()
    //await expect(page.locator("#filter-site")).toHaveAttribute('title', 'All MY sites')
    await navBar.clickOnTopMenu("Activities")
    await page.locator('.obs_csstable').isVisible()
    const activitiesHeader = page.locator('.header.header-style2');
    await expect(activitiesHeader).toHaveClass("row obs_flex obs_flexgrow1 header header-style2");
    const response = await request.get(`${baseUrl}pi/activity?queryString=`)
    expect(response.status()).toBe(200)
  })

  test('31036 - Reports page', async ({ page, request }) => {
    await dashBoard.sidebarIsVisible()
    await dashBoard.topBarIsAvailable()
    //await expect(page.locator("#filter-site")).toHaveAttribute('title', 'All MY sites')
    await navBar.clickOnTopMenu("Reports")
    const actionBar = page.locator('.action-bar');
    await expect(actionBar).toHaveClass("action-bar obs_clearfix ng-star-inserted");
    const response = await request.get(`${baseUrl}pi/report?queryString=`)
    expect(response.status()).toBe(200)
    expect(page.locator("//span[text()='Sum']")).toBeVisible()
    expect(page.locator("//span[text()='Breakdown']")).toBeVisible()
    expect(page.locator("//span[text()='Diagrams']")).toBeVisible()
    await page.pause()
    expect(page.locator("//span[text()='Legacy reports']")).toBeVisible()
    await page.locator("//span[text()='Diagrams']").isVisible()
  })

  test('30746 - Smoke test - Add IFE case with an user defined action', async ({ page }) => {

    await dashBoard.sidebarIsVisible()
    await page.locator(".side-panel-content")

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

    await addUserAction.addNewAction("description", "instruction", "kovacs.daniel@avander.hu", "Add Action tag", "action1")

    await casePage.pageContainsActionCorrectly("description", "instruction")

    const locator = page.locator('.fullopacity');
    await expect(locator).toHaveClass("tile fadein action list-mode ng-star-inserted fullopacity active");
    await page.locator('text=Close').click();

    await caseList.getCaseByDescriptionAndDo("lorem ipsum set dolor sit amen", "Delete")
  })
})

