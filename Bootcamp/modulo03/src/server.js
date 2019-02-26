class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.routes()
    // sem a views() por que não utilizaremos o nunjucks
  }

  middlewares () {
    // invés de usarmos express.urlEncoded
    this.express.use(express.json())
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
