const { When, Given } = require('@cucumber/cucumber')

async function commonBrowse(world, pageName) {
   if (pageName == "contact") {
      await world.menuPage.browseToContact();
   } else if (pageName == "cart") {
      await world.menuPage.browseToCart();
   } else if (pageName == "shop") {
      await world.menuPage.browseToShop();
   }
}

Given('I initially browse to {string} page', async function (pageName) {
   await this.page.goto("https://jupiter.cloud.planittesting.com");
   commonBrowse(this, pageName);
})

When('I browse to {string} page subsquently', async function (pageName) {
   commonBrowse(this, pageName);
})