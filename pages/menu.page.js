// @ts-check

const { expect, Locator, Page } = require('@playwright/test');
exports.MenuPage = class MenuPage {
    constructor(page) {
        this.page = page;
        this.contactMenu = page.locator('li#nav-contact');
        this.shopMenu = page.locator('li#nav-shop');
        this.cartMenu = page.locator('li#nav-cart');
    }
    
    async browseToContact() {
        await this.contactMenu.click();
    }

    async browseToShop() {
        await this.shopMenu.click();
    }

    async browseToCart() {
        await this.cartMenu.click();
    }
}