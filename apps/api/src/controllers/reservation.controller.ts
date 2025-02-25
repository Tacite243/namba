import { NextFunction, Response } from "express";
import { createReservation, getReservations, updateReservationStatus } from "../services/reservation.service";
import { AuthRequest } from "../middlewares/auth.middleware";

/**
 * Créer une réservation (Clients uniquement)
 */
export const addReservation = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { serviceId } = req.body;
        const clientId = req.user?.userId;

        if (!clientId) {
            res.status(401).json({ message: "Utilisateur non authentifié" });
            return;
        }

        const reservation = await createReservation(clientId, serviceId);
        res.status(201).json(reservation);
    } catch (error) {
        next(error);
    }
};

/**
 * Lister les réservations selon le rôle
 */
export const listReservations = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Utilisateur non authentifié" });
            return;
        }

        const reservations = await getReservations(req.user.userId, req.user.role);
        res.json(reservations);
    } catch (error) {
        next(error);
    }
};

/**
 * Modifier le statut d'une réservation (Admin et Collecteur uniquement)
 */
export const changeReservationStatus = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { status } = req.body;
        const reservation = await updateReservationStatus(req.params.id, status);
        res.json(reservation);
    } catch (error) {
        next(error);
    }
};
