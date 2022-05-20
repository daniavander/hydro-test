import { test, expect } from "@playwright/test"


//run this
// npx playwright test testing.spec.ts --reporter=dot --config=playwright.config.ts --project=chrome 

test.use({
  baseURL:"https://google.com"
})

test.describe("testing features tag", () => {


  test('test 1 @smoke', async () => {
    console.log(".smoke run")

  })

  test('test 2 @nosmoke', async () => {
    console.log("nosmoke run")

  })

  test('test 3 @smoke', async () => {
    console.log("smoke2 run")

  })

  test('test 4', async ({ page }) => {
    console.log("test4 run")

  })
})

