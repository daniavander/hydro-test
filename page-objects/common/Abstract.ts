import { Page, expect } from "@playwright/test";

export class AbstractClass {
    readonly page: Page
    
    constructor(page: Page){
        this.page= page
    }

   async clickToMarkAsCompleteBtn()  {
    //await page.click("//button[text()='Mark as Completed']")
   }
}