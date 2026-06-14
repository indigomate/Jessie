/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  speed: number;
  delay: number;
  size: number;
  rotate: number;
  swayType: number;
}

export default function SakuraRain({ active = true }: { active?: boolean }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!active) {
      setPetals([]);
      return;
    }

    // Generate a set of 25 cherry blossom petals
    const newPetals = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      // Random starting horizontal position (%)
      left: Math.random() * 100,
      // Falling speed duration (seconds) - between 6s and 14s
      speed: 6 + Math.random() * 8,
      // Random animation delay (seconds)
      delay: Math.random() * -12, // negative to start immediately mid-animation
      // Random scale (px) - between 10px and 22px
      size: 10 + Math.random() * 12,
      // Random starting rotation (deg)
      rotate: Math.random() * 360,
      // Sway animation path index
      swayType: Math.floor(Math.random() * 3),
    }));

    setPetals(newPetals);
  }, [active]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {petals.map((petal) => {
        // Vary colors between warm clay terracotta and soft artistic rose gold
        const isClay = petal.id % 2 === 0;
        const colorFrom = isClay ? "#DE8C73" : "#D4A373";
        const colorTo = isClay ? "#F1C4AB" : "#E8DFD8";

        return (
          <div
            key={petal.id}
            className="absolute top-0 opacity-75"
            style={{
              left: `${petal.left}%`,
              width: `${petal.size}px`,
              height: `${petal.size * 0.75}px`, // Slight oval shapes resembling petals
              background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
              animationName: "fall",
              animationDuration: `${petal.speed}s`,
              animationDelay: `${petal.delay}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              transform: `rotate(${petal.rotate}deg)`,
              // Double layer style: border-radius for organic petal curl
              borderRadius: "50% 10% 50% 50% / 50% 10% 10% 50%",
              boxShadow: "0 2px 5px rgba(163, 142, 122, 0.2)",
            }}
          />
        );
      })}
    </div>
  );
}
