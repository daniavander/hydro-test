import { test, expect } from "@playwright/test"
import { LoginPage } from "../../page-objects/LoginPage"
import { Navbar } from "../../page-objects/common/Navbar"
import { Dashboard } from "../../page-objects/common/Dashboard"

test.describe("Smoke tests", () => {
  let loginPage: LoginPage
  let navBar: Navbar
  let dashBoard: Dashboard

  const baseUrl = 'https://stage-app-avander-ims-ui.azurewebsites.net/'

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    navBar = new Navbar(page)
    dashBoard = new Dashboard(page)

    await page.goto(baseUrl, { timeout: 50000 })
    await loginPage.loginInAzure()
  })

  test('31035 - Activity list', async ({ page, request }) => {
    await dashBoard.sidebarIsVisible()
    await dashBoard.topBarIsAvailable()
    await expect(page.locator("#filter-site")).toHaveAttribute('title', 'All MY sites')
    await navBar.clickOnTopMenu("Activities")
    await page.locator('.obs_csstable').isVisible()
    const activitiesHeader = page.locator('.header.header-style2');
    await expect(activitiesHeader).toHaveClass("row obs_flex obs_flexgrow1 header header-style2");
    const response = await request.get(`${baseUrl}pi/activity?queryString=`)
    expect(response.status()).toBe(200)
  })

  test.only('31036 - Reports page', async ({ page, request }) => {
    await dashBoard.sidebarIsVisible()
    await dashBoard.topBarIsAvailable()
    await expect(page.locator("#filter-site")).toHaveAttribute('title', 'All MY sites')
    await navBar.clickOnTopMenu("Reports")
    const actionBar = page.locator('.action-bar');
    await expect(actionBar).toHaveClass("action-bar obs_clearfix ng-star-inserted");
    const response = await request.get(`${baseUrl}pi/report?queryString=`)
    expect(response.status()).toBe(200)
    expect(await page.isVisible("//span[text()='Sum']"))
    expect(await page.isVisible("//span[text()='Breakdown']"))
    expect(await page.isVisible("//span[text()='Diagramss']"))
    expect(await page.isVisible("//span[text()='Legacy\\ reports']"))
  })
})

