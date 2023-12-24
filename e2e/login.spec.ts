import { test, type Page, expect } from "@playwright/test";
import { sha256 } from "js-sha256";
import { login } from "lib/e2e/login";
import { signup } from "lib/e2e/signup";
import { switchBar } from "lib/e2e/switchBar";

test.describe.configure({ mode: "serial" });

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test("signs up", async ({ userAgent }) => {
  const id = sha256(userAgent as string);
  const email = "test1@email_" + id + ".com";
  const name = "Test user 1 of " + id;
  const pass = "123";
  await page.goto("./");
  await signup(page, {
    email,
    name,
    pass,
  });
});
test("logs in", async ({ userAgent }) => {
  const id = sha256(userAgent as string);
  const email = "test1@email_" + id + ".com";
  const name = "Test user 1 of " + id;
  const pass = "123";

  await page.goto("./");
  await login(page, { email, pass });
  await switchBar(page);
  await expect(page.locator("a").filter({ hasText: "WordBook" })).toBeVisible();
  await expect(page.locator("#menu svg.w-full")).toBeVisible();
});
