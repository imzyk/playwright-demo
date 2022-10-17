const base = require('@playwright/test');
const { CartPage } = require('../pages/cart.page');
const { ContactPage } = require('../pages/contact.page');
const { MenuPage } = require('../pages/menu.page');
const { ShopPage } = require('../pages/shop.page');

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
exports.test = base.test.extend({
  cartPage: async ({ page }, use) => {
    // Use the fixture value in the test.
    await use(new CartPage(page));
    // Clean up after this line if needed
  },
  contactPage: async ({ page }, use) => {
    // Use the fixture value in the test.
    await use(new ContactPage(page));
    // Clean up after this line if needed
  },
  menuPage: async ({ page }, use) => {
    // Use the fixture value in the test.
    await use(new MenuPage(page));
    // Clean up after this line if needed
  },
  shopPage: async ({ page }, use) => {
    // Use the fixture value in the test.
    await use(new ShopPage(page));
    // Clean up after this line if needed
  },
});
exports.expect = base.expect;