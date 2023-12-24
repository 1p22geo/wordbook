import { expect, type Page } from "@playwright/test";

export async function signup(page: Page, { email, name, pass }: { email: string; name: string; pass: string }) {
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
  await expect(page.getByText(/account created/i)).toBeVisible();
}
