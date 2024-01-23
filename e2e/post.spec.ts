import { test, type Page, expect } from "@playwright/test";
import { login } from "lib/e2e/login";
import { signup } from "lib/e2e/signup";
import { switchBar } from "lib/e2e/switchBar";
import { uuidv4 } from "lib/uuid";

// Annotate entire file as serial.
test.describe.configure({ mode: "serial" });

let page: Page;
let id:string;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  id = uuidv4()
});

test.afterAll(async () => {
  await page.close();
});

test("register and login", async ({ userAgent }) => {
  await page.goto("./");
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
  const date = Date.now();
  await expect(page.locator(".w-md-editor")).toBeVisible();
  await switchBar(page);
  await expect(page.locator("#menu svg.w-full")).toBeVisible();
  await page.locator("textarea").fill("First post by " + "test3@email_" + id + ".com in " + date);
  await new Promise((res) => {
    void setTimeout(res, 1000);
  });
  await page.getByText(/submit/i).scrollIntoViewIfNeeded();
  await page.getByText(/submit/i).waitFor({ state: "attached" });
  await page.getByText(/submit/i).waitFor({ state: "visible" });
  await page.getByText(/submit/i).click({ force: true });
  await expect(await page.getByRole("alert", { name: "alert" })).not.toBeVisible();
  if (await page.locator("textarea").inputValue()) await page.getByText(/submit/i).click({ force: false }); // workaround for shitty iphone emulations
  await expect(page.locator("textarea")).toHaveText("");

  while (!(await page.getByText("First post by " + "test3@email_" + id + ".com in " + date).isVisible())) {
    await page.mouse.wheel(0, 10);

    if (await page.getByText(/this is the end/i).isVisible()) {
      await expect(await page.getByText("First post by " + "test3@email_" + id + ".com in " + date)).toBeVisible();
    }
  }
  await expect(await page.getByText("First post by " + "test3@email_" + id + ".com in " + date)).toBeVisible();
});
