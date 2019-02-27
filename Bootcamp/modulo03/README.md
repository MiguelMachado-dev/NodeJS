# Create docker database

`docker run --name mongonode -p 27017:27017 -d -t mongo`

`docker run --name noderedis -p 6379:6379 -d -t redis:alpine`

## Configurando fila

Utilizamos o Redis para executar alguns jobs em background em fila, assim, o user
não precisa "esperar" a requisição ser feita.
