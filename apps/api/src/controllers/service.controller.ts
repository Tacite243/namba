import { Request, Response } from "express";
import { handleAsync } from "../middlewares/errorHandler";
import { createService, deleteService, getAllServices } from "../services/service.service";

/**
 * Créer un service
 */

export const addService = handleAsync(async(req: Request, res: Response) => {
    const {name, description, price} = req.body;
    const service = await createService(name, description, price);
    res.status(201).json(service);
})

/**
 * Récupérer tous les services
 */

export const listServices = handleAsync(async(req: Request, res: Response) => {
    const services = await getAllServices();
    res.json(services);
})

/**
 * Supprimer un service (Admin uniquement)
 */

export const removeService = handleAsync(async(req: Request, res: Response) => {
    await deleteService(req.params.id);
    res.json({message: "Service supprimé"});
});