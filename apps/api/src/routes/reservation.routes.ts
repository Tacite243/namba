import express from "express"
import { addReservation } from "../controllers/reservation.controller";


const router = express.Router();

router.post("/create", addReservation);

export default router;