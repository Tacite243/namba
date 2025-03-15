import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser, findUserById, updateUser, deleteUser, searchUsers, registerAdmin, registerCollector } from "../services/auth.service";
import { Role } from "@prisma/client"; // Importez l'énumération Role depuis Prisma
import { handleAsync } from "../middlewares/errorHandler";
import prisma from "../config/db";


export const register = handleAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, role = "CLIENT", phoneNumber } = req.body;
  const user = await registerUser(name, email, password, role as Role, phoneNumber);
  res.status(201).json(user);
});


export const createAdmin = handleAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, role = "ADMIN", phoneNumber } = req.body;
  const user = await registerAdmin(name, email, password, role as Role, phoneNumber);
  res.status(201).json(user);
});

export const createCollector = handleAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, role = "COLLECTOR", phoneNumber } = req.body;
  const user = await registerCollector(name, email, password, role as Role, phoneNumber);
  res.status(201).json(user);
});


export const login = handleAsync(async (req: Request, res: Response) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    res.status(400).json({ message: "Numéro de téléphone et mot de passe requis" });
  }

  const { user, token } = await loginUser(phoneNumber, password);
  res.json({ user, token });
});

/**
 * Récupérer tous les utilisateurs
 */
export const getAllUsers = handleAsync(async (req: Request, res: Response, next: NextFunction) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

/**
 * Récupérer un utilisateur par ID
 */
export const getUserById = handleAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const user = await findUserById(id);
  if (!user) {
    res.status(404).json({ message: "Utilisateur non trouvé" });
  } else {
    res.json(user);
  }
});

/**
 * Mettre à jour un utilisateur
 */
export const updateUserById = handleAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  const user = await updateUser(id, { name, email, role });
  res.json(user);
});

/**
 * Supprimer un utilisateur
 */
export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteUser(id);
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * Rechercher des utilisateurs par rôle et/ou numéro de téléphone
 */
export const searchUsersByRole = async (req: Request, res: Response) => {
  const { role, phoneNumber } = req.query;

  try {
    const users = await searchUsers(role as string, phoneNumber as string);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};