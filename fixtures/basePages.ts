//import { Page, Locator, expect } from "@playwright/test";
import {test as baseTexst } from "@playwright/test";

import { LoginPage } from "../page-objects/Login.page"
import { Navbar } from "../page-objects/common/Navbar.page"

import { CaseList } from "../page-objects/CaseList"
import { CasePage } from "../page-objects/Case.page"
//import { Dashboard } from "../page-objects/common/Dashboard"
import { Dashboard } from "@pages/common/Dashboard.page"
import { AddUserAction } from "../page-objects/common/AddUserAction"


const test = baseTexst.extend<{
    dashBoard: Dashboard
    navBar : Navbar
    loginPage : LoginPage
    casePage : CasePage
    caseList : CaseList
    addUserAction : AddUserAction
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

})

export default test;
export const expect = test.expect;