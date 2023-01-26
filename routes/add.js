const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Добавить курс',
    isAdd: true
  })
})

router.post('/', async (req, res) => {
  const course = new Course({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    userId: req.user
  })

  course.save()
  .then((result) => {
    res.status(201)
    .json(result)    
  })
  .catch((err) => console.log(`COURSE SAVE ERROR ${err}`))

  // res.redirect('/courses')

  console.log(null == undefined)
})

module.exports = router

console.log(![]===[])