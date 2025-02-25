import prisma from "../config/db";


/**
 * Ajouter un nouveau service
 */

export const createService = async (name: string, description: string, price: number) => {
    return await prisma.service.create({
        data: {name, description, price},
    })
};

/**
 * Obtenir tous les services
 */

export const getAllServices = async () => {
    return await prisma.service.findMany();
};

/**
 * Supprimer un service (admin uniquement)
 */

export const deleteService = async (serviceId: string) => {
    return await prisma.service.delete({
        where: {id: serviceId},
    })
};