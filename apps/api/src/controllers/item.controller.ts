import { Request, Response } from "express";
import { handleAsync } from "../middlewares/errorHandler";
import { createItem, deleteItem, getAllItems, updateItem } from "../services/item.service";


export const addItem = handleAsync(async (req: Request, res: Response) => {
    const { name } = req.body;
    const item = await createItem(name);
    res.status(201).json(item);
});

export const listItem = handleAsync(async (req: Request, res: Response) => {
    const items = await getAllItems();
    res.status(200).json(items);
});

export const editItem = handleAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const item = await updateItem(id, name);
    res.status(200).json(item);
});

export const removeItem = handleAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteItem(id);
    res.status(204).send();
});