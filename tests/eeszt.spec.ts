import { test, expect } from "@playwright/test"

test.describe("my first test suite", () => {


  test.beforeEach(async ({ page }) => {
    const baseUrl = 'https://dev-minihis.eeszt.gov.hu/#/bejelentkezes'
    await page.goto(baseUrl, { timeout: 50000 })
  })

  test('login', async ({ page }) => {
    await Promise.all([
      page.locator('text=Bejelentkezés').click()
    ]);
    // Click text=EESZT mobilToken
    await Promise.all([
      page.locator('text=EESZT mobilToken').click()
    ]);
    await page.pause()
    await page.locator('//input[@name="intezmeny"]').type('200753 ― Budapesti Háziorvosi Bt. 218')
    await page.locator('text=200753 ― Budapesti Háziorvosi Bt. 218').click();

    await page.locator('//input[@name="szervezeti-egyseg"]').type('2007532 ― Dr. Budapesti felnőtt háziorvos 378');
    await page.locator('text=" 2007532 ― Dr. Budapesti felnőtt háziorvos 378 "').click();

    await page.locator("[formcontrolname='username']").type("O62634")
    await page.pause()
    await page.locator("[formcontrolname='token']")
    await page.locator('button:has-text("Belépés")').click();


    // Click text=Páciens nevePáciens AzonosítóPáciens felvétele >> button >> nth=2
    //await page.locator("label=Páciens felvétele").isVisible()
    // Click button:has-text("Gyorskereső")
    await page.locator('button:has-text("Gyorskereső")').click();
    // Click button:has-text("Ambulánsnapló")
    await page.locator('button:has-text("Ambulánsnapló")').click();

  })
})

