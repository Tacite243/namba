import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Role } from "@prisma/client";
import express from "express";
import { config } from "../config/config";

dotenv.config();

export interface AuthRequest extends Request {
  user?:
  {
    userId: string;
    role: Role;
  };
}

/**
 * Vérifie l'authentification de l'utilisateur via JWT.
 */
export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Accès refusé. Token manquant." });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret as string) as { userId: string; role: Role };

    // Vérification stricte du rôle
    if (!Object.values(Role).includes(decoded.role)) {
      res.status(400).json({ message: "Rôle invalide." });
      return;
    }

    req.user = { userId: decoded.userId, role: decoded.role };
    return next();
  } catch (err) {
    res.status(403).json({ message: "Token invalide." });
    return;
  }
};


/**
 * Middleware dynamique pour vérifier si l'utilisateur a un rôle spécifique.
 */

export const verifyRole = (requiredRole: Role) => (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  if (!req.user || req.user.role !== requiredRole) {
    res.status(403).json({ message: `Accès interdit. Seuls les ${requiredRole} peuvent effectuer cette action.` });
    return;
  }
  next();
};

export const isAdminOrCollector: RequestHandler = (req: AuthRequest, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Utilisateur non authentifié" });
    return; // ✅ Ajout d'un return explicite
  }

  if (req.user.role !== Role.ADMIN && req.user.role !== Role.COLLECTOR) {
    res.status(403).json({ message: "Accès refusé" });
    return; // ✅ Ajout d'un return explicite
  }

  next();
  return; // ✅ Ajout pour garantir un retour `void`
};