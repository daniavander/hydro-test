import { PlaywrightTestConfig, devices } from '@playwright/test';
import { expect } from "@playwright/test"
import { matchers } from "expect-playwright"

expect.extend(matchers)

const config: PlaywrightTestConfig = {

  globalTimeout: 60000, // Maximum time the whole test suite can run,
  timeout: 60000,        // Timeout for each test
  retries: 0,  //how many times re test the failed
  // See: https://playwright.dev/docs/test-reporters/
  reporter: process.env.CI ? 'dot' : 'list',
  // See: https://playwright.dev/docs/api/class-testconfig
  outputDir: 'test-results/',
  //just the wanted folder will be run
  //testDir: "tests/tips",
  use: {
    viewport: { width: 1100, height: 900 },
    actionTimeout: 30000,
    ignoreHTTPSErrors: true,
    trace: 'off',
    video: 'off',
    screenshot: 'on',
  },
  projects: [
    {
      name: "Chromium",
      use: {
        browserName: "chromium"
      }
    }
  ]
}

export default config