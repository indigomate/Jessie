/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MailOpen, Sparkles, Heart, Clock } from "lucide-react";

interface LetterSlideProps {
  onContinue: () => void;
  key?: string;
}

export default function LetterSlide({ onContinue }: LetterSlideProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      id="letter-slide"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden bg-artistic-cream text-artistic-charcoal dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-zinc-800 dark:text-zinc-100"
    >
      {/* Dynamic Ambient Cherry Blossoms on background */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-artistic-beige/25 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-artistic-sand/30 blur-3xl animate-pulse" />

      <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center">
        
        {/* Title Tag */}
        <div id="letter-title-tag" className="mb-6 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-artistic-sand dark:bg-zinc-800 text-artistic-dust dark:text-zinc-400 font-sans text-xs tracking-widest uppercase rounded-full border border-artistic-sepia/20 shadow-sm">
          <Clock className="w-3.5 h-3.5 animate-pulse text-artistic-sepia" />
          A Letter For You
        </div>

        {/* The Envelope Component */}
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              id="sealed-envelope-container"
              key="closed-envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              onClick={() => setIsOpen(true)}
              className="max-w-md w-full bg-white dark:bg-zinc-900 border border-artistic-beige border-t-8 border-artistic-sepia p-8 rounded-2xl shadow-xl cursor-pointer group flex flex-col items-center hover:border-artistic-sepia transition-all duration-300"
            >
              {/* Closed Envelope wax-seal graphic */}
              <div className="w-16 h-16 rounded-full bg-artistic-sand border-2 border-artistic-beige text-artistic-coffee flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-md">
                <Mail className="w-8 h-8 stroke-[1.2]" />
              </div>

              <h2 className="font-serif italic text-xl text-artistic-coffee dark:text-sakura-400 mb-2">
                To My Dear Jessie
              </h2>
              <p className="font-serif text-sm text-artistic-dust leading-relaxed max-w-xs mb-6">
                Waiting inside is the memory of us since the day we met. Please break the seal and read.
              </p>

              <div id="shining-stamp-label" className="px-5 py-2.5 bg-artistic-coffee text-artistic-cream font-sans text-xs tracking-wider uppercase font-semibold rounded-full shadow-md">
                Tap to Open Letter 🌸
              </div>
            </motion.div>
          ) : (
            <motion.div
              id="open-letter-box"
              key="opened-envelope"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 80, damping: 14 }}
              className="w-full bg-white border border-artistic-beige border-t-8 border-artistic-sepia p-8 md:p-10 rounded-2xl shadow-2xl relative"
            >
              {/* Opened Envelope Indicator */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-artistic-coffee text-white flex items-center justify-center border-4 border-white dark:border-zinc-900 shadow-lg">
                <MailOpen className="w-5 h-5" />
              </div>

              {/* Envelope Body / Content */}
              <div className="mt-4 text-left">
                {/* Letter Salutation */}
                <h3 className="font-serif italic text-xl md:text-2xl text-artistic-clay mb-6">
                  Dear Jessie,
                </h3>

                {/* Main letter block edited to reflect user's raw text crafted elegantly */}
                <div className="space-y-4 font-serif text-base md:text-lg leading-relaxed text-artistic-mud dark:text-zinc-100 font-light text-justify bg-[#251616]">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                  >
                    I am a man who has fallen for you. I've never been good with a lot of things, but loving you has found me hopeless and determined to see this till the end of eternity, which will never come.
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.3, duration: 1 }}
                  >
                    You make me want to make a better man of myself. Pray for me when you pray, and keep us close, as my heart has kept the memory of you since the day we met.
                  </motion.p>
                </div>
              </div>

              {/* Heart and Sparkles accents inside the open letter */}
              <div className="mt-8 flex justify-center gap-1.5 text-artistic-rose">
                <Sparkles className="w-4 h-4" />
                <Heart className="w-5 h-5 fill-artistic-rose stroke-none animate-pulse" />
                <Sparkles className="w-4 h-4" />
              </div>

              {/* Button to proceed to final Slide */}
              <motion.button
                id="eternity-button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.5, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContinue}
                className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-artistic-coffee hover:bg-artistic-mud text-artistic-cream font-serif tracking-widest text-xs uppercase rounded-full shadow-lg transition-all duration-300 cursor-pointer"
              >
                Until Eternity...
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
