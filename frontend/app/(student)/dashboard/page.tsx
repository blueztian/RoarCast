"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bell, Radio, ArrowRight, ChevronRight,
  TrendingUp, Database, RefreshCw, Layers,
  BookOpen, BadgeCheck, Briefcase, BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SignalBackground from "@/components/SignalBackground";
import ReadinessGauge from "@/components/ReadinessGauge";

// ─── Mock Data ─────────────────────────────────────────────────────────────────
// Industry Pulse data has been moved to data/industryPulse.ts for use in Explore.
// Home only contains personalised career data.

const studentProfile = {
  name: "Jana",
  greeting: "Good morning",
};

const readiness = {
  score: 72,
  trend: "+12%",
  targetRole: "Junior Accounting Operations Associate",
};

const skillGaps = [
  { id: "sap-erp",    name: "SAP ERP",             priority: "High",   icon: Database  },
  { id: "data-recon", name: "Data Reconciliation",  priority: "Medium", icon: RefreshCw },
  { id: "erp-sys",    name: "ERP Systems",          priority: "Medium", icon: Layers    },
];

const learningProgress = { completed: 2, total: 5, percent: 40 };
const credentialProgress = { earned: 1, total: 4 };

const recommendation = {
  label: "Recommended for You",
  title: "Interview with HR: Accounting Firms",
  meta:  "May 27, 2025 · Santa Rosa, Laguna",
  href:  "/explore",
};

const marketSignal = {
  label:    "Market Signal for You",
  skill:    "Data Reconciliation",
  change:   "↑ 18%",
  location: "Santa Rosa",
  href:     "/explore",
};

const nextBestAction = {
  title: `Continue "Data Reconciliation" Module`,
  meta:  "Finish in 25 mins · Earn 1 Badge",
  href:  "/learn/erp-foundations",
};

// ─── Animations ────────────────────────────────────────────────────────────────
const stagger = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" } },
};

