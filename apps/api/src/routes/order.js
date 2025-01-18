import express from "express";
import order from "../controllers/orderctrl.js";
import validation from "../utils/validation.js";
import vars from "../utils/vars.js";

const orderRoutes = express.Router();

orderRoutes.post(
  "/",
  vars.AuthToken,
  vars.authRoles("USER"),
  validation.ValidateData(validation.createOrder),
  order.create
);

orderRoutes.put(
  "/assigned/:id",
  vars.AuthToken,
  vars.authRoles("ADMIN", "COLLECTOR"),
  validation.ValidateData(validation.assigned),
  order.setAssiged
);

orderRoutes.put(
  "/received/:id",
  vars.AuthToken,
  vars.authRoles("ADMIN"),
  order.setReceived
);

orderRoutes.put(
  "/completed/:id",
  vars.AuthToken,
  vars.authRoles("ADMIN"),
  order.setCompleted
);

orderRoutes.put(
  "/canceled/:id",
  vars.AuthToken,
  vars.authRoles("ADMIN", "COLLECTOR"),
  validation.ValidateData(validation.assigned),
  order.setCanceled
);

orderRoutes.put(
  "/done/:id",
  vars.AuthToken,
  vars.authRoles("USER"),
  order.setDone
);

orderRoutes.get(
  "/",
  vars.AuthToken,
  vars.authRoles("ADMIN", "COLLECTOR"),
  order.getOrders
);

orderRoutes.get(
  "/:id",
  vars.AuthToken,
  vars.authRoles("ADMIN", "COLLECTOR"),
  order.getOneOrder
);

export default orderRoutes;
