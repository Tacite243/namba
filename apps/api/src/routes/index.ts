import express from 'express';
import userRoutes from './user.routes';
import reservationRoutes from "./reservation.routes";
import serviceRoute from "./service.routes";
import itemRoutes from "./item.routes";


const router = express.Router();

router.use("/auth", userRoutes);
router.use("/service", serviceRoute);
router.use("/reservation", reservationRoutes);
router.use("/items", itemRoutes);

export default router;