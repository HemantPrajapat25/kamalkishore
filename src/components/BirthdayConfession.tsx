"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Gift } from "lucide-react";

export default function BirthdayConfession() {
  return (
    <section id="birthday-confession" className="relative py-28 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card rounded-3xl p-8 sm:p-16 border border-rose-300/30 shadow-[0_30px_80px_rgba(244,114,182,0.2)] relative overflow-hidden bg-gradient-to-b from-[#1C0933]/90 via-[#270E3F]/90 to-[#120524]/90 backdrop-blur-2xl"
      >
        {/* Glow Halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Gift Icon Badge */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex p-4 rounded-full bg-rose-500/20 border border-rose-300/40 text-rose-300 mb-8 shadow-xl"
        >
          <Gift className="w-8 h-8 text-amber-300" />
        </motion.div>

        {/* Confession Stanzas */}
        <div className="space-y-6 font-serif-luxury text-2xl sm:text-4xl text-slate-100 leading-relaxed max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gradient-romantic font-semibold"
          >
            &ldquo;Today is my birthday...&rdquo;
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-slate-200"
          >
            If I could ask for one gift...
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-rose-200/90 text-xl sm:text-3xl"
          >
            I wouldn&apos;t ask for anything expensive.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-amber-300 font-serif-luxury italic pt-2 text-3xl sm:text-5xl font-bold"
          >
            I would simply ask...
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="pt-4 border-t border-rose-300/20"
          >
            <p className="text-gradient-rose font-bold text-3xl sm:text-5xl leading-tight">
              &ldquo;For a chance to spend many more birthdays with you.&rdquo;
            </p>
          </motion.div>
        </div>

        {/* Kamal Signature */}
        <div className="mt-10 pt-6 flex items-center justify-center gap-2 text-rose-300 font-sans-modern text-sm">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
          <span className="font-handwriting text-2xl text-amber-300">
            — Kamal
          </span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>
      </motion.div>
    </section>
  );
}
