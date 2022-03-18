import { Page, Locator, expect } from "@playwright/test";

export class CasePage {
    readonly page: Page
    readonly hours: Locator
    readonly departmentName: Locator
    readonly ifeType: Locator
    readonly injuryType: Locator
    readonly healthType: Locator
    readonly envType: Locator
    readonly fireType: Locator
    readonly auditType: Locator
    readonly wocType: Locator
    readonly secType: Locator
    readonly qaType: Locator
    readonly hseType: Locator


    readonly addUDA: Locator

    constructor(page: Page) {
        this.page = page
        this.hours = page.locator("(//div[contains(@class, 'p-hour-picker')]/span)")
        this.departmentName = page.locator("[title=Administration]")

        //case types
        this.auditType = page.locator("#test-audit")
        this.wocType = page.locator("#test-woc")
        this.secType = page.locator("#test-security")
        this.qaType = page.locator("#test-quality")
        this.hseType = page.locator("#test-hse")
    }

    async getHour() {
        //fixme
        const acctHour = await this.page.$("(//div[contains(@class, 'p-hour-picker')]/span)")
        console.log(acctHour)
    }

    async setSite(loc: string) {
        //TODO create sting list or dict with severity names
        //ha van space a névben akkor: Very\\ high

        await this.page.locator("//span[text()='please choose...']").click()
        await this.page.locator("[aria-label='" + loc + "']").click()
    }

    async setDepartment(depName: string) {
        await this.page.click("#filter-department")
        await this.page.locator("[title=" + depName + "]").click()
    }

    async setTypeAndSev(type: string, level: string) {
        await this.page.locator("#" + type + "").click()
        await this.page.locator("[aria-label='" + level + "']").click()
    }

    async setCaseType(caseType) {
        switch (caseType) {
            case "Audit":
                await this.auditType.click()
                break
            case "WOC":
                await this.wocType.click()
                break
            case "Security":
                await this.secType.click()
                break
            case "Health":
                await this.healthType.click()
                break
            case "QA":
                await this.qaType.click()
                break
            case "HSE":
                await this.hseType.click()
                break
            default:
                throw new Error("This is not a valid case type name...")
        }
    }

    async fillDescription(msg: string) {
        await this.page.fill("textarea", msg)
    }

    async addMainAndSubTag(mainTag: string, alTag: string) {
        await this.page.locator("//span[text()='" + mainTag + "']").click()
        await this.page.click("[aria-label='" + alTag + "']")
        await this.page.click(".sop-add-new-modal-save")
    }

    async addMainAndSubTagWithoutBtn(mainTag: string, alTag: string) {
        await this.page.locator("//span[text()='" + mainTag + "']").click()
        await this.page.click("[aria-label='" + alTag + "']")
    }

    async pageContainsActionCorrectly(description: string, instruction: string){
        // the card is visible after saving it?
        // the created action card is contain correctly the added texts?
        expect(this.page.isVisible(".tile.my-task.active"))
        expect(this.page.isVisible("//p[text()='" + description + "']"))
        expect(this.page.isVisible("//p[text()='" + instruction + "']"))
    }

    async snapshotGhostCard() {
        const ghostCard = await this.page.locator(".ghost-action-card-tile-list-common")
        await ghostCard.screenshot({ path: 'ghostcard.png' })
        expect(await ghostCard.screenshot()).toMatchSnapshot("ghostcard2.png")
    }
}