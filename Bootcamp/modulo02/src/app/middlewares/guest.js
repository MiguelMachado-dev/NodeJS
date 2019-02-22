module.exports = (req, res, next) => {
  // se existir uma sessão (o que sempre acontece por causa do saveUninitialized: true do servidor)
  // e não possuir um usuário, ele prossegue
  if (req.session && !req.session.user) {
    return next()
  }

  // porém, se existir um usuario na sessao, ele será redirecionado
  // para a dashboard
  return res.redirect('/app/dashboard')
}
