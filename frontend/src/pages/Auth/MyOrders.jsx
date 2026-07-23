"use client";

import React, { useState, useEffect } from "react";
import { useUserStore } from "../../store/Auth/User.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Package } from "lucide-react";

const MyOrders = () => {
  const { currentUser, accessToken } = useUserStore();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [currentUser]);

  const fetchOrders = async () => {
    try {
      const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/orders/myorders`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();

      if (data.success) {
        setOrders(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-amber-400">Loading your orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <Package size={80} className="mx-auto text-zinc-600 mb-6" />
        <h3 className="text-3xl font-bold mb-3">No Orders Yet</h3>
        <p className="text-zinc-400">When you place an order, it will appear here.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-4xl font-bold mb-8">My Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-zinc-900 border border-white/10 rounded-3xl p-6 hover:border-amber-500/30 transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-sm text-zinc-500">Order #{order._id.slice(-8).toUpperCase()}</p>
                <p className="text-sm text-zinc-400 mt-1">
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <span className={`px-4 py-1.5 text-xs font-medium rounded-full capitalize
                ${order.status === 'delivered' ? 'bg-green-500/20 text-green-400' : 
                  order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                  'bg-blue-500/20 text-blue-400'}`}>
                {order.status}
              </span>
            </div>

            {/* Items with Images */}
            <div className="space-y-5">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center border-b border-white/10 pb-4 last:border-0 last:pb-0">
                  <img
                    src={item.menu?.image || "/images/placeholder.jpg"}   // ← Fixed: Use menu.image
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-2xl flex-shrink-0 border border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{item.name}</p>
                    <p className="text-sm text-zinc-400">× {item.quantity}</p>
                  </div>
                  <div className="font-semibold text-amber-400 whitespace-nowrap">
                    Rs. {(item.price * item.quantity).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-5 mt-4 border-t border-white/10">
              <span className="text-zinc-400">Total Amount</span>
              <span className="text-2xl font-bold text-amber-400">Rs. {order.totalAmount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;