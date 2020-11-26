const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.post('/api/comments', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Commentaire créé !'
    })
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use((req, res) => {
    res.json({ message: 'Hello World !'})
})

app.use(bodyParser.json())

module.exports = app