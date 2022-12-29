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


describe('Testes de tratamento de erros', function() {
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.fillMandatoryFieldsAndSubmit('Enzo', 'Giacomelli', 'egiacomelli07%gmail.com', 'oloco meu')
    cy.get('span[class="error"]').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.contains('button[type="submit"]', 'Enviar').should('be.visible').click()
    cy.get('span[class="error"]').should('be.visible')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('input[id="phone-checkbox"]').should('be.visible').check()
    cy.fillMandatoryFieldsAndSubmit('Enzo', 'Giacomelli', 'egiacomelli07@gmail.com', 'oloco meu')
    cy.get('span[class="error"]').should('be.visible')
  })

  it('teste de numero de telefone com valor não numérico', function() {
    cy.get('input[id="phone"]').should('be.visible').type('texto').should('have.value', '')
  })

})


describe('testes de campo de seleção suspensa', function(){
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


describe('testes radio input', function() {
  it('marca o tipo de atendimento "Feedback"', function() {
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
    cy.get('input[type="radio"][value="elogio"]').should('be.not.checked')
    cy.get('input[type="radio"][value="ajuda"]').should('be.not.checked')
  })

  it('marca cada tipo de atendimento', function() {
    cy.get('input[type="radio"]')    //vale para todos os inputs do tipo radio(existem 3 na pagina)
      .should('have.length', 3)     //verifica se realmente existem apenas 3
      .each(function($radio){      //para cada radio button executa os comandos aninhados
        cy.wrap($radio).check()   //marca o botão e dps checa se marcou
        cy.wrap($radio).should('be.checked')
      })
  })
})


describe('testes de checkbox', function() {
  it('marca ambos checkboxes, depois desmarca o último', function(){
    cy.get('input[type="checkbox"]').should('have.length', 2).each(function($checkbox){
      cy.wrap($checkbox).check()
      cy.wrap($checkbox).should('be.checked')
    }).last().uncheck().should('be.not.checked')
  })
})

describe('testes de upload de arquivos', function(){
  it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[id="file-upload"]').should('not.have.value').selectFile('cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', function(){
    cy.get('input[id="file-upload"]').should('not.have.value').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json').as('arquivoExemplo')
    cy.get('input[id="file-upload"]').selectFile('@arquivoExemplo')      
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })


})


describe('testes de navegação por links', function(){
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
    cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click()
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
  })
})







/*describe('envia o formuário com sucesso usando um comando customizado', function() {
  it('chama o comando', function() {
      cy.fillMandatoryFieldsAndSubmit('Enzo', 'Giacomelli', 'egiacomelli07@gmail.com', 'oloco meu')
      cy.get('span[class="success"]').should('be.visible')
  })
})*/



