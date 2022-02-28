import { Page, Locator, expect } from "@playwright/test";
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

