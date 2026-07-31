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
  Sparkles,
  Award,
  Share2,
  Edit3,
  Target,
  Shield,
  LogOut,
  ChevronRight,
  AlertCircle
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

const credentialsData = [
  { id: "sap-erp-badge", title: "SAP ERP", verified: true },
  { id: "excel-badge", title: "Adv. Excel", verified: true },
];

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
    <div className="flex flex-1 flex-col h-full bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] font-sans overflow-y-auto">
      {/* ── 1. Header (Consistent with Explore/Learn) ── */}
      <header className="shrink-0 relative overflow-hidden px-5 pt-6 pb-12">
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <User size={20} className="text-[#f59e0b]" strokeWidth={2} />
            </div>
            <h1 className="font-display text-[22px] font-bold leading-tight tracking-tight text-white">
              Profile
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

      {/* ── Scrollable Area ── */}
      <div className="flex-1 relative z-10 -mt-16 pt-10 pb-24">
        {/* ── Content Sheet ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="min-h-full bg-[#f5f3f0] rounded-t-[2.5rem] relative px-4 pt-12 pb-12 flex flex-col gap-4 shadow-[0_-4px_24px_rgba(0,0,0,0.1)]"
        >
        {/* Overlapping Avatar */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-[24px] font-bold text-white shadow-md border-[3.5px] border-[#f5f3f0]"
          >
            {getInitials(mockStudent.name)}
          </motion.div>
        </div>

        {/* ── 2. Unified Identity & Readiness Dashboard ── */}
        <motion.div variants={fadeUpItem} className="flex flex-col bg-white rounded-[24px] p-5 shadow-sm border border-black/[0.05]">
          <div className="flex justify-between items-start">
            <div className="flex flex-col pr-2">
              <h2 className="font-display text-[20px] font-bold text-[#201d1d] leading-tight tracking-tight">
                {mockStudent.name}
              </h2>
              <p className="text-[12px] text-[#6b0000] font-bold mt-0.5 leading-snug">Accounting Information Systems</p>
              <p className="text-[11.5px] text-[#7a7373] mt-0.5">{mockStudent.location}</p>
            </div>
            <Link
              href="/credentials/portfolio"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#201d1d] px-3 py-1.5 text-[11px] font-bold text-white shadow-sm transition-transform active:scale-95"
            >
              Portfolio <Share2 size={12} strokeWidth={2.5} />
            </Link>
          </div>

          <div className="my-4 h-px w-full bg-black/[0.05]" />

          <div className="flex items-center gap-4">
            {/* Left: Goal & Progress */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#7a7373]">Career Goal</span>
                <button className="text-[#6b0000] hover:text-[#4a0000]"><Edit3 size={12} strokeWidth={2.5} /></button>
              </div>
              <p className="text-[13.5px] font-bold leading-snug text-[#201d1d] mt-1">
                Accounting Operations Role
              </p>
              <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#f0ede9]">
                <div className="h-full rounded-full bg-[#f59e0b]" style={{ width: "68%" }} />
              </div>
            </div>

            {/* Right: Compact Readiness Gauge */}
            <div className="flex flex-col items-center justify-center pl-4 border-l border-black/[0.05]">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                <svg className="absolute inset-0 h-full w-full -rotate-90 drop-shadow-sm" viewBox="0 0 36 36">
                  <defs>
                    <linearGradient id="readinessGradCompact" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fde047" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                  <path className="stroke-[#f0ede9]" strokeWidth="4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path stroke="url(#readinessGradCompact)" strokeWidth="4" strokeDasharray="72, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="font-display text-[18px] font-bold text-[#201d1d]">72%</span>
              </div>
              <span className="mt-1 text-[9px] font-bold tracking-widest text-[#d97706] uppercase">Ready</span>
            </div>
          </div>
        </motion.div>

        {/* ── 3. Skills & Gaps (Side by Side Grid) ── */}
        <motion.div variants={fadeUpItem} className="grid grid-cols-2 gap-3">
          {/* Skills Have */}
          <div className="flex flex-col rounded-[20px] bg-white p-4 shadow-sm border border-black/[0.05]">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#7a7373] mb-3">Skills You Have</h4>
            <div className="flex flex-col gap-2.5">
              {["Excel", "Communication", "Accounting"].map((skill) => (
                <div key={skill} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" strokeWidth={3} />
                  <span className="text-[12.5px] font-bold text-[#201d1d] truncate">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Gaps */}
          <div className="flex flex-col rounded-[20px] bg-[#fff8ee] p-4 shadow-sm border border-[#f59e0b]/20 justify-between">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d97706] mb-3">Priority Gaps</h4>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <AlertCircle size={14} className="text-[#d97706] shrink-0" strokeWidth={2.5} />
                  <span className="text-[12.5px] font-bold text-[#201d1d] truncate">SAP ERP</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle size={14} className="text-[#d97706] shrink-0" strokeWidth={2.5} />
                  <span className="text-[12.5px] font-bold text-[#201d1d] truncate">Adv. Reporting</span>
                </div>
              </div>
            </div>
            <Link
              href="/learn"
              className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#f59e0b] py-2 text-[11px] font-bold text-white shadow-sm transition-colors hover:bg-[#d97706]"
            >
              Upskill <ArrowRight size={12} strokeWidth={2.5} />
            </Link>
          </div>
        </motion.div>

        {/* ── 4. Compact Credentials ── */}
        <motion.section variants={fadeUpItem} className="flex flex-col rounded-[24px] bg-white shadow-sm border border-black/[0.05] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-bold text-[#201d1d]">Verified Credentials</h3>
            <Link href="/credentials" className="text-[11px] font-bold text-[#6b0000] hover:underline">View All</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {credentialsData.map((cred) => (
              <div key={cred.id} className="flex min-w-[140px] flex-col items-center justify-center rounded-[16px] border border-black/[0.05] bg-[#faf9f8] p-3 text-center">
                <Award size={24} className="text-[#f59e0b] mb-1.5" />
                <span className="text-[12px] font-bold text-[#201d1d] leading-tight">{cred.title}</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 mt-1 flex items-center gap-1">
                  <CheckCircle2 size={10} strokeWidth={3} /> Verified
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── 5. Profile Actions ── */}
        <motion.section variants={fadeUpItem} className="flex flex-col mt-2">
          <div className="flex flex-col gap-1 rounded-[24px] bg-white shadow-sm border border-black/[0.05] overflow-hidden">
            <Link href="/profile/settings" className="flex items-center justify-between p-4 bg-white hover:bg-[#faf9f8] transition-colors border-b border-black/[0.04]">
              <div className="flex items-center gap-3 text-[#201d1d]">
                <Settings size={18} className="text-[#7a7373]" />
                <span className="text-[14.5px] font-bold">Account Settings</span>
              </div>
              <ChevronRight size={18} className="text-[#c0bbbb]" />
            </Link>
            <Link href="/profile/audit-history" className="flex items-center justify-between p-4 bg-white hover:bg-[#faf9f8] transition-colors border-b border-black/[0.04]">
              <div className="flex items-center gap-3 text-[#201d1d]">
                <History size={18} className="text-[#7a7373]" />
                <span className="text-[14.5px] font-bold">Activity History</span>
              </div>
              <ChevronRight size={18} className="text-[#c0bbbb]" />
            </Link>
            <button className="flex items-center justify-between p-4 bg-white hover:bg-[#faf9f8] transition-colors border-b border-black/[0.04] text-left">
              <div className="flex items-center gap-3 text-[#201d1d]">
                <Shield size={18} className="text-[#7a7373]" />
                <span className="text-[14.5px] font-bold">Privacy Settings</span>
              </div>
              <ChevronRight size={18} className="text-[#c0bbbb]" />
            </button>
            <button className="flex items-center justify-between p-4 bg-white hover:bg-[#faf9f8] transition-colors text-left">
              <div className="flex items-center gap-3 text-red-600">
                <LogOut size={18} className="text-red-500" />
                <span className="text-[14.5px] font-bold">Sign Out</span>
              </div>
            </button>
          </div>
        </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
