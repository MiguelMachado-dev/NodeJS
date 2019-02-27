const express = require('express')
const validate = require('express-validation')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

// Chamando todos os Controllers sem precisar chamar um a um
const controllers = require('./app/controllers')
const validators = require('./app/validators')

routes.post(
  '/users',
  validate(validators.User),
  controllers.UserController.store
)
routes.post(
  '/sessions',
  validate(validators.Session),
  controllers.SessionController.store
)

// Todas as rotas daqui para baixo esteja configurada para não aceitar se o user
// não estiver autenticado
routes.use(authMiddleware)

/**
 * ADS
 */
routes.get('/ads', controllers.AdController.index)
routes.get('/ads/:id', controllers.AdController.show)
routes.post('/ads', validate(validators.Ad), controllers.AdController.store)
// .put utiliza quando queremos atualizar alguma coisa
routes.put('/ads/:id', validate(validators.Ad), controllers.AdController.update)
// .delete para quando queremos deletar alguma coisa ¯\_(ツ)_/¯
routes.delete('/ads/:id', controllers.AdController.destroy)

/**
 * PURCHASES
 */
routes.post(
  '/purchases',
  validate(validators.Purchase),
  controllers.PurchaseController.store
)
module.exports = routes
