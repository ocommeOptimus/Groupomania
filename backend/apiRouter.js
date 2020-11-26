const express = require('express')
const usersCtrl = require('./routes/usersCtrl')

//FIRST WAY
exports.router = (function() {
    const apiRouter = express.Router()

    apiRouter.route('/users/register/').post(usersCtrl.register)
    apiRouter.route('/users/login/').post(usersCtrl.login)

    return apiRouter
})()

//SECOND WAY
/* exports.router = (() => {
    const apiRouter = express.Router()

    apiRouter.route('/users/register/').post(usersCtrl.register)
    apiRouter.route('/users/login/').post(usersCtrl.login)

    return apiRouter
})() */