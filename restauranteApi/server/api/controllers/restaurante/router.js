import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  // Ingredientes
  .get('/items', controller.all)
  .get('/cardapio', controller.cardapio)
  .post('/montar', controller.montar)






