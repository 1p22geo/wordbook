import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { signup } from "lib/e2e/signup";
import { login } from "lib/e2e/login";
import { uuidv4 } from "lib/uuid";
let id:string;

test.describe("accessibility", () => {
  test.beforeAll(()=>{
    id = uuidv4()
  })
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
  test("logged in", async ({ page,  }) => {
    const email = "test2@email_" + id + ".com";
    const name = "Test user 2 of " + id;
    const pass = "123";
    await signup(page, { email, name, pass });
    await login(page, { email, pass });
  });
});
