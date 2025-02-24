import userRoutes from './user.routes';
import express from 'express';

const router = express.Router();

router.use("/auth", userRoutes);

export default router;