import express from "express";
import { createFeedback, getAllFeedback } from "../controllers/Feedback.Controller.js";
import { protect} from "../middleware/auth.middleware.js";

const router = express.Router();

// User Route
router.post("/", protect, createFeedback);

// Admin Route
router.get("/", protect, getAllFeedback);

export default router;