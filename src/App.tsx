/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import IntroSlide from "./components/IntroSlide";
import PoemIntroSlide from "./components/PoemIntroSlide";
import PoemSlide from "./components/PoemSlide";
import DatePlannerSlide from "./components/DatePlannerSlide";
import LetterSlide from "./components/LetterSlide";
import FinalSlide from "./components/FinalSlide";
import SakuraRain from "./components/SakuraRain";
import PasswordLock from "./components/PasswordLock";
import { DateIdea, INITIAL_DATE_IDEAS } from "./types";

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return localStorage.getItem("love_capsule_unlocked") === "true";
  });
  const [slideIndex, setSlideIndex] = useState(0);
  const [rankedDates, setRankedDates] = useState<DateIdea[]>(INITIAL_DATE_IDEAS);

  // Transition to next slide
  const nextSlide = () => {
    setSlideIndex((prev) => prev + 1);
  };

  // Re-run the slide journey from the beginning
  const restartJourney = () => {
    setSlideIndex(0);
  };

  const handleUnlock = () => {
    localStorage.setItem("love_capsule_unlocked", "true");
    setIsUnlocked(true);
  };

  const handleLock = () => {
    localStorage.removeItem("love_capsule_unlocked");
    setIsUnlocked(false);
    setSlideIndex(0);
  };

  // Handle saving the ranked dates list and advancing
  const handleDateSelection = (selectedList: DateIdea[]) => {
    setRankedDates(selectedList);
    nextSlide();
  };

  return (
    <div id="app-root" className="relative min-h-screen w-full bg-artistic-cream text-artistic-charcoal dark:bg-zinc-950 overflow-x-hidden selection:bg-artistic-sand selection:text-artistic-coffee">
      
      {/* Background Falling Sakura Petals (running on slides 1 and onwards for optimal aesthetic atmosphere) */}
      <SakuraRain active={isUnlocked && slideIndex > 0} />

      {/* Main Slide Presentation Deck Router */}
      <main className="relative z-10 min-h-screen w-full">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <PasswordLock key="password-lock" onUnlock={handleUnlock} />
          ) : (
            <>
              {slideIndex === 0 && (
                <IntroSlide key="intro" onComplete={nextSlide} />
              )}

              {slideIndex === 1 && (
                <PoemIntroSlide key="poem-intro" onContinue={nextSlide} />
              )}

              {slideIndex === 2 && (
                <PoemSlide key="poem" onContinue={nextSlide} />
              )}

              {slideIndex === 3 && (
                <DatePlannerSlide key="planner" onContinue={handleDateSelection} />
              )}

              {slideIndex === 4 && (
                <LetterSlide key="letter" onContinue={nextSlide} />
              )}

              {slideIndex === 5 && (
                <FinalSlide 
                  key="final" 
                  rankedDates={rankedDates} 
                  onRestart={restartJourney} 
                />
              )}
            </>
          )}
        </AnimatePresence>
      </main>

      {/* Secure Lock capsule session toggle for easy testing */}
      {isUnlocked && (
        <button
          onClick={handleLock}
          className="fixed bottom-4 right-4 z-50 text-[9px] uppercase tracking-widest text-artistic-sepia hover:text-artistic-rose transition-all cursor-pointer bg-white/80 backdrop-blur-sm border border-artistic-beige px-3 py-1.5 rounded-full shadow-md"
          title="Relock capsule for testing"
        >
          🔒 Lock Capsule
        </button>
      )}
    </div>
  );
}
