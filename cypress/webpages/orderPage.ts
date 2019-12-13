/// <reference types="Cypress" />

import 'cypress-xpath/src/index'
import { Helpers } from '../support/helpers'

export class OrderPage {
    private static tfootContainer(){
        return cy.get("tfoot")
    }

    static PriceAsserts() {
        this.tfootContainer().then(($tfoot)=>{
            var productPrice = Helpers.PriceNormalizer($tfoot.find("#total_product").text())
            var shippingPrice = Helpers.PriceNormalizer($tfoot.find("#total_shipping").text())
            var totalPriceWithoutTax = Helpers.PriceNormalizer($tfoot.find("#total_price_without_tax").text())
            var totalTax = Helpers.PriceNormalizer($tfoot.find("#total_tax").text())
            var totalPriceContainer = Helpers.PriceNormalizer($tfoot.find("#total_price_container").text())

            expect(productPrice + shippingPrice).to.be.equal(totalPriceWithoutTax)
            expect(totalPriceWithoutTax + totalTax).to.be.equal(totalPriceContainer)
        })
    }
}