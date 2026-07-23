"use client";

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import { useUserStore } from "../../store/Auth/User.js";

const OrderSuccess = () => {
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home after 8 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center">
            <CheckCircle className="text-green-500" size={80} />
          </div>
        </div>

        <h1 className="text-5xl font-bold mb-4">Order Placed Successfully!</h1>
        
        <p className="text-zinc-400 text-lg mb-10">
          Thank you for your order. We have received it and will start preparing shortly.
        </p>

        <div className="bg-zinc-900 rounded-3xl p-8 mb-10 text-left">
          <h3 className="font-semibold mb-4 text-amber-400">What happens next?</h3>
          <ul className="space-y-3 text-zinc-300">
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">•</span>
              Our team will confirm your order soon
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">•</span>
              You'll receive a confirmation message
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">•</span>
              Your food will be prepared fresh
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex-1 bg-amber-500 hover:bg-amber-400 text-black py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition"
          >
            <Home size={20} />
            Back to Home
          </Link>

          <Link
            to="/useraccount"
            className="flex-1 border border-white/30 hover:border-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition"
          >
            <ShoppingBag size={20} />
            View My Orders
          </Link>
        </div>

        <p className="text-zinc-500 text-sm mt-10">
          You will be redirected to home in a few seconds...
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;