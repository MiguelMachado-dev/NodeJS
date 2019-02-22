module.exports = (req, res, next) => {
  // verifica se há uma sessão e se dentro dessa sessão
  // há uma informação de usuario, assim sabemos se ele está logado
  if (req.session && req.session.user) {
    // res.locals é um objeto de informações que ficam disponiveis para todas as
    // views do nunjucks
    res.locals.user = req.session.user

    // se possuir, ele prossegue
    return next()
  }

  // senão, levamos ele para login
  return res.redirect('/')
}
