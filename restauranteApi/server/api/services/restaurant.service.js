import l from '../../common/logger';
import db from './restaurant.db.service';
import price from './restaurant.price.service';

class RestaurantService {
  all() {
    l.info(`${this.constructor.name}.all()`);
    return db.all();
  }

  create(n, v) {
    return db.insert({ name: n, value: v });
  }

  menu() {
    return price.menu();
  }

  assembleSandwiches(recipe) {
    return price.assembleSandwiches(recipe);
  }

}

export default new RestaurantService();
