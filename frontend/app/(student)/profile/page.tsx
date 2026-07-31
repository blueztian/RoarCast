"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  CheckCircle2,
  ArrowRight,
  History,
  Settings,
  Bell,
} from "lucide-react";
import { mockStudent } from "@/data/mockStudent";
import SignalBackground from "@/components/SignalBackground";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function ProfileReadinessPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      {/* ── 1. Hero Section ─────────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-30 flex flex-col justify-end overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pb-5 rounded-b-[2.5rem] shadow-sm transition-all" style={{ height: 120 }}>
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <User size={26} className="text-[#f59e0b]" strokeWidth={2} />
              <h1 className="font-display text-[24px] font-bold leading-tight tracking-tight text-white">
                Profile
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
          <p className="text-[13.5px] text-white/80 ml-[36px] line-clamp-1">
            See how your current skills compare with what employers are looking
            for.
          </p>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[120px] shrink-0" aria-hidden="true" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-4 mt-2 flex flex-col gap-4 pb-12"
      >
        {/* ── 1.5 Goals / Profile Identity Card ────────────────────────────── */}
        <motion.section
          variants={fadeUpItem}
          className="flex flex-col rounded-[24px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-[15px] font-bold text-white">
              {getInitials(mockStudent.name)}
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[16.5px] font-bold text-[#201d1d]">
                {mockStudent.name}
              </span>
              <span className="text-[11.5px] text-[#7a7373]">
                Graduate Student, {mockStudent.location}
              </span>
            </div>
          </div>

          <div className="my-4 h-px w-full bg-black/[0.05]" />

          <span className="text-[11px] font-bold uppercase tracking-widest text-[#7a7373]">
            My Goal
          </span>
          <p className="mt-1.5 text-[13.5px] font-medium leading-snug text-[#201d1d]">
            Land a {mockStudent.careerInterest} role within 6 months.
          </p>

          <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-[#7a7373]">
            <span>Progress</span>
            <span className="text-[#6b0000]">68%</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#f0ede9]">
            <div
              className="h-full rounded-full bg-[#f59e0b]"
              style={{ width: "68%" }}
            />
          </div>

          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-black/[0.08] bg-white py-2.5 text-[12.5px] font-bold text-[#201d1d] shadow-sm transition-colors hover:bg-[#faf9f8]">
            Update goal
          </button>
        </motion.section>

        {/* ── 2. Main Readiness Card ────────────────────────────────────────── */}
        <motion.section
          variants={fadeUpItem}
          className="flex flex-col rounded-[24px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-center items-center"
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#7a7373]">
            Target Role
          </span>
          <h2 className="mt-1.5 font-display text-[16px] font-bold text-[#201d1d]">
            Junior Accounting Operations Associate
          </h2>
          <p className="mt-1 text-[11.5px] text-[#7a7373]">
            Compared against current Santa Rosa industry demand
          </p>

          <div className="relative mt-6 mb-2 flex h-32 w-32 shrink-0 items-center justify-center">
            <svg
              className="absolute inset-0 h-full w-full -rotate-90 drop-shadow-sm"
              viewBox="0 0 36 36"
            >
              <defs>
                <linearGradient
                  id="readinessGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#fde047" /> {/* Yellow-400 */}
                  <stop offset="100%" stopColor="#f59e0b" /> {/* Amber-500 */}
                </linearGradient>
              </defs>
              <path
                className="stroke-[#f0ede9]"
                strokeWidth="3.5"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                stroke="url(#readinessGrad)"
                strokeWidth="3.5"
                strokeDasharray="72, 100"
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="flex flex-col items-center">
              <span className="font-display text-[32px] font-bold leading-none text-[#201d1d] tracking-tight">
                72%
              </span>
              <span className="mt-1 text-[12px] font-bold tracking-widest text-[#d97706] uppercase">
                Ready
              </span>
            </div>
          </div>

          <p className="mt-4 text-[13px] font-medium leading-snug text-[#5e5a5a]">
            You already match most foundational requirements.
          </p>
        </motion.section>

        {/* ── 3. Skill Summary ─────────────────────────────────────────────── */}
        <motion.section variants={fadeUpItem} className="flex flex-col gap-4">
          {/* You Already Have */}
          <div className="flex flex-col rounded-[24px] border border-black/[0.05] bg-white p-5 shadow-sm">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#7a7373] mb-4">
              You Already Have
            </h3>
            <div className="flex flex-col gap-3">
              {[
                "Microsoft Excel",
                "Basic Bookkeeping",
                "Data Reconciliation",
                "Financial Reporting",
              ].map((skill) => (
                <div key={skill} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#9c9595]" />
                  <span className="text-[13.5px] font-medium text-[#201d1d]">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Your Priority Gaps */}
          <div className="flex flex-col rounded-[24px] border border-[#f59e0b]/20 bg-[#fff8ee] p-5 shadow-sm">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#d97706] mb-4">
              Your Priority Gaps
            </h3>

            {/* Primary Gap */}
            <div className="flex flex-col rounded-xl bg-white p-4 shadow-sm border border-[#f59e0b]/30">
              <div className="flex items-start justify-between">
                <span className="font-display text-[16px] font-bold text-[#201d1d]">
                  SAP ERP
                </span>
                <span className="rounded-full bg-[#6b0000] px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                  High Priority
                </span>
              </div>
              <p className="mt-1.5 text-[11.5px] text-[#7a7373] leading-snug">
                Appears frequently in relevant role requirements
              </p>
            </div>

            {/* Secondary Gaps */}
            <div className="mt-4 flex flex-col gap-3 px-1">
              {["Advanced Excel Automation", "ERP Reconciliation"].map(
                (skill) => (
                  <div
                    key={skill}
                    className="flex items-center justify-between border-b border-black/[0.05] pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-[13.5px] font-medium text-[#201d1d]">
                      {skill}
                    </span>
                    <span className="text-[10px] font-bold text-[#7a7373] uppercase tracking-wider">
                      Gap
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </motion.section>

        {/* ── 4. Next Step ─────────────────────────────────────────────────── */}
        <motion.section
          variants={fadeUpItem}
          className="mt-2 flex flex-col items-center text-center"
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#7a7373]">
            Recommended Next Step
          </span>
          <h3 className="mt-1 font-display text-[20px] font-bold text-[#201d1d]">
            Strengthen SAP ERP
          </h3>
          <p className="mt-2 px-4 text-[13px] leading-snug text-[#5e5a5a]">
            Start with the skill that currently creates your biggest readiness
            gap.
          </p>

          <Link
            href="/learn"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#f59e0b] py-3.5 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-[#d97706]"
          >
            Close this skill gap <ArrowRight size={18} />
          </Link>
        </motion.section>

        {/* ── 5. Manage ────────────────────────────────────────────────────── */}
        <motion.section variants={fadeUpItem} className="flex flex-col gap-2.5">
          <Link
            href="/profile/audit-history"
            className="flex items-center justify-between rounded-[20px] bg-white px-4 py-3.5 shadow-sm border border-black/[0.05] transition-colors hover:bg-[#faf9f8]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6b0000]/8">
                <History size={18} className="text-[#6b0000]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13.5px] font-bold text-[#201d1d]">
                  Audit History
                </span>
                <span className="text-[11px] text-[#7a7373]">
                  See your readiness score over time
                </span>
              </div>
            </div>
            <ArrowRight size={16} className="text-[#9c9595]" />
          </Link>

          <Link
            href="/profile/settings"
            className="flex items-center justify-between rounded-[20px] bg-white px-4 py-3.5 shadow-sm border border-black/[0.05] transition-colors hover:bg-[#faf9f8]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6b0000]/8">
                <Settings size={18} className="text-[#6b0000]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13.5px] font-bold text-[#201d1d]">
                  Settings
                </span>
                <span className="text-[11px] text-[#7a7373]">
                  Account, notifications, privacy
                </span>
              </div>
            </div>
            <ArrowRight size={16} className="text-[#9c9595]" />
          </Link>
        </motion.section>
      </motion.div>
    </div>
  );
}
