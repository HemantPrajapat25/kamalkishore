"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onOpenSurprise: () => void;
}

export default function HeroSection({ onOpenSurprise }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20 pb-16">
      {/* Glow Orbs & Light Rays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-pink-500/20 via-rose-500/25 to-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Animated Heart Badges */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card border border-rose-300/30 text-rose-200 text-sm font-sans-modern tracking-wide mb-6 shadow-xl"
      >
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
        <span>A Luxury Love Letter Experience</span>
        <Heart className="w-4 h-4 text-rose-400 fill-rose-500 animate-pulse" />
      </motion.div>

      {/* Main Title Typography */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="max-w-4xl space-y-4"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-luxury font-bold tracking-tight leading-[1.15]">
          <span className="block text-gradient-romantic">Happy Birthday,</span>
          <span className="block text-gradient-rose drop-shadow-[0_10px_25px_rgba(244,114,182,0.4)]">
            My Beautiful Princess ❤️
          </span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="mt-8 max-w-2xl px-4 space-y-3"
      >
        <p className="text-lg sm:text-2xl font-serif-luxury italic text-slate-200 leading-relaxed">
          &ldquo;Today is not just your birthday... Today is the day the world received someone truly special.&rdquo;
        </p>

        <div className="pt-2">
          <span className="font-handwriting text-2xl sm:text-3xl text-amber-300 tracking-wider">
            Love, Kamal
          </span>
        </div>
      </motion.div>

      {/* CTA Button: Open My Surprise */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-12"
      >
        <button
          onClick={onOpenSurprise}
          className="glass-button group relative px-9 py-4 rounded-full text-white font-sans-modern font-semibold text-lg flex items-center gap-3 shadow-[0_15px_40px_rgba(236,72,153,0.5)] cursor-pointer"
        >
          <span className="relative z-10">Open My Surprise</span>
          <Heart className="w-5 h-5 text-white fill-white group-hover:scale-125 transition-transform duration-300" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/40 to-rose-400/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 flex flex-col items-center gap-1 text-rose-300/70 text-xs font-sans-modern"
      >
        <span>Scroll to explore</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
