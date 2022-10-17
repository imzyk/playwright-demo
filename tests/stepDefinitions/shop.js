const { When, Then } = require('@cucumber/cucumber')
// import expect for assertion
const { expect } = require('@playwright/test');

let expectedProductsPrices = {}
let expectedProducts = {}

When('I purchase the products', async function (table) {
    for (let productParams of table.rows()) {
        expectedProducts[productParams[0]] =  productParams[1];
    }
    for (let key of Object.keys(expectedProducts)) {
      console.log(`Purchase ${key} with number ${expectedProducts[key]}`);
      await this.shopPage.buyProduct(key, expectedProducts[key]);
      //record price for later validation
      expectedProductsPrices[key] = await this.shopPage.getPrice(key);
    }
    console.log(`Prices for comparison ${JSON.stringify(expectedProductsPrices)}`)
})

Then('I should be able to see correct products prices', async function () {
    let totalValue = 0;
    for (let item of await this.cartPage.getItems()) {
      console.log(`Parse ${JSON.stringify(item)}`);
      expect(Number(item["price"])).toBe(Number(expectedProductsPrices[item["name"]]));
      let subTotal = expectedProductsPrices[item["name"]] * expectedProducts[item["name"]];
      totalValue += subTotal;
      expect(Number(item["subTotal"])).toBe(Number(subTotal));
    }
    expect(Number(await this.cartPage.getTotal())).toBe(Number(totalValue));
})