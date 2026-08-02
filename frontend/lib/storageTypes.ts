/**
 * Canonical domain interfaces for RoarCast demonstration storage and user journeys.
 */

export interface StudentProfile {
  name: string;
  email?: string;
  age: string | number;
  school: string;
  program: string; // Degree or strand
  gradYear: string | number;
  careerInterest: string;
  location?: string;
}

export interface AuditQuestion {
  id: string;
  category: "technical" | "workplace" | "digital" | "exposure";
  text: string;
  subtitle?: string;
  type: "rating" | "choice" | "yesno";
  key: string;
  choices?: { value: string; label: string }[];
}

export type AuditAnswerValue = number | string | boolean;

export interface AuditData {
  educationLevel: string;
  degree: string;
  careerPath: string;
  skillAnswers: Record<string, AuditAnswerValue>;
}

export interface ReadinessSnapshot {
  score: number;
  label: string;
  targetRole: string;
  strengths: string[];
  gaps: string[];
  priorityGap: string;
  nextStep: string;
  computedAt?: string;
}

export interface StorageKeys {
  student: string;
  auditData: string;
  readinessSnapshot: string;
  auditComplete: string;
  squadJoined: string;
  lessonProgress: string;
  assessmentResult: string;
  credential: string;
}
