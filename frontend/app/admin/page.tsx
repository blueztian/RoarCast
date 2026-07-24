"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, Map, Settings, UserCircle, Download,
  ShieldAlert, ShieldCheck, Users, Target, BookOpen, Building2, Landmark, LineChart, Focus, AlertCircle, ChevronDown, ListFilter,
  BarChart4, GraduationCap, MapPin, Briefcase, ArrowRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const gapData = [
  { skill: "SAP ERP", demand: 82, readiness: 31, gap: 51 },
  { skill: "PLC Programming", demand: 74, readiness: 29, gap: 45 },
  { skill: "Quality Assurance Systems", demand: 69, readiness: 36, gap: 33 },
  { skill: "Advanced Excel", demand: 72, readiness: 51, gap: 21 },
  { skill: "Power BI", demand: 58, readiness: 42, gap: 16 },
];

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex h-screen w-full bg-[#f8f9fa] font-sans overflow-hidden text-[#201d1d]">
      
      {/* ── Left Sidebar ──────────────────────────────────────────────────────── */}
      <aside className="flex w-[260px] flex-col border-r border-black/[0.06] bg-white">
        <div className="flex items-center gap-2 p-6 pb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#6b0000] text-white font-bold">
            R
          </div>
          <span className="font-display text-[18px] font-bold tracking-tight text-[#6b0000]">
            RoarCast
          </span>
          <span className="ml-1 rounded bg-black/[0.05] px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-[#7a7373] uppercase">
            Admin
          </span>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-4 pt-6">
          <NavItem icon={<LayoutDashboard size={18} />} label="Overview" />
          <NavItem icon={<LineChart size={18} />} label="Workforce Intelligence" active />
          <NavItem icon={<Focus size={18} />} label="Skill Gaps" />
          <NavItem icon={<Building2 size={18} />} label="Institutions" />
          <NavItem icon={<Map size={18} />} label="PEZA Zones" />
          <NavItem icon={<BarChart4 size={18} />} label="Reports" />
        </nav>

        <div className="flex flex-col gap-1 border-t border-black/[0.06] p-4">
          <NavItem icon={<Settings size={18} />} label="Settings" />
          <NavItem icon={<UserCircle size={18} />} label="Admin Profile" />
        </div>
      </aside>

      {/* ── Main Dashboard Content ────────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-[1200px] flex-col p-8 pb-16">
          
          {/* Header */}
          <header className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] p-8 shadow-sm">
            <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)' }} />
            <div className="relative z-10 flex items-end justify-between">
              <div className="flex flex-col gap-1.5">
                <h1 className="font-display text-[28px] font-bold leading-tight text-white">
                  Santa Rosa Workforce Intelligence
                </h1>
                <p className="text-[14.5px] text-white/80">
                  See where student readiness is diverging from current local industry demand.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-white backdrop-blur-sm">
                <ShieldCheck size={16} className="text-[#f59e0b]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-white">
                  Aggregated & Anonymized
                </span>
              </div>
            </div>
          </header>

          {/* Filter Bar */}
          <div className="flex items-center justify-between rounded-lg border border-black/[0.06] bg-white p-3 shadow-sm">
            <div className="flex items-center gap-4 text-[13px] font-medium text-[#5e5a5a]">
              <div className="flex items-center gap-1.5 rounded-md hover:bg-black/[0.02] p-1.5 cursor-pointer">
                <Building2 size={16} className="text-[#9c9595]" /> Institution: <span className="font-bold text-[#201d1d]">All Institutions</span> <ChevronDown size={14} className="text-[#9c9595]" />
              </div>
              <div className="h-4 w-px bg-black/[0.1]" />
              <div className="flex items-center gap-1.5 rounded-md hover:bg-black/[0.02] p-1.5 cursor-pointer">
                <GraduationCap size={16} className="text-[#9c9595]" /> Program: <span className="font-bold text-[#201d1d]">All Programs</span> <ChevronDown size={14} className="text-[#9c9595]" />
              </div>
              <div className="h-4 w-px bg-black/[0.1]" />
              <div className="flex items-center gap-1.5 rounded-md hover:bg-black/[0.02] p-1.5 cursor-pointer">
                <MapPin size={16} className="text-[#9c9595]" /> PEZA Zone: <span className="font-bold text-[#201d1d]">All Zones</span> <ChevronDown size={14} className="text-[#9c9595]" />
              </div>
              <div className="h-4 w-px bg-black/[0.1]" />
              <div className="flex items-center gap-1.5 rounded-md hover:bg-black/[0.02] p-1.5 cursor-pointer">
                <ListFilter size={16} className="text-[#9c9595]" /> Period: <span className="font-bold text-[#201d1d]">Last 90 Days</span>
              </div>
            </div>
            <button className="flex items-center gap-2 rounded-md border border-black/[0.08] bg-white px-3 py-1.5 text-[13px] font-bold text-[#201d1d] shadow-sm hover:bg-black/[0.02] transition-colors">
              <Download size={16} /> Export Report
            </button>
          </div>

          {/* Top Summary Metrics */}
          <div className="mt-6 flex gap-4">
            <MetricCard value="1,842" label="Students represented" sub="Aggregated audit results" />
            <MetricCard value="64" label="Skill Tags tracked" sub="Across monitored demand signals" />
            <MetricCard value="7" label="High-priority gaps" sub="Requiring closer attention" alert />
          </div>
          <div className="mt-2 flex justify-end">
            <span className="text-[10px] uppercase tracking-widest text-[#9c9595]">Prototype demo data</span>
          </div>

          {/* Main Analysis Section */}
          <div className="mt-4 flex gap-6">
            
            {/* Left: Horizontal Chart */}
            <div className="flex flex-1 flex-col rounded-xl border border-black/[0.06] bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-1 border-b border-black/[0.05] pb-4">
                <h2 className="font-display text-[20px] font-bold text-[#201d1d]">
                  Industry Demand vs Student Readiness
                </h2>
                <p className="text-[13px] text-[#5e5a5a]">
                  Skills where current employer demand is outpacing demonstrated student readiness.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-6">
                {gapData.map((item) => (
                  <div key={item.skill} className="flex flex-col gap-2">
                    <div className="flex items-end justify-between">
                      <span className="text-[14px] font-bold text-[#201d1d]">{item.skill}</span>
                      <span className="text-[13px] font-bold text-[#d97706]">GAP {item.gap} pts</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative flex flex-1 flex-col gap-1.5">
                        <div className="flex h-3 w-full items-center rounded-full bg-black/[0.03]">
                          <div className="h-full rounded-full bg-[#2d0000]" style={{ width: `${item.demand}%` }} />
                        </div>
                        <div className="flex h-3 w-full items-center rounded-full bg-black/[0.03]">
                          <div className="h-full rounded-full bg-[#f59e0b]" style={{ width: `${item.readiness}%` }} />
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col gap-1 text-[11px] font-medium text-[#7a7373]">
                        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#2d0000]" /> {item.demand}% Demand</span>
                        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#f59e0b]" /> {item.readiness}% Readiness</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Priority Insight */}
            <div className="flex w-[320px] shrink-0 flex-col rounded-xl border border-red-900/10 bg-[#fffbfb] shadow-sm">
              <div className="flex flex-col p-6 pb-5">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#6b0000]">
                  Highest Priority Gap
                </span>
                <h2 className="mt-1 font-display text-[28px] font-bold leading-tight text-[#201d1d]">
                  SAP ERP
                </h2>
                
                <div className="mt-4 flex flex-col gap-1">
                  <span className="font-display text-[32px] font-bold text-[#6b0000] leading-none">
                    51<span className="text-[20px]">-point gap</span>
                  </span>
                  <div className="flex items-center gap-2 text-[13px] font-medium text-[#201d1d]">
                    <Users size={16} className="text-[#6b0000]" /> 428 students <span className="text-[#7a7373]">currently show this skill gap</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 rounded-lg border border-black/[0.05] bg-white p-4">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-[#7a7373]">Industry demand</span>
                    <span className="font-bold text-[#201d1d]">HIGH (82%)</span>
                  </div>
                  <div className="h-px w-full bg-black/[0.05]" />
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-[#7a7373]">Student readiness</span>
                    <span className="font-bold text-[#201d1d]">31%</span>
                  </div>
                </div>

                <p className="mt-5 text-[13px] leading-relaxed text-[#5e5a5a]">
                  SAP ERP currently shows the widest observed difference between employer demand and student readiness.
                </p>
              </div>

              <div className="mt-auto p-4 pt-0">
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6b0000] py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#4a0000]">
                  Explore Skill Gap <ArrowRight size={16} />
                </button>
              </div>
            </div>

          </div>

          {/* Turn Data Into Action */}
          <div className="mt-8 flex flex-col gap-4">
            <h2 className="font-display text-[20px] font-bold text-[#201d1d]">
              From Insight to Action
            </h2>
            <div className="flex gap-6">
              
              {/* Left Panel - Academe */}
              <div className="flex flex-1 flex-col rounded-xl border border-black/[0.06] bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2.5 text-[#6b0000]">
                  <BookOpen size={20} strokeWidth={2} />
                  <span className="text-[11px] font-bold uppercase tracking-widest">
                    For Academe
                  </span>
                </div>
                <h3 className="mt-2 font-display text-[22px] font-bold text-[#201d1d]">
                  Curriculum Intelligence
                </h3>
                <p className="mt-1.5 text-[14px] text-[#5e5a5a]">
                  See which high-demand skills students are consistently missing before they enter the workforce.
                </p>

                <div className="mt-5 rounded-lg border border-black/[0.06] bg-[#faf9f8] p-4">
                  <h4 className="font-display text-[16px] font-bold text-[#201d1d]">
                    SAP ERP
                  </h4>
                  <div className="mt-1 flex items-center gap-1.5 text-[13px] text-[#6b0000] font-medium">
                    <AlertCircle size={14} /> 428 students show a gap
                  </div>
                  <div className="mt-4 flex flex-col gap-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7a7373]">
                      Programs most affected:
                    </span>
                    <ul className="mt-1 flex flex-col gap-1.5 text-[13px] font-medium text-[#201d1d]">
                      <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#d97706]" /> Accounting Information Systems</li>
                      <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#d97706]" /> Business Administration</li>
                      <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#d97706]" /> Financial Management</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  <button className="flex w-fit items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-4 py-2 text-[13px] font-bold text-[#201d1d] shadow-sm hover:bg-black/[0.02]">
                    View Curriculum Gaps
                  </button>
                  <p className="text-[12px] text-[#7a7373] italic">
                    Use gap patterns to guide curriculum reinforcement and supplemental learning.
                  </p>
                </div>
              </div>

              {/* Right Panel - PESO / City */}
              <div className="flex flex-1 flex-col rounded-xl border border-black/[0.06] bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2.5 text-[#1e3a8a]">
                  <Landmark size={20} strokeWidth={2} />
                  <span className="text-[11px] font-bold uppercase tracking-widest">
                    For PESO & City
                  </span>
                </div>
                <h3 className="mt-2 font-display text-[22px] font-bold text-[#201d1d]">
                  Targeted Youth Programs
                </h3>
                <p className="mt-1.5 text-[14px] text-[#5e5a5a]">
                  Identify which skill gaps affect the most young people and where targeted interventions may have the greatest reach.
                </p>

                <div className="mt-5 rounded-lg border border-black/[0.06] bg-[#f0f9ff] p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1e40af]">
                    Priority Intervention
                  </span>
                  <h4 className="mt-1 font-display text-[16px] font-bold text-[#201d1d]">
                    SAP ERP Foundations
                  </h4>
                  <div className="mt-1 flex items-center gap-1.5 text-[13px] text-[#1e3a8a] font-medium">
                    <Users size={14} /> 428 students potentially affected
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-[13px] text-[#5e5a5a]">
                    <span>Demand level:</span>
                    <span className="rounded bg-[#d97706] px-1.5 py-0.5 text-[11px] font-bold text-white">HIGH</span>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  <button className="flex w-fit items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-4 py-2 text-[13px] font-bold text-[#201d1d] shadow-sm hover:bg-black/[0.02]">
                    View Program Priorities
                  </button>
                  <p className="text-[12px] text-[#7a7373] italic">
                    Use workforce-gap evidence to support training and youth-program planning.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <footer className="mt-12 flex items-center justify-center border-t border-black/[0.05] pt-6 pb-4 text-center">
            <div className="flex items-center gap-2 text-[12px] text-[#9c9595]">
              <ShieldCheck size={14} /> Student insights are aggregated and anonymized before appearing in administrative views.
            </div>
          </footer>

        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link 
      href="#" 
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors",
        active ? "bg-[#fff5f5] text-[#6b0000] font-bold" : "text-[#5e5a5a] hover:bg-black/[0.02]"
      )}
    >
      {icon}
      {label}
    </Link>
  );
}

function MetricCard({ value, label, sub, alert = false }: { value: string; label: string; sub: string; alert?: boolean }) {
  return (
    <div className="flex flex-1 flex-col rounded-xl border border-black/[0.06] bg-white p-5 shadow-sm">
      <span className={cn(
        "font-display text-[32px] font-bold leading-none tracking-tight",
        alert ? "text-[#6b0000]" : "text-[#201d1d]"
      )}>
        {value}
      </span>
      <span className="mt-2 text-[13px] font-bold text-[#201d1d]">{label}</span>
      <span className="mt-1 text-[12px] text-[#7a7373]">{sub}</span>
    </div>
  );
}
