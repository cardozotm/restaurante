import restauranteRouter from './api/controllers/restaurante/router';

export default function routes(app) {
  app.use('/api/v1/restaurante', restauranteRouter);
}
