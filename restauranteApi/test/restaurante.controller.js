import chai from 'chai';
import request from 'supertest';
import Server from '../server';

const { expect } = chai;

const _ingredientes = [
    { name: 'Alface', value: 0.4 },
    { name: 'Bacon', value: 2 },
    { name: 'Hambúrguer de carne', value: 3 },
    { name: 'Ovo', value: 0.8 },
    { name: 'Queijo', value: 1.5 }
];

const _cardapio = [
    {
        lanche: 'X-Bacon',
        ingredientes: [
            'Bacon',
            'Hambúrguer de carne',
            'Queijo'
        ],
        totalValue: 6.5
    },
    {
        lanche: 'X-Burger',
        ingredientes: [
            'Hambúrguer de carne',
            'Queijo'
        ],
        totalValue: 4.5
    },
    {
        lanche: 'X-Egg',
        ingredientes: [
            'Ovo',
            'Hambúrguer de carne',
            'Queijo'
        ],
        totalValue: 5.3
    },
    {
        lanche: 'X-Egg',
        ingredientes: [
            'Ovo',
            'Bacon',
            'Hambúrguer de carne',
            'Queijo'
        ],
        totalValue: 7.3
    }
];

// Receita Promo
const receita = [
    { name: 'Alface', count: 1 },
    { name: 'Bacon', count: 0 },
    { name: 'Hambúrguer de carne', count: 5 },
    { name: 'Ovo', count: 5 },
    { name: 'Queijo', count: 5 }
];

const promoResult = { item:
    [ { name: 'Alface', count: 1 },
      { name: 'Bacon', count: 0 },
      { name: 'Hambúrguer de carne', count: 5 },
      { name: 'Ovo', count: 5 },
      { name: 'Queijo', count: 5 } ],
   fullPrice: 26.9,
   activePromo: [ 'isLight', 'isMuitaCarnePromo', 'isMuitoQueijo' ],
   discountsValue: 7.1899999999999995 }

describe('Cardapio', () => {
    it('Retorna itens cadastrados com o valor correto', () => request(Server)
      .get('/api/v1/restaurante/items')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an.an('array')
          .to.have.deep.members(_ingredientes);
      }));
  
    it('Retorna cardápio com os valores corretos', () => request(Server)
      .get('/api/v1/restaurante/cardapio')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an.an('array')
          .to.have.deep.members(_cardapio);
      }));
  
    it('Retorna promoções e descontos corretamente', () => request(Server)
      .post('/api/v1/restaurante/montar')
      .send(receita)
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
        .to.be.an.an('object')
        .to.deep.equal(promoResult);
      }));
      
  });
  