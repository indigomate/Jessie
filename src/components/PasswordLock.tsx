import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Unlock, Clock, Sparkles, KeyRound, Settings, CheckCircle, AlertCircle, Heart } from "lucide-react";

interface PasswordLockProps {
  onUnlock: () => void;
  key?: string;
}

export default function PasswordLock({ onUnlock }: PasswordLockProps) {
  // Target Time: June 14, 2026, 03:48:31 AM PDT (8 hours from original local start time of the prompt)
  // Let's store configuration in localStorage so the user can easily test the real-time transition with custom settings
  const defaultTargetTime = new Date("2026-06-14T03:48:31-07:00").getTime();
  
  const [targetTime, setTargetTime] = useState<number>(() => {
    const saved = localStorage.getItem("love_capsule_target_time");
    return saved ? parseInt(saved, 10) : defaultTargetTime;
  });

  const [password, setPassword] = useState<string>(() => {
    return localStorage.getItem("love_capsule_password") || "jessie23/02";
  });

  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, totalMs: 0 });
  const [showConfig, setShowConfig] = useState(false);
  const [configHoursInput, setConfigHoursInput] = useState("8");
  const [configPassInput, setConfigPassInput] = useState(password);

  // Real-time Countdown timer loop
  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, totalMs: 0 });
      } else {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds, totalMs: difference });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  const isLocked = timeLeft.totalMs > 0;

  const handleUnlockAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) {
      setError("The love capsule is still sealed! Wait for the countdown to expire.");
      return;
    }

    if (inputPassword.trim().toLowerCase() === password.trim().toLowerCase()) {
      setError("");
      setSuccess(true);
      setTimeout(() => {
        onUnlock();
      }, 1500); // Give time for success animation with heart sparkle
    } else {
      setError("Incorrect password!");
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const hours = parseFloat(configHoursInput);
    if (isNaN(hours) || hours < 0) {
      alert("Please enter a valid positive number of hours");
      return;
    }

    const newTarget = Date.now() + hours * 60 * 60 * 1000;
    const newPass = configPassInput.trim();

    localStorage.setItem("love_capsule_target_time", newTarget.toString());
    localStorage.setItem("love_capsule_password", newPass);
    
    setTargetTime(newTarget);
    setPassword(newPass);
    setShowConfig(false);
    setInputPassword("");
    setError("");
  };

  const setTestTimerSeconds = (sec: number) => {
    const newTarget = Date.now() + sec * 1000;
    localStorage.setItem("love_capsule_target_time", newTarget.toString());
    setTargetTime(newTarget);
    setShowConfig(false);
    setInputPassword("");
    setError("");
  };

  const padZero = (num: number) => String(num).padStart(2, "0");

  return (
    <div id="password-lock-screen" className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden bg-artistic-cream text-artistic-charcoal dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      
      {/* Dynamic Background Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-artistic-beige/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-artistic-sand/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />

      {/* Love Capsule Main Card */}
      <motion.div 
        id="lock-card"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-md w-full bg-white border border-artistic-beige border-t-8 border-artistic-sepia rounded-2xl p-8 md:p-10 shadow-2xl text-center flex flex-col items-center"
      >
        {/* Animated Icon Lock State */}
        <div className="relative mb-6">
          <AnimatePresence mode="wait">
            {isLocked ? (
              <motion.div
                key="locked-badge"
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 10, scale: 0.8 }}
                className="p-5 bg-artistic-sand text-artistic-coffee rounded-full border border-artistic-beige shadow-sm"
              >
                <Lock className="w-10 h-10 stroke-[1.2]" />
              </motion.div>
            ) : (
              <motion.div
                key="unlocked-badge"
                initial={{ scale: 0.8, y: -5 }}
                animate={{ scale: 1.1, y: 0 }}
                className="p-5 bg-artistic-rose/10 text-artistic-rose rounded-full border border-artistic-rose/30 shadow-md"
              >
                {success ? (
                  <CheckCircle className="w-10 h-10 stroke-[1.2] text-artistic-rose animate-bounce" />
                ) : (
                  <Unlock className="w-10 h-10 stroke-[1.2] text-artistic-rose animate-pulse" />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sparkle decorative element */}
          <div className="absolute -top-2 -right-2 text-artistic-sepia animate-pulse">
            <Sparkles className="w-5 h-5 fill-artistic-sand text-artistic-sepia" />
          </div>
        </div>

        {/* Title & Prompt */}
        <div id="countdown-chapter-tag" className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-artistic-taupe mb-2">
          Time-Locked Memory Capsule
        </div>
        
        <h1 id="lock-title" className="font-serif text-2xl md:text-3xl font-bold leading-normal text-artistic-coffee mb-3">
          {isLocked ? "The Sealed Letter" : "The Seal is Broken!"}
        </h1>

        <p id="lock-description" className="font-sans text-xs uppercase tracking-widest leading-relaxed text-artistic-dust mb-6 px-2">
          {isLocked 
            ? "I prepared a hidden message of my feelings for you. It stays safe under lock and key until the timer below runs dry."
            : "The wait is over, Jessie! Enter the secret key to open the capsule."}
        </p>

        {/* Countdown Timer Display (Runs in real time) */}
        {isLocked ? (
          <div id="countdown-digits-wrapper" className="w-full bg-[#F2EBE4] border border-artistic-beige p-5 rounded-xl mb-6 flex flex-col items-center">
            <div className="flex items-center gap-1 text-[10px] font-sans uppercase tracking-widest text-artistic-sepia mb-2 font-medium">
              <Clock className="w-3.5 h-3.5 text-artistic-sepia animate-spin" style={{ animationDuration: "12s" }} />
              Capsule Unlocks In
            </div>
            
            <div className="flex justify-center items-center gap-4">
              <div className="flex flex-col items-center">
                <span className="font-mono text-3xl font-normal text-artistic-coffee">
                  {padZero(timeLeft.hours)}
                </span>
                <span className="text-[8px] uppercase tracking-wider font-sans text-artistic-dust mt-0.5">Hours</span>
              </div>
              <span className="font-mono text-xl text-artistic-sepia -mt-4 animate-pulse">:</span>
              <div className="flex flex-col items-center">
                <span className="font-mono text-3xl font-normal text-artistic-coffee">
                  {padZero(timeLeft.minutes)}
                </span>
                <span className="text-[8px] uppercase tracking-wider font-sans text-artistic-dust mt-0.5">Mins</span>
              </div>
              <span className="font-mono text-xl text-artistic-sepia -mt-4 animate-pulse">:</span>
              <div className="flex flex-col items-center">
                <span className="font-mono text-3xl font-normal text-artistic-coffee">
                  {padZero(timeLeft.seconds)}
                </span>
                <span className="text-[8px] uppercase tracking-wider font-sans text-artistic-dust mt-0.5">Secs</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full bg-[#EBF5EE] border border-emerald-100 p-4 rounded-xl mb-6 flex items-center justify-center gap-2 text-xs text-emerald-800 font-sans tracking-wide">
            <Heart className="w-4 h-4 fill-emerald-500 stroke-none animate-pulse" />
            The real-time lock is open. Enter the password below!
          </div>
        )}

        {/* Locked Placeholder or Unlock Form */}
        <form onSubmit={handleUnlockAttempt} className="w-full space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-artistic-sepia">
              <KeyRound className="w-4 h-4" />
            </div>
            <input
              type="password"
              disabled={isLocked}
              placeholder={isLocked ? "Locked until countdown completes" : "Type Passion/Secret word here..."}
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className={`w-full text-center pl-10 pr-4 py-3 bg-white border outline-none font-sans text-sm rounded-xl transition-all ${
                isLocked 
                  ? "border-[#E8DFD8] bg-[#F9F7F2]/50 cursor-not-allowed text-[#A38E7A]/50 placeholder-[#A38E7A]/30" 
                  : "border-artistic-sepia focus:border-artistic-rose focus:ring-1 focus:ring-artistic-rose text-artistic-coffee placeholder-[#A38E7A]/60"
              }`}
            />
          </div>

          {error && (
            <div className="text-left text-xs text-artistic-rose flex items-start gap-1 p-2.5 bg-rose-50 border border-rose-100 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="py-3 px-6 bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-sans rounded-xl font-medium animate-pulse flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 fill-emerald-500 stroke-none" />
              Perfect! Opening My Heart...
            </div>
          ) : (
            <motion.button
              whileHover={isLocked ? {} : { scale: 1.02 }}
              whileTap={isLocked ? {} : { scale: 0.98 }}
              type="submit"
              disabled={isLocked}
              className={`w-full py-3.5 font-sans font-semibold tracking-wider text-xs uppercase rounded-xl transition-all shadow-md ${
                isLocked 
                  ? "bg-[#D8D0C7] text-[#FAF9F5] cursor-not-allowed shadow-none" 
                  : "bg-artistic-coffee hover:bg-artistic-mud text-artistic-cream cursor-pointer"
              }`}
            >
              {isLocked ? "Seal Active" : "Unlock Memories 🌸"}
            </motion.button>
          )}
        </form>

        {/* Small subtle Admin panel toggler for user testing */}
        <div className="mt-8 border-t border-artistic-beige w-full pt-4 flex flex-col items-center">
          <button 
            onClick={() => setShowConfig(!showConfig)}
            className="inline-flex items-center gap-1.5 text-[9px] font-sans tracking-widest uppercase text-artistic-sepia hover:text-artistic-coffee"
          >
            <Settings className="w-3 h-3 text-artistic-sepia animate-spin" style={{ animationDuration: "15s" }} />
            Developer Controls (Test Real-time Activation)
          </button>

          {showConfig && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 w-full bg-[#FAF9F5] border border-artistic-beige p-3 rounded-lg text-left"
            >
              <h2 className="text-[10px] font-sans font-bold uppercase tracking-wider text-artistic-coffee mb-2">
                Testing Tools
              </h2>
              <p className="text-[9px] text-artistic-dust mb-2 leading-relaxed">
                Check how the countdown transitions to password input in real-time. Use these presets:
              </p>
              
              <div className="flex flex-wrap gap-1.5 mb-3">
                <button 
                  onClick={() => setTestTimerSeconds(5)}
                  className="px-2 py-1 bg-artistic-sand hover:bg-artistic-beige border border-artistic-sepia/30 rounded text-[9px] font-sans font-medium text-artistic-coffee cursor-pointer"
                >
                  ⏳ Set Unlocked (5 secs/Now)
                </button>
                <button 
                  onClick={() => setTestTimerSeconds(30)}
                  className="px-2 py-1 bg-artistic-sand hover:bg-artistic-beige border border-artistic-sepia/30 rounded text-[9px] font-sans font-medium text-artistic-coffee cursor-pointer"
                >
                  ⌛ Set timer to 30 secs
                </button>
                <button 
                  onClick={() => setTestTimerSeconds(28800)} // 8 hours
                  className="px-2 py-1 bg-artistic-sand hover:bg-artistic-beige border border-artistic-sepia/30  rounded text-[9px] font-sans font-medium text-artistic-coffee cursor-pointer"
                >
                  🔄 Reset back to 8 Hours
                </button>
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-2 border-t border-artistic-beige pt-2">
                <div>
                  <label className="block text-[8px] font-sans uppercase tracking-wider text-artistic-dust mb-0.5">Hours Remaining:</label>
                  <input 
                    type="text" 
                    value={configHoursInput}
                    onChange={(e) => setConfigHoursInput(e.target.value)}
                    className="w-full text-xs font-mono p-1 bg-white border border-artistic-beige rounded text-artistic-coffee focus:outline-none focus:border-artistic-sepia"
                  />
                </div>
                <div>
                  <label className="block text-[8px] font-sans uppercase tracking-wider text-artistic-dust mb-0.5">Secret Password (case-insensitive):</label>
                  <input 
                    type="text" 
                    value={configPassInput}
                    onChange={(e) => setConfigPassInput(e.target.value)}
                    className="w-full text-xs font-mono p-1 bg-white border border-artistic-beige rounded text-artistic-coffee focus:outline-none focus:border-artistic-sepia"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full text-center py-1 bg-artistic-coffee hover:bg-artistic-mud text-[#FAF9F5] rounded text-[9px] uppercase tracking-wider font-sans font-bold cursor-pointer"
                >
                  Apply Settings
                </button>
              </form>
            </motion.div>
          )}
        </div>

      </motion.div>
    </div>
  );
}
