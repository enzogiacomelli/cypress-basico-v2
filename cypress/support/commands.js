// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(nome, sobrenome, email, texto){
    //const longText = 'teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste'

    cy.get('input[name="firstName"]').should('be.visible').type(nome)
    cy.get('input[name="lastName"]').should('be.visible').type(sobrenome)
    cy.get('input[id="email"]').should('be.visible').type(email)
    cy.get('textarea[name="open-text-area"]').should('be.visible').type(texto, { delay: 0})

    cy.get('input[name="firstName"]').should('have.value', nome)
    cy.get('input[name="lastName"]').should('have.value', sobrenome)
    cy.get('input[id="email"]').should('have.value', email)
    cy.get('textarea[name="open-text-area"]').should('have.value', texto)

    cy.contains('button[type="submit"]', 'Enviar').should('be.visible').click()
    
})




//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })