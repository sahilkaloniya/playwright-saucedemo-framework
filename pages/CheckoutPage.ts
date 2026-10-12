import {Page, Locator, expect} from '@playwright/test'

export class CheckoutPage{
    fillCustomerInformation(arg0: string, arg1: string, arg2: string) {
        throw new Error('Method not implemented.')
    }
    completeOrder() {
        throw new Error('Method not implemented.')
    }
    completeHeader(completeHeader: any) {
        throw new Error('Method not implemented.')
    }
    readonly page: Page
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly postalCodeInput: Locator
    readonly continueToFillDetailsButton: Locator
    readonly continueAfterFillingDetailsButton: Locator
    readonly finishButton: Locator
    readonly thankYouMessage: Locator
    continueButton: any

    constructor(page: Page){
        this.page = page
        this.firstNameInput = page.locator(`//input[@placeholder="First Name"]`)
        this.lastNameInput = page.locator(`//input[@placeholder="Last Name"]`)
        this.postalCodeInput = page.locator(`//input[@placeholder="Zip/Postal Code"]`)
        this.continueToFillDetailsButton = page.locator(`//button[@data-test="checkout"]`)
        this.continueAfterFillingDetailsButton = page.locator(`//input[@data-test="continue"]`)
        this.finishButton = page.locator(`//button[@data-test="finish"]`)
        this.thankYouMessage = page.locator(`//h2[text()='Thank you for your order!']`)
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string){
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.postalCodeInput.fill(postalCode)
    }
    async continueToFillDetails(){
        await this.continueToFillDetailsButton.click()
    }
    async continueAfterFillingDetails(){
        await this.continueAfterFillingDetailsButton.click()
    }
    async finishCheckout(){     
    await this.finishButton.click()
    }
    async verifyThankYouMessage(){
        
    }
}