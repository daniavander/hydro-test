import { Page, expect } from "@playwright/test";

export class AbstractClass {
    readonly page: Page
    
    constructor(page: Page){
        this.page= page
    }

   async waitForClass(selector, classes)  {
    await expect(this.page.locator(selector)).toContain(classes);
   }
}