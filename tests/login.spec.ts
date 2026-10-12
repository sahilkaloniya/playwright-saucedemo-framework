import {test, expect}  from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { InventoryPage } from '../pages/InventoryPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import testData from '../test-data/users.json'

let loginPage : LoginPage
let inventorypage : InventoryPage
let checkoutPage : CheckoutPage


test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page)
    inventorypage = new InventoryPage(page)
    checkoutPage = new CheckoutPage(page)

    await page.goto(`/`)
})

test(`TC01 >>> VERIFY VALID LOGIN`, async({page}) => {
   await loginPage.login(testData.validUser.username, testData.validUser.password)
   await expect(page).toHaveURL(`https://www.saucedemo.com/inventory.html`)
})

test(`TC02 >>> VERIFY ERROR MESSAGE ON INVALID LOGIN`, async({page}) => {
    await loginPage.login(testData.InvalidUser.username, testData.InvalidUser.password)
    await expect(loginPage.errorMessage).toContainText('Username and password do not match')
})

test(`TC03 >>> ADD PRODUCT TO CART AND VERIFY ITS BADGE`, async({page})=> {
    await loginPage.login(testData.validUser.username, testData.validUser.password)
    await inventorypage.addBackpackToCart()
    await expect(inventorypage.cartBadge).toHaveText('1')
})

test(`TC04 >>> END TO END CHECKOUT JOURNEY`, async({page}) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password)
    await inventorypage.addBackpackToCart()
    await inventorypage.goToCart()
    await checkoutPage.continueToFillDetails()
    await checkoutPage.fillCheckoutInformation(testData.customerDetails.firstName, testData.customerDetails.lastName, testData.customerDetails.postalCode)
    await checkoutPage.continueAfterFillingDetails()
    await checkoutPage.finishCheckout()
    await checkoutPage.verifyThankYouMessage()  
})

test(`TC05 >>> SORT PRODUCTS BY PRICE LOW TO HIGH`, async({page}) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password)
    await inventorypage.sortProductsByPriceLowToHigh()
    await expect(inventorypage.firstItemPrice).toHaveText('$7.99')
})

test(`TC06 >>> VERIFY LOGOUT FUNCTIONALITY`, async({page}) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password)
    await inventorypage.logout()
    await expect(loginPage.loginButton).toBeVisible()
})

test(`TC07 >>> REMOVE PRODUCT FROM CART AND VERIFY BADGE DISAPPEARS`, async({page}) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password)
    await inventorypage.addBackpackToCart()
    await expect(inventorypage.cartBadge).toHaveText('1')
    await inventorypage.removeBackpackFromCart()
    await expect(inventorypage.cartBadge).not.toBeVisible()
})