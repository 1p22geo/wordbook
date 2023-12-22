import { test, type Page, expect } from "@playwright/test";
import { sha256 } from "js-sha256";

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

  // create an account, ik this is a redundancy
  await page.goto("./");
  await expect(page).toHaveTitle(/WordBook - Internet redefined/);
  await expect(page.getByText(/Sign up/)).toBeVisible();
  await expect(page.getByText(/Sign up/)).toBeInViewport();
  await page.getByText(/Sign up/).click();
  await expect(page).toHaveTitle(/WordBook \| Sign up to WordBook/);
  await (await page.$("#email"))?.fill("test3@email_" + id + ".com");
  await (await page.getByText("2")).click();
  await (await page.$("#name"))?.fill("Test user 3 of " + id);
  await (await page.getByText("3")).click();
  await (await page.$("#pass"))?.fill("123");
  await (await page.$("#rpass"))?.fill("123");
  await (await page.getByText("4")).click();
  await (await page.getByText("Sumbit!")).click();
  await expect(page.getByText(/account created/i)).toBeVisible();

  await page.goto("./");
  await expect(page).toHaveTitle(/WordBook - Internet redefined/);
  await expect(await page.getByText(/WordBook - the Internet redefined/i)).toBeVisible();
  if (await page.locator("#switch").isVisible()) {
    await (await page.$("#switch"))?.click();
  }
  const loc = page.getByText(/Log in/i).filter({ hasNotText: /account/ });
  await expect(loc).toBeVisible();
  await loc.click();
  await expect(page).toHaveTitle(/WordBook \| Log in to WordBook/);
  await (await page.$("#email"))?.fill("test3@email_" + id + ".com");
  await (await page.$("#password"))?.fill("123");
  await (await page.getByText("Sumbit!")).click();
  await expect(page.locator(".w-md-editor")).toBeVisible();
  if (await page.locator("#switch").isVisible()) {
    await page.locator("#switch")?.click();
  }
  await expect(await page.locator("a").filter({ hasText: "WordBook" })).toBeVisible();
  await expect(await page.locator("#menu svg.w-full")).toBeVisible();
});

test("submit a post", async ({ userAgent }) => {
  const id = sha256(userAgent as string);
  await expect(await page.locator("#menu svg.w-full")).toBeVisible();
  await page.locator("textarea").fill("First post by " + "test3@email_" + id + ".com");
  await page.getByText(/submit/i).click();
  await expect(await page.getByRole("alert", { name: "alert" })).not.toBeVisible();

  await expect(page.locator(".w-md-editor")).toBeVisible();
  if (await page.locator("#switch").isVisible()) {
    await page.locator("#switch")?.click();
  }
  await expect(await page.locator("a").filter({ hasText: "WordBook" })).toBeVisible();
  await expect(await page.locator("#menu svg.w-full")).toBeVisible();
  while (!(await page.getByText("First post by " + "test3@email_" + id + ".com").isVisible())) {
    await page.mouse.wheel(0, 10);
  }
});
