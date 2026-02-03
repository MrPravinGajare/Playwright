// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000, //adding timeout default timeout is 30 sec we overwrite it by adding new onw i.e 40 sec & this is a global
  expect: {
    //THis timeout is for assertions
    timeout: 40 * 1000,
  },
  reporter: 'html',
  use: {
    //Browser options
    browserName: 'chromium',
    //set below false so we can run test in headed mode no need to run in headed mode from terminal always
    headless: false,

    // Below 2 are for report
    screenshot: 'on',
    trace: 'on'
  },

});

