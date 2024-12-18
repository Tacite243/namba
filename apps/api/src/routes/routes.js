import express from "express";
import vars from "../utils/vars.js";
import user from "../controllers/userctrl.js";

const routes = express.Router();

// routes.use("/user", vars.AuthToken, UserRouter);
routes.post("/user", user.create);

export default routes;
