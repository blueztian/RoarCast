"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, Map, Users, Bell, ChevronRight,
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

const learnMenuItems = [
  {
    href: "/learn/courses",
    icon: BookOpen,
    title: "Courses",
    description: "Browse all courses and track your progress",
    accent: "bg-[#6b0000]/10 text-[#6b0000]",
  },
  {
    href: "/learn/squads",
    icon: Users,
    title: "Skill Squad",
    description: "Build in-demand skills with your peers",
    accent: "bg-emerald-600/10 text-emerald-700",
  },
  {
    href: "/learn/erp-foundations",
    icon: Map,
    title: "Upskilling Roadmap",
    description: "Your personalized path to readiness",
    accent: "bg-[#f59e0b]/10 text-[#d97706]",
  },
];

export default function LearnHubPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex flex-1 flex-col h-full bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] font-sans overflow-hidden">
      {/* ── Red Header ──────────────────────────────────────────────────────── */}
      <header className="shrink-0 relative overflow-hidden px-5 pt-12 pb-5">
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <BookOpen size={20} className="text-[#f59e0b]" strokeWidth={2} />
            </div>
            <h1 className="font-display text-[22px] font-bold leading-tight tracking-tight text-white">
              Learn
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
      </header>

      {/* ── White Content Sheet ─────────────────────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto bg-white rounded-t-[2.5rem] relative z-10 px-4 pt-8 pb-24 flex flex-col gap-4 shadow-[0_-4px_24px_rgba(0,0,0,0.1)]"
      >
        <motion.p
          variants={fadeUpItem}
          className="text-[13px] font-medium text-[#7a7373] text-center mb-2"
        >
          What would you like to do today?
        </motion.p>

        {learnMenuItems.map((item) => (
          <motion.div key={item.href} variants={fadeUpItem}>
            <Link
              href={item.href}
              className="group flex items-center gap-4 rounded-[20px] border border-black/[0.06] bg-[#faf9f8] px-5 py-5 shadow-sm transition-all active:scale-[0.98] hover:bg-[#f5f3f0] hover:shadow-md"
            >
              <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${item.accent} shadow-sm`}>
                <item.icon size={30} strokeWidth={1.75} />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-[18px] font-bold leading-tight text-[#201d1d]">
                  {item.title}
                </span>
                <span className="text-[13px] leading-snug text-[#7a7373]">
                  {item.description}
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
