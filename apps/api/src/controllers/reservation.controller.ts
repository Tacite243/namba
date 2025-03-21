import { handleAsync } from "../middlewares/errorHandler";
import { Request, Response } from "express";
import { createReservation, findAllReservation } from "../services/reservation.service";
import { AuthRequest } from "../middlewares/auth.middleware";
import { DeliveryStatus, ReservationStatus, Role } from "@prisma/client";
import prisma from "../config/db";



export const GetAllReservation = handleAsync(async (req: Request, res: Response)=> {
    const reservations = await findAllReservation();
    res.status(200).json(reservations)
})

export const addReservation = handleAsync(async (req: Request, res: Response) => {
    const reservation = await createReservation(req.body);
    res.status(201).json(reservation);
});

/**
 * Un collecteur s'assigne une réservation.
 */

export const assignReservation = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { reservationId } = req.params;

        // Vérifier si l'utilisateur est bien un collecteur
        if (!req.user || req.user.role !== Role.COLLECTOR) {
            res.status(403).json({ message: "Seuls les collecteurs peuvent s'assigner une réservation." });
            return;
        }

        const reservation = await prisma.reservation.findUnique({
            where: { id: reservationId },
        });

        if (!reservation) {
            res.status(404).json({ message: "Réservation introuvable." });
            return;
        }

        if (reservation.status !== ReservationStatus.PENDING) {
            res.status(400).json({ message: "Seules les réservations en attente peuvent être assignées." });
            return;
        }

        // Mise à jour : assigner la réservation et changer le statut
        const updatedReservation = await prisma.reservation.update({
            where: { id: reservationId },
            data: {
                collectorId: req.user.userId,
                status: ReservationStatus.CONFIRMED,
            },
        });

        res.status(200).json({ message: "Réservation assignée avec succès.", reservation: updatedReservation });
    } catch (error) {
        console.error("Erreur lors de l'assignation :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

export const updateReservationStatus = async (req: AuthRequest, res: Response): Promise<void> => { // ✅ Précise que la fonction retourne `Promise<void>`
    try {
        const { reservationId } = req.params;
        const { newStatus } = req.body;

        if (!req.user) {
            res.status(401).json({ message: "Utilisateur non authentifié." });
            return; // ✅ Ajoute return
        }

        const reservation = await prisma.reservation.findUnique({
            where: { id: reservationId },
        });

        if (!reservation) {
            res.status(404).json({ message: "Réservation introuvable." });
            return; // ✅ Ajoute return
        }

        // Vérifier les permissions en fonction du statut demandé
        if (newStatus === ReservationStatus.COMPLETED) {
            if (req.user.role !== Role.ADMIN && req.user.role !== Role.SUPER_ADMIN) {
                res.status(403).json({ message: "Seuls les administrateurs peuvent marquer la réservation comme complétée." });
                return; // ✅ Ajoute return
            }
        }

        if (newStatus === ReservationStatus.CANCELED) {
            if (req.user.userId !== reservation.clientId) {
                res.status(403).json({ message: "Seul le client peut annuler la réservation." });
                return; // ✅ Ajoute return
            }
        }

        if (newStatus === ReservationStatus.CONFIRMED) {
            res.status(403).json({ message: "Un collecteur doit confirmer une réservation via l'assignation." });
            return; // ✅ Ajoute return
        }

        // Mise à jour du statut
        const updatedReservation = await prisma.reservation.update({
            where: { id: reservationId },
            data: { status: newStatus },
        });

        res.status(200).json({ message: `Statut mis à jour en ${newStatus}.`, reservation: updatedReservation });
        return; // ✅ Ajoute return

    } catch (error) {
        console.error("Erreur lors de la mise à jour du statut :", error);
        res.status(500).json({ message: "Erreur serveur." });
        return; // ✅ Ajoute return
    }
};