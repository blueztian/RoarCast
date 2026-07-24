"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Bell, MapPin, Building2, Clock, CheckCircle2, ShieldAlert, 
  TrendingUp, Briefcase, ArrowRight, Users, Radio, ChevronRight, Activity, BarChart2, Target, Focus, ChevronDown, Database, Sheet, Cpu, ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import SignalBackground from "@/components/SignalBackground";
import ReadinessRing from "@/components/ReadinessRing";

// --- Mock Data Structures ---
const industryPulseStats = {
  opportunities: "1,284",
  employers: "132",
  zones: "5",
  updated: "2 hours ago",
  zoneChips: [
    "Laguna Technopark",
    "Technopark Annex",
    "LIIP",
    "Greenfield Automotive Park",
    "Toyota Santa Rosa SEZ"
  ]
};

const skillsDemandData = [
  { rank: 1, name: "SAP ERP", growth: "+24%", progress: 85 },
  { rank: 2, name: "Advanced Excel", growth: "+18%", progress: 70 },
  { rank: 3, name: "PLC Programming", growth: "+16%", progress: 65 },
  { rank: 4, name: "Quality Assurance", growth: "+13%", progress: 55 },
  { rank: 5, name: "Power BI", growth: "+11%", progress: 45 },
];

const readinessData = {
  targetRole: "Junior Accounting Operations Associate",
  score: 72,
  strongSkills: ["Excel", "Data Reconciliation"],
  skillGaps: ["SAP ERP", "ERP Systems"],
  requiredTags: ["Excel", "SAP ERP", "Data Reconciliation", "ERP Systems"]
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// ... roleIntelligenceCards omitted for mobile, but kept for desktop
const roleIntelligenceCards = [
  {
    role: "Junior Accounting Operations Associate",
    opportunities: 47,
    match: 72,
    skillTags: ["SAP ERP", "Excel", "Reconciliation", "ERP Systems"],
    metadata: { demand: "High demand", location: "Laguna Technopark", employers: 28 }
  },
  {
    role: "Finance Operations Analyst",
    opportunities: 31,
    match: 65,
    skillTags: ["Excel", "Power BI", "ERP", "Financial Reporting"],
    metadata: { demand: "Medium demand", location: "Technopark Annex", employers: 19 }
  },
  {
    role: "Supply Chain Data Assistant",
    opportunities: 26,
    match: 58,
    skillTags: ["Excel", "Data Analysis", "Power BI", "SAP ERP"],
    metadata: { demand: "Medium demand", location: "Greenfield Automotive Park", employers: 15 }
  }
];

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col w-full bg-[#fcfbf9] min-h-screen pb-32 md:pb-16 font-sans">
      
      {/* ──────────────────────────────────────────────────────────────
          MOBILE LAYOUT
          ────────────────────────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col w-full">
        {/* Maroon Hero Header */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#6b0000] to-[#3a0000] px-5 pt-12 pb-24 rounded-b-[3rem]">
          {/* Subtle network lines background simulation */}
          <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen" />
          
          <div className="relative z-10 flex flex-col w-full">
            {/* Top Row (Logo + Bell) */}
            <div className="flex w-full items-center justify-between mb-8">
              <Link href="/dashboard" className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-primary shadow-sm">
                  <Radio size={18} strokeWidth={2.5} className="text-roar-amber" aria-hidden="true" />
                </span>
                RoarCast
              </Link>
              <button aria-label="Notifications" className="relative p-2">
                <Bell size={24} className="text-white" strokeWidth={1.5} />
                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-[#5a0000] bg-white" />
              </button>
            </div>

            <div className="space-y-1">
              <h1 className="font-display text-[26px] font-bold tracking-tight text-white leading-tight">
                Good morning, Jana
              </h1>
              <p className="text-[14px] text-white/90">
                See where Santa Rosa&apos;s job market is moving.
              </p>
            </div>
          </div>
        </section>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-20 mx-4 -mt-16 flex flex-col gap-6"
        >
          
          {/* Santa Rosa Industry Pulse Panel */}
          <motion.div variants={fadeUpItem} className="flex flex-col rounded-[24px] bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.03]">
            <div className="flex justify-between items-start mb-6">
              <h2 className="font-display text-[20px] font-bold text-[#201d1d] leading-tight w-[60%]">Santa Rosa Industry Pulse</h2>
              <div className="flex flex-col items-end gap-1.5">
                <div className="flex items-center gap-1.5 rounded-full bg-brand-primary/10 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                  <span className="text-[12px] font-bold tracking-wide text-brand-primary">LIVE</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-text-secondary mr-1">
                  <Activity size={12} className="text-roar-amber" /> System is live
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pb-5 border-b border-black/[0.06]">
              <div className="flex items-center gap-3">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-brand-primary/5">
                  <BarChart2 size={24} className="text-brand-primary" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-[28px] font-bold text-brand-primary leading-none tracking-tight">{industryPulseStats.opportunities}</span>
                  <span className="text-[12px] text-text-secondary mt-0.5">opportunities analyzed</span>
                </div>
              </div>
              
              <div className="w-[1px] h-12 bg-black/[0.06]" />

              <div className="flex items-center gap-3 pr-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-roar-amber/10">
                  <Clock size={20} className="text-roar-amber" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-text-secondary">Updated</span>
                  <span className="text-[13px] font-bold text-brand-primary mt-0.5">{industryPulseStats.updated}</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-[13px] text-text-secondary mb-3 flex items-center gap-2">
                <MapPin size={16} className="text-text-secondary" strokeWidth={1.5} /> Across Santa Rosa PEZA zones
              </p>
              <div className="flex flex-wrap gap-2">
                {industryPulseStats.zoneChips.map(zone => (
                  <span key={zone} className="rounded-full border border-black/[0.06] bg-white px-3 py-1.5 text-[11px] font-medium text-[#201d1d] shadow-sm">
                    {zone}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills rising this month */}
          <motion.div variants={fadeUpItem} className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display text-[18px] font-bold text-[#201d1d]">Skills rising this month</h3>
              <button className="text-[13px] font-semibold text-[#6b0000] flex items-center gap-0.5 hover:underline">
                View all <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {skillsDemandData.slice(0, 4).map((skill, idx) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + (0.1 * idx), duration: 0.4 }}
                  key={skill.rank} 
                  className="flex items-center gap-3 rounded-[12px] border border-[#fcead9] bg-white p-3 shadow-sm hover:border-[#f59e0b]/30 transition-colors"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff5ec]">
                    <TrendingUp size={20} className="text-[#f59e0b]" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[#201d1d] text-[13px] leading-tight mb-0.5">{skill.name}</span>
                    <span className="text-[12px] font-bold text-success flex items-center gap-1">
                      ↑ {skill.growth.replace('+', '')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recommended for your program */}
          <motion.div variants={fadeUpItem} className="flex flex-col mt-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display text-[18px] font-bold text-[#201d1d]">Recommended for your program</h3>
              <button className="text-[13px] font-semibold text-[#6b0000] flex items-center gap-0.5 hover:underline">
                View all roles <ChevronRight size={16} />
              </button>
            </div>

            <div className="flex flex-col rounded-[24px] border border-black/[0.04] bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-brand-primary text-white shadow-md">
                  <Briefcase size={24} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-[#201d1d] text-[15px] leading-snug">{readinessData.targetRole}</span>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-display font-bold text-[22px] text-brand-primary leading-none">{readinessData.score}%</span>
                    <span className="text-[12px] text-text-secondary">readiness</span>
                    <div className="h-2 flex-1 max-w-[100px] overflow-hidden rounded-full bg-brand-primary/15 ml-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${readinessData.score}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full rounded-full bg-brand-primary"
                      />
                    </div>
                  </div>
                </div>
                <div className="shrink-0 mt-2">
                  {/* Miniature ring */}
                  <div className="relative h-10 w-10">
                    <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 36 36">
                      <path
                        className="stroke-brand-primary/15"
                        strokeWidth="4"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="stroke-brand-primary"
                        strokeWidth="4"
                        strokeDasharray={`${readinessData.score}, 100`}
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="w-full h-[1px] bg-black/[0.04] my-5" />

              <div className="flex flex-col">
                <span className="text-[11px] text-text-secondary mb-2.5">Required Skill Tags</span>
                <div className="flex flex-wrap gap-2 mb-5">
                  {readinessData.requiredTags.map(tag => (
                    <span key={tag} className="rounded-md border border-black/[0.06] bg-[#faf9f8] px-2.5 py-1 text-[11px] font-medium text-[#201d1d]">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col border-r border-black/[0.04] pr-2">
                    <p className="flex items-center gap-1 text-[12px] font-bold text-success mb-2.5">
                      You already have <CheckCircle2 size={14} />
                    </p>
                    <div className="flex flex-col gap-2 items-start">
                      {readinessData.strongSkills.map(skill => (
                        <span key={skill} className="rounded-full bg-[#eaf4ec] px-3 py-1.5 text-[11px] font-medium text-success w-full max-w-fit">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col pl-1">
                    <p className="flex items-center gap-1 text-[12px] font-bold text-roar-amber mb-2.5">
                      Skills to strengthen <Focus size={14} />
                    </p>
                    <div className="flex flex-col gap-2 items-start">
                      {readinessData.skillGaps.map(skill => (
                        <span key={skill} className="rounded-full bg-[#fcead9] px-3 py-1.5 text-[11px] font-medium text-roar-amber w-full max-w-fit">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link href="/audit" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#6b0000] py-3.5 text-[15px] font-semibold text-white transition-transform hover:scale-[1.02]">
                  Check my readiness <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
