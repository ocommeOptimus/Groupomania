const jwt = require('jsonwebtoken')

const JWT_SIGN_SECRET = 'qvqvguaa8uawg3qugk6zhe89ob874bh3iq355sl8mnvz2og7e0yfsmqfic2cosdgr92o3'

module.exports = {
    generateTokenForUser: (userData) => {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
    }
}