import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body.name, req.body.email, req.body.password, req.body.role);
    res.status(201).json(user);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(400).json({ message: errorMessage });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = await loginUser(req.body.email, req.body.password);
    res.json(data);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(401).json({ message: errorMessage });
  }
};