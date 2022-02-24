import { PlaywrightTestConfig, devices } from '@playwright/test';
import { expect } from "@playwright/test"
import { matchers } from "expect-playwright"

expect.extend(matchers)

const config: PlaywrightTestConfig = {

  globalTimeout: 100000, // Maximum time the whole test suite can run,
  timeout: 100000,        // Timeout for each test
  retries: 0,  //how many times re test the failed
  // See: https://playwright.dev/docs/test-reporters/
  reporter: 'html',
  // See: https://playwright.dev/docs/api/class-testconfig
  outputDir: 'test-results/',
  //just the wanted folder will be run
  //testDir: "tests/tips",
  use: {
    viewport: { width: 1100, height: 900 },
    actionTimeout: 30000,
    ignoreHTTPSErrors: true,
    trace: 'on',
    video: 'on',
    screenshot: 'on',
  },
  projects: [
    {
      name: "Chromium",
      use: {
        browserName: "chromium"
      }
    }
    ,{
      name: 'iphone',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 11'],
      },
    },
  ]
}

export default config