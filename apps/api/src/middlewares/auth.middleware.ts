import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Role } from "@prisma/client";

dotenv.config();

interface AuthRequest extends Request {
  user?: { userId: string; role: Role };
}

/**
 * Middleware pour vérifier si l'utilisateur est authentifié.
 */
export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Accès refusé. Token manquant." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string; role: string };
    req.user = { userId: decoded.userId, role: decoded.role as Role };
    return next();
  } catch (err) {
    res.status(403).json({ message: "Token invalide." });
    return;
  }
};

/**
 * Middleware pour vérifier si l'utilisateur est SUPER_ADMIN.
 */

export const isSuperAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== "SUPER_ADMIN") {
    res.status(403).json({ message: "Accès interdit. Seul un Super Admin peut effectuer cette action." });
    return;
  }
  return next();
};