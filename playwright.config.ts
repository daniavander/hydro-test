import { PlaywrightTestConfig, devices } from '@playwright/test';
import { expect } from "@playwright/test"
import { matchers } from "expect-playwright"

expect.extend(matchers)

const config: PlaywrightTestConfig = {

  globalTimeout: 80000, // Maximum time the whole test suite can run,
  timeout: 80000,        // Timeout for each test
  retries: 0,  //how many times re test the failed
  // See: https://playwright.dev/docs/test-reporters/
  reporter: [['html'], ['./my-awesome-reporter.ts'], ['line'], ['json', {outputFile: 'test-result.json'}]],
  // See: https://playwright.dev/docs/api/class-testconfig
  outputDir: 'test-results/',
  //just the wanted folder will be run
  //testDir: "tests/tips",
  use: {
    viewport: { width: 1100, height: 900 },
    //actionTimeout: 50000,
    ignoreHTTPSErrors: true,
    trace: 'off',
    video: 'on',
    screenshot: 'on',
    actionTimeout: 100000 
  },
  projects: [
    {
      // Desktop Chromium
        name: 'DesktopChromium',
        use: {
          browserName: 'chromium',
          headless: true,
          // Can be "chrome", "msedge", "chrome-beta", "msedge-beta", "msedge-dev", etc. Test against chrome channel.
          channel: 'chrome',
          launchOptions: {
            args: ['--no-sandbox', '--disable-dev-shm-usage'],
            headless: false,
            slowMo: 200,
          },
      }
    }
  ]
}

export default config