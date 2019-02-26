const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  // mongoDB utiliza tipos de dados do proprio JavaScript
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Hook seja disparado antes de qualquer save no usuario
// save é utilizado tanto para criação quanto para update
UserSchema.pre('save', async function (next) {
  // se a senha não foi modificada nessa alteração
  // não faremos nada
  if (!this.isModified('password')) {
    return next()
  }
  // caso a senha seja modificada, faremos uma criptografia nela
  this.password = await bcrypt.hash(this.password, 8)
})

module.exports = mongoose.model('User', UserSchema)
