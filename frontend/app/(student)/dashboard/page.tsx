"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Bell, MapPin, Building2, Clock, CheckCircle2, ShieldAlert, 
  TrendingUp, Briefcase, ArrowRight, Users, Radio, ChevronRight, Activity, BarChart2, Target, Focus, ChevronDown 
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


      {/* ──────────────────────────────────────────────────────────────
          DESKTOP LAYOUT (Perfect Match)
          ────────────────────────────────────────────────────────────── */}
      <div className="hidden md:flex flex-col w-full relative">
        {/* Maroon Hero Header */}
        <section className="relative overflow-hidden bg-[#6b0000] px-10 pt-14 pb-36 rounded-br-[4rem] rounded-bl-[1rem] ml-1 mr-4 mt-2 shadow-lg">
          <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen" />
          <div className="relative z-10 flex w-full items-start justify-between">
            <div className="space-y-2">
              <h1 className="font-display text-[34px] font-bold tracking-tight text-white leading-tight">
                Good morning, Jana.
              </h1>
              <p className="text-[15px] text-white/90 font-medium">
                Here&apos;s what Santa Rosa employers are looking for right now.
              </p>
            </div>
            <button aria-label="Notifications" className="relative mt-2 rounded-full p-2.5 transition-colors border border-white/20 hover:bg-white/10">
              <Bell size={20} className="text-white" strokeWidth={2} />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-[#6b0000] bg-[#f59e0b]" />
            </button>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="relative z-20 mx-8 -mt-24 px-2 pb-20">
          
          {/* Industry Pulse Summary Panel */}
          <motion.div variants={fadeUpItem} initial="hidden" animate="show" className="mb-8 flex flex-col rounded-[24px] border border-black/[0.04] bg-white p-7 shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-display text-[22px] font-bold text-[#201d1d]">Santa Rosa Industry Pulse</h2>
              <span className="flex items-center gap-1.5 rounded-full bg-[#fff5ec] px-3 py-1 text-[12px] font-medium text-[#f59e0b]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
                Live demand intelligence
              </span>
            </div>

            <div className="grid w-full grid-cols-4 items-center">
              {/* Col 1 */}
              <div className="flex items-center gap-4 pr-6">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#6b0000]/5 text-[#6b0000]">
                  <BarChart2 size={24} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-[26px] font-bold text-[#6b0000] leading-none">{industryPulseStats.opportunities}</span>
                  <span className="text-[13px] text-text-secondary mt-1">opportunities analyzed</span>
                </div>
              </div>

              {/* Col 2 */}
              <div className="flex items-center gap-4 px-6 border-l border-black/[0.06]">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-black/[0.03] text-[#5e5a5a]">
                  <Users size={24} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-[26px] font-bold text-[#201d1d] leading-none">{industryPulseStats.employers}</span>
                  <span className="text-[13px] text-text-secondary mt-1">employers represented</span>
                </div>
              </div>

              {/* Col 3 */}
              <div className="flex items-center gap-4 px-6 border-l border-black/[0.06]">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#6b0000]/5 text-[#6b0000]">
                  <MapPin size={24} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-[26px] font-bold text-[#201d1d] leading-none">{industryPulseStats.zones}</span>
                  <span className="text-[13px] text-text-secondary mt-1">PEZA zones monitored</span>
                </div>
              </div>

              {/* Col 4 */}
              <div className="flex items-center gap-4 pl-6 border-l border-black/[0.06]">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#fff5ec] text-[#f59e0b]">
                  <Clock size={24} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-text-secondary mb-1">Updated</span>
                  <span className="font-bold text-[#6b0000] text-[15px] leading-none">{industryPulseStats.updated}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            
            {/* LEFT: Skills gaining demand */}
            <motion.div variants={fadeUpItem} className="flex flex-col rounded-[24px] border border-black/[0.04] bg-white p-7 shadow-sm lg:col-span-3">
              <div className="mb-6">
                <h3 className="font-display text-[20px] font-bold text-[#201d1d]">Skills gaining demand</h3>
                <p className="mt-1.5 text-[13px] text-text-secondary font-medium">Based on skills appearing across recently analyzed local opportunities.</p>
              </div>
              
              <div className="flex flex-col gap-5 mt-2">
                {skillsDemandData.map((skill) => (
                  <div key={skill.rank} className="flex items-center gap-5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4f2f0] text-[13px] font-bold text-[#5e5a5a]">
                      {skill.rank}
                    </div>
                    <div className="w-36 shrink-0 font-bold text-[#201d1d] text-[14px]">{skill.name}</div>
                    
                    <TrendingUp size={20} strokeWidth={2} className="text-[#f59e0b] shrink-0" />

                    <div className="h-[8px] flex-1 overflow-hidden rounded-full bg-[#6b0000]/10 mx-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.progress}%` }}
                        transition={{ duration: 1, delay: 0.1 * skill.rank }}
                        className="h-full rounded-full bg-[#6b0000]"
                      />
                    </div>
                    <div className="w-16 shrink-0 text-right text-[14px] font-bold text-success flex items-center justify-end gap-1">
                      <TrendingUp size={14} strokeWidth={3} />
                      {skill.growth.replace('+', '')}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: Your readiness */}
            <motion.div variants={fadeUpItem} className="flex flex-col rounded-[24px] border border-black/[0.04] bg-white p-7 shadow-sm lg:col-span-2 relative">
              <h3 className="font-display text-[20px] font-bold text-[#201d1d] mb-4">Your readiness</h3>
              
              <div className="flex items-start justify-between">
                <div className="flex flex-col flex-1 pr-4">
                  <p className="text-[12px] font-semibold text-text-secondary mb-1">Target role</p>
                  <p className="font-bold text-[#201d1d] text-[16px] leading-tight mb-6">{readinessData.targetRole}</p>

                  <div className="flex flex-col gap-5">
                    <div>
                      <p className="mb-2.5 flex items-center gap-1.5 text-[13px] font-bold text-success">
                        Strong skills <CheckCircle2 size={16} />
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {readinessData.strongSkills.map(skill => (
                          <span key={skill} className="rounded-full bg-[#eaf4ec] px-3 py-1.5 text-[12px] font-medium text-success">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="mb-2.5 flex items-center gap-1.5 text-[13px] font-bold text-[#f59e0b]">
                        Skill gaps <ShieldAlert size={16} />
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {readinessData.skillGaps.map(skill => (
                          <span key={skill} className="rounded-full bg-[#fff5ec] px-3 py-1.5 text-[12px] font-medium text-[#f59e0b]">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-center mt-2">
                  <ReadinessRing percentage={readinessData.score} size={140} strokeWidth={12} label="Readiness" />
                </div>
              </div>

              <Link href="/audit" className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6b0000] py-3.5 text-[15px] font-bold text-white shadow-md transition-transform hover:scale-[1.02]">
                Check my readiness <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Lower Section (Role Intelligence) */}
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="mt-8 flex flex-col gap-5">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end mb-2">
              <h2 className="font-display text-[22px] font-bold text-[#201d1d]">Demand relevant to your program</h2>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2.5">
                  <label className="text-[12px] font-medium text-text-secondary">Program</label>
                  <div className="relative">
                    <select className="appearance-none rounded-lg border border-black/[0.08] bg-white pl-3 pr-8 py-1.5 text-[13px] font-medium text-[#201d1d] outline-none hover:border-black/[0.15]">
                      <option>Bachelor of Accountancy</option>
                      <option>Computer Science</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <label className="text-[12px] font-medium text-text-secondary">PEZA Zone</label>
                  <div className="relative">
                    <select className="appearance-none rounded-lg border border-black/[0.08] bg-white pl-3 pr-8 py-1.5 text-[13px] font-medium text-[#201d1d] outline-none hover:border-black/[0.15]">
                      <option>All Zones</option>
                      <option>Laguna Technopark</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <label className="text-[12px] font-medium text-text-secondary">Demand Level</label>
                  <div className="relative">
                    <select className="appearance-none rounded-lg border border-black/[0.08] bg-white pl-3 pr-8 py-1.5 text-[13px] font-medium text-[#201d1d] outline-none hover:border-black/[0.15]">
                      <option>All Levels</option>
                      <option>High Demand</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {roleIntelligenceCards.map((role) => (
                <motion.div variants={fadeUpItem} key={role.role} className="flex flex-col rounded-[24px] border border-black/[0.04] bg-white p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#6b0000] text-white shadow-sm">
                      <Briefcase size={20} />
                    </div>
                    <div className="flex flex-col flex-1 mt-1">
                      <h3 className="font-bold text-[#201d1d] leading-snug text-[15px]">{role.role}</h3>
                      <p className="mt-1.5 text-[12px] text-[#6b0000] font-bold"><span className="text-[14px]">{role.opportunities}</span> opportunities analyzed</p>
                    </div>
                    <div className="flex flex-col items-center">
                      {/* Match Ring */}
                      <div className="relative h-[46px] w-[46px] flex items-center justify-center">
                        <svg className="absolute inset-0 h-full w-full rotate-[-90deg]" viewBox="0 0 36 36">
                          <path
                            className="stroke-[#6b0000]/10"
                            strokeWidth="3.5"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="stroke-[#6b0000]"
                            strokeWidth="3.5"
                            strokeDasharray={`${role.match}, 100`}
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="font-display text-[13px] font-bold text-[#201d1d]">{role.match}%</span>
                      </div>
                      <span className="text-[10px] font-medium text-text-secondary mt-1">Match</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 mb-5">
                    <p className="text-[11px] font-medium text-text-secondary mb-2.5">Top Skill Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {role.skillTags.map(tag => (
                        <span key={tag} className="rounded-md border border-black/[0.04] bg-[#faf9f8] px-2.5 py-1 text-[11px] font-medium text-[#201d1d]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between text-[11px] text-text-secondary pt-4 border-t border-black/[0.04]">
                    <span className={cn("flex items-center gap-1.5 font-bold", role.metadata.demand.includes('High') ? "text-success" : "text-[#f59e0b]")}>
                      <TrendingUp size={14} strokeWidth={2.5} /> {role.metadata.demand}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <MapPin size={14} /> {role.metadata.location}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Users size={14} /> {role.metadata.employers} employers
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