// ─── Priority Badge ────────────────────────────────────────────────────────────
function PriorityBadge({ level }: { level: string }) {
  const isHigh = level === "High";
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[11px] font-bold leading-none",
        isHigh
          ? "bg-[#fce8e8] text-[#c0392b]"
          : "bg-[#fff4e5] text-[#d97706]"
      )}
    >
      {level}
    </span>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const credPct = Math.round((credentialProgress.earned / credentialProgress.total) * 100);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans">

      {/* ── Hero Header ──────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pt-14 pb-28 rounded-b-[3rem]">
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />

        <div className="relative z-10">
          {/* Logo + Bell */}
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

            <button aria-label="Notifications — 3 unread" className="relative p-2">
              <Bell size={24} className="text-white" strokeWidth={1.5} />
              <span
                aria-hidden="true"
                className="absolute right-1.5 top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#f59e0b] text-[10px] font-bold leading-none text-white"
              >
                3
              </span>
            </button>
          </div>

          {/* Greeting */}
          <div className="space-y-1">
            <h1 className="font-display text-[28px] font-bold leading-tight tracking-tight text-white">
              {studentProfile.greeting}, {studentProfile.name}!
            </h1>
            <p className="text-[14px] text-white/80">
              Let&apos;s get you closer to your dream career.
            </p>
          </div>
        </div>
      </header>

      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-4 -mt-16 flex flex-col gap-4 pb-36"
      >

        {/* ── 1 · Your Readiness ─────────────────────────────────────────────── */}
        <motion.section
          variants={fadeUp}
          aria-labelledby="readiness-heading"
          className="rounded-[24px] bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
        >
          <h2
            id="readiness-heading"
            className="mb-4 text-[12px] font-bold uppercase tracking-widest text-[#9c9595]"
          >
            Your Readiness
          </h2>

          {/* Gauge + Target Role */}
          <div className="flex items-start gap-4">
            <ReadinessGauge score={readiness.score} size={134} strokeWidth={12} />

            <div className="flex flex-1 flex-col pt-1">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#9c9595]">
                Target Role
              </span>
              <p className="mt-1 font-display text-[16px] font-bold leading-snug text-[#201d1d]">
                {readiness.targetRole}
              </p>
              <button
                className="mt-3 self-start rounded-full border border-[#6b0000]/35 px-4 py-1.5 text-[12px] font-semibold text-[#6b0000] transition-colors hover:bg-[#6b0000]/5 active:scale-95"
                aria-label="Change target role"
              >
                Change Target
              </button>
            </div>
          </div>

          {/* Trend */}
          <p className="mt-2.5 flex items-center gap-1.5 text-[13px] font-bold text-emerald-600">
            <TrendingUp size={14} strokeWidth={2.5} aria-hidden="true" />
            {readiness.trend} vs last month
          </p>

          {/* Divider */}
          <div className="my-4 h-px bg-black/[0.05]" aria-hidden="true" />

          {/* Top Skill Gaps */}
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[14.5px] font-bold text-[#201d1d]">Top Skill Gaps</h3>
            <button className="flex items-center gap-0.5 text-[12px] font-semibold text-[#6b0000]">
              See all <ChevronRight size={14} aria-hidden="true" />
            </button>
          </div>

          <ul className="flex flex-col gap-2.5" aria-label="Top skill gaps">
            {skillGaps.map((gap) => {
              const Icon = gap.icon;
              return (
                <li
                  key={gap.id}
                  className="flex items-center gap-3 rounded-2xl border border-black/[0.05] bg-[#faf9f8] px-3.5 py-3"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm"
                    aria-hidden="true"
                  >
                    <Icon size={15} className="text-[#7a7373]" strokeWidth={1.8} />
                  </span>
                  <span className="flex-1 text-[13.5px] font-semibold text-[#201d1d]">
                    {gap.name}
                  </span>
                  <PriorityBadge level={gap.priority} />
                </li>
              );
            })}
          </ul>
        </motion.section>

        {/* ── 2 · Learning Progress + Credentials ────────────────────────────── */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">

          {/* Learning Progress */}
          <section
            aria-labelledby="learning-heading"
            className="rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
          >
            <div className="mb-3 flex items-center gap-2">
              <BookOpen size={14} strokeWidth={2} className="text-[#9c9595]" aria-hidden="true" />
              <h2 id="learning-heading" className="text-[11px] font-bold text-[#9c9595]">
                Learning Progress
              </h2>
            </div>

            <p className="font-display text-[26px] font-bold leading-none text-[#201d1d]">
              {learningProgress.completed}
              <span className="text-[17px] font-medium text-[#9c9595]">
                {" "}/ {learningProgress.total}
              </span>
            </p>
            <p className="mb-3 mt-0.5 text-[11px] text-[#9c9595]">Modules completed</p>

            <div
              className="h-2 w-full overflow-hidden rounded-full bg-[#f0ede9]"
              role="progressbar"
              aria-valuenow={learningProgress.percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Learning progress"
            >
              <motion.div
                className="h-full rounded-full bg-[#f59e0b]"
                initial={{ width: 0 }}
                animate={{ width: `${learningProgress.percent}%` }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              />
            </div>
            <p className="mt-1.5 text-[11px] text-[#9c9595]">
              {learningProgress.percent}% complete
            </p>
          </section>

          {/* Credentials */}
          <section
            aria-labelledby="cred-heading"
            className="rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
          >
            <div className="mb-3 flex items-center gap-2">
              <BadgeCheck size={14} strokeWidth={2} className="text-[#9c9595]" aria-hidden="true" />
              <h2 id="cred-heading" className="text-[11px] font-bold text-[#9c9595]">
                Credentials
              </h2>
            </div>

            <p className="font-display text-[26px] font-bold leading-none text-[#201d1d]">
              {credentialProgress.earned}
              <span className="text-[17px] font-medium text-[#9c9595]">
                {" "}/ {credentialProgress.total}
              </span>
            </p>
            <p className="mb-3 mt-0.5 text-[11px] text-[#9c9595]">Badges earned</p>

            <div
              className="h-2 w-full overflow-hidden rounded-full bg-[#f0ede9]"
              role="progressbar"
              aria-valuenow={credPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Credential progress"
            >
              <motion.div
                className="h-full rounded-full bg-[#f59e0b]"
                initial={{ width: 0 }}
                animate={{ width: `${credPct}%` }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              />
            </div>
            <p className="mt-1.5 text-[11.5px] font-bold text-emerald-600">Keep it up!</p>
          </section>
        </motion.div>

        {/* ── 3 · Recommended + Market Signal ────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          className="overflow-hidden rounded-[24px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
        >
          {/* Recommended for You */}
          <div className="flex items-center gap-3.5 p-5">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3a0000] text-white"
              aria-hidden="true"
            >
              <Briefcase size={19} strokeWidth={1.5} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="text-[10.5px] font-bold uppercase tracking-wide text-[#9c9595]">
                {recommendation.label}
              </span>
              <p className="mt-0.5 truncate text-[13.5px] font-bold text-[#201d1d]">
                {recommendation.title}
              </p>
              <p className="mt-0.5 text-[11.5px] text-[#9c9595]">{recommendation.meta}</p>
            </div>
            <Link
              href={recommendation.href}
              className="shrink-0 rounded-full border border-[#6b0000]/35 px-3.5 py-1.5 text-[12px] font-semibold text-[#6b0000] transition-colors hover:bg-[#6b0000]/5"
            >
              View
            </Link>
          </div>

          <div className="mx-5 h-px bg-black/[0.04]" aria-hidden="true" />

          {/* Market Signal for You */}
          <div className="flex items-center gap-3.5 p-5">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f59e0b]/15 text-[#d97706]"
              aria-hidden="true"
            >
              <BarChart2 size={19} strokeWidth={1.5} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="text-[10.5px] font-bold uppercase tracking-wide text-[#9c9595]">
                {marketSignal.label}
              </span>
              <p className="mt-0.5 text-[13px] font-semibold leading-snug text-[#201d1d]">
                Demand for &ldquo;{marketSignal.skill}&rdquo; is rising in {marketSignal.location}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11.5px] font-bold text-emerald-600">
                {marketSignal.change}
              </span>
              <Link
                href={marketSignal.href}
                className="rounded-full border border-[#6b0000]/35 px-3.5 py-1.5 text-[12px] font-semibold text-[#6b0000] transition-colors hover:bg-[#6b0000]/5"
              >
                Details
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── 4 · Next Best Action ─────────────────────────────────────────────── */}
        <motion.div variants={fadeUp}>
          <Link
            href={nextBestAction.href}
            className="flex items-center gap-4 rounded-[20px] border border-[#f59e0b]/20 bg-[#fef3e2] p-5 transition-transform active:scale-[0.98]"
            aria-label={`Next Best Action: ${nextBestAction.title}`}
          >
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="text-[11px] font-bold uppercase tracking-wide text-[#d97706]">
                Your Next Best Action
              </span>
              <p className="mt-1 text-[15px] font-bold leading-snug text-[#201d1d]">
                {nextBestAction.title}
              </p>
              <p className="mt-1 text-[12px] text-[#9c9595]">{nextBestAction.meta}</p>
            </div>
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f59e0b] text-white shadow-md"
              aria-hidden="true"
            >
              <ArrowRight size={22} strokeWidth={2.5} />
            </span>
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
}
