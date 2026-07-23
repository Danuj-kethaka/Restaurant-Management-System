import express from "express";
import { createOrder, getUserOrders, getOrderById, getAllOrders, updateOrderStatus } from "../controllers/Order.Controller.js";
import { protect } from "../middleware/auth.middleware.js";
import {authorize, isManagerOrAbove,isStaffOrAbove} from "../middleware/rbac.middleware.js"

const router = express.Router();

router.post("/", protect, createOrder);                    // any logged in user
router.get("/myorders", protect, getUserOrders);
router.get("/:id", protect, getOrderById);
router.get("/", protect, isStaffOrAbove, getAllOrders);           // staff+
router.patch("/:id/status", protect, isStaffOrAbove, updateOrderStatus);

export default router;