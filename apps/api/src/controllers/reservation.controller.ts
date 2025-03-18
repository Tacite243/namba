import { handleAsync } from "../middlewares/errorHandler";
import { Request, Response } from "express";
import { createReservation } from "../services/reservation.service";



export const addReservation = handleAsync(async (req: Request, res: Response) => {
    const reservation = await createReservation(req.body);
    res.status(201).json(reservation);
})