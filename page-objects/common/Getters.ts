import { Page, expect } from "@playwright/test";

import { Helpers } from "@fixtures/helpers"

export class GetTexts {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async getDivElementTextOnListPage(locClass: string, expected: string, page: String) {
        //add text value and check that it is in the first on the list
        var elemTextValue = null
        
        switch (page) {
            case "Cases":
                await expect(this.page.locator("(//p[@class='" + locClass + "'])[1]")).toContainText(expected, { trim: true })
                //await this.page.textContent("(//div[contains(@class,'ims_block18 nowrap')])[1]/p")
                break;
            case "Actions":
                //ha az ősrégi icon technológia új lesz akkor használható majd a lenti sor
                //elemTextValue = await this.page.textContent("(//div[contains(@class,'" + locClass + "')])[2]/p")
                // addig ez van az actions oldalon subjectre lövök
                await expect(this.page.locator("(//p[@class='" + locClass + "'])[1]")).toContainText(expected, { trim: true })
                console.log(elemTextValue)
                break;
            default:
                break;
        }
    }

    async getGhostCardTitle(cardName:string, iconNameForType:string){
        //cardName: after care, investigation...
        //iconNameForType: icon name
        var temp:Helpers = new Helpers(cardName)
        const finalResult = temp.toCamelWords(cardName)
        const finalLoc = this.page.locator("text=" + finalResult + "")
        //const finalLoc = this.page.locator('text=Investigation').nth(1)
        //fixme after Product Backlog Item 34111: Automation test - data-testid for action cards
        // jelenleg több after care,investigation text van a domban ezért nem megy
        //todo Serious Injury emiatt van skippelve
        //const finalLoc = this.page.locator('text=After Care').nth(1)
        //await this.page.locator('text=After Care').nth(1).click();
        await expect(finalLoc).toHaveClass("icon-" + iconNameForType + " ghost-action-card-" + iconNameForType + " ghost-action-card-iccon ng-star-inserted");
    }
}      