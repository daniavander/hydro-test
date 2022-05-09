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
        this.injuryType = page.locator("#test-injury")
        this.ifeType = page.locator("#test-ife")
        this.wocType = page.locator("#test-woc")
        this.secType = page.locator("#test-security")
        this.qaType = page.locator("#test-quality")
        this.hseType = page.locator("#test-hse")
    }

    async getHour() {
        const acctHour = await this.page.$("(//div[contains(@class, 'p-hour-picker')]/span)")
        console.log(acctHour)
    }

    async setSite(loc: string) {
        //TODO create sting list or dict with severity names
        //ha van space a névben akkor: Very\\ high

        //fixme after Product Backlog Item 32000: Automated Test - Unique data-testid for please choose sites dropdown done
        //fyi itt változik a szám nélha
        await this.page.pause()
        //await this.page.locator("#pr_id_16_label").click()
        await this.page.locator("[aria-label='" + loc + "']").click()
    }

    async setDepartment(depName: string) {
        await this.page.click("button#filter-department")
        const element = this.page.locator("[title=" + depName + "]")
        await element.scrollIntoViewIfNeeded()
        await this.page.locator("[title=" + depName + "]").click()
    }

    async setTypeAndSev(type: string, level: string) {
        await this.page.locator("#" + type + "").click()
        await this.page.locator("[aria-label='" + level + "']").click()
    }



    async setCaseType(caseType: any, variable: string) {
        var validCaseType = true
        switch (caseType) {
            case "Audit":
                await this.auditType.click()
                break
            case "woc":
                //await this.page.pause()
                await this.wocType.click()
                await this.page.locator('text=Please choose...').click();
                await this.page.locator('text=Interjú').click()
                await this.page.fill('[placeholder="Interviewed"]', variable)
                //await this.page.click("text=" + variable + "")
                await this.page.locator('text=ImsTestGlobalAdmin3(ImsTestGlobalAdmin3@avander.hu)').click();
                //await this.page.click("//div[text()='I3']/following-sibling::div")

                break
            case "Security":
                await this.secType.click()
                break
            case "ife":
                await this.ifeType.click()
                await this.page.locator("[aria-label='" + variable + "']").click()
                break
            case "injury":
                await this.injuryType.click()
                await this.page.locator("[aria-label='" + variable + "']").click()
                await this.page.locator("(//div[@role='checkbox'])[2]").click()
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
                validCaseType = false
                throw new Error("This is not a valid case type name...")
        }
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

    async fillDescription(msg: string) {
        await this.page.fill("textarea", msg)
    }


    async pageContainsActionCorrectly(description: string, instruction: string) {
        //todo megnézni h működik e faszán
        // the card is visible after saving it?
        // the created action card is contain correctly the added texts?
        expect(await this.page.isVisible(".tile.my-task.active"))
        //await this.page.pause()
        expect(await this.page.isVisible("text=" + description + ""))
        expect(await this.page.isVisible("text=" + instruction + ""))
    }
    async getCardH2Text(locClass: string, expected: string) {
        //add class for h2 tag and the expected text
        const elemTextValue = await this.page.locator("//h2[@class='" + locClass + "']/p").allTextContents()
        expect(elemTextValue.toString()).toBe(expected)
    }

    async getH3Text(locClass: string, expected: string) {
        //add class CONTAINS for h3 tag and the expected text
        const elemTextValue = await this.page.locator("//h3[contains(@class,'" + locClass + "')]/a").allTextContents()
        //h3[contains(@class,'warning translation')]/a
        expect(elemTextValue.toString()).toBe(expected)
    }

    async snapshotGhostCard() {
        const ghostCard = await this.page.locator(".ghost-action-card-tile-list-common")
        await ghostCard.screenshot({ path: 'ghostcard.png' })
        expect(await ghostCard.screenshot()).toMatchSnapshot("ghostcard2.png")
    }

    async addSurvey(type: string, category: string, itemNum: number) {
        await this.page.click("text=Add new survey")
        await this.page.click("text=" + type + "")
        await this.page.click("text=" + category + "")
        await this.page.click("text=Add items: " + itemNum + "")
        await console.log("---------")
    }
}