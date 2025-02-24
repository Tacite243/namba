import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { Role } from "@prisma/client"; // Importez l'énumération Role depuis Prisma
import { handleAsync } from "../middlewares/errorHandler";

export const register = handleAsync(async (req: Request, res: Response) => {
  const { name, email, password, role = "CLIENT" } = req.body;
  const user = await registerUser(name, email, password, role as Role);
  res.status(201).json(user);
});

export const login = handleAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await loginUser(email, password);
  res.json(data);
});