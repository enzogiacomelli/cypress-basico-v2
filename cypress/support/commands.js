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