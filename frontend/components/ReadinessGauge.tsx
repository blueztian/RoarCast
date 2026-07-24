"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ReadinessGaugeProps {
  /** 0-100 */
  score: number;
  /** outer diameter in px, default 136 */
  size?: number;
  strokeWidth?: number;
}

/**
 * ReadinessGauge
 *
 * A 270° arc gauge (speedometer style) that fills from bottom-left to
 * bottom-right clockwise, showing the student's readiness score.
 * Used on the Home / Career Dashboard page.
 */
export default function ReadinessGauge({
  score,
  size = 136,
  strokeWidth = 12,
}: ReadinessGaugeProps) {
  const shouldReduceMotion = useReducedMotion();
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  // 270° arc = 75% of the full circumference
  const trackArc = circ * 0.75;
  const fillArc   = trackArc * (score / 100);

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${score}% Job Ready`}
    >
      {/*
        SVG is rotated 135° so the arc begins at the bottom-left
        (7-8 o'clock) and ends at the bottom-right (4-5 o'clock).
      */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(135deg)" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>

        {/* Track — full 270° arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#ede9e4"
          strokeWidth={strokeWidth}
          strokeDasharray={`${trackArc} ${circ - trackArc}`}
          strokeLinecap="round"
        />

        {/* Fill — animated portion based on score */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circ}` }}
          animate={{
            strokeDasharray: shouldReduceMotion
              ? `${fillArc} ${circ - fillArc}`
              : `${fillArc} ${circ - fillArc}`,
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 1.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
          }
        />
      </svg>

      {/* Centre label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-[32px] font-bold leading-none text-[#201d1d]">
          {score}%
        </span>
        <span className="mt-1.5 text-[11.5px] font-semibold text-[#7a7373]">Job Ready</span>
      </div>
    </div>
  );
}
