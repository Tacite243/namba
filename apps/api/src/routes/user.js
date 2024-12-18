import express from "express";
import user from "../controllers/userctrl.js";
import validation from "../utils/validation.js";

const routes = express.Router();

routes.post(
  "/user",
  validation.ValidateData(validation.createAccount),
  user.create
);

export default routes;
