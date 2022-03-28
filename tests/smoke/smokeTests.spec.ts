//import * as data from "../../Login.cred.json"
import { matchers } from 'playwright-expect';
import { expect } from "@fixtures/basePages"
import test from "@fixtures/basePages"

import { caseType, secLevels, departments, classesUnderAction3Dot } from "@fixtures/constans"
import { AddUserAction } from '@pages/common/AddUserAction';

//test.describe.configure({ mode: 'parallel' })

test.describe("Smoke tests", () => {

  const baseUrl = 'https://stage-app-avander-ims-ui.azurewebsites.net/'

  test.beforeEach(async ({ loginPage, page }) => {

    await page.goto(baseUrl, { timeout: 50000 })
    await loginPage.loginInAzure()
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

  test('30746 - Smoke test - Add IFE case with an user defined action', async ({ dashBoard, navBar, casePage, addUserAction, caseList, page }) => {

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

    await casePage.fillDescription("Automation test descrption finish")

    await page.click("//button[text()='Save']")

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
    //await caseList.getCaseByDescriptionAndDo("Automation test descrption finish", "Delete")
  })

  test('31034 - Smoke test - Create a Serious Injury case', async ({ dashBoard, navBar, casePage, addUserAction, addPeopleDetails, caseList, page }) => {
    await dashBoard.sidebarIsVisible()
    await page.locator(".side-panel-content")

    await dashBoard.topBarIsAvailable()
    await navBar.clickOnTopMenu("Add New Case")

    await casePage.setSite("B&A-Brazil-Alunorte-CAPEX Projects")

    //webkiten failel:O
    await casePage.setDepartment(departments.hse)

    await casePage.fillDescription("bbAutomation test description injury")
    //faszas
    await casePage.setCaseType("injury", secLevels.seriouscase)

    await addPeopleDetails.injuredPerson("imsTestGlobalAdmin3", "Yes", "injury comment")

    await page.click("//button[text()='Save']")

    expect(page.isVisible("//p[text()='Investigation task']"))
    expect(page.isVisible("//p[text()=' Injury Details ']"))
    expect(page.isVisible("//p[text()=' Classify Injury ']"))
    expect(page.isVisible("//p[text()=' HR Details ']"))

    /*//await addUserAction.addActionWith3Dot(classesUnderAction3Dot.aftercare)
    await page.hover("//div[text()='Actions']/following-sibling::div")
    //await page.pause()
    await page.locator(".icon-afc").click()
    expect(page.isVisible("//p[text()=' After Care ']"))*/

    await addUserAction.fillInvestigationTask("investigation finding")
    
    await addUserAction.fillInjuryDetailsTask("Wound", "Irritation", "left-arm", "Elbow", "injury comments")
    //step 15 next due to an error

    await page.click('text=Close')
    //await caseList.getCaseByDescriptionAndDo("aaAutomation test description injury", "Delete")
  })

  test('31032 - Smoke test - Close a WOC case with filled checklist', async ({ dashBoard, navBar, casePage, addUserAction, page, surveyPage }) => {

    await dashBoard.sidebarIsVisible()
    page.locator(".side-panel-content")

    await dashBoard.topBarIsAvailable()
    await navBar.clickOnTopMenu("Add New Case")

    await casePage.setSite("Extrusion-Hungary-Szekesfehervar")

    await casePage.setDepartment(departments.hse)

    await casePage.setCaseType("woc", "ImsTestGlobalAdmin3")
    await casePage.addMainAndSubTagWithoutBtn("Add shift", "Night shift")
    await casePage.addMainAndSubTagWithoutBtn("Add Action tag", "action1")
    await page.click('div[role="checkbox"]:has-text("Yes")')

    await casePage.fillDescription("Automation test descrption finish")

    expect(await page.isVisible("//button[text()='Save']"))
    expect(await page.isVisible("text=Discard"))

    //add survey
    await casePage.addSurvey("Checklist", "első kategória", 1)

    //case is ongoing
    await expect(page.locator("(//span)[10]")).toContainText('Ongoing')
    expect(await page.isVisible("//p[text()=' WOC form for managers ']"))

    //id contain HUS number
    await expect(page.locator('(//h3)[2]')).toContainText('HUS')

    //buttons are disappeared
    expect(page.locator("//button[text()='Save']")).toHaveCount(0)
    expect(page.locator("//button[text()='Discard']")).toHaveCount(0)


    //await page.locator('text=Discard').click();

    await surveyPage.checkOpenedSurvey("Ongoing", "Yes")

    await page.pause()

    await addUserAction.getCardText("icon-signature ng-star-inserted", " Sign & Archive ")
    await expect(page.locator("(//span)[10]")).toContainText('Completed')

    //open s and a
    await page.click("//p[text()=' Sign & Archive ']")
    await page.click("//button[text()='Mark as Completed']")
    expect(page.locator("(//span)[10]")).toContainText('Archive')

    //todo ha lesz automation id akkor fixálni
    await page.hover("(//div[@class='action-bar obs_clearfix']//div)[3]")
    //delet btn will be disable but code how
    await page.pause()
    expect(page.locator("//button[text()=' Delete ']").isDisabled())
    expect(page.locator("//button[text()=' Delete ']").isEnabled())

    //reopen
    await page.click("//p[text()=' Sign & Archive ']")
    await page.click("//button[text()=' Reopen action ']")
    await page.hover("(//div[@class='action-bar obs_clearfix']//div)[3]")
    await page.click("//button[text()=' Delete ']")
    await page.click("//button[text()='Yes']")



    //expect(await page.locator('div:has-text("Ongoing"'))


    //await page.click('text=Close')
    //await caseList.getCaseByDescriptionAndDo("Automation test descrption finish", "Delete")
  })

})

