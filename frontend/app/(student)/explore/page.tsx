"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Compass, MapPin, Clock, Activity, BarChart2,
  TrendingUp, ChevronRight, Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SignalBackground from "@/components/SignalBackground";
import {
  industryPulseStats,
  skillsDemandData,
  roleIntelligenceCards,
} from "@/data/industryPulse";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ExplorePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans">
      
      {/* ── Red Header (No hero, just title) ─────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pt-14 pb-16 rounded-b-[3rem]">
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex items-center gap-3">
          <Compass size={28} className="text-[#f59e0b]" strokeWidth={2} />
          <h1 className="font-display text-[26px] font-bold leading-tight tracking-tight text-white">
            Explore
          </h1>
        </div>
      </header>

      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-4 -mt-10 flex flex-col gap-6 pb-36"
      >
        {/* Santa Rosa Industry Pulse Panel */}
        <motion.div
          variants={fadeUpItem}
          className="flex flex-col rounded-[24px] bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
        >
          <div className="flex items-start justify-between mb-6">
            <h2 className="w-[60%] font-display text-[20px] font-bold leading-tight text-[#201d1d]">
              Santa Rosa Industry Pulse
            </h2>
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-1.5 rounded-full bg-[#6b0000]/10 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6b0000]" />
                <span className="text-[12px] font-bold tracking-wide text-[#6b0000]">
                  LIVE
                </span>
              </div>
              <div className="mr-1 flex items-center gap-1 text-[11px] text-[#7a7373]">
                <Activity size={12} className="text-[#f59e0b]" /> System is live
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-black/[0.06] pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#6b0000]/5">
                <BarChart2 size={24} className="text-[#6b0000]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-[28px] font-bold leading-none tracking-tight text-[#6b0000]">
                  {industryPulseStats.opportunities}
                </span>
                <span className="mt-0.5 text-[12px] text-[#7a7373]">
                  opportunities analyzed
                </span>
              </div>
            </div>

            <div className="h-12 w-[1px] bg-black/[0.06]" />

            <div className="flex items-center gap-3 pr-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f59e0b]/10">
                <Clock size={20} className="text-[#f59e0b]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#7a7373]">Updated</span>
                <span className="mt-0.5 text-[13px] font-bold text-[#6b0000]">
                  {industryPulseStats.updated}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <p className="mb-3 flex items-center gap-2 text-[13px] text-[#7a7373]">
              <MapPin size={16} className="text-[#7a7373]" strokeWidth={1.5} />
              Across Santa Rosa PEZA zones
            </p>
            <div className="flex flex-wrap gap-2">
              {industryPulseStats.zoneChips.map((zone) => (
                <span
                  key={zone}
                  className="rounded-full border border-black/[0.06] bg-[#faf9f8] px-3 py-1.5 text-[11.5px] font-medium text-[#201d1d] shadow-sm"
                >
                  {zone}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills rising this month */}
        <motion.div variants={fadeUpItem} className="flex flex-col">
          <div className="mb-4 flex items-center justify-between px-1">
            <h3 className="font-display text-[18px] font-bold text-[#201d1d]">
              Skills rising this month
            </h3>
            <button className="flex items-center gap-0.5 text-[13px] font-semibold text-[#6b0000] hover:underline">
              View all <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {skillsDemandData.slice(0, 4).map((skill, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + 0.1 * idx, duration: 0.4 }}
                key={skill.rank}
                className="flex items-center gap-3 rounded-[12px] border border-[#f59e0b]/20 bg-white p-3 shadow-sm transition-colors hover:border-[#f59e0b]/40"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff8ee]">
                  <TrendingUp size={20} className="text-[#f59e0b]" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="mb-0.5 text-[13px] font-bold leading-tight text-[#201d1d]">
                    {skill.name}
                  </span>
                  <span className="flex items-center gap-1 text-[12px] font-bold text-emerald-600">
                    ↑ {skill.growth.replace("+", "")}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Demand relevant to your program */}
        <motion.div variants={fadeUpItem} className="mt-2 flex flex-col">
          <div className="mb-4 flex items-center justify-between px-1">
            <h3 className="font-display text-[18px] font-bold text-[#201d1d]">
              Trending Roles
            </h3>
            <button className="flex items-center gap-0.5 text-[13px] font-semibold text-[#6b0000] hover:underline">
              View all roles <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {roleIntelligenceCards.map((role, idx) => (
              <div
                key={role.role}
                className={cn(
                  "flex flex-col overflow-hidden rounded-[20px] p-5 shadow-sm transition-all relative",
                  idx === 0
                    ? "border-[1.5px] border-[#6b0000] bg-white"
                    : "border border-black/[0.08] bg-[#faf9f8]"
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl shadow-sm",
                      idx === 0
                        ? "bg-[#6b0000]/10 text-[#6b0000]"
                        : "bg-black/[0.04] text-[#201d1d]"
                    )}
                  >
                    {idx === 0 ? (
                      <BarChart2 size={20} strokeWidth={2} />
                    ) : (
                      <Users size={20} strokeWidth={2} />
                    )}
                  </div>
                  <div className="mt-0.5 flex flex-1 flex-col">
                    <h3
                      className={cn(
                        "text-[14.5px] font-bold leading-tight",
                        idx === 0 ? "text-[#6b0000]" : "text-[#201d1d]"
                      )}
                    >
                      {role.role}
                    </h3>
                    <p className="mt-1 text-[12px] font-medium text-[#7a7373]">
                      {role.opportunities} opportunities analyzed
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-center">
                    <div className="relative flex h-[48px] w-[48px] items-center justify-center">
                      <svg
                        className="absolute inset-0 h-full w-full rotate-[-90deg]"
                        viewBox="0 0 36 36"
                      >
                        <path
                          className="stroke-black/[0.06]"
                          strokeWidth="4"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="stroke-[#6b0000]"
                          strokeWidth="4"
                          strokeDasharray={`${role.match}, 100`}
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="font-display text-[13px] font-bold text-[#201d1d]">
                        {role.match}%
                      </span>
                    </div>
                    <span className="mt-1 text-[10px] font-bold text-[#7a7373]">
                      match
                    </span>
                  </div>
                </div>

                <div className="mb-5 mt-6">
                  <p className="mb-2.5 text-[11px] font-medium text-[#7a7373]">
                    Top Skill Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {role.skillTags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "rounded-md border px-2.5 py-1 text-[11px] font-medium",
                          idx === 0
                            ? "border-[#6b0000]/15 bg-[#6b0000]/5 text-[#6b0000]"
                            : "border-black/[0.06] bg-white text-[#5e5a5a]"
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-end pt-4 text-[11.5px] font-bold">
                  <span
                    className={cn(
                      "flex items-center gap-1.5",
                      role.metadata.demand.includes("High")
                        ? "text-[#6b0000]"
                        : "text-[#f59e0b]"
                    )}
                  >
                    <TrendingUp size={14} strokeWidth={3} /> {role.metadata.demand}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
