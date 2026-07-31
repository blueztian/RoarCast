"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bell, Radio, ChevronRight,
  TrendingUp, Database, RefreshCw, Layers,
  Briefcase, Pencil,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import SignalBackground from "@/components/SignalBackground";
import ReadinessRing from "@/components/ReadinessRing";

// ─── Mock Data ─────────────────────────────────────────────────────────────────
// Industry Pulse data lives in data/industryPulse.ts — reserved for Explore pages.

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
  { id: "sap-erp", name: "SAP ERP", priority: "High", icon: Database },
  { id: "data-recon", name: "Data Reconciliation", priority: "Medium", icon: RefreshCw },
  { id: "erp-sys", name: "ERP Systems", priority: "Medium", icon: Layers },
];

const recommendation = {
  role: "Junior Accounting Operations Associate",
  match: 72,
  href: "/explore",
};

const quickAction = {
  title: "Continue your readiness plan",
  meta: "3 tasks due this week",
  href: "/learn/erp-foundations",
};

// ─── Animations ────────────────────────────────────────────────────────────────
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" } },
};

// ─── Priority Badge ────────────────────────────────────────────────────────────
function PriorityBadge({ level }: { level: string }) {
  const isHigh = level === "High";
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-[14px] font-bold leading-none",
        isHigh
          ? "bg-[#4a0000] text-white"
          : "bg-[#f59e0b] text-white"
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

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans">

      {/* ── Hero Header (compressed) ─────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pt-12 pb-20 rounded-b-[3rem]">
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />

        <div className="relative z-10">
          {/* Logo + Bell */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 font-display text-[20px] font-bold tracking-tight text-white"
            >
              <Image
                src="/roarcast-icon.png"
                alt="RoarCast Logo"
                width={36}
                height={36}
                className="rounded-full shadow-sm"
              />
              RoarCast
            </Link>

            <Link href="#" className="relative p-1.5">
              <Bell size={24} className="text-white" strokeWidth={1.5} />
              <span
                aria-hidden="true"
                className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-[#4a0000] bg-[#f59e0b]"
              />
            </Link>
          </div>

          {/* Greeting */}
          <div className="space-y-1">
            <h1 className="font-display text-[30px] font-bold leading-none tracking-tight text-white">
              {studentProfile.greeting}, {studentProfile.name}
            </h1>
            <p className="text-[16px] leading-tight text-white/75">
              See where Santa Rosa&apos;s job market is moving.
            </p>
          </div>
        </div>
      </header>

      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-4 -mt-14 flex flex-col gap-3 pb-36"
      >

        {/* ── 1 · Your Readiness Score ──────────────────────────────────────── */}
        <motion.section
          variants={fadeUp}
          aria-labelledby="readiness-heading"
          className="rounded-[24px] bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
        >
          <h2
            id="readiness-heading"
            className="mb-3 text-[18px] leading-none font-bold text-[#201d1d]"
          >
            Your Readiness Score
          </h2>

          {/* Gauge + Target Role */}
          <div className="flex items-center gap-3">
            {/* Full-circle ring — sized for mobile */}
            <div className="shrink-0">
              <ReadinessRing
                percentage={readiness.score}
                size={120}
                strokeWidth={10}
                label="Job Ready"
              />
            </div>

            {/* Target Role panel */}
            <div className="flex flex-1 flex-col rounded-[16px] border border-black/[0.07] bg-[#faf9f8] p-3">
              <span className="text-[14px] leading-none font-semibold uppercase tracking-wider text-[#9c9595]">
                Target Role
              </span>
              <p className="mt-2 font-display text-[18px] font-bold leading-none text-[#201d1d]">
                {readiness.targetRole}
              </p>
              <button
                className="mt-2 self-start text-[14px] leading-none font-bold text-[#f59e0b] transition-opacity hover:opacity-70"
                aria-label="Change target role"
              >
                Change target
              </button>
            </div>
          </div>

          {/* Trend */}
          <p className="mt-3 flex items-center gap-1.5 text-[16px] leading-none font-bold text-emerald-600">
            <TrendingUp size={16} strokeWidth={2.5} aria-hidden="true" />
            {readiness.trend} vs last month
          </p>
        </motion.section>

        {/* ── 2 · Top Skill Gaps ────────────────────────────────────────────── */}
        <motion.section
          variants={fadeUp}
          aria-labelledby="gaps-heading"
          className="rounded-[24px] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
        >
          <div className="mb-2 flex items-center justify-between">
            <h2 id="gaps-heading" className="text-[18px] leading-none font-bold text-[#201d1d]">
              Top Skill Gaps
            </h2>
            <button className="flex items-center gap-0.5 text-[14px] leading-none font-semibold text-[#6b0000]">
              See all <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>

          <ul className="flex flex-col divide-y divide-black/[0.04]" aria-label="Top skill gaps">
            {skillGaps.map((gap) => {
              const Icon = gap.icon;
              return (
                <li key={gap.id} className="flex items-center gap-3 py-2.5">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#f59e0b]/20 bg-[#fff8ee]"
                    aria-hidden="true"
                  >
                    <Icon size={18} className="text-[#f59e0b]" strokeWidth={2} />
                  </span>
                  <span className="flex-1 text-[16px] leading-none font-semibold text-[#201d1d]">
                    {gap.name}
                  </span>
                  <PriorityBadge level={gap.priority} />
                </li>
              );
            })}
          </ul>
        </motion.section>

        {/* ── 3 · Recommended for You ───────────────────────────────────────── */}
        <motion.section
          variants={fadeUp}
          aria-labelledby="rec-heading"
          className="rounded-[24px] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
        >
          <h2 id="rec-heading" className="mb-3 text-[18px] leading-none font-bold text-[#201d1d]">
            Recommended for you
          </h2>

          <div className="flex items-center gap-3">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#3a0000] text-white shadow-sm"
              aria-hidden="true"
            >
              <Briefcase size={22} strokeWidth={1.5} />
            </span>
            <div className="flex flex-1 flex-col gap-1">
              <p className="text-[18px] leading-none font-bold text-[#201d1d]">
                {recommendation.role}
              </p>
              <p className="text-[16px] leading-none font-bold text-emerald-600">
                {recommendation.match}% match
              </p>
            </div>
            <Link
              href={recommendation.href}
              className="shrink-0 rounded-full bg-[#f0ede9] px-3 py-1.5 text-[14px] leading-none font-semibold text-[#5e5a5a] transition-colors hover:bg-[#e8e4df]"
            >
              View role
            </Link>
          </div>
        </motion.section>

        {/* ── 4 · Quick Action ──────────────────────────────────────────────── */}
        <motion.section
          variants={fadeUp}
          aria-labelledby="action-heading"
          className="rounded-[24px] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
        >
          <h2 id="action-heading" className="mb-3 text-[18px] leading-none font-bold text-[#201d1d]">
            Quick action
          </h2>

          <Link
            href={quickAction.href}
            className="flex items-center gap-3"
            aria-label={quickAction.title}
          >
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#f59e0b]/25 bg-[#fff8ee] text-[#f59e0b]"
              aria-hidden="true"
            >
              <Pencil size={22} strokeWidth={2} />
            </span>
            <div className="flex flex-1 flex-col gap-1">
              <p className="text-[18px] leading-none font-bold text-[#201d1d]">{quickAction.title}</p>
              <p className="text-[14px] leading-none text-[#9c9595]">{quickAction.meta}</p>
            </div>
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f5f3f0] text-[#5e5a5a]"
              aria-hidden="true"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </span>
          </Link>
        </motion.section>

      </motion.div>
    </div>
  );
}
