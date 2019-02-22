const { User } = require('../models')
class SessionController {
  // criar uma sessão de usuario logado
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    // verificando o email e senha preenchidos na hora do login
    const { email, password } = req.body

    // encontrar um usuario no banco de dados que contenha o mesmo
    // email que foi preenchido
    const user = await User.findOne({ where: { email } })

    // Se não encontrar um usuário
    if (!user) {
      console.log('Usuário não encontrado')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      console.log('Senha incorreta')
      return res.redirect('/')
    }

    // se ele logar, salvaremos uma nova informação na sessão
    // chamada de user com a informação do usuario
    // até aqui, console.log(req.session) não retornara objeto com nome de user
    // apos essa atribuição abaixo, criará um obj de nome user com as infos do user
    req.session.user = user
    // Após fazer todas as verificações de email e senha
    // e der tudo certo, redireciona o usuario para:
    return res.redirect('/app/dashboard')
  }
}
module.exports = new SessionController()
