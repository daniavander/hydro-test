import { expect, Locator, Page } from "@playwright/test";


export class LoginPage {
    //define selectors
    readonly page: Page
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
        this.page = page
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
    async loginInAzure() {
    await console.log("login azure webkit")
    
    var emailaddress = "ImsTestGlobalAdmin1@avander.hu"

    await this.page.type("id=i0116",emailaddress)
    await this.page.locator('text=Next').click()
    await this.page.screenshot({ path: 'screenshot/email.png' });
    //await delay(2000);

    var pwd = "123ims456!"
    await this.page.type("id=i0118", pwd , { timeout: 10000 } )
    //await delay(2000);
    await this.page.screenshot({ path: 'screenshot/jelszo1.png' });
    await this.page.locator('text=Sign in').click( { timeout: 10000 } )
    await this.page.screenshot({ path: 'screenshot/jelszo2.png' });
    //await delay(5000);
    await this.page.screenshot({ path: 'screenshot/jelszo3.png' });
    await this.page.locator('text=Yes').click( { timeout: 40000 } )
    await this.page.screenshot({ path: 'screenshot/jelszoremember.png' })
    //await delay(5000)
    await this.page.screenshot({ path: 'screenshot/loggedin.png' });
    //await delay(15000)
    const ghostCard = await this.page.locator(".side-panel-content")
    await ghostCard.screenshot({ path: 'screenshot/side-panel-content.png' })

    await this.page.waitForSelector(".dashboard-qr-code-a")
    await this.page.locator(".dashboard-qr-code-a").screenshot({ path: 'screenhot/qr-code.png' })
    }
}