const {Router} = require('express')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', async (req, res) => {
  const courses = await Course.find()
  .populate('userId', 'email name')
  .select('title price img')

  res.render('courses', {
    title: 'Курсы',
    isCourses: true,
    courses
  })
})

router.get('/:id/edit', auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }

  const course = await Course.findById(req.params.id)

  res.render('course-edit', {
    title: `Редактировать ${course.title}`,
    course
  })
})

router.post('/edit', auth, async (req, res) => {
  if(isNaN(req.body.price)) {
    return res.end('sam idi nahui')
  }

  const {id} = req.body
  await Course.findByIdAndUpdate(id, req.body)
  res.redirect('/courses')
})

router.post('/remove', auth, (req, res) => {
  Course.deleteOne({_id: req.body.id})
    .then(() => res.redirect('/courses'))
})

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id)
  res.render('course', {
    layout: 'empty',
    title: `Курс ${course.title}`,
    course
  })
})

module.exports = router