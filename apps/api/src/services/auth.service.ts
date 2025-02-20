import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../config/db";
dotenv.config();



type Role = "CLIENT" | "ADMIN" | "SUPER_ADMIN" | "COLLECTOR";

export const registerUser = async (name: string, email: string, password: string, role = "CLIENT") => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: { name, email, password: hashedPassword, role: role as Role },
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Email ou mot de passe incorrect");
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
  return { token, user };
};
