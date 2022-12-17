import { test, expect } from "@playwright/test";

test("homepage has title and links to intro page", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // create a locator
  const getStarted = page.getByRole("link", { name: "Counter" });

  // Expect an attribute "to be strictly equal" to the value.
  await expect(getStarted).toHaveAttribute("href", "/counter");
});
