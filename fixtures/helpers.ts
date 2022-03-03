import { Page, Locator, expect } from "@playwright/test";
import {test as baseTest} from "@playwright/test";
const crypto = require('crypto')


export async function loadHomePage(page){
    await page.goto("https://example.com")
}

export async function spanFunctionXpathWithText(page, str) {
    await page.locator("//span[text()='" + str + "']").click()
}

export async function checkTextArea(page, str) {
    await page.locator("//span[text()='" + str + "']").click()
}

export async function toHaveClass(locator: Locator, classes: string)  {
    await expect(this.page.locator(locator)).toContain(classes);
}

export async function getRandomNumber()  {
    return Math.floor(Math.random() * 1000 + 1)
}

export async function getRandomStr()  {
    return crypto.randomBytes(20).toString('hex')
}

export async function getRandomEmail()  {
    return crypto.randomBytes(20).toString('hex')
}

export async function loginToIMS(page) {
    //await page.pause()
    await page.screenshot({ path: 'screenshot0.png' , fullPage: true});
    await page.locator('#i0116').type('imstestglobaladmin1@avander.hu')
    await page.keyboard.press('Enter');
    await page.screenshot({ path: 'screenshot1.png' , fullPage: true});
    await page.waitForSelector('#displayName')
    await page.locator('#i0118').type('123ims456!')
    await page.screenshot({ path: 'screenshot2.png' , fullPage: true});
    await page.keyboard.press('Enter')
    await page.waitForSelector('text=Yes').click()
    await page.locator('text=Yes').click()
    await page.screenshot({ path: 'screenshot3.png' , fullPage: true});
    await page.locator(".top-menu-container").screenshot({ path: 'side-panel-content.png'})
    await page.locator(".dashboard-qr-code-a").screenshot({ path: 'side-panel-content.png'})
    
}