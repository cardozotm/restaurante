import RestaurantService from '../../services/restaurant.service';

export class Controller {

  all(req, res) {
    RestaurantService.all()
      .then(r => res.json(r));
  }

  create(req, res) {
    RestaurantService
      .create(req.body.name, req.body.value)
      .then(r => res
        .status(201)
        .location(`/api/v1/restaurant/${r.id}`)
        .json(r));
  }

  menu(req, res) {
    RestaurantService.menu()
      .then(r => res.json(r));
  }


  assemble(req, res) {
    RestaurantService
      .assembleSandwiches(req.body)
      .then(r => res
        .status(201)
        .json(r));
  }


}

export default new Controller();
