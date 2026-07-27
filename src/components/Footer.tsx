"use client";

import React from "react";
import { Heart, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#0A0314]/80 backdrop-blur-md py-10 px-4 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-base sm:text-lg font-serif-luxury text-rose-100">
          <span>Made with</span>
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
          <span>by</span>
          <span className="font-handwriting text-2xl text-amber-300">Kamal</span>
        </div>

        <p className="text-xs text-rose-300/60 font-sans-modern">
          &copy; {new Date().getFullYear()} • Designed with love for the most special girl.
        </p>

        <div className="flex items-center gap-1 text-[11px] text-amber-300/70 pt-1">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>Forever &amp; Always</span>
          <Sparkles className="w-3 h-3 text-amber-300" />
        </div>
      </div>
    </footer>
  );
}
