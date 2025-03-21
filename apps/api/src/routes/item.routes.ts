import express from "express";
// import { isAdminOrSuperAdmin } from "../middlewares/auth.middleware";
import { addItem, editItem, listItem, removeItem } from "../controllers/item.controller";

const router = express.Router();

router.get("/", listItem);
router.post("/",
    // isAdminOrSuperAdmin, 
    addItem);
router.put("/:id",
    // isAdminOrSuperAdmin, 
    editItem);
router.delete("/:id",
    // isAdminOrSuperAdmin, 
    removeItem);

export default router;