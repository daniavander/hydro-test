//import { Page, Locator, expect } from "@playwright/test";
import {test as baseTest } from "@playwright/test";

import { LoginPage } from "@pages/Login.page"
import { Navbar } from "@pages/common/Navbar.page"

import { CaseList } from "@pages/CaseList"
import { CasePage } from "@pages/Case.page"

import { Dashboard } from "@pages/common/Dashboard.page"
import { AddUserAction } from "@pages/common/AddUserAction"
import { AddPeopleDetails } from "@pages/common/PeopleDetails"


const test = baseTest.extend<{
    dashBoard: Dashboard
    navBar : Navbar
    loginPage : LoginPage
    casePage : CasePage
    caseList : CaseList
    addUserAction : AddUserAction
    addPeopleDetails : AddPeopleDetails
    addUserActionDots : AddUserAction
    fillInvestigation : AddUserAction
    fillInjuryDetails : AddUserAction
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
    caseList:async ({page}, use) => {
        await use(new CaseList(page))
    },
    addUserAction:async ({page}, use) => {
        await use(new AddUserAction(page))
    },
    addPeopleDetails:async ({page}, use) => {
        await use(new AddPeopleDetails(page))
    },
    addUserActionDots:async ({page}, use) => {
        await use(new AddUserAction(page))
    },
    fillInvestigation:async ({page}, use) => {
        await use(new AddUserAction(page))
    },
    fillInjuryDetails:async ({page}, use) => {
        await use(new AddUserAction(page))
    }

})

export default test;
export const expect = test.expect;