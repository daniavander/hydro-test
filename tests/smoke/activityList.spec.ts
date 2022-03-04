import { test, expect } from "@playwright/test"
import { LoginPage } from "../../page-objects/LoginPage"
import { Navbar } from "../../page-objects/common/Navbar"
import { Dashboard } from "../../page-objects/common/Dashboard"

test.describe("Smoke test - Activity list", () => {
  let loginPage: LoginPage
  let navBar: Navbar
  let dashBoard: Dashboard



  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    navBar = new Navbar(page)
    dashBoard = new Dashboard(page)
    const baseUrl = 'https://stage-app-avander-ims-ui.azurewebsites.net/app/'
    await page.goto(baseUrl, { timeout: 50000 })
    await loginPage.loginInAzure()
  })

  test('31035 - Activity list', async ({ page, request }) => {
    await dashBoard.sidebarIsVisible()
    await dashBoard.topBarIsAvailable()
    //await page.pause()
    await expect(page.locator("#filter-site")).toHaveAttribute('title', 'All MY sites')


  })
})

