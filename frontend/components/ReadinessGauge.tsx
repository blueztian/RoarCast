"use client";

import { useEffect, useRef } from "react";

interface ReadinessGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

/**
 * ReadinessGauge
 *
 * A 270° arc gauge (speedometer style) with two-tone fill:
 * - Green (bottom / achieved portion)
 * - Orange (upper / in-progress portion)
 *
 * The SVG is rotated 135° so the arc starts at 7-o'clock (bottom-left)
 * and ends at 5-o'clock (bottom-right).
 */
export default function ReadinessGauge({
  score,
  size = 136,
  strokeWidth = 13,
}: ReadinessGaugeProps) {
  const r      = (size - strokeWidth) / 2;
  const circ   = 2 * Math.PI * r;
  const track  = circ * 0.75;           // 270° arc
  const fill   = track * (score / 100); // filled portion

  // Split: first 55% of fill = green (achieved), rest = orange (in progress)
  const green  = fill * 0.55;
  const orange = fill - green;

  const greenRef  = useRef<SVGCircleElement>(null);
  const orangeRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    // Stagger the two arcs for a satisfying reveal
    const t1 = setTimeout(() => {
      if (!greenRef.current) return;
      greenRef.current.style.transition =
        "stroke-dasharray 1.1s cubic-bezier(0.16,1,0.3,1)";
      greenRef.current.setAttribute(
        "stroke-dasharray",
        `${green} ${circ - green}`
      );
    }, 150);

    const t2 = setTimeout(() => {
      if (!orangeRef.current) return;
      orangeRef.current.style.transition =
        "stroke-dasharray 0.95s cubic-bezier(0.16,1,0.3,1)";
      // Multi-value dasharray: gap of `green` skips to where green ends,
      // then draws `orange` length, then a huge gap for the rest.
      orangeRef.current.setAttribute(
        "stroke-dasharray",
        `0 ${green} ${orange} ${circ}`
      );
    }, 420);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [score, green, orange, circ]);

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${score}% Job Ready`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(135deg)" }}
        aria-hidden="true"
      >
        {/* Track — full 270° in light gray */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#e8e3de"
          strokeWidth={strokeWidth}
          strokeDasharray={`${track} ${circ - track}`}
          strokeLinecap="round"
        />

        {/* Green arc — bottom / achieved portion */}
        <circle
          ref={greenRef}
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#22c55e"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`0 ${circ}`} /* start invisible, animated via ref */
        />

        {/* Orange arc — upper / in-progress portion */}
        <circle
          ref={orangeRef}
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#f59e0b"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`0 ${circ}`} /* start invisible, animated via ref */
        />
      </svg>

      {/* Centre label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-[32px] font-bold leading-none text-[#201d1d]">
          {score}%
        </span>
        <span className="mt-1.5 text-[11.5px] font-semibold text-[#7a7373]">
          Job ready
        </span>
      </div>
    </div>
  );
}
