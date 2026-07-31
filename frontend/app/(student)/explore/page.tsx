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
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      {/* -- Header ------------------------------------------------------------
          The header is always pinned to the top (`fixed`), regardless of
          scroll position. Its own visual style is untouched — the shadow
          still eases in on scroll exactly as before. The spacer below keeps
          the header's place in flow so content isn't hidden underneath it. */}
      <header className="fixed inset-x-0 top-0 z-30 flex flex-col justify-end overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pb-5 rounded-b-[2.5rem] shadow-sm transition-all" style={{ height: 120 }}>
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

      {/* Spacer keeps the header's place in flow now that it's always fixed. */}
      <div className="h-[120px] shrink-0" aria-hidden="true" />

      {/* -- Content sheet ------------------------------------------------------ */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-1 flex-col bg-white px-4 pb-12 pt-6 shadow-[0_-4px_24px_rgba(0,0,0,0.05)] mt-2 rounded-[24px]"
      >
        <motion.h2
          variants={fadeUpItem}
          className="mb-4 px-1 font-display text-[19px] font-bold leading-snug tracking-tight text-[#201d1d]"
        >
          Discover opportunities around Santa Rosa
        </motion.h2>

        {/* -- List layout (Roles intentionally omitted) --------------------- */}
        <div className="flex flex-col gap-3">
          {hubTiles.map((tile) => (
            <motion.div key={tile.href} variants={fadeUpItem}>
              <Link
                href={tile.href}
                className="group flex items-center gap-3.5 rounded-[18px] border border-black/[0.05] bg-white p-4 shadow-sm transition-all active:scale-[0.98] hover:bg-[#faf9f8]"
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${tile.accent}`}>
                  <tile.icon size={20} strokeWidth={1.75} />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-[14px] font-bold leading-tight text-[#201d1d]">
                    {tile.title}
                  </span>
                  <span className="mt-0.5 text-[11.5px] text-[#7a7373]">
                    {tile.description}
                  </span>
                </div>
                <ChevronRight
                  size={17}
                  className="shrink-0 text-[#c9c3c3] transition-transform group-active:translate-x-0.5"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
