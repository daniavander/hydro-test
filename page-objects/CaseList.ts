import { Page, Locator, expect } from "@playwright/test";

export class CaseList {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async getCaseByDescriptionAndDoFromListPage(desc: string, action: string) {
        await this.page.click('text=' + desc + '')
        //hover three dot
        await this.page.hover("data-testid=case-submenu")
        await this.page.locator('text="' + action + '"').click();
        await this.page.click("//button[text()='Yes']")
        //check that the deleted is disapperared
        await expect(this.page.locator('text=' + desc + '')).toHaveCount(0)
    }

    async searchCaseByFilters(site: string, cat: string) {
        //uncheck all 
        await this.page.click("data-testid=site-selector")
        await this.page.locator('.csscheckbox').first().click()
        //step 4 site search input field
        await this.page.fill("#treeview-input-search", site)
        await this.page.keyboard.press('Enter')
        await this.page.click("(//div[@class='filter-title'])[1]")
        await this.page.click("//button[text()='OK']")
        //step 5
        await this.page.click("data-testid=ims-multi-select-entityType")
        //await this.page.locator('text=' + cat + '').first().click();
        //await this.page.click("//span[contains(@class, 'ml-2')][text()='" + cat + "']")
        await this.page.click('text="' + cat + '"')
        //span[contains(@class, 'ml-2')][text()=''+ cat +'']
        await this.page.click("(//button[text()=' OK '])[1]")
        await expect(this.page.locator("//h1[contains(@class,'m0i')]")).toContainText('Customized view')
    }

}