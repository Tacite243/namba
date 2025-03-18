import express from "express";
import { addService, listServices, removeService } from "../controllers/service.controller";

const router = express.Router();

router.post("/",
    // verifyRole("ADMIN"),
    addService);
router.get("/",
    listServices);
router.delete("/:id",
    // verifyRole("ADMIN"),
    removeService);

export default router;