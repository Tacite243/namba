const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


exports.generateToken = (user) => jwt.sign({id : user.id}, secret, {expiresIn: "7d"});

exports.verifyToken = (token) => jwt.verify(token, secret);
