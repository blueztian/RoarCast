"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import DemandBadge from "./DemandBadge";
import type { SkillResult } from "@/data/mockSkills";

interface SkillExplanationDrawerProps {
  skill: SkillResult | null;
  onClose: () => void;
}

export default function SkillExplanationDrawer({ skill, onClose }: SkillExplanationDrawerProps) {
  return (
    <AnimatePresence>
      {skill && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-ink/30 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Why ${skill.name} was recommended`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-paper-line bg-white p-8 shadow-card"
          >
            <div className="mb-8 flex items-start justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                Why this skill
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close explanation"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:bg-paper-dim hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <h3 className="mb-3 font-display text-3xl font-semibold text-ink">{skill.name}</h3>
            <div className="mb-6 flex items-center gap-2">
              <DemandBadge label={skill.demand} trend={skill.trend} />
            </div>

            <p className="text-[15px] leading-relaxed text-ink-soft">{skill.why}</p>

            <div className="mt-auto pt-8">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-roar-maroon"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
