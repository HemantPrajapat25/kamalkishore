"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Flower2, Cake, Calendar, Star } from "lucide-react";

interface Milestone {
  id: number;
  icon: React.ElementType;
  iconColor: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  badge: string;
}

const MILESTONES: Milestone[] = [
  {
    id: 1,
    icon: Sparkles,
    iconColor: "text-amber-300 fill-amber-300",
    title: "The Day We First Talked",
    subtitle: "When magic entered my life",
    date: "A Special Day",
    description:
      "A simple conversation turned into hours of endless laughter. Little did I know, I had just met the person who would change my world forever.",
    badge: "First Spark ✨",
  },
  {
    id: 2,
    icon: Heart,
    iconColor: "text-rose-500 fill-rose-500",
    title: "Our First Unforgettable Memory",
    subtitle: "The moment time stood still",
    date: "Unforgettable Moment",
    description:
      "Looking into your eyes, feeling the warmth of your touch, and realizing that home isn't a place — it's being right next to you.",
    badge: "First Date ❤️",
  },
  {
    id: 3,
    icon: Flower2,
    iconColor: "text-pink-400 fill-pink-400",
    title: "Every Beautiful Moment Together",
    subtitle: "Growing stronger every single day",
    date: "Our Journey",
    description:
      "Through late-night talks, quiet strolls, shared dreams, and infinite smiles — every single second with you is a gift I hold dear.",
    badge: "Pure Romance 🌹",
  },
  {
    id: 4,
    icon: Cake,
    iconColor: "text-amber-400 fill-amber-400",
    title: "Today — Celebrating Your Birthday",
    subtitle: "Honoring the most amazing girl on earth",
    date: "Today! 🎂",
    description:
      "Today is all about YOU! Celebrating your kindness, your beauty, your warmth, and the immense joy you bring into my life every single day.",
    badge: "Happy Birthday 🎂",
  },
];

export default function MemoryTimeline() {
  return (
    <section id="timeline" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-300 text-xs font-sans-modern uppercase tracking-widest"
        >
          <Calendar className="w-3.5 h-3.5 text-amber-300" />
          <span>Our Love Journey</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif-luxury font-bold text-gradient-romantic"
        >
          Memory Timeline
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 max-w-lg mx-auto text-sm sm:text-base font-sans-modern"
        >
          Key milestones in our beautiful love story that lead up to this wonderful day.
        </motion.p>
      </div>

      {/* Central Glowing Line for Timeline */}
      <div className="relative">
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-rose-500/0 via-rose-400/50 to-amber-400/0" />

        {/* Timeline Cards */}
        <div className="space-y-12 sm:space-y-16">
          {MILESTONES.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col sm:flex-row items-center ${
                  isEven ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Center Node */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-20 w-12 h-12 rounded-full bg-[#1A0B2E] border-2 border-rose-400/80 shadow-[0_0_20px_rgba(244,114,182,0.8)] flex items-center justify-center"
                >
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </motion.div>

                {/* Content Card Side */}
                <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8">
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: isEven ? 50 : -50,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="glass-card rounded-3xl p-6 sm:p-8 border border-rose-300/20 shadow-2xl space-y-3 relative group"
                  >
                    {/* Badge */}
                    <div className="inline-block px-3 py-1 rounded-full bg-rose-500/15 border border-rose-300/30 text-rose-200 text-xs font-sans-modern font-medium">
                      {item.badge}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-rose-100 group-hover:text-rose-300 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-serif-luxury italic text-amber-300">
                      {item.subtitle}
                    </p>

                    <p className="text-slate-300 text-xs sm:text-sm font-sans-modern leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-rose-300/70 font-sans-modern border-t border-white/5">
                      <span>Milestone #{item.id}</span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
                        With Kamal
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
