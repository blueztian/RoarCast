"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bell, Radio, ChevronRight, TrendingUp,
  Database, RefreshCw, Layers, Briefcase, Pencil, ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SignalBackground from "@/components/SignalBackground";
import ReadinessGauge from "@/components/ReadinessGauge";

// ─── Data ───────────────────────────────────────────────────────────────────
// Industry-wide data (pulse, skills demand, PEZA zones, roles) lives in
// data/industryPulse.ts and is used by the Explore pages.

const student = { name: "Jana", greeting: "Good morning" };

const readiness = {
  score: 72,
  trend: "+12%",
  targetRole: "Junior Accounting Operations Associate",
};

const skillGaps = [
  { id: "sap-erp",    name: "SAP ERP",            priority: "High",   icon: Database  },
  { id: "data-recon", name: "Data Reconciliation", priority: "Medium", icon: RefreshCw },
  { id: "erp-sys",    name: "ERP Systems",         priority: "Medium", icon: Layers    },
];

const recommendation = {
  role:  "Junior Accounting Operations Associate",
  match: 82,
  href:  "/explore",
};

const quickAction = {
  title: "Continue your readiness plan",
  meta:  "3 tasks due this week",
  href:  "/learn/erp-foundations",
};

// ─── Animations ─────────────────────────────────────────────────────────────
const stagger = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.09 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── Priority Badge ──────────────────────────────────────────────────────────
function PriorityBadge({ level }: { level: "High" | "Medium" | string }) {
  return (
    <span
      className={cn(
        "rounded-full px-3.5 py-1.5 text-[12px] font-bold leading-none",
        level === "High"
          ? "bg-[#4a0404] text-white"
          : "bg-[#f59e0b] text-white"
      )}
    >
      {level}
    </span>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f1ee] font-sans">

      {/* ── Hero Header ─────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2a0000] px-5 pt-14 pb-28 rounded-b-[3rem]">
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-35 mix-blend-screen" />

        <div className="relative z-10">
          {/* Logo row */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 font-display text-[20px] font-bold tracking-tight text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
                <Radio size={18} strokeWidth={2.5} className="text-[#f59e0b]" aria-hidden="true" />
              </span>
              RoarCast
            </Link>

            <button aria-label="Notifications" className="p-2">
              <Bell size={24} className="text-white" strokeWidth={1.5} />
            </button>
          </div>

          {/* Greeting */}
          <h1 className="font-display text-[30px] font-bold leading-tight tracking-tight text-white">
            {student.greeting}, {student.name}
          </h1>
          <p className="mt-1 text-[13.5px] text-white/75">
            <span className="underline underline-offset-2 cursor-pointer">See where</span>{" "}
            Santa Rosa&apos;s job market is moving.
          </p>
        </div>
      </header>

      {/* ── Content Stack ───────────────────────────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-4 -mt-16 flex flex-col gap-3.5 pb-36"
      >

        {/* ── 1 · Your Readiness Score ─────────────────────────────────────── */}
        <motion.section
          variants={fadeUp}
          aria-labelledby="readiness-heading"
          className="rounded-[24px] bg-white px-5 pt-5 pb-5 shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
        >
          <h2
            id="readiness-heading"
            className="mb-4 text-[14px] font-bold text-[#201d1d]"
          >
            Your Readiness Score
          </h2>

          {/* Gauge + Target Role */}
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-center gap-2">
              <ReadinessGauge score={readiness.score} size={140} strokeWidth={13} />
              <p className="flex items-center gap-1.5 text-[13px] font-bold text-emerald-500">
                <TrendingUp size={13} strokeWidth={3} aria-hidden="true" />
                {readiness.trend} vs last month
              </p>
            </div>

            <div className="flex flex-1 flex-col">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9c9595]">
                Target Role
              </span>
              <p className="mt-1.5 font-display text-[16.5px] font-bold leading-snug text-[#201d1d]">
                {readiness.targetRole}
              </p>
              <button
                className="mt-3 self-start text-[13px] font-semibold text-[#d97706] transition-opacity hover:opacity-75"
                aria-label="Change target role"
              >
                Change target
              </button>
            </div>
          </div>
        </motion.section>

        {/* ── 2 · Top Skill Gaps ───────────────────────────────────────────── */}
        <motion.section
          variants={fadeUp}
          aria-labelledby="gaps-heading"
          className="rounded-[24px] bg-white px-5 pt-5 pb-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 id="gaps-heading" className="text-[14px] font-bold text-[#201d1d]">
              Top Skill Gaps
            </h2>
            <button className="flex items-center gap-0.5 text-[12.5px] font-semibold text-[#d97706]">
              See all <ChevronRight size={14} aria-hidden="true" />
            </button>
          </div>

          <ul className="flex flex-col gap-3" aria-label="Top skill gaps">
            {skillGaps.map((gap) => {
              const Icon = gap.icon;
              return (
                <li
                  key={gap.id}
                  className="flex items-center gap-3"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/[0.06] bg-[#faf8f6]"
                    aria-hidden="true"
                  >
                    <Icon size={17} className="text-[#6b6060]" strokeWidth={1.7} />
                  </span>
                  <span className="flex-1 text-[14px] font-semibold text-[#201d1d]">
                    {gap.name}
                  </span>
                  <PriorityBadge level={gap.priority} />
                </li>
              );
            })}
          </ul>
        </motion.section>

        {/* ── 3 · Recommended for you ──────────────────────────────────────── */}
        <motion.section
          variants={fadeUp}
          aria-labelledby="recommend-heading"
          className="rounded-[24px] bg-white px-5 pt-5 pb-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
        >
          <h2
            id="recommend-heading"
            className="mb-4 text-[14px] font-bold text-[#201d1d]"
          >
            Recommended for you
          </h2>

          <div className="flex items-center gap-3.5">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#3a0000] text-white"
              aria-hidden="true"
            >
              <Briefcase size={20} strokeWidth={1.5} />
            </span>

            <div className="flex min-w-0 flex-1 flex-col">
              <p className="truncate text-[14px] font-bold leading-snug text-[#201d1d]">
                {recommendation.role}
              </p>
              <p className="mt-0.5 text-[13px] font-bold text-emerald-500">
                {recommendation.match}% match
              </p>
            </div>

            <Link
              href={recommendation.href}
              className="shrink-0 rounded-full bg-[#f0ede9] px-4 py-2 text-[12.5px] font-semibold text-[#5e5a5a] transition-colors hover:bg-[#e8e3de]"
            >
              View role
            </Link>
          </div>
        </motion.section>

        {/* ── 4 · Quick Action ─────────────────────────────────────────────── */}
        <motion.section
          variants={fadeUp}
          aria-labelledby="quick-action-heading"
          className="rounded-[24px] bg-white px-5 pt-5 pb-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
        >
          <h2
            id="quick-action-heading"
            className="mb-4 text-[14px] font-bold text-[#201d1d]"
          >
            Quick action
          </h2>

          <Link
            href={quickAction.href}
            className="flex items-center gap-3.5 transition-opacity active:opacity-75"
            aria-label={`Quick action: ${quickAction.title}`}
          >
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f59e0b] text-white"
              aria-hidden="true"
            >
              <Pencil size={18} strokeWidth={2} />
            </span>

            <div className="flex min-w-0 flex-1 flex-col">
              <p className="text-[14px] font-bold text-[#201d1d]">{quickAction.title}</p>
              <p className="mt-0.5 text-[12.5px] text-[#9c9595]">{quickAction.meta}</p>
            </div>

            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-[#f5f1ee] text-[#5e5a5a]"
              aria-hidden="true"
            >
              <ArrowRight size={16} strokeWidth={2.5} />
            </span>
          </Link>
        </motion.section>

      </motion.div>
    </div>
  );
}
