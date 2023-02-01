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
  console.log(null == undefined)
})

module.exports = router

console.log(![]===[])