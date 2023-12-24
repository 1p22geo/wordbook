import { defineConfig, devices } from "@playwright/test";
/*

  IMPORTANT!
  The e2e:iphone script is different because we run iphone tests in headed mode using xvfb-run.
  This is why iphone tests work only on Ubuntu (unless you get a kind of alternative somewhere else)

  When running e2e tests in a graphical environment (such as Microsoft Windows or any other system with a desktop environment),
    it is completely possible to run the tests without xvbf-run. (just remove xvbf-run from the npm script, not changing it.)

  -     "e2e:iphone": "xvfb-run playwright test --config e2e/config/playwright.iphone.ts",
  +     "e2e:iphone": "playwright test --config e2e/config/playwright.iphone.ts",

  This is only a workaround for CI systems and Github Workspaces.

*/

export default defineConfig({
  timeout: (process.env.CI ? 300 : 30) * 1000,
  expect: {
    timeout: (process.env.CI ? 300 : 30) * 1000,
  },
  testDir: "..",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 0 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://127.0.0.1:3000",

    /* Always collect traces and videos */
    trace: "on",
    headless: false,
    video: process.env.CI || process.env.VIDEO ? "on" : "off",
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: "chromium",
    //   use: { ...devices["Desktop Chrome"] },
    // },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: "Mobile Chrome",
    //   use: { ...devices["Pixel 5"] },
    // },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 14"] },
    },

    // /* Test against branded browsers. */
    // {
    //   name: "Microsoft Edge",
    //   use: { ...devices["Desktop Edge"], channel: "msedge" },
    // },
    //  {
    //    name: "Google Chrome",
    //    use: { ...devices["Desktop Chrome"], channel: "chrome" },
    //  },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "yarn start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
  },
});
