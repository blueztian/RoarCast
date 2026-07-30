"use client";

import { useEffect, useState } from "react";
import { Users, Building2, Activity, ArrowUpRight, TrendingUp, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OverviewPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex w-full flex-col p-8 pb-16">
      
      {/* Header */}
      <header className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] p-8 shadow-sm">
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)' }} />
        <div className="relative z-10 flex items-end justify-between">
          <div className="flex flex-col gap-1.5">
            <h1 className="font-display text-[28px] font-bold leading-tight text-white">
              System Overview
            </h1>
            <p className="text-[14.5px] text-white/80">
              High-level metrics for the RoarCast ecosystem in Santa Rosa.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-white backdrop-blur-sm">
            <Activity size={16} className="text-emerald-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white">
              System Operational
            </span>
          </div>
        </div>
      </header>

      {/* Top Summary Metrics */}
      <div className="mt-2 flex gap-4">
        <MetricCard value="12,450" label="Total Active Students" sub="+14% this month" icon={<Users size={24} className="text-[#6b0000]" />} />
        <MetricCard value="48" label="Partner Institutions" sub="3 new this quarter" icon={<Building2 size={24} className="text-[#6b0000]" />} />
        <MetricCard value="1.2M" label="Data Points Processed" sub="Industry demand signals" icon={<TrendingUp size={24} className="text-[#6b0000]" />} />
      </div>

      {/* Main Analysis Section */}
      <div className="mt-8 flex gap-6">
        {/* Left: Recent Activity */}
        <div className="flex flex-1 flex-col rounded-xl border border-black/[0.06] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-1 border-b border-black/[0.05] pb-4">
            <h2 className="font-display text-[20px] font-bold text-[#201d1d]">
              Recent Activity Highlights
            </h2>
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <ActivityItem title="New Institution Onboarded" time="2 hours ago" desc="Santa Rosa Science and Technology University has joined the network." />
            <ActivityItem title="Data Sync Completed" time="5 hours ago" desc="Successfully synced latest job posting data from local PEZA zones." />
            <ActivityItem title="Skill Gap Alert" time="1 day ago" desc="Significant drop in student readiness for 'Data Analysis' identified." />
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex w-[320px] shrink-0 flex-col rounded-xl border border-black/[0.06] bg-white shadow-sm p-6">
           <h2 className="font-display text-[20px] font-bold text-[#201d1d] mb-4">
              Quick Actions
            </h2>
            <div className="flex flex-col gap-3">
              <button className="flex items-center justify-between rounded-lg border border-black/[0.08] p-3 text-[13px] font-bold text-[#201d1d] hover:bg-black/[0.02]">
                Generate Monthly Report <ArrowUpRight size={16} className="text-[#6b0000]" />
              </button>
              <button className="flex items-center justify-between rounded-lg border border-black/[0.08] p-3 text-[13px] font-bold text-[#201d1d] hover:bg-black/[0.02]">
                Invite New Admin <ArrowUpRight size={16} className="text-[#6b0000]" />
              </button>
              <button className="flex items-center justify-between rounded-lg border border-black/[0.08] p-3 text-[13px] font-bold text-[#201d1d] hover:bg-black/[0.02]">
                Review Pending Approvals <ArrowUpRight size={16} className="text-[#6b0000]" />
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ value, label, sub, icon }: { value: string; label: string; sub: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col rounded-xl border border-black/[0.06] bg-white p-5 shadow-sm relative overflow-hidden">
      <div className="absolute top-5 right-5 opacity-20">
        {icon}
      </div>
      <span className="font-display text-[32px] font-bold leading-none tracking-tight text-[#201d1d]">
        {value}
      </span>
      <span className="mt-2 text-[13px] font-bold text-[#201d1d]">{label}</span>
      <span className="mt-1 text-[12px] text-[#7a7373]">{sub}</span>
    </div>
  );
}

function ActivityItem({ title, time, desc }: { title: string, time: string, desc: string }) {
  return (
    <div className="flex items-start gap-3 border-l-2 border-[#6b0000]/20 pl-4 pb-2">
      <div className="flex flex-col">
        <div className="flex items-center justify-between w-full">
           <span className="text-[14px] font-bold text-[#201d1d]">{title}</span>
           <span className="text-[12px] text-[#7a7373]">{time}</span>
        </div>
        <span className="text-[13px] text-[#5e5a5a] mt-1">{desc}</span>
      </div>
    </div>
  )
}
