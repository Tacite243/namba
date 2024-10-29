const express = require("express");
const authRoutes = require("./src/routes/authRoute");
const {errorHandler} = require("./src/middlewares/errorMiddleware");

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use(errorHandler);

module.exports = app;