"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Award, Sparkles } from "lucide-react";
import SignalBackground from "@/components/SignalBackground";
import { mockStudent } from "@/data/mockStudent";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// Mocked for now — mirrors the credentials + skills data shown elsewhere in the app.
const portfolioData = {
  readinessScore: 72,
  skillsCount: 12,
  certificatesCount: 4,
  aboutMe:
    "Aspiring Data & Finance professional with hands-on experience in ERP systems and a passion for process improvement.",
  topSkills: [
    "SAP ERP",
    "Advanced Excel",
    "Data Reconciliation",
    "ERP Systems",
    "PLC Programming",
  ],
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function PortfolioPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-30 flex flex-col justify-end overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pb-5 rounded-b-[2.5rem] shadow-sm transition-all" style={{ height: 120 }}>
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex items-center justify-between">
          <Link
            href="/credentials"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Back to Credentials"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-display text-[20px] font-bold leading-tight tracking-tight text-white">
            My Portfolio
          </h1>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Share portfolio"
          >
            <Share2 size={16} />
          </button>
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
        {/* ── Profile Card ──────────────────────────────────────────────── */}
        <motion.section
          variants={fadeUpItem}
          className="flex flex-col items-center rounded-[24px] bg-white p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-[22px] font-bold text-white shadow-sm">
            {getInitials(mockStudent.name)}
          </div>
          <h2 className="mt-3 font-display text-[19px] font-bold text-[#201d1d]">
            {mockStudent.name}
          </h2>
          <p className="mt-0.5 text-[12.5px] text-[#7a7373]">
            {mockStudent.program} · {mockStudent.location}
          </p>
        </motion.section>

        {/* ── Stats Row ─────────────────────────────────────────────────── */}
        <motion.section
          variants={fadeUpItem}
          className="grid grid-cols-3 gap-3"
        >
          {[
            { label: "Readiness", value: `${portfolioData.readinessScore}%` },
            { label: "Skills", value: portfolioData.skillsCount },
            { label: "Certificates", value: portfolioData.certificatesCount },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-[18px] border border-black/[0.05] bg-white py-4 shadow-sm"
            >
              <span className="font-display text-[22px] font-bold text-[#6b0000]">
                {stat.value}
              </span>
              <span className="mt-0.5 text-[10.5px] font-bold uppercase tracking-wide text-[#7a7373]">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.section>

        {/* ── About Me ──────────────────────────────────────────────────── */}
        <motion.section
          variants={fadeUpItem}
          className="flex flex-col rounded-[24px] border border-black/[0.05] bg-white p-5 shadow-sm"
        >
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#7a7373] mb-2.5">
            About Me
          </h3>
          <p className="text-[13.5px] leading-snug text-[#5e5a5a]">
            {portfolioData.aboutMe}
          </p>
        </motion.section>

        {/* ── Top Skills ────────────────────────────────────────────────── */}
        <motion.section
          variants={fadeUpItem}
          className="flex flex-col rounded-[24px] border border-black/[0.05] bg-white p-5 shadow-sm"
        >
          <div className="mb-3 flex items-center gap-2">
            <Sparkles size={15} className="text-[#f59e0b]" />
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#7a7373]">
              Top Skills
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {portfolioData.topSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-[#faf9f8] border border-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-[#201d1d]"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.section>

        {/* ── Verified Credentials Summary ─────────────────────────────── */}
        <motion.section
          variants={fadeUpItem}
          className="flex items-center justify-between rounded-[24px] border border-[#f59e0b]/20 bg-[#fff8ee] p-4"
        >
          <div className="flex items-center gap-2.5">
            <Award size={18} className="text-[#d97706]" />
            <span className="text-[12.5px] font-bold text-[#201d1d]">
              {portfolioData.certificatesCount} verified credentials
            </span>
          </div>
          <Link
            href="/credentials"
            className="text-[11.5px] font-bold text-[#d97706] hover:underline"
          >
            View all
          </Link>
        </motion.section>

        {/* ── Share CTA ─────────────────────────────────────────────────── */}
        <motion.button
          variants={fadeUpItem}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#6b0000] py-3.5 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-[#4a0000]"
        >
          Share Portfolio <Share2 size={16} />
        </motion.button>
      </motion.div>
    </div>
  );
}
