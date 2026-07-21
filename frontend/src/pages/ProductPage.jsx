"use client";

import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect,useRef } from 'react';
import { useParams } from "react-router-dom";
import { Menu, X, ChevronLeft, ChevronRight, Expand, Star, Utensils,ShoppingCart } from "lucide-react";
import { useMenuStore } from "../store/Menu/Menu.js";
import { useUserStore } from "../store/Auth/User.js";
import { useCart } from "../store/Cart/Cart.js";

export const Product = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useUserStore();
  const { id } = useParams();
  const { menus, getMenus, getProduct } = useMenuStore();
  const { addToCart, cart } = useCart();
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  
  const normalizedId = id?.toString();
  const product = menus.find((item) => String(item._id ?? item.id ?? "") === normalizedId);

  const cartCount = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + (item.quantity ?? 1), 0)
    : 0;

  useEffect(() => {
    if (menus.length === 0) {
      getMenus();
    }

    if (normalizedId) {
      getProduct(normalizedId);
    }
  }, [normalizedId, getProduct, getMenus, menus.length]);


    const scrollSlider = (direction) => {
    if (!sliderRef.current) return;
    const scrollAmount = 320;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };
  const handleNavigate = (id) => {
    navigate(`/product/${id}`);
  };
  // Pick a rotating subset for "recommended" — swap for real logic (e.g. same category) if you have it
  const recommended = menus ? [...menus].slice(0, 10) : [];

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-3 text-zinc-400">Loading details...</p>
      </div>
    );
  }

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
            <Link to="/menu" className="hover:text-amber-400 transition">
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

          <div className="hidden md:flex items-center gap-5">
            {/* Cart Icon */}
            <Link to="/cart" className="relative group" aria-label="View cart">
              <ShoppingCart
                size={24}
                className="text-white group-hover:text-amber-400 transition"
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

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

              {/* Cart Link (mobile) */}
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 hover:text-amber-400"
              >
                <span className="relative">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </span>
                Cart
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

      {/* Product Section — matched to dark/amber theme */}
      <div className="max-w-6xl mx-auto pt-32 pb-20 px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center bg-zinc-900 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">

          {/* Left Column: Product Info */}
          <div className="w-full md:w-1/2 order-2 md:order-1">
            {/* Category Tag */}
            <span className="inline-block rounded-full bg-amber-500/10 text-amber-400 px-3 py-2 text-sm font-semibold mb-4 border border-amber-500/30 uppercase tracking-widest">
              {product.category || "Category"}
            </span>

            {/* Name & Description */}
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              {product.name}
            </h1>
            <p className="text-lg text-zinc-400 mb-6">{product.description}</p>

            {/* Price */}
            <h3 className="text-3xl text-amber-400 font-bold mb-6">
              ${Number(product.price).toFixed(2)}
            </h3>

            {/* Availability and Cart Button Row */}
            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <div className="flex items-center">
                <span className="relative inline-flex items-center mr-2">
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="h-3 w-3"></span>
                </span>
                <span className="text-green-400 font-medium ml-3">Available in Stock</span>
              </div>

              <button
                onClick={() => addToCart(product, 1)}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 transition text-black text-base px-6 py-3 rounded-lg font-semibold tracking-wider shadow-lg shadow-amber-500/30"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Right Column: Full Image */}
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <div className="aspect-square overflow-hidden rounded-2xl shadow-lg bg-zinc-800 border border-white/10">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>

            {/* You Might Also Like — Slider */}
      {recommended.length > 0 && (
        <section className="pb-24 bg-black text-white">
          <div className="max-w-7xl mx-auto px-6">

            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-amber-400 uppercase tracking-[5px] mb-2 text-sm">
                  Recommended
                </p>
                <h2 className="text-3xl md:text-4xl font-bold">
                  You Might Also Like
                </h2>
              </div>

              <div className="hidden sm:flex items-center gap-3">
                <button
                  onClick={() => scrollSlider("left")}
                  className="w-11 h-11 flex items-center justify-center rounded-full border border-white/20 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => scrollSlider("right")}
                  className="w-11 h-11 flex items-center justify-center rounded-full border border-white/20 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {recommended.map((item) => (
                <div
                  key={item._id}
                  className="group relative flex-shrink-0 w-64 sm:w-72 snap-start bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:-translate-y-1 transition duration-300"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <button
                      onClick={() => handleNavigate(item._id)}
                      className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 backdrop-blur text-white opacity-0 group-hover:opacity-100 transition"
                      aria-label="View details"
                    >
                      <Expand size={16} />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-semibold text-white leading-snug line-clamp-1">
                        {item.name}
                      </h4>
                      <span className="text-amber-400 font-bold text-sm whitespace-nowrap">
                        Rs. {item.price}
                      </span>
                    </div>

                    <div className="flex text-amber-400 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" />
                      ))}
                    </div>

                    <button
                      onClick={() => handleNavigate(item._id)}
                      className="w-full mt-4 bg-amber-500 hover:bg-amber-400 text-black py-2 rounded-lg text-sm font-semibold transition"
                    >
                      Order
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile arrows below slider */}
            <div className="flex sm:hidden items-center justify-center gap-4 mt-6">
              <button
                onClick={() => scrollSlider("left")}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-white/20 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollSlider("right")}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-white/20 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>

          </div>
        </section>
      )}
    </div>
  );
};

export default Product;