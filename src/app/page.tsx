"use client";

import React, { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import AmbientBackground from "@/components/AmbientBackground";

import OpeningStory from "@/components/OpeningStory";


import BirthdayConfession from "@/components/BirthdayConfession";
import ProposalSection from "@/components/ProposalSection";
import SecretInteractions from "@/components/SecretInteractions";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);
  const [boostVolume, setBoostVolume] = useState(false);

  const handleContinueStory = () => {
    setAutoPlayAudio(true);
    const nextEl = document.getElementById("birthday-confession");
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProposalTrigger = () => {
    setAutoPlayAudio(true);
    setBoostVolume(true);
  };

  return (
    <main className="relative min-h-screen bg-[#090314] text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* 1. Loading Preloader */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* 2. Scroll-Driven Ambient Backdrop & Canvas Particles */}
      <AmbientBackground />



      {/* 4. Secret Interactive Floating Easter Eggs */}
      {!isLoading && <SecretInteractions />}

      {/* 5. Main Narrative Flow */}
      {!isLoading && (
        <div className="relative z-10 space-y-16 sm:space-y-24">
          <OpeningStory onContinue={handleContinueStory} />


          <BirthdayConfession />
          <ProposalSection onProposalTriggered={handleProposalTrigger} />
          <Footer />
        </div>
      )}
    </main>
  );
}
