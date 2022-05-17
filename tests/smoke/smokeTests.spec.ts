//import * as data from "../../Login.cred.json"
import { matchers } from 'playwright-expect';
import { expect } from "@fixtures/basePages"
import test from "@fixtures/basePages"

import { caseType, secLevels, departments, stringConstants, classesUnderAction3Dot } from "@fixtures/constans"
import { AddUserAction } from '@pages/common/AddUserAction';
import { CaseList } from '@pages/CaseList';
import { CommonFunc } from '@pages/common/CommonFuncs';

//test.describe.configure({ mode: 'parallel' })

test.describe("Smoke test pack", () => {

  const baseUrl = 'https://stage-app-avander-ims-ui.azurewebsites.net/'
  //const baseUrl = 'https://ims2uat.hydro.com/app/home'

  test.beforeEach(async ({ loginPage, page, dashBoard}) => {
    await page.goto(baseUrl, { timeout: 50000 })
    //fyi comment out when run locally
    await loginPage.loginInAzure()
    await dashBoard.sidebarIsVisible()
    await dashBoard.topBarIsAvailable()
    await expect(page.locator("data-testid=site-selector")).toHaveAttribute('title', 'All MY sites')
  })
  test.afterEach(async ({ page }, testInfo) => {
    await page.waitForTimeout(6000)
  })
  test.afterAll(async ({ browser }) => {
    await browser.close()
  })
  test('31035 - Smoke test - Activity list @response', async ({ dashBoard, navBar, page, request }) => {
    
    await navBar.clickOnTopMenu("Activities")
    await page.locator('.obs_csstable').isVisible()
    const activitiesHeader = page.locator('.header.header-style2');
    await expect(activitiesHeader).toHaveClass("row obs_flex obs_flexgrow1 header header-style2");
    const response = await request.get(`${baseUrl}pi/activity?queryString=`)
    expect(response.status()).toBe(200)
  })

  test('31036 - Smoke test - Reports page @response', async ({ dashBoard, navBar, page, request }) => {
    //await dashBoard.sidebarIsVisible()
    //await dashBoard.topBarIsAvailable()
    //await expect(page.locator("data-testid=site-selector")).toHaveAttribute('title', 'All MY sites')
    await navBar.clickOnTopMenu("Reports")
    const actionBar = page.locator('.action-bar');
    await expect(actionBar).toHaveClass("action-bar obs_clearfix ng-star-inserted");
    const response = await request.get(`${baseUrl}pi/report?queryString=`)
    expect(response.status()).toBe(200)
    await page.click(".obs_highlighted")
    expect(page.locator("//span[text()='Sum']")).toBeVisible()
    expect(page.locator("//span[text()='Breakdown']")).toBeVisible()
    expect(page.locator("//span[text()='Diagrams']")).toBeVisible()
    expect(page.locator("//span[text()='Legacy reports']")).toBeVisible()
    await page.locator("//span[text()='Diagrams']").isVisible()
  })


  test('31034 - Smoke test - Create a Serious Injury case @action', async ({ browserName, dashBoard, navBar, casePage, addUserAction, addPeopleDetails, caseList, page }) => {

    await dashBoard.sidebarIsVisible()
    page.locator(".side-panel-content")

    await dashBoard.topBarIsAvailable()
    await navBar.clickOnTopMenu("Add New Case")

    await casePage.setSite("B&A-Brazil-Alunorte-CAPEX Projects")

    //webkiten failel:O
    //locator.click([title=HSE])
    await casePage.setDepartment(departments.hse)

    await casePage.fillDescription(stringConstants.description + " serious injury")
    await casePage.setCaseType("injury", secLevels.seriouscase)
    await addPeopleDetails.injuredPerson("imsTestGlobalAdmin3", "Yes", "injury comment")

    //TODO when answered my question https://github.com/microsoft/playwright/discussions/13123
    //expect(page.isVisible("(//action-list-tile[@class='ng-star-inserted']//div)[1]"))
    await page.locator("(//action-list-tile[@class='ng-star-inserted']//div)[1]").isEnabled()
    //expect(page.isVisible("(//action-list-tile[@class='ng-star-insertedd']//div)[1]"))
    //await page.locator("(//action-list-tile[@class='ng-star-insertedd']//div)[1]").isDisabled()

    //await page.locator("(//action-list-tile[@class='ng-star-inserted']//div)[1]").isDisabled()
    expect(page.isVisible("//p[text()='Investigation task']"))
    expect(page.isVisible("//p[text()=' Injury Details ']"))
    expect(page.isVisible("//p[text()=' Classify Injury ']"))
    expect(page.isVisible("//p[text()=' HR Details ']"))

    //todo step 13 add after care

    //step 14
    await addUserAction.fillInvestigationTask("investigation finding")
    //step 15
    await addUserAction.fillInjuryDetailsTask("Wound", "Irritation", "left-arm", "Elbow", "injury comments")
    //step 16
    await addUserAction.fillClassificationTask("Yes", "Fatality (Hydro)", "Very high")

    await casePage.getCardH2Text("icon-poe ng-star-inserted", " Absent dates ")
    await page.waitForTimeout(2000)
    //todo
    //await casePage.getCardH2Text("icon-translation ng-star-inserted", "Translation review")

    await casePage.getH3Text("warning translation", "Click here to change to Portuguese (Brazil)")

    //await casePage.getCaseByDescriptionAndDoInCasePage("Delete")
  })

  test.only('31032 - Smoke test - Close a WOC case with filled checklist @just2', async ({ browserName, dashBoard, navBar, casePage, addUserAction, page, surveyPage }) => {

    await dashBoard.sidebarIsVisible()
    page.locator(".side-panel-content")

    await dashBoard.topBarIsAvailable()
    await navBar.clickOnTopMenu("Add New Case")
    await casePage.setSite("Extrusion-Hungary-Szekesfehervar")

    await casePage.setDepartment(departments.hse)
    //await page.pause()
    await casePage.setCaseType("woc", "ImsTestGlobalAdmin3")

    await casePage.addMainAndSubTagWithoutBtn("Add shift", "Night shift")
    await casePage.addMainAndSubTagWithoutBtn("Add Action tag", "action1")
    await page.click('div[role="checkbox"]:has-text("Yes")')

    await casePage.fillDescription(stringConstants.description + " WOC")

    expect(await page.isVisible("//button[text()='Save']"))
    expect(await page.isVisible("text=Discard"))

    //add survey
    await casePage.addSurvey("Checklist", "első kategória", 1)
    //await page.pause()
    await expect(page.locator("data-testid=case-status")).toContainText('Ongoing')
    expect(await page.isVisible("//p[text()=' WOC form for managers ']"))

    //case id contain HUS string
    await expect(page.locator('data-testid=case-id')).toContainText('HUS')

    //buttons are disappeared
    expect(page.locator("//button[text()='Save']")).toHaveCount(0)
    expect(page.locator("//button[text()='Discard']")).toHaveCount(0)

    await surveyPage.checkOpenedSurvey("Ongoing", "Yes")


    await page.locator("//p[text()=' Sign & Archive ']").isEnabled()
    await casePage.getCardH2Text("icon-signature ng-star-inserted", " Sign & Archive ")
    await expect(page.locator("data-testid=case-status")).toContainText('Completed')

    //open s and a
    await page.click("//p[text()=' Sign & Archive ']")
    await page.click('text=Mark as Completed')
    expect(page.locator("data-testid=case-status")).toContainText('Archive')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await page.waitForTimeout(2000)
    await page.hover("data-testid=case-submenu")

    //dlete btn is disabled, because the status is archive
    expect(page.locator("//button[text()=' Delete ']").isDisabled())

    //reopen
    await page.click("//p[text()=' Sign & Archive ']")
    await page.click("//button[text()=' Reopen action ']")

    //we can delete the case after reopen it
    //await casePage.getCaseByDescriptionAndDoInCasePage("Delete")

  })

  test('30746 - Smoke test - Add IFE case with an user defined action @action', async ({ caseList, dashBoard, navBar, casePage, addUserAction, page }) => {

    await dashBoard.sidebarIsVisible()
    page.locator(".side-panel-content")

    await dashBoard.topBarIsAvailable()
    await navBar.clickOnTopMenu("Add New Case")

    await casePage.setSite("Extrusion-Hungary-Szekesfehervar")
    await casePage.setDepartment(departments.administration)
    await casePage.setCaseType("ife", secLevels.low)
    await casePage.addMainAndSubTag("Add Csilla teszt", "Csilla2")
    await casePage.addMainAndSubTagWithoutBtn("Add Műszak meghatározása", "Nappali műszak")

    await casePage.fillDescription(stringConstants.description + " IFE")

    //await page.click("//button[text()='Save']")

    await page.click('text=Save')


    expect(page.isVisible(".ghost-action-card-tile-title"))
    await (await page.waitForSelector('.p-state-filled')).isVisible()
    await addUserAction.addNewAction("description", "instruction", "ImsTestGlobalAdmin3", "Add Action tag", "action1")

    await casePage.pageContainsActionCorrectly("description", "instruction")

    const locator = page.locator('.fullopacity');
    /*await page.pause()
    //await expect.soft(locator).toHaveClass("tile fadein action list-mode ng-star-inserted fullopacity my-task active");
    const mytasklocator = page.locator(".tile.action.my-task:before")
    await expect(mytasklocator).toHaveCSS('background', '#006eff');*/
    await page.click('text=Close')
    //await caseList.getCaseByDescriptionAndDoFromListPage(stringConstants.description, "Delete")
  })

  test.skip('31043 - Smoke test - Cases listview filters (site, department, recorded date, recorded by) @just', async ({ getTexts, navBar, commonFunc, page, caseList }) => {


    await navBar.clickOnTopMenu("Cases")
    await page.waitForSelector("#reset-filter-button", { timeout: 5000 })
    try {
      console.log("try to reset the filters")
      await page.click("#reset-filter-button", { timeout: 5000 })
      console.log("reseted")
    } catch (error) {
      console.log(error)
    }

    expect(page.locator(".obs_csstable"))
    await commonFunc.searchCaseWithFilters("Extrusion-Hungary-Szekesfehervar", "Injury Free Event")
    //step 6

    await page.click("[title='Edit filters']")

    //fixme after Product Backlog Item 32413: Automated Test - delete unnecessary spaces done
    //fyi childnumber xpath is szar mert a child number néha változik:O
    //expect(page.locator("//div[@title='Site: Extrusion-Hungary-Szekesfehervar\\\\\\\\   ']")).toBeVisible()
    //await page.locator('text=Site: Extrusion-Hungary-Szekesfehervar Components').nth(1).click();
    //fixme after Product Backlog Item 32413: Automated Test - delete unnecessary spaces done
    //expect(page.locator("//div[@title='Type of incident: Injury Free Event   ']")).toBeVisible()
    //step7
    await page.click("text='Recorded'")
    //step 8
    //fyi if check last day, NEED to add IFE in fehervar or run (31034 - Smoke test - Create a Serious Injury case), otherwise fail the test
    await page.click("text='Last day'")
    //await page.fill("//input[@placeholder='Name']","imstestglobaladmin3@avander.hu")
    //in local due to azure ad login
    await page.fill("//input[@placeholder='Name']", "Kovács Dániel")
    await page.click("//li[@role='option']")
    //step 9
    await page.click("text='Apply filters'")

    //step 10 check the result list that IFE is in first element of the list
    await getTexts.getDivElementTextOnListPage("ims_block18 nowrap", "Injury free event ", "Cases")

    //check the previously selected filter is in the filter bar

    expect(page.locator("//div[@title='Site: Extrusion-Hungary-Szekesfehervar']")).toBeVisible()

    expect(page.locator("//div[@title='Type of incident: Injury Free Event']")).toBeVisible()
    expect(page.locator("(//div[@title='Last day: true']//span)[1]")).toBeVisible()
    //expect(page.locator('#tagShowCase div:has-text("Creation date: Last day")')).toBeVisible();
    await page.waitForTimeout(3000)
    await page.click("#reset-filter-button")
    await expect(page.locator("//h1[contains(@class,'m0i')]")).toContainText('Cases')
    //available in dom but hidden
    expect(page.locator("//div[@title='Site: Extrusion-Hungary-Szekesfehervar']")).toBeHidden()

    //omly in dom
    /*expect(page.locator("(//div[@title='Last day: true']//span)[1]")).toBeHidden()
    expect(page.locator("(//div[@title='Last day: true']//span)[1]")).toBeVisible()*/

    ////////////////////////////////////////////////////
    //the result depends on trhe previous test case
    //31034 - Smoke test - Create a Serious Injury case
    ////////////////////////////////////////////////////


    /*const elemTextValue = await page.locator("(//span[text()='Extrusion-Hungary-Szekesfehervar'])[3]").allTextContents()
    console. log(elemTextValue)*/


  })

  test.skip('31044 - Smoke test - Actions listview filters (site, department, recorded date, recorded by) @just', async ({ getTexts, navBar, commonFunc, page, caseList }) => {
    await navBar.clickOnTopMenu("Actions")
    await expect(page.locator("data-testid=site-selector")).toHaveAttribute('title', 'All MY sites')
    await page.waitForSelector("#reset-filter-button", { timeout: 5000 })
    try {
      console.log("try to reset the filters")
      await page.click("#reset-filter-button", { timeout: 5000 })
      console.log("reseted")
    } catch (error) {
      console.log(error)
    }

    //step 3
    expect(page.locator(".obs_csstable"))
    //step 4
    await commonFunc.searchCaseWithFilters("Extrusion-Hungary-Szekesfehervar", "Signature")
    //step 6 open custom filter tab
    await page.click("[title='Edit filters']")

    //fixme after Product Backlog Item 32413: Automated Test - delete unnecessary spaces done
    //fyi childnumber xpath is szar mert a child number néha változik:O
    //expect(page.locator("//div[@title='Site: Extrusion-Hungary-Szekesfehervar\\\\\\\\   ']")).toBeVisible()
    //await page.locator('text=Site: Extrusion-Hungary-Szekesfehervar Components').nth(1).click();
    //fixme after Product Backlog Item 32413: Automated Test - delete unnecessary spaces done
    //expect(page.locator("//div[@title='Type of incident: Injury Free Event   ']")).toBeVisible()
    //step7
    await page.click("text='Recorded'")
    //step 8
    await page.click("text='Last day'")
    await page.fill("//input[@placeholder='Name']", "Kovács Dániel")
    await page.click("//li[@role='option']")
    //step 9
    await page.click("text='Apply filters'")

    //step 10 check the result list that Sign & Archive is in first element of the list
    //if new icon usage-> await getTexts.getDivElementTextOnListPage("ims_block10 obs_verticalcentered", "sign&archive", "Actions")
    await getTexts.getDivElementTextOnListPage("ims_ellipsis ng-star-inserted", "Conclude a completed case by a final evaluation and approval.", "Actions")

    //check the previously selected filter is in the filter bar
    expect(page.locator("//div[@title='Site: Extrusion-Hungary-Szekesfehervar']")).toBeVisible()

    expect(page.locator("//div[@title='Type of action: Signature']")).toBeVisible()
    //expect(page.locator("//div[@title='Last day: true']")).toBeVisible()

    await page.waitForTimeout(3000)
    await page.click("#reset-filter-button")
    await expect(page.locator("//h1[contains(@class,'m0i')]")).toContainText('All actions')
    //available in dom but hidden
    expect(page.locator("//div[@title='Site: Extrusion-Hungary-Szekesfehervar']")).toBeHidden()

  })

})

