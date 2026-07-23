import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Calendar, Clock, Users, ArrowLeft } from "lucide-react";
import { useUserStore } from "../store/Auth/User.js";
import { useCart } from "../store/Cart/Cart.js";
import toast from "react-hot-toast";

const Reservation = () => {
  const { currentUser, accessToken } = useUserStore();
  const { cart } = useCart();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "2",
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: "",
    specialRequest: "",
  });
  const [loading, setLoading] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error("Please login to make a reservation");
      navigate("/login");
      return;
    }

    if (!accessToken) {
      toast.error("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,   // ← This is the fix
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("🎉 Reservation Confirmed! We look forward to seeing you.");
        setTimeout(() => navigate("/"), 2500);
      } else {
        toast.error(data.message || "Failed to book table");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ==================== NAVBAR (Same as Home) ====================
  const Navbar = (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-15 h-8 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
            <img src="/images/tree.png" alt="Our Chef" />
          </div>
          <div className="font-serif text-3xl tracking-tight">TREESFOOD</div>
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm uppercase tracking-widest">
          <Link to="/" className="hover:text-amber-400 transition">Menu</Link>
          <Link to="/reservation" className="text-amber-400">Reservation</Link>
          <Link to="/aboutus" className="hover:text-amber-400 transition">About Us</Link>
          <Link to="/gallery" className="hover:text-amber-400 transition">Gallery</Link>
          <Link to="/contact" className="hover:text-amber-400 transition">Contact</Link>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden md:flex items-center gap-5">
          {currentUser && (
            <Link to="/cart" className="relative group">
              <ShoppingCart size={24} className="text-amber-400 group-hover:text-amber-300 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {currentUser ? (
            <Link
              to={currentUser.role === "admin" ? "/admindashboard" : "/useraccount"}
              className="bg-amber-500 hover:bg-amber-400 transition text-black px-6 py-3 rounded-lg font-semibold text-sm tracking-wider"
            >
              My Account
            </Link>
          ) : (
            <>
              <Link to="/login" className="border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black transition px-6 py-3 rounded-lg font-semibold text-sm tracking-wider">LOGIN</Link>
              <Link to="/register" className="bg-amber-500 hover:bg-amber-400 transition text-black px-6 py-3 rounded-lg font-semibold text-sm tracking-wider">REGISTER</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10">
          <div className="flex flex-col px-6 py-6 space-y-5 text-sm uppercase tracking-widest">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Menu</Link>
            <Link to="/reservation" onClick={() => setIsMenuOpen(false)} className="text-amber-400">Reservation</Link>
            <Link to="/aboutus" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            
            {currentUser && (
              <Link to="/cart" onClick={() => setIsMenuOpen(false)}>Cart ({cartCount})</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {Navbar}

      {/* Hero Section - Inside Restaurant Feel */}
      <div className="relative h-[85vh] bg-cover bg-center" 
           style={{ backgroundImage: "url('/images/table.webp')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black"></div>
        
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-7xl font-serif font-bold tracking-tighter mb-6">
              Reserve Your Table
            </h1>
            <p className="text-2xl text-amber-300">Step into an unforgettable dining experience</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-10 pb-24">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Visual Gallery */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img src="/images/t2.jpg" alt="Elegant Dining" className="w-full h-[420px] object-cover" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img src="/images/t3.webp" alt="Table Setting" className="w-full h-72 object-cover" />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img src="/images/t5.jpg" alt="Warm Ambiance" className="w-full h-72 object-cover" />
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-900/95 backdrop-blur-lg border border-white/10 rounded-3xl p-10 lg:p-14">
              <h2 className="text-4xl font-serif font-bold mb-8">Book Your Table</h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-3">Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required
                      className="w-full bg-black border border-white/20 rounded-2xl px-6 py-5 focus:border-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-3">Time</label>
                    <select name="time" value={formData.time} onChange={handleChange} required
                      className="w-full bg-black border border-white/20 rounded-2xl px-6 py-5 focus:border-amber-500 outline-none">
                      <option value="">Select Time</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="21:00">9:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-3">Guests</label>
                    <select name="guests" value={formData.guests} onChange={handleChange}
                      className="w-full bg-black border border-white/20 rounded-2xl px-6 py-5 focus:border-amber-500 outline-none">
                      {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Guests</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-3">Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                      className="w-full bg-black border border-white/20 rounded-2xl px-6 py-5 focus:border-amber-500 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-3">Special Request</label>
                  <textarea name="specialRequest" value={formData.specialRequest} onChange={handleChange} rows={4}
                    placeholder="Anniversary, dietary needs, window seat, etc."
                    className="w-full bg-black border border-white/20 rounded-2xl px-6 py-5 focus:border-amber-500 outline-none" />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black py-6 rounded-2xl font-semibold text-xl transition disabled:opacity-70">
                  {loading ? "Reserving Table..." : "Confirm Reservation"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;