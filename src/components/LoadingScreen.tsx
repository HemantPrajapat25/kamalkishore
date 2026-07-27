"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [stage, setStage] = useState<"preparing" | "madeWithLove" | "fadeout">(
    "preparing"
  );

  useEffect(() => {
    // Stage 1: "Preparing Something Special..." (0 - 2.8s)
    const t1 = setTimeout(() => {
      setStage("madeWithLove");
    }, 2800);

    // Stage 2: "This surprise was made with love by Kamal." (2.8s - 5.5s)
    const t2 = setTimeout(() => {
      setStage("fadeout");
    }, 5600);

    // Complete loading after transition
    const t3 = setTimeout(() => {
      onComplete();
    }, 6400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== "fadeout" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0416] text-white px-6 overflow-hidden"
        >
          {/* Ambient Glow Orbs */}
          <div className="absolute w-96 h-96 bg-rose-500/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute w-80 h-80 bg-purple-600/15 rounded-full blur-3xl -top-10 -left-10" />

          {/* Center Heart Container */}
          <motion.div
            animate={{
              scale: [1, 1.25, 1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full blur-xl opacity-60 animate-pulse" />
            <div className="relative w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-rose-300/40 flex items-center justify-center shadow-2xl">
              <Heart className="w-12 h-12 text-rose-400 fill-rose-500 drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]" />
            </div>
          </motion.div>

          {/* Text Stage 1: Preparing */}
          <AnimatePresence mode="wait">
            {stage === "preparing" && (
              <motion.div
                key="text-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center space-y-3"
              >
                <h2 className="text-2xl md:text-3xl font-serif-luxury font-medium tracking-wide text-rose-100 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
                  Preparing Something Special...
                  <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
                </h2>
                <div className="w-48 h-1 bg-white/10 rounded-full mx-auto overflow-hidden relative">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300 rounded-full"
                  />
                </div>
              </motion.div>
            )}

            {/* Text Stage 2: Made with love by Kamal */}
            {stage === "madeWithLove" && (
              <motion.div
                key="text-2"
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center space-y-4 max-w-lg"
              >
                <p className="text-lg md:text-xl font-handwriting text-pink-200 text-shadow">
                  This surprise was made with love by
                </p>
                <h1 className="text-4xl md:text-5xl font-serif-luxury font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-rose-400">
                  Kamal
                </h1>
                <div className="pt-2 flex items-center justify-center gap-1 text-rose-400/80 text-sm">
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-bounce" />
                  <span className="font-sans-modern tracking-widest text-xs uppercase">
                    For the most special girl
                  </span>
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-bounce" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
