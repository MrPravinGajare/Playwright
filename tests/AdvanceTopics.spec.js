const { test, expect } = require('@playwright/test');

test('How Handle Hidden, displayed mode', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.goto('https://google.com');
    await page.goBack();
    // await page.goForward();
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    // await page.pause();
    await page.locator('#confirmbtn').click();
    await page.on('dialog', dialog => dialog.accept());//dismiss to reject the dialog box
    await page.locator('#mousehover').hover();


    //Swithc to frame
    const framesPage = await page.frameLocator('#courses-iframe');
    await framesPage.locator('li a[href*="lifetime-access"]:visible').click();
    let grabbedText = await framesPage.locator('.text h2').textContent();
    const activeUser = grabbedText.split(" ")[1];
    console.log(activeUser);
});