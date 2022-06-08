import { Page, expect } from "@playwright/test";

export class RaPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async addNewRA(raName: string, siteName: string, department: string) {
        await this.page.click("[title='Add new Risk Assessment']")
        await this.page.fill('[placeholder="Add Assessment Title"]', raName)
        //pbi ba lesznek data-testid-k addig így van
        //TODO
        await this.page.click("//span[text()='please choose...']")
        await this.page.click("text=" + siteName + "")
        await this.page.click("#filter-department")
        await this.page.click("[title=" + department + "]")
        await this.page.click("text='Add'")
        //check that new RA ops correct or not
    }

    async checkRA(raName: string, raState: string, siteShortName: string, depName: string) {
        //site and department check
        expect(this.page.isVisible("//h2[@title='" + raName + "']"))
        expect(this.page.isVisible("//p[@title='" + raState + "']"))
        // site short name and deparment check
        const title = this.page.locator('text=' + siteShortName + ' | ' + depName + '')
        await expect(title).toHaveText(siteShortName + ' | ' + depName)
    }

    async fillRA(description: string, main: string, sub: string, tags: string[]) {
        // string tömbel szeretném beadni a tag nevet és az opciót addTags2
        await this.page.fill('textarea', description)
        await this.page.locator("//span[text()='" + main + "']").click();
        await this.page.locator("[aria-label=" + sub + "]").click();
        //await this.addTags2(tags[])
    }

    async addTags2(tags: string[]) {
        await this.page.locator("//span[text()='" + tags[0] + "']").click();
        await this.page.locator("[aria-label=" + tags[1] + "]").click();
    }

    async addRADetails(functionName: string, groupSiteName: string, frequency: string, num: string) {
        await this.page.click("[title='" + functionName + "']")
        switch (functionName) {
            case "Affected groups / SEG":
                await this.page.click("[title='Select job group']")
                await this.page.click("[title='" + groupSiteName + "']")
                await this.page.click("[title='Select frequency']")
                await this.page.click("[title='" + frequency + "']")
                await this.page.fill("//input[@min='0']", num)
                await this.page.click("[title='Add']")
                //check that the row is on RA page
                await expect(this.page.locator(".affectedrole-jobposition-name")).toBeVisible()
                await expect(this.page.locator("[title='2 person(s)']")).toContainText(num)
                await expect(this.page.locator("[title='" + frequency + "']")).toHaveText("Daily")
                break
            case "Safety Signs":
                await this.page.click("text='Boots'")
                await this.page.click("text='Select'")
                await expect(this.page.locator("//h2[@title='General PPE']")).toBeVisible()
                await expect(this.page.locator("//div[@title='Boots']")).toBeVisible()
                break
            case "WOC: control questions":
                await this.page.fill("//input[@placeholder='New woc question title']", "control woc auto")
                await this.page.click("//button[text()='Add']")
                await expect(this.page.locator("//h2[@title='WOC Questions']")).toBeVisible()
                await expect(this.page.locator(".aq-checkitem-row")).toBeVisible()
                break
            case "Steps":
                await this.page.fill("//input[@placeholder='New step title']", "step auto")
                await this.page.click("//button[text()='Add']")
                await expect(this.page.locator("//h2[@title='Steps']")).toBeVisible()
                await expect(this.page.locator(".aq-checklist-row.ims_flex")).toBeVisible()
                break
            case "Connected persons":

                await this.page.click("text='Please choose...'")
                await this.page.click("text='Interviewed'")
                await this.page.fill("//input[@placeholder='Add related person']", "ImsTestGlobalAdmin3")
                await this.page.click("//div[contains(@class,'user-img f')]")
                await this.page.click("//button[text()='Ok']")
                //add people details ok
                await this.page.click("//button[text()='Ok']")
                await expect(this.page.locator("//h2[@title='Connected persons']")).toBeVisible()
                await expect(this.page.locator(".sub-menu-header")).toBeVisible()

                break
            case "Health":
                break
            case "QA":
                break
            case "HSE":
                break
            default:
                throw new Error("This is not a valid RA function name...")
        }
    }

    async addNewTaskToRa(taskName: string, desc: string, frequency: string) {
        await this.page.click("text=Add new task")
        await this.page.fill("//input[@placeholder='New task title']", taskName)
        await this.page.click("//button[text()='Add']")
        await this.page.fill("textarea", desc)
        //add new frequeny - step 14
        await this.page.click("text='Frequency'")
        await this.page.click("text=Select frequency")
        await this.page.click("[title='" + frequency + "']")
        await this.page.click("text='Add'")
        //check frequency is visible or not
        await expect(this.page.locator("//h2[@title='Frequency']")).toBeVisible()
        await expect(this.page.locator("[title='" + frequency + "']")).toBeVisible()

    }
}