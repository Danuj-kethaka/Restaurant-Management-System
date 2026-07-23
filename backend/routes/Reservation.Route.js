import express from "express";
import { createReservation, getAllReservations, updateReservationStatus,getMyReservations } from "../controllers/Reservation.Controller.js";
import { protect } from "../middleware/auth.middleware.js";
import {authorize, isManagerOrAbove,isStaffOrAbove} from "../middleware/rbac.middleware.js"

const router = express.Router();

router.post("/", protect, createReservation);
router.get("/myreservations", protect, getMyReservations);

router.get("/", protect, isStaffOrAbove, getAllReservations);
router.patch("/:id/status", protect, isStaffOrAbove, updateReservationStatus);

export default router;