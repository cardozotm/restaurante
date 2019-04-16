import * as express from 'express';
import controller from './controller';

export default express
  .Router()

  .get('/items', controller.all)
  .get('/menu', controller.menu)
  .post('/create', controller.create)
  .post('/assemble', controller.assemble);
