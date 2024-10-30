const express = require("express");
const authRoutes = require("./src/routes/authRoute");
const { errorHandler } = require("./src/middlewares/errorMiddleware");
const cors = require("cors");


const app = express();


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    credentials: true
}));

app.use(express.json());
app.use("/auth", authRoutes);
app.use(errorHandler);

module.exports = app;