import RestauranteService from '../../services/restaurante.service';

export class Controller {
  // Ingredientes
  all(req, res) {
    RestauranteService.all()
      .then(r => res.json(r));
  }

  // Cardapio
  cardapio(req, res) {
    RestauranteService.cardapio()
      .then(r => res.json(r));
  }

  // Calcula Preco
  montar(req, res) {
    RestauranteService
      .montarLanche(req.body)
      .then(r => res
        .status(201)
        .json(r));
  }


}
export default new Controller();
