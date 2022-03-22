import { test, expect } from "@playwright/test"
import { LoginPage } from "../page-objects/Login.page"
import { Navbar } from "../page-objects/common/Navbar.page"

import { CaseList } from "../page-objects/CaseList"
import { CasePage } from "../page-objects/CasePage"
import { Dashboard } from "../page-objects/common/Dashboard.page"
import { AddUserAction } from "../page-objects/common/AddUserAction"

import { caseType, secLevels, departments } from "../fixtures/constans"

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

  test('delete cases in loop', async ({ page }) => {

    await dashBoard.sidebarIsVisible()

    await navBar.clickOnTopMenu("Cases")
    await page.waitForTimeout(4000)

    const repos = await page.$$(".ims_block18.obs_verticalcentered.obs_clickable.ng-star-inserted")

    const allUrlMap = await Promise.all(repos.map(async (repo, i) => {
      const xx = await repo.innerText()
      console.log(xx)
      for (var i = 0; i < 5; i++) {
        if (xx == "low ife type automated test" + i)
          console.log('----found----')
        await page.pause()
        var cc = await page.locator("//p[@title='low ife type automated test" + i +"']")
        await cc.click()
        await page.hover("(//div[contains(@class, 'p0i')])[1]")
        await page.locator('text="Delete"').first().click();
        await page.locator('text=Yes').click()
        await page.waitForTimeout(10000)
      }
    }))


    //console.log(allUrlMap)
  })
})

