import { Page } from "@playwright/test";

export async function switchBar(page: Page) {
  const sw = page.locator("#switch");
  if (!(await sw.isVisible())) return;
  await sw.click();
}
