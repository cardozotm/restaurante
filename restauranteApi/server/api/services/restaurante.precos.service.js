import promo from './restaurante.promo.services';
import db from './restaurante.db.service';

class RestaurantePrecos {
  constructor() { }

  // Montagem de cardapio e calculo de preços
  cardapio() {
    return new Promise(resolve => {
      const cardapio = [];

      for (let i = 0; i < db._lanches.length; i++) {
        let price = 0;
        const ingr = [];
        for (let f = 0; f < db._lanches[i].ingredients.length; f++) {
          ingr.push(db._lanches[i].ingredients[f]);
          for (let g = 0; g < db._ingredientes.length; g++) {
            if (db._ingredientes[g].name === db._lanches[i].ingredients[f]) {
              price += db._ingredientes[g].value;
              break;
            }
          }
        }

        cardapio.push({ lanche: db._lanches[i].name, ingredientes: ingr, totalValue: price });
      }

      return resolve(cardapio);
    });
  }

  montarLanche(receita) {
    return new Promise(resolve => {
      this.calculaPreco(receita)
        .then(totalPrice => {
          promo.calculaDesconto(receita, totalPrice.reduce(this.add))
            .then((promo => {
              const lancheData = {
                item: receita,
                fullPrice: totalPrice.reduce(this.add),
                activePromo: promo.ativas,
                discountsValue: promo.desconto,
              };
              return resolve(lancheData);
            }));
        });
    });
  }

  // Métodos Auxiliares
  calculaPreco(receita) {
    const totalPrice = [];
    return new Promise(resolve => {
      for (let i = 0; i < receita.length; i++) {
        this.getItem(receita[i].name)
          .then(item => {
            if (item.value > 0) {
              totalPrice.push(item.value * receita[i].count);
            }
          });
      }
      resolve(totalPrice);
    });
  }

  // Metodos Auxiliares
  getItem(item) {
    return new Promise(resolve => {
      for (let i = 0; i < db._ingredientes.length; i++) {
        if (db._ingredientes[i].name === item) {
          return resolve(db._ingredientes[i]);
        }
      }
    });
  }

  // Metodos Auxiliares
  add(accumulator, a) {
    return accumulator + a;
  }

}

export default new RestaurantePrecos();
