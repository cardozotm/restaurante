/* eslint-disable no-plusplus */
class RestaurantDatabase {
  constructor() {
    this._sandwiches = [
      { name: 'X-Bacon', ingredients: ['Bacon', 'Hambúrguer de carne', 'Queijo'] },
      { name: 'X-Burger', ingredients: ['Hambúrguer de carne', 'Queijo'] },
      { name: 'X-Egg', ingredients: ['Ovo', 'Hambúrguer de carne', 'Queijo'] },
      { name: 'X-Egg', ingredients: ['Ovo', 'Bacon', 'Hambúrguer de carne', 'Queijo'] }];

    this._ingredients = [];

    // this.insert({ name: 'Alface', value: 0.4 });
    // this.insert({ name: 'Bacon', value: 2 });
    // this.insert({ name: 'Hambúrguer de carne', value: 3 });
    // this.insert({ name: 'Ovo', value: 0.8 });
    // this.insert({ name: 'Queijo', value: 1.5 });
  }

  all() {
    return Promise.resolve(this._ingredients);
  }

  insert(ingrediente) {
    this._ingredients.push(ingrediente);
    return Promise.resolve(ingrediente);
  }

  menu() {
    return new Promise(resolve => {
      const menu = [];

      for (let i = 0; i < this._sandwiches.length; i++) {
        let price = 0;
        const ingr = [];
        for (let f = 0; f < this._sandwiches[i].ingredients.length; f++) {
          ingr.push(this._sandwiches[i].ingredients[f]);
          for (let g = 0; g < this._ingredients.length; g++) {
            if (this._ingredients[g].name === this._sandwiches[i].ingredients[f]) {
              price += this._ingredients[g].value;
              break;
            }
          }
        }

        menu.push({ sandwiches: this._sandwiches[i].name, ingredients: ingr, totalValue: price });
      }

      return resolve(menu);
    });
  }


  offers(recipe, fullPrice) {
    let discount;

    if (this.isLight(recipe)) {
      discount += (fullPrice * 0.10);
    }
    if (this.isALotOfMeat(recipe)) {
      for (let i = 0; i < recipe.length; i++) {
        if (recipe[i].name === 'Hambúrguer de carne') {
          const promoQtd = Math.floor(recipe[i].count / 3);
        }
      }
    }
    if (this.isALotOfCheese(recipe)) { }
  }

  isLight(recipe) {
    return new Promise(resolve => {
      for (let i = 0; i < recipe.length; i++) {
        if (recipe[i].name === 'Alface' && recipe[i].count > 0) {
          for (let j = 0; j < recipe.length; j++) {
            if (recipe[j].name === 'Bacon' && recipe[j].count === 0) {
              return resolve(true);
            }
          }
        }
      }
      return resolve(false);
    });
  }

  isALotOfMeat(recipe) {
    return new Promise(resolve => {
      for (let i = 0; i < recipe.length; i++) {
        if (recipe[i].name === 'Hambúrguer de carne' && recipe[i].count > 2) {
          return resolve(true);
        }
      }
      return resolve({ return: false });
    });
  }

  isALotOfCheese(recipe) {
    return new Promise(resolve => {
      for (let i = 0; i < recipe.length; i++) {
        if (recipe[i].name === 'Queijo' && recipe[i].count > 2) {
          return resolve(true);
        }
      }
      return resolve(false);
    });
  }
}


export default new RestaurantDatabase();
