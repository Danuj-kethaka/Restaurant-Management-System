'use client';

import React, { useState } from 'react';
import { Menu, X, Star, Users, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserStore } from "../store/Auth/User.js";

const AboutUs = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useUserStore();

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
            <Link to="/#menu" className="hover:text-amber-400 transition">Menu</Link>
            <a href="#" className="hover:text-amber-400 transition">Reservation</a>
            <Link to="/about" className="text-amber-400 transition">About Us</Link>
            <Link to="/gallery" className="hover:text-amber-400 transition">Gallery</Link>
            <Link to="/contact" className="hover:text-amber-400 transition">Contact</Link>
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
              <Link to="/#menu" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-400">Menu</Link>
              <a href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-400">Reservation</a>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-amber-400">About Us</Link>
              <Link to="/gallery" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-400">Gallery</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-400">Contact</Link>

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

      {/* HERO SECTION */}
      <section 
        className="relative min-h-[70vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/b10.png')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-6 py-2.5 rounded-full text-sm tracking-widest border border-white/20 mb-6">
            🌳 OUR STORY
          </div>
          <h1 className="text-6xl md:text-7xl font-bold leading-none tracking-tighter">
            ABOUT<br />
            <span className="text-amber-400">TREESFOOD</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mt-8">
            Where passion for food meets tradition and warmth.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold leading-tight">
                A Family Legacy<br />Since 2015
              </h2>
              <p className="text-zinc-400 mt-6 text-lg leading-relaxed">
                TreesFood was born from a simple dream — to bring people together through exceptional food made with love, fresh ingredients, and time-honored recipes.
              </p>
              <p className="text-zinc-400 mt-4 text-lg leading-relaxed">
                What started as a small family restaurant has grown into one of the most beloved dining destinations in the area, while still holding true to our roots.
              </p>
            </div>

            <div className="relative">
              <img 
                src="/images/tree.png" 
                alt="Our Restaurant" 
                className="rounded-3xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-amber-500 text-black p-6 rounded-2xl shadow-xl max-w-[220px]">
                <div className="flex items-center gap-3">
                  <Award className="w-10 h-10" />
                  <div>
                    <div className="font-bold text-2xl">9+</div>
                    <div className="text-sm">Years of Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES / WHY US */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-amber-400 uppercase tracking-[5px] mb-3">OUR PROMISE</p>
            <h2 className="text-5xl font-bold">What Makes Us Special</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 rounded-3xl p-10 text-center hover:-translate-y-2 transition">
              <div className="w-20 h-20 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Users className="text-amber-400" size={40} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Warm Hospitality</h3>
              <p className="text-zinc-400">Every guest is treated like family. Our team is dedicated to making your dining experience memorable.</p>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-10 text-center hover:-translate-y-2 transition">
              <div className="w-20 h-20 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Star className="text-amber-400" size={40} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Fresh & Quality</h3>
              <p className="text-zinc-400">We source the finest ingredients daily and prepare every dish with care and passion.</p>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-10 text-center hover:-translate-y-2 transition">
              <div className="w-20 h-20 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="text-amber-400" size={40} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Authentic Flavors</h3>
              <p className="text-zinc-400">Blending traditional recipes with modern techniques to create unforgettable meals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CHEF / TEAM */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-4">Meet Our Chef</h2>
          <p className="text-zinc-400 max-w-xl mx-auto mb-12">
            With over 15 years of experience, Chef brings creativity and tradition together in every plate.
          </p>

          <div className="max-w-md mx-auto">
            <div className="w-80 h-80 mx-auto rounded-full overflow-hidden border-8 border-amber-500 shadow-2xl">
              <img 
                src="/images/chef.jpg" 
                alt="Our Chef" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-semibold">Chef Nuwan Silva</h3>
              <p className="text-amber-400">Head Chef & Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-zinc-950 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience TreesFood?</h2>
          <p className="text-zinc-400 mb-10 text-lg">Join us for an unforgettable dining experience.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/#menu" 
              className="bg-amber-500 hover:bg-amber-400 text-black px-10 py-4 rounded-2xl font-semibold text-lg transition"
            >
              View Our Menu
            </Link>
            <a 
              href="#"
              className="border border-white/70 hover:border-white px-10 py-4 rounded-2xl font-semibold text-lg transition"
            >
              Book a Table
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;