/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
import chai from 'chai';
import request from 'supertest';
import Server from '../server';

const { expect } = chai;

const _ingredientes = [
  { name: 'Alface', value: 0.4 },
  { name: 'Bacon', value: 2 },
  { name: 'Hambúrguer de carne', value: 3 },
  { name: 'Ovo', value: 0.8 },
  { name: 'Queijo', value: 1.5 },
];


const testePromo = [
  { name: 'Alface', count: 1 },
  { name: 'Hambúrguer de carne', count: 3 },
  { name: 'Queijo', count: 3 },
];


// Calcula o valor de um lanche baseado na lista de ingedientes e seus preços
async function valor(ingredients) {
  return new Promise(resolve => {
    let price = 0;
    for (let f = 0; f < ingredients.length; f++) {
      for (let g = 0; g < _ingredientes.length; g++) {
        if (_ingredientes[g].name === ingredients[f]) {
          price += _ingredientes[g].value;
          break;
        }
      }
    }
    return resolve(price);
  });
}

function promo(ingredients) {
  return new Promise(resolve => {
    let price = 0;
    for (let f = 0; f < ingredients.length; f++) {
      for (let g = 0; g < _ingredientes.length; g++) {
        if (_ingredientes[g].name === ingredients[f].name) {
          price += _ingredientes[g].value * ingredients[f].count;
          break;
        }
      }
    }
    return resolve(price);
  });
}


_ingredientes.forEach(element => {
  describe(`Cadastrar ${element.name} com valor: ${element.value}`, () => {
    it('Cadastra e verifica o valor de cada item', () => request(Server)
      .post('/api/v1/restaurante/criar')
      .send(element)
      .then(r => {
        expect(r.body)
          .to.be.an.an('object');
      }));
  });
});

describe('Testar preços dos lanches', () => {
  it('Verificar se o preço de cada lanche está sendo calculado corretamente', () => request(Server)
    .get('/api/v1/restaurante/cardapio')
    .expect('Content-Type', /json/)
    .then(r => {
      r.body.forEach(el => {
        valor(el.ingredientes)
          .then(value => {
            console.log(`    ${el.lanche}: valor calculado: ${value}, valor recebido: ${el.totalValue}`);
            expect(value)
              .to.be.equal(el.totalValue);
          });
      });
      expect(r.body)
        .to.be.an.an('array');
    }));
});

describe('Promoções', () => {
  it('Retorna promoções corretamente', () => request(Server)
    .post('/api/v1/restaurante/montar')
    .send(testePromo)
    .expect('Content-Type', /json/)
    .then(r => {
      expect(r.body.activePromo)
        .to.be.an.an('array')
        .to.deep.equal(['isLight', 'isMuitaCarnePromo', 'isMuitoQueijo']);
    }));


  it('Retorna descontos corretamente - Light', () => request(Server)
    .post('/api/v1/restaurante/montar')
    .send([{ name: 'Alface', count: 1 }])
    .expect('Content-Type', /json/)
    .then(r => {
      promo([{ name: 'Alface', count: 1 }])
        .then(value => {
          expect(r.body.discountsValue)
            .to.be.equal(value * 0.1);
        });
    }));

  it('Retorna descontos corretamente - Muita Carne', () => request(Server)
    .post('/api/v1/restaurante/montar')
    .send([{ name: 'Hambúrguer de carne', count: 3 }])
    .expect('Content-Type', /json/)
    .then(r => {
      promo([{ name: 'Hambúrguer de carne', count: 3 }])
        .then(value => {
          expect(r.body.discountsValue)
            .to.be.equal((value / 3));
        });
    }));

  it('Retorna descontos corretamente - Muito Queijo', () => request(Server)
    .post('/api/v1/restaurante/montar')
    .send([{ name: 'Queijo', count: 3 }])
    .expect('Content-Type', /json/)
    .then(r => {
      promo([{ name: 'Queijo', count: 3 }])
        .then(value => {
          expect(r.body.discountsValue)
            .to.be.equal((value / 3));
        });
    }));
});
