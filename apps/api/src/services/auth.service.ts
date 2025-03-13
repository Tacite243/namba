import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../config/db";
import { Role } from "@prisma/client";
import { config } from "../config/config";

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
export const registerUser = async (name: string, email: string, password: string, role: Role = Role.CLIENT, phoneNumber: string) => {
  if (!isValidRole(role)) {
    throw new Error("Rôle invalide.");
  }

  // Hash du mot de passe avant de l'assigner
  const hashedPass = await hashedPassword(password, SALT_ROUNDS);

  return prisma.user.create({
    data: { name, email, password: hashedPass, role, phoneNumber: phoneNumber },
  });
};

export const registerAdmin = async (name: string, email: string, password: string, role: Role = Role.SUPER_ADMIN, phoneNumber: string) => {
  if (!isValidRole(role)) {
    throw new Error("Rôle invalide.");
  }

  // Hash du mot de passe avant de l'assigner
  const hashedPass = await hashedPassword(password, SALT_ROUNDS);

  return prisma.user.create({
    data: { name, email, password: hashedPass, role, phoneNumber: phoneNumber },
  });
};

export const registerCollector = async (name: string, email: string, password: string, role: Role = Role.ADMIN, phoneNumber: string) => {
  if (!isValidRole(role)) {
    throw new Error("Rôle invalide.");
  }

  // Hash du mot de passe avant de l'assigner
  const hashedPass = await hashedPassword(password, SALT_ROUNDS);

  return prisma.user.create({
    data: { name, email, password: hashedPass, role, phoneNumber: phoneNumber },
  });
};

/**
 * Connexion utilisateur.
 */
export const loginUser = async (phoneNumber: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { phoneNumber }
  });
  if (!user) {
    throw new Error("Numéro de téléphone ou mot de passe incorrect");
  }

  // Vérifier le mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Mot de passe incorrect.");

  // Générer un token JWT
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

/**
 * Rechercher des utilisateurs par rôle et/ou numéro de téléphone
 */
export const searchUsers = async (role?: string, phoneNumber?: string) => {
  const filters: any = {};

  if (role) {
    filters.role = role;
  }

  if (phoneNumber) {
    filters.phoneNumber = phoneNumber;
  }

  return prisma.user.findMany({
    where: filters,
  });
};