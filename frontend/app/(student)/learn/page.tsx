"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, ChevronRight, PlayCircle, Calendar, Award,
  Database, Layers, Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { janaProfile, activeCourse, squadsData, coursesData, exploreSkills } from "@/data/mockLearn";
import SignalBackground from "@/components/SignalBackground";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function LearnHubPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      {/* ── Red Header (Matches Explore) ──────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pt-12 pb-14 rounded-b-[2.5rem]">
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <BookOpen size={26} className="text-[#f59e0b]" strokeWidth={2} />
            <h1 className="font-display text-[24px] font-bold leading-tight tracking-tight text-white">
              Learn
            </h1>
          </div>
          <p className="text-[13.5px] text-white/80 ml-[36px]">
            Build the skills your target role needs.
          </p>
        </div>
      </header>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-4 -mt-8 flex flex-col gap-4 pb-32"
      >
        {/* ── 1. Co-Op Upskilling Squads (Prioritized) ────────────────────────── */}
        <motion.section variants={fadeUpItem} className="flex flex-col gap-3">
          <div className="mb-1 flex items-end justify-between px-1">
            <div className="flex flex-col gap-0.5">
              <h2 className="font-display text-[18px] font-bold text-[#201d1d]">
                Co-Op Upskilling Squads
              </h2>
              <p className="text-[12px] text-[#7a7373]">
                Build in-demand skills with peers.
              </p>
            </div>
            <Link href="/learn/squads" className="shrink-0 text-[12.5px] font-bold text-[#6b0000] hover:underline mb-0.5">
              View all
            </Link>
          </div>

          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 no-scrollbar">
            {squadsData.map((squad) => (
              <div key={squad.id} className="flex w-[280px] shrink-0 snap-center flex-col overflow-hidden rounded-[24px] border border-black/[0.05] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#6b0000]">
                        <Briefcase size={12} strokeWidth={2} />
                        {squad.skillName}
                      </span>
                      <h3 className="font-display text-[17px] font-bold text-[#201d1d]">{squad.name}</h3>
                    </div>
                  </div>
                  
                  <div className="mt-3 rounded-lg bg-[#faf9f8] p-3">
                    <span className="text-[11px] font-bold text-[#d97706]">{squad.label}</span>
                    <p className="mt-1 text-[11.5px] leading-snug text-[#5e5a5a]">{squad.reason}</p>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-b border-black/[0.05] pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1.5">
                        {[1,2,3,4].map(n => (
                          <div key={n} className="h-6 w-6 rounded-full border border-white bg-[#e0dcd5]" />
                        ))}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-[#201d1d]">{squad.members.total} members</span>
                        <span className="text-[10px] text-[#7a7373]">{squad.members.activeThisWeek} active this week</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-col gap-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7a7373]">
                      Current Goal
                    </span>
                    <p className="text-[12.5px] font-bold text-[#201d1d]">{squad.goal.text}</p>
                  </div>

                  {squad.status === "Joined" ? (
                    <div className="mt-3 flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-[#201d1d]">Squad progress</span>
                        <span className="font-bold text-[#d97706]">{squad.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#f0ede9]">
                        <div className="h-full bg-[#f59e0b]" style={{ width: `${squad.progress}%` }} />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-[#7a7373]">
                      <span className="flex items-center gap-1"><BookOpen size={12} /> {squad.learningFormat.modules} modules</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> Weekly check-ins</span>
                    </div>
                  )}
                </div>

                <div className="mt-auto flex flex-col gap-3 bg-[#faf9f8] p-4">
                  <div className="flex items-start gap-2">
                    <Award size={16} className="mt-0.5 shrink-0 text-[#f59e0b]" strokeWidth={2} />
                    <div className="flex flex-col">
                      <span className="text-[10.5px] font-medium text-[#7a7373]">Outcome</span>
                      <span className="text-[11.5px] font-bold text-[#201d1d]">{squad.outcome}</span>
                    </div>
                  </div>

                  <Link
                    href={`/learn/squads/${squad.id}`}
                    className={cn(
                      "flex w-full items-center justify-center rounded-full py-2 text-[12.5px] font-bold transition-colors",
                      squad.status === "Joined" ? "bg-[#f59e0b] text-white" :
                      squad.status === "Squad full" ? "bg-[#e0dcd5] text-[#7a7373]" :
                      "bg-[#6b0000] text-white"
                    )}
                  >
                    {squad.status === "Joined" ? "Continue with squad" :
                     squad.status === "Squad full" ? "Join waitlist" :
                     squad.status === "View squad" ? "View squad" :
                     "Join squad"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── 2. Your Upskilling Roadmap ──────────────────────────────────────── */}
        <motion.section variants={fadeUpItem} className="flex flex-col rounded-[24px] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col border-b border-black/[0.06] pb-4">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#7a7373]">
              Your Upskilling Roadmap
            </h2>
            <p className="mt-1.5 font-display text-[15px] font-bold text-[#201d1d]">
              {janaProfile.targetRole}
            </p>
            
            <div className="mt-3 flex items-center gap-4">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="stroke-[#f0ede9]"
                    strokeWidth="4"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="stroke-[#f59e0b]"
                    strokeWidth="4"
                    strokeDasharray={`${janaProfile.targetReadiness}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="font-display text-[14px] font-bold text-[#201d1d]">
                  {janaProfile.targetReadiness}%
                </span>
              </div>
              <p className="text-[12.5px] leading-snug text-[#5e5a5a]">
                Strengthen 2 priority skills to move closer to your target role.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-3">
            {janaProfile.priorityGaps.map((gap, i) => (
              <div key={gap.id} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fcead9] text-[#f59e0b]">
                  {i === 0 ? <Database size={16} strokeWidth={2} /> : <Layers size={16} strokeWidth={2} />}
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-[13px] font-bold text-[#201d1d]">{gap.name}</span>
                  <span className="text-[11px] font-medium text-[#7a7373]">{gap.status}</span>
                </div>
                <span className="rounded-full bg-[#6b0000] px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
                  {gap.priority}
                </span>
              </div>
            ))}
          </div>

          <button className="mt-3 w-full rounded-xl bg-[#faf9f8] py-2.5 text-[12.5px] font-bold text-[#201d1d] transition-colors hover:bg-[#f0ede9]">
            View full roadmap
          </button>
        </motion.section>

        {/* ── 3. Continue Learning ────────────────────────────────────────────── */}
        <motion.section variants={fadeUpItem}>
          <div className="flex flex-col rounded-[24px] border border-[#f59e0b]/20 bg-[#fff8ee] p-4 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#d97706]">
              Continue Learning
            </span>
            <div className="mt-2 flex items-start gap-4">
              <div className="flex flex-1 flex-col">
                <h3 className="font-display text-[16px] font-bold text-[#201d1d]">
                  {activeCourse.title}
                </h3>
                <p className="mt-0.5 text-[11.5px] font-medium text-[#7a7373]">
                  Skill: {activeCourse.skill}
                </p>
                <p className="mt-2.5 text-[12.5px] font-bold text-[#201d1d]">
                  {activeCourse.currentLesson}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-1.5 w-full flex-1 overflow-hidden rounded-full bg-[#f59e0b]/20">
                    <div className="h-full bg-[#f59e0b]" style={{ width: `${activeCourse.progress}%` }} />
                  </div>
                  <span className="text-[11px] font-bold text-[#d97706]">{activeCourse.progress}%</span>
                </div>
                <p className="mt-1 text-[11px] text-[#7a7373]">
                  Module {activeCourse.currentModule} of {activeCourse.totalModules} · {activeCourse.timeRemaining}
                </p>
              </div>
              <Link
                href={`/learn/courses/${activeCourse.id}`}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f59e0b] text-white shadow-sm transition-transform active:scale-95"
              >
                <PlayCircle size={22} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </motion.section>

        {/* ── 4. Recommended for your skill gaps ──────────────────────────────── */}
        <motion.section variants={fadeUpItem} className="flex flex-col gap-3">
          <div className="flex items-end justify-between px-1">
            <h2 className="font-display text-[18px] font-bold text-[#201d1d]">
              Recommended for your skill gaps
            </h2>
            <Link href="/learn/courses" className="shrink-0 text-[12.5px] font-bold text-[#6b0000] hover:underline mb-0.5">
              View all
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {coursesData.slice(0, 2).map((course) => (
              <Link href={`/learn/courses/${course.id}`} key={course.id} className="flex flex-col rounded-[20px] bg-white p-4 shadow-sm border border-black/[0.04]">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <h3 className="font-display text-[15px] font-bold text-[#201d1d]">{course.title}</h3>
                    <p className="mt-0.5 text-[11.5px] text-[#7a7373]">Skill: {course.skill}</p>
                  </div>
                  <Award size={20} className="text-[#e0dcd5]" strokeWidth={1.5} />
                </div>
                <div className="mt-3 rounded-lg bg-[#fff8ee] px-3 py-2">
                  <span className="text-[11px] font-bold text-[#d97706]">Recommended because {course.skill} is a priority gap for your target role.</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-[#7a7373]">
                  <span>{course.modulesCount} modules</span>
                  {course.progress > 0 ? (
                    <span className="font-bold text-[#d97706]">{course.progress}% complete</span>
                  ) : (
                    <span>Not started</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* ── 5. Explore more skills ──────────────────────────────────────────── */}
        <motion.section variants={fadeUpItem} className="flex flex-col gap-3">
          <h2 className="font-display text-[18px] font-bold text-[#201d1d] px-1">
            Explore more skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {exploreSkills.map((skill) => (
              <span key={skill} className="rounded-full border border-black/[0.06] bg-white px-3 py-1.5 text-[11.5px] font-medium text-[#201d1d] shadow-sm">
                {skill}
              </span>
            ))}
          </div>
          <button className="mt-1 flex items-center justify-center gap-1 rounded-xl bg-white py-2.5 text-[12.5px] font-bold text-[#6b0000] shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-colors hover:bg-[#faf9f8]">
            Browse all learning paths <ChevronRight size={16} />
          </button>
        </motion.section>
      </motion.div>
    </div>
  );
}
