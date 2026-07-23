import express from "express";
import { createFeedback, getAllFeedback } from "../controllers/Feedback.Controller.js";
import { protect} from "../middleware/auth.middleware.js";
import {authorize, isManagerOrAbove,isStaffOrAbove} from "../middleware/rbac.middleware.js"

const router = express.Router();

router.post("/", protect, createFeedback);                 // any user
router.get("/", protect, isStaffOrAbove, getAllFeedback); // staff+

export default router;