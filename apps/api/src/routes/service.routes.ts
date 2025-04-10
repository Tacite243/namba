import express from "express";
import { 
    addService, 
    listServices, 
    getService, 
    editService, 
    removeService 
} from "../controllers/service.controller";

const router = express.Router();

router.post("/", addService);
router.get("/", listServices);
router.get("/:id", getService);
router.put("/:id", editService);
router.delete("/:id", removeService);

export default router;
