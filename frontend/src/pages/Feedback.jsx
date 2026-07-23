import React, { useState } from "react";
import { useUserStore } from "../store/Auth/User.js";
import toast from "react-hot-toast";
import { Star, Send } from "lucide-react";

const Feedback = ({ orderId = null, reservationId = null, onFeedbackSubmitted }) => {
  const { currentUser, accessToken } = useUserStore();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!currentUser) {
      toast.error("Please login to submit feedback");
      return;
    }

    setLoading(true);

    try {
      const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          rating,
          comment,
          order: orderId,
          reservation: reservationId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Thank you for your feedback! ❤️");
        setRating(0);
        setComment("");
        if (onFeedbackSubmitted) onFeedbackSubmitted();
      } else {
        toast.error(data.message || "Failed to submit feedback");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 mt-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold">How was your experience?</h2>
        <p className="text-zinc-400 mt-2">Your feedback helps us improve</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Star Rating */}
        <div className="flex justify-center gap-3 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={48}
                className={`transition-colors ${
                  (hoverRating || rating) >= star
                    ? "fill-amber-400 text-amber-400"
                    : "text-zinc-600"
                }`}
              />
            </button>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us more about your experience... (Optional)"
          rows={5}
          className="w-full bg-black border border-white/20 rounded-2xl px-6 py-5 text-white placeholder-zinc-500 focus:border-amber-500 outline-none resize-none"
        />

        <button
          type="submit"
          disabled={loading || rating === 0}
          className="w-full mt-6 bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-700 text-black font-semibold py-5 rounded-2xl flex items-center justify-center gap-3 transition"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default Feedback;