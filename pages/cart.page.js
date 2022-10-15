// @ts-check

const { expect, Locator, Page } = require('@playwright/test');
exports.CartPage = class CartPage {
    constructor(page) {
        this.page = page;
        this.tableRowSelector = '.table.table-striped.cart-items tr.cart-item.ng-scope';
        this.itemsInTable = page.locator(this.tableRowSelector);
        this.itemNameIndexInTable = 0;
        this.priceIndexInTable = 1;
        this.subTotalIndexInTable = 3;
        this.totalValue = page.locator('.total.ng-binding');
    }
    
    async getItems() {
        let result = [];
        await this.page.waitForFunction(selector => document.querySelectorAll(selector).length > 0, this.tableRowSelector);
        let count = await this.itemsInTable.count();
        console.log("Numebr of items " + count);
        for (let i = 0; i < count; i++) {
          result.push({
              name: (await this.itemsInTable.nth(i).locator('td').nth(this.itemNameIndexInTable).innerText()).trim(),
              price: (await this.itemsInTable.nth(i).locator('td').nth(this.priceIndexInTable).innerText()).split('$')[1],
              subTotal: (await this.itemsInTable.nth(i).locator('td').nth(this.subTotalIndexInTable).innerText()).split('$')[1]
          });
        }
        return result;
    }

    async getTotal() {
        let totalText = await this.totalValue.innerText();
        return totalText.split(":")[1].trim();
    }

}