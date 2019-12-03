/// <reference types="Cypress" />

import 'cypress-xpath/src/index'

export class HomePage{
    private static InputBuscar(){
        return cy.get("input[title='Buscar']")
    }

    static DoSearch(text: string){
        this.InputBuscar().type(text)
    }
}