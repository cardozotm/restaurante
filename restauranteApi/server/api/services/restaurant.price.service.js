import promo from './restaurant.promo.services';
import db from './restaurant.db.service';

class RestaurantPrices {
  // Assembly of menu and calculation of prices
  menu() {
    return db.menu();
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
