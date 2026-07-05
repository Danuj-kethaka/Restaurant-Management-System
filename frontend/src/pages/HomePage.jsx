'use client';

import React, { useState } from 'react';
import { Menu, X, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { useUserStore } from "../store/Auth/User.js";

const RestaurantHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useUserStore();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-15 h-8 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
               <img 
                  src="/images/tree.png" 
                  alt="Our Chef" 
                />
            </div>
            <div className="font-serif text-3xl tracking-tight">TREESFOOD</div>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm uppercase tracking-widest">
            <a href="#menu" className="hover:text-amber-400 transition">Menu</a>
            <a href="#" className="hover:text-amber-400 transition">Reservation</a>
            <a href="#" className="hover:text-amber-400 transition">About Us</a>
<<<<<<< Updated upstream
            <a href="#" className="hover:text-amber-400 transition">Gallery</a>
            <a href="#" className="hover:text-amber-400 transition">Contact</a>
=======
            <Link to="/gallery" className="hover:text-amber-400 transition">Gallery</Link>
            {/* <a href="#" className="hover:text-amber-400 transition">Contact</a> */}
            <Link to="/contact" className="hover:text-amber-400 transition">Contact</Link>
>>>>>>> Stashed changes
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
                    to={currentUser.role === "admin" ? "/admindashboard" : "/useraccount"}
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

                <a
                    href="#menu"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-amber-400"
                >
                    Menu
                </a>

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

                <Link
                    to="/gallery"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-amber-400"
                >
                    Gallery
                </Link>

                <a
                    href="#contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-amber-400"
                >
                    Contact
                </a>

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
                        to={currentUser.role === "admin" ? "/admindashboard" : "/useraccount"}
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

      {/* HERO SECTION WITH VIBRANT BACKGROUND */}
      <section 
        className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/b10.png')`
        }}
      >

        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-6 py-2.5 rounded-full text-sm tracking-widest border border-white/20">
              🍽️ FINE DINING
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold leading-none tracking-tighter">
              BEST QUALITY<br />
              <span className="text-amber-400">FOOD</span>
            </h1>
            
            <p className="text-xl text-white max-w-lg">
              Fresh ingredients. Masterful preparation. Unforgettable dining experience.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-amber-500 hover:bg-amber-400 transition-all text-black px-10 py-5 rounded-2xl font-semibold text-lg shadow-lg shadow-amber-500/50">
                BOOK A TABLE
              </button>
              <button className="border-2 border-white/80 hover:border-white px-10 py-5 rounded-2xl font-medium text-lg transition">
                VIEW MENU
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-amber-400 fill-current" size={26} />
                ))}
              </div>
              <div>
                <div className="font-medium">4.9 Exceptional</div>
                <div className="text-sm text-white/80">Over 1200+ happy guests</div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-center items-center">
            <div className="relative">
              <div className="w-96 h-96 rounded-full overflow-hidden border-8 border-amber-400 shadow-2xl shadow-amber-500/30">
                <img 
                  src="/images/tree.png" 
                  alt="Our Chef" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -inset-6 border border-white/30 rounded-full"></div>
              <div className="absolute -inset-12 border border-amber-400/30 rounded-full"></div>
            </div>
          </div>
        </div>

      </section>
      
      <section id="menu" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">

            <div className="text-center mb-16">
            <p className="text-amber-400 uppercase tracking-[5px] mb-3">
                Our Menu
            </p>

            <h2 className="text-5xl font-bold">
                Most Popular Dishes
            </h2>

            <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
                Fresh ingredients, authentic flavors, and dishes crafted with passion.
            </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Card 1 */}
            <div className="bg-zinc-900 rounded-3xl overflow-hidden hover:-translate-y-2 transition duration-300 shadow-xl">

                <img
                src="/images/b2.webp"
                alt="Chicken Biryani"
                className="h-60 w-full object-cover"
                />

                <div className="p-6">

                <div className="flex justify-between items-center">

                    <h3 className="text-2xl font-bold">
                    Chicken Nasigurani
                    </h3>

                    <span className="text-amber-400 text-xl font-bold">
                    Rs.1200
                    </span>

                </div>

                <p className="text-zinc-400 mt-3">
                    Aromatic basmati rice with spicy chicken and traditional spices.
                </p>

                <div className="flex justify-between items-center mt-6">

                    <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" />
                    ))}
                    </div>

                    <button className="bg-amber-500 hover:bg-amber-400 text-black px-5 py-2 rounded-xl font-semibold">
                    Order
                    </button>

                </div>
                </div>

            </div>

            {/* Card 2 */}
            <div className="bg-zinc-900 rounded-3xl overflow-hidden hover:-translate-y-2 transition duration-300 shadow-xl">

                <img
                src="/images/ch.avif"
                alt="Butter Chicken"
                className="h-60 w-full object-cover"
                />

                <div className="p-6">

                <div className="flex justify-between">
                    <h3 className="text-2xl font-bold">
                    Chicken Kottu
                    </h3>

                    <span className="text-amber-400 text-xl font-bold">
                    Rs.1450
                    </span>
                </div>

                <p className="text-zinc-400 mt-3">
                    Creamy tomato curry served with fresh naan bread.
                </p>

                <div className="flex justify-between items-center mt-6">

                    <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" />
                    ))}
                    </div>

                    <button className="bg-amber-500 hover:bg-amber-400 text-black px-5 py-2 rounded-xl font-semibold">
                    Order
                    </button>

                </div>

                </div>

            </div>

            {/* Card 3 */}
            <div className="bg-zinc-900 rounded-3xl overflow-hidden hover:-translate-y-2 transition duration-300 shadow-xl">

                <img
                src="/images/noo3.jpg"
                alt="Grilled Steak"
                className="h-60 w-full object-cover"
                />

                <div className="p-6">

                <div className="flex justify-between">
                    <h3 className="text-2xl font-bold">
                    Noodles
                    </h3>

                    <span className="text-amber-400 text-xl font-bold">
                    Rs.2800
                    </span>
                </div>

                <p className="text-zinc-400 mt-3">
                    Premium grilled beef steak with vegetables and sauce.
                </p>

                <div className="flex justify-between items-center mt-6">

                    <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" />
                    ))}
                    </div>

                    <button className="bg-amber-500 hover:bg-amber-400 text-black px-5 py-2 rounded-xl font-semibold">
                    Order
                    </button>

                </div>

                </div>

            </div>

            </div>

            <div className="text-center mt-14">
            <button className="bg-amber-500 hover:bg-amber-400 text-black px-10 py-4 rounded-2xl text-lg font-bold">
                View Full Menu
            </button>
            </div>

        </div>
      </section>

    </div>
  );
};

export default RestaurantHome;