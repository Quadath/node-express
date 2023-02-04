const {Router} = require('express')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', auth,(req, res) => {
  res.render('add', {
    title: 'Добавить курс',
    isAdd: true
  })
})

router.post('/', auth, async (req, res) => {
  if(isNaN(req.body.price)) {
    return res.end('sam idi nahui')
  }

  const course = new Course({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    userId: req.user
  })

  course.save()
  .then((result) => {
    res.status(201)
    res.redirect('/courses')
  })
  .catch((err) => console.log(`COURSE SAVE ERROR ${err}`))
})

module.exports = router

console.log(![]===[])