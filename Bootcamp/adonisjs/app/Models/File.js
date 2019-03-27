'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class File extends Model {
  static get computed () {
    return ['url']
  }

  getUrl ({ id }) {
    // Retorna parametro url no envio do arquivo
    // entao é só passar esse parametro no img src no frontend
    return `${Env.get('APP_URL')}/files/${id}`
  }
}

module.exports = File
