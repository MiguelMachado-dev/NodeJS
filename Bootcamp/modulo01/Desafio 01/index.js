const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const checkAge = (req, res, next) => {
  // console.log(req) exibe tudo o que se pode obter numa requisição
  // usamos o req.query para obter a informação passada na query, que é AGE
  // Ou seja, mesmo nome utilizado passado na query no app.post
  const { age } = req.query
  // foi quebrado o req.query.age pois o campo retorna um "objeto", então
  // sendo passado {age} é pego mais fácil o conteúdo
  // Foi usado desestruturação, assim, conseguimos passar o age por var no POST

  // Checa se o campo está preenchido, senão redireciona para pagina inicial
  if (!age) {
    return res.redirect('/')
  }

  return next()
}

app.get('/', (req, res) => {
  return res.render('home')
})

app.post('/check', (req, res) => {
  // Salva a informação enviada por POST dentro da requisição do body na variavel
  // age
  const { age } = req.body

  if (age >= 18) {
    // Utiliza a variavel age onde está armazenado a informação de idade
    // E passa ela por Query.  QUERY = ?NAMEinput=RESPOSTA
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

app.get('/major', checkAge, (req, res) => {
  const { age } = req.query

  return res.render('major', { age })
})

app.get('/minor', checkAge, (req, res) => {
  const { age } = req.query

  return res.render('minor', { age })
})

app.listen(3000)
