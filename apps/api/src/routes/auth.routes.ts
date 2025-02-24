import express from "express";
import { register, login } from "../controllers/auth.controller";
import { authenticateUser, isSuperAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", authenticateUser, (req, res, next) => {
    const { role } = req.body;
    if (role === "ADMIN") {
        return isSuperAdmin(req, res, next);
    }
    next();
}, register);

router.post("/login", login);

export default router;