const models = require('../models')

const TITLE_LIMIT = 2
const CONTENT_LIMIT = 4
const ITEMS_LIMIT = 50

exports.createMessage = (req, res) => {

    var title = req.body.title
    var content = req.body.content
    var userId = req.params.id

    if (title == null || content == null) {
        return res.status(400).json({ 'error': 'missing parameters' })
    }

    if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
        return res.status(400).json({ 'error': 'invalid parameters' })
    }

    models.User.findOne({
        where: { id: userId }
    })
    .then((userFound) => {
        if (userFound) {
            models.Message.create({
                title: title,
                content: content,
                likes: 0,
                dislikes: 0,
                usersLiked: [],
                usersDisliked: [],
                UserId: userFound.id
            })
            .then((newMessage) => {
                if (newMessage) {
                    return res.status(201).json(newMessage)
                } else {
                    return res.status(500).json({ 'error': 'cannot post message' })
                }
            })

        } else {
            res.status(404).json({ 'error': 'user not found' })
        }
    })
    .catch((err) => {
        return res.status(500).json({ 'error': 'unable to verify user' })
    })

}

exports.listMessages = (req, res) => {
    var fields = req.body.fields
    var limit = parseInt(req.query.limit)
    var offset = parseInt(req.query.offset)
    var order = req.query.order

    if (limit > ITEMS_LIMIT) {
        limit = ITEMS_LIMIT
    }

    models.Message.findAll({
        order: [(order != null) ? order.split(':') : ['title', 'ASC']],
        attributes: (fields != '*' && fields != null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit : null,
        offset: (!isNaN(offset)) ? offset : null,
        include: [{
            model: models.User,
            attributes: ['username']
        }]
    })
    .then((messages) => {
        if (messages) {
            res.status(200).json(messages)
        } else {
            res.status(404).json({ 'error': 'no messages found' })
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({ 'error': 'invalid fields' })
    })
}