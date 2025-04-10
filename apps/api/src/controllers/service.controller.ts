import { Request, Response } from "express";
import { handleAsync } from "../middlewares/errorHandler";
import { 
    createService, 
    deleteService, 
    getAllServices, 
    getServiceById, 
    updateService 
} from "../services/service.service";

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
 * Récupérer un service par ID
 */
export const getService = handleAsync(async (req: Request, res: Response) => {
    const service = await getServiceById(req.params.id);
    if (!service) {
        res.status(404).json({ message: "Service non trouvé" });
        return;
    }
    res.json(service);
});

/**
 * Mettre à jour un service
 */
export const editService = handleAsync(async (req: Request, res: Response) => {
    const updatedService = await updateService(req.params.id, req.body);
    res.json(updatedService);
});

/**
 * Supprimer un service
 */
export const removeService = handleAsync(async (req: Request, res: Response) => {
    await deleteService(req.params.id);
    res.json({ message: "Service supprimé" });
});
