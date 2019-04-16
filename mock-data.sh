# !/bin/bash

echo "=== mocking data ==="

curl -X POST \
  http://localhost:3000/api/v1/restaurant/create \
  -H 'Content-Type: application/json' \
  -d '    {
        "name": "Alface",
        "value": 0.4
    }'

curl -X POST \
  http://localhost:3000/api/v1/restaurant/create \
  -H 'Content-Type: application/json' \
  -d '    {
        "name": "Bacon",
        "value": 2
    }'

curl -X POST \
  http://localhost:3000/api/v1/restaurant/create \
  -H 'Content-Type: application/json' \
  -d '    {
        "name": "Hambúrguer de carne",
        "value": 3
    }'

curl -X POST \
  http://localhost:3000/api/v1/restaurant/create \
  -H 'Content-Type: application/json' \
  -d '    {
        "name": "Ovo",
        "value": 0.8
    }'

curl -X POST \
  http://localhost:3000/api/v1/restaurant/create \
  -H 'Content-Type: application/json' \
  -d '     {
        "name": "Queijo",
        "value": 1.5
    }'

