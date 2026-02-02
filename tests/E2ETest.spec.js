// @ts-check
const { test, expect } = require('@playwright/test');

test('E2E - Register and Login (happy path)', async ({ page }) => {
    const uniqueSuffix = Date.now();
    const loginEmail = `testuser+${uniqueSuffix}@gmail.com`;
    const loginPassword = 'Test1234';

    await test.step('Open app and navigate to Register', async () => {
        await page.goto('https://rahulshettyacademy.com/client');
        await expect(page).toHaveURL(/client/);
        await page.getByRole('link', { name: /register/i }).click();
        await expect(page).toHaveURL(/register/i);
    });

    await test.step('Fill registration form', async () => {
        await page.locator('#firstName').fill('Pravin');
        await page.getByPlaceholder('Last Name').fill('Gajare');
        await page.locator('#userEmail').fill(loginEmail);
        await page.getByPlaceholder('enter your number').fill('7387219999');

        // Occupation is a <select>
        const occupation = page.locator('select[formcontrolname="occupation"]');
        // Make sure it's visible and enabled
        await expect(occupation).toBeVisible();
        await expect(occupation).toBeEnabled();

        // Wait until options are actually present (important if populated later)
        await page.waitForFunction(
            (el) => el instanceof HTMLSelectElement && el.options && el.options.length > 1,
            await occupation.elementHandle()
        );

        // Select by label OR value
        // Try label first (what you see in the UI)
        await occupation.selectOption({ label: 'Engineer' }).catch(async () => {
            // Fallback to value if label fails (e.g., value="engineer")
            await occupation.selectOption({ value: 'engineer' });
        });

        // Verify it stuck (value often lowercased)
        await expect(occupation).toHaveValue(/engineer/i);
        // Gender is likely radio buttons; check the one labeled "Male"
        await page.getByLabel('Male').first().check();

        // These placeholders are misspelled on purpose to match the page
        await page.locator('#userPassword').fill(loginPassword);
        await page.locator('#confirmPassword').fill(loginPassword);

        await page.locator('.ng-dirty.ng-valid.ng-touched').last().click();
        await page.locator('login').click();
    });

});