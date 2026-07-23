import express from "express";
import { createOrder, getUserOrders, getOrderById, getAllOrders, updateOrderStatus } from "../controllers/Order.Controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protected routes
router.post("/", protect, createOrder);           
router.get("/myorders", protect, getUserOrders);
router.get("/:id", protect, getOrderById);

router.get("/", protect, getAllOrders);                    // ← Add this
router.patch("/:id/status", protect, updateOrderStatus);

export default router;