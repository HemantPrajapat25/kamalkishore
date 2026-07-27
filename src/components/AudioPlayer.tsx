"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Music, Volume2, VolumeX, Play, Pause, Sparkles, ChevronUp, Link as LinkIcon, Radio, Youtube } from "lucide-react";

interface SongTrack {
  id: string;
  name: string;
  artist: string;
  type: "mp3" | "youtube";
  src: string; // mp3 URL or YouTube video ID
}

// ── YouTube video ID extracted from https://youtu.be/PjYJFzGMQ_Q ──
const PLAYLIST: SongTrack[] = [
  {
    id: "yt-kamal",
    name: "Kamal's Special Song 🎵",
    artist: "YouTube • Auto-play",
    type: "youtube",
    src: "PjYJFzGMQ_Q",
  },
  {
    id: "funny-1",
    name: "Cute & Cheesy Love 🥰",
    artist: "Fun Romance Vibes",
    type: "mp3",
    src: "https://cdn.pixabay.com/download/audio/2023/06/13/audio_8d5e5ccede.mp3",
  },
  {
    id: "funny-2",
    name: "Silly in Love 😜❤️",
    artist: "Ukulele Romance",
    type: "mp3",
    src: "https://cdn.pixabay.com/download/audio/2022/01/13/audio_8e5b6b9cf5.mp3",
  },
  {
    id: "funny-3",
    name: "Sweet Ukulele Love 🌸",
    artist: "Breezy Romantic",
    type: "mp3",
    src: "https://cdn.pixabay.com/download/audio/2022/03/09/audio_d1718ab41b.mp3",
  },
  {
    id: "piano",
    name: "Classic Piano Romance 🎹",
    artist: "Timeless Love",
    type: "mp3",
    src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
  },
];

