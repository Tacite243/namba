import express from "express";
import { register, login, getAllUsers, getUserById, updateUserById, deleteUserById } from "../controllers/auth.controller";
import { authenticateUser, verifyRole } from "../middlewares/auth.middleware";
import { Role } from "@prisma/client";


const router = express.Router();

// Routes d'authentification

router.post(
  "/createAdmin",
  authenticateUser,
  verifyRole(Role.SUPER_ADMIN),
  register
);
router.post("/register", register)
router.post("/login", login);
router.get("/", authenticateUser, verifyRole("ADMIN"), getAllUsers);
router.get("/:id", authenticateUser, getUserById);
router.put("/:id", authenticateUser, updateUserById);
router.delete("/:id", authenticateUser, verifyRole("SUPER_ADMIN"), deleteUserById)

export default router;