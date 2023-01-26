const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
  console.log(req)
  res.render('index', {
    title: 'Главная страница',
    isHome: true
  })
})


module.exports = router