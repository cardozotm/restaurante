# restauranteApi

Restaurante: Api e aplicativo para venda de lanches. 


#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
./deploy
```

and add mock data

```shell
./mock-data
```

## RestauranteApi
### Test It

Run the Mocha unit tests

```shell
cd restaurantApi
npm run test
```

or debug them

```shell
cd restaurantApi
npm run test:debug
```

## Try It on Swagger
* Open you're browser to [http://localhost:3000](http://localhost:3000)
* Invoke the `/restaurants` endpoint 
  ```shell
  curl http://localhost:3000/api/v1/restaurant/menu
  ```

## Web App
* Beautiful Ionic/Angular Web App for Restaurant API
* Open you're browser to [http://localhost:8100](http://localhost:8100)


## Debug It

#### Debug the server:

```
cd restaurantApi
npm run dev:debug
```

#### Debug Tests

```
cd restaurantApi
npm run test:debug
```
   