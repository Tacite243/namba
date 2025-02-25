import express from "express"
import { addReservation, changeReservationStatus, listReservations } from "../controllers/reservation.controller";
import { isAdminOrCollector } from "../middlewares/auth.middleware";


const router = express.Router();

router.post("/", addReservation);
router.get("/", listReservations);
router.patch("/:id", isAdminOrCollector, changeReservationStatus);

export default router;