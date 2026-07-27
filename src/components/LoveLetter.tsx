"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Mail, RefreshCw, Feather } from "lucide-react";

const LETTER_TEXT_LINES = [
  "Happy Birthday, My Love ❤️",
  "",
  "Every day with you is a blessing.",
  "",
  "You make my life brighter,",
  "my heart happier,",
  "and every dream more meaningful.",
  "",
  "Thank you for being my biggest happiness.",
  "",
  "I promise to stand beside you,",
  "support you,",
  "respect you,",
  "and love you through every season of life.",
  "",
  "May this birthday bring endless smiles,",
  "good health,",
  "success,",
  "and countless beautiful memories.",
  "",
  "You deserve all the happiness in the world.",
  "",
  "Happy Birthday once again.",
  "",
  "With all my love,",
  "",
  "Kamal ❤️",
];

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const letterBoxRef = useRef<HTMLDivElement | null>(null);

  // Typewriter Engine
  useEffect(() => {
    if (!isOpen) return;

    if (currentLineIndex >= LETTER_TEXT_LINES.length) {
      setIsTypingComplete(true);
      return;
    }

    const currentFullLine = LETTER_TEXT_LINES[currentLineIndex];

    if (currentFullLine === "") {
      // Empty line spacer
      const timer = setTimeout(() => {
        setTypedLines((prev) => [...prev, ""]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 150);
      return () => clearTimeout(timer);
    }

    if (currentCharIndex < currentFullLine.length) {
      const charTimer = setTimeout(() => {
        const partial = currentFullLine.slice(0, currentCharIndex + 1);
        setTypedLines((prev) => {
          const next = [...prev];
          next[currentLineIndex] = partial;
          return next;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, 35);

      return () => clearTimeout(charTimer);
    } else {
      // Line finished, go to next line after pause
      const lineTimer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 300);
      return () => clearTimeout(lineTimer);
    }
  }, [isOpen, currentLineIndex, currentCharIndex]);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    setTypedLines([""]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsTypingComplete(false);
  };

  const handleReplay = () => {
    setTypedLines([""]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsTypingComplete(false);
  };

  return (
    <section id="love-letter" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Section Title */}
      <div className="text-center space-y-4 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-300 text-xs font-sans-modern uppercase tracking-widest"
        >
          <Feather className="w-3.5 h-3.5 text-amber-300" />
          <span>From Kamal&apos;s Heart</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif-luxury font-bold text-gradient-romantic"
        >
          A Love Letter For You
        </motion.h2>
      </div>

      {/* Interactive Envelope / Letter Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {!isOpen ? (
          /* Sealed Envelope View */
          <div className="glass-card rounded-3xl p-8 sm:p-14 text-center border border-rose-300/30 shadow-[0_25px_60px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center space-y-6 min-h-[380px]">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative cursor-pointer group"
              onClick={handleOpenEnvelope}
            >
              <div className="absolute inset-0 bg-rose-500/30 rounded-full blur-2xl group-hover:bg-rose-400/50 transition-colors duration-300" />
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 p-1 shadow-2xl flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#1A0B2E] flex flex-col items-center justify-center text-rose-200 group-hover:scale-105 transition-transform duration-300">
                  <Heart className="w-10 h-10 text-rose-400 fill-rose-500 animate-pulse" />
                  <span className="text-[10px] font-sans-modern font-semibold uppercase tracking-wider text-amber-300 mt-1">
                    Wax Seal
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="space-y-2">
              <h3 className="text-2xl font-serif-luxury font-semibold text-rose-100">
                Tap to Break the Wax Seal &amp; Open
              </h3>
              <p className="text-sm text-slate-300 font-sans-modern max-w-md mx-auto">
                Kamal wrote a handwritten love letter exclusively for your birthday. Tap the heart to read.
              </p>
            </div>

            <button
              onClick={handleOpenEnvelope}
              className="glass-button px-8 py-3.5 rounded-full text-white font-sans-modern text-sm font-semibold flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Open Love Letter</span>
            </button>
          </div>
        ) : (
          /* Opened Handwritten Letter View */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            ref={letterBoxRef}
            className="glass-card rounded-3xl p-6 sm:p-12 md:p-16 border border-rose-300/30 shadow-[0_30px_70px_rgba(0,0,0,0.6)] relative overflow-hidden bg-gradient-to-b from-[#1C0B30]/90 to-[#0F051D]/90 backdrop-blur-2xl"
          >
            {/* Vintage Rose Watermark */}
            <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Letter Header Bar */}
            <div className="flex items-center justify-between border-b border-rose-300/20 pb-4 mb-8">
              <div className="flex items-center gap-2 text-amber-300 font-serif-luxury text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Handwritten for My Princess</span>
              </div>
              <button
                onClick={handleReplay}
                className="flex items-center gap-1.5 text-xs text-rose-300/80 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Replay Typing</span>
              </button>
            </div>

            {/* Handwritten Text Flow */}
            <div className="space-y-3 font-handwriting text-xl sm:text-2xl md:text-3xl text-rose-100 leading-relaxed tracking-wide min-h-[400px]">
              {typedLines.map((line, idx) => (
                <div key={idx} className="min-h-[1.8rem]">
                  {line}
                  {idx === currentLineIndex && !isTypingComplete && (
                    <span className="inline-block w-0.5 h-6 bg-rose-400 ml-1 animate-pulse" />
                  )}
                </div>
              ))}
            </div>

            {/* Heart Sign-off Footer */}
            {isTypingComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="mt-10 pt-6 border-t border-rose-300/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
              >
                <div className="flex items-center gap-2 text-rose-200 font-sans-modern text-sm">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-bounce" />
                  <span>Written with endless love by Kamal</span>
                </div>

                <div className="text-amber-300 font-handwriting text-2xl">
                  Forever &amp; Always ❤️
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
