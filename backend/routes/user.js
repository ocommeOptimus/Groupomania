const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const usersCtrlTest = require('../controllers/user')
const auth = require('../middleware/auth')


router.post('/register', [
    body('email').isEmail(),
    body('username').isLength({min: 5, max: 12}),
    body('password').isLength({ min: 5 })
  ], usersCtrlTest.register)

router.post('/login', usersCtrlTest.login)

router.get('/account/:id', auth, usersCtrlTest.getUserProfile)

router.put('/account/:id', auth, usersCtrlTest.updateUserProfile)

router.delete('/account/:id', auth, usersCtrlTest.deleteUser)

router.get('/', auth, usersCtrlTest.getAllUsers)


module.exports = router