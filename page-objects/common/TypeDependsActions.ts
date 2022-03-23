import { expect, Locator, Page } from "@playwright/test";
import { caseType, secLevels, departments } from "@fixtures/constans"

export class TypeDependsActions {
    readonly page: Page



    constructor(page: Page) {
        this.page = page

    }


    async selectedCaseType(caseType: any) {
        switch (caseType) {
            case "injury":
                await this.page.locator("(//div[@role='checkbox'])[1]").click()
                break
            default:
                throw new Error("This is not a valid case type name...")
        }
    }
}