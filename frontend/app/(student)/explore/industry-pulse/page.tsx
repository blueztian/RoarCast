"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, Activity, BarChart2 } from "lucide-react";
import SignalBackground from "@/components/SignalBackground";
import { industryPulseStats } from "@/data/industryPulse";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function IndustryPulsePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      <header className="relative overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pt-12 pb-14 rounded-b-[2.5rem]">
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex items-center gap-3">
          <Link
            href="/explore"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Back to Explore"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-display text-[20px] font-bold leading-tight tracking-tight text-white">
            Industry Pulse
          </h1>
        </div>
      </header>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-4 -mt-8 flex flex-col gap-4 pb-12"
      >
        <motion.div
          variants={fadeUpItem}
          className="flex flex-col rounded-[24px] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
        >
          <div className="flex items-start justify-between mb-4">
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

          <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
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

          <div className="pt-3">
            <p className="mb-2 flex items-center gap-2 text-[12.5px] text-[#7a7373]">
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

        {/* Extra stat tiles using the previously-unused employers/zones data */}
        <motion.div variants={fadeUpItem} className="grid grid-cols-2 gap-3">
          <div className="flex flex-col rounded-[18px] border border-black/[0.05] bg-white p-4 shadow-sm">
            <span className="font-display text-[22px] font-bold text-[#6b0000]">
              {industryPulseStats.employers}
            </span>
            <span className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-[#7a7373]">
              Active Employers
            </span>
          </div>
          <div className="flex flex-col rounded-[18px] border border-black/[0.05] bg-white p-4 shadow-sm">
            <span className="font-display text-[22px] font-bold text-[#6b0000]">
              {industryPulseStats.zones}
            </span>
            <span className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-[#7a7373]">
              PEZA Zones
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
