const { test, expect } = require('@playwright/test');

test.only('ECOM NCA BYOD', async ({ page }) => {
    await page.goto("https://optimummobilenp1.prod.acquia-sites.com/mobile/plan?line=double");
    for (let i = 1; i <= 3; i++) {
        await page.locator('button[data-string="Minus Unlimited"]').click();

    }
    await page.locator('svg[name ="plusWithoutBorder"]').first().click();
    await page.locator('button[data-string="Button click - Add to cart"]').first().click();
    await page.locator('button[data-string="Button click - No, I am a new customer"]').click();
    await page.locator('.selectable-option').first().click();
    // await page.locator('div[class="anchor - link"]').click();
    // await page.locator('a').filter({ hasText: 'Skip' }).first().click();
    await page.locator('#fixed-account-number-input').fill("0785111111111");
    await page.locator('button[data-string="Button click - Submit"]').click();
    await page.locator("#zip-code-input").fill("86351");
    await page.locator('button[data-string="Submit Zip Code"]').click();
    // await page.locator('button[data-string="Button click - Continue"]').first().click();
    await page.locator('button:visible').click();
    await page.locator('button[data-string="Button click - Bring your own phone"]').click();
    await page.locator('#byod-imei').fill("357173347482364");
    await page.locator('button[data-string="Button click - Check compatibility"]').click();
    await page.locator('#toggle-switch').click();
    await page.locator('button[data-string="Button click - Continue"]').last().click();
    await page.locator('#no-coverage').click();
    await page.locator('button[data-string="Button click - Save and continue"]').first().click();
    await page.locator('.label-span-title').nth(1).click();
    await page.locator('button[data-string="I understand from cart item option"]').last().click();
    await page.locator('button[data-string="Button click - Proceed to checkout"]').first().click();
    await page.locator('#checkout-form_email').fill('automationorder@test.in');
    await page.locator('#checkout-form_re-email').fill('automationorder@test.in');
    await page.locator('#checkout-form_password').fill('Test1234');
    await page.locator('#checkout-form_pin').fill('1234');
    await page.locator('button[data-string="Button click - Save and Continue"]').click();
    await page.locator('#checkout-form_first-name').fill("SHARON");
    await page.locator('input[name="last_name"]').fill("DAO");
    await page.locator('input[name="phone"]').last().fill("(263) 754-2763");
    await page.locator('#streetRef').last().fill("90 ridge trail dr");
    await page.locator('input[name="city"]').last().fill("Sedona");
    // await page.locator('svg[name="dropDownArrow"]').first().fill("AZ");
    // await page.locator('#items').first().click();

    await page.locator('svg[name="dropDownArrow"]').first().click();
    await page.getByRole('option', { name: 'AZ' }).click();

    await page.locator('button[data-string="Button click - Save and continue"]').first().click();
    await page.locator('button[data-string="Button click - Yes, this is my address"]').click();
    await page.locator('#checkout-form_ssn').fill("6667096444");
    await page.locator('#checkout-form_birth-date').fill("11111950");
    await page.locator('button[data-string="Button click - Save and continue"]').first().click();
    await page.locator('button[data-string="Button click - Continue"]').click();
    await page.locator("span[class='choise-text']").first().click();
    await page.locator("span[class='choise-text']").first().click();
    await page.locator("span[class='choise-text']").first().click();
    await page.locator('button[data-string="Button click - Continue"]').click();
    await page.locator('#disclosure-and-consent-agreement').click();
    await page.locator('#vin_credit_card_account').fill("4444444444444448");
    await page.locator('#vin_credit_card_expiration_date').fill("1228");
    await page.locator('#vin_credit_card_cvn').fill("123");
    await page.locator('button[data-string="Button click - Save and continue"]').click();
    await page.locator('input[type="checkbox"]').first().click();
    await page.locator('input[type="checkbox"]').last().click();
    await page.locator('button[data-string="Button click - Agree and continue"]').click();
    await page.locator('button[data-string="Button click - Continue"]').click();

    // ---- Place Order + Wait deterministically ----
    const placeOrderBtn = page.locator('button[data-string="Button click - Place Order"]');

    await Promise.all([
        page.waitForURL("https://optimummobilenp1.prod.acquia-sites.com/mobile/thank-you", { timeout: 120000 }),
        placeOrderBtn.click()
    ]);
    await page.pause();
});