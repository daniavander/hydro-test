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

    //define contructors
    constructor(page: Page) {
        //this.page = page
        super(page)
        this.usernameInput = page.locator("#user_login")
        this.passwordInput = page.locator("#user_password")
        this.submitBtn = page.locator("text=Sign in")
        this.errorMessage = page.locator(".alert-error")

        this.loginFormLocator = page.locator("#login_form")
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
}