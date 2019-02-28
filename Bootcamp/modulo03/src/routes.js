const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

// Chamando todos os handle(Controllers sem precisar chamar um a um)
const controllers = require('./app/controllers')
const validators = require('./app/validators')

routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)
routes.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)

// Todas as rotas daqui para baixo esteja configurada para não aceitar se o user
// não estiver autenticado
routes.use(authMiddleware)

/**
 * ADS
 */
routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post(
  '/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store)
)
// .put utiliza quando queremos atualizar alguma coisa
routes.put(
  '/ads/:id',
  validate(validators.Ad),
  handle(controllers.AdController.update)
)
// .delete para quando queremos deletar alguma coisa ¯\_(ツ)_/¯
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

/**
 * PURCHASES
 */
routes.post(
  '/purchases',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store)
)
module.exports = routes
