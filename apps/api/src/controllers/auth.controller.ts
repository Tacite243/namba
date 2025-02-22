import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { Role } from "@prisma/client"; // Importez l'énumération Role depuis Prisma

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role = "CLIENT" } = req.body;
    const user = await registerUser(name, email, password, role as Role);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    res.json(data);
  } catch (err) {
    res.status(401).json({ message: (err as Error).message });
  }
};