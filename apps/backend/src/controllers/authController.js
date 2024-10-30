const authService = require("../services/authService");

exports.register = async (req, res, next) => {
    try {
        const {username, phoneNumber, password} = req.body;
        const newUser = await authService.registerUser(username, phoneNumber, password);
        const token = authService.generateToken(newUser);
        
        res.status(201).json({user: newUser});
    } catch (error) {
        next(error);
        console.error(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const {phoneNumber, password} = req.body;
        const result = await authService.loginUser(phoneNumber, password);
        if (!result) return res.status(401).json({message: "Invalid credentials"});

        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
}