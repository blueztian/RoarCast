"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, Award, PlayCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { coursesData } from "@/data/mockLearn";
import SignalBackground from "@/components/SignalBackground";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const TABS = ["All", "Completed", "In Progress"];

export default function CoursesListPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      {/* â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <header className="fixed inset-x-0 top-0 z-30 flex flex-col justify-end overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pb-5 rounded-b-[2.5rem] shadow-sm transition-all" style={{ height: 90 }}>
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex items-center gap-3">
          <Link href="/learn" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <h1 className="font-display text-[22px] font-bold text-white">Courses</h1>
            <p className="text-[12px] text-white/70">Learning paths matched to the skills employers need.</p>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[90px] shrink-0" aria-hidden="true" />

      <div className="sticky top-[90px] z-20 mx-4 mt-3 mb-2 flex rounded-full bg-white p-1 shadow-sm border border-black/[0.05]">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 rounded-full py-2.5 px-2 text-[13.5px] sm:text-[15px] font-bold capitalize transition-colors leading-tight flex items-center justify-center text-center",
              activeTab === tab ? "bg-[#6b0000] text-white" : "text-[#7a7373] hover:bg-[#faf9f8]"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-4 px-4 pt-2"
      >
        {coursesData.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </motion.div>
    </div>
  );
}

function CourseCard({ course }: { course: any }) {
  const isInProgress = course.progress > 0 && course.progress < 100;

  return (
    <motion.div variants={fadeUp} className="flex flex-col overflow-hidden rounded-[24px] border border-black/[0.05] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col p-5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-[12.5px] font-bold uppercase tracking-wider text-[#7a7373]">
              Skill: {course.skill}
            </span>
            <h3 className="font-display text-[18.5px] font-bold text-[#201d1d]">{course.title}</h3>
          </div>
        </div>

        <div className="mt-3 rounded-lg bg-[#fff8ee] p-3">
          <span className="text-[13px] font-bold text-[#d97706]">{course.tag}</span>
          <p className="mt-1 text-[13px] leading-snug text-[#5e5a5a]">{course.reason}</p>
        </div>

        <div className="mt-4 flex flex-col gap-1.5 border-b border-black/[0.05] pb-4 text-[13.5px] text-[#7a7373]">
          <span className="flex items-center gap-1.5"><PlayCircle size={14} /> {course.modulesCount} modules</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> {course.timeEstimate}</span>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center justify-between text-[12.5px]">
            <span className="font-bold text-[#201d1d]">Progress</span>
            {course.progress > 0 ? (
              <span className="font-bold text-[#d97706]">{course.progress}%</span>
            ) : (
              <span className="font-bold text-[#9c9595]">Not started</span>
            )}
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#f0ede9]">
            <div className="h-full bg-[#f59e0b]" style={{ width: `${course.progress}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-4 bg-[#faf9f8] p-5">
        <div className="flex items-start gap-2 max-w-[60%]">
          <Award size={18} className="mt-0.5 shrink-0 text-[#e0dcd5]" strokeWidth={2} />
          <div className="flex flex-col">
            <span className="text-[11.5px] font-medium uppercase tracking-wider text-[#7a7373]">Credential</span>
            <span className="text-[12.5px] font-bold text-[#201d1d] leading-tight">{course.credential}</span>
          </div>
        </div>

        <Link
          href={`/learn/courses/${course.id}`}
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full px-4 py-2 text-[14px] font-bold transition-colors",
            isInProgress ? "bg-[#f59e0b] text-white" : "bg-[#201d1d] text-white"
          )}
        >
          {isInProgress ? "Continue" : "Start"}
        </Link>
      </div>
    </motion.div>
  );
}
