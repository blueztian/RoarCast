"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass, BarChart2, TrendingUp, Building2, Route, Bell, ChevronRight, Activity,
} from "lucide-react";
import SignalBackground from "@/components/SignalBackground";
import { industryPulseStats, skillsDemandData, hiringCompanies, careerPaths } from "@/data/industryPulse";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// Header height (px). Kept in one place so the fixed header and the
// content spacer that clears it always agree.
const HEADER_H = 92;

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
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      {/* -- Fixed compact header -------------------------------------------------- */}
      <header
        className="fixed inset-x-0 top-0 z-40 overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pt-7 pb-3 shadow-[0_2px_16px_rgba(0,0,0,0.15)]"
        style={{ height: HEADER_H }}
      >
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
        <p className="relative z-10 mt-1 pl-[27px] text-[11.5px] text-white/70">
          Discover opportunities around Santa Rosa
        </p>
      </header>

      {/* Spacer that reserves the fixed header's height in normal flow */}
      <div style={{ height: HEADER_H }} aria-hidden="true" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col gap-3 px-3 pt-4 pb-12"
      >
        {/* -- Live snapshot strip ----------------------------------------------- */}
        <motion.div
          variants={fadeUpItem}
          className="flex items-center justify-between rounded-[16px] border border-black/[0.05] bg-white px-4 py-2.5 shadow-sm"
        >
          <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#201d1d]">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {industryPulseStats.opportunities} opportunities
            <span className="text-[#c9c3c3]">·</span>
            {industryPulseStats.employers} employers
          </div>
          <div className="flex items-center gap-1 text-[10.5px] text-[#9c9595]">
            <Activity size={11} className="text-[#f59e0b]" />
            {industryPulseStats.updated}
          </div>
        </motion.div>

        {/* -- 2x2 tile grid, maximized for mobile thumbs ------------------------ */}
        <div className="grid grid-cols-2 gap-3">
          {hubTiles.map((tile) => (
            <motion.div key={tile.href} variants={fadeUpItem}>
              <Link
                href={tile.href}
                className="group relative flex h-full min-h-[148px] flex-col justify-between overflow-hidden rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all active:scale-[0.97] active:shadow-sm hover:bg-[#faf9f8]"
              >
                <div className="flex items-start justify-between">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${tile.accent}`}>
                    <tile.icon size={20} strokeWidth={1.75} />
                  </div>
                  <ChevronRight
                    size={16}
                    className="mt-1 shrink-0 text-[#d4cfcf] transition-transform group-active:translate-x-0.5"
                  />
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="text-[14px] font-bold leading-tight text-[#201d1d]">
                    {tile.title}
                  </span>
                  <span className="mt-0.5 text-[11px] text-[#7a7373]">
                    {tile.description}
                  </span>
                  <span className="mt-2 rounded-full bg-[#f5f3f0] px-2 py-0.5 text-[10.5px] font-bold text-[#5e5a5a]">
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
