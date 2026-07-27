"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, X, Calendar, MapPin, Feather } from "lucide-react";

interface Memory {
  id: number;
  url: string;
  title: string;
  caption: string;
  story: string;
  date: string;
  location: string;
  rotation: number;
  offsetX?: string;
}

const POLAROID_MEMORIES: Memory[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80",
    title: "Our First Unforgettable Smile",
    caption: "Our first unforgettable smile ❤️",
    story:
      "I still remember how your laughter filled the entire room. In that exact second, I knew my heart would never belong to anyone else.",
    date: "October 14",
    location: "Sunset Park",
    rotation: -6,
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80",
    title: "The Day My Heart Skipped a Beat",
    caption: "The day my heart skipped a beat.",
    story:
      "We sat under the starry sky for hours. Time completely stopped, and all I could focus on was how bright your eyes were in the dark.",
    date: "November 28",
    location: "Stargazing Hill",
    rotation: 5,
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80",
    title: "I Still Remember This Moment",
    caption: "I still remember this moment.",
    story:
      "A quiet rainy afternoon, warm coffee, and your hand in mine. Nothing fancy, just pure perfection.",
    date: "December 05",
    location: "Cozy Corner Cafe",
    rotation: -4,
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    title: "You Made This Day Beautiful",
    caption: "You make every day beautiful.",
    story:
      "No matter how tough or chaotic life gets, one look from you restores peace in my world.",
    date: "January 19",
    location: "Botanical Garden",
    rotation: 7,
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80",
    title: "My Favorite Memory",
    caption: "My favorite memory.",
    story:
      "Walking along the shore, watching the waves crash while listening to your dreams for the future.",
    date: "February 14",
    location: "Seaside Pier",
    rotation: -5,
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
    title: "Forever My Happy Place",
    caption: "Forever holding your hand.",
    story:
      "Every road leads back to you. You are my home, my peace, and my greatest happiness.",
    date: "March 22",
    location: "Golden Hour Boulevard",
    rotation: 4,
  },
];

export default function PolaroidGallery() {
  const [activeMemory, setActiveMemory] = useState<Memory | null>(null);

  return (
    <section id="polaroid-memories" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-300 text-xs font-sans-modern uppercase tracking-widest"
        >
          <Feather className="w-3.5 h-3.5 text-amber-300" />
          <span>Scattered Memories Table</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif-luxury font-bold text-gradient-romantic"
        >
          Memories Scattered Like Magic
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 max-w-lg mx-auto text-sm sm:text-base font-sans-modern"
        >
          Tap any polaroid photo to open the secret memory story behind it.
        </motion.p>
      </div>

      {/* Scattered Overlapping Polaroid Table Layout (NOT A GRID) */}
      <div className="relative min-h-[750px] sm:min-h-[850px] flex items-center justify-center">
        {/* Soft Desk Ambient Shadow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-950/20 to-transparent rounded-3xl blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-14 relative z-10 w-full">
          {POLAROID_MEMORIES.map((memory, idx) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              style={{
                transform: `rotate(${memory.rotation}deg)`,
              }}
              whileHover={{
                scale: 1.08,
                rotate: 0,
                zIndex: 40,
                transition: { duration: 0.3 },
              }}
              onClick={() => setActiveMemory(memory)}
              className="polaroid-card cursor-pointer group flex flex-col justify-between"
            >
              {/* Washi Tape Strip on Top */}
              <div className="polaroid-tape" />

              {/* Polaroid Photo Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950 rounded-[2px] shadow-inner mb-3">
                <img
                  src={memory.url}
                  alt={memory.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-amber-900/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
              </div>

              {/* Handwritten Note at the bottom */}
              <div className="text-center pt-1 px-2 space-y-1">
                <p className="font-handwritten-polaroid text-2xl sm:text-3xl text-stone-900 leading-tight">
                  {memory.caption}
                </p>
                <div className="flex items-center justify-between text-[11px] text-stone-500 font-sans-modern pt-1 border-t border-stone-200">
                  <span>{memory.date}</span>
                  <span className="flex items-center gap-0.5 text-rose-500 font-medium">
                    <Heart className="w-3 h-3 fill-rose-500" />
                    Kamal
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Polaroid Story Modal */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={() => setActiveMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#fdfbf7] p-6 sm:p-10 rounded-lg max-w-2xl w-full text-stone-900 shadow-[0_30px_90px_rgba(0,0,0,0.8)] border border-amber-100/50 flex flex-col md:flex-row gap-6 items-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveMemory(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors z-20"
                aria-label="Close memory modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Polaroid Image */}
              <div className="w-full md:w-1/2 aspect-[4/3] rounded overflow-hidden shadow-md bg-stone-900">
                <img
                  src={activeMemory.url}
                  alt={activeMemory.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Memory Story Content */}
              <div className="w-full md:w-1/2 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-sans-modern font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Memory #{activeMemory.id}</span>
                </div>

                <h3 className="text-2xl font-serif-luxury font-bold text-stone-900">
                  {activeMemory.title}
                </h3>

                <p className="font-handwritten-polaroid text-2xl text-rose-600 italic">
                  &ldquo;{activeMemory.caption}&rdquo;
                </p>

                <p className="text-sm font-sans-modern text-stone-700 leading-relaxed">
                  {activeMemory.story}
                </p>

                <div className="pt-3 border-t border-stone-200 flex flex-col gap-1 text-xs text-stone-500 font-sans-modern">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-rose-500" />
                    <span>{activeMemory.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{activeMemory.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
