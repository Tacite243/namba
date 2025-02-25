import prisma from "../config/db";

/**
 * Réserver un service (Client)
 */

export const createReservation = async (clientId: string, serviceId: string) => {
    return await prisma.reservation.create({
        data: { clientId, serviceId },
    });
};

/**
 * Assigner une réservation à un collecteur (Admin)
 */

export const assignReservation = async (reservationId: string, collectorId: string) => {
    return await prisma.reservation.update({
        where: { id: reservationId },
        data: { assignedTo: { connect: { id: collectorId } }, status: "CONFIRMED" },
    });
};

/**
 * Mettre à jour le statut d'une réservation (Admin / Collecteur)
 */

export const updateReservationStatus = async (reservationId: string, status: "COMPLETED" | "CANCELED") => {
    return await prisma.reservation.update({
        where: { id: reservationId },
        data: { status }
    });
};

/**
 * Obtenir toutes les réservations (Admin)
 */

export const getAllReservations = async () => {
    return await prisma.reservation.findMany({
        include: { client: true, service: true, assignedTo: true },
    });
};

/**
 * Obtenir les réservations d'un client
 */

export const getReservationByClient = async (clientId: string) => {
    return await prisma.reservation.findMany({
        where: { clientId },
        include: { service: true }
    });
};

/**
 * Récupérer toutes les réservations selon le rôle de l'utilisateur
 */

export const getReservations = async (userId: string, role: string) => {
    if (role === "CLIENT") {
        return prisma.reservation.findMany({
            where: { clientId: userId },
            include: { service: true }
        });
    }
    return prisma.reservation.findMany({ include: { service: true, client: true } });
};