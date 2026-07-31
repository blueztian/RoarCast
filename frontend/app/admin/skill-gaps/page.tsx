"use client";

import { useEffect, useState } from "react";
import { Focus, ShieldCheck, AlertCircle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SkillGapsPage() {
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
              Skill Gaps Analysis
            </h1>
            <p className="text-[15px] text-white/80">
              Identify where the local talent pool falls short of industry demands.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-white backdrop-blur-sm">
            <ShieldCheck size={16} className="text-[#f59e0b]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white">
              Verified Data
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Top Critical Gaps */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="rounded-[24px] bg-white p-6 shadow-sm border border-black/[0.04]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-bold text-[#201d1d]">Critical Shortages</h2>
              <button className="text-[13px] font-bold text-[#6b0000] hover:underline">View All Report</button>
            </div>
            
            <div className="flex flex-col gap-6">
              <GapCard skill="Industrial Automation" gap={65} demand={92} supply={27} trend="+12%" />
              <GapCard skill="Cloud Architecture" gap={58} demand={85} supply={27} trend="+8%" />
              <GapCard skill="Data Science (Entry)" gap={42} demand={78} supply={36} trend="+15%" />
            </div>
          </div>
        </div>

        {/* Right Column: Recommendations */}
        <div className="flex flex-col gap-6">
          <div className="rounded-[24px] bg-white p-6 shadow-sm border border-black/[0.04]">
            <div className="flex items-center gap-2 mb-4 text-[#f59e0b]">
              <AlertCircle size={20} />
              <h2 className="font-display text-lg font-bold text-[#201d1d]">Action Required</h2>
            </div>
            <p className="text-[14px] text-[#5e5a5a] mb-6">
              Based on the current trajectory, Santa Rosa will face a severe shortage of Automation Engineers within 18 months.
            </p>
            <div className="space-y-3">
              <Recommendation title="Update Curriculum" desc="Align syllabus with advanced PLC programming." />
              <Recommendation title="Partner Programs" desc="Initiate bootcamps with PEZA zone factories." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GapCard({ skill, gap, demand, supply, trend }: { skill: string, gap: number, demand: number, supply: number, trend: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-black/5 p-4 bg-[#f8f9fa] relative overflow-hidden group">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-[#201d1d]">{skill}</h3>
          <p className="text-[13px] text-[#5e5a5a]">Demand outpaces supply by {gap}%</p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[12px] font-bold text-red-700">
          <TrendingUp size={14} />
          {trend}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[12px] font-bold">
            <span className="text-[#5e5a5a]">Industry Demand</span>
            <span className="text-[#201d1d]">{demand}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-black/5 overflow-hidden">
            <div className="h-full rounded-full bg-[#f59e0b]" style={{ width: `${demand}%` }} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[12px] font-bold">
            <span className="text-[#5e5a5a]">Local Supply</span>
            <span className="text-[#201d1d]">{supply}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-black/5 overflow-hidden">
            <div className="h-full rounded-full bg-[#6b0000]" style={{ width: `${supply}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Recommendation({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="rounded-xl border border-black/5 p-3 hover:bg-[#fff5f5] hover:border-[#6b0000]/20 transition-colors cursor-pointer">
      <h4 className="font-bold text-[13px] text-[#6b0000]">{title}</h4>
      <p className="text-[12px] text-[#5e5a5a] mt-0.5">{desc}</p>
    </div>
  );
}
