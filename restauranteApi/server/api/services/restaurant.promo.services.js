/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import prices from './restaurant.price.service';

class RestaurantOffers {

  // Calculo do desconto das promoçoes
  calulateDiscounts(recipe, totalPrice) {
    const activeOffers = [];

    return new Promise(resolve => {
      const isLightOffer = new Promise(resolve => {
        this.isLight(recipe).then(resp => {
          if (resp) {
            activeOffers.push('isLight');
            resolve(totalPrice * 0.1);
          } else { resolve(0); }
        });
      });

      const isALotOfMeatOffer = new Promise(resolve => {
        this.isALotOfMeat(recipe).then(resp => {
          if (resp.state) {
            activeOffers.push('isALotOfMeat');
            prices.getItem('Hambúrguer de carne')
              .then(item => {
                resolve(Math.floor(resp.count / 3) * item.value);
              });
          } else { resolve(0); }
        });
      });

      const isALotOfCheeseOffer = new Promise(resolve => {
        this.isALotOfCheese(recipe).then(resp => {
          if (resp.state) {
            activeOffers.push('isALotOfCheese');
            prices.getItem('Queijo')
              .then(item => {
                resolve(Math.floor(resp.count / 3) * item.value);
              });
          } else { resolve(0); }
        });
      });


      Promise.all([isLightOffer, isALotOfMeatOffer, isALotOfCheeseOffer]).then(discounts => {
        const promos = { ativas: activeOffers, desconto: discounts.reduce(prices.add) };
        return resolve(promos);
      });
    });
  }

  // Validações de Promoções
  isLight(recipe) {
    return new Promise(resolve => {
      let ligth = false;
      if (this.hasAlface(recipe) && !this.hasBacon(recipe)) {
        ligth = true;
        return resolve(ligth);
      }
      return resolve(ligth);
    });
  }

  hasAlface(recipe) {
    let alface = false;
    for (let i = 0; i < recipe.length; i++) {
      if (recipe[i].name === 'Alface' && recipe[i].count > 0) {
        alface = true;
        return alface;
      }
    }
    return alface;
  }

  hasBacon(recipe) {
    let bacon = false;
    for (let f = 0; f < recipe.length; f++) {
      if (recipe[f].name === 'Bacon' && recipe[f].count > 0) {
        bacon = true;
        return bacon;
      }
    }
    return bacon;
  }

  isALotOfMeat(recipe) {
    return new Promise(resolve => {
      let carne = { state: false, count: 0 };
      for (let i = 0; i < recipe.length; i++) {
        if (recipe[i].name === 'Hambúrguer de carne' && recipe[i].count > 2) {
          carne = { state: true, count: recipe[i].count };
          return resolve(carne);
        }
      }
      return resolve(carne);
    });
  }

  isALotOfCheese(recipe) {
    return new Promise(resolve => {
      let cheesee = { state: false, count: 0 };
      for (let i = 0; i < recipe.length; i++) {
        if (recipe[i].name === 'Queijo' && recipe[i].count > 2) {
          cheesee = { state: true, count: recipe[i].count };
          return resolve(cheesee);
        }
      }
      return resolve(cheesee);
    });
  }


  /*
    let recipe = [
        { name: 'Alface', count: 1 },
        { name: 'Bacon', count: 1 },
        { name: 'Hambúrguer de carne', count: 5 },
        { name: 'Ovo', count: 5 },
        { name: 'Queijo', count: 5 }
    ];
    */
}

export default new RestaurantOffers();
