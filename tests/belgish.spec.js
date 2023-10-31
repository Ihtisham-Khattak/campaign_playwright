// @ts-check
const { test, expect } = require("@playwright/test");

test("has title", async ({ page }) => {
  await page.goto("https://belgischadvies.be/isolatie/");
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Belgisch Advies/);
});

test("Get Started Link", async ({ page }) => {
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
  const randomOption = options[1];
  await randomOption.click();

  await page.getByRole("button").click();

  // Vraag 2 van 4
  page.getByText("Bent u eigenaar van de woning?");
  const varag_2 = ".custom-control-label";
  await page.waitForSelector(varag_2);
  await page.click(varag_2);

  // Vraag 3 van 4
  page.getByText("Type woning");
  const varag_3 = await page.$$(".check-item");
  const varag_3_index = Math.floor(Math.random() * varag_3.length)
  const varag_3_option = varag_3[varag_3_index]
  await varag_3_option.click();

  // Vraag 4 van 4
  page.getByText("Wat wil je isoleren?");
  const varag_4 = await page.$$(".check-item");
  const varag_index = varag_4[1]
  await varag_index.click();

  // Next Button
  await page.getByRole("button").click();

  // Model Button
  await page.getByRole("button").click();

  page.getByText("Uit welk materiaal bestaat je gevel?")
  const uit_wel = await page.$$('.check-item')
  const uit_index = uit_wel[0]
  await uit_index.click()

});