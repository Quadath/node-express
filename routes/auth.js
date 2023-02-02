const {Router} = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const router = Router()

router.get('/login', async(req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true
    })
})

router.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body

        const candidate = await User.findOne({email}) 
        if(candidate) {
            const areSame = await bcrypt.compare(password, candidate.password)
            if(areSame) {
                req.session.user = candidate
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if(err) {
                        throw err
                    }
                    res.redirect('/')
                })
            } else {
                res.redirect('/auth/login#login')
            }
        } else {
            res.redirect('/auth/login#login')
        }
    } catch(err) {
        console.log(e)
    }
  
})

router.post('/register', async (req, res) => {
    try {
        const {email, password, repeat, name} = req.body
        const candidate = await User.findOne({ email })

        if(candidate) {
            res.redirect('/auth/login#login')
        } else {
            const hashPassword = await bcrypt.hash(password, 12)
            const user = new User({
                email, password: hashPassword, name, cart: {items: []}
            })
            await user.save()
            res.redirect('/auth/login#login')
        }
    } catch (e) {
        console.log(e)
    }
})

router.get('/logout', async(req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login')
    })
})

module.exports = router