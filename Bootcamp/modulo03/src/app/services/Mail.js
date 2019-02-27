const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const exphbs = require('express-handlebars')
const mailConfig = require('../../config/mail')
const viewPath = path.resolve(__dirname, '..', 'views', 'emails')

const transport = nodemailer.createTransport(mailConfig)

// check https://station.rocketseat.com.br/forum/question/7e8ee617-9898-4b04-9d46-0026c509f24d
transport.use(
  'compile',
  hbs({
    viewEngine: exphbs.create({
      partialsDir: path.resolve(viewPath, 'partials')
    }),
    viewPath,
    extName: '.hbs'
  })
)

module.exports = transport
