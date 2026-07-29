"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, CheckCircle2, Lock, PlayCircle, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { coursesData } from "@/data/mockLearn";
import SignalBackground from "@/components/SignalBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const course = coursesData.find((c) => c.id === params.courseId);
  if (!course) return notFound();

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] rounded-b-[2.5rem]">
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex items-start gap-3 px-5 pt-12 pb-8">
          <Link href="/learn/courses" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#f59e0b]">
              Skill: {course.skill}
            </span>
            <h1 className="font-display text-[20px] font-bold text-white leading-tight">
              {course.title}
            </h1>
          </div>
        </div>
      </header>

      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="flex flex-col gap-5 px-4 pt-5"
      >
        {/* ── Why this matters ────────────────────────────────────────────────── */}
        <div className="flex flex-col rounded-[24px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <div className="mb-4 inline-flex items-center gap-2 self-start rounded-full bg-[#fff8ee] px-3 py-1.5 border border-[#f59e0b]/20">
            <div className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
            <span className="text-[11px] font-bold text-[#d97706]">{course.tag}</span>
          </div>

          <p className="text-[13px] font-medium leading-snug text-[#5e5a5a]">
            {course.reason}
          </p>

          <div className="my-4 h-px w-full bg-black/[0.05]" />

          <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-[#201d1d]">
            Why this matters for you
          </h2>
          
          <div className="mt-3 flex flex-col gap-3 text-[12.5px]">
            <div className="flex items-start justify-between">
              <span className="text-[#7a7373]">Target role</span>
              <span className="font-bold text-[#201d1d] max-w-[60%] text-right">{course.targetRole}</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-[#7a7373]">Current proficiency</span>
              <span className="font-bold text-[#201d1d]">{course.currentProficiency}</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-[#7a7373]">Target proficiency</span>
              <span className="font-bold text-[#6b0000]">{course.targetProficiency}</span>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-[#faf9f8] p-3.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7a7373]">
              Learning Outcome
            </span>
            <p className="mt-1 text-[12.5px] font-medium leading-snug text-[#201d1d]">
              {course.outcome}
            </p>
          </div>
        </div>

        {/* ── Squad Connection ────────────────────────────────────────────────── */}
        {course.squadConnection && (
          <div className="flex flex-col rounded-[24px] border border-[#6b0000]/15 bg-[#6b0000]/5 p-5">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b0000]">
                  You&apos;re learning this with
                </span>
                <h3 className="font-display text-[16px] font-bold text-[#201d1d]">
                  {course.squadConnection.name}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-[12px] text-[#7a7373]">
                  <Users size={14} /> {course.squadConnection.members} members
                </div>
              </div>
              <Link
                href={`/learn/squads/${course.squadConnection.squadId}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6b0000] text-white shadow-sm transition-transform active:scale-95"
              >
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
            </div>
          </div>
        )}

        {/* ── Curriculum ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col">
          <h2 className="mb-4 font-display text-[18px] font-bold text-[#201d1d]">
            Curriculum
          </h2>
          
          <div className="flex flex-col gap-3">
            {course.curriculum?.map((module, i) => {
              const isCompleted = module.status === "Completed";
              const isCurrent = module.status === "Current";
              const isLocked = module.status === "Locked";
              const isUpcoming = module.status === "Upcoming";
              
              return (
                <Link
                  href={`/learn/courses/${course.id}/modules/${module.id}`}
                  key={module.id}
                  className={cn(
                    "flex items-center justify-between rounded-[20px] p-4 shadow-sm border transition-colors",
                    isCurrent ? "border-[#f59e0b]/40 bg-[#fff8ee]" : "border-black/[0.04] bg-white",
                    isLocked ? "pointer-events-none opacity-70" : "hover:bg-[#faf9f8]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[2px]",
                      isCompleted ? "border-emerald-500 bg-emerald-50 text-emerald-500" :
                      isCurrent ? "border-[#f59e0b] bg-[#f59e0b] text-white" :
                      "border-[#e0dcd5] bg-[#faf9f8] text-[#9c9595]"
                    )}>
                      {isCompleted ? <CheckCircle2 size={20} /> :
                       isLocked ? <Lock size={16} /> :
                       <span className="text-[13px] font-bold">{i + 1}</span>}
                    </div>
                    
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#7a7373]">
                        Module {i + 1}
                      </span>
                      <span className={cn(
                        "text-[14px] font-bold",
                        (isLocked || isUpcoming) ? "text-[#9c9595]" : "text-[#201d1d]"
                      )}>
                        {module.title}
                      </span>
                    </div>
                  </div>

                  {isCurrent && (
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f59e0b] text-white shadow-sm">
                      <PlayCircle size={20} />
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
