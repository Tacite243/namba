import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../config/db";
import { Role } from "@prisma/client";

dotenv.config();

/**
 * Vérifie si un rôle est valide.
 */
const isValidRole = (role: string): role is Role => Object.values(Role).includes(role as Role);

/**
 * Inscription utilisateur.
 */
export const registerUser = async (name: string, email: string, password: string, role: Role = Role.CLIENT) => {
  if (!isValidRole(role)) {
    throw new Error("Rôle invalide.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  return prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });
};

/**
 * Connexion utilisateur.
 */
export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Utilisateur non trouvé.");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Mot de passe incorrect.");

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return { token, user };
};