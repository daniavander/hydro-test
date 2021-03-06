import { type Page, request, expect } from '@playwright/test';

import test from "@fixtures/basePages"

import { siteNames, entities, caseType, secLevels, departments, actionCards, ghostActionCards, stringConstants, classesUnderAction3Dot, siteShortNames, raMenuNames, frequency, riskMainTypes } from "@fixtures/constans"
//// <reference path="@fixtures/basePages" />


test.describe('Item', () => {
  const baseURL = "https://stage-app-avander-ims-ui.azurewebsites.net/"

  test.beforeEach(async ({ loginPage, page, dashBoard, commonFunc }) => {
    await page.goto('', { timeout: 100000 })
    //fyi comment out when run locally
    await loginPage.loginInAzure()
    await dashBoard.sidebarIsVisible()
    await dashBoard.topBarIsAvailable()
    await commonFunc.setAllPagesTo("All MY sites")
  })
  test.afterEach(async ({ page }, testInfo) => {
    await page.waitForTimeout(4000)
  })

  test('31035 - Smoke test - Activity list @response', async ({ dashBoard, navBar, page, request }) => {
    await expect(page.locator("data-testid=site-selector")).toHaveAttribute('title', 'All MY sites')
    await page.click("[title=Activities]")
    await page.locator('.obs_csstable').isVisible()
    const activitiesHeader = page.locator('.header.header-style2');
    await expect(activitiesHeader).toHaveClass("row obs_flex obs_flexgrow1 header header-style2", { timeout: 30000 });
    const response = await request.get(`${baseURL}pi/activity?queryString=`)
    expect(response.status()).toBe(200)
  });

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
    expect(page.locator("//span[text()='Breakdown']")).toBeEnabled()
    expect(page.locator("//span[text()='Diagrams']")).toBeVisible()
    expect(page.locator("//span[text()='Legacy reports']")).toBeVisible()
  })

  test('31034 - Smoke test - Create a Serious Injury case @cases', async ({ dashBoard, navBar, casePage, addUserAction, addPeopleDetails, getTexts, page }) => {
    //ez a szar webkiten failel department be??ll??t??s nem megy
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
    await expect(page.locator(ghostActionCards.ghostaftercare)).toBeEnabled({timeout:15000})

    await expect(page.locator(actionCards.investigation)).toBeEnabled()
    await expect(page.locator(actionCards.injurydetails)).toBeEnabled()
    await expect(page.locator(actionCards.classifyinjury)).toBeEnabled()
    await expect(page.locator(actionCards.hrdetails)).toBeEnabled()

    //step 14
    await addUserAction.fillInvestigationTask("investigation finding", "Add obligatory", "aa")
    //step 15
    await addUserAction.fillInjuryDetailsTask("Wound", "Irritation", "left-arm", "Elbow", "injury comments")
    //step 16
    await addUserAction.fillClassificationTask("Yes", "Fatality (Hydro)", "Very high")
    ////////////////-------------------------////////////////////////
    await expect(page.locator(actionCards.absentdates)).toBeEnabled()
    expect(page.isVisible("//p[text()=' Absent dates ']"))
    await expect(page.locator("data-testid=case-status")).toContainText('Ongoing')
  })

  test('31032 - Smoke test - Close a WOC case with filled checklist @cases', async ({ browserName, dashBoard, navBar, casePage, addUserAction, page, surveyPage }) => {
    //ez a szar webkiten failel department be??ll??t??s nem megy
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
    await page.waitForSelector("data-testid=case-status")
    await expect(page.locator("data-testid=case-status")).toContainText('Ongoing')
    //case id contain E"E-22 string
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
    await page.click(actionCards.sign)
    await addUserAction.addTags("Add obligatory", "aa")
    await page.click('text=Mark as Completed')
    await page.waitForTimeout(2000);
    expect(page.locator("data-testid=case-status")).toContainText('Archive')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(2000)
    await page.hover("data-testid=case-submenu")
    //delete btn is disabled, because the status is archive
    expect(page.locator("//button[text()=' Delete ']").isDisabled())

    //reopen
    await page.click(actionCards.sign)
    await page.click("//button[text()=' Reopen action ']")

    //we can delete the case after reopen it step 15
    await page.hover("data-testid=case-submenu")
    expect(page.locator("//button[text()=' Delete ']").isEnabled())
    await casePage.getFunctionAndDoInCasePage("Delete")

  })

  test('30746 - Smoke test - Add IFE case with an user defined action @cases', async ({ addReportedBy, caseList, dashBoard, navBar, casePage, addUserAction, getTexts, page }) => {
    //ez a szar webkiten failel department be??ll??t??s nem megy
    await dashBoard.sidebarIsVisible()
    page.locator(".side-panel-content")

    await dashBoard.topBarIsAvailable()
    await navBar.clickOnTopMenu("Add New Case")
    await casePage.setSite(siteNames.auto)
    await casePage.setDepartment(departments.hse)
    await casePage.setCaseType("ife", secLevels.low)
    //await casePage.addReportedBy("Kov??cs D??niel")
    await addUserAction.addTags("Add obligatory", "aa")

    await casePage.fillDescription(stringConstants.description + " IFE delete")
    await page.click('text=Save')

    //ghost card after save is visible
    //await page.pause()
    //investigation ghost card is enable and have good text
    await expect(page.locator(ghostActionCards.ghostinvestigation)).toHaveText("Investigation")

    await (await page.waitForSelector('.p-state-filled')).isVisible()
    await addUserAction.addNewAction("description", "instruction", "ImsTestGlobalAdmin3", "Add obligatory", "aa")

    await casePage.pageContainsActionCorrectly("description", "instruction")
    await page.click('text=Close')
  })

  test.skip('31049 - Smoke test - Delete test cases (IFE, WOC, Injury) @delete  @cases', async ({ getTexts, navBar, commonFunc, page, caseList }) => {
    // it is work fine if the @cases tests are run previously
    await navBar.clickOnTopMenu("Cases")
    await caseList.getCaseByDescriptionAndDoFromListPage("Automated test description IFE delete", "Delete")
    await caseList.getCaseByDescriptionAndDoFromListPage("Automated test description serious injury delete", "Delete")
    await caseList.getCaseByDescriptionAndDoFromListPage("Automated test description WOC delete", "Delete")
  })

  //test.use({ viewport: { width: 1600, height: 900 } })
  test('31053 - Smoke test - Create new Risk Assessment without Risk @risk', async ({ dashBoard, page, commonFunc, navBar, raPage }) => {
    await dashBoard.sidebarIsVisible()
    page.locator(".side-panel-content")
    await dashBoard.topBarIsAvailable()
    await navBar.clickOnTopMenu("Risk Assessment")
    try {
      console.log("try to reset the filters")
      await page.click("#reset-filter-button", { timeout: 15 * 1000 })
      console.log("reseted")
    } catch (error) {
      console.log(error)
    }
    //await expect(page.locator("data-testid=site-selector")).toHaveAttribute('title', 'All MY sites')

    await raPage.addNewRA("Automated RA", "Automation tests", departments.hse)
    //step 5
    await raPage.checkRA("Automated RA", "Published", siteShortNames.automation, departments.hse)
    //await raPage.fillRA("Automated desc" , "Extrusion-Hungary-Szekesfehervar" , "Administration", ["Add obligatory","aa"])
    await raPage.fillRA(stringConstants.description, "Add obligatory", "aa", ["Add obligatory", "aa"])
    //affected group frequenc -step 7
    await raPage.addRADetails(raMenuNames.seg, "Management", frequency.daily, "2")
    //todo itt k??ne a v??ltoz?? param??ter sz??m mert t??k felesleges t??bbet megadni csak egy kell
    //add sign - step 8
    await raPage.addRADetails(raMenuNames.signs)
    //add woc - step 9
    await raPage.addRADetails(raMenuNames.woc)
    // add new step - step 10
    await raPage.addRADetails(raMenuNames.steps)
    // add conected person - step 11
    await raPage.addRADetails(raMenuNames.connectedperson)

    // add new task page - step 12 , 13 , 14
    await raPage.addNewTaskToRa("automation RA task", "automation RA task desc", frequency.monthly)
    // add safety sign to rask - step 15
    await raPage.addRADetails(raMenuNames.signs)
    // add woc to task - step 16
    await raPage.addRADetails(raMenuNames.woc)
    //ad step to task - step 17
    await raPage.addRADetails(raMenuNames.steps)

    // v??gre step 18 save and publish
    await page.click(".survey-woc-editor-save-publish")
    //check the status is published
    await expect(page.locator("//p[@title='Published']")).toHaveText("Published")

    // delete the RA after published
    await page.click("//div[@title='Automated RA']")
    await raPage.addRADetails(raMenuNames.delete)
  })

  test('31056 - Smoke test - Create new Risk Assessment with Risk @risk', async ({ dashBoard, page, navBar, raPage }) => {
    await dashBoard.sidebarIsVisible()
    page.locator(".side-panel-content")
    await dashBoard.topBarIsAvailable()
    await navBar.clickOnTopMenu("Risk Assessment")
    await expect(page.locator("data-testid=site-selector")).toHaveAttribute('title', 'All MY sites')

    await raPage.addNewRA("Automated RA with Risk", "Automation tests", departments.hse)

    //affected group frequenc - step 10
    await raPage.addRADetails(raMenuNames.seg, "Management", frequency.daily, "2")
    //add hazard - step 6
    await raPage.addRADetails(raMenuNames.hazard)
    await raPage.addSingleRisk(riskMainTypes.asbestos, riskMainTypes.asbestos)
    //check details - step 7
    await raPage.checkRiInRa(riskMainTypes.asbestos, "Automation tests", siteShortNames.automation, departments.hse, "Asbestos")


    // add inherent risk - step 11
    //inside hazard
    await page.click("//span[text()='Add inherent risk']")
    await page.click("(//risk-matrix/div[2]/div[4])[1]")
    expect(page.locator("risk-matrix")).toHaveCount(2)

    //todo felvenni hogy egy m??trix ??rt??k kapjon data-testid-t
    //await raPage.checkRiInRa(riskMainTypes.asbestos, "Automation tests", siteShortNames.automation, departments.hse,"Mechanical hazard")

    //add residual risk - step 12
    await page.click("//span[text()='Add residual risk']")
    await page.click("(//risk-matrix/div[2]/div[4])[3]")
    expect(page.locator("risk-matrix")).toHaveCount(3)

    //add existing measure  - step 13
    //hi??ba katintok nem j??n fel az ablak 
    // Bug 33563: RA - add existing measure
    //fixme  //todo //fyi
    /*
    await page.waitForTimeout(3000);
    await raPage.addExistingMeasure("Test Automation Question","PPE")*/

    // step 14
    await page.fill(".details-textarea", "Test Automation Risk Description")

    //todo befejezni
    //add new action - step 15,16  -  inside risk
    await raPage.addNewActionInRisk("risk action desc", "risk action inst", "Kov??cs D??niel", "Add obligatory", "aa")

    // add checklist step 17,18
    await raPage.addChecklistToRisk("0or1")
    //sva and close - step 19
    await page.click("data-testid=risk-save-close")
    // save and publish step 20
    await page.click(".survey-woc-editor-save-publish")
    await expect(page.locator(".survey-woc-editor-save-publish")).toHaveClass('survey-woc-editor-save-publish')

    await raPage.checkRA("Automated RA", "Published", siteShortNames.automation, departments.hse)
    await expect(page.locator("//p[@title='Published']")).toHaveText("Published")

    // delete the RA after published
    await page.click("//div[@title='Automated RA with Risk']")
    await raPage.addRADetails(raMenuNames.delete)
  })

  test.use({ viewport: { width: 1600, height: 900 } })
  test('31043 - Smoke test - Cases listview filters (site, department, recorded date, recorded by) @filter', async ({ request, getTexts, navBar, filter, commonFunc, page, caseList }) => {

    await navBar.clickOnTopMenu("Cases")
    try {
      console.log("try to reset the filters")
      await page.click("#reset-filter-button", { timeout: 6000 })
      console.log("reseted")
    } catch (error) {
      console.log(error)
    }

    expect(page.locator(".obs_csstable"))
    await commonFunc.searchCaseWithFilters("Cases", siteNames.auto, entities.ife)
    //step 6
    await page.click("[title='Edit filters']")

    //this is in the custom filter
    expect(page.locator('data-testid=detailedfilter.label.site: ' + siteNames.auto + '')).toBeEnabled()
    expect(page.locator('data-testid=detailedfilter.label.entity: ' + entities.ife + '')).toBeEnabled()
    //step7
    await page.click("//span[text()='Recorded']")
    //step 8
    //fyi if check last day, NEED to add IFE in auto site or run (31034 - Smoke test - Create a Serious Injury case), otherwise fail the test
    //await page.pause()
    await page.click("text='Last day'")
    //await page.fill("//input[@placeholder='Name']","imstestglobaladmin3@avander.hu")
    //in local due to azure ad login
    await page.fill("//input[@placeholder='Name']", "Kov??cs D??niel")
    await page.click("//li[@role='option']")
    //step 9
    await page.click("text='Apply filters'")

    //step 9 check the result list that IFE is in first element of the list
    // click to be list of elements
    await page.click("[aria-label='list']")

    await filter.checkFilterTabs(siteNames.auto, entities.ife, "Kov??cs D??niel (kovacs.daniel@avander.hu)", "lastday")

    //step 10 reset filters and check that the full list is displayed
    await page.click("#reset-filter-button", { timeout: 6000 })
    await expect(page.locator("//h1[contains(@class,'m0i')]")).toContainText('Cases')
    //available in dom but hidden
    expect(page.locator("//div[@title='Site: Extrusion-Hungary-Szekesfehervar']")).toBeHidden()

    const response = await request.get(`${baseURL}pi/action?queryString=`)
    expect(response.status()).toBe(200)
  })

  test('31044 - Smoke test - Actions listview filters (site, department, recorded date, recorded by) @filter', async ({ dashBoard, request, getTexts, navBar, commonFunc, page, caseList }) => {
    await dashBoard.sidebarIsVisible()
    await dashBoard.topBarIsAvailable()

    await navBar.clickOnTopMenu("Actions")
    //await page.waitForSelector("#reset-filter-button", { timeout: 5000 })
    try {
      console.log("try to reset the filters")
      await page.click("#reset-filter-button", { timeout: 15 * 1000 })
      console.log("reseted")
    } catch (error) {
      console.log(error)
    }

    //step 3
    expect(page.locator(".obs_csstable"))
    //step 4
    await commonFunc.searchCaseWithFilters("Actions", siteNames.auto, "Signature")
    //step 6 open custom filter tab
    await page.click("[title='Edit filters']")

    //fixme after Product Backlog Item 32413: Automated Test - delete unnecessary spaces done
    //fyi childnumber xpath is szar mert a child number n??ha v??ltozik:O
    //expect(page.locator("//div[@title='Site: Extrusion-Hungary-Szekesfehervar\\\\\\\\   ']")).toBeVisible()
    //await page.locator('text=Site: Extrusion-Hungary-Szekesfehervar Components').nth(1).click();
    //fixme after Product Backlog Item 32413: Automated Test - delete unnecessary spaces done
    //expect(page.locator("//div[@title='Type of incident: Injury Free Event   ']")).toBeVisible()
    //step7
    await page.click("//span[text()='Recorded']")
    //step 8
    await page.click("text='Last day'")
    await page.fill("//input[@placeholder='Name']", "Kov??cs D??niel")
    await page.click("//li[@role='option']")
    //step 9
    await page.click("text='Apply filters'")

    //step 10 check the result list that Sign & Archive is in first element of the list
    // click to be list of elements
    await page.click("[aria-label='list']")
    //await getTexts.getDivElementTextOnListPage("ims_ellipsis ng-star-inserted", "Conclude a completed case by a final evaluation and approval.", "Actions")

    //check the previously selected filter is in the filter bar
    expect(page.locator("data-testid=detailedfilter.label.site: Automation tests")).toBeVisible()
    expect(page.locator("data-testid=detailedfilter.action.label.entity: Signature")).toBeVisible()
    expect(page.locator("data-testid=filter.tag.lastday: true")).toBeVisible()

    await page.waitForTimeout(3000)
    await page.click("#reset-filter-button")
    await expect(page.locator("//h1[contains(@class,'m0i')]")).toContainText('All actions')
    //available in dom but hidden
    expect(page.locator("data-testid=detailedfilter.label.site: Automation tests")).toBeHidden()

    const response = await request.get(`${baseURL}pi/action?queryString=`)
    expect(response.status()).toBe(200)

  })

  test('31057 - Smoke test - Risk Assessment filters (site, department, creation date, my records) @filter', async ({ dashBoard, navBar, page, commonFunc, filter }) => {
    await dashBoard.sidebarIsVisible()
    await dashBoard.topBarIsAvailable()

    await navBar.clickOnTopMenu("Risk Assessment")

    try {
      console.log("try to reset the filters")
      await page.click("#reset-filter-button", { timeout: 6000 })
      console.log("reseted")
    } catch (error) {
      console.log(error)
    }
    await expect(page.locator("data-testid=site-selector")).toHaveAttribute('title', 'All MY sites')

    expect(page.locator(".obs_csstable"))
    //step 3,4
    await commonFunc.searchCaseWithFilters("Risk Assessment", siteNames.auto, entities.hse)
    //step 5

    await page.click("[title='Edit filters']")
    //this is in the custom filter
    //step 6 
    await page.click("text=Recorded")
    //step 7
    await page.click("text=My records")
    expect(page.locator("text=my records:")).toHaveCount(2)
    //click in date form to today
    await page.locator('.ims_block45').first().click();
    await page.click("text=Today")

    //step 8
    await page.click("text='Apply filters'")
    //filters visible in filetr tab and the list is ok
    await filter.checkFilterTabs(siteNames.auto, entities.hse)

    //step 9 reset filters
    await page.click("#reset-filter-button")
    await expect(page.locator("[title='List of Risk Assessments']")).toContainText(' List of Risk Assessments')

  })

  test('31059 - Smoke test - Risk Inventory filters (site, department, creation date, my records) @filter', async ({ dashBoard, navBar, page, commonFunc, filter }) => {
    await dashBoard.sidebarIsVisible()
    await dashBoard.topBarIsAvailable()

    await navBar.clickOnTopMenu("Risk Inventory")

    try {
      console.log("try to reset the filters")
      await page.click("#reset-filter-button", { timeout: 6000 })
      console.log("reseted")
    } catch (error) {
      console.log(error)
    }
    await expect(page.locator("data-testid=site-selector")).toHaveAttribute('title', 'All MY sites')

    expect(page.locator(".obs_csstable"))
    //step 3,4 // step 9 select main hazard category
    await commonFunc.searchCaseWithFilters("Risk Inventory", siteNames.auto, entities.administration, "Electrical hazards")
    //step 5 - custom filter window
    await page.click("[title='Edit filters']")
    //this is in the custom filter
    //step 6 
    await page.click("text=Recorded")
    //step 7
    await page.click("text=My records")
    //click in date form to today
    await page.locator('.ims_block45').first().click();
    await page.click("text=Today")
    
    //step 8
    await page.click("text='Apply filters'")

    
    //filters visible in filetr tab and the list is ok
    await filter.checkFilterTabs(siteNames.auto, entities.administration, " ", "Electrical hazards")
    console.log(entities.administration)

    //step 9 reset filters
    await page.click("#reset-filter-button")
    await expect(page.locator("[title='Risk inventory']")).toContainText('Risk inventory')




  })

})
