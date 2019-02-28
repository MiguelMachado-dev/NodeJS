const express = require('express')
const mongoose = require('mongoose')
const Youch = require('youch')
const validate = require('express-validation')
const databaseConfig = require('./config/database')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.database()
    this.middlewares()
    this.routes()
    // sem a views() por que não utilizaremos o nunjucks
    this.exception()
  }

  database () {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
  }

  middlewares () {
    // invés de usarmos express.urlEncoded
    this.express.use(express.json())
  }

  routes () {
    this.express.use(require('./routes'))
  }

  exception () {
    // Quando um middleware recebe 4 parametros, o 1 passa a ser error
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV !== 'production') {
        // Se estivermos em ambiente de dev
        const youch = new Youch(err)

        return res.json(await youch.toJSON())
      }

      return (
        res
          // Se tiver um status de erro dentro, passamos ele, senão, enviamos erro 500
          .status(err.status || 500)
          .json({ error: 'Internal Server Error' })
      )
    })
  }
}

module.exports = new App().express
