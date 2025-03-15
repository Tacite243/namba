import { Request, Response } from "express";
import { handleAsync } from "../middlewares/errorHandler";
import { createService, deleteService, getAllServices } from "../services/service.service";

/**
 * Ajouter un service
 */
export const addService = handleAsync(async (req: Request, res: Response) => {
    const { name, description, image, like, price, unit } = req.body;
    const service = await createService(name, description, image, like, price, unit);
    res.status(201).json(service);
});

/**
 * Récupérer tous les services
 */
export const listServices = handleAsync(async (req: Request, res: Response) => {
    const services = await getAllServices();
    res.json(services);
});

/**
 * Supprimer un service (Admin uniquement)
 */
export const removeService = handleAsync(async (req: Request, res: Response) => {
    await deleteService(req.params.id);
    res.json({ message: "Service supprimé" });
});
