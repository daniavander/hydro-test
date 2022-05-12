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
                await expect(this.page.locator("(//div[contains(@class,'" + locClass + "')])[1]/p")).toContainText(expected, { trim: true });
                //await this.page.textContent("(//div[contains(@class,'ims_block18 nowrap')])[1]/p")
                break;
            case "Actions":
                //ha az ősrégi icon technológia új lesz akkor használható majd a lenti sor
                //elemTextValue = await this.page.textContent("(//div[contains(@class,'" + locClass + "')])[2]/p")
                // addig ez van az actions oldalon
                await expect(this.page.locator("(//p[@class='" + locClass + "'])[1]")).toContainText(expected, { trim: true });
                console.log(elemTextValue)
                break;
            default:
                break;
        }
    }
}