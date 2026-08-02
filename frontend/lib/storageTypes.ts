/**
 * Canonical domain interfaces for RoarCast demonstration storage and user journeys.
 */

export interface StoredEnvelope<T> {
  schemaVersion: 1;
  updatedAt: string;
  data: T;
}

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

export interface AuditDraft {
  currentStep: number;
  educationLevel: string;
  degree: string;
  careerPath: string;
  answers: Record<string, AuditAnswerValue>;
  updatedAt: string;
}

export interface ProfileDraft {
  currentStep: number;
  formValues: Record<string, string>;
  updatedAt: string;
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

export interface LessonProgress {
  /** moduleId → "not_started" | "in_progress" | "completed" */
  [moduleId: string]: "not_started" | "in_progress" | "completed";
}

export interface AssessmentResult {
  score: number;           // 0–100
  passed: boolean;
  completedAt: string;     // ISO date string
  answers: number[];       // selected option indices
}

export interface Credential {
  id: string;
  skillId: string;
  skillName: string;
  issuedTo: string;
  issuedAt: string;
  credentialId: string;
  disclaimer?: string;
}

export interface SquadMembership {
  squadId: string;
  joinedAt: string;
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
  auditDraft: string;
  profileDraft: string;
  sampleMode: string;
  profileAdded: string;
  dashboardSeen: string;
}
