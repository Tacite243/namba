import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../config/db";
import { Role } from "@prisma/client";
import { config } from "../config/config";
import { handleAsync } from "../middlewares/errorHandler";

dotenv.config();
const SALT_ROUNDS = 12;

/**
 * Hash du mot de passe
 */
const hashedPassword = async (password: string, SALT_ROUNDS: number) => {
  return bcrypt.hash(password, SALT_ROUNDS);
}

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

  // Hash du mot de passe avant de l'assigner
  const hashedPass = await hashedPassword(password, SALT_ROUNDS);

  return prisma.user.create({
    data: { name, email, password: hashedPass, role },
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
    config.jwtSecret as string,
    { expiresIn: "7d" }
  );

  return { token, user };
};

/**
 * Trouver un utilisateur par email
 */
export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
}

/**
 * Trouver un utilisateur par ID
 */
export const findUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

/**
* Mettre à jour un utilisateur
*/
export const updateUser = async (id: string, data: any) => {
  return prisma.user.update({ where: { id }, data });
};

/**
* Supprimer un utilisateur
*/
export const deleteUser = async (id: string) => {
  return prisma.user.delete({ where: { id } });
};

/**
* Hash du mot de passe
*/
export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};
