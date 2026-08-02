/**
 * Centralized Assessment Engine & Diagnostic Thresholds for RoarCast prototype demonstrations.
 */

export const PASS_THRESHOLD = 60;

export const ANALYSIS_STEPS = [
  "Reading your responses",
  "Mapping answers to Skill Tags",
  "Comparing against ERP Workflow benchmark",
  "Generating your diagnostic result",
];

export interface AssessmentSubmissionResult {
  score: number;
  passed: boolean;
  completedAt: string;
  answers: number[];
}

/**
 * Calculates percentage score and verification status from array of selected options vs correct indices.
 */
export function evaluateAssessment(
  selectedAnswers: (number | null)[],
  correctIndices: number[]
): AssessmentSubmissionResult {
  let correct = 0;
  const numQuestions = correctIndices.length;
  
  for (let i = 0; i < numQuestions; i++) {
    if (selectedAnswers[i] === correctIndices[i]) {
      correct++;
    }
  }

  const score = numQuestions > 0 ? Math.round((correct / numQuestions) * 100) : 0;
  const passed = score >= PASS_THRESHOLD;

  return {
    score,
    passed,
    completedAt: new Date().toISOString(),
    answers: selectedAnswers.map((a) => a ?? -1),
  };
}
