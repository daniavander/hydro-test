import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: ".",
  timeout: 100 * 1000,
  grep: [new RegExp("@response"), new RegExp("@filter"), new RegExp("@cases"), new RegExp("@delete"), new RegExp("@risk")],
 
  expect: {
    timeout: 10000
  },
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'], ['./my-awesome-reporter.ts']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    viewport: { width: 1250, height: 6000 },
    ignoreHTTPSErrors: true,
    actionTimeout: 20 * 1000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://stage-app-avander-ims-ui.azurewebsites.net/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    video: 'on',
    screenshot: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: "webkit",
      use: {
        browserName: "webkit"
      }
    },
    {
      name: "firefox",
      use: {
        browserName: "firefox"
      }
    }
  ],

};

export default config;
