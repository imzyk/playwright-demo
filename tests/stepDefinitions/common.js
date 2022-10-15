const { When, Given } = require('@cucumber/cucumber')
const { MenuPage } = require('../../pages/menu.page');

async function commonBrowse(pageName) {
   const menuPage = new MenuPage(page);
   if (pageName == "contact") {
      await menuPage.browseToContact();
   } else if (pageName == "cart") {
      await menuPage.browseToCart();
   } else if (pageName == "shop") {
      await menuPage.browseToShop();
   }
}

Given('I initially browse to {string} page', async function (pageName) {
   await page.goto("https://jupiter.cloud.planittesting.com");
   commonBrowse(pageName);
})

When('I browse to {string} page subsquently', async function (pageName) {
   commonBrowse(pageName);
})