const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

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
    const candidate = await User.findOne()
    if (!candidate) {
      const user = new User({
        email: 'example@email.ua',
        name: 'Roman',
        cart: {
          items: []
        }
      })
      await user.save()
    }
  })
  .catch((err) => console.log(`DB connection error: ${err}`))


const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
  const user = await User.findById('63d273b806576e2f4377b87b')
  req.user = user;
  next()
})

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
  extended: true
}))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/orders', ordersRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})