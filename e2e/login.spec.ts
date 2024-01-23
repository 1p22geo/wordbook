import { test, type Page, expect } from "@playwright/test";
import { login } from "lib/e2e/login";
import { signup } from "lib/e2e/signup";
import { switchBar } from "lib/e2e/switchBar";
import { uuidv4 } from "lib/uuid";

test.describe.configure({ mode: "serial" });

let page: Page;
let id: string

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  id = uuidv4();
});

test.afterAll(async () => {
  await page.close();
});

test("signs up", async ({ }) => {
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
test("fails to sign up duplicate user", async ({  }) => {
  const email = "test1@email_" + id + ".com";
  const name = "Test user 1 of " + id;
  const pass = "123";
  await page.goto("./");
  await page.goto("./");
  await expect(page).toHaveTitle(/WordBook - Internet redefined/);
  await expect(page.getByText(/Sign up/)).toBeVisible();
  await page.getByText(/Sign up/).click();
  await expect(page).toHaveTitle(/WordBook \| Sign up to WordBook/);
  await (await page.$("#email"))?.fill(email);
  await page.getByText("2").click();
  await (await page.$("#name"))?.fill(name);
  await page.getByText("3").click();
  await (await page.$("#pass"))?.fill(pass);
  await (await page.$("#rpass"))?.fill(pass);
  await page.getByText("4").click();
  await page.getByText(/submit/i).click();
  await expect(page.getByText(/already exists/i)).toBeVisible();
});
test("logs in", async ({  }) => {
  const email = "test1@email_" + id + ".com";
  const pass = "123";

  await page.goto("./");
  await login(page, { email, pass });
  await switchBar(page);
  await expect(page.locator("a").filter({ hasText: "WordBook" })).toBeVisible();
  await expect(page.locator("#menu svg.w-full")).toBeVisible();
});
