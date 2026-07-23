import { cn } from "@/lib/utils";
import type { ReadinessCategory } from "@/data/mockSkills";

interface SkillTagProps {
  label: string;
  category?: ReadinessCategory | "neutral";
  className?: string;
}

const styles: Record<string, string> = {
  ready: "bg-[#EEF3E8] text-[#3C5A2A] border-[#D3E2C4]",
  strengthen: "bg-[#FFF4DC] text-[#8A5A00] border-[#F3DFA4]",
  priority: "bg-[#FBE9E6] text-roar-maroon border-[#F0C7C0]",
  neutral: "bg-paper-dim text-ink-soft border-paper-line",
};

export default function SkillTag({ label, category = "neutral", className }: SkillTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wide",
        styles[category],
        className
      )}
    >
      {label}
    </span>
  );
}
