import{test, expect} from '@playwright/test'
import { CheckoutPage } from '../pages/CheckoutPage'
import { InventoryPage } from '../pages/InventoryPage'
import { LoginPage } from '../pages/LoginPage'
import testData from '../test-data/users.json'

let loginPage : LoginPage
let inventorypage : InventoryPage
let checkoutPage : CheckoutPage 

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page)
    inventorypage = new InventoryPage(page)
    checkoutPage = new CheckoutPage(page)

    await page.goto(`/`)
    await loginPage.login(testData.validUser.username, testData.validUser.password)
})

test('CHECKOUT 01 >>> Successful End-to-End Order Placement', async () => {
    await inventorypage.addBackpackToCart()
    await inventorypage.goToCart()
    await checkoutPage.continueToFillDetails()
    await checkoutPage.fillCheckoutInformation(testData.customerDetails.firstName, testData.customerDetails.lastName, testData.customerDetails.postalCode)
    await checkoutPage.continueAfterFillingDetails()
    await checkoutPage.finishCheckout()
    await checkoutPage.verifyThankYouMessage()
})

test('CHECKOUT 02 >>> Error When Submitting Empty Information', async ({ page }) => {
    await inventorypage.addBackpackToCart()
    await inventorypage.goToCart()
    await checkoutPage.continueToFillDetails()
    await checkoutPage.continueAfterFillingDetails()
    await expect(inventorypage.errorMessageForNotFillingCheckoutInformation).toBeVisible()
})