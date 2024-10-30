const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


exports.generateToken = (user) => {
    jwt.sign({id : user.id}, secret, {expiresIn: "100d"});
}

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token);
    if (!token) return res.status(403).json({message: 'No token provided'});

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).json({message:  'Unauthorized' });
        req.userId = decoded.id;
        next();
    })
};