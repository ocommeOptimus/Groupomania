const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const usersCtrlTest = require('../controllers/user')
const auth = require('../middleware/auth')


router.post('/register', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
  ], usersCtrlTest.register)

router.post('/login', usersCtrlTest.login)

router.get('/myaccount/:id', auth, usersCtrlTest.getUserProfile)

router.put('/myaccount/:id', auth, usersCtrlTest.updateUserProfile)


module.exports = router