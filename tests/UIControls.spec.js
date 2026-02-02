const { test, expect } = require('@playwright/test');

test('UI Controls', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const password = page.locator('#password');
    const signBtn = page.locator('#signInBtn');
    const dropDown = page.locator('select.form-control');
    const documentLink = page.locator("[href*= 'document-request']");
    await dropDown.selectOption("Teacher");

    page.locator('.checkmark').last().click();
    await page.locator('#okayBtn').click();
    //Same as below but it gives boolean value
    const checkRadioClicked = page.locator('.checkmark').last().isChecked();
    if (checkRadioClicked) {
        console.log("Checked!!!")
    } else {
        console.log("Not Checked!!!");
    }
    await expect(page.locator('.checkmark').last()).toBeChecked();

    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute("class", "blinkingText");

    //Hold page at last after execution
    //await page.pause();
});


test.only('@Child windows hadl', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
            documentLink.click(),

        ])//new page is opened


    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());

})

