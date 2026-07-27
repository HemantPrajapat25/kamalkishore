"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X, Flame, Star, PartyPopper } from "lucide-react";
import confetti from "canvas-confetti";

interface ProposalSectionProps {
  onProposalTriggered?: () => void;
}

const NO_PROMPTS = [
  { main: "Will You Be My Girlfriend? ❤️", sub: "— Kamal" },
  { main: "Baby Man jao na! 😭", sub: "Kitna bhav khaogi... Bhut gili bawt hai yaar ❌" },
  { main: "Please think again! 🥺", sub: "itni jaldi na matt bolo 🥺" },
  { main: "Ek aur baar Soch lo! 😫", sub: "kyu aisa kar rahi ho Plzzz Man jao 🥺" },
  { main: "Maan jao na please... 🥺", sub: "Don't do this to me! 💔" },
  { main: "You are breaking my heart... 💔", sub: "Just say YES! 😭" },
];

export default function ProposalSection({ onProposalTriggered }: ProposalSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger Heart Open & Celebration
  const handleOpenHeart = () => {
    setIsOpen(true);
    setNoCount(0);
    setNoButtonPos({ x: 0, y: 0 });
    if (onProposalTriggered) onProposalTriggered();

    // Trigger Initial Confetti Burst
    const duration = 6 * 1000;
    const end = Date.now() + duration;

    const interval: NodeJS.Timeout = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);

      confetti({
        startVelocity: 35,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ["#f472b6", "#ec4899", "#fb7185", "#f59e0b", "#ffffff", "#e879f9"],
      });
    }, 250);
  };

  const handleAcceptProposal = () => {
    setIsAccepted(true);

    // Giant Fireworks Explosion
    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.6 },
      colors: ["#f472b6", "#ec4899", "#f59e0b", "#ffffff", "#c084fc"],
    });
  };

  const handleNoInteraction = () => {
    setNoCount((prev) => prev + 1);
    
    // Calculate random position for the "No" button to dodge
    const maxJump = 150;
    const newX = (Math.random() - 0.5) * maxJump * 2;
    const newY = (Math.random() - 0.5) * maxJump * 2;
    
    setNoButtonPos({ x: newX, y: newY });
  };

  // Canvas Fireworks & Star Explosion in Modal
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      size: number;
      decay: number;
    }

    let particles: Particle[] = [];

    const createExplosion = (x: number, y: number) => {
      const count = isAccepted ? 90 : 50;
      const colors = [
        "#f472b6",
        "#ec4899",
        "#fb7185",
        "#f59e0b",
        "#fef08a",
        "#e879f9",
        "#ffffff",
      ];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 7 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 4 + 2,
          decay: Math.random() * 0.018 + 0.008,
        });
      }
    };

    const fireworksInterval = setInterval(
      () => {
        createExplosion(
          Math.random() * width,
          Math.random() * height * 0.6
        );
      },
      isAccepted ? 250 : 450
    );

    const render = () => {
      ctx.fillStyle = "rgba(9, 3, 20, 0.25)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(idx, 1);
          return;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 14;
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
  }, [isOpen, isAccepted]);

  const currentPrompt = NO_PROMPTS[Math.min(noCount, NO_PROMPTS.length - 1)];

  return (
    <section id="proposal" className="relative py-24 px-4 text-center overflow-hidden">
      {/* Large Glowing Heart Trigger Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto space-y-8"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative inline-flex items-center justify-center cursor-pointer group"
          onClick={handleOpenHeart}
        >
          {/* Heart Glow Background */}
          <div className="absolute inset-0 bg-rose-500/40 rounded-full blur-3xl group-hover:bg-rose-400/60 transition-colors duration-500" />

          {/* Heart Orb Icon */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 p-1 shadow-[0_0_50px_rgba(244,114,182,0.8)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#120524] flex flex-col items-center justify-center text-rose-200 group-hover:scale-105 transition-transform duration-300">
              <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-rose-400 fill-rose-500 drop-shadow-[0_0_20px_rgba(244,114,182,1)]" />
              <span className="text-xs font-sans-modern font-semibold uppercase tracking-widest text-amber-300 mt-2">
                Open My Heart
              </span>
            </div>
          </div>
        </motion.div>

        {/* Glowing Button */}
        <div>
          <button
            onClick={handleOpenHeart}
            className="glass-button-gold group relative py-5 px-10 rounded-full text-white font-sans-modern font-bold text-xl sm:text-2xl flex items-center justify-center gap-3 shadow-[0_15px_45px_rgba(245,158,11,0.5)] cursor-pointer mx-auto"
          >
            <Heart className="w-6 h-6 text-white fill-white group-hover:scale-125 transition-transform" />
            <span>Open My Heart ❤️</span>
            <Sparkles className="w-6 h-6 text-amber-200 animate-spin" />
          </button>
        </div>
      </motion.div>

      {/* Celebratory Proposal Overlay Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#090314]/90 backdrop-blur-2xl overflow-hidden"
          >
            {/* Fireworks Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

            {/* Ambient Beam of Light Background */}
            <div className="absolute w-[700px] h-[700px] bg-gradient-to-r from-pink-500/35 via-rose-500/35 to-amber-500/35 rounded-full blur-[150px] animate-pulse pointer-events-none" />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="relative z-10 glass-card rounded-3xl p-8 sm:p-12 max-w-xl w-full border border-rose-300/40 shadow-[0_30px_90px_rgba(236,72,153,0.5)] text-center space-y-6 bg-[#16072C]/95 backdrop-blur-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-all z-20"
                aria-label="Close Proposal Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {!isAccepted ? (
                /* Proposal Question Screen */
                <>
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="inline-flex p-4 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 text-white shadow-2xl mt-4"
                  >
                    <Heart className="w-14 h-14 fill-white text-white drop-shadow-xl" />
                  </motion.div>

                  <div className="space-y-3 min-h-[120px] flex flex-col justify-center">
                    <motion.h2 
                      key={currentPrompt.main}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-3xl sm:text-5xl font-serif-luxury font-bold text-gradient-rose drop-shadow-lg leading-tight"
                    >
                      {currentPrompt.main}
                    </motion.h2>

                    <motion.div 
                      key={currentPrompt.sub}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="pt-2"
                    >
                      <span className={`font-handwriting text-2xl ${noCount === 0 ? 'text-amber-300' : 'text-rose-200'}`}>
                        {currentPrompt.sub}
                      </span>
                    </motion.div>
                  </div>

                  {/* Interactive Response Buttons */}
                  <div className="pt-8 pb-4 flex items-center justify-center gap-6 relative h-24">
                    {/* YES BUTTON - Grows bigger with each NO click */}
                    <motion.button
                      onClick={handleAcceptProposal}
                      animate={{ 
                        scale: 1 + (noCount * 0.15) 
                      }}
                      className="glass-button px-10 py-4 rounded-full text-white font-sans-modern font-bold text-xl flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(236,72,153,0.6)] cursor-pointer hover:scale-110 transition-colors z-20 bg-rose-500 hover:bg-rose-400"
                    >
                      <span>YES! ❤️</span>
                    </motion.button>

                    {/* NO BUTTON - Dodges cursor */}
                    <motion.button
                      onMouseEnter={handleNoInteraction}
                      onClick={handleNoInteraction}
                      animate={{
                        x: noButtonPos.x,
                        y: noButtonPos.y,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="glass-button px-8 py-4 rounded-full text-white/80 font-sans-modern font-bold text-lg flex items-center justify-center shadow-none cursor-pointer hover:bg-white/10 z-10 absolute right-0 sm:right-12"
                      style={{ 
                        left: noCount === 0 ? 'auto' : `calc(50% + ${noButtonPos.x}px)`,
                        top: noCount === 0 ? 'auto' : `calc(50% + ${noButtonPos.y}px)`
                      }}
                    >
                      <span>No 🥺</span>
                    </motion.button>
                  </div>
                </>
              ) : (
                /* Accepted Celebration Screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6 py-6"
                >
                  <div className="inline-flex p-4 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 text-white shadow-2xl animate-bounce">
                    <Sparkles className="w-14 h-14 text-white" />
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-gradient-romantic leading-snug">
                      &ldquo;Thank you for making this the happiest birthday of my life.&rdquo;
                    </h2>
                  </div>

                  <div className="pt-4 border-t border-rose-300/20 space-y-1">
                    <p className="text-xs uppercase font-sans-modern tracking-widest text-rose-300">
                      Forever Yours,
                    </p>
                    <h3 className="font-handwriting text-5xl text-amber-300 mt-2">
                      Kamal ❤️
                    </h3>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-rose-200/80 pt-4 font-sans-modern">
                    <Flame className="w-4 h-4 text-amber-300" />
                    <span>Our story begins now forever</span>
                    <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
