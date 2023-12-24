import { expect, test } from "@playwright/test";

test("renders main page", async ({ page }) => {
  await page.goto("./");

  await expect(page).toHaveTitle(/WordBook - Internet redefined/);
  await expect(page.getByText(/Sign up/)).toBeVisible();
});
test("navigates to signup", async ({ page }) => {
  await page.goto("./");

  await expect(page.getByText(/Sign up/)).toBeVisible();
  await page.getByText(/Sign up/).click();
  await expect(page).toHaveTitle(/WordBook \| Sign up to WordBook/);
});
test("navigates to login", async ({ page }) => {
  await page.goto("./");

  await expect(page.getByText(/log in/)).toBeVisible();
  await page.getByText(/log in/).click();
  await expect(page).toHaveTitle(/WordBook \| Log in to WordBook/);
});
