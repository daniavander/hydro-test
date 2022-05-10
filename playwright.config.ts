import { AddUserAction } from '@pages/common/AddUserAction';
import { PlaywrightTestConfig, devices } from '@playwright/test';
import { expect } from "@playwright/test"
import { matchers } from "expect-playwright"

expect.extend(matchers)

const config: PlaywrightTestConfig = {

  globalTimeout: 360000, // Maximum time the whole test suite can run, 6 min for 6 tests
  timeout: 60000,        // Timeout for each test
  retries: 0,  //how many times re test the failed
  // See: https://playwright.dev/docs/test-reporters/
  reporter: [['html'] , ['list'] , ['./my-awesome-reporter.ts']],
  //reporter: [['html'], ['./my-awesome-reporter.ts'], ['allure-playwright']],
  // See: https://playwright.dev/docs/api/class-testconfig
  outputDir: 'test-results/',
  //just the wanted folder will be run
  //testDir: "tests/tips",
  use: {
    viewport: { width: 1450, height: 900 },
    ignoreHTTPSErrors: true,
    trace: 'on',
    video: 'on',
    screenshot: 'on',
    actionTimeout: 30000
  },
  //grep: [new RegExp("@just"),new RegExp("@just2")],
  expect: {
    timeout: 10 * 1000,
  },
  projects: [
    {
      // Desktop Chromium
        name: 'chrome',
        use: {
          browserName: 'chromium',
          headless: true,
          // Can be "chrome", "msedge", "chrome-beta", "msedge-beta", "msedge-dev", etc. Test against chrome channel.
          channel: 'chrome',
          launchOptions: {
            args: ['--no-sandbox', '--disable-dev-shm-usage'],
            headless: false,
            slowMo: 100,
          },
      }
    },
    {
      name: "webkit",
      use:{
        browserName: "webkit"
      }
    },
    {
      name: "firefox",
      use:{
        browserName: "firefox"
      }
    }
  ]
}

export default config