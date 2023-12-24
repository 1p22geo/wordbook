import { test, type Page, expect } from "@playwright/test";
import { sha256 } from "js-sha256";
import { login } from "lib/e2e/login";
import { signup } from "lib/e2e/signup";
import { switchBar } from "lib/e2e/switchBar";

// Annotate entire file as serial.
test.describe.configure({ mode: "serial" });

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test("register and login", async ({ userAgent }) => {
  await page.goto("./");
  const id = sha256(userAgent as string);
  const email = "test3@email_" + id + ".com";
  const name = "Test user 3 of " + id;
  const pass = "123";

  // create an account, ik this is a redundancy
  await signup(page, {
    email,
    name,
    pass,
  });

  await page.goto("./");
  await login(page, { email, pass });
});

test("submit a post", async ({ userAgent }) => {
  const id = sha256(userAgent as string);
  const date = Date.now();
  await expect(page.locator(".w-md-editor")).toBeVisible();
  await switchBar(page);
  await expect(page.locator("#menu svg.w-full")).toBeVisible();
  await page.locator("textarea").fill("First post by " + "test3@email_" + id + ".com in " + date);
  await page.getByText(/submit/i).scrollIntoViewIfNeeded();
  await page.getByText(/submit/i).click();
  await expect(page.locator("textarea")).toHaveText("");
  // await expect(await page.getByRole("alert", { name: "alert" })).not.toBeVisible();

  while (!(await page.getByText("First post by " + "test3@email_" + id + ".com in " + date).isVisible())) {
    await page.mouse.wheel(0, 10);

    if (await page.getByText(/this is the end/i).isVisible()) {
      await expect(await page.getByText("First post by " + "test3@email_" + id + ".com in " + date)).toBeVisible();
    }
  }
  await expect(await page.getByText("First post by " + "test3@email_" + id + ".com in " + date)).toBeVisible();
});
