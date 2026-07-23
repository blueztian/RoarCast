"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Info, ArrowRight } from "lucide-react";
import ReadinessRing from "@/components/ReadinessRing";
import SkillTag from "@/components/SkillTag";
import DemandBadge from "@/components/DemandBadge";
import SkillGapCard from "@/components/SkillGapCard";
import SkillExplanationDrawer from "@/components/SkillExplanationDrawer";
import { readinessSummary, priorityGap, overallReadiness, type SkillResult } from "@/data/mockSkills";

const groups: { key: keyof typeof readinessSummary; title: string; note: string }[] = [
  { key: "ready", title: "Ready", note: "Already meets what employers expect" },
  { key: "strengthen", title: "Strengthen", note: "Solid start, worth sharpening" },
  { key: "priority", title: "Priority Gap", note: "Fastest way to raise your score" },
];

export default function ResultsPage() {
  const [explaining, setExplaining] = useState<SkillResult | null>(null);

  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 pt-32 sm:pb-32">
      <div className="mb-16 flex flex-col items-center gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <ReadinessRing percentage={overallReadiness} />
        </motion.div>

        <div>
          <h1 className="text-balance font-display text-3xl font-semibold text-ink sm:text-4xl">
            Your industry readiness is {overallReadiness}%.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-balance text-[15px] leading-relaxed text-ink-soft">
            You&rsquo;re closer than you think. Here&rsquo;s where your next gains are.
          </p>
        </div>
      </div>

      <div className="mb-16 grid gap-6 sm:grid-cols-3">
        {groups.map((group) => (
          <div key={group.key} className="rounded-3xl border border-paper-line bg-white p-6">
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
        <p className="text-sm text-ink-faint">Want the full roadmap, saved to your profile?</p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-6 py-3 text-sm font-semibold text-ink-soft transition-colors hover:border-ink/20 hover:text-ink"
        >
          Start over with a new profile
          <ArrowRight size={15} />
        </Link>
      </div>

      <SkillExplanationDrawer skill={explaining} onClose={() => setExplaining(null)} />
    </section>
  );
}
