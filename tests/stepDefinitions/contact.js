const { When, Then } = require('@cucumber/cucumber')
// import expect for assertion
const { expect } = require('@playwright/test');
const { ContactPage } = require('../../pages/contact.page');

When('I submit info without providing mandatory info', async function () {
    const contactPage = new ContactPage(page);
    await contactPage.submit();
})

Then('I should be prompted with error messages', async function () {
    const contactPage = new ContactPage(page);
    await expect(contactPage.alertError).toContainText(contactPage.mandatoryAlertErrorText);
    await expect(contactPage.forenameError).toHaveText(contactPage.mandatoryForenameText);
    await expect(contactPage.emailError).toHaveText(contactPage.mandatoryEmailText);
    await expect(contactPage.messageError).toHaveText(contactPage.mandatoryMessagText);
})

Then('error messsages will go away if info populated', async function () {
    const contactPage = new ContactPage(page);
    await contactPage.populateMandatoryFields("testForeName", "test@test.com", "Hello World");
    await expect(contactPage.alertInfo).toContainText(contactPage.mandatoryAlertSuccessText);
    await expect(contactPage.alertError).not.toBeVisible();
    await expect(contactPage.forenameError).not.toBeVisible();
    await expect(contactPage.emailError).not.toBeVisible();
    await expect(contactPage.messageError).not.toBeVisible();
})

When('I submit info with providing mandatory info', async function () {
    const contactPage = new ContactPage(page);
    await contactPage.populateMandatoryFields("testForeName", "test@test.com", "Hello World");
    await contactPage.submit();
})

Then('I should be able to see contact submit confirmation', async function () {
    const contactPage = new ContactPage(page);
    await expect(contactPage.alertConfirm).toHaveText(contactPage.confirmMessageText, { timeout: 15000 });
})
