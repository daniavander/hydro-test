//import { Page, Locator, expect } from "@playwright/test";
import {test as baseTest } from "@playwright/test";

import { LoginPage } from "@pages/Login.page"
import { Navbar } from "@pages/common/Navbar.page"

import { CaseList } from "@pages/CaseList"
import { CasePage } from "@pages/Case.page"
import { SurveyPage } from "@pages/Survey.page"

import { Dashboard } from "@pages/common/Dashboard.page"
import { AddUserAction } from "@pages/common/AddUserAction"
import { AddPeopleDetails } from "@pages/common/PeopleDetails"


const test = baseTest.extend<{
    dashBoard: Dashboard
    navBar : Navbar
    loginPage : LoginPage
    casePage : CasePage
    addSurvey : CasePage
    getCardH2Text: CasePage
    getH3Text: CasePage
    surveyPage : SurveyPage
    caseList : CaseList
    searchCaseByFilters : CaseList
    addUserAction : AddUserAction
    
    addUserActionDots : AddUserAction
    fillInvestigation : AddUserAction
    fillInjuryDetails : AddUserAction
    fillClassificationTask : AddUserAction
    addPeopleDetails : AddPeopleDetails
    checkOpenedSurvey : SurveyPage
    
}>({
    dashBoard:async ({page}, use) => {
        await use(new Dashboard(page))
    },
    navBar:async ({page}, use) => {
        await use(new Navbar(page))
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
    getCardH2Text:async ({page}, use) => {
        await use(new CasePage(page))
    },
    getH3Text:async ({page}, use) => {
        await use(new CasePage(page))
    },
    caseList:async ({page}, use) => {
        await use(new CaseList(page))
    },
    searchCaseByFilters:async ({page}, use) => {
        await use(new CaseList(page))
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
    }

})

export default test;
export const expect = test.expect;