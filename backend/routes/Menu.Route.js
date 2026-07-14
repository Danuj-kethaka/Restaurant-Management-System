import express from "express";
import upload from "../middleware/upload.js";
import { addMenu,getMenus } from "../controllers/Menu.Controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", upload.single("image"),addMenu);
router.get("/", getMenus);

export default router;