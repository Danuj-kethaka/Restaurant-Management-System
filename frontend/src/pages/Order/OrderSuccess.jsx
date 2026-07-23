import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import { useUserStore } from "../../store/Auth/User.js";
import Feedback from "../Feedback.jsx"; // Adjust path

const OrderSuccess = () => {
  const { currentUser } = useUserStore();
  const navigate = useNavigate();
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!feedbackSubmitted) navigate("/");
    }, 10000); 

    return () => clearTimeout(timer);
  }, [navigate, feedbackSubmitted]);

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-28 h-28 bg-green-500/10 rounded-full flex items-center justify-center">
            <CheckCircle className="text-green-500" size={100} />
          </div>
        </div>

        <h1 className="text-5xl font-bold mb-4">Thank You!</h1>
        <p className="text-2xl text-zinc-400 mb-12">
          Your order has been placed successfully
        </p>

        <div className="bg-zinc-900 rounded-3xl p-8 mb-12 text-left">
          <h3 className="font-semibold mb-4 text-amber-400">What's Next?</h3>
          <ul className="space-y-4 text-zinc-300">
            <li>• Our team is preparing your delicious meal</li>
            <li>• You'll receive order updates via SMS/Email</li>
            <li>• We hope to see you again soon!</li>
          </ul>
        </div>

        {/* Feedback Section */}
        {!feedbackSubmitted && (
          <Feedback 
            orderId={null} // You can pass real orderId if available
            onFeedbackSubmitted={() => setFeedbackSubmitted(true)} 
          />
        )}

        {feedbackSubmitted && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-3xl p-8 mb-10">
            <p className="text-green-400 text-xl">Thank you for your valuable feedback! ❤️</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            to="/"
            className="flex-1 bg-amber-500 hover:bg-amber-400 text-black py-5 rounded-2xl font-semibold flex items-center justify-center gap-3 transition"
          >
            <Home size={22} />
            Back to Home
          </Link>

          <Link
            to="/useraccount"
            className="flex-1 border border-white/30 hover:border-white py-5 rounded-2xl font-semibold flex items-center justify-center gap-3 transition"
          >
            <ShoppingBag size={22} />
            My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;