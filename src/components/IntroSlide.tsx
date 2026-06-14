/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Heart } from "lucide-react";

interface IntroSlideProps {
  onComplete: () => void;
  key?: string;
}

export default function IntroSlide({ onComplete }: IntroSlideProps) {
  const [secondsLeft, setSecondsLeft] = useState(6);
  const [isColorized, setIsColorized] = useState(false);

  useEffect(() => {
    // Stage 1: Change background from monochrome to beautiful colors after 1.5 seconds
    const colorTimer = setTimeout(() => {
      setIsColorized(true);
    }, 1500);

    // Stage 2: Tick countdown for progress indicator
    const countdownInterval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Stage 3: Auto-complete at 6.5s
    const completionTimer = setTimeout(() => {
      onComplete();
    }, 6500);

    return () => {
      clearTimeout(colorTimer);
      clearInterval(countdownInterval);
      clearTimeout(completionTimer);
    };
  }, [onComplete]);

  // Handlers to bypass early if they click or tap the screen
  const handleSkip = () => {
    onComplete();
  };

  return (
    <motion.div
      id="intro-slide"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      onClick={handleSkip}
      className={`relative min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 transition-all duration-3000 ease-in-out cursor-pointer select-none overflow-hidden ${
        isColorized
          ? "bg-artistic-cream text-artistic-charcoal dark:bg-zinc-950 dark:text-zinc-100"
          : "bg-zinc-900 text-zinc-300"
      }`}
    >
      {/* Background Ambience */}
      {isColorized && (
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-artistic-beige/40 dark:bg-zinc-900/40 z-0" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-artistic-beige/25 blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-artistic-sand/30 blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />
        </div>
      )}

      <div className="relative z-10 max-w-3xl w-full text-center flex flex-col items-center px-4">
        {/* Aesthetic Monochromatic-to-Color Animated Heart */}
        <motion.div
          id="intro-heart-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.5,
            scale: { type: "spring", stiffness: 80, damping: 15 },
          }}
          className="mb-8"
        >
          <div className={`p-4 rounded-full transition-all duration-2000 ${
            isColorized 
              ? "bg-artistic-sand/80 border border-artistic-sepia/30 dark:bg-zinc-800 text-artistic-coffee scale-110 drop-shadow-sm" 
              : "bg-zinc-800 text-zinc-500"
          }`}>
            <Heart 
              id="intro-heart-icon"
              className={`w-12 h-12 stroke-[1.2] ${isColorized ? "animate-heartbeat-slow fill-artistic-rose/20 text-artistic-rose" : ""}`} 
            />
          </div>
        </motion.div>

        {/* Dynamic Glowing Text Block */}
        <div id="intro-subtitle" className={`text-[10px] uppercase tracking-[0.3em] font-sans font-semibold mb-3 ${
          isColorized ? "text-artistic-taupe" : "text-zinc-500"
        }`}>
          Chapter One: The Encounter
        </div>
        <motion.h1
          id="intro-text"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className={`font-serif text-4xl md:text-5xl lg:text-6xl leading-tight tracking-wide font-light italic transition-colors duration-2000 ${
            isColorized 
              ? "text-artistic-coffee dark:text-amber-100" 
              : "text-zinc-400"
          }`}
        >
          I have known you for <span className="font-serif not-italic font-bold text-artistic-rose dark:text-rose-400">3 weeks</span> but you've touched my heart in more ways than anyone has.
        </motion.h1>

        {/* Informative tap-to-skip note */}
        <motion.p
          id="skip-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 3, duration: 1 }}
          className={`absolute bottom-12 font-sans text-xs tracking-widest uppercase flex items-center gap-1 transition-colors duration-2500 ${
            isColorized ? "text-artistic-dust dark:text-zinc-450" : "text-zinc-600"
          }`}
        >
          <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: "6s" }} />
          Tap screen to continue early
          <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: "6s" }} />
        </motion.p>

        {/* Progress Timer bar loader */}
        <div 
          id="progress-bar-container"
          className="absolute bottom-0 left-0 right-0 h-1.5 bg-zinc-200/20"
        >
          <motion.div
            id="progress-bar"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6.5, ease: "linear" }}
            className={`h-full ${
              isColorized 
                ? "bg-gradient-to-r from-artistic-sepia to-artistic-coffee" 
                : "bg-zinc-500"
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}
