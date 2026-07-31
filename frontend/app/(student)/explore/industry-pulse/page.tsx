"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, Activity, BarChart2, TrendingUp, ChevronRight, Target } from "lucide-react";
import SignalBackground from "@/components/SignalBackground";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/lib/useScrolled";
import { industryPulseStats, skillsDemandData, roleIntelligenceCards } from "@/data/industryPulse";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// Header height (px), and how far the rounded content sheet overlaps its
// bottom edge while at rest (before scrolling). Kept in one place so the
// header, the scroll-triggered spacer, and the overlap all stay in sync.
const HEADER_H = 84;
const OVERLAP = 24;

export default function IndustryPulsePage() {
  const [mounted, setMounted] = useState(false);
  const scrolled = useScrolled();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const topSkills = skillsDemandData.slice(0, 3);
  const topRoles = roleIntelligenceCards.slice(0, 2);

  return (
    <div className="flex flex-1 flex-col h-full bg-[#f5f3f0] font-sans overflow-hidden relative">
      <header className="shrink-0 relative overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pt-12 pb-14">
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/explore"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Back to Explore"
            >
              <ArrowLeft size={16} />
            </Link>
            <h1 className="font-display text-[16.5px] font-bold leading-tight tracking-tight text-white">
              Industry Pulse
            </h1>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-red-500/20 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
            <span className="text-[11.5px] font-bold tracking-wide text-red-50">
              LIVE
            </span>
          </div>
        </div>
      </header>

      {/* -- Content sheet ------------------------------------------------------ */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto bg-white rounded-t-[2.5rem] relative z-10 -mt-6 px-4 pt-6 pb-24 flex flex-col gap-3 shadow-[0_-4px_24px_rgba(0,0,0,0.05)]"
      >
        {/* -- Headline stat card -------------------------------------------------- */}
        <motion.div
          variants={fadeUpItem}
          className="flex flex-col rounded-[22px] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
        >
          <div className="mb-3.5 flex items-start justify-between">
            <h2 className="w-[58%] font-display text-[18px] font-bold leading-tight text-[#201d1d]">
              Santa Rosa Industry Pulse
            </h2>
            <div className="flex flex-col items-end gap-1.5">
              <div className="mr-1 flex items-center gap-1 text-[10.5px] text-[#7a7373]">
                <Activity size={11} className="text-[#f59e0b]" /> System is live
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-black/[0.06] pb-3.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#6b0000]/5">
                <BarChart2 size={21} className="text-[#6b0000]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-[24px] font-bold leading-none tracking-tight text-[#6b0000]">
                  {industryPulseStats.opportunities}
                </span>
                <span className="mt-0.5 text-[11px] text-[#7a7373]">
                  opportunities analyzed
                </span>
              </div>
            </div>

            <div className="h-11 w-[1px] bg-black/[0.06]" />

            <div className="flex items-center gap-2.5 pr-1">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f59e0b]/10">
                <Clock size={18} className="text-[#f59e0b]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10.5px] text-[#7a7373]">Updated</span>
                <span className="mt-0.5 text-[12.5px] font-bold text-[#6b0000]">
                  {industryPulseStats.updated}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <p className="mb-2 flex items-center gap-1.5 text-[12px] text-[#7a7373]">
              <MapPin size={14} className="text-[#7a7373]" strokeWidth={1.5} />
              Across Santa Rosa PEZA zones
            </p>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {industryPulseStats.zoneChips.map((zone) => (
                <span
                  key={zone}
                  className="shrink-0 whitespace-nowrap rounded-full border border-black/[0.06] bg-[#faf9f8] px-3 py-1.5 text-[11px] font-medium text-[#201d1d] shadow-sm"
                >
                  {zone}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* -- Employers / zones tiles ---------------------------------------------- */}
        <motion.div variants={fadeUpItem} className="grid grid-cols-2 gap-3">
          <div className="flex flex-col rounded-[18px] border border-black/[0.05] bg-white p-3.5 shadow-sm">
            <span className="font-display text-[20px] font-bold text-[#6b0000]">
              {industryPulseStats.employers}
            </span>
            <span className="mt-0.5 text-[10.5px] font-bold uppercase tracking-wide text-[#7a7373]">
              Active Employers
            </span>
          </div>
          <div className="flex flex-col rounded-[18px] border border-black/[0.05] bg-white p-3.5 shadow-sm">
            <span className="font-display text-[20px] font-bold text-[#6b0000]">
              {industryPulseStats.zones}
            </span>
            <span className="mt-0.5 text-[10.5px] font-bold uppercase tracking-wide text-[#7a7373]">
              PEZA Zones
            </span>
          </div>
        </motion.div>

        {/* -- Top skills mini-widget (uses more of the screen productively) -------- */}
        <motion.div
          variants={fadeUpItem}
          className="flex flex-col rounded-[20px] border border-black/[0.05] bg-white p-4 shadow-sm"
        >
          <div className="mb-2.5 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-[#201d1d]">Top Skills Right Now</h3>
            <Link
              href="/explore/trending-skills"
              className="flex items-center gap-0.5 text-[11.5px] font-semibold text-[#6b0000]"
            >
              See all <ChevronRight size={13} />
            </Link>
          </div>
          <div className="flex flex-col divide-y divide-black/[0.04]">
            {topSkills.map((skill) => (
              <div key={skill.rank} className="flex items-center gap-3 py-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fff8ee] text-[11px] font-bold text-[#f59e0b]">
                  {skill.rank}
                </span>
                <span className="flex-1 text-[12.5px] font-semibold text-[#201d1d]">
                  {skill.name}
                </span>
                <span className="flex items-center gap-1 text-[11.5px] font-bold text-emerald-600">
                  <TrendingUp size={12} strokeWidth={2.5} /> {skill.growth}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* -- Top matching roles mini-widget ---------------------------------------- */}
        <motion.div
          variants={fadeUpItem}
          className="flex flex-col rounded-[20px] border border-black/[0.05] bg-white p-4 shadow-sm"
        >
          <div className="mb-2.5 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-[#201d1d]">Roles Riding This Trend</h3>
            <Link
              href="/explore/career-paths?tab=roles"
              className="flex items-center gap-0.5 text-[11.5px] font-semibold text-[#6b0000]"
            >
              See all <ChevronRight size={13} />
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {topRoles.map((role) => (
              <div
                key={role.role}
                className="flex items-center gap-3 rounded-[14px] bg-[#faf9f8] p-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6b0000]/8">
                  <Target size={15} className="text-[#6b0000]" strokeWidth={1.75} />
                </span>
                <div className="flex flex-1 flex-col">
                  <span className="text-[12.5px] font-bold leading-tight text-[#201d1d]">
                    {role.role}
                  </span>
                  <span className="mt-0.5 text-[11px] text-[#7a7373]">
                    {role.opportunities} openings · {role.metadata.location}
                  </span>
                </div>
                <span className="shrink-0 text-[12px] font-bold text-[#6b0000]">
                  {role.match}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
