import express from "express";
const router = express.Router();
export default router;
import { createAdmin } from "../controllers/Admin.Controller.js";
import { protect } from "../middleware/auth.middleware.js";


//create admin route
router.post("/", createAdmin);

