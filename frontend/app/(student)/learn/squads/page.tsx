"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, Search, Briefcase, Award, Users, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { squadsData } from "@/data/mockLearn";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const FILTERS = ["For You", "All", "Accounting", "Business", "IT"];

export default function SquadsListPage() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("For You");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // For Jana, ERP Launchpad and ERP Foundations are recommended.
  const recommendedSquads = squadsData.slice(0, 2);
  const exploreSquads = squadsData.slice(2);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 flex flex-col gap-4 bg-white px-4 pt-12 pb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/learn" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0ede9] text-[#201d1d] hover:bg-[#e8e4df]">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <h1 className="font-display text-[20px] font-bold text-[#201d1d]">Skill Squads</h1>
            <p className="text-[12px] text-[#7a7373]">Learn with peers working toward the same industry skill.</p>
          </div>
        </div>

        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9c9595]" />
          <input
            type="text"
            placeholder="Search skills or squads"
            className="h-11 w-full rounded-full border border-black/[0.08] bg-[#faf9f8] pl-10 pr-4 text-[14px] outline-none transition-colors focus:border-[#6b0000] focus:bg-white"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 text-[12.5px] font-bold transition-colors",
                activeFilter === f
                  ? "bg-[#201d1d] text-white"
                  : "bg-[#f0ede9] text-[#5e5a5a] hover:bg-[#e8e4df]"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-8 px-4 pt-6"
      >
        {/* ── Recommended For You ────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-[17px] font-bold text-[#201d1d]">
            Recommended for you
          </h2>
          <div className="flex flex-col gap-4">
            {recommendedSquads.map((squad) => (
              <SquadCard key={squad.id} squad={squad} />
            ))}
          </div>
        </div>

        {/* ── Explore Other Skills ────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-[17px] font-bold text-[#201d1d]">
            Explore other skill squads
          </h2>
          <div className="flex flex-col gap-4">
            {exploreSquads.map((squad) => (
              <SquadCard key={squad.id} squad={squad} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SquadCard({ squad }: { squad: any }) {
  const isJoined = squad.status === "Joined";
  const isWaitlist = squad.status === "Squad full";

  return (
    <motion.div variants={fadeUp} className="flex flex-col overflow-hidden rounded-[24px] border border-black/[0.05] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#6b0000]">
              <Briefcase size={12} strokeWidth={2} />
              {squad.skillName}
            </span>
            <h3 className="font-display text-[18px] font-bold text-[#201d1d]">{squad.name}</h3>
          </div>
        </div>

        <div className="mt-3 rounded-lg bg-[#faf9f8] p-3">
          <span className="text-[11.5px] font-bold text-[#d97706]">{squad.label}</span>
          <p className="mt-1 text-[11.5px] leading-snug text-[#5e5a5a]">{squad.reason}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {[1, 2, 3, 4, 5].slice(0, squad.members.total).map((n) => (
                <div key={n} className="h-6 w-6 rounded-full border border-white bg-[#e0dcd5]" />
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#201d1d]">{squad.members.total} members</span>
              <span className="text-[10px] text-[#7a7373]">{squad.members.activeThisWeek} active this week</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 border-t border-black/[0.05] pt-4">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7a7373]">
              Current Path
            </span>
            <p className="text-[13px] font-bold text-[#201d1d]">{squad.outcome}</p>
            <p className="text-[12px] text-[#7a7373]">{squad.learningFormat.modules} modules</p>
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7a7373]">
              Weekly Goal
            </span>
            <p className="text-[13px] font-bold text-[#201d1d]">{squad.goal.text}</p>
          </div>
        </div>

        {isJoined && (
          <div className="mt-4 flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[11.5px]">
              <span className="font-bold text-[#201d1d]">Squad progress</span>
              <span className="font-bold text-[#d97706]">{squad.progress}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#f0ede9]">
              <div className="h-full bg-[#f59e0b]" style={{ width: `${squad.progress}%` }} />
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-4 bg-[#faf9f8] p-5">
        <div className="flex items-start gap-2">
          <Award size={16} className="mt-0.5 shrink-0 text-[#f59e0b]" strokeWidth={2} />
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-[#7a7373]">Credential</span>
            <span className="text-[12px] font-bold text-[#201d1d]">{squad.outcome}</span>
          </div>
        </div>

        <Link
          href={`/learn/squads/${squad.id}`}
          className={cn(
            "flex w-full items-center justify-center rounded-full py-2.5 text-[13px] font-bold transition-colors",
            isJoined ? "bg-[#f59e0b] text-white" :
            isWaitlist ? "bg-[#e0dcd5] text-[#7a7373]" :
            "bg-[#6b0000] text-white"
          )}
        >
          {isJoined ? "Continue with squad" :
           isWaitlist ? "Join waitlist" :
           squad.status === "View squad" ? "View squad" :
           "Join squad"}
        </Link>
      </div>
    </motion.div>
  );
}
