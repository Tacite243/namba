

const { body, validationResult } = require("express-validator");

exports.validateRegistration = (req, res, next) => {
    body("username").notEmpty().withMessage("Username is required");
    body("phoneNumber").isMobilePhone().withMessage("Invalide phone number");
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters");

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};