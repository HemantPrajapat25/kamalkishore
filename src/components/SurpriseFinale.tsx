"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X, Gift, Flame } from "lucide-react";
import confetti from "canvas-confetti";

interface SurpriseFinaleProps {
  onTriggerSurprise: () => void;
}

export default function SurpriseFinale({ onTriggerSurprise }: SurpriseFinaleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger Fireworks & Confetti
  const handleTrigger = () => {
    setIsOpen(true);
    onTriggerSurprise();

    // Launch Confetti Burst
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);

      // Heart and golden sparkles confetti
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
        colors: ["#f472b6", "#ec4899", "#fb7185", "#f59e0b", "#ffffff"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
        colors: ["#e879f9", "#c084fc", "#f43f5e", "#fef08a", "#ffffff"],
      });
    }, 250);
  };

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  // Canvas Fireworks Loop inside Modal
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface FireworkParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      size: number;
      decay: number;
    }

    let particles: FireworkParticle[] = [];

    const createExplosion = (x: number, y: number) => {
      const count = 60;
      const colors = [
        "#f472b6",
        "#ec4899",
        "#fb7185",
        "#f59e0b",
        "#fef08a",
        "#e879f9",
      ];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 4 + 2,
          decay: Math.random() * 0.02 + 0.01,
        });
      }
    };

    // Periodically launch fireworks
    const fireworksInterval = setInterval(() => {
      createExplosion(
        randomInRange(width * 0.1, width * 0.9),
        randomInRange(height * 0.1, height * 0.6)
      );
    }, 400);

    const render = () => {
      ctx.fillStyle = "rgba(11, 4, 22, 0.25)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(idx, 1);
          return;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearInterval(fireworksInterval);
      cancelAnimationFrame(animId);
    };
  }, [isOpen]);

  return (
    <section className="relative py-20 px-4 text-center">
      {/* Surprise Trigger Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto"
      >
        <button
          onClick={handleTrigger}
          className="glass-button-gold group relative w-full py-5 px-8 rounded-full text-white font-sans-modern font-bold text-lg sm:text-xl flex items-center justify-center gap-3 shadow-[0_15px_45px_rgba(245,158,11,0.5)] cursor-pointer"
        >
          <Gift className="w-6 h-6 text-amber-200 group-hover:rotate-12 transition-transform duration-300" />
          <span>Click for One Last Surprise</span>
          <Sparkles className="w-6 h-6 text-amber-200 animate-spin" />
        </button>
      </motion.div>

      {/* Celebratory Modal & Fireworks Screen Glow */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0416]/90 backdrop-blur-2xl overflow-hidden"
          >
            {/* Fireworks Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

            {/* Glowing Screen Background Radial */}
            <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-pink-500/30 via-rose-500/30 to-amber-500/30 rounded-full blur-[140px] animate-pulse pointer-events-none" />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative z-10 glass-card rounded-3xl p-8 sm:p-14 max-w-xl w-full border border-rose-300/40 shadow-[0_30px_90px_rgba(236,72,153,0.5)] text-center space-y-6"
            >
              {/* Close Modal Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-all"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Heart Badge */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-flex p-4 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 text-white shadow-2xl"
              >
                <Heart className="w-12 h-12 fill-white text-white drop-shadow-lg" />
              </motion.div>

              {/* Message */}
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-6xl font-serif-luxury font-bold text-gradient-rose drop-shadow-md">
                  I Love You ❤️
                </h2>

                <p className="text-xl sm:text-2xl font-serif-luxury text-rose-100 italic">
                  Happy Birthday, My Princess.
                </p>
              </div>

              {/* Kamal Signoff */}
              <div className="pt-6 border-t border-rose-300/20 space-y-1">
                <p className="text-xs uppercase font-sans-modern tracking-widest text-rose-300">
                  Forever Yours,
                </p>
                <h3 className="font-handwriting text-4xl text-amber-300">
                  Kamal
                </h3>
              </div>

              {/* Sparkle Footer */}
              <div className="flex items-center justify-center gap-2 text-xs text-rose-300/80 pt-2 font-sans-modern">
                <Flame className="w-4 h-4 text-amber-300" />
                <span>You bring warmth to my universe</span>
                <Flame className="w-4 h-4 text-amber-300" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
