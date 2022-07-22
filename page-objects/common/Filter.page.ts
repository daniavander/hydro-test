import { expect, Locator, Page } from "@playwright/test";
import { Helpers } from "@fixtures/helpers"

export class Filter {
    readonly page: Page
    readonly dashboard: Locator

    constructor(page: Page) {
        this.page = page
        this.dashboard = page.locator("text=Dashboard")
    }
    async checkFilterTabs(site: string, entity: string, addBy="username", plusParam?: string) {
        expect(this.page.locator('data-testid=detailedfilter.label.site: ' + site + '')).toBeEnabled()
        
        //await this.page.pause()
        if (entity === "Injury Free Event") {
            await expect(this.page.locator('data-testid=detailedfilter.label.entity: ' + entity + '')).toBeEnabled()
            await expect(this.page.locator('data-testid=detailedfilter.label.myrecords: ' + addBy + '')).toBeEnabled()
            await expect(this.page.locator('data-testid=filter.tag.' + plusParam + ': true')).toBeEnabled()
        } if (entity === "HSE") {
            await expect(this.page.locator('data-testid=detailedfilter.label.department: ' + entity + '')).toBeEnabled()
        } if (entity === "Administration") {
            expect(this.page.locator('data-testid=detailedfilter.label.department: ' + entity + '')).toBeEnabled()
            await expect(this.page.locator('data-testid=detailedfilter.label.hazard-type: ' + plusParam + '')).toBeEnabled()
        } if (entity === "Signature") {
            await  expect(this.page.locator('data-testid=detailedfilter.label.entity: ' + entity + '')).toBeEnabled()
            await expect(this.page.locator('data-testid=detailedfilter.label.myrecords: ' + addBy + '')).toBeEnabled()
        }

    }
}