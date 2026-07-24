import { Flame, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Trend } from "@/data/mockDemand";

interface DemandBadgeProps {
  label: string;
  trend: Trend;
  className?: string;
}

const config: Record<Trend, { icon: typeof Flame; classes: string }> = {
  high: {
    icon: Flame,
    classes: "bg-roar-maroon/[0.06] text-roar-maroon border-roar-maroon/20",
  },
  rising: {
    icon: TrendingUp,
    classes: "bg-roar-amber/[0.08] text-roar-amber border-roar-amber/25",
  },
  steady: {
    icon: Minus,
    classes: "bg-ink/[0.04] text-ink-soft border-ink/10",
  },
};

export default function DemandBadge({ label, trend, className }: DemandBadgeProps) {
  const { icon: Icon, classes } = config[trend];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        classes,
        className
      )}
    >
      <Icon size={12} strokeWidth={2.5} aria-hidden="true" />
      {label}
    </span>
  );
}
