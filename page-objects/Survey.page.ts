import { Page, Locator, expect } from "@playwright/test";

export class SurveyPage {
    readonly page: Page
    readonly status: Locator



    constructor(page: Page) {
        this.page = page
        this.status = page.locator("//div[text()='Ongoing']")


    }

    async checkOpenedSurvey(status: string, yesOrNo:string) {
        //await this.page.pause()
        await this.page.click("text=0or1")
        //status check
        await expect(this.page.locator("//div[@class='ml-2 ims_color-ims-blue']")).toContainText(status)
        //fill textarea
        //await this.page.fill("//input[@placeholder='Write down your answer here']","automated risk checklist text")
        await this.page.click("(//span[@title='" + yesOrNo + "'])[1]")
        await this.page.click("(//span[@title='" + yesOrNo + "'])[2]")
        await this.page.click("//div[text()='Mark as Completed']")

    }
}