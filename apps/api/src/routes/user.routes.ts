import express from "express";
import { register, getAllUsers, getUserById, updateUserById, deleteUserById, searchUsersByRole, login, createAdmin, createCollector } from "../controllers/auth.controller";
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
router.post("/register", register);
router.post("/createAdmin", createAdmin, verifyRole("SUPER_ADMIN"));
router.post("/createCollector", createCollector, verifyRole("ADMIN"));
router.post("/login", login);
router.get("/", authenticateUser, verifyRole("ADMIN"), getAllUsers);
router.get("/:id", authenticateUser, getUserById);
router.put("/:id", authenticateUser, updateUserById);
router.delete("/:id", authenticateUser, verifyRole("SUPER_ADMIN"), deleteUserById);
router.get("/searchUser", authenticateUser, verifyRole("ADMIN"), searchUsersByRole);

export default router;