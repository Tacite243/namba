import express from "express";
import user from "../controllers/userctrl.js";
import validation from "../utils/validation.js";
import vars from "../utils/vars.js";

const userRoutes = express.Router();

userRoutes.post(
  "/signup",
  validation.ValidateData(validation.createAccount),
  user.create
);

userRoutes.post(
  "/collector",
  validation.ValidateData(validation.createCollector),
  vars.AuthToken,
  vars.authRoles("ADMIN"),
  user.createCollector
);

userRoutes.post(
  "/login",
  validation.ValidateData(validation.signin),
  user.connexion
);

userRoutes.get("/user", vars.AuthToken, vars.authRoles("ADMIN"), user.getUsers);

userRoutes.get(
  "/:id",
  vars.AuthToken,
  vars.authRoles("ADMIN", "USER"),
  user.getOneUser
);

userRoutes.get(
  "/collector",
  vars.AuthToken,
  vars.authRoles("ADMIN"),
  user.getCollectors
);

userRoutes.get(
  "/collector/:id",
  vars.AuthToken,
  vars.authRoles("ADMIN", "COLLECTOR"),
  user.getOneCollector
);

export default userRoutes;
