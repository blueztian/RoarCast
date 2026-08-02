import type { AuditData, AuditQuestion, ReadinessSnapshot } from "@/lib/storageTypes";
import { CAREER_PATHS } from "@/features/demo-data";

/**
 * Calculates a demonstration readiness diagnostic snapshot based on student answers to the micro-audit.
 * Note: Readiness values are preparatory diagnostics for demo purposes, never formal decision evaluations.
 */
export function calculateDemoReadiness(data: AuditData, questions: AuditQuestion[]): ReadinessSnapshot {
  let score = 38;

  const eduBonus: Record<string, number> = {
    shs: 0,
    college: 10,
    "fresh-grad": 15,
    working: 22,
  };
  score += eduBonus[data.educationLevel] ?? 0;

  let techTotal = 0,
    techCount = 0,
    workTotal = 0,
    workCount = 0;

  for (const q of questions) {
    const v = data.skillAnswers[q.key];
    if (q.type === "rating" && typeof v === "number") {
      const pts = Math.round((v / 5) * 7);
      score += pts;
      if (q.category === "technical") {
        techTotal += v;
        techCount++;
      }
      if (q.category === "workplace") {
        workTotal += v;
        workCount++;
      }
    }
  }

  const digitalPts: Record<string, number> = {
    very: 8,
    somewhat: 5,
    basic: 2,
    limited: 0,
  };
  score += digitalPts[data.skillAnswers.digitalComfort as string] ?? 0;
  
  if (data.skillAnswers.hasInternship === true) score += 10;
  if (data.skillAnswers.hasCertification === true) score += 7;

  // Constrain computed score to a reasonable percentage range (26 - 96)
  score = Math.min(96, Math.max(26, score));

  const label =
    score >= 78
      ? "Industry Ready"
      : score >= 63
      ? "Nearly Ready"
      : score >= 48
      ? "Developing"
      : "Building Foundations";

  const techAvg = techCount > 0 ? techTotal / techCount : 0;
  const workAvg = workCount > 0 ? workTotal / workCount : 0;
  const dc = data.skillAnswers.digitalComfort as string;

  const strengths: string[] = [];
  if (workAvg >= 3.5) strengths.push("Workplace Communication");
  if (techAvg >= 3.5) strengths.push("Technical Role Knowledge");
  if (data.skillAnswers.hasInternship) strengths.push("Hands-On Industry Experience");
  if (data.skillAnswers.hasCertification) strengths.push("Industry Certification");
  if (["very", "somewhat"].includes(dc)) strengths.push("Digital Tool Proficiency");
  if (data.educationLevel === "working") strengths.push("Professional Work Background");

  if (strengths.length === 0) {
    strengths.push("Academic Foundation");
    strengths.push("Commitment to Growth");
  } else if (strengths.length === 1) {
    strengths.push("Academic Foundation");
  }

  const gaps: string[] = [];
  if (techAvg < 3) gaps.push("Industry Software Proficiency");
  if (!data.skillAnswers.hasInternship) gaps.push("Practical Industry Exposure");
  if (!data.skillAnswers.hasCertification) gaps.push("Industry Certification");
  if (workAvg < 3) gaps.push("Professional Workplace Skills");
  if (["basic", "limited"].includes(dc)) gaps.push("Advanced Digital Readiness");
  if (gaps.length === 0) gaps.push("Advanced Role-Specific Competencies");

  // Determine target role display title based on career path selection
  const matchedPath = CAREER_PATHS.find((p) => p.id === data.careerPath)?.label || data.degree || "Operations Associate";
  const targetRole = matchedPath.includes("Operations") || matchedPath.includes("Development") 
    ? `Junior ${matchedPath}` 
    : `${matchedPath} Associate`;

  return {
    score,
    label,
    targetRole,
    strengths: strengths.slice(0, 3),
    gaps: gaps.slice(0, 3),
    priorityGap: gaps[0],
    nextStep:
      score >= 65
        ? "Explore career paths matched to your readiness profile"
        : "Start your personalized upskilling roadmap to close your skill gaps",
    computedAt: new Date().toISOString(),
  };
}
