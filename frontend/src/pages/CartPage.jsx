"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../store/Cart/Cart.js";
import { useUserStore } from "../store/Auth/User.js";

export default function Cart() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useUserStore();
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

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
          <Link to="/" className="hover:text-amber-400 transition">
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
              className="text-amber-400 group-hover:text-amber-300 transition"
            />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
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
            <Link to="#menu" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-400">
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

            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 hover:text-amber-400"
            >
              <span className="relative">
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
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
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        {Navbar}
        <div className="max-w-3xl mx-auto text-center pt-48 pb-20 px-6">
          <h2 className="font-serif text-4xl font-bold mb-3">Your cart is empty</h2>
          <p className="text-zinc-400 mb-8">Browse our menu to add items.</p>
          <Link
            to="/"
            className="inline-block bg-amber-500 hover:bg-amber-400 transition text-black px-8 py-3 rounded-lg font-semibold text-sm tracking-wider shadow-lg shadow-amber-500/30"
          >
            BROWSE MENU
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {Navbar}

      <div className="max-w-6xl mx-auto pt-32 pb-20 px-6">
        <h2 className="font-serif text-4xl font-bold mb-8">Your Shopping Cart</h2>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Cart Items List */}
          <div className="w-full lg:w-2/3 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-zinc-900 border border-white/10 rounded-2xl p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                  />

                  <div className="flex-1 min-w-[140px]">
                    <h5 className="font-semibold text-white">{item.name}</h5>
                    <small className="text-zinc-400">
                      ${Number(item.price).toFixed(2)} each
                    </small>
                  </div>

                  <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                    <button
                      className="px-3 py-2 text-white hover:bg-white/10 transition"
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 py-2 text-center bg-black/40 min-w-[3rem]">
                      {item.quantity}
                    </span>
                    <button
                      className="px-3 py-2 text-white hover:bg-white/10 transition"
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 ml-auto">
                    <span className="font-bold text-amber-400">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      className="text-zinc-400 hover:text-red-500 transition"
                      onClick={() => removeFromCart(item._id)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 sticky top-24">
              <h4 className="font-serif text-2xl font-bold mb-4">Order Summary</h4>

              <div className="flex justify-between mb-2 text-zinc-300">
                <span>Subtotal</span>
                <span className="font-semibold text-white">
                  ${getCartTotal().toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between mb-4 text-zinc-300">
                <span>Delivery</span>
                <span className="text-green-400 font-medium">Free</span>
              </div>

              <hr className="border-white/10 mb-4" />

              <div className="flex justify-between mb-6 text-lg font-bold">
                <span>Total</span>
                <span className="text-amber-400">${getCartTotal().toFixed(2)}</span>
              </div>

              <button className="w-full bg-amber-500 hover:bg-amber-400 transition text-black py-3 rounded-lg font-semibold text-sm tracking-wider shadow-lg shadow-amber-500/30">
                Proceed to Checkout
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}