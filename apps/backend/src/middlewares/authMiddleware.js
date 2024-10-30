

const { verifyToken } = require("../utils/jwt");

exports.auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        verifyToken(req, res, next);
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};