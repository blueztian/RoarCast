"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass, BarChart2, TrendingUp, Building2, Route, Bell, ChevronRight,
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

const hubTiles = [
  {
    href: "/explore/industry-pulse",
    icon: BarChart2,
    title: "Industry Pulse",
    description: "Live labor market insights",
    stat: `${industryPulseStats.opportunities} tracked`,
    accent: "bg-[#6b0000]/10 text-[#6b0000]",
    statColor: "text-[#6b0000]",
  },
  {
    href: "/explore/trending-skills",
    icon: TrendingUp,
    title: "Trending Skills",
    description: "What's in demand now",
    stat: `Top ${skillsDemandData.length} skills`,
    accent: "bg-emerald-600/10 text-emerald-700",
    statColor: "text-emerald-700",
  },
  {
    href: "/explore/companies",
    icon: Building2,
    title: "Hiring Companies",
    description: "Who's hiring now",
    stat: `${hiringCompanies.length} companies`,
    accent: "bg-[#f59e0b]/10 text-[#d97706]",
    statColor: "text-[#d97706]",
  },
  {
    href: "/explore/career-paths",
    icon: Route,
    title: "Career Paths",
    description: "Plan your future",
    stat: `${careerPaths.length} paths matched`,
    accent: "bg-sky-600/10 text-sky-700",
    statColor: "text-sky-700",
  },
];

export default function ExploreHubPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex flex-1 flex-col h-full bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] font-sans overflow-y-auto">
      {/* -- Header ------------------------------------------------------------ */}
      <header className="shrink-0 relative overflow-hidden px-5 pt-6 pb-5">
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <Compass size={20} className="text-[#f59e0b]" strokeWidth={2} />
              </div>
              <h1 className="font-display text-[22px] font-bold leading-tight tracking-tight text-white">
                Explore
              </h1>
            </div>
            <button className="relative p-1.5" aria-label="Notifications">
              <Bell size={22} className="text-white" strokeWidth={1.5} />
              <span
                aria-hidden="true"
                className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-[#4a0000] bg-[#f59e0b]"
              />
            </button>
          </div>
          <p className="text-[13px] text-white/80 ml-[46px] -mt-0.5">
            Where your skills fit into today&apos;s job market.
          </p>
        </div>
      </header>

      {/* -- Content sheet ------------------------------------------------------ */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex-1 min-h-screen bg-white rounded-t-[2.5rem] relative z-10 px-4 pt-8 pb-24 flex flex-col gap-4 shadow-[0_-4px_24px_rgba(0,0,0,0.1)]"
      >

        {hubTiles.map((tile) => (
          <motion.div key={tile.href} variants={fadeUpItem}>
            <Link
              href={tile.href}
              className="group flex items-center gap-4 rounded-[20px] border border-black/[0.06] bg-[#faf9f8] px-5 py-5 shadow-sm transition-all active:scale-[0.98] hover:bg-[#f5f3f0] hover:shadow-md"
            >
              <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${tile.accent} shadow-sm`}>
                <tile.icon size={30} strokeWidth={1.75} />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-[19.5px] font-bold leading-tight text-[#201d1d]">
                  {tile.title}
                </span>
                <span className="text-[14.5px] leading-snug text-[#7a7373]">
                  {tile.description}
                </span>
                <span className={`mt-1 text-[13.5px] font-bold tracking-wide ${tile.statColor}`}>
                  {tile.stat}
                </span>
              </div>
              <ChevronRight size={20} className="shrink-0 text-[#c0bbbb] group-hover:text-[#6b0000] transition-colors" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
