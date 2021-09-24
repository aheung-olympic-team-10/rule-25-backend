const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        res.status(403).send('invalid token');
      } else {
        next();
      }
    });
  } else {
    res.status(403).send('invalid token');
  }
};
