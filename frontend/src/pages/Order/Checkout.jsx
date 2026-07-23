"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard } from "lucide-react";
import { useCart } from "../../store/Cart/Cart.js";
import { useUserStore } from "../../store/Auth/User.js";
import toast from "react-hot-toast";

const Checkout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { currentUser, accessToken } = useUserStore();
  const { cart, getCartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    phone: "",
    paymentMethod: "cash",
  });

  const [loading, setLoading] = useState(false);
  const total = getCartTotal();

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({ ...prev, fullName: currentUser.name || "" }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!formData.address || !formData.city || !formData.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!accessToken) {
      toast.error("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    setLoading(true);

    const orderData = {
      items: cart.map((item) => ({
        menu: item._id,
        name: item.name,
        price: Number(item.price),
        quantity: item.quantity,
      })),
      totalAmount: total,
      deliveryAddress: {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        phone: formData.phone,
      },
      paymentMethod: formData.paymentMethod,
    };

    try {
      const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("🎉 Order placed successfully!");
        clearCart();
        navigate("/order-success");
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar - Keep your existing navbar here */}

      <div className="max-w-6xl mx-auto pt-15 pb-20 px-6">
        <Link to="/cart" className="flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-8">
          <ArrowLeft size={20} /> Back to Cart
        </Link>

        <h1 className="text-5xl font-bold mb-10">Checkout</h1>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: Delivery Form */}
          <div className="lg:col-span-3">
            <div className="bg-zinc-900 rounded-3xl p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <MapPin className="text-amber-400" /> Delivery Information
              </h2>

              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-black border border-white/20 rounded-2xl px-5 py-4 focus:border-amber-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Delivery Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-black border border-white/20 rounded-2xl px-5 py-4 focus:border-amber-500 outline-none"
                    placeholder="House number, street name..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/20 rounded-2xl px-5 py-4 focus:border-amber-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/20 rounded-2xl px-5 py-4 focus:border-amber-500 outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-xl font-semibold mb-5 flex items-center gap-3">
                    <CreditCard className="text-amber-400" /> Payment Method
                  </h3>
                  <label className="flex items-center gap-3 bg-zinc-800 p-4 rounded-2xl cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === "cash"}
                      onChange={handleChange}
                    />
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-zinc-400">Pay when your order arrives</p>
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black py-5 rounded-2xl font-semibold text-lg mt-8 transition disabled:opacity-70"
                >
                  {loading ? "Placing Order..." : `Place Order • Rs. ${total}`}
                </button>
              </form>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900 rounded-3xl p-8 sticky top-28">
              <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

              <div className="space-y-6 mb-8 max-h-[420px] overflow-auto pr-2">
                {cart.map((item) => (
                  <div key={item._id} className="flex gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="font-medium leading-tight">{item.name}</p>
                      <p className="text-sm text-zinc-400 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right font-semibold text-amber-400">
                      Rs. {(item.price * item.quantity).toFixed(0)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-6 space-y-3">
                <div className="flex justify-between text-zinc-300">
                  <span>Subtotal</span>
                  <span>Rs. {total}</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>Delivery Fee</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="h-px bg-white/10 my-4"></div>
                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-amber-400">Rs. {total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;