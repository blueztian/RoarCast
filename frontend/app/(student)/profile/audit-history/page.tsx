"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp } from "lucide-react";
import SignalBackground from "@/components/SignalBackground";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// Mocked readiness history — mirrors the 72% score shown on the Profile page.
const readinessHistory = [
  { month: "Jan", score: 48 },
  { month: "Feb", score: 52 },
  { month: "Mar", score: 60 },
  { month: "Apr", score: 65 },
  { month: "May", score: 68 },
  { month: "Jun", score: 72 },
];

const pastAssessments = [
  { date: "Jun 5, 2026", score: 72 },
  { date: "Apr 8, 2026", score: 65 },
  { date: "Jan 6, 2026", score: 48 },
];

// Chart geometry
const CHART_W = 320;
const CHART_H = 140;
const PAD = 20;

function buildLinePath() {
  const max = 100;
  const min = 0;
  const stepX = (CHART_W - PAD * 2) / (readinessHistory.length - 1);
  const points = readinessHistory.map((point, i) => {
    const x = PAD + i * stepX;
    const y = PAD + (1 - (point.score - min) / (max - min)) * (CHART_H - PAD * 2);
    return { x, y, score: point.score, month: point.month };
  });
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
  return { path, points };
}

export default function AuditHistoryPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const { path, points } = buildLinePath();
  const growth = readinessHistory[readinessHistory.length - 1].score - readinessHistory[0].score;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      <header className="fixed inset-x-0 top-0 z-30 flex flex-col justify-end overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pb-5 rounded-b-[2.5rem] shadow-sm transition-all" style={{ height: 90 }}>
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex items-center gap-3">
          <Link
            href="/profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Back to Profile"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-display text-[22px] font-bold leading-tight tracking-tight text-white">
            Audit History
          </h1>
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
        {/* ── Readiness over time chart ─────────────────────────────────── */}
        <motion.section
          variants={fadeUpItem}
          className="flex flex-col rounded-[24px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
        >
          <div className="mb-1 flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#7a7373]">
                Readiness Over Time
              </span>
              <span className="mt-1 font-display text-[26px] font-bold leading-none text-[#201d1d]">
                {readinessHistory[readinessHistory.length - 1].score}%
              </span>
            </div>
            <span className="mt-1 flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11.5px] font-bold text-emerald-600">
              <TrendingUp size={13} strokeWidth={2.5} /> +{growth}% vs Jan
            </span>
          </div>

          <svg
            className="mt-4 w-full"
            viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            preserveAspectRatio="none"
          >
            <path d={path} fill="none" stroke="#6b0000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {points.map((p) => (
              <circle key={p.month} cx={p.x} cy={p.y} r="3.5" fill="#6b0000" />
            ))}
          </svg>
          <div className="mt-1 flex justify-between px-1">
            {readinessHistory.map((point) => (
              <span key={point.month} className="text-[10.5px] font-medium text-[#7a7373]">
                {point.month}
              </span>
            ))}
          </div>
        </motion.section>

        {/* ── Past assessments ─────────────────────────────────────────── */}
        <motion.section variants={fadeUpItem} className="flex flex-col">
          <div className="mb-3 flex items-center justify-between px-1">
            <h3 className="font-display text-[16px] font-bold text-[#201d1d]">
              Past Assessments
            </h3>
          </div>
          <div className="flex flex-col gap-2.5">
            {pastAssessments.map((assessment) => (
              <div
                key={assessment.date}
                className="flex items-center justify-between rounded-[16px] border border-black/[0.05] bg-white p-3.5 shadow-sm"
              >
                <span className="text-[13px] font-medium text-[#201d1d]">
                  {assessment.date}
                </span>
                <span className="rounded-full bg-[#faf9f8] px-3 py-1 text-[12.5px] font-bold text-[#6b0000]">
                  {assessment.score}%
                </span>
              </div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
