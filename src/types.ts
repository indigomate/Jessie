/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DateIdea {
  id: string;
  title: string;
  description: string;
  iconName: "Film" | "Waves" | "IceCream" | "Compass" | "Utensils" | "Tv";
  colorClass: string;
}

export const INITIAL_DATE_IDEAS: DateIdea[] = [
  {
    id: "spiderman",
    title: "Movie Date",
    description: "To watch the coming Spider-man movie together in comfy seats, sharing popcorn.",
    iconName: "Film",
    colorClass: "from-blue-400 to-indigo-500",
  },
  {
    id: "swim",
    title: "Swim Date",
    description: "Splash around, cool off in the water, and play water safety tag.",
    iconName: "Waves",
    colorClass: "from-cyan-400 to-teal-500",
  },
  {
    id: "icecream",
    title: "Ice Cream Date",
    description: "Try sweet flavors, exchange spoonfuls, and get a little on each other's nose.",
    iconName: "IceCream",
    colorClass: "from-pink-400 to-rose-500",
  },
  {
    id: "lake",
    title: "Lake Date",
    description: "Walk hand-in-hand along the quiet shores, feeling the peaceful breeze as sunset paints the water.",
    iconName: "Compass",
    colorClass: "from-amber-400 to-orange-500",
  },
  {
    id: "diner",
    title: "Diner Date",
    description: "Late night conversations over a warm plate of diner food, milkshakes, and french fries.",
    iconName: "Utensils",
    colorClass: "from-emerald-400 to-teal-500",
  },
  {
    id: "sleepover",
    title: "Sleepover Anime All-nighter",
    description: "Staying up under fluffy blankets, snacks compiled, laughing and crying through our favorite anime series.",
    iconName: "Tv",
    colorClass: "from-purple-400 to-fuchsia-500",
  },
];
