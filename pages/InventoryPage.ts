import { Page, Locator, expect} from "@playwright/test";

export class InventoryPage{

    readonly page: Page
    readonly backpackAddToCartBtn: Locator
    readonly backpackRemoveBtn: Locator
    readonly cartBadge: Locator
    readonly sortDropdown: Locator
    readonly firstItemPrice: Locator
    readonly cartLink: Locator
    readonly menuButton: Locator
    readonly logoutLink: Locator 
    readonly errorMessageForNotFillingCheckoutInformation: Locator

    constructor(page: Page){
        this.page = page
        this.backpackAddToCartBtn = page.locator(`//button[@data-test="add-to-cart-sauce-labs-backpack"]`)
        this.backpackRemoveBtn = page.locator(`//button[@data-test="remove-sauce-labs-backpack"]`)
        this.cartBadge = page.locator(`//span[@class="shopping_cart_badge"]`)
        this.sortDropdown = page.locator(`//select[@class="product_sort_container"]`)
        this.firstItemPrice = page.locator(`.inventory_item_price`).first()
        this.cartLink = page.locator(`.shopping_cart_link`)
        this.menuButton = page.locator(`//button[@id="react-burger-menu-btn"]`)
        this.logoutLink = page.locator(`//a[@id="logout_sidebar_link"]`)
        this.errorMessageForNotFillingCheckoutInformation = page.locator(`//div[@class="error-message-container error"]`)
    }

    async addBackpackToCart(){
        await this.backpackAddToCartBtn.click()
    }
    async removeBackpackFromCart(){
        await this.backpackRemoveBtn.click()
    }
    async getCartBadgeText(){
        return await this.cartBadge.textContent()
    }   
    async sortProductsByPriceLowToHigh(){
        await this.sortDropdown.selectOption('lohi')
    }   
    async getFirstItemPrice(){
        return await this.firstItemPrice.textContent()
    }
    async goToCart(){
        await this.cartLink.click()
    }
    async logout(){
        await this.menuButton.click()
        await this.logoutLink.click()
    }   
    async getErrorMessageForNotFillingCheckoutInformation(){
        await expect(this.errorMessageForNotFillingCheckoutInformation).toBeVisible()
    }
   








}



