import { expect, type Page } from "@playwright/test";
import { switchBar } from "lib/e2e/switchBar";

export async function login(page: Page, { email, pass }: { email: string; pass: string }) {
  await page.goto("./");
  await expect(page).toHaveTitle(/WordBook - Internet redefined/);
  await expect(page.getByText(/WordBook - the Internet redefined/i)).toBeVisible();
  await switchBar(page);
  const loc = page.getByText(/Log in/i).filter({ hasNotText: /account/ });
  await expect(loc).toBeVisible();
  await loc.click();
  await expect(page).toHaveTitle(/WordBook \| Log in to WordBook/);
  await (await page.$("#email"))?.fill(email);
  await (await page.$("#password"))?.fill(pass);
  await page.getByText(/submit/i).click();
  await expect(page.locator(".w-md-editor")).toBeVisible();
}
