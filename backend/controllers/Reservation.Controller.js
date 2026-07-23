import Reservation from "../models/Reservation.Model.js";

// Create Reservation
export const createReservation = async (req, res) => {
  try {
    const { date, time, guests, name, email, phone, specialRequest } = req.body;
    const userId = req.user.id;

    const reservation = await Reservation.create({
      user: userId,
      date,
      time,
      guests,
      name,
      email,
      phone,
      specialRequest
    });

    res.status(201).json({
      success: true,
      message: "Reservation request received successfully",
      data: reservation
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Reservations (Admin)
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({})
      .sort({ date: 1 })
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      data: reservations
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Reservation Status (Admin)
export const updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({ success: false, message: "Reservation not found" });
    }

    res.status(200).json({
      success: true,
      message: `Reservation ${status}`,
      data: reservation
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get User's Reservations
export const getMyReservations = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const reservations = await Reservation.find({ user: userId })
      .sort({ date: 1 })
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      data: reservations
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};