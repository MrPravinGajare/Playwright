const { test, expect } = require('@playwright/test');

// First Test case

// test('First Practice Test', async function(){
//     await
// });

// Another way to write above is :
/*
test('Pracitce Test', async () => {

});

*/

// Invoke Browser

test.only('Browser context Playwright test', async ({ browser }) => {

    // Open fresh instance of browser (incognito)
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://selfcare-sit.optimummobile.com/login");
    // Type is old method use new method fill
    //await page.locator('#email').type("orderof@oko.in");
    await page.locator('#email').fill("orderof@oko.in");

    await page.locator('#password').fill("Tttt");

    await page.locator("[type = 'submit']").click();

    //textContect will extract text from UI
    // Here script will wait till the error msg loads, wait is depnd on the what we have set in playwright.config.js file timeout: 40 * 10000, -- Global timeout
    const errorMessage = await page.locator('[class= "errorMessage"]').textContent();
    console.log(errorMessage);

    // we have test now lets put an assertion to check we're getting correct txt or not
    await expect(page.locator('[class= "errorMessage"]')).toContainText('Incorrect email or password. Multiple failed logins will lock your account. Use the "Forgot password" link below for help signing in.');

    //erase the entered content in input box
    //if we passed emptyin fill method ith will clear the current text
    await page.locator('#password').fill("");
    await page.locator('#password').fill("Test1234");

    // Suppose multiple elements matches with the css you provided to locate that lement you can use below methods to get first one in that as
    // const errorMessage = await page.locator('[class= "errorMessage"]').first().textContent();
    // const errorMessage = await page.locator('[class= "errorMessage"]').nth(0).textContent();

    //If you want all elements that matches loactow you have you can use below method
    // await page.locator('#email').allTextContents();  --> allTextContents() does not have auto wait feature so we will add some wait
    // We will relay on API calls so we sill wait till all API calls are completed
    // await page.waitForLoadState('networkidle'); this will wait till netowrk comes to idle state means all calls are completed and data loaded successfully
    //If this doesn't work use below way to wait till element is loaded 
    // await page.locator('#password').waitFor();
});

/*
test('Page Playwright test', async ({ page }) => {
    await page.goto("https://optimummobilenp1.prod.acquia-sites.com/mobile/");
    //Get title of page
    console.log(await page.title());
    //compare assertions
    await expect(page).toHaveTitle("Optimum Mobile | Unlimited");
}); // only will help to run the particular test
*/