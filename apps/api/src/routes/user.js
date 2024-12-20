import express from "express";
import user from "../controllers/userctrl.js";
import validation from "../utils/validation.js";
import vars from "../utils/vars.js";

const routes = express.Router();

routes.post(
  "/user/signup",
  validation.ValidateData(validation.createAccount),
  user.create
);

routes.post(
  "/collector",
  validation.ValidateData(validation.createCollector),
  vars.AuthToken,
  vars.authRoles("ADMIN"),
  user.createCollector
);

routes.post(
  "/user/login",
  validation.ValidateData(validation.signin),
  user.connexion
);

routes.get("/user", vars.AuthToken, vars.authRoles("ADMIN"), user.getUsers);

routes.get(
  "/user/:id",
  vars.AuthToken,
  vars.authRoles("ADMIN", "USER"),
  user.getOneUser
);

routes.get(
  "/collector",
  vars.AuthToken,
  vars.authRoles("ADMIN"),
  user.getCollectors
);

routes.get(
  "/collector/:id",
  vars.AuthToken,
  vars.authRoles("ADMIN", "COLLECTOR"),
  user.getOneCollector
);

export default routes;
