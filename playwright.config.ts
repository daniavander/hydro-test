import { PlaywrightTestConfig, devices } from '@playwright/test';
import { expect } from "@playwright/test"
import { matchers } from "expect-playwright"

expect.extend(matchers)

const config: PlaywrightTestConfig = {

  globalTimeout: 480000, // Maximum time the whole test suite can run, 8 min for 6 tests
  timeout: 250000,        // Timeout for each test
  retries: 0,  //how many times re test the failed
  // See: https://playwright.dev/docs/test-reporters/
  reporter: [['html'] , ["json", { outputFolder: 'my-allure-results' }] , ['allure-playwright'] , ['./my-awesome-reporter.ts'] , ["line"]],
  //reporter: [['html'] , ['./my-awesome-reporter.ts'] , ["line"]],
  //reporter: [['html'], ['./my-awesome-reporter.ts'], ['allure-playwright']],
  // See: https://playwright.dev/docs/api/class-testconfig
  outputDir: 'test-results/',
  //just the wanted folder will be run
  testDir: '.',
  use: {
    viewport: { width: 1250, height: 900 },
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure',
    video: 'on',
    screenshot: 'on',
    actionTimeout: 20 * 1000,
    navigationTimeout: 30 * 1000,
  },
  grep: [new RegExp("@response"), new RegExp("@list"), new RegExp("@cases"), new RegExp("@delete"), new RegExp("@risk")],
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