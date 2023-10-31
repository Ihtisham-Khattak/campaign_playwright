// @ts-check
const { test, expect } = require("@playwright/test");

test("has title", async ({ page }) => {
  await page.goto("https://belgischadvies.be/isolatie/");
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Belgisch Advies/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://belgischadvies.be/isolatie/");
  // Click the get started link.
  await page
    .getByRole("button", { name: "START DE GRATIS woningSCAN!" })
    .click();
  // Expects page to have a heading with the name of Installation.
  await expect(page.getByText("Wat is jouw adres?")).toBeVisible();

  //Click the PostCode with values
  const get_post = await page.getByPlaceholder("Postcode");
  await get_post.fill("1200");

  //Click the Huisnr. with values
  const get_huisnr = await page.getByPlaceholder("Huisnr.");
  await get_huisnr.fill("12");

  // Click in the Straatnaam
  // Click on the dropdown field
  const dropdownSelector = ".multiselect__tags"; // Adjust the selector based on your HTML structure
  await page.click(dropdownSelector);

  // Wait for the dropdown options to be visible
  const dropdownOptionsSelector = ".multiselect__content";
  await page.waitForSelector(dropdownOptionsSelector);

  // Get all available options
  const options = await page.$$(".multiselect__element");

  // Select a random option
  const randomIndex = Math.floor(Math.random() * options.length);
  const randomOption = options[randomIndex];
  await randomOption.click();

  // Verify that the selected option is visible
  const selectedOptionText = await randomOption.innerText();
  const selectedOptionVisible = await page.isVisible(
    `.multiselect__element:has-text("${selectedOptionText}")`
  );
  await expect(selectedOptionVisible).toBe(true);

  // const click_btn = await page.getByPlaceholder('Volgende');
  await page.getByRole("button").click();

  await page.getByRole("progressbar", { name: "50%" });

});


