const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  // Cria uma table no banco de dados com nome User
  const User = sequelize.define(
    'User',
    {
      // Propriedades que cada User terá de informação
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
      provider: DataTypes.BOOLEAN
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        }
      }
    }
  )

  User.prototype.checkPassword = function (password) {
    // compara a senha digitada no formulario de login
    // com a hash salva no banco de dados
    return bcrypt.compare(password, this.password_hash)
  }

  return User
}
