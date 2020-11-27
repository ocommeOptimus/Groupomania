const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'qvqvguaa8uawg3qugk6zhe89ob874bh3iq355sl8mnvz2og7e0yfsmqfic2cosdgr92o3');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: "new Error('Invalid request!')"
    });
  }
};