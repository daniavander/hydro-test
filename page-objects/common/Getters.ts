import { Page, expect } from "@playwright/test";

export class GetTexts {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async getDivElementTextOnListPage(locClass: string, expected: string, page: String) {
        //add class CONTAINS for h3 tag and the expected text
        var elemTextValue = null
        switch (page) {
            case "Cases":
                elemTextValue = await this.page.textContent("(//div[contains(@class,'" + locClass + "')])[1]/p")
                console.log(elemTextValue)
                break;
            case "Actions":
                elemTextValue = await this.page.textContent("(//div[contains(@class,'" + locClass + "')])[2]/p")
                console.log("----  " + elemTextValue)
                break;
            default:
                break;
        }
        expect(elemTextValue).toBe(expected)
    }
}