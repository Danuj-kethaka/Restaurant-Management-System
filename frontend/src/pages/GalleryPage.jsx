"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronLeft, ChevronRight, Expand, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/Auth/User.js";

const galleryItems = [
  { src: "/images/b1.jpg", title: "Signature Platter", category: "Dishes" },
  { src: "/images/i.jpg", title: "Breakfast", category: "Dishes" },
  { src: "/images/b2.webp", title: "Chicken Nasigurani", category: "Dishes" },
  { src: "/images/Special.jpg", title: "Chef's Special", category: "Dishes" },
  { src: "/images/b10.png", title: "Fine Dining Ambience", category: "Ambience" },
  { src: "/images/ch.avif", title: "Chicken Kottu", category: "Dishes" },
  { src: "/images/curry.jpeg", title: "Traditional Rice & Curry", category: "Dishes" },
  { src: "/images/a.jpg", title: "Hoppers", category: "Dishes" },
  { src: "/images/t.webp", title: "Shorteats", category: "Dishes" },
  { src: "/images/noo.avif", title: "Noodles Bowl", category: "Dishes" },
  { src: "/images/hot mushroom.jpg", title: "Hot Butter Mushroom", category: "Dishes" },
  { src: "/images/soup.jpg", title: "Signature Soup", category: "Dishes" },
  { src: "/images/c.jpg", title: "devilled chilli", category: "Ambience" },
  { src: "/images/Chicken pasta.jpg", title: "Creamy Chicken Pasta", category: "Dishes" },
];

const categories = ["All", "Dishes", "Ambience"];

const GalleryPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useUserStore();

  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [likedImages, setLikedImages] = useState(new Set());

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const showNext = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const toggleLike = (index, e) => {
    e.stopPropagation();
    const newLiked = new Set(likedImages);
    if (newLiked.has(index)) {
      newLiked.delete(index);
    } else {
      newLiked.add(index);
    }
    setLikedImages(newLiked);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar - Consistent with other pages */}
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
            <Link to="/reservation" className="hover:text-amber-400 transition">Reservation</Link>
            <Link to="/aboutus" className="hover:text-amber-400 transition">About Us</Link>
            <Link to="/gallery" className="text-amber-400 transition">Gallery</Link>
            <Link to="/contact" className="hover:text-amber-400 transition">Contact</Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <>
                <span className="text-white text-sm">
                  Welcome, <span className="text-amber-400 font-semibold">{currentUser.name}</span>
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
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-400">Menu</Link>
              <Link to="/reservation" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-400">Reservation</Link>
              <Link to="/aboutus" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-400">About Us</Link>
              <Link to="/gallery" onClick={() => setIsMenuOpen(false)} className="text-amber-400">Gallery</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-400">Contact</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Header */}
      <section className="pt-40 pb-20 px-6 text-center bg-gradient-to-b from-black to-zinc-950">
        <p className="text-amber-400 uppercase tracking-[5px] mb-3">Moments Worth Remembering</p>
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter">
          Our <span className="text-amber-400">Gallery</span>
        </h1>
        <p className="text-zinc-400 mt-6 max-w-2xl mx-auto text-lg">
          From sizzling plates to warm smiles — every frame tells a story of passion and flavor.
        </p>
      </section>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto px-6 flex justify-center gap-4 flex-wrap pb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-8 py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all ${
              activeCategory === category
                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/40"
                : "border border-white/30 hover:border-amber-400 hover:text-amber-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.src}
              onClick={() => openLightbox(index)}
              className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={item.src}
                alt={item.title}
                className="h-80 w-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

              {/* Like Button */}
              <button
                onClick={(e) => toggleLike(index, e)}
                className="absolute top-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-full text-white hover:text-red-500 transition z-10"
              >
                <Heart
                  size={20}
                  className={likedImages.has(index) ? "fill-red-500 text-red-500" : ""}
                />
              </button>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-amber-400 text-xs uppercase tracking-widest mb-1">
                  {item.category}
                </p>
                <h3 className="text-xl font-bold">{item.title}</h3>
              </div>

              {/* Hover Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <Expand className="text-white" size={42} />
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="text-center text-zinc-400 text-xl mt-20">No images found in this category.</p>
        )}
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center px-4"
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-8 right-8 text-white hover:text-amber-400 z-50">
            <X size={40} />
          </button>

          <button onClick={showPrev} className="absolute left-6 md:left-12 text-white hover:text-amber-400 z-50">
            <ChevronLeft size={50} />
          </button>

          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={filteredItems[lightboxIndex].src}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[85vh] w-auto mx-auto rounded-2xl shadow-2xl"
            />

            <div className="text-center mt-8">
              <p className="text-amber-400 uppercase tracking-widest text-sm">
                {filteredItems[lightboxIndex].category}
              </p>
              <h3 className="text-3xl font-bold mt-2">
                {filteredItems[lightboxIndex].title}
              </h3>
            </div>
          </div>

          <button onClick={showNext} className="absolute right-6 md:right-12 text-white hover:text-amber-400 z-50">
            <ChevronRight size={50} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;