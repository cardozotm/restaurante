import promo from './restaurant.promo.services';
import db from './restaurant.db.service';

class RestaurantPrices {
  // Assembly of menu and calculation of prices
  menu() {
    return new Promise(resolve => {
      const menu = [];

      for (let i = 0; i < db._sandwiches.length; i++) {
        let price = 0;
        const ingr = [];
        for (let f = 0; f < db._sandwiches[i].ingredients.length; f++) {
          ingr.push(db._sandwiches[i].ingredients[f]);
          for (let g = 0; g < db._ingredients.length; g++) {
            if (db._ingredients[g].name === db._sandwiches[i].ingredients[f]) {
              price += db._ingredients[g].value;
              break;
            }
          }
        }

        menu.push({ sandwiche: db._sandwiches[i].name, ingredients: ingr, totalValue: price });
      }

      return resolve(menu);
    });
  }

  assembleSandwiches(recipe) {
    return new Promise(resolve => {
      this.calculatePrice(recipe)
        .then(totalPrice => {
          promo.calulateDiscounts(recipe, totalPrice.reduce(this.add))
            .then((offer => {
              const sandwichData = {
                item: recipe,
                fullPrice: totalPrice.reduce(this.add),
                activeoffer: offer.ativas,
                discountsValue: offer.desconto,
              };
              return resolve(sandwichData);
            }));
        });
    });
  }

  calculatePrice(recipe) {
    const totalPrice = [];
    return new Promise(resolve => {
      for (let i = 0; i < recipe.length; i++) {
        this.getItem(recipe[i].name)
          .then(item => {
            if (item.value > 0) {
              totalPrice.push(item.value * recipe[i].count);
            }
          });
      }
      resolve(totalPrice);
    });
  }

  getItem(item) {
    return new Promise(resolve => {
      for (let i = 0; i < db._ingredients.length; i++) {
        if (db._ingredients[i].name === item) {
          return resolve(db._ingredients[i]);
        }
      }
    });
  }

  add(accumulator, a) {
    return accumulator + a;
  }
}

export default new RestaurantPrices();
