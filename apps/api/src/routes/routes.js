import availableRoutes from "./available.js";
import orderRoutes from "./order.js";
import userRoutes from "./user.js";
import express from "express";

const routes = express.Router();

routes.use("/order", orderRoutes);

routes.use("/user", userRoutes);

routes.use("/available", availableRoutes);

export default routes;
