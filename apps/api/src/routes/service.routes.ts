import express from "express";
import { isAdminOrCollector, verifyRole } from "../middlewares/auth.middleware";
import { addService, listServices, removeService } from "../controllers/service.controller";

const router = express.Router();

router.post("/",
    // verifyRole("ADMIN"),
    addService);
router.get("/", listServices);
router.delete("/:id", isAdminOrCollector, removeService);

export default router;