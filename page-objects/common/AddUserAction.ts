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


    async addDescription(msg: string) {
        await this.description.type(msg)
    }
    async addInstruction(msg: string) {
        await this.instruction.type(msg)
    }

    async addResponsible(name: string) {
        //ha placeholder van akkor csak egy \ a space előtt !!!!!!!!!!!!!!!!!!!!!!!!!!!
        await this.page.fill('[placeholder="Add\ responsible"]', 'imstestglobaladmin3')
        await this.page.locator('//div[text()="(' + name + ')"]').click();
    }

    async addTags(main: string, sub: string) {
        //main: tagname
        //sub: subtagname
        await this.page.locator("//span[text()='" + main + "']").click();
        await this.page.locator("[aria-label=" + sub + "]").click();
        //await this.page.locator("//button[text()='Save changes']").click()
        // Click text=Add Action tag
    }


    

    //add udaction
    async addNewAction(desc: string, inst: string, name: string, tagname: string, subtag: string) {
        await this.page.locator("//span[text()='Add new action']").click()
        await this.page.locator("(//textarea)[2]").type(desc)
        await this.instruction.type(inst)
        await this.page.fill('[placeholder="Add\ responsible"]', name)
        await this.page.locator("//div[text()='" + name + "']").click();
        await this.page.locator("//span[text()='" + tagname + "']").click();
        await this.page.locator("[aria-label=" + subtag + "]").click();
        //await this.page.locator("//button[text()='Save changes']").click()
        await this.page.click('text=Save changes')
    }

    async addActionWith3Dot(type: string) {
        //hover three dot
        await this.page.hover("data-testid=case-submenu")
        await this.page.locator("." + type + "").click()
    }

    async fillInvestigationTask(finding: string, tagname: string, subtag: string) {
        await this.page.click("data-testid=uda.investigation")
        await this.page.fill("(//textarea[@rows='1'])[2]", finding)
        await this.page.locator("//span[text()='" + tagname + "']").click();
        await this.page.locator("[aria-label=" + subtag + "]").click();
        await this.page.click("text=Mark as Completed")
        //check that the comment is visible after save
        expect(this.page.isVisible("//p[@title='" + finding + "']"))
        //check that the status is completed of the task
        expect(this.page.isVisible("(//span[text()='Completed'])[1]"))
    }
    async fillInjuryDetailsTask(injury: string, specify: string, location: string, locationspecify: string, comment: string) {
        await this.page.click("data-testid=uda.injurydetails")
        await this.page.click("[title='" + injury + "']")
        await this.page.click("[title='" + specify + "']")
        await this.page.click("#" + location + "")
        await this.page.click("//span[text()='" + locationspecify + "']")
        await this.page.fill("(//textarea[@rows='1'])[2]", comment)
        await this.page.click('text=Mark as Completed')
        //check that the comment is visible after save
        expect(this.page.isVisible("text=" + injury + ""))
        //check that the status is completed of the task
        expect(this.page.isVisible("(//span[text()='Completed'])[2]"))
    }
    async fillClassificationTask(recordable: string, type: string, level: string) {
        await this.page.click("data-testid=uda.injury")
        await this.page.click("(//span[text()='" + recordable + "'])[2]")
        if (recordable === "Yes") {
            await this.page.click("text=" + type + "")
            // Click [aria-label="Very\ high"]
            //await page.locator('[aria-label="Very\\ high"]').click();
            await this.page.click("[aria-label='" + level + "']")
        }
        await this.page.locator("//span[text()='Add obligatory']").click();
        await this.page.locator("[aria-label=aa]").click();
        await this.page.click("text=Mark as Completed")
    }
}