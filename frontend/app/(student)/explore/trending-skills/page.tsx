"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, TrendingUp, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/lib/useScrolled";
import { skillsDemandData } from "@/data/industryPulse";

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
const HEADER_H = 84;
const OVERLAP = 24;

export default function TrendingSkillsPage() {
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const scrolled = useScrolled();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      {/* -- Header ------------------------------------------------------------
          The header is always pinned to the top (`fixed`); its own visual
          style is untouched. The spacer below keeps its place in flow so
          content isn't hidden underneath it. */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-0 flex items-center overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pt-7 transition-shadow duration-200",
          scrolled ? "shadow-[0_2px_16px_rgba(0,0,0,0.15)]" : "shadow-none"
        )}
        style={{ height: HEADER_H }}
      >
        <div className="relative z-10 flex items-center gap-3">
          <Link
            href="/explore"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Back to Explore"
          >
            <ArrowLeft size={16} />
          </Link>
          <h1 className="font-display text-[16.5px] font-bold leading-tight tracking-tight text-white">
            Trending Skills
          </h1>
        </div>
      </header>

      {/* Spacer keeps the header's place in flow now that it's always fixed. */}
      <div style={{ height: HEADER_H }} aria-hidden="true" />

      {/* -- Content sheet ------------------------------------------------------ */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-1 flex-col gap-2.5 bg-white px-4 pb-12 pt-6 shadow-[0_-4px_24px_rgba(0,0,0,0.05)] transition-[margin-top,border-radius] duration-200"
        style={{
          marginTop: scrolled ? 0 : -OVERLAP,
          borderTopLeftRadius: scrolled ? 0 : 32,
          borderTopRightRadius: scrolled ? 0 : 32,
        }}
      >
        <motion.p variants={fadeUpItem} className="px-1 text-[12.5px] text-[#7a7373]">
          Top in-demand skills this month
        </motion.p>

        {skillsDemandData.map((skill) => {
          const isOpen = expanded === skill.rank;
          return (
            <motion.div
              key={skill.rank}
              variants={fadeUpItem}
              className="flex flex-col rounded-[18px] border border-black/[0.05] bg-white p-4 shadow-sm"
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
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : skill.rank)}
                    aria-expanded={isOpen}
                    aria-label={isOpen ? `Hide details for ${skill.name}` : `Show details for ${skill.name}`}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#9c9595] transition-colors hover:bg-[#f5f3f0] hover:text-[#201d1d]"
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
              </div>

              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#f0ede9]">
                <div
                  className="h-full rounded-full bg-[#f59e0b]"
                  style={{ width: `${skill.progress}%` }}
                />
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="details"
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="border-t border-black/[0.05] pt-3 text-[12.5px] leading-relaxed text-[#5e5a5a]">
                      {skill.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

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
