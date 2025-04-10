import prisma from "../config/db";

/**
 * Ajouter un service
 */
export const createService = async (
    name: string,
    description: string,
    image: string,
    like: number = 0,
    price: number,
    unit: string = "pièce"
) => {
    if (!image || !image.startsWith("http")) {
        throw new Error("L'image n'est pas valide.");
    }
    return await prisma.service.create({
        data: {
            name,
            description,
            image,
            like,
            price,
            unit
        },
    });
};

/**
 * Obtenir tous les services
 */
export const getAllServices = async () => {
    return await prisma.service.findMany();
};

/**
 * Obtenir un service par ID
 */
export const getServiceById = async (serviceId: string) => {
    return await prisma.service.findUnique({
        where: { id: serviceId },
    });
};

/**
 * Mettre à jour un service
 */
export const updateService = async (
    serviceId: string,
    data: { name?: string; description?: string; image?: string; price?: number; unit?: string }
) => {
    return await prisma.service.update({
        where: { id: serviceId },
        data,
    });
};

/**
 * Supprimer un service
 */
export const deleteService = async (serviceId: string) => {
    return await prisma.service.delete({
        where: { id: serviceId },
    });
};
