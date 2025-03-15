import prisma from "../config/db";

/**
 * Ajouter un service
 */
export const createService = async (
    name: string,
    description: string,
    image: any,
    like: number = 0,
    price: number,
    unit: string = "pièce"
) => {
    // if (!image || !image.startsWith("http")) {
    //     throw new Error("L'image n'est pas valide.");
    // }
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
 * Supprimer un service (admin uniquement)
 */
export const deleteService = async (serviceId: string) => {
    return await prisma.service.delete({
        where: { id: serviceId },
    });
};
