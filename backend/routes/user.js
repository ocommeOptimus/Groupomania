const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const usersCtrl = require('../controllers/user')
const auth = require('../middleware/auth')


router.post('/register', [
    body('email').isEmail(),
    body('username').isLength({min: 5, max: 12}),
    body('password').isLength({ min: 5 })
  ], usersCtrl.register)

router.post('/login', usersCtrl.login)

router.get('/account/:id', auth, usersCtrl.getUserProfile)

router.put('/account/:id', auth, usersCtrl.updateUserProfile)

router.delete('/account/:id', auth, usersCtrl.deleteUser)

router.get('/', auth, usersCtrl.getAllUsers)


module.exports = router