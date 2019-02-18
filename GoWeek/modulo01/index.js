//const varName = require('nome-da-biblioteca')
const express = require("express");

const app = express();

app.get("/", (req, res) => {
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
