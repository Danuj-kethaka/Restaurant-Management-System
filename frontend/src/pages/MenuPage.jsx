"use client";

import { Menu, X, ChevronLeft, ChevronRight, Expand, Star, Utensils } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useMenuStore } from "../store/Menu/Menu.js";
import { useUserStore } from "../store/Auth/User.js";

const MenuPage = () => {
  const { menus, getMenus } = useMenuStore();
  const navigate = useNavigate();

  useEffect(() => {
    getMenus();
  }, [getMenus]);

  const handleNavigate = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
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

          {/* ADDED: Null or Empty Array Check */}
          {!menus || menus.length === 0 ? (
            <div className="text-center py-16 bg-zinc-900/50 rounded-3xl border border-zinc-800 max-w-xl mx-auto px-6">
              <Utensils className="mx-auto text-zinc-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-zinc-300">No items available</h3>
              <p className="text-zinc-500 mt-2 text-sm">
                Our kitchen is preparing something delicious. Please check back shortly!
              </p>
            </div>
          ) : (
            /* Menu Grid displays only if items exist */
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
    </>
  );
};

export default MenuPage;
