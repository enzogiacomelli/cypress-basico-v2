beforeEach( function() {
  cy.visit('./src/index.html')
})


describe('verifica o título da aplicação', function() {
  it('verifica o título da aplicação', function() {

      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
})


describe('preenche os campos obrigatórios e envia o formulário', function() {
  it('preenche os campos e clica no botão', function() {

    cy.fillMandatoryFieldsAndSubmit('Enzo', 'Giacomelli', 'egiacomelli07@gmail.com', 'oloco meu')
    cy.get('span[class="success"]').should('be.visible')
  })
})


describe('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
  it('preenche os campos com e-mail invalido e clica no botão', function() {

    cy.fillMandatoryFieldsAndSubmit('Enzo', 'Giacomelli', 'egiacomelli07%gmail.com', 'oloco meu')
    cy.get('span[class="error"]').should('be.visible')
  })
})


describe('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
  it('apenas clica no botão sem preencher nada', function() {
    cy.contains('button[type="submit"]', 'Enviar').should('be.visible').click()
    cy.get('span[class="error"]').should('be.visible')
  })
})


describe('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
  it('preenche os campos para envio e clica em telefone', function() {

    cy.get('input[id="phone-checkbox"]').should('be.visible').click()
    cy.fillMandatoryFieldsAndSubmit('Enzo', 'Giacomelli', 'egiacomelli07@gmail.com', 'oloco meu')
    cy.get('span[class="error"]').should('be.visible')
  })
}) 


describe('teste de numero de telefone com valor não numérico', function() {
  it('insere texto no campo telefone e verifica valor do campo', function() {
      cy.get('input[id="phone"]').should('be.visible').type('texto').should('have.value', '')
  })
}) 


describe('teste de campo de seleção suspensa', function(){
  it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('select[id="product"]').should('be.visible').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('select[id="product"]').should('be.visible').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function(){
    cy.get('select[id="product"]').should('be.visible').select(1).should('have.value', 'blog')
  })
})



/*describe('envia o formuário com sucesso usando um comando customizado', function() {
  it('chama o comando', function() {
      cy.fillMandatoryFieldsAndSubmit('Enzo', 'Giacomelli', 'egiacomelli07@gmail.com', 'oloco meu')
      cy.get('span[class="success"]').should('be.visible')
  })
})*/



