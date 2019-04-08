/* eslint-disable no-plusplus */
class RestauranteDatabase {
  constructor() {
    this._lanches = [
      { name: 'X-Bacon', ingredients: ['Bacon', 'Hambúrguer de carne', 'Queijo'] },
      { name: 'X-Burger', ingredients: ['Hambúrguer de carne', 'Queijo'] },
      { name: 'X-Egg', ingredients: ['Ovo', 'Hambúrguer de carne', 'Queijo'] },
      { name: 'X-Egg', ingredients: ['Ovo', 'Bacon', 'Hambúrguer de carne', 'Queijo'] }];

    this._ingredientes = [];

    this.insertIngrediente({ name: 'Alface', value: 0.4 });
    this.insertIngrediente({ name: 'Bacon', value: 2 });
    this.insertIngrediente({ name: 'Hambúrguer de carne', value: 3 });
    this.insertIngrediente({ name: 'Ovo', value: 0.8 });
    this.insertIngrediente({ name: 'Queijo', value: 1.5 });
  }

  all() {
    return Promise.resolve(this._ingredientes);
  }

  byId(id) {
    return Promise.resolve(this._ingredientes[id]);
  }

  insert(ingrediente) {
    this._ingredientes.push(ingrediente);
    return Promise.resolve(ingrediente);
  }

  update(id, ingrediente) {
    this._ingredientes[id] = ingrediente;
    return Promise.resolve(ingrediente);
  }

  remove(id) {
    delete this._ingredientes[id];
    return Promise.resolve(this._ingredientes[id]);
  }

  cardapio() {
    return new Promise(resolve => {
      const cardapio = [];

      for (let i = 0; i < this._lanches.length; i++) {
        let price = 0;
        const ingr = [];
        for (let f = 0; f < this._lanches[i].ingredients.length; f++) {
          ingr.push(this._lanches[i].ingredients[f]);
          for (let g = 0; g < this._ingredientes.length; g++) {
            if (this._ingredientes[g].name === this._lanches[i].ingredients[f]) {
              price += this._ingredientes[g].value;
              break;
            }
          }
        }

        cardapio.push({ lanche: this._lanches[i].name, ingredientes: ingr, totalValue: price });
      }

      return resolve(cardapio);
    });
  }

  preco(receita) {
    return new Promise(resolve => {

    });
  }

  promocao(receita, precoCheio) {
    let desconto;
    
    if (this.isLight(receita)) {
      desconto += (precoCheio * 0.10);
    }
    if (this.isMuitaCarne(receita)) {
      for (let i = 0; i < receita.length; i++) {
        if (receita[i].name === 'Hambúrguer de carne') {
          const promoQtd = Math.floor(receita[i].count / 3);

        }
      }

    }
    if (this.isMuitoQueijo(receita)) { }
  }

  isLight(receita) {
    return new Promise(resolve => {
      for (let i = 0; i < receita.length; i++) {
        if (receita[i].name === 'Alface' && receita[i].count > 0) {
          for (let j = 0; j < receita.length; j++) {
            if (receita[j].name === 'Bacon' && receita[j].count === 0) {
              return resolve(true);
            }
          }
        }
      }
      return resolve(false);
    });
  }

  isMuitaCarne(receita) {
    return new Promise(resolve => {
      for (let i = 0; i < receita.length; i++) {
        if (receita[i].name === 'Hambúrguer de carne' && receita[i].count > 2) {
          return resolve(true);
        }
      }
      return resolve({ return: false });
    });
  }

  isMuitoQueijo(receita) {
    return new Promise(resolve => {
      for (let i = 0; i < receita.length; i++) {
        if (receita[i].name === 'Queijo' && receita[i].count > 2) {
          return resolve(true);
        }
      }
      return resolve(false);
    });
  }
}


export default new RestauranteDatabase();
