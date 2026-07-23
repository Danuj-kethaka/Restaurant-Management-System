import express from "express";
import { createReservation, getAllReservations, updateReservationStatus,getMyReservations } from "../controllers/Reservation.Controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// User Route
router.post("/", protect, createReservation);
router.get("/myreservations",protect, getMyReservations);   // ← Add this

// Admin Routes
router.get("/", protect, getAllReservations);
router.patch("/:id/status", protect, updateReservationStatus);

export default router;