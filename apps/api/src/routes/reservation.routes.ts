import express from "express"
import { addReservation, assignReservation, GetAllReservation, updateReservationStatus } from "../controllers/reservation.controller";
import { authenticateUser, verifyRole } from "../middlewares/auth.middleware";


const router = express.Router();

router.get('/find', GetAllReservation);
router.post("/create", addReservation);
// Un collecteur s'assigne une réservation
router.put("/:reservationId/assign", authenticateUser, assignReservation);
// Modifier le statut d'une réservation (admin ou client)
router.put("/:reservationId/status", authenticateUser, updateReservationStatus);

export default router;