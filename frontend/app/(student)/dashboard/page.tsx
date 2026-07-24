"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, MapPin, Building2, Clock, CheckCircle2, ShieldAlert, TrendingUp, Briefcase, ArrowRight, Users } from "lucide-react";
import SignalBackground from "@/components/SignalBackground";
import ReadinessRing from "@/components/ReadinessRing";

// --- Mock Data Structures ---
const industryPulseStats = {
  opportunities: "1,284",
  employers: "132",
  zones: "5",
  updated: "2 hours ago"
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
  skillGaps: ["SAP ERP", "ERP Systems"]
};

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
    <div className="flex flex-col w-full bg-background min-h-screen pb-16">
      {/* Maroon Hero Header */}
      <section className="relative overflow-hidden bg-brand-primary px-6 py-12 md:py-16 rounded-bl-3xl">
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl items-start justify-between">
          <div className="space-y-1.5">
            <h1 className="font-display text-3xl font-bold tracking-tight text-white md:text-[34px]">
              Good morning, Jana.
            </h1>
            <p className="text-[15px] font-medium text-white/90 md:text-base">
              Here&apos;s what Santa Rosa employers are looking for right now.
            </p>
          </div>
          <button aria-label="Notifications" className="relative mt-1 rounded-full p-2 transition-colors hover:bg-white/10">
            <Bell size={22} className="text-white" strokeWidth={2} />
            <span className="absolute right-2.5 top-2 h-2.5 w-2.5 rounded-full border-2 border-brand-primary bg-brand-signal" />
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="relative z-20 mx-auto w-full max-w-6xl -mt-6 px-4 sm:px-6 md:-mt-8">
        
        {/* Industry Pulse Summary Panel */}
        <div className="mb-8 flex flex-col items-start gap-6 rounded-2xl border border-border-subtle bg-surface p-6 shadow-card md:flex-row md:items-center md:gap-8">
          <div className="flex shrink-0 flex-col gap-2 pr-6 md:border-r md:border-border-subtle">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-[17px] font-bold text-ink">Santa Rosa Industry Pulse</h2>
              <span className="flex items-center gap-1.5 rounded-full bg-brand-signal/15 px-2.5 py-0.5 text-xs font-semibold text-roar-amber">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-signal animate-pulse" />
                Live demand intelligence
              </span>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-y-6 md:grid-cols-4 md:gap-x-8">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                <TrendingUp size={14} className="text-brand-primary" /> Opportunities analyzed
              </span>
              <span className="font-display text-[22px] font-bold text-ink leading-none">{industryPulseStats.opportunities}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                <Building2 size={14} className="text-brand-primary" /> Employers represented
              </span>
              <span className="font-display text-[22px] font-bold text-ink leading-none">{industryPulseStats.employers}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                <MapPin size={14} className="text-brand-primary" /> PEZA zones monitored
              </span>
              <span className="font-display text-[22px] font-bold text-ink leading-none">{industryPulseStats.zones}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                <Clock size={14} className="text-brand-signal" /> Updated
              </span>
              <span className="font-display text-base font-bold text-brand-primary pt-1">{industryPulseStats.updated}</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* LEFT: Skills gaining demand */}
          <div className="flex flex-col rounded-2xl border border-border-subtle bg-surface p-7 shadow-sm lg:col-span-2">
            <div className="mb-8">
              <h3 className="font-display text-lg font-bold text-ink">Skills gaining demand</h3>
              <p className="mt-1 text-[13px] text-text-secondary">Based on skills appearing across recently analyzed local opportunities.</p>
            </div>
            
            <div className="flex flex-col gap-6">
              {skillsDemandData.map((skill) => (
                <div key={skill.rank} className="flex items-center gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-paper-dim text-[13px] font-semibold text-text-secondary">
                    {skill.rank}
                  </div>
                  <div className="w-32 shrink-0 font-semibold text-ink md:w-44 text-[15px]">{skill.name}</div>
                  
                  {/* Sparkline approximation */}
                  <svg className="hidden h-6 w-16 shrink-0 text-brand-signal md:block" viewBox="0 0 64 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 20 L 16 12 L 28 16 L 44 4 L 60 8" />
                  </svg>

                  <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-paper-dim">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.progress}%` }}
                      transition={{ duration: 1, delay: 0.1 * skill.rank }}
                      className="h-full rounded-full bg-brand-primary"
                    />
                  </div>
                  <div className="w-12 shrink-0 text-right text-[15px] font-semibold text-success flex items-center justify-end gap-1">
                    <TrendingUp size={12} strokeWidth={3} />
                    {skill.growth}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Your readiness */}
          <div className="flex flex-col rounded-2xl border border-border-subtle bg-surface p-7 shadow-sm">
            <h3 className="font-display text-lg font-bold text-ink">Your readiness</h3>
            <div className="mt-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">Target role</p>
              <p className="font-semibold text-ink leading-tight mt-0.5">{readinessData.targetRole}</p>
            </div>

            <div className="my-8 flex items-center justify-center">
               <ReadinessRing percentage={readinessData.score} size={150} strokeWidth={12} label="Readiness" />
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <p className="mb-2.5 flex items-center gap-1.5 text-[13px] font-semibold text-success">
                  Strong skills <CheckCircle2 size={14} />
                </p>
                <div className="flex flex-wrap gap-2">
                  {readinessData.strongSkills.map(skill => (
                    <span key={skill} className="rounded-full bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="mb-2.5 flex items-center gap-1.5 text-[13px] font-semibold text-roar-amber">
                  Skill gaps <ShieldAlert size={14} />
                </p>
                <div className="flex flex-wrap gap-2">
                  {readinessData.skillGaps.map(skill => (
                    <span key={skill} className="rounded-full bg-brand-signal/15 px-3 py-1.5 text-xs font-semibold text-roar-amber">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/audit" className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary py-3.5 text-[15px] font-semibold text-white shadow-md transition-transform hover:scale-[1.02] hover:bg-brand-primary-dark">
              Check my readiness <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Lower Section */}
        <div className="mt-14 flex flex-col gap-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="font-display text-[22px] font-bold text-ink">Demand relevant to your program</h2>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Program</label>
                <select className="rounded-lg border border-border-subtle bg-surface px-3 py-2 text-[13px] font-medium text-ink outline-none focus:border-brand-primary">
                  <option>Bachelor of Accountancy</option>
                  <option>Computer Science</option>
                </select>
              </div>
              <div className="flex items-center gap-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">PEZA Zone</label>
                <select className="rounded-lg border border-border-subtle bg-surface px-3 py-2 text-[13px] font-medium text-ink outline-none focus:border-brand-primary">
                  <option>All Zones</option>
                  <option>Laguna Technopark</option>
                </select>
              </div>
              <div className="flex items-center gap-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Demand Level</label>
                <select className="rounded-lg border border-border-subtle bg-surface px-3 py-2 text-[13px] font-medium text-ink outline-none focus:border-brand-primary">
                  <option>All Levels</option>
                  <option>High Demand</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {roleIntelligenceCards.map((role) => (
              <div key={role.role} className="flex flex-col rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm hover:border-brand-primary/30 hover:shadow-capsule transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-primary/5 text-brand-primary">
                    <Briefcase size={20} />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-display text-xl font-bold text-ink">{role.match}%</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-text-secondary">Match</span>
                  </div>
                </div>
                
                <h3 className="mt-5 font-semibold text-ink leading-tight text-[15px]">{role.role}</h3>
                <p className="mt-1 text-[13px] text-brand-primary font-semibold">{role.opportunities} opportunities analyzed</p>

                <div className="mt-6 mb-6">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary mb-2.5">Top Skill Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {role.skillTags.map(tag => (
                      <span key={tag} className="rounded-md border border-border-subtle bg-paper-dim px-2.5 py-1 text-[11px] font-semibold text-ink-soft">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-text-secondary">
                  <span className="flex items-center gap-1.5 text-roar-amber font-semibold">
                    <TrendingUp size={12} strokeWidth={2.5} /> {role.metadata.demand}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <MapPin size={12} /> {role.metadata.location}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Users size={12} /> {role.metadata.employers} employers
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
