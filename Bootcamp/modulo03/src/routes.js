const express = require('express')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

// Chamando todos os Controllers sem precisar chamar um a um
const controllers = require('./app/controllers')

routes.post('/users', controllers.UserController.store)
routes.post('/sessions', controllers.SessionController.store)

// Todas as rotas daqui para baixo esteja configurada para não aceitar se o user
// não estiver autenticado
routes.use(authMiddleware)

/**
 * ADS
 */
routes.get('/ads', controllers.AdController.index)
routes.get('/ads/:id', controllers.AdController.show)
routes.post('/ads', controllers.AdController.store)
// .put utiliza quando queremos atualizar alguma coisa
routes.put('/ads/:id', controllers.AdController.update)
// .delete para quando queremos deletar alguma coisa ¯\_(ツ)_/¯
routes.delete('/ads/:id', controllers.AdController.destroy)

module.exports = routes
