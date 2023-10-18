import { expect, test } from "@playwright/test";
import { sha256 } from "js-sha256";

test("signs up", async ({ page, userAgent }) => {
  const id = sha256(userAgent as string);
  await page.goto("./");
  await expect(page).toHaveTitle(/WordBook - Internet redefined/);
  await expect(page.getByText(/Sign up/)).toBeVisible();
  await expect(page.getByText(/Sign up/)).toBeInViewport();
  await page.getByText(/Sign up/).click();
  await expect(page).toHaveTitle(/WordBook \| Sign up to WordBook/);
  await (await page.$("#email"))?.fill("test@email_" + id + ".com");
  await (await page.getByText("2")).click();
  await (await page.$("#name"))?.fill("Test user " + id);
  await (await page.getByText("3")).click();
  await (await page.$("#pass"))?.fill("123");
  await (await page.$("#rpass"))?.fill("123");
  await (await page.getByText("4")).click();
  await (await page.getByText("Sumbit!")).click();
  if (!process.env.CI) {
    await expect(page.getByText(/account created/i)).toBeVisible();
  }

  await expect(await page.getByTitle("alert")).toBeVisible();
});
test("logs in", async ({ page, userAgent }) => {
  const id = sha256(userAgent as string);
  await page.goto("./");
  await expect(page).toHaveTitle(/WordBook - Internet redefined/);
  await expect(page.getByText(/log in/i)).toBeVisible();
  await expect(page.getByText(/log in/i)).toBeInViewport();
  await page.getByText(/log in/i).click();
  await expect(page).toHaveTitle(/WordBook \| Log in to WordBook/);
  await (await page.$("#email"))?.fill("1p22geo@gmail.com");
  await (await page.$("#password"))?.fill("123");
  await (await page.getByText("Sumbit!")).click();
  if (!process.env.CI) {
    await expect(await page.getByText(/logged in/i)).toBeVisible();
  } else {
    await expect(await page.getByTitle("alert")).toBeVisible();
  }
});
