/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, HelpCircle, ArrowRight, Heart } from "lucide-react";

interface PoemSlideProps {
  onContinue: () => void;
  key?: string;
}

export default function PoemSlide({ onContinue }: PoemSlideProps) {
  const [showRinSecret, setShowRinSecret] = useState(false);

  // Divide the poem beautifully into emotional stanzas
  const stanzas = [
    {
      lines: [
        "Jessie, to me You are My Rin,",
        "no one will know why I call you that,",
        "because to me you are the girl a guy like me",
        "could only dream of having...",
      ]
    },
    {
      lines: [
        "Because like Obito,",
        "he wanted Rin to live on in his dreams,",
        "you've made my world come to color in just 3 weeks,",
        "and like spring, our youthful days are plenty.",
      ]
    },
    {
      lines: [
        "We have showed love, held hands and kissed,",
        "but all of that has nothing on you,",
        "because I have only scratched the surface.",
      ]
    },
    {
      lines: [
        "I want to know the depth of Jessie, my sweet Rin,",
        "to learn and to love until eternity comes,",
        "which will be a very long time."
      ]
    }
  ];

  return (
    <motion.div
      id="poem-slide-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-12 px-4 md:px-12 overflow-y-auto bg-artistic-cream text-artistic-charcoal dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-zinc-800 dark:text-zinc-100"
    >
      {/* Dynamic Background Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-artistic-beige/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-artistic-sand/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />

      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center">
        
        {/* Poem Header / Ribbon */}
        <div id="poem-tag" className="mb-6 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-artistic-sand dark:bg-zinc-800 text-artistic-dust dark:text-zinc-400 font-sans text-xs tracking-widest uppercase rounded-full border border-artistic-sepia/30">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-artistic-sepia" />
          Handwritten with Love
        </div>

        {/* The Poem Board/Scroll representation with top-border accent of the creative design layout */}
        <div 
          id="poem-parchment"
          className="w-full bg-white border border-artistic-beige border-t-8 border-artistic-sepia rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle floral watermark in background */}
          <div className="absolute -bottom-12 -right-12 w-48 h-48 text-artistic-sand/30 pointer-events-none select-none">
            <Heart className="w-full h-full fill-current" />
          </div>

          <div className="space-y-8 md:space-y-10 relative z-10 text-center bg-[#251616] p-6 rounded-xl">
            {stanzas.map((stanza, sIdx) => (
              <motion.div
                key={sIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + sIdx * 0.4, duration: 0.8 }}
                className="text-center relative group"
              >
                {stanza.lines.map((line, lIdx) => (
                  <p
                    key={lIdx}
                    className="font-serif text-lg md:text-xl lg:text-2xl leading-relaxed text-artistic-mud dark:text-zinc-100 tracking-wide font-light odd:italic"
                  >
                    {line}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Secret Obito Rin clicker/modal explanation */}
          <div id="rin-tooltip-section" className="mt-10 pt-6 border-t border-artistic-beige flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowRinSecret(!showRinSecret)}
              className="inline-flex items-center gap-1.5 text-xs font-sans text-artistic-sepia hover:text-artistic-coffee dark:text-sakura-400 font-medium cursor-pointer relative"
            >
              <HelpCircle className="w-4 h-4 text-artistic-sepia animate-bounce" style={{ animationDuration: '3s' }} />
              Why do I call you "My Rin"? (Tap to find out)
            </motion.button>

            <AnimatePresence>
              {showRinSecret && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-3 overflow-hidden bg-[#F2EBE4] dark:bg-zinc-900/60 p-4 rounded-xl max-w-md text-center text-xs text-artistic-dust dark:text-zinc-450 border border-artistic-beige"
                >
                  <p className="leading-relaxed">
                    Like the character Obito, whose world remained grey and quiet, finding Rin filled his life with color, spring, and dreams. To me, you are my Rin — turning my screen and heart into vivid colors in just 3 short weeks! You're the girl a guy like me could only dream of holding forever.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Continuation Button */}
        <motion.button
          id="proceed-to-dates-button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="mt-8 group inline-flex items-center gap-2 px-8 py-4 w-full sm:w-auto justify-center bg-artistic-coffee hover:bg-artistic-mud text-artistic-cream font-sans tracking-widest text-sm uppercase rounded-full shadow-lg transition-all duration-300"
        >
          Pick Our Dates
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
}
