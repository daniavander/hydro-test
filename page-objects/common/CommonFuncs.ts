import { Page, expect } from "@playwright/test"

import { Navbar } from "@pages/common/Navbar.page"

export class CommonFunc extends Navbar {
    //readonly page: Page

    constructor(page: Page) {
        super(page)
    }

    async deleteCase() {
        //await page.click("//button[text()='Mark as Completed']")
    }

    async searchCaseWithFilters(pageName: string, site: string, cat: string) {
        //uncheck all 
        await this.page.click("data-testid=site-selector")
        //uncheck all site
        await this.page.locator('.csscheckbox').first().click()
        //step 4 site search input field
        await this.page.fill("#treeview-input-search", site)
        await this.page.keyboard.press('Enter')
        await this.page.click("(//div[@class='filter-title'])[1]")
        await this.page.click("//button[text()='OK']")
        const decideWhichPage = new CommonFunc(this.page)
        decideWhichPage.clickOnTopMenu(pageName)
        //step 5
        if (pageName === "Cases") {
            await this.page.click("data-testid=ims-multi-select-entityType")
            await this.page.click('text="' + cat + '"')
            await this.page.click("(//button[text()=' OK '])[1]")
            await expect(this.page.locator("//h1[contains(@class,'m0i')]")).toContainText('Customized view')
        } if (pageName === "Risk Assessment") {
            await this.page.click("data-testid=ims-multi-select-undefined")
            await this.page.click('text="' + cat + '"')
            await this.page.click('text=OK')
        }
    }
}