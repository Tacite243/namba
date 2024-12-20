import orderRoutes from "./order.js";
import userRoutes from "./user.js";
import express from "express";

const routes = express.Router();

routes.use("/order", orderRoutes);

routes.use("/user", userRoutes);

export default routes;
