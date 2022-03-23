//import * as data from "../../Login.cred.json"
import { expect } from "@fixtures/basePages"
import test from "@fixtures/basePages"

import { caseType, secLevels, departments, classesUnderAction3Dot } from "@fixtures/constans"

//test.describe.configure({ mode: 'parallel' })

test.describe("Smoke tests", () => {

  const baseUrl = 'https://stage-app-avander-ims-ui.azurewebsites.net/'

  test.beforeEach(async ({ loginPage, page }) => {

    await page.goto(baseUrl, { timeout: 50000 })
    //await loginPage.loginInAzure()
  })

  test('31035 - Activity list', async ({ dashBoard, navBar, page, request }) => {
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

  test('31036 - Reports page', async ({ dashBoard, navBar, page, request }) => {
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
    expect(page.locator("//span[text()='Legacy reports']")).toBeVisible()
    await page.locator("//span[text()='Diagrams']").isVisible()
  })

  test.only('30746 - Smoke test - Add IFE case with an user defined action', async ({ dashBoard, navBar, casePage, addUserAction, caseList, page }) => {

    await dashBoard.sidebarIsVisible()
    await page.locator(".side-panel-content")

    await dashBoard.topBarIsAvailable()
    await navBar.clickOnTopMenu("Add New Case")

    await casePage.setSite("Extrusion-Hungary-Szekesfehervar")

    await casePage.setDepartment(departments.administration)
    await page.pause()
    await casePage.setCaseType("ife", secLevels.low)
    await casePage.addMainAndSubTag("Add Csilla teszt", "Csilla2")
    await casePage.addMainAndSubTagWithoutBtn("Add Műszak meghatározása", "Nappali műszak")

    await casePage.fillDescription("Automation test descrption4")
    
    await page.click("//button[text()='Save']")

    expect(page.isVisible(".ghost-action-card-tile-title"))
    await (await page.waitForSelector('.p-state-filled')).isVisible()
    await addUserAction.addNewAction("description", "instruction", "ImsTestGlobalAdmin3", "Add Action tag", "action1")

    await casePage.pageContainsActionCorrectly("description", "instruction")

    const locator = page.locator('.fullopacity');
    await page.pause()
    //await expect.soft(locator).toHaveClass("tile fadein action list-mode ng-star-inserted fullopacity my-task active");
    /*const mytasklocator = page.locator(".tile.action.my-task:before")
    await page.pause()
    const color = await mytasklocator.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('background');
    });
    console.log(color);*/
    await page.click('text=Close')
    await caseList.getCaseByDescriptionAndDo("Automation test descrption4", "Delete")
  })

  
  
})

