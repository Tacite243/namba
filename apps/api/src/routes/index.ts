import express from 'express';
import userRoutes from './user.routes';
import reservationRoutes from "./reservation.routes";
import serviceRoute from "./service.routes"


const router = express.Router();

router.use("/auth", userRoutes);
router.use("/reservation", reservationRoutes);
router.use("/service", serviceRoute);

export default router;