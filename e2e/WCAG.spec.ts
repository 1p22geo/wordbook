import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { sha256 } from "js-sha256";
import { signup } from "lib/e2e/signup";
import { login } from "lib/e2e/login";

test.describe("accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test.afterEach(async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .exclude(".w-md-editor") // exclude the Markdown editor from an external library
      .analyze();

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
  test("logged in", async ({ page, userAgent }) => {
    const id = sha256(userAgent as string);
    const email = "test2@email_" + id + ".com";
    const name = "Test user 2 of " + id;
    const pass = "123";
    await signup(page, { email, name, pass });
    await login(page, { email, pass });
  });
});
