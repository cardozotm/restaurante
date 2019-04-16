/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
import chai from 'chai';
import request from 'supertest';
import Server from '../server';

const { expect } = chai;

const _ingredients = [
  { name: 'Alface', value: 0.4 },
  { name: 'Bacon', value: 2 },
  { name: 'Hambúrguer de carne', value: 3 },
  { name: 'Ovo', value: 0.8 },
  { name: 'Queijo', value: 1.5 },
];


const testOffer = [
  { name: 'Alface', count: 1 },
  { name: 'Hambúrguer de carne', count: 3 },
  { name: 'Queijo', count: 3 },
];


// Calculates the value of a sandwich based on the list of ingredients and their prices
function price(ingredients) {
  return new Promise(resolve => {
    let price = 0;
    for (let f = 0; f < ingredients.length; f++) {
      for (let g = 0; g < _ingredients.length; g++) {
        if (_ingredients[g].name === ingredients[f]) {
          price += _ingredients[g].value;
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
      for (let g = 0; g < _ingredients.length; g++) {
        if (_ingredients[g].name === ingredients[f].name) {
          price += _ingredients[g].value * ingredients[f].count;
          break;
        }
      }
    }
    return resolve(price);
  });
}


_ingredients.forEach(element => {
  describe(`Enter ${element.name} with the value: ${element.value}`, () => {
    it('Register and verify the value of each item', () => request(Server)
      .post('/api/v1/restaurant/create')
      .send(element)
      .then(r => {
        expect(r.body)
          .to.be.an.an('object');
      }));
  });
});

describe('Test Sandwich Prices', () => {
  it('Check that the price of each sandwich is being calculated correctly', () => request(Server)
    .get('/api/v1/restaurant/menu')
    .expect('Content-Type', /json/)
    .then(r => {
      r.body.forEach(el => {
        price(el.ingredients)
          .then(value => {
            console.log(`    ${el.lanche}: calculated price: ${value}, amount received: ${el.totalValue}`);
            expect(value)
              .to.be.equal(el.totalValue);
          });
      });
      expect(r.body)
        .to.be.an.an('array');
    }));
});

describe('Special Offers', () => {
  it('Returns correct special offers', () => request(Server)
    .post('/api/v1/restaurant/assemble')
    .send(testOffer)
    .expect('Content-Type', /json/)
    .then(r => {
      expect(r.body.activeoffer)
        .to.be.an.an('array')
        .to.deep.equal(['isLight', 'isALotOfMeat', 'isALotOfCheese']);
    }));


  it('Returns Discounts Correctly - isLight', () => request(Server)
    .post('/api/v1/restaurant/assemble')
    .send([{ name: 'Alface', count: 1 }])
    .expect('Content-Type', /json/)
    .then(r => {
      promo([{ name: 'Alface', count: 1 }])
        .then(value => {
          expect(r.body.discountsValue)
            .to.be.equal(value * 0.1);
        });
    }));

  it('Returns Discounts Correctly - isALotOfMeat', () => request(Server)
    .post('/api/v1/restaurant/assemble')
    .send([{ name: 'Hambúrguer de carne', count: 3 }])
    .expect('Content-Type', /json/)
    .then(r => {
      promo([{ name: 'Hambúrguer de carne', count: 3 }])
        .then(value => {
          expect(r.body.discountsValue)
            .to.be.equal((value / 3));
        });
    }));

  it('Returns Discounts Correctly - isALotOfCheese', () => request(Server)
    .post('/api/v1/restaurant/assemble')
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
