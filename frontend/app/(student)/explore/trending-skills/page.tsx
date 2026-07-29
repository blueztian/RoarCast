"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, ChevronRight } from "lucide-react";
import { skillsDemandData } from "@/data/industryPulse";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function TrendingSkillsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      <header className="relative overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pt-12 pb-14 rounded-b-[2.5rem]">
        <div className="relative z-10 flex items-center gap-3">
          <Link
            href="/explore"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Back to Explore"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-display text-[20px] font-bold leading-tight tracking-tight text-white">
            Trending Skills
          </h1>
        </div>
        <p className="relative z-10 mt-1.5 pl-12 text-[12.5px] text-white/70">
          Top in-demand skills this month
        </p>
      </header>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-4 -mt-8 flex flex-col gap-2.5 pb-12"
      >
        {skillsDemandData.map((skill) => (
          <motion.button
            key={skill.rank}
            variants={fadeUpItem}
            className="flex flex-col rounded-[18px] border border-black/[0.05] bg-white p-4 text-left shadow-sm transition-colors hover:bg-[#faf9f8]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff8ee] text-[13px] font-bold text-[#f59e0b]">
                  {skill.rank}
                </div>
                <span className="text-[14px] font-bold text-[#201d1d]">
                  {skill.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[12.5px] font-bold text-emerald-600">
                  <TrendingUp size={13} strokeWidth={2.5} /> {skill.growth}
                </span>
                <ChevronRight size={15} className="text-[#9c9595]" />
              </div>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#f0ede9]">
              <div
                className="h-full rounded-full bg-[#f59e0b]"
                style={{ width: `${skill.progress}%` }}
              />
            </div>
          </motion.button>
        ))}

        <motion.button
          variants={fadeUpItem}
          className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-full border border-black/[0.08] bg-white py-2.5 text-[12.5px] font-bold text-[#201d1d] shadow-sm hover:bg-[#faf9f8]"
        >
          See all skills <ChevronRight size={14} />
        </motion.button>
      </motion.div>
    </div>
  );
}
