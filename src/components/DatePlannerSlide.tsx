/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Film,
  Waves,
  IceCream,
  Compass,
  Utensils,
  Tv,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Heart,
  Undo
} from "lucide-react";
import { DateIdea, INITIAL_DATE_IDEAS } from "../types";

// Icon mapper for the dynamic Lucide icons
const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "Film":
      return <Film id="film-icon" className={className} />;
    case "Waves":
      return <Waves id="waves-icon" className={className} />;
    case "IceCream":
      return <IceCream id="icecream-icon" className={className} />;
    case "Compass":
      return <Compass id="compass-icon" className={className} />;
    case "Utensils":
      return <Utensils id="utensils-icon" className={className} />;
    case "Tv":
      return <Tv id="tv-icon" className={className} />;
    default:
      return <Heart id="heart-fallback" className={className} />;
  }
};

interface DatePlannerSlideProps {
  onContinue: (rankedDates: DateIdea[]) => void;
  key?: string;
}

export default function DatePlannerSlide({ onContinue }: DatePlannerSlideProps) {
  const [dates, setDates] = useState<DateIdea[]>(() => {
    // Attempt to load previously ranked order
    const saved = localStorage.getItem("jessie_dates_ranking");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback to initial
      }
    }
    return [...INITIAL_DATE_IDEAS];
  });

  const [excitedMap, setExcitedMap] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("jessie_dates_excited");
    return saved ? JSON.parse(saved) : {};
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("jessie_dates_ranking", JSON.stringify(dates));
  }, [dates]);

  useEffect(() => {
    localStorage.setItem("jessie_dates_excited", JSON.stringify(excitedMap));
  }, [excitedMap]);

  // Handle re-ordering up or down
  const moveItem = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === dates.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const reordered = [...dates];
    
    // Swap positions
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    setDates(reordered);
  };

  // Toggle "Super Excited" star accent
  const toggleExcited = (id: string) => {
    setExcitedMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Reset to original sequence
  const resetRanking = () => {
    setDates([...INITIAL_DATE_IDEAS]);
    setExcitedMap({});
  };

  const topChoice = dates[0];
  const lastChoice = dates[dates.length - 1];

  return (
    <motion.div
      id="date-planner-slide"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen w-full flex flex-col items-center py-12 px-4 md:px-8 bg-artistic-cream text-artistic-charcoal dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-zinc-800 dark:text-zinc-100"
    >
      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center">
        
        {/* Title Block */}
        <div className="text-center mb-6">
          <div id="planner-tag" className="mb-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-artistic-sand dark:bg-zinc-800 text-artistic-dust dark:text-zinc-400 font-sans text-xs tracking-widest uppercase rounded-full border border-artistic-sepia/20">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-artistic-sepia" />
            Interactive Experience
          </div>
          <h1 id="planner-heading" className="font-serif text-3xl md:text-4xl font-semibold text-artistic-coffee dark:text-slate-100 tracking-wide">
            Design Our Ideal Dates
          </h1>
          <p id="planner-guide" className="font-sans text-xs uppercase tracking-widest leading-relaxed text-artistic-dust mt-2 max-w-md mx-auto">
            We've talked about so many plans! Organize these from <strong className="text-artistic-rose">first to last</strong> to tell me which ones you want to do first! Use the arrows or tap the hearts.
          </p>
        </div>

        {/* Dynamic Interactive List */}
        <div id="ideas-stack" className="w-full space-y-3.5 mb-8">
          <AnimatePresence mode="popLayout">
            {dates.map((item, index) => {
              const isFirst = index === 0;
              const isLast = index === dates.length - 1;
              const isExcited = excitedMap[item.id] || false;

              return (
                <motion.div
                  id={`date-card-${item.id}`}
                  key={item.id}
                  layout 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 110,
                    damping: 18,
                  }}
                  className={`relative overflow-hidden w-full flex items-center justify-between p-4 bg-white/90 dark:bg-zinc-900/40 border transition-all duration-300 ${
                    isFirst 
                      ? "border-artistic-sepia bg-artistic-sand/30 shadow-md ring-1 ring-artistic-beige" 
                      : isExcited
                      ? "border-artistic-rose/40"
                      : "border-artistic-beige"
                  } rounded-xl`}
                >
                  {/* Left rank label and card color bar */}
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center font-serif text-sm font-semibold shadow-inner ${
                      isFirst 
                        ? "bg-artistic-sepia text-white"
                        : index === 1
                        ? "bg-artistic-sand text-artistic-coffee"
                        : "bg-artistic-cream text-artistic-dust border border-artistic-beige"
                    }`}>
                      <span className="text-[9px] tracking-tighter uppercase font-sans">Rank</span>
                      <span className="leading-none mt-0.5">{index + 1}</span>
                    </div>

                    {/* App icon */}
                    <div className={`p-2.5 rounded-full bg-gradient-to-tr ${item.colorClass} text-white shadow-md shadow-zinc-200/50 dark:shadow-none`}>
                      <IconComponent name={item.iconName} className="w-4 h-4 stroke-[1.8]" />
                    </div>

                    {/* Title & Info */}
                    <div>
                      <h3 className="font-serif text-base md:text-lg font-bold text-artistic-coffee dark:text-zinc-100 flex items-center gap-2">
                        {item.title}
                        {isFirst && (
                          <span className="text-[10px] bg-artistic-sepia/10 text-artistic-sepia font-sans tracking-wide font-normal px-2 py-0.5 rounded-full border border-artistic-sepia/20 flex items-center gap-1">
                            🥇 Top Choice
                          </span>
                        )}
                        {isExcited && (
                          <span className="text-[10px] bg-artistic-rose/10 text-artistic-rose font-sans tracking-wide font-normal px-2 py-0.5 rounded-full border border-artistic-rose/20">
                            💖 Excited
                          </span>
                        )}
                      </h3>
                      <p className="font-sans text-xs text-artistic-dust dark:text-zinc-400 leading-relaxed max-w-sm mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Actions Block */}
                  <div className="flex items-center gap-2.5 relative z-10 pl-2">
                    {/* Add custom heart mark toggle */}
                    <button
                      type="button"
                      onClick={() => toggleExcited(item.id)}
                      className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
                        isExcited
                          ? "bg-artistic-rose/10 border-artistic-rose/40 text-artistic-rose"
                          : "border-artistic-beige hover:border-artistic-rose text-artistic-beige hover:text-artistic-rose"
                      }`}
                      title={isExcited ? "Marked as high interest" : "Express high interest"}
                    >
                      <Heart className={`w-4 h-4 ${isExcited ? "fill-current" : ""}`} />
                    </button>

                    {/* Up Arrow */}
                    <button
                      type="button"
                      disabled={isFirst}
                      onClick={() => moveItem(index, "up")}
                      className={`p-2 rounded-full border transition-all ${
                        isFirst
                          ? "opacity-25 cursor-not-allowed border-zinc-100 text-zinc-300"
                          : "border-artistic-beige hover:bg-artistic-cream text-artistic-coffee cursor-pointer"
                      }`}
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>

                    {/* Down Arrow */}
                    <button
                      type="button"
                      disabled={isLast}
                      onClick={() => moveItem(index, "down")}
                      className={`p-2 rounded-full border transition-all ${
                        isLast
                          ? "opacity-25 cursor-not-allowed border-zinc-100 text-zinc-300"
                          : "border-artistic-beige hover:bg-artistic-cream text-artistic-coffee cursor-pointer"
                      }`}
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Dynamic Locked-in Message Billboard */}
        <motion.div
          id="billboard-container"
          layout
          className="w-full bg-[#F2EBE4] rounded-2xl p-6 border-l-4 border-artistic-sepia shadow-sm text-center flex flex-col items-center justify-center gap-1.5"
        >
          <div className="p-1 px-3 bg-white text-xs text-artistic-sepia rounded-full font-sans tracking-wide font-semibold shadow-inner flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-artistic-rose text-artistic-rose stroke-none" />
            Our Dynamic Itinerary:
          </div>
          <p id="billboard-text" className="font-serif italic text-base md:text-lg text-artistic-mud max-w-lg leading-relaxed mt-1">
            "Jessie, our dreams are set! First we will secure our <span className="font-semibold text-artistic-rose not-italic">{topChoice.title}</span> 💖, and saving the sweet <span className="text-artistic-coffee not-italic font-semibold">{lastChoice.title}</span> to seal our time until eternity starts!"
          </p>

          <button
            type="button"
            onClick={resetRanking}
            className="mt-3 text-[10px] font-sans text-artistic-dust hover:text-artistic-charcoal flex items-center gap-1 underline underline-offset-2 cursor-pointer"
          >
            <Undo className="w-3 h-3" /> Reset Sequence
          </button>
        </motion.div>

        {/* Next Step Button */}
        <motion.button
          id="go-to-letter-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onContinue(dates)}
          className="mt-8 group relative inline-flex items-center gap-2 px-8 py-3.5 bg-artistic-coffee hover:bg-artistic-mud text-artistic-cream font-sans font-semibold tracking-wider text-xs uppercase rounded-full shadow-lg"
        >
          Read My Letter to You
          <Heart className="w-4 h-4 fill-artistic-cream stroke-none" />
        </motion.button>
      </div>
    </motion.div>
  );
}
