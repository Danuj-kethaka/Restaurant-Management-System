"use client";

import { Menu, X, ChevronLeft, ChevronRight, Expand, Star, Utensils } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useMenuStore } from "../store/Menu/Menu.js";
import { useUserStore } from "../store/Auth/User.js";

const MenuPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useUserStore();
  const { menus, getMenus } = useMenuStore();
  const navigate = useNavigate();

  useEffect(() => {
    getMenus();
  }, [getMenus]);

  const handleNavigate = (id) => {
    navigate(`/product/${id}`);
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
            <Link to="/#menu" className="hover:text-amber-400 transition">
              Menu
            </Link>
            <a href="#" className="hover:text-amber-400 transition">
              Reservation
            </a>
            <a href="#" className="hover:text-amber-400 transition">
              About Us
            </a>
            <Link to="/gallery" className="hover:text-amber-400 transition">
              Gallery
            </Link>
            <Link to="/contact" className="hover:text-amber-400 transition">
              Contact
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
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
              <Link to="/#menu" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-400">
                Menu
              </Link>
              <a href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-400">
                Reservation
              </a>
              <a href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-400">
                About Us
              </a>
              <Link to="/gallery" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-400">
                Gallery
              </Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-400">
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

      <section id="menu" className="py-24 bg-black text-white">
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

          {!menus || menus.length === 0 ? (
            <div className="text-center py-16 bg-zinc-900/50 rounded-3xl border border-zinc-800 max-w-xl mx-auto px-6">
              <Utensils className="mx-auto text-zinc-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-zinc-300">No items available</h3>
              <p className="text-zinc-500 mt-2 text-sm">
                Our kitchen is preparing something delicious. Please check back shortly!
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {menus.map((menu) => (
                <div
                  key={menu._id}
                  className="bg-zinc-900 rounded-3xl overflow-hidden hover:-translate-y-2 transition duration-300 shadow-xl"
                >
                  <img
                    src={menu.image}
                    alt={menu.name}
                    className="h-60 w-full object-cover"
                  />

                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold">
                        {menu.name}
                      </h3>
                      <span className="text-amber-400 text-xl font-bold">
                        Rs. {menu.price}
                      </span>
                    </div>

                    <p className="text-zinc-400 mt-3 line-clamp-2">
                      {menu.description}
                    </p>

                    <div className="flex justify-between items-center mt-6">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            fill="currentColor"
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => handleNavigate(menu._id)}
                        className="bg-amber-500 hover:bg-amber-400 text-black px-5 py-2 rounded-xl font-semibold transition"
                      >
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MenuPage;