interface AudioPlayerProps {
  autoPlayTriggered?: boolean;
  onVolumeBoost?: boolean;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        options: {
          videoId: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  setVolume: (volume: number) => void;
  mute: () => void;
  unMute: () => void;
  loadVideoById: (videoId: string) => void;
  getPlayerState: () => number;
  destroy: () => void;
}

export default function AudioPlayer({
  autoPlayTriggered = false,
  onVolumeBoost = false,
}: AudioPlayerProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const [showCustomUrlBox, setShowCustomUrlBox] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState("");
  const [playlist, setPlaylist] = useState<SongTrack[]>(PLAYLIST);
  const [ytReady, setYtReady] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytPlayerRef = useRef<YTPlayer | null>(null);
  const ytContainerRef = useRef<HTMLDivElement | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const synthContextRef = useRef<AudioContext | null>(null);

  const currentSong = playlist[currentSongIndex];
  const isYouTube = currentSong.type === "youtube";

  // ── Load YouTube IFrame API once ──
  useEffect(() => {
    if (document.getElementById("yt-iframe-api")) {
      if (window.YT) setYtReady(true);
      return;
    }
    const tag = document.createElement("script");
    tag.id = "yt-iframe-api";
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => setYtReady(true);
  }, []);

  // ── Create / destroy YT player when YT song is selected ──
  useEffect(() => {
    if (!isYouTube) {
      ytPlayerRef.current?.destroy();
      ytPlayerRef.current = null;
      return;
    }
    if (!ytReady) return;

    // Small delay so the DOM container is mounted
    const timer = setTimeout(() => {
      if (!document.getElementById("yt-player-div")) return;
      ytPlayerRef.current?.destroy();

      ytPlayerRef.current = new window.YT.Player("yt-player-div", {
        videoId: currentSong.src,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: currentSong.src,
          modestbranding: 1,
          rel: 0,
          enablejsapi: 1,
        },
        events: {
          onReady: (e) => {
            e.target.setVolume(isMuted ? 0 : volume);
          },
        },
      });
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isYouTube, ytReady, currentSong.src]);

  // ── Web Audio Synth fallback (mp3 failed) ──
  const startSynth = useCallback(() => {
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!synthContextRef.current) synthContextRef.current = new Ctx();
      const ctx = synthContextRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const chords = [
        [349.23, 440.0, 523.25, 659.25],
        [261.63, 329.63, 392.0, 493.88],
        [220.0, 261.63, 329.63, 392.0],
        [196.0, 246.94, 293.66, 392.0],
      ];
      let ci = 0;
      const play = () => {
        if (!ctx || ctx.state !== "running") return;
        const chord = chords[ci++ % chords.length];
        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          const now = ctx.currentTime;
          const vol = (isMuted ? 0 : volume / 100) * 0.07;
          gain.gain.setValueAtTime(0.001, now + idx * 0.18);
          gain.gain.exponentialRampToValueAtTime(vol, now + idx * 0.18 + 0.8);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.18 + 3.8);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.18);
          osc.stop(now + idx * 0.18 + 4.0);
        });
      };
      play();
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = setInterval(play, 4200);
    } catch (e) {
      console.warn("Synth error:", e);
    }
  }, [volume, isMuted]);

  const stopSynth = useCallback(() => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  }, []);

  // ── Toggle Play / Pause ──
  const togglePlay = useCallback(() => {
    if (isYouTube) {
      if (!ytPlayerRef.current) return;
      if (isPlaying) {
        ytPlayerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
      }
      return;
    }

    // MP3 track
    if (isPlaying) {
      audioRef.current?.pause();
      stopSynth();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
          startSynth();
          setIsPlaying(true);
        });
      } else {
        startSynth();
        setIsPlaying(true);
      }
    }
  }, [isPlaying, isYouTube, startSynth, stopSynth]);

  // ── Select Track ──
  const handleSelectSong = (index: number) => {
    audioRef.current?.pause();
    ytPlayerRef.current?.stopVideo();
    stopSynth();
    setIsPlaying(false);
    setCurrentSongIndex(index);
    setShowPlaylistMenu(false);

    setTimeout(() => {
      const track = playlist[index];
      if (track.type === "mp3" && audioRef.current) {
        audioRef.current.src = track.src;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
          startSynth();
          setIsPlaying(true);
        });
      } else if (track.type === "youtube" && ytPlayerRef.current) {
        ytPlayerRef.current.loadVideoById(track.src);
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
      }
    }, 400);
  };

  // ── Auto-play on Continue click ──
  useEffect(() => {
    if (autoPlayTriggered && !isPlaying) togglePlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayTriggered]);

  // ── Volume boost on Proposal ──
  useEffect(() => {
    if (!onVolumeBoost) return;
    setVolume(90);
    if (audioRef.current) audioRef.current.volume = 0.9;
    ytPlayerRef.current?.setVolume(90);
  }, [onVolumeBoost]);

  // ── Sync volume to audio element ──
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume / 100;
    ytPlayerRef.current?.setVolume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  // ── Add Custom YouTube URL or MP3 ──
  const handleAddCustom = () => {
    const val = customUrlInput.trim();
    if (!val) return;

    // Detect YouTube URL
    const ytMatch = val.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([a-zA-Z0-9_-]{11})/
    );

    const newTrack: SongTrack = ytMatch
      ? {
          id: `yt-custom-${Date.now()}`,
          name: "Custom YouTube Song 🎵",
          artist: "YouTube",
          type: "youtube",
          src: ytMatch[1],
        }
      : {
          id: `mp3-custom-${Date.now()}`,
          name: "Custom Song 🎵",
          artist: "Custom Audio",
          type: "mp3",
          src: val,
        };

    setPlaylist((prev) => [newTrack, ...prev]);
    setCurrentSongIndex(0);
    setCustomUrlInput("");
    setShowCustomUrlBox(false);
    setShowPlaylistMenu(false);

    setTimeout(() => handleSelectSong(0), 300);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">

      {/* Hidden YouTube IFrame container */}
      {isYouTube && (
        <div
          ref={ytContainerRef}
          style={{
            position: "fixed",
            bottom: "-200px",
            left: "-200px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <div id="yt-player-div" />
        </div>
      )}

      {/* Playlist Menu Popover */}
      {showPlaylistMenu && (
        <div className="mb-3 w-72 rounded-2xl p-4 border border-rose-300/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)] space-y-3 bg-[#130728]/97 backdrop-blur-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-1.5 text-rose-200 font-serif-luxury text-sm font-medium">
              <Radio className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Choose Soundtrack</span>
            </div>
            <button onClick={() => setShowPlaylistMenu(false)} className="text-xs text-slate-400 hover:text-white">✕</button>
          </div>

          {/* Track List */}
          <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
            {playlist.map((track, idx) => (
              <button
                key={track.id}
                onClick={() => handleSelectSong(idx)}
                className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors ${
                  idx === currentSongIndex
                    ? "bg-rose-500/25 border border-rose-400/40 text-rose-100 font-semibold"
                    : "hover:bg-white/5 text-slate-300"
                }`}
              >
                {track.type === "youtube" ? (
                  <Youtube className="w-3.5 h-3.5 text-red-400 shrink-0" />
                ) : (
                  <Music className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                )}
                <div className="truncate flex-1">
                  <p className="truncate font-medium">{track.name}</p>
                  <p className="text-[10px] text-slate-400">{track.artist}</p>
                </div>
                {idx === currentSongIndex && isPlaying && (
                  <Sparkles className="w-3 h-3 text-amber-300 animate-spin shrink-0" />
                )}
              </button>
            ))}
          </div>

          {/* Custom URL input */}
          <div className="pt-2 border-t border-white/10 text-center">
            {!showCustomUrlBox ? (
              <button
                onClick={() => setShowCustomUrlBox(true)}
                className="text-xs text-amber-300 hover:text-amber-200 flex items-center justify-center gap-1 mx-auto"
              >
                <LinkIcon className="w-3 h-3" />
                Paste YouTube / MP3 link
              </button>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="https://youtu.be/... or .mp3"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  className="w-full bg-slate-900 border border-white/20 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-500"
                />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setShowCustomUrlBox(false)} className="text-xs text-slate-400 px-2 py-1">Cancel</button>
                  <button onClick={handleAddCustom} className="text-xs bg-rose-500 text-white px-3 py-1 rounded font-semibold">
                    Add & Play
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Audio Control Bar */}
      <div className="flex items-center gap-3 bg-[#130728]/85 backdrop-blur-xl border border-rose-300/30 p-2.5 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:border-rose-400/60 transition-all group">

        {/* Hidden MP3 audio element */}
        {!isYouTube && (
          <audio ref={audioRef} src={currentSong.src} loop preload="auto" />
        )}

        {/* Play / Pause Button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer"
        >
          <div className={`absolute inset-0 rounded-full bg-rose-400/40 blur-md ${isPlaying ? "animate-pulse" : ""}`} />
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white z-10" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5 z-10" />
          )}
          {isPlaying && (
            <Music className="w-3.5 h-3.5 text-pink-200 absolute -top-5 animate-bounce opacity-80" />
          )}
        </button>

        {/* Track name + playlist toggle */}
        <div
          onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
          className="hidden sm:flex flex-col pr-1 min-w-[110px] max-w-[140px] cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs font-serif-luxury font-medium text-rose-200">
            <span className="truncate">{currentSong.name}</span>
            <ChevronUp className={`w-3.5 h-3.5 text-amber-300 ml-1 transition-transform ${showPlaylistMenu ? "rotate-180" : ""}`} />
          </div>
          {/* Sound wave bars */}
          <div className="flex items-end gap-0.5 h-3 mt-1">
            {[0.6, 0.9, 0.4, 1, 0.7, 0.5].map((h, i) => (
              <div
                key={i}
                className={`w-1 rounded-full bg-rose-400 transition-all duration-300 ${isPlaying ? "animate-pulse" : "opacity-30"}`}
                style={{ height: isPlaying ? `${h * 100}%` : "3px", animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-2 pr-2 border-l border-white/10 pl-2">
          <button onClick={() => setIsMuted(!isMuted)} aria-label={isMuted ? "Unmute" : "Mute"}>
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-pink-200" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            step="2"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseInt(e.target.value));
              setIsMuted(false);
            }}
            className="w-16 h-1.5 accent-rose-400 bg-white/20 rounded-lg appearance-none cursor-pointer"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
}
