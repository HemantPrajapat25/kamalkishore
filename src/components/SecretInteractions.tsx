"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Heart, Star, X, Sparkles, Gift } from "lucide-react";
import confetti from "canvas-confetti";

export default function SecretInteractions() {
  const [activeSecret, setActiveSecret] = useState<"envelope" | "heart" | "star" | null>(null);

  const handleHeartBurst = () => {
    setActiveSecret("heart");
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#f472b6", "#fb7185", "#fef08a"],
    });
  };

  const handleStarWish = () => {
    setActiveSecret("star");
    confetti({
      particleCount: 50,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#f59e0b", "#fef08a", "#ffffff"],
    });
  };

  return (
    <>
      {/* 1. Floating Tiny Envelope (Bottom Left) */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-24 left-6 z-30 group"
      >
        <button
          onClick={() => setActiveSecret("envelope")}
          className="relative w-12 h-12 rounded-full bg-rose-500/20 backdrop-blur-md border border-rose-300/40 flex items-center justify-center text-rose-200 shadow-[0_5px_20px_rgba(244,114,182,0.4)] hover:scale-110 transition-transform cursor-pointer"
          aria-label="Secret Love Note"
        >
          <Mail className="w-5 h-5 text-rose-300 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping" />
        </button>
      </motion.div>

      {/* 2. Floating Small Heart (Middle Right) */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="fixed top-1/2 right-6 z-30 group"
      >
        <button
          onClick={handleHeartBurst}
          className="relative w-11 h-11 rounded-full bg-pink-500/20 backdrop-blur-md border border-pink-300/40 flex items-center justify-center text-rose-200 shadow-[0_5px_20px_rgba(236,72,153,0.4)] hover:scale-110 transition-transform cursor-pointer"
          aria-label="Secret Heart Quote"
        >
          <Heart className="w-5 h-5 text-pink-400 fill-pink-500 group-hover:scale-125 transition-transform" />
        </button>
      </motion.div>

      {/* 3. Floating Star (Top Left) */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="fixed top-28 left-6 z-30 group"
      >
        <button
          onClick={handleStarWish}
          className="relative w-10 h-10 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-300/40 flex items-center justify-center text-amber-200 shadow-[0_5px_20px_rgba(245,158,11,0.4)] hover:scale-110 transition-transform cursor-pointer"
          aria-label="Secret Wish Star"
        >
          <Star className="w-4 h-4 text-amber-300 fill-amber-300 group-hover:rotate-45 transition-transform" />
        </button>
      </motion.div>

      {/* Secret Modals */}
      <AnimatePresence>
        {activeSecret !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveSecret(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative glass-card rounded-3xl p-8 max-w-md w-full text-center border border-rose-300/30 shadow-2xl space-y-4"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveSecret(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Envelope Content */}
              {activeSecret === "envelope" && (
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center mx-auto text-rose-400">
                    <Mail className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-serif-luxury font-bold text-rose-100">
                    Secret Love Note ✉️
                  </h3>
                  <p className="font-handwriting text-2xl text-amber-300 leading-snug">
                    &ldquo;If I had a flower for every time I thought of you, I could walk through my garden forever.&rdquo;
                  </p>
                  <p className="text-xs text-rose-300/80 font-sans-modern pt-2">
                    — Written secretly by Kamal ❤️
                  </p>
                </div>
              )}

              {/* Heart Quote Content */}
              {activeSecret === "heart" && (
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center mx-auto text-pink-400">
                    <Heart className="w-7 h-7 fill-pink-500" />
                  </div>
                  <h3 className="text-xl font-serif-luxury font-bold text-rose-100">
                    A Spark of My Heart ❤️
                  </h3>
                  <p className="font-serif-luxury italic text-xl text-rose-200">
                    &ldquo;My favorite place in the world is right next to you.&rdquo;
                  </p>
                  <p className="text-xs text-rose-300/80 font-sans-modern pt-2">
                    — From Kamal with endless love
                  </p>
                </div>
              )}

              {/* Star Wish Content */}
              {activeSecret === "star" && (
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center mx-auto text-amber-300">
                    <Sparkles className="w-7 h-7 animate-spin" />
                  </div>
                  <h3 className="text-xl font-serif-luxury font-bold text-amber-100">
                    Birthday Wish Star 🌟
                  </h3>
                  <p className="font-serif-luxury text-xl text-amber-200 italic">
                    &ldquo;On my birthday today, I wished upon a shooting star... and my only wish was your everlasting happiness.&rdquo;
                  </p>
                  <p className="text-xs text-amber-300/80 font-sans-modern pt-2">
                    — Kamal &apos;s Birthday Wish
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
