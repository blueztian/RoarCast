"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass, BarChart2, TrendingUp, Building2, Route, Briefcase, ChevronRight, Bell,
} from "lucide-react";
import SignalBackground from "@/components/SignalBackground";

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
    iconColor: "text-pink-500",
    iconBgColor: "bg-pink-50",
  },
  {
    href: "/explore/trending-skills",
    icon: TrendingUp,
    title: "Trending Skills",
    description: "What's in demand now",
    iconColor: "text-blue-500",
    iconBgColor: "bg-blue-50",
  },
  {
    href: "/explore/companies",
    icon: Building2,
    title: "Hiring Companies",
    description: "Who's hiring now",
    iconColor: "text-purple-500",
    iconBgColor: "bg-purple-50",
  },
  {
    href: "/explore/career-paths",
    icon: Route,
    title: "Career Paths",
    description: "Plan your future",
    iconColor: "text-orange-500",
    iconBgColor: "bg-orange-50",
  },
  {
    href: "/explore/career-paths?tab=roles",
    icon: Briefcase,
    title: "Roles",
    description: "Explore jobs",
    iconColor: "text-amber-500",
    iconBgColor: "bg-amber-50",
  },
];

export default function ExploreHubPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      <header className="relative overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pt-12 pb-14">
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Compass size={26} className="text-[#f59e0b]" strokeWidth={2} />
            <h1 className="font-display text-[24px] font-bold leading-tight tracking-tight text-white">
              Explore
            </h1>
          </div>
          <button className="relative p-1.5" aria-label="Notifications">
            <Bell size={24} className="text-white" strokeWidth={1.5} />
            <span
              aria-hidden="true"
              className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-[#4a0000] bg-[#f59e0b]"
            />
          </button>
        </div>
      </header>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-1 flex-col gap-3.5 bg-white px-5 pt-8 pb-12 -mt-8 rounded-t-[2.5rem] shadow-sm"
      >
        <h2 className="text-[22px] font-bold text-[#201d1d] leading-[1.2] mb-3">
          Discover opportunities <br />
          around Santa Rosa
        </h2>

        {hubTiles.map((tile) => (
          <motion.div key={tile.href} variants={fadeUpItem}>
            <Link
              href={tile.href}
              className="flex items-center justify-between rounded-[20px] bg-white border border-[#f0ebe1] px-4 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-colors hover:bg-[#faf9f8]"
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${tile.iconBgColor}`}>
                  <tile.icon size={22} className={tile.iconColor} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[18px] font-bold leading-tight text-[#201d1d]">
                    {tile.title}
                  </span>
                  <span className="mt-0.5 text-[14px] text-[#7a7373]">
                    {tile.description}
                  </span>
                </div>
              </div>
              <ChevronRight size={18} className="shrink-0 text-[#9c9595]" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

