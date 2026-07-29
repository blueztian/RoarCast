"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, CheckCircle2, Circle, Lock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { coursesData } from "@/data/mockLearn";
import SignalBackground from "@/components/SignalBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// Every module shares this generic lesson shape — how far you've gotten
// within it is driven by the module's own status (Completed/Current/Locked/Upcoming).
const LESSON_TEMPLATE = ["Introduction", "Core Concepts", "Practice Activity", "Quiz"];

function getLessonsForModule(status: string) {
  const doneCount =
    status === "Completed" ? 4 : status === "Current" ? 2 : 0;

  return LESSON_TEMPLATE.map((title, i) => ({
    title,
    state:
      i < doneCount ? "done" : i === doneCount && status !== "Locked" && status !== "Upcoming" ? "current" : "locked",
  }));
}

export default function ModuleDetailPage({
  params,
}: {
  params: { courseId: string; moduleId: string };
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const course = coursesData.find((c) => c.id === params.courseId);
  if (!course || !course.curriculum) return notFound();

  const moduleIndex = course.curriculum.findIndex((m) => m.id === params.moduleId);
  const currentModule = course.curriculum[moduleIndex];
  if (!currentModule) return notFound();

  const lessons = getLessonsForModule(currentModule.status);
  const doneCount = lessons.filter((l) => l.state === "done").length;
  const nextModule = course.curriculum[moduleIndex + 1];

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      <header className="relative overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] rounded-b-[2.5rem]">
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex items-start gap-3 px-5 pt-12 pb-8">
          <Link
            href={`/learn/courses/${course.id}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#f59e0b]">
              {course.title} · Module {moduleIndex + 1} of {course.curriculum.length}
            </span>
            <h1 className="font-display text-[20px] font-bold text-white leading-tight">
              {currentModule.title}
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
        {/* ── Lesson progress ─────────────────────────────────────────────── */}
        <div className="flex flex-col rounded-[24px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7a7373]">
              Lesson Progress
            </span>
            <span className="text-[12.5px] font-bold text-[#6b0000]">
              {doneCount} of {lessons.length} completed
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#f0ede9]">
            <div
              className="h-full rounded-full bg-[#6b0000]"
              style={{ width: `${(doneCount / lessons.length) * 100}%` }}
            />
          </div>
        </div>

        {/* ── Lesson list ──────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {lessons.map((lesson) => (
            <div
              key={lesson.title}
              className={cn(
                "flex items-center gap-3 rounded-[18px] p-4 shadow-sm border",
                lesson.state === "current"
                  ? "border-[#f59e0b]/40 bg-[#fff8ee]"
                  : "border-black/[0.05] bg-white"
              )}
            >
              {lesson.state === "done" ? (
                <CheckCircle2 size={20} className="text-emerald-500" />
              ) : lesson.state === "current" ? (
                <Circle size={20} className="text-[#f59e0b]" strokeWidth={2.5} />
              ) : (
                <Lock size={16} className="text-[#9c9595]" />
              )}
              <span
                className={cn(
                  "text-[14px] font-bold",
                  lesson.state === "locked" ? "text-[#9c9595]" : "text-[#201d1d]"
                )}
              >
                {lesson.title}
              </span>
            </div>
          ))}
        </div>

        {/* ── Continue button ──────────────────────────────────────────────── */}
        <Link
          href={
            nextModule
              ? `/learn/courses/${course.id}/modules/${nextModule.id}`
              : `/learn/courses/${course.id}`
          }
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#6b0000] py-3.5 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-[#4a0000]"
        >
          Continue Learning <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  );
}
