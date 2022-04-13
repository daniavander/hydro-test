import { Page, expect } from "@playwright/test";

export class CommonFunc {
    readonly page: Page
    
    constructor(page: Page){
        this.page= page
    }

   async deleteCase()  {
    //await page.click("//button[text()='Mark as Completed']")
   }
}