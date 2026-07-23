"use client";

import React, { useState } from "react";
import { Menu, X, Phone, MapPin, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useUserStore } from "../store/Auth/User.js";

const ContactUs = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useUserStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire this up to backend endpoint
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-15 h-8 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
              <img src="/images/tree.png" alt="Our Chef" />
            </div>
            <div className="font-serif text-3xl tracking-tight">TREESFOOD</div>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm uppercase tracking-widest">
            <Link to="/" className="hover:text-amber-400 transition">
              Menu
            </Link>
            <Link to="/reservation" className="hover:text-amber-400 transition">
              Reservation
            </Link>
            <Link to="/aboutus" className="hover:text-amber-400 transition">
              About Us
            </Link>
            <Link to="/gallery" className="hover:text-amber-400 transition">
              Gallery
            </Link>
            <Link to="/contact" className="text-amber-400 transition">
              Contact
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <>
                <span className="text-white text-sm">
                  Welcome,{" "}
                  <span className="text-amber-400 font-semibold">
                    {currentUser.name}
                  </span>
                </span>

                <Link
                  to={
                    currentUser.role === "admin"
                      ? "/admindashboard"
                      : "/useraccount"
                  }
                  className="bg-amber-500 hover:bg-amber-400 transition text-black px-6 py-3 rounded-lg font-semibold text-sm tracking-wider shadow-lg shadow-amber-500/30"
                >
                  My Account
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black transition px-6 py-3 rounded-lg font-semibold text-sm tracking-wider"
                >
                  LOGIN
                </Link>

                <Link
                  to="/register"
                  className="bg-amber-500 hover:bg-amber-400 transition text-black px-6 py-3 rounded-lg font-semibold text-sm tracking-wider shadow-lg shadow-amber-500/30"
                >
                  REGISTER
                </Link>
              </>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-white/10">
            <div className="flex flex-col px-6 py-6 space-y-5 text-sm uppercase tracking-widest">
              <Link
                to="/#menu"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-amber-400"
              >
                Menu
              </Link>

              <a
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-amber-400"
              >
                Reservation
              </a>

              <a
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-amber-400"
              >
                About Us
              </a>

              <a
                href="#gallery"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-amber-400"
              >
                Gallery
              </a>

              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-amber-400"
              >
                Contact
              </Link>

              <div className="border-t border-zinc-700 pt-5">
                {currentUser ? (
                  <>
                    <p className="mb-4 text-white">
                      Welcome{" "}
                      <span className="text-amber-400 font-semibold">
                        {currentUser.name}
                      </span>
                    </p>

                    <Link
                      to={
                        currentUser.role === "admin"
                          ? "/admindashboard"
                          : "/useraccount"
                      }
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-black py-3 rounded-lg font-semibold"
                    >
                      My Account
                    </Link>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-center border border-amber-500 text-amber-400 py-3 rounded-lg"
                    >
                      LOGIN
                    </Link>

                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-center bg-amber-500 text-black py-3 rounded-lg font-semibold"
                    >
                      REGISTER
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section
        className="relative min-h-[60vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/b10.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-16 text-center w-full">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-6 py-2.5 rounded-full text-sm tracking-widest border border-white/20 mb-8">
            📞 GET IN TOUCH
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-none tracking-tighter">
            CONTACT
            <br />
            <span className="text-amber-400">US</span>
          </h1>

          <p className="text-xl text-white max-w-lg mx-auto mt-8">
            Have a question, feedback, or want to book a table? We'd love to
            hear from you.
          </p>
        </div>
      </section>

      {/* CONTACT INFO + FORM */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-amber-400 uppercase tracking-[5px] mb-3">
              Reach Out
            </p>

            <h2 className="text-5xl font-bold">We're Here To Help</h2>

            <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
              Reach out to us through any of the channels below, or send us a
              message directly.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Contact details + map */}
            <div className="space-y-8">
              <div className="bg-zinc-900 rounded-3xl p-8 shadow-xl space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-amber-400" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <a
                      href="tel:+94112183803"
                      className="text-zinc-400 hover:text-amber-400 transition"
                    >
                      011 218 3803
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="text-amber-400"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.877h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Facebook</h3>
                    <a
                      href="https://www.facebook.com/treesfoodresturant/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-amber-400 transition break-all"
                    >
                      facebook.com/treesfoodresturant
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-amber-400" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Location</h3>
                    <p className="text-zinc-400">Trees Food Restaurant</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="text-amber-400" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Opening Hours</h3>
                    <p className="text-zinc-400">
                      Everyday: 10:00 AM - 10:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Map embed */}
              <div className="rounded-3xl overflow-hidden border border-zinc-800 shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.507709441601!2d79.95931267476047!3d6.829561619531495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae251b16287a801%3A0x4f9d5870b909ae76!2sTrees%20Food!5e0!3m2!1sen!2slk!4v1783013998086!5m2!1sen!2slk"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Trees Food Location"
                ></iframe>
              </div>
            </div>

            {/* Right: Contact form */}
            <div className="bg-zinc-900 rounded-3xl p-8 md:p-10 shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Send Us A Message</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white focus:border-amber-500 outline-none"
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white focus:border-amber-500 outline-none"
                  required
                />

                <textarea
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white focus:border-amber-500 outline-none resize-none"
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 transition py-4 rounded-xl text-black font-bold"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
