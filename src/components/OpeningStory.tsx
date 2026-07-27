"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, ArrowRight } from "lucide-react";

interface OpeningStoryProps {
  onContinue: () => void;
}

const STORY_STEPS = [
  "Hey...",
  "Today is my birthday.",
  "Everyone says birthdays are about receiving gifts...",
  "But today...",
  "I only wish for one thing...",
];

export default function OpeningStory({ onContinue }: OpeningStoryProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isCharTyping, setIsCharTyping] = useState(true);
  const [isSequenceComplete, setIsSequenceComplete] = useState(false);

  useEffect(() => {
    if (currentStepIndex >= STORY_STEPS.length) {
      setIsSequenceComplete(true);
      return;
    }

    const fullText = STORY_STEPS[currentStepIndex];
    let charIdx = 0;
    setIsCharTyping(true);
    setDisplayedText("");

    const typingInterval = setInterval(() => {
      if (charIdx < fullText.length) {
        setDisplayedText(fullText.slice(0, charIdx + 1));
        charIdx++;
      } else {
        clearInterval(typingInterval);
        setIsCharTyping(false);

        // Pause before proceeding to next step
        const pauseTime = currentStepIndex === STORY_STEPS.length - 1 ? 1200 : 1800;
        const timer = setTimeout(() => {
          if (currentStepIndex < STORY_STEPS.length - 1) {
            setCurrentStepIndex((prev) => prev + 1);
          } else {
            setIsSequenceComplete(true);
          }
        }, pauseTime);

        return () => clearTimeout(timer);
      }
    }, 60);

    return () => clearInterval(typingInterval);
  }, [currentStepIndex]);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Soft Ambient Background Orbs */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-pink-500/20 via-rose-500/25 to-purple-600/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-12 right-12 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card border border-rose-300/30 text-rose-200 text-xs font-sans-modern uppercase tracking-widest mb-10 shadow-xl"
      >
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
        <span>Kamal&apos;s Birthday Story</span>
        <Heart className="w-4 h-4 text-rose-400 fill-rose-500 animate-pulse" />
      </motion.div>

      {/* Story Line Display */}
      <div className="max-w-3xl min-h-[160px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif-luxury font-medium tracking-tight text-gradient-romantic leading-snug">
              {displayedText}
              {isCharTyping && (
                <span className="inline-block w-1 h-8 sm:h-12 bg-rose-400 ml-2 animate-pulse align-middle" />
              )}
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Continuation Glowing Button */}
      <AnimatePresence>
        {isSequenceComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-12"
          >
            <button
              onClick={onContinue}
              className="glass-button group relative px-10 py-4 rounded-full text-white font-sans-modern font-semibold text-lg sm:text-xl flex items-center gap-3 shadow-[0_15px_45px_rgba(236,72,153,0.5)] cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/40 to-rose-400/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 text-xs sm:text-sm font-handwriting text-rose-200 tracking-wider"
      >
        A special birthday story written with love by Kamal
      </motion.p>
    </section>
  );
}
