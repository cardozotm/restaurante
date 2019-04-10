import RestauranteService from '../../services/restaurante.service';

export class Controller {
  // Ingredientes
  all(req, res) {
    RestauranteService.all()
      .then(r => res.json(r));
  }

  create(req, res) {
    RestauranteService
      .create(req.body.name, req.body.value)
      .then(r => res
        .status(201)
        .location(`/api/v1/examples/${r.id}`)
        .json(r));
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
