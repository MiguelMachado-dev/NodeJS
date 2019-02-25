const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const nunjucks = require('nunjucks')
const path = require('path')
const flash = require('connect-flash')

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
    this.express.use(flash())
    this.express.use(
      session({
        // criptografa a sessao
        name: 'root',
        secret: 'MyAppSecret',
        resave: true,
        store: new FileStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions')
        }),
        saveUninitialized: true // Serve para já criar uma sessão, porém sem os dados de user, obvio xD
      })
    )
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
    // Arquivos da pasta 'public' podem ser acessadas com o /
    // pois não foi passado como primeiro argumento um outro nome para a pasta
    // this.express.use('arquivos', express.static( path.resolve(__dirname, 'public') ))
    // neste caso o css estaria em localhost:3000/arquivos/styles.css
    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
