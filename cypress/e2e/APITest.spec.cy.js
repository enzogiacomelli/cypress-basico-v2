describe('Testes de requisição', function(){
    it('faz uma requisição HTTP', function(){
        cy.request('GET', 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').then(function(response){
            const {status, statusText, body} = response
            expect(status).to.eq(200)
            expect(statusText).to.eq('OK')
            expect(body).to.include('CAC TAT')
        }) 
    })
})