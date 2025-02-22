import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../config/db";
import { Role } from "@prisma/client"; // Importez l'énumération Role depuis Prisma

dotenv.config();

export const registerUser = async (name: string, email: string, password: string, role: Role = "CLIENT") => {
  const validRoles: Role[] = ["CLIENT", "ADMIN", "SUPER_ADMIN", "COLLECTOR"];
  if (!validRoles.includes(role)) {
    throw new Error("Rôle invalide");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Mot de passe incorrect");
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
  return { token, user };
};