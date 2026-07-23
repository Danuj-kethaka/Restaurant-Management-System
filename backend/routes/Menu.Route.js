import express from "express";
import upload from "../middleware/upload.js";
import { addMenu,getMenus ,updateMenu, deleteMenu} from "../controllers/Menu.Controller.js";
import { protect } from "../middleware/auth.middleware.js";
import {authorize, isManagerOrAbove,isStaffOrAbove} from "../middleware/rbac.middleware.js"

const router = express.Router();

router.post("/", protect, isStaffOrAbove, upload.single("image"), addMenu);
router.get("/", getMenus); // public
router.put("/:id", protect, isStaffOrAbove, upload.single("image"), updateMenu);
router.delete("/:id", protect, isManagerOrAbove, deleteMenu); // only manager+

export default router;