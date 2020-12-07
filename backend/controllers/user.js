const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { Op } = require("sequelize")

const models = require('../models')


exports.register = (req, res) => {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const bio = req.body.bio
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    models.User.findOne({
        attributes: ['email', 'username'],
        where: {
            [Op.or]: [{email: email},
        {username: username}] }
    })
    .then((userFound) => {
        if (!userFound) {
            bcrypt.hash(password, 5, (err, bcryptedPassword) => {
                const newUser = models.User.create({
                    email: email,
                    username: username,
                    password: bcryptedPassword,
                    bio: bio,
                    isAdmin: 0
                })
                .then((newUser) => {
                    return res.status(201).json({
                        'userId': newUser.id,
                        'username': newUser.username
                    })
                })
                .catch((err) => {
                    return res.status(500).json({ 'error': 'cannot add user' })
                })
            })
        } else {
            return res.status(409).json({ 'error': 'user already exist' })
        }
    })
    .catch((err) => {
        return res.status(500).json({ 'error': 'unable to verify user' })
    })
}

exports.login = (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    var where = {}

    if (username == null && email != null) {
        where = { email: email}
    }
    if (username != null && email == null) {
        where = { username: username }
    }

    if ((username == null && email == null) || password == "") {
        return res.status(400).json({ 'error': 'missing parameters' })
    }
    models.User.findOne({
        where: where
    })
    .then(userFound => {
        if (userFound) {
        bcrypt.compare(req.body.password, userFound.password)
        .then(valid => {
        if (!valid) {
            return res.status(401).json({ error: 'wrong password' });
        }
        res.status(200).json({
            userId: userFound.id,
            username: userFound.username,
            email: userFound.email,
            isAdmin: userFound.isAdmin,
            token: jwt.sign(
            { userId: userFound.id,
                isAdmin: userFound.isAdmin },
            'qvqvguaa8uawg3qugk6zhe89ob874bh3iq355sl8mnvz2og7e0yfsmqfic2cosdgr92o3',
            { expiresIn: '1d' }
            )
        });
        })
        .catch(error => res.status(500).json({ error }))
            
        } else {
            return res.status(404).json({ 'error': 'user not exist in database' })
        }
    })
    .catch((err) => {
        return res.status(500).json({ 'error': 'unable to verify user' })
    })
}

exports.getUserProfile = (req, res) => {
    
    var userId = req.params.id

    models.User.findOne({
        attributes: ['id', 'email', 'username', 'bio', 'isAdmin'],
        where: { id: userId }
    })
    .then((user) => {
        if (user) {
            res.status(201).json(user)
        } else {
            res.status(404).json({ 'error': 'user not found' })
        }
    })
    .catch((err) => {
        res.status(500).json({ 'error': 'cannot fetch user' })
    })
}

exports.updateUserProfile = (req, res) => {
    
    var bio = req.body.bio
    var username = req.body.username
    var email = req.body.email
    var isAdmin = req.body.isAdmin
    var password = req.body.password
    var userId = req.params.id
    //const salt = bcrypt.genSaltSync(5)
    //const hash = bcrypt.hashSync(req.body.password, (bcrypt.genSaltSync(5)))

    models.User.findOne({
        attributes: ['id', 'email', 'username', 'bio', 'isAdmin', 'password'],
        where: { id: userId }
    })
    .then((userFound) => {
        if (userFound) {
            userFound.update({
                bio: (bio ? bio : userFound.bio),
                username: (username ? username : userFound.username),
                email: (email ? email : userFound.email),
                password: (password ? bcrypt.hashSync(req.body.password, (bcrypt.genSaltSync(5))) : userFound.password),
                isAdmin: (isAdmin ? isAdmin : userFound.isAdmin)
            })
            .then((userFound) => {
                return res.status(201).json(userFound)
            })
            .catch((err) => {
                res.status(500).json({ 'error': 'cannot update user' })
            })
        } else {
            res.status(404).json({ 'error': 'user not found' })
        }
    })
    .catch((err) => {
        res.status(500).json({ 'error': 'unable to verify user' })
    })
}

exports.deleteUser = (req, res) => {
    var userId = req.params.id

    models.User.findOne({
        attributes: ['id'],
        where: { id: userId }
    })
    .then((user) => {
        if (user) {
            models.User.destroy({
                where: { id: userId }
            })
            .then(() => {
                res.status(200).json({message: `User ${userId} deleted !`})
            })
            .catch(err => {
                res.status(500).json(err)
            })
        } else {
            res.status(404).json({ 'error' : 'user not found' })
        }
    })
    .catch((err) => {res.status(500).json({ 'error':'cannot fetch user'})})
}

exports.getAllUsers = (req, res, next) => {
    models.User.findAll({
        order: [
            ['username', 'ASC']
        ]
    })
        .then(allUsers => {
            res.status(201).json(allUsers)
        })
        .catch((err) => {
        res.status(500).json(err)
    })
}