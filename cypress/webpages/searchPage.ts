/// <reference types="Cypress" />

import 'cypress-xpath/src/index'

export class SearchPage{
    private static addToCartButton(){
        return cy.xpath("//div[contains(@class, 'product-container')]//a[contains(@class, 'ajax_add_to_cart_button')]")
    }

    private static checkoutButton(){
        return cy.get("a[title^='Proceed to checkout']")
    }

    static ClickAddToCart(){
        this.addToCartButton().click()
    }

    static GoToCheckout(){
        this.checkoutButton().click()
    }
}