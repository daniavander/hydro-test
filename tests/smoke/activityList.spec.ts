import { test, expect } from "@playwright/test"
import { LoginPage } from "../../page-objects/LoginPage"
import { Navbar } from "../../page-objects/common/Navbar"
import { Dashboard } from "../../page-objects/common/Dashboard"

test.describe("Smoke test - Activity list", () => {
  let loginPage: LoginPage
  let navBar: Navbar
  let dashBoard: Dashboard

  const baseUrl = 'https://stage-app-avander-ims-ui.azurewebsites.net/'

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    navBar = new Navbar(page)
    dashBoard = new Dashboard(page)

    await page.goto(baseUrl, { timeout: 50000 })
    //await loginPage.loginInAzure()
  })

  test('31035 - Activity list', async ({ page, request }) => {
    await dashBoard.sidebarIsVisible()
    await dashBoard.topBarIsAvailable()
    await page.pause()
    await expect(page.locator("#filter-site")).toHaveAttribute('title', 'All MY sites')
    //expect(await page.locator(".side-panel-content").screenshot()).toMatchSnapshot('side-panel-content.png', { threshold: 0.5 })
    await navBar.clickOnTopMenu("Activities")

    await page.locator('.obs_csstable').isVisible()
    const activitiesHeader = page.locator('.header.header-style2');
    await expect(activitiesHeader).toHaveClass("row obs_flex obs_flexgrow1 header header-style2");

    const response = await request.get(`${baseUrl}pi/activity?queryString=`)
    expect(response.status()).toBe(200)

  })
})

