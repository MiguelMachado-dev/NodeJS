//const varName = require('nome-da-biblioteca')
const express = require("express");

const app = express();

// Middleware é tudo o que utiliza req, res
const logMiddleware = (req, res, next) => {
  console.log(
    `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
  );
  // colocar o parametro next no final do middleware e chamar
  // ele no middleware em que não deve bloquear o fluxo do ExpressJS
  return next();
};

// Podemos usar o Middleware depois de cada rota
// Ou podemos colocar para toda nossa aplicação utilize o middleware
app.use(logMiddleware);

app.get("/", logMiddleware, (req, res) => {
  return res.send(`Bem-vindo, ${req.query.name}`);
});

app.get("/login", (req, res) => {
  return res.send("Login");
});

// :name = tudo depois de dois pontos vira parametro
app.get("/nome/:name", (req, res) => {
  return res.send(`Bem-vindo, ${req.params.name}`);
});

app.listen(3000);
