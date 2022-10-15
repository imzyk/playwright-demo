const { expect, Locator, Page } = require('@playwright/test');
exports.ShopPage = class ShopPage {
    constructor(page) {
        this.stuFrogBuyButton = page.locator('li:has-text("Stuffed Frog") >> role=link[name="Buy"]');
        this.stuFrogPriceText = page.locator('li:has-text("Stuffed Frog") >> .product-price.ng-binding');
        this.valBearBuyButton = page.locator('li:has-text("Valentine Bear") >> role=link[name="Buy"]');
        this.valBearPriceText = page.locator('li:has-text("Valentine Bear") >> .product-price.ng-binding');
        this.fluBunnyBuyButton = page.locator('li:has-text("Fluffy Bunny") >> role=link[name="Buy"]');
        this.fluBunnyPriceText = page.locator('li:has-text("Fluffy Bunny") >> .product-price.ng-binding');
    }
    async buyProduct(productName, number) {
        let locator = null;
        switch (productName.trim()) {
            case "Stuffed Frog":
                locator = this.stuFrogBuyButton;
                break;
            case "Valentine Bear":
                locator = this.valBearBuyButton;
                break;
            case "Fluffy Bunny":
                locator = this.fluBunnyBuyButton;
                break;
            default:
                console.error(`${productName} is not supported to be bought`);
        }
        for(let index = 0; index < number; index++) {
            await locator.click();
        }
    }

    async getPrice(productName) {
        let locator = null;
        switch (productName.trim()) {
            case "Stuffed Frog":
                locator = this.stuFrogPriceText;
                break;
            case "Valentine Bear":
                locator = this.valBearPriceText;
                break;
            case "Fluffy Bunny":
                locator = this.fluBunnyPriceText;
                break;
            default:
                console.error(`${productName} is not supported to fetch price`);
        }
        return (await locator.innerText()).split('$')[1];
    }

}