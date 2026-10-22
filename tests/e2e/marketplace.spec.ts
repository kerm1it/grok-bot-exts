import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home presents the catalog and switches locale", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Find the bot extension");
  await expect(page.getByRole("search")).toBeVisible();
  await page.getByRole("link", { name: "Switch to Chinese" }).click();
  await expect(page).toHaveURL(/\/zh\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("找到能完成工作的");
});

test("directory searches, filters, and opens a record", async ({ page }) => {
  await page.goto("/extensions/?q=Shopper");
  const count = page.locator("#result-count");
  await expect(count).not.toContainText("Loading");
  await expect(page.locator("#catalog-results .extension-row").first()).toBeVisible();
  await page.locator("#catalog-results .extension-row").first().click();
  await expect(page.locator(".record-head h1")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Provenance" })).toBeVisible();
});

test("OpenMausBot filter has an honest empty state", async ({ page }) => {
  await page.goto("/extensions/?platform=openmausbot");
  await expect(page.locator("#catalog-empty")).toBeVisible();
  await expect(page.locator("#catalog-empty")).toContainText("first OpenMausBot extension");
});

test("mobile layout does not overflow", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Mobile-only assertion");
  await page.goto("/zh/extensions/");
  await expect(page.locator("#result-count")).not.toContainText("正在载入");
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
});

test("core surfaces have no serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  const home = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    home.violations.filter((violation) => ["serious", "critical"].includes(violation.impact || "")),
  ).toEqual([]);

  await page.goto("/extensions/");
  await expect(page.locator("#result-count")).not.toContainText("Loading");
  const directory = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    directory.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact || ""),
    ),
  ).toEqual([]);
});
