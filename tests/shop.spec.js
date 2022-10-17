// @ts-check
const { test, expect } = require('../fixtures/basePage');

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test('Shop products', async ({ menuPage, shopPage, cartPage }) => {
  await menuPage.browseToShop();
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