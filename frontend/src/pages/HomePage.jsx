'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Star, ShoppingCart, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useMenuStore } from "../store/Menu/Menu.js";
import { useUserStore } from "../store/Auth/User.js";
import { useCart } from "../store/Cart/Cart.js";

const RestaurantHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const { currentUser } = useUserStore();
  const { menus, getMenus } = useMenuStore();
  const { addToCart, cart } = useCart();

  // Cart count (only for logged-in users)
  const cartCount = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + (item.quantity ?? 1), 0)
    : 0;

  useEffect(() => {
    getMenus();
  }, [getMenus]);

  const handleAddToCart = (menu) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    addToCart(menu, 1);
    // toast.success(`${menu.name} added to cart!`); // Uncomment if using toast
  };

  const handleLoginToOrder = () => {
    navigate('/login');
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
            <a href="#menu" className="hover:text-amber-400 transition">Menu</a>
            <a href="#" className="hover:text-amber-400 transition">Reservation</a>
            <a href="/aboutus" className="hover:text-amber-400 transition">About Us</a>
            <Link to="/gallery" className="hover:text-amber-400 transition">Gallery</Link>
            <Link to="/contact" className="hover:text-amber-400 transition">Contact</Link>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <div className="hidden md:flex items-center gap-5">
            {/* Cart Icon - Only show if logged in */}
            {currentUser && (
              <Link to="/cart" className="relative group" aria-label="View cart">
                <ShoppingCart size={24} className="text-white group-hover:text-amber-400 transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

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
                <Link to="/login" className="border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black transition px-6 py-3 rounded-lg font-semibold text-sm tracking-wider">
                  LOGIN
                </Link>
                <Link to="/register" className="bg-amber-500 hover:bg-amber-400 transition text-black px-6 py-3 rounded-lg font-semibold text-sm tracking-wider shadow-lg shadow-amber-500/30">
                  REGISTER
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-white/10">
            <div className="flex flex-col px-6 py-6 space-y-5 text-sm uppercase tracking-widest">
              <a href="#menu" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-400">Menu</a>
              <a href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-400">Reservation</a>
              <a href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-400">About Us</a>
              <Link to="/gallery" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-400">Gallery</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-400">Contact</Link>

              {/* Cart in mobile menu - Only for logged in users */}
              {currentUser && (
                <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 hover:text-amber-400">
                  <ShoppingCart size={20} /> Cart ({cartCount})
                </Link>
              )}

              <div className="border-t border-zinc-700 pt-5">
                {currentUser ? (
                  <Link
                    to={currentUser.role === "admin" ? "/admindashboard" : "/useraccount"}
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-black py-3 rounded-lg font-semibold"
                  >
                    My Account
                  </Link>
                ) : (
                  <div className="space-y-3">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block text-center border border-amber-500 text-amber-400 py-3 rounded-lg">LOGIN</Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block text-center bg-amber-500 text-black py-3 rounded-lg font-semibold">REGISTER</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION - unchanged */}
      <section className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/images/b10.png')` }}>
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
              <a href="#menu" className="border-2 border-white/80 hover:border-white px-10 py-5 rounded-2xl font-medium text-lg transition">
                VIEW MENU
              </a>
            </div>
          </div>

          <div className="hidden md:flex justify-center items-center">
            <div className="relative">
              <div className="w-96 h-96 rounded-full overflow-hidden border-8 border-amber-400 shadow-2xl shadow-amber-500/30">
                <img src="/images/tree.png" alt="Our Chef" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="menu" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-amber-400 uppercase tracking-[5px] mb-3">Our Menu</p>
            <h2 className="text-5xl font-bold">Most Popular Dishes</h2>
            <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
              Fresh ingredients, authentic flavors, and dishes crafted with passion.
            </p>
          </div>

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
                    <h3 className="text-2xl font-bold">{menu.name}</h3>
                    <span className="text-amber-400 text-xl font-bold">Rs. {menu.price}</span>
                  </div>

                  <p className="text-zinc-400 mt-3 line-clamp-2">{menu.description}</p>

                  <div className="flex justify-between items-center mt-6">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" />
                      ))}
                    </div>

                    {currentUser ? (
                      <button
                        onClick={() => handleAddToCart(menu)}
                        className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-2.5 rounded-xl font-semibold transition flex items-center gap-2"
                      >
                        <ShoppingCart size={18} />
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        onClick={handleLoginToOrder}
                        className="bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-2.5 rounded-xl font-semibold transition flex items-center gap-2 border border-zinc-600"
                      >
                        <LogIn size={18} />
                        Login to Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RestaurantHome;