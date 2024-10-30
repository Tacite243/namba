

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validationRegistration } = require("../middlewares/validationMiddleware");
const { verifyToken } = require("../utils/jwt");

router.post("/register", authController.register);
router.get("/login", authController.login);

module.exports = router;