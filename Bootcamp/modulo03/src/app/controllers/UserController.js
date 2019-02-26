const User = require('../models/User')

class UserController {
  async store (req, res) {
    // buscando email que temos na requisição
    const { email } = req.body

    // verificar se já não há um user com este mesmo email que foi passado na requisição
    if (await User.findOne({ email })) {
      // sempre que passarmos um res, passamos ele em formato de json
      return res.status(400).json({ error: 'User already exists' })
    }

    // se não encontrou um usuário com aquele email, criaremos um novo
    // req.body == email
    const user = await User.create(req.body)

    // passaremos esse usuario que foi acabado de ser criado em formato de json
    // lá para o frontend também
    return res.json(user)
  }
}

module.exports = new UserController()
