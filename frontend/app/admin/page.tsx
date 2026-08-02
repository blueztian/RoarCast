"use client";

import { useEffect, useState } from "react";
import { Users, Building2, Activity, ArrowUpRight, TrendingUp, ShieldCheck, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OverviewPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex w-full flex-col p-8 pb-16">
      
      {/* Header */}
      <header className="relative mb-8 overflow-hidden rounded-[24px] bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] p-5 shadow-sm">
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)' }} />
        <div className="relative z-10 flex items-end justify-between">
          <div className="flex flex-col gap-1.5">
            <h1 className="font-display text-[22px] font-bold leading-tight text-white">
              System Overview
            </h1>
            <p className="text-[15px] text-white/80">
              High-level metrics for the RoarCast ecosystem in Santa Rosa.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-white backdrop-blur-sm">
            <ShieldCheck size={16} className="text-[#f59e0b]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white">
              Sample Data
            </span>
          </div>
        </div>
      </header>

      {/* Main Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard 
          title="Total Active Students" 
          value="12,450" 
          trend="+14%" 
          icon={<Users size={24} className="text-[#6b0000]" />}
          subtitle="Across all partner institutions"
        />
        <MetricCard 
          title="Industry Partners" 
          value="84" 
          trend="+5%" 
          icon={<Briefcase size={24} className="text-[#6b0000]" />}
          subtitle="Sample employer demand dataset"
        />
        <MetricCard 
          title="Average Readiness Score" 
          value="68%" 
          trend="+2%" 
          icon={<Activity size={24} className="text-[#6b0000]" />}
          subtitle="Based on recent assessments"
        />
      </div>
      
      {/* Secondary Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-[24px] bg-white p-6 shadow-sm border border-black/[0.04]">
          <h2 className="font-display text-lg font-bold text-[#201d1d] mb-4">Top Growing Skills</h2>
          <div className="space-y-4">
            <SkillRow skill="Data Analysis" demand={92} />
            <SkillRow skill="React Development" demand={88} />
            <SkillRow skill="Digital Marketing" demand={76} />
            <SkillRow skill="Cybersecurity" demand={65} />
          </div>
        </div>
        
        <div className="rounded-[24px] bg-white p-6 shadow-sm border border-black/[0.04]">
          <h2 className="font-display text-lg font-bold text-[#201d1d] mb-4">Recent Institutional Activity</h2>
          <div className="space-y-4">
            <ActivityRow institution="Polytechnic University of the Philippines" action="Uploaded 500 new student profiles" time="2h ago" />
            <ActivityRow institution="STI College Santa Rosa" action="Updated curriculum mapping for IT" time="5h ago" />
            <ActivityRow institution="Dominican College" action="Launched new RoarCast pilot program" time="1d ago" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon, subtitle }: { title: string, value: string, trend: string, icon: React.ReactNode, subtitle: string }) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="rounded-[24px] bg-white p-6 shadow-sm border border-black/[0.04] flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff5f5]">
          {icon}
        </div>
        <div className={cn("flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-bold", isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
          {isPositive ? <ArrowUpRight size={14} /> : <TrendingUp size={14} className="rotate-180" />}
          {trend}
        </div>
      </div>
      <h3 className="text-[14px] font-medium text-[#5e5a5a]">{title}</h3>
      <div className="font-display text-[32px] font-bold tracking-tight text-[#201d1d] mt-1">{value}</div>
      <p className="text-[13px] text-[#5e5a5a]/70 mt-2">{subtitle}</p>
    </div>
  );
}

function SkillRow({ skill, demand }: { skill: string, demand: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[14px] font-medium text-[#201d1d]">{skill}</span>
      <div className="flex items-center gap-3 w-1/2">
        <div className="h-2 flex-1 rounded-full bg-black/5 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-[#f59e0b] to-[#ea580c]" style={{ width: `${demand}%` }} />
        </div>
        <span className="text-[13px] font-bold text-[#5e5a5a] w-8 text-right">{demand}%</span>
      </div>
    </div>
  );
}

function ActivityRow({ institution, action, time }: { institution: string, action: string, time: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f8f9fa] border border-black/5">
        <Building2 size={16} className="text-[#5e5a5a]" />
      </div>
      <div className="flex flex-col">
        <span className="text-[14px] font-bold text-[#201d1d]">{institution}</span>
        <span className="text-[13px] text-[#5e5a5a]">{action}</span>
        <span className="text-[12px] text-black/40 mt-0.5">{time}</span>
      </div>
    </div>
  );
}
