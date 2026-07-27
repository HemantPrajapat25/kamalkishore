"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";

export default function SpecialMessage() {
  return (
    <section id="special-message" className="relative py-20 px-4 sm:px-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card rounded-3xl p-8 sm:p-14 text-center border border-rose-300/30 shadow-[0_25px_60px_rgba(244,114,182,0.25)] relative overflow-hidden bg-gradient-to-tr from-[#1A0B2E]/95 via-[#2A1045]/90 to-[#1A0B2E]/95 backdrop-blur-2xl"
      >
        {/* Glow Accents */}
        <div className="absolute -top-16 -left-16 w-60 h-60 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Heart Icon */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-300/40 flex items-center justify-center shadow-inner">
            <Heart className="w-8 h-8 text-rose-400 fill-rose-500 animate-pulse" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-amber-300 animate-spin" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-gradient-romantic mb-6">
          One More Thing...
        </h2>

        {/* Emotional Message */}
        <div className="space-y-4 font-serif-luxury text-lg sm:text-2xl text-slate-100 leading-relaxed max-w-xl mx-auto italic">
          <p>&ldquo;No matter where life takes us, I hope your smile never fades.&rdquo;</p>
          <p className="text-rose-200 font-normal">
            You are incredibly precious to me.
          </p>
          <p className="text-gradient-rose font-bold not-italic pt-2">
            Happy Birthday ❤️
          </p>
        </div>

        {/* Signature */}
        <div className="mt-8 pt-6 border-t border-rose-300/20 flex flex-col items-center justify-center gap-1">
          <span className="font-handwriting text-3xl text-amber-300">
            — Kamal
          </span>
          <div className="flex items-center gap-1 text-xs text-rose-300/70 font-sans-modern pt-1">
            <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
            <span>Always &amp; Forever</span>
            <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
