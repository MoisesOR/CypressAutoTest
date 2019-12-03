/// <reference types="Cypress" />

import { ExampleData } from "../support/models"
import { HomePage } from "../webpages/homePage"

describe('Example Auto Test', function () {
    var example: any

    beforeEach(() => {
        cy.server()
        cy.fixture('ExampleData').then(($ex) => {
            example = $ex
        })
        cy.visit('/')
    })

    afterEach(() => {
        cy.wait(5000)
        cy.screenshot()
    })

    it('Basic Test', function () {
        var exampleData = new ExampleData(example.name, example.email, example.body, example.search)

        HomePage.DoSearch(exampleData.search)
    })
})