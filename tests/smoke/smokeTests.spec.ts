//import * as data from "../../Login.cred.json"
import { matchers } from 'playwright-expect';
import { expect } from "@fixtures/basePages"
import test from "@fixtures/basePages"

import { caseType, secLevels, departments, stringConstants, classesUnderAction3Dot } from "@fixtures/constans"
import { AddUserAction } from '@pages/common/AddUserAction';
import { CaseList } from '@pages/CaseList';
import { CommonFunc } from '@pages/common/CommonFuncs';

//test.describe.configure({ mode: 'parallel' })
test.use({
  baseURL: "https://google.com"
})

test.describe("Smoke test pack", () => {
  const baseURL = "https://stage-app-avander-ims-ui.azurewebsites.net/"

  test.beforeEach(async ({ loginPage, page, dashBoard }) => {
    await page.goto(baseURL, { timeout: 100000 })
    //fyi comment out when run locally
    await loginPage.loginInAzure()
  })
  test.afterEach(async ({ page }, testInfo) => {
    await page.waitForTimeout(6000)
  })
  test.afterAll(async ({ browser }) => {
    await browser.close()
  })
  test('31035 - Smoke test - Activity list @response', async ({ dashBoard, navBar, page, request }) => {

    await dashBoard.sidebarIsVisible()
    await dashBoard.topBarIsAvailable()
    await expect(page.locator("data-testid=site-selector")).toHaveAttribute('title', 'All MY sites')
    await navBar.clickOnTopMenu("Activities")
    await page.locator('.obs_csstable').isVisible()
    const activitiesHeader = page.locator('.header.header-style2');
    await expect(activitiesHeader).toHaveClass("row obs_flex obs_flexgrow1 header header-style2", { timeout: 30000 });
    const response = await request.get(`${baseURL}pi/activity?queryString=`)
    expect(response.status()).toBe(200)
  })

  test('31036 - Smoke test - Reports page @response', async ({ dashBoard, navBar, page, request }) => {
    await dashBoard.sidebarIsVisible()
    await dashBoard.topBarIsAvailable()
    await expect(page.locator("data-testid=site-selector")).toHaveAttribute('title', 'All MY sites')
    await navBar.clickOnTopMenu("Reports")
    const actionBar = page.locator('.action-bar');
    await expect(actionBar).toHaveClass("action-bar obs_clearfix ng-star-inserted", { timeout: 30000 });
    const response = await request.get(`${baseURL}pi/report?queryString=`)
    expect(response.status()).toBe(200)
    await page.click(".obs_highlighted")
    expect(page.locator("//span[text()='Sum']")).toBeVisible()
    expect(page.locator("//span[text()='Breakdown']")).toBeVisible()
    expect(page.locator("//span[text()='Diagrams']")).toBeVisible()
    expect(page.locator("//span[text()='Legacy reports']")).toBeVisible()
    await page.locator("//span[text()='Diagrams']").isVisible()
  })


  test.only('31034 - Smoke test - Create a Serious Injury case @cases', async ({ browserName, dashBoard, navBar, casePage, addUserAction, addPeopleDetails, caseList, getTexts, page }) => {
    await dashBoard.sidebarIsVisible()
    await dashBoard.topBarIsAvailable()
    await expect(page.locator("data-testid=site-selector")).toHaveAttribute('title', 'All MY sites')

    await dashBoard.sidebarIsVisible()
    page.locator(".side-panel-content")

    await dashBoard.topBarIsAvailable()
    await navBar.clickOnTopMenu("Add New Case")

    await casePage.setSite("Automation tests")

    await casePage.setDepartment(departments.hse)

    await casePage.fillDescription(stringConstants.description + " serious injury delete")
    await casePage.setCaseType("injury", secLevels.seriouscase)
    //in the popup
    await addPeopleDetails.injuredPerson("imsTestGlobalAdmin3", "No", "injury comment")
    await addUserAction.addTags("Add obligatory", "aa")
    //step 11
    await page.click('text=Save')
    //ghost card after care is visible and have ghost card class with injury icon
    await getTexts.getGhostCardTitle("after care", "injury")

    expect(page.isVisible("//p[text()=' HR Details ']"))
    expect(page.isVisible("//p[text()=' Injury Details ']"))
    expect(page.isVisible("//p[text()='Investigation task']"))
    expect(page.isVisible("//p[text()=' Classify Injury ']"))

    //step 14
    await addUserAction.fillInvestigationTask("investigation finding", "Add obligatory", "aa")
    //step 15
    await addUserAction.fillInjuryDetailsTask("Wound", "Irritation", "left-arm", "Elbow", "injury comments")
    //step 16
    await addUserAction.fillClassificationTask("Yes", "Fatality (Hydro)", "Very high")
    expect(page.isVisible("//p[text()=' Absent dates ']"))
    await expect(page.locator("data-testid=case-status")).toContainText('Ongoing')
  })

  test.only('31032 - Smoke test - Close a WOC case with filled checklist @cases', async ({ browserName, dashBoard, navBar, casePage, addUserAction, page, surveyPage }) => {
    await dashBoard.sidebarIsVisible()
    await dashBoard.topBarIsAvailable()
    await expect(page.locator("data-testid=site-selector")).toHaveAttribute('title', 'All MY sites')

    await dashBoard.sidebarIsVisible()
    page.locator(".side-panel-content")

    await dashBoard.topBarIsAvailable()
    await navBar.clickOnTopMenu("Add New Case")
    await casePage.setSite("Automation tests")

    await casePage.setDepartment(departments.hse)
    await casePage.setCaseType("woc", "ImsTestGlobalAdmin3")
    await casePage.fillDescription(stringConstants.description + " WOC delete")

    await addUserAction.addTags("Add obligatory", "aa")

    expect(await page.isVisible("text='Save']"))
    expect(await page.isVisible("text=Discard"))

    //step 12 necessary foolow up
    await page.click("//span[text()='No']")

    //add survey
    await casePage.addSurvey("Checklist", "0or1", 1)

    await expect(page.locator("data-testid=case-status")).toContainText('Ongoing')

    //case id contain HUS string
    await expect(page.locator('data-testid=case-id')).toContainText('E2E-22')

    //cheklist is visible as an action
    expect(await page.isVisible("//p[text()=' 0or1 ']"))

    //buttons are disappeared
    expect(page.locator("text='Save']")).toHaveCount(0)
    expect(page.locator("text='Discard']")).toHaveCount(0)
    //checklist status is ongoing step 11
    await surveyPage.checkOpenedSurvey("Ongoing", "No")
    
    await expect(page.locator("data-testid=case-status")).toContainText('Completed')

    //open s and a step 14
    await page.locator("text=' Sign & Archive '").isEnabled()
    await page.click("text=' Sign & Archive '")
    await addUserAction.addTags("Add obligatory", "aa")
    await page.click('text=Mark as Completed')
    expect(page.locator("data-testid=case-status")).toContainText('Archive')

    //await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    await page.waitForTimeout(2000)
    await page.hover("data-testid=case-submenu")
    //dlete btn is disabled, because the status is archive
    expect(page.locator("//button[text()=' Delete ']").isDisabled())

    //reopen
    await page.click("text=' Sign & Archive '")
    await page.click("//button[text()=' Reopen action ']")

    //we can delete the case after reopen it step 15
    await page.hover("data-testid=case-submenu")
    expect(page.locator("//button[text()=' Delete ']").isEnabled())
    await casePage.getFunctionAndDoInCasePage("Delete")

  })

  test.only('30746 - Smoke test - Add IFE case with an user defined action @cases', async ({ caseList, dashBoard, navBar, casePage, addUserAction, getTexts, page }) => {

    await dashBoard.sidebarIsVisible()
    page.locator(".side-panel-content")

    await dashBoard.topBarIsAvailable()
    await navBar.clickOnTopMenu("Add New Case")
    await casePage.setSite("Automation tests")
    await casePage.setDepartment(departments.administration)
    await casePage.setCaseType("ife", secLevels.low)
    await addUserAction.addTags("Add obligatory", "aa")

    await casePage.fillDescription(stringConstants.description + " IFE delete")
    await page.click('text=Save')

    await page.pause()
    //ghost card after save is visible
    await getTexts.getGhostCardTitle("investigation", "investigation")
    await (await page.waitForSelector('.p-state-filled')).isVisible()
    await addUserAction.addNewAction("description", "instruction", "ImsTestGlobalAdmin3", "Add obligatory", "aa")

    await casePage.pageContainsActionCorrectly("description", "instruction")
    await page.click('text=Close')
  })

  test('31043 - Smoke test - Cases listview filters (site, department, recorded date, recorded by) @list', async ({ getTexts, navBar, commonFunc, page, caseList }) => {


    await navBar.clickOnTopMenu("Cases")
    //await page.waitForSelector("#reset-filter-button", { timeout: 6000 })
    try {
      console.log("try to reset the filters")
      await page.click("#reset-filter-button", { timeout: 6000 })
      console.log("reseted")
    } catch (error) {
      console.log(error)
    }

    expect(page.locator(".obs_csstable"))
    await commonFunc.searchCaseWithFilters("Extrusion-Hungary-Szekesfehervar", "Injury Free Event")
    //step 6
    await page.click("[title='Edit filters']")
    await page.pause()
    //this is in the custom filter
    expect(page.locator('text=Site: Extrusion-Hungary-Szekesfehervar').nth(1)).toBeVisible()
    expect(page.locator('text=Type of incident: Injury Free Event').nth(1)).toBeVisible()
    //step7
    await page.click("//span[text()='Recorded']")
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
    // click to be list of elements
    await page.click("[aria-label='list']")
    await getTexts.getDivElementTextOnListPage("ims_ellipsis", "Injury free event", "Actions")

    //check the previously selected filter is in the filter bar
    //fixme kifaszázni ha kész: Product Backlog Item 32660: Automation test - data-testid-s for smart filter tags
    /*expect(page.locator("(//span[text()='Extrusion-Hungary-Szekesfehervar'])[3]")).toBeVisible()
    expect(page.locator("(//span[text()='Injury Free Event'])[3]")).toBeVisible()
    expect(page.locator("(//div[@title='Last day: true']//span)[1]")).toBeVisible()*/

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

  test.skip('31044 - Smoke test - Actions listview filters (site, department, recorded date, recorded by) @list', async ({ getTexts, navBar, commonFunc, page, caseList }) => {
    await navBar.clickOnTopMenu("Actions")
    //await expect(page.locator("data-testid=site-selector")).toHaveAttribute('title', 'All MY sites')
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
    await page.click("//span[text()='Recorded']")
    //step 8
    await page.click("text='Last day'")
    await page.fill("//input[@placeholder='Name']", "Kovács Dániel")
    await page.click("//li[@role='option']")
    //step 9
    await page.click("text='Apply filters'")
    await page.pause()

    //step 10 check the result list that Sign & Archive is in first element of the list
    //if new icon usage-> await getTexts.getDivElementTextOnListPage("ims_block10 obs_verticalcentered", "sign&archive", "Actions")
    // click to be list of elements
    await page.click("[aria-label='list']")
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

  test('31049 - Smoke test - Delete test cases (IFE, WOC, Injury) @delete  @cases', async ({ getTexts, navBar, commonFunc, page, caseList }) => {
    // it is work fine if the @cases tests are run previously
    await navBar.clickOnTopMenu("Cases")
    await caseList.getCaseByDescriptionAndDoFromListPage("Automated test description IFE delete", "Delete")
    await caseList.getCaseByDescriptionAndDoFromListPage("Automated test description serious injury delete", "Delete")
    await caseList.getCaseByDescriptionAndDoFromListPage("Automated test description WOC delete", "Delete")
  })

})

