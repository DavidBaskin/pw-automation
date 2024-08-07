import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
  timeout: 40000,
  // globalTimeout: 60000,

  expect: {
    timeout: 2000,
  },  

  retries: 1,
  reporter: [['json', { outputFile: 'test-results/jsonReports.json'}],
  process.env.CI ? ["dot"] : ["list"],
  [
    "@argos-ci/playwright/reporter",
    {
      // Upload to Argos on CI only.
      uploadToArgos: !!process.env.CI,
      token: "520b744f733974a28c5951eaa1ff5a501cb40e69",

      // Set your Argos token (required if not using GitHub Actions).
    },
  ],
  // ["allure-playwright"]
  ["html"]
  ],

  use: {
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4200/'
      : process.env.STAGING === '1' ? 'http://localhost:4201/'
      : 'http://localhost:4200/', 

    trace: 'on-first-retry',
    screenshot: "only-on-failure",
    actionTimeout: 5000,
    navigationTimeout: 5000,
    video: {
      mode: 'off',
      size: { width: 1920, height: 1080 },
    },
  },

  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4201/',
      }
    },
    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: { 
        browserName: 'firefox'
      },
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['iPhone 11 Pro'],
      }
    }
  ],
  webServer: {
    timeout: 2 * 60 * 1000,
    command: 'npm run start',
    url: 'http://localhost:4200',
  },
});
