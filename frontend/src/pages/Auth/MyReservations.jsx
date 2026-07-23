import React, { useState, useEffect } from "react";
import { useUserStore } from "../../store/Auth/User.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Calendar, Clock, Users, CheckCircle, XCircle } from "lucide-react";

const MyReservations = () => {
  const { currentUser, accessToken } = useUserStore();
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    fetchReservations();
  }, [currentUser]);

  const fetchReservations = async () => {
    try {
      const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/reservations/myreservations`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();

      if (data.success) {
        setReservations(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-amber-400">Loading your reservations...</div>;
  }

  if (reservations.length === 0) {
    return (
      <div className="text-center py-20">
        <Calendar size={80} className="mx-auto text-zinc-600 mb-6" />
        <h3 className="text-3xl font-bold mb-3">No Reservations Yet</h3>
        <p className="text-zinc-400">When you book a table, it will appear here.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-4xl font-bold mb-8">My Reservations</h2>

      <div className="space-y-6">
        {reservations.map((res) => (
          <div
            key={res._id}
            className="bg-zinc-900 border border-white/10 rounded-3xl p-6 hover:border-amber-500/30 transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-sm text-zinc-500">Reservation #{res._id.slice(-8).toUpperCase()}</p>
                <p className="text-xl font-semibold mt-2 text-white">
                  {new Date(res.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-amber-400 text-lg mt-1 flex items-center gap-2">
                  <Clock size={18} /> {res.time}
                </p>
              </div>

              <span className={`px-5 py-2 text-sm font-medium rounded-full capitalize flex items-center gap-2
                ${res.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 
                  res.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                  'bg-red-500/20 text-red-400'}`}>
                {res.status === 'confirmed' && <CheckCircle size={18} />}
                {res.status === 'cancelled' && <XCircle size={18} />}
                {res.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-zinc-400">Guests</p>
                <p className="font-semibold text-lg text-white flex items-center gap-2">
                  <Users size={20} /> {res.guests} People
                </p>
              </div>
              <div>
                <p className="text-zinc-400">Contact</p>
                <p className="font-medium text-white">{res.phone}</p>
              </div>
              <div>
                <p className="text-zinc-400">Booked On</p>
                <p className="font-medium text-white">
                  {new Date(res.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {res.specialRequest && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-zinc-400 text-sm">Special Request</p>
                <p className="text-zinc-300 mt-1">{res.specialRequest}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReservations;