/* eslint-disable no-plusplus */
class RestauranteDatabase {

  constructor() {

    this._lanches = [
      { name: 'X-Bacon', ingredients: ['Bacon', 'Hambúrguer de carne', 'Queijo'] },
      { name: 'X-Burger', ingredients: ['Hambúrguer de carne', 'Queijo'] },
      { name: 'X-Egg', ingredients: ['Ovo', 'Hambúrguer de carne', 'Queijo'] },
      { name: 'X-Egg', ingredients: ['Ovo', 'Bacon', 'Hambúrguer de carne', 'Queijo'] }];

    this._ingredientes = [];

    this.insert({ name: 'Alface', value: 0.4 });
    this.insert({ name: 'Bacon', value: 2 });
    this.insert({ name: 'Hambúrguer de carne', value: 3 });
    this.insert({ name: 'Ovo', value: 0.8 });
    this.insert({ name: 'Queijo', value: 1.5 });
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

}

export default new RestauranteDatabase();
