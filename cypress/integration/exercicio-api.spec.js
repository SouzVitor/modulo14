/// <reference types="cypress" />

import contrato from '../contracts/usuario.contract';

describe('Testes da Funcionalidade Usuários', () => {
     
  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.not.null;
      return contrato.validateAsync(response.body);
    });
  });     


  it('Deve listar usuários cadastrados', () => {
     cy.request('usuarios').then(response => {
       expect(response.status).to.eq(200);
       expect(response.body).to.be.not.null;
     });
   });

   it.only('Deve cadastrar um usuário com sucesso', () => {
     const novoUsuario = {
       nome: 'João Silva',
       email: 'joao.silva@teste.com',
       password: '123456',
       administrador: true
     };
   
     cy.request({
       method: 'POST',
       url: 'http://localhost:3000/usuarios',
       body: novoUsuario
     }).then((response) => {
       expect(response.status).to.eq(201);
       expect(response.body).to.have.property('message').to.eq('Cadastro realizado com sucesso');
       expect(response.body).to.have.property('_id');
   
       // Verifica se o usuário cadastrado tem os mesmos dados enviados na requisição
       expect(response.body).to.deep.include(novoUsuario);
     });
   });
   

   it('Deve validar um usuário com email inválido', () => {
     const usuario = {
       nome: "Fulano",
       email: "emailinválido",
       password: "123456",
       administrador: "false"
     };
   
     cy.request({
       method: "POST",
       url: "http://localhost:3000/usuarios",
       failOnStatusCode: false,
       body: usuario,
     }).then((response) => {
       expect(response.status).to.eq(400);
       expect(response.body.message).to.eq(
         "email deve ser um email válido"
       );
     });
   });

   it('Deve editar um usuário previamente cadastrado', () => {
     // Crie um usuário para editar
     cy.request({
       method: 'POST',
       url: '/usuarios',
       body: {
         nome: 'Fulano de Tal',
         email: 'fulano@teste.com',
         password: '123456',
         administrador: true
       }
     }).then((response) => {
       // Realize a atualização do usuário
       cy.request({
         method: 'PUT',
         url: `/usuarios/${response.body._id}`,
         body: {
           nome: 'Fulano da Silva',
           email: 'beltrano@qa.com.br',
           password: 'teste',
           administrador: true
         }
       }).then((response) => {
         // Verifique se a mensagem de sucesso é exibida
         expect(response.status).to.eq(200)
         expect(response.body.message).to.eq('Registro alterado com sucesso')
       });
     });
   });    
    

   it('Deve deletar um usuário previamente cadastrado', () => {
     // Crie um usuário para deletar
     cy.request({
       method: 'POST',
       url: '/usuarios',
       body: {
         nome: 'Fulano de Tal',
         email: 'fulano@teste.com',
         password: '123456',
         administrador: true
       }
     }).then((response) => {
       // Tente excluir o usuário criado
       cy.request({
         method: 'DELETE',
         url: `/usuarios/${response.body._id}`,
       }).then((response) => {
         // Verifique se a mensagem de sucesso é exibida
         expect(response.status).to.eq(200)
         expect(response.body.message).to.eq('Registro excluído com sucesso')
       });
     });
   });
   
   //// infelizmente deu error "Invalid reference key: ["tld"]" no código tentei de várias maneiras mais não conseguir corrigir o erro


});
