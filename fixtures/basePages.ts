//import { Page, Locator, expect } from "@playwright/test";
import {test as baseTest } from "@playwright/test";

import { LoginPage } from "@pages/Login.page"
import { Navbar } from "@pages/common/Navbar.page"

import { CaseList } from "@pages/CaseList"
import { CasePage } from "@pages/Case.page"
import { SurveyPage } from "@pages/Survey.page"
import { RaPage } from "@pages/RiskAssesment.page"

import { Dashboard } from "@pages/common/Dashboard.page"
import { Filter } from "@pages/common/Filter.page"
import { AddUserAction } from "@pages/common/AddUserAction"
import { AddPeopleDetails } from "@pages/common/PeopleDetails"
import { CommonFunc } from "@pages/common/CommonFuncs"

import { GetTexts} from "@pages/common/Getters"


const test = baseTest.extend<{
    dashBoard: Dashboard
    navBar : Navbar
    filter : Filter
    checkFilterTabs: Filter
    loginPage : LoginPage
    casePage : CasePage
    addSurvey : CasePage
    addReportedBy: CasePage
    getCardH2Text: CasePage
    getH3Text: CasePage
    surveyPage : SurveyPage
    raPage : RaPage
    caseList : CaseList
    commonFunc : CommonFunc
    addUserAction : AddUserAction
    
    addUserActionDots : AddUserAction
    fillInvestigation : AddUserAction
    fillInjuryDetails : AddUserAction
    fillClassificationTask : AddUserAction
    addPeopleDetails : AddPeopleDetails
    checkOpenedSurvey : SurveyPage
    addNewRA : RaPage
    checkRA : RaPage
    fillRA : RaPage
    addRADetails : RaPage
    addNewTaskToRa : RaPage
    addSingleRisk : RaPage
    addExistingMeasure: RaPage
    checkRiInRa: RaPage

    getTexts : GetTexts   
}>({
    dashBoard:async ({page}, use) => {
        await use(new Dashboard(page))
    },
    navBar:async ({page}, use) => {
        await use(new Navbar(page))
    },
    filter:async ({page}, use) => {
        await use(new Filter(page))
    },
    checkFilterTabs:async ({page}, use) => {
        await use(new Filter(page))
    },
    loginPage:async ({page}, use) => {
        await use(new LoginPage(page))
    },
    casePage:async ({page}, use) => {
        await use(new CasePage(page))
    },
    addSurvey:async ({page}, use) => {
        await use(new CasePage(page))
    },
    addReportedBy:async ({page}, use) => {
        await use(new CasePage(page))
    },
    getCardH2Text:async ({page}, use) => {
        await use(new CasePage(page))
    },
    getH3Text:async ({page}, use) => {
        await use(new CasePage(page))
    },
    caseList:async ({page}, use) => {
        await use(new CaseList(page))
    },
    commonFunc:async ({page}, use) => {
        await use(new CommonFunc(page))
    },
    addUserAction:async ({page}, use) => {
        await use(new AddUserAction(page))
    },
    addUserActionDots:async ({page}, use) => {
        await use(new AddUserAction(page))
    },
    
    fillInvestigation:async ({page}, use) => {
        await use(new AddUserAction(page))
    },
    fillInjuryDetails:async ({page}, use) => {
        await use(new AddUserAction(page))
    },
    fillClassificationTask:async ({page}, use) => {
        await use(new AddUserAction(page))
    },
    addPeopleDetails:async ({page}, use) => {
        await use(new AddPeopleDetails(page))
    },
    surveyPage:async ({page}, use) => {
        await use(new SurveyPage(page))
    },
    checkOpenedSurvey:async ({page}, use) => {
        await use(new SurveyPage(page))
    },
    raPage:async ({page}, use) => {
        await use(new RaPage(page))
    },
    addNewRA:async ({page}, use) => {
        await use(new RaPage(page))
    },
    checkRA:async ({page}, use) => {
        await use(new RaPage(page))
    },
    fillRA:async ({page}, use) => {
        await use(new RaPage(page))
    },
    addRADetails:async ({page}, use) => {
        await use(new RaPage(page))
    },
    addNewTaskToRa:async ({page}, use) => {
        await use(new RaPage(page))
    },
    addSingleRisk:async ({page}, use) => {
        await use(new RaPage(page))
    },
    addExistingMeasure:async ({page}, use) => {
        await use(new RaPage(page))
    },
    checkRiInRa:async ({page}, use) => {
        await use(new RaPage(page))
    },
    getTexts:async ({page}, use) => {
        await use(new GetTexts(page))
    }

})

export default test;
export const expect = test.expect;