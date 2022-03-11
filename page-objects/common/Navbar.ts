import { expect, Locator, Page } from "@playwright/test";

export class Navbar {
    readonly page: Page
    readonly dashboard: Locator
    readonly activities: Locator
    readonly cases: Locator
    readonly actions: Locator
    readonly reports: Locator
    readonly riskAssesment: Locator
    readonly riskInventory: Locator
    readonly addNewCase: Locator
    readonly admin: Locator

    constructor(page: Page) {
        this.page = page
        this.dashboard = page.locator("text=Dashboard")
        this.activities = page.locator("[title=Activities]")
        this.cases = page.locator("(//a[@title='Cases'])[1]")
        this.actions = page.locator("[title=Actions]")
        this.reports = page.locator("[title=Reports]")
        this.riskAssesment = page.locator("text=Risk Assessment")
        this.riskInventory = page.locator("text=Risk Inventory")
        this.addNewCase = page.locator("[title='Add New Case']")
        this.admin = page.locator("text=Admin")
    }
    async clickOnTopMenu(tabName: string) {
        switch (tabName) {
            case "Dashboard":
                await this.dashboard.click()
                break
            case "Activities":
                await this.activities.click()
                break
            case "Cases":
                await this.cases.click()
                break
            case "Actions":
                await this.actions.click()
                break
            case "Reports":
                await this.reports.click()
                break
            case "Risk Assessment":
                await this.riskAssesment.click()
                break
            case "Risk Assessment":
                await this.riskInventory.click()
                break
            case "Risk Inventory":
                await this.dashboard.click()
                break
            case "Add New Case":
                await this.addNewCase.click()
                break
            case "Admin":
                await this.admin.click()
                break
            default:
                throw new Error("This is not a valid menu name...")
        }

    }
}