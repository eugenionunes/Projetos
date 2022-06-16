const express = require('express')
const hbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

// MODELS
const Tought = require('./models/Tought')
const User = require('./models/User')

// ROUTES
const toughtRoutes = require('./routes/toughtRoutes')

// CONTROLLERS
const ToughtController = require('./controllers/ToughtController')

// TEMPLATE ENGINE
app.engine('handlebars', hbs.engine())
app.set('view engine', 'handlebars')

// RECEBER RESPOSTAS DO BODY
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

// SESSION MIDDLEWARE - INFORMANDO ONDE AS SESSIONS VÃO SER SALVAS
app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function() {},
      path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true
    }
  })
)

// CONFIGURAR AS FLASH MESSAGES
app.use(flash())

// INFORMANDO OS ESTÃO OS ARQUIVOS DE ESTILOS
app.use(express.static('public'))

// SET SESSION TO RES
app.use((req, res, next) => {
  if(req.session.userid) {
    res.locals.session = req.session
  }

  next()
})

// Routes
app.use('/toughts', toughtRoutes)

app.get('/', ToughtController.showTought)

conn.sync()
    //sync({ force: true })
    .then(() => {
      app.listen(3000)
    })