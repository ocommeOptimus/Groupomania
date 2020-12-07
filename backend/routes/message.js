const express = require('express')
const router = express.Router()
const messageCtrlTest = require('../controllers/message')
const auth = require('../middleware/auth')



router.get('/', auth, messageCtrlTest.listMessages)
router.post('/:id/messages', auth, messageCtrlTest.createMessage)


module.exports = router