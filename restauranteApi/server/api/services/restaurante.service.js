import l from '../../common/logger';
import db from './restaurante.db.service';
import preco from './restaurante.precos.service';

class RestauranteService {
  all() {
    l.info(`${this.constructor.name}.all()`);
    return db.all();
  }

  cardapio() {
    return preco.cardapio();
  }

  montarLanche(receita) {
    return preco.montarLanche(receita)
  }

}

export default new RestauranteService();
