import { expect, Locator, Page } from "@playwright/test";

export class AddPeopleDetails {
    readonly page: Page
    readonly description: Locator
    readonly instruction: Locator


    constructor(page: Page) {
        this.page = page
        this.description = page.locator("(//textarea)[2]")
        this.instruction = page.locator("(//textarea)[3]")
    }


    async addDescription(msg: string) {
        await this.description.type(msg)
    }
    async addInstruction(msg: string) {
        await this.instruction.type(msg)
    }

    async injuredPerson(name: string, overtime: string, comment: string) {
        //await this.page.pause()
        await this.page.fill('[placeholder="Injured\\ person"]', name)
        //await this.page.locator("//div[text()='" + name + "']").click();
        
  // Click text=ImsTestGlobalAdmin3(ImsTestGlobalAdmin3@avander.hu)
        await this.page.locator('text=ImsTestGlobalAdmin3(ImsTestGlobalAdmin3@avander.hu)').click();

        //popup check
        await this.page.waitForSelector("[title='Hydro']")
        await this.page.waitForSelector("[title='Injured']")


        await (await this.page.waitForSelector("[title='HSE']")).textContent()
        await (await this.page.waitForSelector("(//span[text()='" + overtime + "'])[2]")).textContent()
        
        //textarea[@rows='1'])[2]
        await this.page.fill("(//textarea[@rows='1'])[2]", comment)

        await this.page.locator("[title='Ok']").click();
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
    /*async addNewAction(desc: string, inst: string, name: string, tagname: string, subtag: string) {
        await this.page.locator("//span[text()='Add new action']").click()
        await this.page.locator("(//textarea)[2]").type(desc)
        await this.instruction.type(inst)
        await this.page.fill('[placeholder="Add\ responsible"]', name)
        await this.page.locator("//div[text()='" + name + "']").click();
        await this.page.locator("//span[text()='" + tagname + "']").click();
        await this.page.locator("[aria-label=" + subtag + "]").click();
        await this.page.locator("//button[text()='Save changes']").click()
    }*/
}