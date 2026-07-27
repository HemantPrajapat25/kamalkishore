"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface PhotoItem {
  id: number;
  url: string;
  caption: string;
  location?: string;
  tag: string;
}

const DEFAULT_PHOTOS: PhotoItem[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80",
    caption: "Our happiest smile ❤️",
    location: "Sunset Park",
    tag: "Happy Moments",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80",
    caption: "The day I knew I loved you.",
    location: "Stargazing Night",
    tag: "Eternal Love",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
    caption: "You make every moment beautiful.",
    location: "Cozy Evening",
    tag: "Precious Times",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    caption: "Your beautiful laugh that lights up my world.",
    location: "Weekend Trip",
    tag: "Unforgettable",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    caption: "Forever holding your hand through life.",
    location: "Seaside Walk",
    tag: "Together Always",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    caption: "My favorite view is always you.",
    location: "Golden Hour",
    tag: "Pure Bliss",
  },
];

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<PhotoItem[]>(DEFAULT_PHOTOS);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(
    null
  );
  const [editingId, setEditingId] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % photos.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + photos.length) % photos.length
      );
    }
  };

  const handleUpdatePhotoUrl = (id: number, newUrl: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, url: newUrl } : p))
    );
  };

  const handleUpdateCaption = (id: number, newCaption: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, caption: newCaption } : p))
    );
  };

  return (
    <section id="photo-memories" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-300 text-xs font-sans-modern uppercase tracking-widest"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Our Precious Moments</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif-luxury font-bold text-gradient-romantic"
        >
          Photo Memories Gallery
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base font-sans-modern"
        >
          Every picture holds a memory, and every memory with you is a treasure I cherish forever.
        </motion.p>
      </div>

      {/* Grid of Photo Glass Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-card rounded-3xl overflow-hidden group cursor-pointer border border-rose-300/20 shadow-2xl flex flex-col"
            onClick={() => openLightbox(index)}
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-900/60">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  // Fallback image if broken URL
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

              {/* Tag Badge */}
              <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-sans-modern font-medium text-rose-200 border border-white/10">
                {photo.tag}
              </div>

              {/* Expand Hover Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-rose-950/30 backdrop-blur-[2px]">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <ImageIcon className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Caption Card Footer */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-white/5 backdrop-blur-md">
              <div className="space-y-1">
                <p className="text-lg font-serif-luxury font-medium text-rose-100 group-hover:text-rose-300 transition-colors">
                  &ldquo;{photo.caption}&rdquo;
                </p>
                {photo.location && (
                  <p className="text-xs text-rose-300/70 font-sans-modern">
                    📍 {photo.location}
                  </p>
                )}
              </div>

              {/* Quick Edit Option Trigger */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 text-rose-400">
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  Memories with Kamal
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingId(editingId === photo.id ? null : photo.id);
                  }}
                  className="text-slate-400 hover:text-amber-300 underline text-[11px]"
                >
                  {editingId === photo.id ? "Done" : "Change Photo"}
                </button>
              </div>

              {/* Inline Photo Editor if toggled */}
              {editingId === photo.id && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="pt-2 space-y-2 text-xs bg-black/40 p-3 rounded-xl border border-white/10"
                >
                  <label className="block text-slate-300 font-medium">Image URL:</label>
                  <input
                    type="text"
                    value={photo.url}
                    onChange={(e) => handleUpdatePhotoUrl(photo.id, e.target.value)}
                    className="w-full bg-slate-900 border border-white/20 rounded px-2 py-1 text-white text-xs"
                    placeholder="https://..."
                  />
                  <label className="block text-slate-300 font-medium pt-1">Caption:</label>
                  <input
                    type="text"
                    value={photo.caption}
                    onChange={(e) => handleUpdateCaption(photo.id, e.target.value)}
                    className="w-full bg-slate-900 border border-white/20 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Preview Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-all z-10"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-all z-10"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-all z-10"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <div
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={photos[activeLightboxIndex].id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={photos[activeLightboxIndex].url}
                alt={photos[activeLightboxIndex].caption}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl border border-rose-300/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
              />

              <div className="mt-4 text-center space-y-1">
                <p className="text-xl sm:text-2xl font-serif-luxury text-rose-100">
                  &ldquo;{photos[activeLightboxIndex].caption}&rdquo;
                </p>
                <p className="text-xs text-rose-300/80 font-sans-modern">
                  {photos[activeLightboxIndex].location} • Photo {activeLightboxIndex + 1} of {photos.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
