"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass, BarChart2, TrendingUp, Building2, Route, Bell, ChevronRight,
} from "lucide-react";
import SignalBackground from "@/components/SignalBackground";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/lib/useScrolled";
import { industryPulseStats, skillsDemandData, hiringCompanies, careerPaths } from "@/data/industryPulse";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// Header height (px), and how far the rounded content sheet overlaps its
// bottom edge while at rest (before scrolling). Kept in one place so the
// header, the scroll-triggered spacer, and the overlap all stay in sync.
const HEADER_H = 96;
const OVERLAP = 28;

const hubTiles = [
  {
    href: "/explore/industry-pulse",
    icon: BarChart2,
    title: "Industry Pulse",
    description: "Live labor market insights",
    stat: `${industryPulseStats.opportunities} tracked`,
    accent: "bg-[#6b0000]/8 text-[#6b0000]",
  },
  {
    href: "/explore/trending-skills",
    icon: TrendingUp,
    title: "Trending Skills",
    description: "What's in demand now",
    stat: `Top ${skillsDemandData.length} skills`,
    accent: "bg-emerald-600/10 text-emerald-700",
  },
  {
    href: "/explore/companies",
    icon: Building2,
    title: "Hiring Companies",
    description: "Who's hiring now",
    stat: `${hiringCompanies.length} companies`,
    accent: "bg-[#f59e0b]/10 text-[#f59e0b]",
  },
  {
    href: "/explore/career-paths",
    icon: Route,
    title: "Career Paths",
    description: "Plan your future",
    stat: `${careerPaths.length} paths matched`,
    accent: "bg-sky-600/10 text-sky-700",
  },
];

export default function ExploreHubPage() {
  const [mounted, setMounted] = useState(false);
  const scrolled = useScrolled();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex flex-1 flex-col h-full bg-[#f5f3f0] font-sans overflow-hidden relative">
      {/* -- Header ------------------------------------------------------------ */}
      <header className="shrink-0 relative overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pt-12 pb-14">
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass size={19} className="text-[#f59e0b]" strokeWidth={2} />
            <h1 className="font-display text-[17px] font-bold leading-tight tracking-tight text-white">
              Explore
            </h1>
          </div>
          <button className="relative p-1.5" aria-label="Notifications">
            <Bell size={19} className="text-white" strokeWidth={1.5} />
            <span
              aria-hidden="true"
              className="absolute right-1 top-1 h-2 w-2 rounded-full border-2 border-[#4a0000] bg-[#f59e0b]"
            />
          </button>
        </div>
      </header>

      {/* -- Content sheet ------------------------------------------------------ */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto bg-white rounded-t-[2.5rem] relative z-10 -mt-6 px-4 pt-6 pb-24 flex flex-col shadow-[0_-4px_24px_rgba(0,0,0,0.05)]"
      >
        <motion.h2
          variants={fadeUpItem}
          className="mb-4 px-1 font-display text-[19px] font-bold leading-snug tracking-tight text-[#201d1d] text-center"
        >
          Discover opportunities
        </motion.h2>

        {/* -- Grid layout --------------------------------------------------- */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {hubTiles.map((tile) => (
            <motion.div key={tile.href} variants={fadeUpItem} className="flex flex-col h-full">
              <Link
                href={tile.href}
                className="group flex flex-col flex-1 items-center justify-center text-center gap-2.5 rounded-[20px] border border-black/[0.05] bg-white p-4 shadow-sm transition-all active:scale-[0.98] hover:bg-[#faf9f8]"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${tile.accent}`}>
                  <tile.icon size={22} strokeWidth={1.75} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13.5px] font-bold leading-tight text-[#201d1d]">
                    {tile.title}
                  </span>
                  <span className="mt-1 text-[11px] leading-snug text-[#7a7373]">
                    {tile.stat}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
