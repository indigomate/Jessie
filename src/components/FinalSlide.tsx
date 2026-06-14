/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Star, Calendar } from "lucide-react";
import { DateIdea } from "../types";

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface FinalSlideProps {
  rankedDates: DateIdea[];
  onRestart: () => void;
  key?: string;
}

export default function FinalSlide({ rankedDates, onRestart }: FinalSlideProps) {
  const [particles, setParticles] = useState<HeartParticle[]>([]);
  const [particleIdCounter, setParticleIdCounter] = useState(0);

  // Trigger floating heart on click/tap anywhere on the canvas
  const handleCanvasClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Sweet romantic pastel colors for interactive tapping
    const colors = [
      "text-rose-400",
      "text-sakura-400",
      "text-pink-400",
      "text-rose-500",
      "text-fuchsia-400",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomSize = 20 + Math.random() * 24; // size in px

    const newParticle: HeartParticle = {
      id: particleIdCounter,
      x,
      y,
      size: randomSize,
      color: randomColor,
    };

    setParticles((prev) => [...prev, newParticle].slice(-20)); // Limit active particles to 20 for top performance
    setParticleIdCounter((prev) => prev + 1);
  };

  // Extract the top 3 chosen dates for the beautiful itinerary card
  const topDates = rankedDates.slice(0, 3);

  return (
    <motion.div
      id="final-slide"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      onClick={handleCanvasClick}
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-12 px-4 md:px-8 bg-artistic-cream text-artistic-charcoal cursor-heart select-none overflow-hidden"
    >
      {/* Tap Instruction */}
      <div className="absolute top-6 text-center z-13 pointer-events-none opacity-40">
        <p className="text-[10px] font-sans tracking-widest uppercase flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-artistic-sepia" />
          Tap anywhere to spawn love
          <Sparkles className="w-3 h-3 text-artistic-sepia" />
        </p>
      </div>

      {/* Floating Particles Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ opacity: 1, scale: 0.3, x: particle.x - particle.size / 2, y: particle.y - particle.size / 2 }}
              animate={{ opacity: 0, scale: 1.6, y: particle.y - 120 - Math.random() * 60, r: [-10, 10, -5] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={`absolute ${particle.color}`}
              style={{ width: particle.size, height: particle.size }}
            >
              <Heart className="w-full h-full fill-current stroke-none" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-12 max-w-xl w-full flex flex-col items-center text-center">
        {/* Giant cinematic throbbing dynamic heart */}
        <motion.div
          id="final-beating-heart-container"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
          className="mb-8 p-6 bg-artistic-sand/80 border border-artistic-beige rounded-full shadow-xl"
        >
          <Heart className="w-16 h-16 fill-artistic-rose text-artistic-rose stroke-none" />
        </motion.div>

        {/* The Final Highlighted Bold Slogan */}
        <h1 
          id="final-slogan"
          className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-artistic-coffee mb-3"
        >
          I love you forever
        </h1>
        
        <p id="final-subtext" className="font-serif italic text-lg md:text-xl text-artistic-taupe max-w-sm mb-8 leading-relaxed">
          Through all seasons and spring, every heart-tick belongs to you, Jessie.
        </p>

        {/* Personalized Souvenir Card detailing her ranked dates */}
        <motion.div
          id="keepsake-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-full bg-white border border-artistic-beige border-t-8 border-artistic-sepia p-6 rounded-2xl shadow-2xl max-w-md"
        >
          <div className="flex items-center justify-center gap-1.5 text-xs text-artistic-sepia font-sans tracking-widest uppercase font-semibold mb-4 border-b border-artistic-beige pb-3">
            <Calendar className="w-4 h-4" />
            Our Backlog of Autumn & Springs
          </div>

          <p className="font-sans text-[11px] uppercase tracking-wider text-artistic-dust text-left mb-3.5 italic leading-relaxed">
            Here are the initial sweet adventures you prioritized. I will see each one made into beautiful realities:
          </p>

          <div id="keepsake-itinerary" className="space-y-2 text-left">
            {topDates.map((date, idx) => (
              <div 
                key={date.id} 
                className="flex items-center gap-3 p-2.5 rounded-xl bg-artistic-cream border border-artistic-beige"
              >
                <div className="w-6 h-6 rounded-full bg-artistic-sepia text-white flex items-center justify-center font-serif text-xs font-semibold">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-artistic-mud">
                    {date.title}
                  </h4>
                </div>
                <div className="ml-auto text-artistic-rose">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            ))}
            {rankedDates.length > 3 && (
              <p className="text-[10px] font-sans text-artistic-rose uppercase tracking-widest text-center mt-3">
                ...followed by the remaining {rankedDates.length - 3} magical dates on our eternity tracker! 💖
              </p>
            )}
          </div>
        </motion.div>

        {/* Restart/Rewatch Slide Sequence action */}
        <motion.button
          id="replay-button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          onClick={(e) => {
            e.stopPropagation(); // Avoid triggering particle clicks on button
            onRestart();
          }}
          className="mt-8 text-xs font-sans uppercase tracking-widest text-artistic-dust hover:text-artistic-rose cursor-pointer underline underline-offset-4 transition-colors duration-300"
        >
          Rewatch Our Journey
        </motion.button>
      </div>
    </motion.div>
  );
}
