import { expect, Locator, Page } from "@playwright/test";

export class Dashboard {
    readonly page: Page
    readonly sideBar: Locator
    readonly topBar: Locator
    //readonly linkFeedback: Locator

    constructor(page: Page) {
        this.page = page
        this.sideBar = page.locator(".side-panel-content")
        this.topBar = page.locator(".top-menu-container")
    }

    async visit() {
        await this.page.goto("http://zero.webappsecurity.com")
    }

    async sidebarIsVisible() {
        await this.page.waitForTimeout(5000)
        await this.sideBar.isVisible()
    }
    async snapshotSideBar() {
        //take snapshot about the sidebar, took next to the test, tofast just take a white shot
        expect(await this.sideBar.screenshot()).toMatchSnapshot('screenshot/snapshotSideBar.png')
    }

    async topBarIsAvailable() {
        await this.topBar.elementHandle()
    }
    async snapshotTopBar() {
        expect(await this.topBar.screenshot()).toMatchSnapshot('topBar.png')
    }

    async searchFor(search: string) {
    }
}