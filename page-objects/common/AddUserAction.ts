import { expect, Locator, Page } from "@playwright/test";

export class AddUserAction {
    readonly page: Page
    readonly description: Locator
    readonly instruction: Locator


    constructor(page: Page) {
        this.page = page
        this.description = page.locator("(//textarea)[2]")
        this.instruction = page.locator("(//textarea)[3]")
    }


    async addDescription(msg) {
        await this.description.type(msg)
    }
    async addInstruction(msg) {
        await this.instruction.type(msg)
    }

    async addTags(main: string, sub: string) {
        //main: tagname
        //sub: subtagname
        await this.page.locator("//span[text()='" + main + "']").click();
        await this.page.locator("[aria-label=" + sub + "]").click();
        await this.page.locator("//button[text()='Save changes']").click()
    }


    async addNewAction(desc: string, inst: string, name: string, main: string, sub: string) {

        await this.page.locator("//span[text()='Add new action']").click()
        await this.page.locator("(//textarea)[2]").type(desc)
        await this.instruction.type(inst)
        //TODO it is not working in webkit
        await this.page.locator('[placeholder="Add\\ responsible"]').click()
        //TODO it is not working in webkit
        await this.page.locator("//div[text()='" + name + "']").click();
        await this.page.locator("//span[text()='" + main + "']").click();
        await this.page.locator("[aria-label=" + sub + "]").click();
        await this.page.locator("//button[text()='Save changes']").click()
    }
}