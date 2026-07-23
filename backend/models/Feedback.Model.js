import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true,
    maxlength: 500
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  },
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation"
  }
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;