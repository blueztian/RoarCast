"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, Briefcase, PlayCircle, Target, MessageCircle, MoreHorizontal, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { squadsData, activeCourse } from "@/data/mockLearn";
import SignalBackground from "@/components/SignalBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function SquadDetailPage({ params }: { params: { squadId: string } }) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("Activity");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const squad = squadsData.find((s) => s.id === params.squadId);
  if (!squad) return notFound();

  const isMember = squad.status === "Joined";

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] rounded-b-[2.5rem]">
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex items-start gap-3 px-5 pt-12 pb-8">
          <Link href="/learn/squads" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#f59e0b]">
              {squad.skillName}
            </span>
            <h1 className="font-display text-[20px] font-bold text-white leading-tight">
              {squad.name}
            </h1>
            <div className="mt-1 flex items-center gap-2 text-[11.5px] text-white/70">
              <span className="flex items-center gap-1">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {squad.members.activeThisWeek} active this week
              </span>
              <span>·</span>
              <span>{squad.members.total} members</span>
              {isJoined(squad.status) && (
                <>
                  <span>·</span>
                  <span className="font-bold text-white">Joined ✓</span>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Tabs ────────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 -mt-3 mx-4 flex w-auto overflow-x-auto rounded-[20px] bg-white px-4 no-scrollbar shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        {["Activity", "Discussion", "Roadmap", "Members"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "relative shrink-0 px-4 py-3 text-[13px] font-bold transition-colors",
              activeTab === tab ? "text-[#6b0000]" : "text-[#7a7373] hover:text-[#201d1d]"
            )}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-t-full bg-[#6b0000]" />
            )}
          </button>
        ))}
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="flex flex-col gap-4 px-4 pt-5"
      >
        {/* ── Top Summary Card ────────────────────────────────────────────────── */}
        <div className="flex flex-col rounded-[24px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#7a7373] mb-4">
            Squad Progress
          </h2>

          <div className="flex items-start gap-4">
            {/* Squad Progress Ring */}
            <div className="relative flex h-[68px] w-[68px] shrink-0 items-center justify-center">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="stroke-[#f0ede9]"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="stroke-[#f59e0b]"
                  strokeWidth="3.5"
                  strokeDasharray={`${squad.progress}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="flex flex-col items-center">
                <span className="font-display text-[16px] font-bold leading-none text-[#201d1d]">{squad.progress}%</span>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-center">
              <span className="text-[12.5px] font-bold text-[#201d1d]">
                Current Path: {squad.outcome}
              </span>
              
              {isJoined(squad.status) && (
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="text-[11px] font-medium text-[#7a7373]">Your Progress:</span>
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#f0ede9]">
                    <div className="h-full bg-[#6b0000]" style={{ width: `${activeCourse.progress}%` }} />
                  </div>
                  <span className="text-[11px] font-bold text-[#6b0000]">{activeCourse.progress}%</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-[#faf9f8] p-3.5">
            <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#7a7373]">
              <Target size={14} /> Next Milestone
            </span>
            <p className="mt-1 text-[13px] font-bold text-[#201d1d]">Complete Vendor Master Basics</p>
          </div>
        </div>

        {/* ── This Week's Mission ─────────────────────────────────────────────── */}
        {isJoined(squad.status) && (
          <div className="flex flex-col rounded-[24px] border border-[#f59e0b]/30 bg-[#fff8ee] p-5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#d97706]">
              This Week&apos;s Squad Goal
            </span>
            <h3 className="mt-1 font-display text-[16px] font-bold text-[#201d1d]">
              Complete: Vendor Master Basics
            </h3>
            
            <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-[#7a7373]">
              <span>3 of 5 members completed</span>
              <span className="font-bold text-[#d97706]">Ends: Friday</span>
            </div>
            
            <Link
              href={`/learn/courses/${activeCourse.id}`}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#f59e0b] py-3 text-[13px] font-bold text-white shadow-sm transition-colors hover:bg-[#d97706]"
            >
              Continue module <PlayCircle size={16} />
            </Link>
          </div>
        )}

        {/* ── Tab Content ─────────────────────────────────────────────────────── */}
        <div className="mt-2 flex flex-col pb-8">
          {activeTab === "Activity" && <ActivityTab activities={squad.activityFeed || []} />}
          {activeTab === "Discussion" && <DiscussionTab discussions={squad.discussions || []} />}
          {activeTab === "Roadmap" && <RoadmapTab roadmap={squad.roadmap || []} outcome={squad.outcome} />}
          {activeTab === "Members" && <MembersTab members={squad.allMembers || []} total={squad.members.total} />}
        </div>
      </motion.div>
    </div>
  );
}

function isJoined(status: string) {
  return status === "Joined";
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function ActivityTab({ activities }: { activities: any[] }) {
  if (!activities) return <p className="text-[13px] text-[#7a7373] text-center py-8">No activity yet.</p>;

  return (
    <div className="flex flex-col gap-4">
      {activities.map((act, i) => (
        <div key={i} className="flex items-start gap-3 rounded-[20px] bg-white p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0ede9] font-display font-bold text-[#201d1d]">
            {act.user.charAt(0)}
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[13px] text-[#201d1d]">
              <span className="font-bold">{act.user}</span> {act.action}
            </p>
            <p className="font-bold text-[#6b0000] text-[13.5px]">“{act.target}”</p>
            <span className="text-[11px] text-[#7a7373] mt-0.5">{act.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function DiscussionTab({ discussions }: { discussions: any[] }) {
  if (!discussions) return null;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        {discussions.map((msg, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f0ede9] font-display font-bold text-[#201d1d]">
              {msg.user.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-[11.5px] font-bold text-[#7a7373] mb-1">{msg.user}</span>
              <div className={cn(
                "rounded-[16px] p-3 text-[13px] leading-snug",
                msg.user === "Jana" ? "bg-[#f59e0b] text-white rounded-tr-sm" : "bg-white shadow-sm rounded-tl-sm text-[#201d1d]"
              )}>
                {msg.message}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 border-t border-black/[0.08] bg-[#f5f3f0] p-4 pb-8">
        <div className="flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-2 shadow-sm">
          <MessageCircle size={18} className="text-[#9c9595]" />
          <input type="text" placeholder="Ask your squad..." className="flex-1 bg-transparent py-1.5 text-[13px] outline-none" />
        </div>
      </div>
    </div>
  );
}

function RoadmapTab({ roadmap, outcome }: { roadmap: any[], outcome: string }) {
  if (!roadmap) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-0 relative">
        <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-[#f0ede9]" />
        
        {roadmap.map((step, i) => (
          <div key={i} className="flex items-start gap-4 relative py-3">
            <div className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] bg-white text-[12px] font-bold z-10",
              step.status === "completed" ? "border-emerald-500 text-emerald-600" :
              step.status === "current" ? "border-[#f59e0b] text-[#d97706]" :
              "border-[#e0dcd5] text-[#9c9595]"
            )}>
              {step.status === "completed" ? "✓" : step.week}
            </div>
            <div className="flex flex-col pt-1.5">
              <span className={cn(
                "text-[14px] font-bold",
                step.status === "upcoming" ? "text-[#7a7373]" : "text-[#201d1d]"
              )}>
                {step.title}
              </span>
              {step.status === "current" && (
                <span className="text-[11px] font-bold text-[#d97706] mt-0.5">← Current week</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center rounded-[20px] bg-white p-5 text-center shadow-sm border border-[#f59e0b]/20">
        <Award size={32} className="text-[#f59e0b] mb-2" strokeWidth={1.5} />
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#7a7373]">
          Credential Unlocked After Completion
        </span>
        <h3 className="mt-1 font-display text-[15px] font-bold text-[#201d1d]">{outcome}</h3>
      </div>
    </div>
  );
}

function MembersTab({ members, total }: { members: any[], total: number }) {
  if (!members) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <span className="text-[13px] font-bold text-[#201d1d]">
          {members.length} / {total} members
        </span>
        <p className="text-[12px] text-[#7a7373]">5 learners progressing together.</p>
      </div>

      <div className="flex flex-col gap-3">
        {members.map((m, i) => (
          <div key={i} className="flex items-center gap-3 rounded-[20px] bg-white p-4 shadow-sm">
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f0ede9] font-display text-[16px] font-bold text-[#201d1d]">
                {m.name.charAt(0)}
              </div>
              {m.active && (
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-[14px] font-bold text-[#201d1d]">
                {m.name} {m.name === "Jana" && <span className="text-[#7a7373] font-normal">(You)</span>}
              </span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-full flex-1 overflow-hidden rounded-full bg-[#f0ede9]">
                  <div className="h-full bg-[#f59e0b]" style={{ width: `${m.progress}%` }} />
                </div>
                <span className="text-[11px] font-bold text-[#7a7373]">{m.progress}%</span>
              </div>
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded-full text-[#9c9595] hover:bg-[#faf9f8]">
              <MoreHorizontal size={18} />
            </button>
          </div>
        ))}
      </div>

      {members.length < total && (
        <div className="mt-2 flex items-center justify-center rounded-[20px] border border-dashed border-[#e0dcd5] p-5">
          <span className="text-[13px] font-bold text-[#7a7373]">
            {total - members.length} spot available
          </span>
        </div>
      )}
    </div>
  );
}
