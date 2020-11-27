const models = require('../models')

module.exports = (req, res, next) => {
    let message = "";
    models.Message.findOne({ 
        where: { id: userId }
     })
    .then((messageFound) => {
        if (req.body.like==1 && messageFound.usersLiked.indexOf(req.body.userId)<0) {
            messageFound.usersLiked.push(req.body.userId);
            messageFound.likes+=1;
            message = "You've liked " + messageFound.title;
        } else if (req.body.like==-1 && messageFound.usersDisliked.indexOf(req.body.userId)<0) {
            messageFound.usersDisliked.push(req.body.userId);
            messageFound.dislikes+=1;
            message = "You've disliked " + messageFound.title;
        } else {
            messageFound.usersLiked.forEach(element => {
                if(element==req.body.userId) {
                    messageFound.likes-=1;
                    messageFound.usersLiked.splice(messageFound.usersLiked.indexOf(req.body.userId),1);
                }
            });
            messageFound.usersDisliked.forEach(element => {
                if(element==req.body.userId) {
                    messageFound.dislikes-=1;
                    messageFound.usersDisliked.splice(messageFound.usersDisliked.indexOf(req.body.userId),1);
                }
            });
            message = "Do you like or dislike " + messageFound.title + " ?";
        }
        req.body.messageFound = messageFound;
        req.body.message = message
        next();
    })
    .catch(error => res.status(400).json({ error }));
}