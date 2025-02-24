import express from "express";
import { register, login } from "../controllers/auth.controller";
import { authenticateUser, verifyRole } from "../middlewares/auth.middleware";
import { Role } from "@prisma/client";


const router = express.Router();

router.post(
  "/auth/createAdmin",
  authenticateUser,
  verifyRole(Role.SUPER_ADMIN),
  register
);
router.post("/auth/register", register)
router.post("/auth/login", login);

export default router;
