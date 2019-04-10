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
npm run test
```

or debug them

```shell
npm run test:debug
```

## Try It on Swagger
* Open you're browser to [http://localhost:3000](http://localhost:3000)
* Invoke the `/restaurantes` endpoint 
  ```shell
  curl http://localhost:3000/api/v1/restaurante/cardapio
  ```


## Debug It

#### Debug the server:

```
npm run dev:debug
```

#### Debug Tests

```
npm run test:debug
```
   