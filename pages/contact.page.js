const { expect, Locator, Page } = require('@playwright/test');
exports.ContactPage = class ContactPage {
    constructor(page) {
        this.forenameInput = page.locator("#forename");
        this.forenameError = page.locator("#forename-err");
        this.surnameInput = page.locator("#surname");
        this.emailInput = page.locator("#email");
        this.emailError = page.locator("#email-err");
        this.telephoneInput = page.locator("#telephone");
        this.messageInput = page.locator("#message");
        this.messageError = page.locator("#message-err");
        this.submitButton = page.getByText('Submit');
        this.alertError = page.locator('div.alert.alert-error.ng-scope');
        this.alertInfo = page.locator('div.alert.alert-info.ng-scope');
        this.alertConfirm = page.locator('div.alert.alert-success');
        this.mandatoryAlertErrorText = "We welcome your feedback - but we won't get it unless you complete the form correctly.";
        this.mandatoryAlertSuccessText = "We welcome your feedback - tell it how it is.";
        this.mandatoryForenameText = "Forename is required";
        this.mandatoryEmailText = "Email is required";
        this.mandatoryMessagText = "Message is required";
        this.confirmMessageText = /Thanks .*, we appreciate your feedback/;
    }
    async submit() {
        await this.submitButton.click();
    }

    async populateMandatoryFields(forename, email, message) {
        await this.forenameInput.fill(forename);
        await this.emailInput.fill(email);
        await this.messageInput.fill(message);
    }
}