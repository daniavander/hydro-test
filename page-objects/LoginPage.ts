import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "../common/AbstractPage";

export class LoginPage extends AbstractPage {
    //define selectors
    //readonly page: Page
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly submitBtn: Locator
    readonly errorMessage: Locator
    readonly loginFormLocator: Locator
    //for pipelines
    readonly nameInput: Locator
    readonly displayedName: Locator
    readonly pwdInput: Locator
    readonly remember: Locator
    readonly header: Locator

    //define contructors
    constructor(page: Page) {
        //this.page = page
        super(page)
        this.usernameInput = page.locator("#user_login")
        this.passwordInput = page.locator("#user_password")
        this.submitBtn = page.locator("text=Sign in")
        this.errorMessage = page.locator(".alert-error")
        this.loginFormLocator = page.locator("#login_form")
        //for pipelines
        this.nameInput = page.locator("#i0116")
        this.displayedName = page.locator("#displayName")
        this.pwdInput = page.locator("#i0118")
        this.remember = page.locator("text=Yes")
        this.header = page.locator(".top-menu-container")
    }
    // define methods
    async login(username: string, password: string) {
        await this.usernameInput.type(username)
        await this.passwordInput.type(password)
        await this.submitBtn.click()
    }

    async assertErrorMsg(msg: string) {
        await expect(this.errorMessage).toContainText(msg)
    }
    async snapshotLoginForm() {
        expect(await this.loginFormLocator.screenshot()).toMatchSnapshot('login-form.png')
    }

    async snapshotErrorMessage() {
        expect(await this.errorMessage.screenshot()).toMatchSnapshot('login-error.png')
    }


    //login in pipeline!
    async loginInAzure(page) {
        await this.nameInput.type('imstestglobaladmin1@avander.hu')
        await page.keyboard.press('Enter');
        await page.waitForSelector(this.displayedName)
        await this.pwdInput.type('123ims456!')
        await page.keyboard.press('Enter')
        await page.waitForSelector(this.remember)
        await page.locator(this.remember).click()
        await page.locator(this.header).screenshot({ path: 'side-panel-content.png' })
    }
}