import express from "express";
import { addService, listServices, removeService } from "../controllers/service.controller";
import { authenticateUser, verifyRole } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/",
    addService);
router.get("/",
    listServices);
router.delete("/:id",
    // verifyRole("ADMIN"),
    removeService);

export default router;