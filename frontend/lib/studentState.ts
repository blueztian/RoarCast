/**
 * Centralized student state — all localStorage reads/writes go through here.
 * All UI derives from this, never independently hardcoding values.
 */

import { demoRepository } from "@/lib/demoRepository";

// ── Keys ────────────────────────────────────────────────────────────────────
const KEYS = {
  student: "roarcast_student",
  auditAnswers: "roarcast_audit_answers",
  auditComplete: "roarcast_audit_complete",
  squadJoined: "roarcast_squad_joined",
  lessonProgress: "roarcast_lesson_progress",
  assessmentResult: "roarcast_assessment_result",
  credential: "roarcast_credential",
  profileAdded: "roarcast_profile_added",
  dashboardSeen: "roarcast_dashboard_seen",
} as const;

// ── Types ────────────────────────────────────────────────────────────────────

export interface StudentProfile {
  name: string;
  age: string;
  school: string;
  program: string;
  gradYear: string;
  careerInterest: string;
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
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function get<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function set<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors
  }
}

function remove(key: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
}

// ── Student Profile ──────────────────────────────────────────────────────────

const defaultStudent: StudentProfile = {
  name: "Jana Cruz",
  age: "23",
  school: "Santa Rosa, Laguna",
  program: "Accounting Information System",
  gradYear: "2026",
  careerInterest: "Accounting Operations",
};

export function getStudent(): StudentProfile {
  return get<StudentProfile>(KEYS.student, defaultStudent);
}

export function saveStudent(profile: StudentProfile): void {
  set(KEYS.student, profile);
}

// ── Audit ────────────────────────────────────────────────────────────────────

export function markAuditComplete(): void {
  set(KEYS.auditComplete, true);
}

export function isAuditComplete(): boolean {
  return get<boolean>(KEYS.auditComplete, false);
}

// ── Squad ─────────────────────────────────────────────────────────────────────

export interface SquadMembership {
  squadId: string;
  joinedAt: string;
}

export function getSquad(): SquadMembership | null {
  return get<SquadMembership | null>(KEYS.squadJoined, null);
}

export function joinSquad(squadId: string): void {
  set(KEYS.squadJoined, { squadId, joinedAt: new Date().toISOString() });
}

// ── Lesson Progress ──────────────────────────────────────────────────────────

const MODULE_IDS = [
  "erp-foundations",
  "accounting-workflow",
  "transactions-reconciliation",
  "reporting",
];

export { MODULE_IDS };

export function getLessonProgress(): LessonProgress {
  return get<LessonProgress>(KEYS.lessonProgress, {});
}

export function setModuleStatus(
  moduleId: string,
  status: "not_started" | "in_progress" | "completed"
): void {
  const current = getLessonProgress();
  set(KEYS.lessonProgress, { ...current, [moduleId]: status });
}

export function getModuleStatus(
  moduleId: string
): "not_started" | "in_progress" | "completed" {
  const progress = getLessonProgress();
  return progress[moduleId] ?? "not_started";
}

export function getOverallLearningProgress(): number {
  const progress = getLessonProgress();
  const completed = MODULE_IDS.filter(
    (id) => progress[id] === "completed"
  ).length;
  return Math.round((completed / MODULE_IDS.length) * 100);
}

export function areAllModulesComplete(): boolean {
  const progress = getLessonProgress();
  return MODULE_IDS.every((id) => progress[id] === "completed");
}

// ── Assessment ────────────────────────────────────────────────────────────────

export function getAssessmentResult(): AssessmentResult | null {
  return get<AssessmentResult | null>(KEYS.assessmentResult, null);
}

export function saveAssessmentResult(result: AssessmentResult): void {
  set(KEYS.assessmentResult, result);
}

// ── Credential ────────────────────────────────────────────────────────────────

export function getCredential(): Credential | null {
  return get<Credential | null>(KEYS.credential, null);
}

export function earnCredential(issuedTo: string): Credential {
  const cred: Credential = {
    id: "erp-workflow",
    skillId: "s6",
    skillName: "ERP Workflow Fundamentals",
    issuedTo,
    issuedAt: new Date().toISOString(),
    credentialId: "RC-ERP-2026-01842",
  };
  set(KEYS.credential, cred);
  return cred;
}

export function isCredentialEarned(): boolean {
  return getCredential() !== null;
}

// ── Profile Added ─────────────────────────────────────────────────────────────

export function isProfileAdded(): boolean {
  return get<boolean>(KEYS.profileAdded, false);
}

export function markProfileAdded(): void {
  set(KEYS.profileAdded, true);
}

// ── Dashboard Seen ────────────────────────────────────────────────────────────

export function hasDashboardBeenSeen(): boolean {
  return get<boolean>(KEYS.dashboardSeen, false);
}

export function markDashboardSeen(): void {
  set(KEYS.dashboardSeen, true);
}

// ── Derived Readiness ─────────────────────────────────────────────────────────

/** Base readiness from audit. ERP credential adds +9 (72→81). */
export const BASE_READINESS = 72;

export function computeReadiness(): number {
  let score = demoRepository.getReadinessSnapshot().score;
  if (isCredentialEarned()) score += 9;
  return Math.min(score, 100);
}

// ── RESET ────────────────────────────────────────────────────────────────────

export function resetAllProgress(): void {
  Object.values(KEYS).forEach(remove);
}
