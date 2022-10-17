const { When, Then } = require('@cucumber/cucumber')
// import expect for assertion
const { expect } = require('@playwright/test');


When('I submit info without providing mandatory info', async function () {
    await this.contactPage.submit();
})

Then('I should be prompted with error messages', async function () {
    await expect(this.contactPage.alertError).toContainText(this.contactPage.mandatoryAlertErrorText);
    await expect(this.contactPage.forenameError).toHaveText(this.contactPage.mandatoryForenameText);
    await expect(this.contactPage.emailError).toHaveText(this.contactPage.mandatoryEmailText);
    await expect(this.contactPage.messageError).toHaveText(this.contactPage.mandatoryMessagText);
})

Then('error messsages will go away if info populated', async function () {
    await this.contactPage.populateMandatoryFields("testForeName", "test@test.com", "Hello World");
    await expect(this.contactPage.alertInfo).toContainText(this.contactPage.mandatoryAlertSuccessText);
    await expect(this.contactPage.alertError).not.toBeVisible();
    await expect(this.contactPage.forenameError).not.toBeVisible();
    await expect(this.contactPage.emailError).not.toBeVisible();
    await expect(this.contactPage.messageError).not.toBeVisible();
})

When('I submit info with providing mandatory info', async function () {
    await this.contactPage.populateMandatoryFields("testForeName", "test@test.com", "Hello World");
    await this.contactPage.submit();
})

Then('I should be able to see contact submit confirmation', async function () {
    await expect(this.contactPage.alertConfirm).toHaveText(this.contactPage.confirmMessageText, { timeout: 15000 });
})
