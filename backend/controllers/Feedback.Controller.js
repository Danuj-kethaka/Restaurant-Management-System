import Feedback from "../models/Feedback.Model.js";

// Create Feedback
export const createFeedback = async (req, res) => {
  try {
    const { rating, comment, order, reservation } = req.body;
    const userId = req.user.id;

    const feedback = await Feedback.create({
      user: userId,
      rating,
      comment,
      order,
      reservation
    });

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      data: feedback
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get All Feedback (Admin only)
export const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({})
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .populate("order")
      .populate("reservation");

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};