import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test.afterEach(async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("homepage", async ({ page }) => {
    await page.goto("./");
  });
  test("login page", async ({ page }) => {
    await page.goto("./login");
  });
  test("signup page", async ({ page }) => {
    await page.goto("./signup");
  });
});
