"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell, Radio, ChevronRight, TrendingUp,
  Database, RefreshCw, Layers, Briefcase,
  Pencil, ArrowRight, MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SignalBackground from "@/components/SignalBackground";
import ReadinessGauge from "@/components/ReadinessGauge";
import {
  staggerContainer, staggerItem, cardHover, buttonPress,
} from "@/lib/motion";

// ─── Canonical student data ──────────────────────────────────────────────────
// All numbers are internally consistent:
// • Target role match (market) = 82 %  → what RoarCast found for this role
// • Personal readiness score   = 72 %  → how ready Jana is RIGHT NOW
// • Skill gaps are the delta between the 72 % and the full 100 %
// Industry-wide data (pulse, skills demand, PEZA zones) lives in
// data/industryPulse.ts and is used exclusively by the Explore pages.

const STUDENT = {
  name: "Jana",
  program: "BS Accountancy",
  greeting: () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  },
};

const READINESS = {
  score: 72,
  trend: +12,   // percentage points vs last month
  targetRole: "Junior Accounting Operations Associate",
  location: "Santa Rosa, Laguna",
};

const SKILL_GAPS: { id: string; name: string; priority: "High" | "Medium" | "Low"; icon: React.ElementType }[] = [
  { id: "sap-erp",    name: "SAP ERP",             priority: "High",   icon: Database  },
  { id: "data-recon", name: "Data Reconciliation",  priority: "Medium", icon: RefreshCw },
  { id: "erp-sys",    name: "ERP Systems",          priority: "Medium", icon: Layers    },
];

// 82 % = market match (how well this role fits Jana's profile in the market)
// Distinct from Jana's personal readiness score of 72 %.
const RECOMMENDATION = {
  role: "Junior Accounting Operations Associate",
  matchPct: 82,
  employer: "Laguna Technopark Employers",
  href: "/explore",
};

const QUICK_ACTION = {
  title: "Continue your readiness plan",
  sub: "3 tasks due this week",
  href: "/learn/erp-foundations",
};

// ─── Motion variants ─────────────────────────────────────────────────────────
// Use shared presets from /lib/motion — never invent one-off styles.

const heroVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Animated counter: counts up from 0 → target over ~1 s */
function useCountUp(target: number, delay = 300) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur   = 1100;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start - delay) / dur, 1);
      if (t <= 0) { raf = requestAnimationFrame(tick); return; }
      const eased = 1 - Math.pow(1 - t, 3);  // ease-out cubic
      setVal(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, delay]);
  return val;
}

type Priority = "High" | "Medium" | "Low";

