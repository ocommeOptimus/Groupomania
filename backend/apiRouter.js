const express = require('express')
const usersCtrl = require('./routes/usersCtrl')
const messagesCtrl = require('./routes/messagesCtrl')

//FIRST WAY
exports.router = (function() {
    const apiRouter = express.Router()

    apiRouter.route('/users/register/').post(usersCtrl.register)
    apiRouter.route('/users/login/').post(usersCtrl.login)
    apiRouter.route('/users/myaccount/').get(usersCtrl.getUserProfile)
    apiRouter.route('/users/myaccount/').put(usersCtrl.updateUserProfile)

    apiRouter.route('/messages/new/').post(messagesCtrl.createMessage)
    apiRouter.route('/messages/').get(messagesCtrl.listMessages)

    return apiRouter
})()

//SECOND WAY
/* exports.router = (() => {
    const apiRouter = express.Router()

    apiRouter.route('/users/register/').post(usersCtrl.register)
    apiRouter.route('/users/login/').post(usersCtrl.login)

    return apiRouter
})() */