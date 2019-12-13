/// <reference types="Cypress" />

import 'cypress-xpath/src/index'

export class HomePage{
    private static InputBuscar(){
        return cy.get("#search_query_top")
    }

    static DoSearch(text: string){
        this.InputBuscar().type(text + '{enter}')
    }
}