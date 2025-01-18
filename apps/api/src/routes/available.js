import express from "express";
import validation from "../utils/validation.js";
import vars from "../utils/vars.js";
import available from "../controllers/availablectrl.js";

const availableRoutes = express.Router();

availableRoutes.post(
  "/",
  validation.available,
  vars.AuthToken,
  vars.authRoles("COLLECTOR"),
  available.isAvailable
);

availableRoutes.get(
  "/:id",
  vars.AuthToken,
  vars.authRoles("COLLECTOR"),
  available.isDesable
);

export default availableRoutes;
