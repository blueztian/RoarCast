"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AuditAnswer } from "@/data/mockAuditQuestions";
import { auditAnswerOptions } from "@/data/mockAuditQuestions";

interface AuditQuestionProps {
  index: number;
  total: number;
  skillTag: string;
  prompt: string;
  selected?: AuditAnswer;
  onSelect: (answer: AuditAnswer) => void;
}

export default function AuditQuestion({
  index,
  total,
  skillTag,
  prompt,
  selected,
  onSelect,
}: AuditQuestionProps) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-wide text-ink-faint">
        <span>
          Question {index + 1} of {total}
        </span>
        <span className="h-1 w-1 rounded-full bg-ink-faint" />
        <span className="text-roar-amber">{skillTag}</span>
      </div>

      <h2 className="mb-10 max-w-xl text-balance font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
        {prompt}
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" role="radiogroup" aria-label={prompt}>
        {auditAnswerOptions.map((option) => {
          const isSelected = selected === option;
          return (
            <motion.button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(option)}
              className={cn(
                "flex items-center justify-between rounded-2xl border px-5 py-4 text-left text-[15px] font-medium transition-colors",
                isSelected
                  ? "border-roar-maroon bg-roar-maroon/[0.05] text-roar-maroon"
                  : "border-paper-line bg-white text-ink-soft hover:border-ink/20 hover:bg-paper-dim"
              )}
            >
              {option}
              <span
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
                  isSelected ? "border-roar-maroon bg-roar-maroon text-white" : "border-paper-line"
                )}
              >
                {isSelected && <Check size={12} strokeWidth={3} />}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