function PriorityBadge({ level }: { level: Priority }) {
  const styles: Record<Priority, string> = {
    High:   "bg-[#4a0404] text-white",
    Medium: "bg-[#f59e0b] text-white",
    Low:    "bg-[#e5e2de] text-[#6b6560]",
  };
  return (
    <span className={cn(
      "rounded-full px-3 py-1 text-[11.5px] font-bold leading-none tracking-wide",
      styles[level]
    )}>
      {level}
    </span>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const displayScore = useCountUp(READINESS.score, 600);

  if (!mounted) return null;

  const greeting = STUDENT.greeting();

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f0ece8] font-sans antialiased">

      {/* ── HERO HEADER ────────────────────────────────────────────────────── */}
      <motion.header
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden bg-gradient-to-br from-[#730000] via-[#4e0000] to-[#260000] px-5 pt-[3.75rem] pb-32 rounded-b-[2.75rem]"
      >
        <SignalBackground
          className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen"
        />

        <div className="relative z-10">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-7">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 font-display text-[19px] font-bold tracking-tight text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-md shadow-black/20">
                <Radio size={17} strokeWidth={2.5} className="text-[#f59e0b]" aria-hidden="true" />
              </span>
              RoarCast
            </Link>

            <motion.button
              {...buttonPress}
              aria-label="Notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <Bell size={20} strokeWidth={1.6} />
              {/* Live pulse dot */}
              <span className="absolute right-2 top-2 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f59e0b] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f59e0b]" />
              </span>
            </motion.button>
          </div>

          {/* Greeting */}
          <div>
            <p className="text-[13px] font-medium text-white/60 mb-1">{greeting},</p>
            <h1 className="font-display text-[28px] font-bold leading-[1.15] tracking-tight text-white">
              {STUDENT.name} 👋
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-white/65">
              <Link href="/explore" className="underline underline-offset-2 hover:text-white/90 transition-colors">
                See where
              </Link>{" "}
              Santa Rosa&apos;s job market is moving.
            </p>
          </div>
        </div>
      </motion.header>

      {/* ── CARD STACK ─────────────────────────────────────────────────────── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-4 -mt-[4.5rem] flex flex-col gap-3 pb-32"
      >

        {/* ── 1 · READINESS SCORE ──────────────────────────────────────────── */}
        <motion.section
          variants={staggerItem}
          {...cardHover}
          aria-labelledby="readiness-heading"
          className="overflow-hidden rounded-[22px] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]"
        >
          <div className="px-5 pt-5 pb-4">
            <h2
              id="readiness-heading"
              className="mb-4 text-[13px] font-bold tracking-wide text-[#1c1a17]"
            >
              Your Readiness Score
            </h2>

            {/* Gauge + Target Role */}
            <div className="flex items-center gap-4">
              {/* Pass displayScore so label also counts up, but gauge uses real value */}
              <div className="relative">
                <ReadinessGauge score={READINESS.score} size={138} strokeWidth={13} />
                {/* Override the internal label with the counted-up value */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="font-display text-[31px] font-bold leading-none tracking-tight text-[#1c1a17] font-feature-tabular">
                    {displayScore}%
                  </span>
                  <span className="mt-1 text-[10.5px] font-semibold tracking-wide text-[#8a8480]">
                    Job ready
                  </span>
                </div>
              </div>

              {/* Target role */}
              <div className="flex flex-1 flex-col min-w-0 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#a09a95] mb-1.5">
                  Target Role
                </span>
                <p className="font-display text-[15.5px] font-bold leading-snug text-[#1c1a17]">
                  {READINESS.targetRole}
                </p>
                <div className="mt-1 flex items-center gap-1.5 text-[11.5px] text-[#8a8480]">
                  <MapPin size={11} strokeWidth={2} aria-hidden="true" />
                  {READINESS.location}
                </div>
                <motion.button
                  {...buttonPress}
                  className="mt-3 self-start text-[12.5px] font-semibold text-[#d97706] transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b]/50 rounded"
                  aria-label="Change your target role"
                >
                  Change target ›
                </motion.button>
              </div>
            </div>

            {/* Trend */}
            <div className="mt-3 flex items-center gap-1.5">
              <span className="flex items-center gap-1 text-[12.5px] font-bold text-emerald-500">
                <TrendingUp size={13} strokeWidth={2.5} aria-hidden="true" />
                +{READINESS.trend}% vs last month
              </span>
              <span className="text-[11.5px] text-[#a09a95]">· Keep going!</span>
            </div>
          </div>

          {/* Skill Gaps — inside the same card, separated by a divider */}
          <div className="mx-5 h-px bg-[#f0ece8]" aria-hidden="true" />

          <div className="px-5 pt-4 pb-5">
            <div className="mb-3.5 flex items-center justify-between">
              <h3 className="text-[13px] font-bold text-[#1c1a17]">Top Skill Gaps</h3>
              <motion.button
                {...buttonPress}
                className="flex items-center gap-0.5 text-[12px] font-semibold text-[#d97706] hover:opacity-75"
              >
                See all <ChevronRight size={13} aria-hidden="true" />
              </motion.button>
            </div>

            <ul className="flex flex-col gap-2.5" aria-label="Your top skill gaps">
              {SKILL_GAPS.map((gap, i) => {
                const Icon = gap.icon;
                return (
                  <motion.li
                    key={gap.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + i * 0.07, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl border border-[#ede9e3] bg-[#faf8f5]"
                      aria-hidden="true"
                    >
                      <Icon size={16} className="text-[#7a7570]" strokeWidth={1.75} />
                    </span>
                    <span className="flex-1 text-[13.5px] font-semibold text-[#1c1a17]">
                      {gap.name}
                    </span>
                    <PriorityBadge level={gap.priority} />
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </motion.section>

        {/* ── 2 · RECOMMENDED FOR YOU ──────────────────────────────────────── */}
        <motion.section
          variants={staggerItem}
          aria-labelledby="recommend-heading"
          className="rounded-[22px] bg-white px-5 pt-5 pb-5 shadow-[0_2px_16px_rgba(0,0,0,0.07),0_0_0_1px_rgba(0,0,0,0.04)]"
        >
          <h2
            id="recommend-heading"
            className="mb-4 text-[13px] font-bold tracking-wide text-[#1c1a17]"
          >
            Recommended for you
          </h2>

          <motion.div
            {...cardHover}
            className="flex items-center gap-3.5 rounded-xl border border-[#f0ece8] bg-[#faf8f5] p-3.5 cursor-pointer"
          >
            {/* Icon */}
            <span
              className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#3a0000] text-white shadow-sm"
              aria-hidden="true"
            >
              <Briefcase size={19} strokeWidth={1.5} />
            </span>

            {/* Text */}
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="text-[13.5px] font-bold leading-snug text-[#1c1a17] truncate">
                {RECOMMENDATION.role}
              </p>
              <p className="mt-0.5 text-[12px] font-bold text-emerald-500">
                {RECOMMENDATION.matchPct}% match
              </p>
            </div>

            {/* CTA */}
            <Link
              href={RECOMMENDATION.href}
              className="shrink-0 rounded-full border border-[#ddd8d2] bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#5a5650] shadow-sm transition-colors hover:bg-[#f0ece8] active:scale-95"
              onClick={(e) => e.stopPropagation()}
            >
              View role
            </Link>
          </motion.div>
        </motion.section>

        {/* ── 3 · QUICK ACTION ─────────────────────────────────────────────── */}
        <motion.section
          variants={staggerItem}
          aria-labelledby="quick-action-heading"
          className="rounded-[22px] bg-white px-5 pt-5 pb-5 shadow-[0_2px_16px_rgba(0,0,0,0.07),0_0_0_1px_rgba(0,0,0,0.04)]"
        >
          <h2
            id="quick-action-heading"
            className="mb-4 text-[13px] font-bold tracking-wide text-[#1c1a17]"
          >
            Quick action
          </h2>

          <motion.div {...cardHover}>
            <Link
              href={QUICK_ACTION.href}
              className="flex items-center gap-3.5 rounded-xl border border-[#f0ece8] bg-[#faf8f5] p-3.5 transition-colors hover:bg-[#f5f0eb]"
              aria-label={`Quick action: ${QUICK_ACTION.title}. ${QUICK_ACTION.sub}`}
            >
              {/* Icon */}
              <span
                className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#f59e0b] text-white shadow-sm shadow-[#f59e0b]/30"
                aria-hidden="true"
              >
                <Pencil size={17} strokeWidth={2} />
              </span>

              {/* Text */}
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-[13.5px] font-bold leading-snug text-[#1c1a17]">
                  {QUICK_ACTION.title}
                </p>
                <p className="mt-0.5 text-[11.5px] text-[#8a8480]">{QUICK_ACTION.sub}</p>
              </div>

              {/* Arrow */}
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#ddd8d2] bg-white text-[#5a5650] shadow-sm"
                aria-hidden="true"
              >
                <ArrowRight size={15} strokeWidth={2.5} />
              </span>
            </Link>
          </motion.div>
        </motion.section>

      </motion.div>
    </div>
  );
}
