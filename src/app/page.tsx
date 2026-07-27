"use client";

import React, { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import AmbientBackground from "@/components/AmbientBackground";
import AudioPlayer from "@/components/AudioPlayer";
import OpeningStory from "@/components/OpeningStory";
import PolaroidGallery from "@/components/PolaroidGallery";
import LoveLetter from "@/components/LoveLetter";
import MemoryTimeline from "@/components/MemoryTimeline";
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
    const polaroidEl = document.getElementById("polaroid-memories");
    if (polaroidEl) {
      polaroidEl.scrollIntoView({ behavior: "smooth" });
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

      {/* 3. Floating Audio Player */}
      <AudioPlayer
        autoPlayTriggered={autoPlayAudio}
        onVolumeBoost={boostVolume}
      />

      {/* 4. Secret Interactive Floating Easter Eggs */}
      {!isLoading && <SecretInteractions />}

      {/* 5. Main Narrative Flow */}
      {!isLoading && (
        <div className="relative z-10 space-y-16 sm:space-y-24">
          <OpeningStory onContinue={handleContinueStory} />
          <PolaroidGallery />
          <LoveLetter />
          <MemoryTimeline />
          <BirthdayConfession />
          <ProposalSection onProposalTriggered={handleProposalTrigger} />
          <Footer />
        </div>
      )}
    </main>
  );
}
