"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ReadinessRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export default function ReadinessRing({
  percentage,
  size = 220,
  strokeWidth = 14,
  label = "industry readiness",
}: ReadinessRingProps) {
  const shouldReduceMotion = useReducedMotion();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${percentage}% ${label}`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#F3F0E8"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: shouldReduceMotion ? offset : offset }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        />
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB800" />
            <stop offset="100%" stopColor="#B67500" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="font-display text-5xl font-semibold tabular-nums text-ink">
          {percentage}
          <span className="text-2xl align-top">%</span>
        </span>
        <span className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
          {label}
        </span>
      </div>
    </div>
  );
}
