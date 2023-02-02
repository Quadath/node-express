const express = require('express')
const path = require('path')
const csrf = require('csurf')

const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const userMiddleware = require('./middleware/user')


const varMiddleware = require('./middleware/variables')

const authRoutes = require('./routes/auth')
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const ordersRoutes = require('./routes/orders')
const coursesRoutes = require('./routes/courses')

const User = require('./models/user')

const app = express()

const URL = "mongodb://127.0.0.1:27017/insults"

mongoose.set('strictQuery', false)

mongoose.connect(URL)
  .then(() => console.log('Connected to MongoDB'))
  .then(async () => {
    // const candidate = await User.findOne()
    // if (!candidate) {
    //   const user = new User({
    //     email: 'example@email.ua',
    //     name: 'Roman',
    //     cart: {
    //       items: []
    //     }
    //   })
    //   await user.save()
    // }
  })
  .catch((err) => console.log(`DB connection error: ${err}`))


const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

const store = new MongoStore({
  collection: 'sessions',
  uri: "mongodb://127.0.0.1:27017/insults"
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
  extended: true
}))
app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false,
  store
}))
app.use(csrf())
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/add', addRoutes)
app.use('/orders', ordersRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
