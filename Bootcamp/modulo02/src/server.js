const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')

class App {
  // Constructor executa automaticamente na nova instancia da classe
  constructor () {
    // this.express é igual ao app que tínhamos
    this.express = express()
    // Verifica se a aplicação está em ambiente de produção
    // utilizando variável de ambiente
    this.isDev = process.env.NODE_ENV !== 'production'

    // Essa ordem de chamada é importante
    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    // Utilizando middleware para utilizar o POST, lidar com formulários
    this.express.use(express.urlencoded({ extended: false }))
  }

  views () {
    // path.resolve determina se será usado / ou \
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      // Só iremos assistir as alterações dos arquivos de views para recompilar
      // essas views se estivermos em ambiente de desenvolvimento. Em ambiente de
      // produção isso pode causar perda de performance
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })

    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
