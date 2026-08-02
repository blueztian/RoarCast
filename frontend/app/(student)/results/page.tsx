"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Info, ArrowRight, LayoutDashboard, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import ReadinessRing from "@/components/ReadinessRing";
import SkillTag from "@/components/SkillTag";
import DemandBadge from "@/components/DemandBadge";
import SkillGapCard from "@/components/SkillGapCard";
import SkillExplanationDrawer from "@/components/SkillExplanationDrawer";
import { readinessSummary, priorityGap, type SkillResult } from "@/data/mockSkills";
import { demoRepository } from "@/lib/demoRepository";
import type { ReadinessSnapshot } from "@/lib/storageTypes";

export default function ResultsPage() {
  const router = useRouter();
  const [snapshot, setSnapshot] = useState<ReadinessSnapshot | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isSampleMode, setIsSampleMode] = useState(false);
  const [explaining, setExplaining] = useState<SkillResult | null>(null);

  useEffect(() => {
    // 2.4 Route prerequisite check
    const current = demoRepository.getReadinessSnapshot();
    if (!current) {
      router.replace("/audit");
      return;
    }
    const profile = demoRepository.getStudentProfile();
    if (!profile) {
      router.replace("/signup");
      return;
    }

    demoRepository.markAuditComplete();
    setSnapshot(current);
    setIsSampleMode(demoRepository.isSampleMode());
    setIsChecking(false);
  }, [router]);

  if (isChecking || !snapshot) {
    return (
      <div className="flex min-h-[70dvh] items-center justify-center">
        <div className="text-ink-soft font-mono text-sm animate-pulse">Loading diagnostic results...</div>
      </div>
    );
  }

  const groups: { key: keyof typeof readinessSummary; title: string; note: string }[] = [
    { key: "ready", title: "Ready & Strengths", note: "Already meets what employers expect" },
    { key: "strengthen", title: "Strengthen", note: "Solid start, worth sharpening" },
    { key: "priority", title: "Priority Gap", note: "Fastest way to raise your score" },
  ];

  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 pt-12 sm:pt-20 sm:pb-32">
      {isSampleMode && (
        <div className="mb-6 flex justify-center">
          <span className="rounded-md bg-amber-100 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide text-[#b45309]">
            Sample persona mode
          </span>
        </div>
      )}
      <div className="mb-14 flex flex-col items-center gap-6 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-bold text-[#b45309]">
          <Sparkles size={14} /> Diagnostic Status: {snapshot.label}
        </span>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="my-2"
        >
          <ReadinessRing percentage={snapshot.score} />
        </motion.div>

        <div>
          <h1 className="text-balance font-display text-3xl font-semibold text-ink sm:text-4xl">
            Your industry readiness is <span className="font-bold text-[#6b0000]">{snapshot.score}%</span>.
          </h1>
          <p className="mx-auto mt-2 max-w-md text-balance text-[15px] font-medium text-[#201d1d]">
            Target Pathway: {snapshot.targetRole}
          </p>
          <p className="mx-auto mt-2 max-w-md text-balance text-[14px] leading-relaxed text-ink-soft">
            You&rsquo;re closer than you think. Based on your micro-audit responses, here is where your greatest upskilling gains are.
          </p>
        </div>
      </div>

      {/* Snapshot Strengths and Identified Gaps Summary Banner */}
      <div className="mb-14 grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/60 to-white p-6 shadow-xs">
          <div className="mb-4 flex items-center gap-2 text-emerald-700 font-display font-bold text-[16px]">
            <CheckCircle2 size={20} /> Identified Foundation &amp; Strengths
          </div>
          <ul className="flex flex-col gap-2.5 text-[14.5px] text-[#201d1d]">
            {snapshot.strengths.map((s, i) => (
              <li key={i} className="flex items-center gap-2 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" /> {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-amber-200/60 bg-gradient-to-br from-amber-50/60 to-white p-6 shadow-xs">
          <div className="mb-4 flex items-center gap-2 text-[#b45309] font-display font-bold text-[16px]">
            <AlertCircle size={20} /> Targeted Competency Gaps
          </div>
          <ul className="flex flex-col gap-2.5 text-[14.5px] text-[#201d1d]">
            {snapshot.gaps.map((g, i) => (
              <li key={i} className="flex items-center gap-2 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" /> {g}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-16 grid gap-6 sm:grid-cols-3">
        {groups.map((group) => (
          <div key={group.key} className="rounded-3xl border border-paper-line bg-white p-6 shadow-xs">
            <div className="mb-5 flex items-center justify-between">
              <SkillTag label={group.title} category={group.key} />
            </div>
            <p className="mb-5 text-xs text-ink-faint">{group.note}</p>
            <div className="flex flex-col gap-4">
              {readinessSummary[group.key].map((skill) => (
                <div key={skill.id} className="flex flex-col gap-2 border-t border-paper-line pt-4 first:border-t-0 first:pt-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-ink">{skill.name}</span>
                    <span className="font-mono text-xs tabular-nums text-ink-faint">
                      {skill.readiness}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <DemandBadge label={skill.demand} trend={skill.trend} />
                    <button
                      type="button"
                      onClick={() => setExplaining(skill)}
                      aria-label={`Why ${skill.name} was recommended`}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-faint hover:bg-paper-dim hover:text-ink-soft"
                    >
                      <Info size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SkillGapCard skill={priorityGap} onWhy={() => setExplaining(priorityGap)} />

      <div className="mt-16 flex flex-col items-center gap-4 text-center">
        <p className="text-sm font-semibold text-ink">Ready to start closing your priority skill gaps?</p>
        <div className="flex flex-col gap-3.5 sm:flex-row w-full sm:w-auto">
          <Link
            href="/dashboard"
            id="cta-continue-dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6b0000] to-[#4a0000] px-8 py-4 text-[15px] font-bold text-white shadow-[0_4px_20px_rgba(107,0,0,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <LayoutDashboard size={17} />
            Continue to Student Dashboard
            <ArrowRight size={17} />
          </Link>
          <Link
            href="/skills/erp-workflow"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-4 text-sm font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-black/[0.02]"
          >
            View Priority Skill Detail
          </Link>
        </div>
      </div>

      <SkillExplanationDrawer skill={explaining} onClose={() => setExplaining(null)} />
    </section>
  );
}
