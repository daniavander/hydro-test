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

    async addResponsible(loc: string) {
        //loc: Kovács Dániel(kovacs.daniel@avander.hu)
        //ha placeholder van akkor csak egy \ a space előtt !!!!!!!!!!!!!!!!!!!!!!!!!!!
        await this.page.locator('[placeholder="Add\ responsible"]').click()
        //fixme faszért nem megy paraméterrel
        await this.page.locator('text=Kovács Dániel(kovacs.daniel@avander.hu)').click();
        //await this.page.locator("text=" + loc + "]").click();
        //await this.page.locator('text=Kovács Dániel(kovacs.daniel@avander.hu)').click();
    }

    async addTags(main: string, sub: string) {
        //main: tagname
        //sub: subtagname
        await this.page.locator("//span[text()='" + main + "']").click();
        await this.page.locator("[aria-label=" + sub + "]").click();
        await this.page.locator("//button[text()='Save changes']").click()
        // Click text=Add Action tag
    }

    //add udaction


    async addNewAction(desc: string, inst: string, name: string, main: string, sub: string) {
        /*
        await page.locator("//span[text()='Add new action']").click()
    await addUserAction.addDescription("lorem ipsom dolor sit amen")
    await addUserAction.addInstruction("instruction")
    await addUserAction.addResponsible("Kovács\\ Dániel(kovacs.daniel@avander.hu)")
    await addUserAction.addTags("Add Action tag", "action1")
    */
        await this.page.locator("//span[text()='Add new action']").click()
        await this.page.locator("(//textarea)[2]").type(desc)
        await this.instruction.type(inst)
        await this.page.locator('[placeholder="Add\ responsible"]').click()
        await this.page.locator("//div[text()='" + name + "']").click();
        await this.page.locator("//span[text()='" + main + "']").click();
        await this.page.locator("[aria-label=" + sub + "]").click();
        await this.page.locator("//button[text()='Save changes']").click()
    }
}