"use client";

import { useEffect, useRef, useState } from "react";

interface ReadinessGaugeProps {
  score: number;      // 0-100
  size?: number;
  strokeWidth?: number;
}

/**
 * ReadinessGauge — 270° two-tone arc speedometer.
 *
 * Green (bottom) = achieved mastery region.
 * Orange (upper) = in-progress region.
 * The SVG is rotated 135° to place the start at 7-o'clock.
 */
export default function ReadinessGauge({
  score,
  size = 140,
  strokeWidth = 13,
}: ReadinessGaugeProps) {
  const r       = (size - strokeWidth) / 2;
  const circ    = 2 * Math.PI * r;
  const track   = circ * 0.75;          // 270° of arc
  const fill    = track * (score / 100);
  const green   = fill * 0.55;          // bottom 55% = green
  const orange  = fill - green;         // upper 45% = orange

  const greenRef  = useRef<SVGCircleElement>(null);
  const orangeRef = useRef<SVGCircleElement>(null);

  // Animate both arcs via direct DOM style after mount
  useEffect(() => {
    const ease = "cubic-bezier(0.16,1,0.3,1)";

    const t1 = setTimeout(() => {
      const el = greenRef.current;
      if (!el) return;
      el.style.transition = `stroke-dasharray 1.15s ${ease}`;
      el.setAttribute("stroke-dasharray", `${green} ${circ - green}`);
    }, 160);

    const t2 = setTimeout(() => {
      const el = orangeRef.current;
      if (!el) return;
      el.style.transition = `stroke-dasharray 0.95s ${ease}`;
      // Multi-segment dasharray: skip `green` px, then draw `orange` px
      el.setAttribute("stroke-dasharray", `0 ${green} ${orange} ${circ}`);
    }, 440);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [score, green, orange, circ]);

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Readiness score: ${score}%`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(135deg)" }}
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="#ede9e3"
          strokeWidth={strokeWidth}
          strokeDasharray={`${track} ${circ - track}`}
          strokeLinecap="round"
        />
        {/* Green — achieved */}
        <circle
          ref={greenRef}
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="#22c55e"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`0 ${circ}`}
        />
        {/* Orange — in progress */}
        <circle
          ref={orangeRef}
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="#f59e0b"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`0 ${circ}`}
        />
      </svg>

      {/* Centre label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="font-display text-[31px] font-bold leading-none tracking-tight text-[#1c1a17]">
          {score}%
        </span>
        <span className="mt-1 text-[11px] font-semibold tracking-wide text-[#8a8480]">
          Job ready
        </span>
      </div>
    </div>
  );
}
