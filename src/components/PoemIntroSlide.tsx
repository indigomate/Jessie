/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { BookOpen, Sparkles, Heart } from "lucide-react";

interface PoemIntroSlideProps {
  onContinue: () => void;
  key?: string;
}

export default function PoemIntroSlide({ onContinue }: PoemIntroSlideProps) {
  return (
    <motion.div
      id="poem-intro-slide"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden bg-artistic-cream text-artistic-charcoal dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-zinc-800 dark:text-zinc-100"
    >
      {/* Decorative floral backgrounds */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-artistic-beige opacity-50 z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-artistic-sand/40 rounded-full blur-3xl" />

      {/* Main card representation with Artistic border-t-8 */}
      <div className="relative z-10 max-w-lg w-full bg-white p-8 md:p-12 border border-artistic-beige rounded-2xl border-t-8 border-artistic-sepia shadow-2xl text-center flex flex-col items-center">
        
        {/* Decorative Blooming Sparkles */}
        <motion.div
          id="poem-intro-icon-group"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="relative mb-6"
        >
          <div className="absolute -top-3 -right-3 text-artistic-sepia animate-pulse">
            <Sparkles className="w-5 h-5 fill-artistic-sand" />
          </div>
          <div className="p-4 bg-artistic-sand text-artistic-coffee rounded-full border border-artistic-beige shadow-sm">
            <BookOpen id="book-icon" className="w-8 h-8 stroke-[1.2]" />
          </div>
        </motion.div>

        {/* Catchy romantic intro */}
        <div id="chapter-mark" className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-artistic-tauo pb-2 text-artistic-taupe">
          Chapter Two: The Written Word
        </div>
        <h2 id="poem-intro-salutation" className="font-serif italic text-xl md:text-2xl text-artistic-clay mb-2">
          Dearest Jessie...
        </h2>

        {/* Major highlight statement */}
        <h1 id="poem-intro-heading" className="font-serif text-3xl md:text-4xl font-semibold leading-relaxed text-artistic-coffee mb-6 tracking-wide">
          I have a poem I wrote for you.
        </h1>

        <p id="poem-intro-subtext" className="font-sans text-xs uppercase tracking-widest leading-relaxed text-artistic-dust mb-8 max-w-xs">
          Just a little slice of how you made my spring come to full bloom in these incredible three weeks.
        </p>

        {/* Elegant glowing interactive clicker button */}
        <motion.button
          id="read-poem-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="group relative inline-flex items-center gap-2 px-8 py-4 bg-artistic-coffee hover:bg-artistic-mud text-artistic-cream font-serif tracking-widest text-lg rounded-full shadow-lg transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            Continue To Read
            <Heart className="w-5 h-5 fill-artistic-cream stroke-none scale-90 group-hover:scale-110 transition-transform duration-300" />
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
