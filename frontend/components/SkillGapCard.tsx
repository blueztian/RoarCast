"use client";

import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import DemandBadge from "./DemandBadge";
import type { SkillResult } from "@/data/mockSkills";

interface SkillGapCardProps {
  skill: SkillResult;
  onWhy: () => void;
}

export default function SkillGapCard({ skill, onWhy }: SkillGapCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-roar-maroon/15 bg-gradient-to-br from-white to-[#FBF2EF] p-7 shadow-card sm:p-9">
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-wide text-roar-maroon">
          Priority Gap
        </span>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{skill.name}</h3>
          <p className="mt-2 max-w-md text-sm text-ink-soft">
            This is the single fastest path to raising your readiness score before you graduate.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DemandBadge label={skill.demand} trend={skill.trend} />
        </div>
      </div>

      <div className="mb-7 h-2 w-full overflow-hidden rounded-full bg-white/70">
        <div
          className="h-full rounded-full bg-roar-maroon transition-all duration-700"
          style={{ width: `${skill.readiness}%` }}
          role="progressbar"
          aria-valuenow={skill.readiness}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${skill.name} readiness`}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/learn/erp-foundations"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-roar-maroon px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5a0000]"
        >
          Close This Gap
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </Link>
        <button
          type="button"
          onClick={onWhy}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-6 py-3 text-sm font-semibold text-ink-soft transition-colors hover:border-ink/20 hover:text-ink"
        >
          <Info size={16} strokeWidth={2.5} />
          Why This Matters
        </button>
      </div>
    </div>
  );
}
