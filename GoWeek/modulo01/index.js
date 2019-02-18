//const varName = require('nome-da-biblioteca')
const http = require("http");

http
  .createServer((req, res) => {
    console.log(req);
    return res.end("Hello World");
  })
  .listen(3000);
// listen = porta do sistema que ira executar
