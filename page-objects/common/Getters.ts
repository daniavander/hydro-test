import { Page, expect } from "@playwright/test";

export class GetTexts {
    readonly page: Page
    
    constructor(page: Page){
        this.page= page
    }

    async getDivFirstElementText(locClass: string, expected: string) {
        //add class CONTAINS for h3 tag and the expected text
        const elemTextValue = await this.page.locator("(//div[contains(@class,'" + locClass + "')])[1]/p").allTextContents()
        expect(elemTextValue.toString()).toBe(expected)
    }
}