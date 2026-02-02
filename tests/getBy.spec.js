const { test, expect } = require('@playwright/test');

test.only('Get By Locators', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    // await page.getByLabel('Employed').click();
    //same as above
    await page.getByLabel('Employed').check();
    await page.getByLabel('Gender').selectOption('Male');
    await page.getByPlaceholder('Password').fill("Test1234");
    await page.getByRole('button', { name: 'Submit' }).click();
    const submitText = await page.getByText('Success! The Form has been submitted successfully!.').textContent();
    // await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    console.log(submitText);

    await page.getByRole('link', { name: 'Shop' }).click();
    await page.locator('app-card').filter({ hasText: 'Nokia Edge' }).getByRole('button').click();


});