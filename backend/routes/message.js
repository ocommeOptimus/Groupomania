const express = require('express')
const router = express.Router()
const messageCtrl = require('../controllers/message')
const auth = require('../middleware/auth')



router.get('/', auth, messageCtrl.listMessages)

router.post('/:id/messages', auth, messageCtrl.createMessage)


module.exports = router