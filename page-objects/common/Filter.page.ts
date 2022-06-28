import { expect, Locator, Page } from "@playwright/test";
import { Helpers } from "@fixtures/helpers"

export class Filter {
    readonly page: Page
    readonly dashboard: Locator

    constructor(page: Page) {
        this.page = page
        this.dashboard = page.locator("text=Dashboard")
    }
    async checkFilterTabs(site: string, entity: string, addBy: string, time: string) {
        //await this.page.click("data-testid='" + filter1 +'"')
        expect (this.page.locator('data-testid=detailedfilter.label.site: ' + site + '')).toBeEnabled()
        expect (this.page.locator('data-testid=detailedfilter.label.entity: ' + entity + '')).toBeEnabled()
        expect (this.page.locator('data-testid=detailedfilter.label.myrecords: ' + addBy + '')).toBeEnabled()
        expect (this.page.locator('data-testid=filter.tag.' + time + ': true')).toBeEnabled()

        }

    
}