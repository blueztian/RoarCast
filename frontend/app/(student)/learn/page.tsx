"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, ArrowRight, PlayCircle, Database, Layers, Users, Bell,
} from "lucide-react";
import { janaProfile, activeCourse } from "@/data/mockLearn";
import SignalBackground from "@/components/SignalBackground";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// Where "Continue Learning" and the "Modules" nav row both point —
// straight into the exact module the student left off on.
const currentModuleHref = `/learn/courses/${activeCourse.id}/modules/mod${activeCourse.currentModule}`;

const nextUpItems = [
  { label: "SAP ERP Fundamentals · Module 4: Vendor Master", href: currentModuleHref },
  { label: "ERP Systems Essentials · Module 1: Getting Started", href: "/learn/courses/erp-systems-essentials" },
  { label: "Advanced Excel for Professionals · Module 1: PivotTables Basics", href: "/learn/courses/advanced-excel-pro" },
];

const hubNavRows = [
  {
    href: "/learn/squads",
    icon: Users,
    title: "Skill Squad",
    description: "Build in-demand skills with peers",
  },
  {
    href: "/learn/courses",
    icon: BookOpen,
    title: "Courses",
    description: "Browse all courses and progress",
  },
];

export default function LearnHubPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      {/* ── Red Header (Matches Explore) ──────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-30 flex flex-col justify-end overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pb-5 rounded-b-[2.5rem] shadow-sm transition-all" style={{ height: 120 }}>
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <BookOpen size={26} className="text-[#f59e0b]" strokeWidth={2} />
              <h1 className="font-display text-[24px] font-bold leading-tight tracking-tight text-white">
                Learn
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
          <p className="text-[13.5px] text-white/80 ml-[36px]">
            Build the skills your target role needs.
          </p>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[120px] shrink-0" aria-hidden="true" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-4 mt-2 flex flex-col gap-4 pb-32"
      >
        {/* ── 1. Your Upskilling Roadmap ──────────────────────────────────────── */}
        <motion.section variants={fadeUpItem} className="flex flex-col rounded-[24px] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col border-b border-black/[0.06] pb-4">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#7a7373]">
              Your Upskilling Roadmap
            </h2>
            <p className="mt-1.5 font-display text-[15px] font-bold text-[#201d1d]">
              {janaProfile.targetRole}
            </p>

            <div className="mt-3 flex items-center gap-4">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="stroke-[#f0ede9]"
                    strokeWidth="4"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="stroke-[#f59e0b]"
                    strokeWidth="4"
                    strokeDasharray={`${janaProfile.targetReadiness}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="font-display text-[14px] font-bold text-[#201d1d]">
                  {janaProfile.targetReadiness}%
                </span>
              </div>
              <p className="text-[12.5px] leading-snug text-[#5e5a5a]">
                Strengthen 2 priority skills to move closer to your target role.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 pt-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#7a7373]">
              Next Up
            </span>
            {nextUpItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-xl bg-[#faf9f8] px-3 py-2.5 transition-colors hover:bg-[#f0ede9]"
              >
                <span className="text-[12.5px] font-medium text-[#201d1d]">{item.label}</span>
                <ArrowRight size={14} className="shrink-0 text-[#9c9595]" />
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-4">
            {janaProfile.priorityGaps.map((gap, i) => (
              <div key={gap.id} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fcead9] text-[#f59e0b]">
                  {i === 0 ? <Database size={16} strokeWidth={2} /> : <Layers size={16} strokeWidth={2} />}
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-[13px] font-bold text-[#201d1d]">{gap.name}</span>
                  <span className="text-[11px] font-medium text-[#7a7373]">{gap.status}</span>
                </div>
                <span className="rounded-full bg-[#6b0000] px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
                  {gap.priority}
                </span>
              </div>
            ))}
          </div>

          <button className="mt-3 w-full rounded-xl bg-[#faf9f8] py-2.5 text-[12.5px] font-bold text-[#201d1d] transition-colors hover:bg-[#f0ede9]">
            View full roadmap
          </button>
        </motion.section>

        {/* ── 2. Continue Learning — resumes exactly where you left off ───────── */}
        <motion.section variants={fadeUpItem}>
          <div className="flex flex-col rounded-[24px] border border-[#f59e0b]/20 bg-[#fff8ee] p-4 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#d97706]">
              Continue Learning
            </span>
            <div className="mt-2 flex items-start gap-4">
              <div className="flex flex-1 flex-col">
                <h3 className="font-display text-[16px] font-bold text-[#201d1d]">
                  {activeCourse.title}
                </h3>
                <p className="mt-0.5 text-[11.5px] font-medium text-[#7a7373]">
                  Skill: {activeCourse.skill}
                </p>
                <p className="mt-2.5 text-[12.5px] font-bold text-[#201d1d]">
                  {activeCourse.currentLesson}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-1.5 w-full flex-1 overflow-hidden rounded-full bg-[#f59e0b]/20">
                    <div className="h-full bg-[#f59e0b]" style={{ width: `${activeCourse.progress}%` }} />
                  </div>
                  <span className="text-[11px] font-bold text-[#d97706]">{activeCourse.progress}%</span>
                </div>
                <p className="mt-1 text-[11px] text-[#7a7373]">
                  Module {activeCourse.currentModule} of {activeCourse.totalModules} · {activeCourse.timeRemaining}
                </p>
              </div>
              <Link
                href={currentModuleHref}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f59e0b] text-white shadow-sm transition-transform active:scale-95"
                aria-label="Continue current module"
              >
                <PlayCircle size={22} strokeWidth={2} />
              </Link>
            </div>
            <Link
              href={currentModuleHref}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#6b0000] py-2.5 text-[12.5px] font-bold text-white shadow-sm transition-colors hover:bg-[#4a0000]"
            >
              Continue Learning <ArrowRight size={15} />
            </Link>
          </div>
        </motion.section>

        {/* ── 3. Jump into — consistent nav rows, same pattern as Explore Hub ─── */}
        <motion.section variants={fadeUpItem} className="flex flex-col gap-2.5">
          <h2 className="font-display text-[16px] font-bold text-[#201d1d] px-1">
            Jump Into
          </h2>
          {hubNavRows.map((row) => (
            <Link
              key={row.title}
              href={row.href}
              className="flex items-center justify-between rounded-[20px] bg-white px-4 py-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-colors hover:bg-[#faf9f8]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#6b0000]/8">
                  <row.icon size={20} className="text-[#6b0000]" strokeWidth={1.75} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold leading-tight text-[#201d1d]">
                    {row.title}
                  </span>
                  <span className="mt-0.5 text-[11.5px] text-[#7a7373]">
                    {row.description}
                  </span>
                </div>
              </div>
              <ArrowRight size={16} className="shrink-0 text-[#9c9595]" />
            </Link>
          ))}
        </motion.section>
      </motion.div>
    </div>
  );
}
