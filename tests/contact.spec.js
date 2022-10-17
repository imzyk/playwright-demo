// @ts-check
const { test, expect } = require('../fixtures/basePage');

test.beforeEach(async ({ page, menuPage }) => {
  await page.goto("/");
  menuPage.browseToContact();
});


test('Verify mandatory fields', async ({ contactPage }) => {
  await contactPage.submit();
  await expect(contactPage.alertError).toContainText(contactPage.mandatoryAlertErrorText);
  await expect(contactPage.forenameError).toHaveText(contactPage.mandatoryForenameText);
  await expect(contactPage.emailError).toHaveText(contactPage.mandatoryEmailText);
  await expect(contactPage.messageError).toHaveText(contactPage.mandatoryMessagText);
  await contactPage.populateMandatoryFields("testForeName", "test@test.com", "Hello World");
  await expect(contactPage.alertInfo).toContainText(contactPage.mandatoryAlertSuccessText);
  await expect(contactPage.alertError).not.toBeVisible();
  await expect(contactPage.forenameError).not.toBeVisible();
  await expect(contactPage.emailError).not.toBeVisible();
  await expect(contactPage.messageError).not.toBeVisible();
});

test('Verify successful submit', async ({ contactPage }) => {
  await contactPage.populateMandatoryFields("testForeName", "test@test.com", "Hello World");
  await contactPage.submit();
  await expect(contactPage.alertConfirm).toHaveText(contactPage.confirmMessageText, { timeout: 15000 });
});