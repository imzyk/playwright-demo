// @ts-check
const { test, expect } = require('@playwright/test');
const { ShopPage } = require('../pages/shop.page');
const { MenuPage } = require('../pages/menu.page');
const { CartPage } = require('../pages/cart.page');

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test('Shop products', async ({ page }) => {
  const menuPage = new MenuPage(page);
  await menuPage.browseToShop();
  const shopPage = new ShopPage(page);
  const expectedProducts = {
    "Stuffed Frog": 2,
    "Fluffy Bunny": 5,
    "Valentine Bear": 3
  };
  let expectedProductsPrices = {}
  for (let key of Object.keys(expectedProducts)) {
    console.log(`Purchase ${key}`);
    await shopPage.buyProduct(key, expectedProducts[key]);
    //record price for later validation
    expectedProductsPrices[key] = await shopPage.getPrice(key);
  }

  await menuPage.browseToCart();
  const cartPage = new CartPage(page);
  let totalValue = 0;
  for (let item of await cartPage.getItems()) {
    console.log(`Parse ${JSON.stringify(item)}`);
    expect(Number(item["price"])).toBe(Number(expectedProductsPrices[item["name"]]));
    let subTotal = expectedProductsPrices[item["name"]] * expectedProducts[item["name"]];
    totalValue += subTotal;
    expect(Number(item["subTotal"])).toBe(Number(subTotal));
  }
  expect(Number(await cartPage.getTotal())).toBe(Number(totalValue));
});