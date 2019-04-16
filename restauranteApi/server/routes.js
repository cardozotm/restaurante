import restaurantRouter from './api/controllers/restaurant/router';

export default function routes(app) {
  app.use('/api/v1/restaurant', restaurantRouter);
}
