// cucumber.conf.js file

const { Before, BeforeAll, AfterAll, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const { ContactPage } = require('./pages/contact.page');
const { MenuPage } = require('./pages/menu.page');
const { CartPage } = require('./pages/cart.page');
const { ShopPage } = require('./pages/shop.page');


setDefaultTimeout(60000)

// launch the browser
BeforeAll(async function () {
   global.browser = await chromium.launch({
       headless: true,
       slowMo: 1000,
   });

});

// close the browser
AfterAll(async function () {
   await global.browser.close();
});

// Create a new browser context and page per scenario
Before(async function () {
   this.context = await global.browser.newContext();
   this.page = await this.context.newPage();
   console.log(JSON.stringify(this.page));
   this.contactPage = new ContactPage(this.page);
   this.menuPage = new MenuPage(this.page);
   this.cartPage = new CartPage(this.page);
   this.shopPage = new ShopPage(this.page);
   
});

// Cleanup after each scenario
After(async function () {
   await this.page.close();
   await this.context.close();
});
