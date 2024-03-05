import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByPlaceholder("название").click();
  await page.getByPlaceholder("название").fill("First test");
  await page.getByPlaceholder("описание").click();
  await page.getByPlaceholder("описание").fill("first description");
  await page.getByPlaceholder("описание").press("Home");
  await page.getByPlaceholder("описание").fill("First description");
  await page.getByRole("button", { name: "Добавить" }).click();
  await expect(
    page.getByText("First testFirst descriptionУдалить"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Удалить" }).click();
  await expect(
    page.getByText("First testFirst descriptionУдалить"),
  ).not.toBeVisible();
});
