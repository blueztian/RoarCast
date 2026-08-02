import type {
  StudentProfile,
  AuditData,
  ReadinessSnapshot,
  AuditDraft,
  ProfileDraft,
  LessonProgress,
  AssessmentResult,
  Credential,
  SquadMembership,
  StoredEnvelope,
} from "@/lib/storageTypes";
import { DEMO_STUDENT, DEMO_READINESS_SNAPSHOT } from "@/features/demo-data";

const KEYS = {
  profile: "roarcast_student",
  auditData: "roarcast_canonical_audit_data",
  readinessSnapshot: "roarcast_readiness_snapshot",
  auditComplete: "roarcast_audit_complete",
  squadJoined: "roarcast_squad_joined",
  lessonProgress: "roarcast_lesson_progress",
  assessmentResult: "roarcast_assessment_result",
  credential: "roarcast_credential",
  auditDraft: "roarcast_audit_draft",
  profileDraft: "roarcast_profile_draft",
  sampleMode: "roarcast_sample_mode_enabled",
  profileAdded: "roarcast_profile_added",
  dashboardSeen: "roarcast_dashboard_seen",
} as const;

export const MODULE_IDS = [
  "erp-foundations",
  "accounting-workflow",
  "transactions-reconciliation",
  "reporting",
];

export const BASE_READINESS = 72;

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && "schemaVersion" in parsed && "data" in parsed) {
      if ((parsed as StoredEnvelope<T>).schemaVersion !== 1) {
        return fallback;
      }
      return (parsed as StoredEnvelope<T>).data;
    }
    // Fallback for un-enveloped testing items or earlier storage
    return parsed as T;
  } catch {
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    const envelope: StoredEnvelope<T> = {
      schemaVersion: 1,
      updatedAt: new Date().toISOString(),
      data: value,
    };
    window.localStorage.setItem(key, JSON.stringify(envelope));
  } catch {
    // Ignore storage quota limitations during demo executions
  }
}

function safeRemove(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore errors
  }
}

export const demoRepository = {
  // ── Sample Mode ─────────────────────────────────────────────────────────────
  isSampleMode(): boolean {
    return safeGet<boolean>(KEYS.sampleMode, false);
  },
  setSampleMode(enabled: boolean): void {
    safeSet(KEYS.sampleMode, enabled);
  },

  // ── Student Profile ──────────────────────────────────────────────────────────
  getStudentProfile(): StudentProfile | null {
    const stored = safeGet<StudentProfile | null>(KEYS.profile, null);
    if (stored !== null) return stored;
    if (this.isSampleMode()) return DEMO_STUDENT;
    return null;
  },
  getStudentOrDefault(): StudentProfile {
    return this.getStudentProfile() ?? DEMO_STUDENT;
  },
  saveStudentProfile(profile: StudentProfile): void {
    safeSet(KEYS.profile, profile);
  },

  // ── Audit & Snapshot ─────────────────────────────────────────────────────────
  getAuditData(): AuditData | null {
    const stored = safeGet<AuditData | null>(KEYS.auditData, null);
    if (stored !== null) return stored;
    if (this.isSampleMode()) {
      return {
        educationLevel: "College Student",
        degree: "Accounting Information System",
        careerPath: "Accounting Operations",
        skillAnswers: { q1: 4, q2: 4, q3: "Intermediate", q4: "Intermediate", q5: true },
      };
    }
    return null;
  },
  saveAuditData(data: AuditData): void {
    safeSet(KEYS.auditData, data);
  },
  isAuditComplete(): boolean {
    return safeGet<boolean>(KEYS.auditComplete, false) || (this.isSampleMode() && this.getAuditData() !== null);
  },
  markAuditComplete(): void {
    safeSet(KEYS.auditComplete, true);
  },
  getReadinessSnapshot(): ReadinessSnapshot | null {
    const stored = safeGet<ReadinessSnapshot | null>(KEYS.readinessSnapshot, null);
    if (stored !== null) return stored;
    if (this.isSampleMode()) return DEMO_READINESS_SNAPSHOT;
    return null;
  },
  getReadinessSnapshotOrDefault(): ReadinessSnapshot {
    return this.getReadinessSnapshot() ?? DEMO_READINESS_SNAPSHOT;
  },
  saveReadinessSnapshot(snapshot: ReadinessSnapshot): void {
    safeSet(KEYS.readinessSnapshot, snapshot);
  },

  // ── Draft Progress Recovery ─────────────────────────────────────────────────
  getAuditDraft(): AuditDraft | null {
    return safeGet<AuditDraft | null>(KEYS.auditDraft, null);
  },
  saveAuditDraft(draft: AuditDraft): void {
    safeSet(KEYS.auditDraft, draft);
  },
  clearAuditDraft(): void {
    safeRemove(KEYS.auditDraft);
  },
  getProfileDraft(): ProfileDraft | null {
    return safeGet<ProfileDraft | null>(KEYS.profileDraft, null);
  },
  saveProfileDraft(draft: ProfileDraft): void {
    safeSet(KEYS.profileDraft, draft);
  },
  clearProfileDraft(): void {
    safeRemove(KEYS.profileDraft);
  },

  // ── Squads ──────────────────────────────────────────────────────────────────
  getSquad(): SquadMembership | null {
    return safeGet<SquadMembership | null>(KEYS.squadJoined, null);
  },
  joinSquad(squadId: string): void {
    safeSet(KEYS.squadJoined, { squadId, joinedAt: new Date().toISOString() });
  },

  // ── Learning Progress ───────────────────────────────────────────────────────
  getLessonProgress(): LessonProgress {
    return safeGet<LessonProgress>(KEYS.lessonProgress, {});
  },
  setModuleStatus(
    moduleId: string,
    status: "not_started" | "in_progress" | "completed"
  ): void {
    const current = this.getLessonProgress();
    safeSet(KEYS.lessonProgress, { ...current, [moduleId]: status });
  },
  getModuleStatus(moduleId: string): "not_started" | "in_progress" | "completed" {
    const progress = this.getLessonProgress();
    return progress[moduleId] ?? "not_started";
  },
  getOverallLearningProgress(): number {
    const progress = this.getLessonProgress();
    const completed = MODULE_IDS.filter((id) => progress[id] === "completed").length;
    return Math.round((completed / MODULE_IDS.length) * 100);
  },
  areAllModulesComplete(): boolean {
    const progress = this.getLessonProgress();
    return MODULE_IDS.every((id) => progress[id] === "completed");
  },

  // ── Assessment ──────────────────────────────────────────────────────────────
  getAssessmentResult(): AssessmentResult | null {
    return safeGet<AssessmentResult | null>(KEYS.assessmentResult, null);
  },
  saveAssessmentResult(result: AssessmentResult): void {
    safeSet(KEYS.assessmentResult, result);
  },

  // ── Credential ──────────────────────────────────────────────────────────────
  getCredential(): Credential | null {
    return safeGet<Credential | null>(KEYS.credential, null);
  },
  saveCredential(credential: Credential): void {
    safeSet(KEYS.credential, credential);
  },
  earnCredential(issuedTo: string): Credential {
    const cred: Credential = {
      id: "erp-workflow",
      skillId: "s6",
      skillName: "ERP Workflow Fundamentals",
      issuedTo,
      issuedAt: new Date().toISOString(),
      credentialId: "RC-ERP-2026-01842",
      disclaimer: "Prototype achievement record only, not formal institutional accreditation.",
    };
    safeSet(KEYS.credential, cred);
    return cred;
  },
  isCredentialEarned(): boolean {
    return this.getCredential() !== null;
  },

  // ── UI Flags ────────────────────────────────────────────────────────────────
  isProfileAdded(): boolean {
    return safeGet<boolean>(KEYS.profileAdded, false);
  },
  markProfileAdded(): void {
    safeSet(KEYS.profileAdded, true);
  },
  hasDashboardBeenSeen(): boolean {
    return safeGet<boolean>(KEYS.dashboardSeen, false);
  },
  markDashboardSeen(): void {
    safeSet(KEYS.dashboardSeen, true);
  },

  // ── Computed Readiness ──────────────────────────────────────────────────────
  computeReadiness(): number {
    const snapshot = this.getReadinessSnapshot();
    let score = snapshot ? snapshot.score : BASE_READINESS;
    if (this.isCredentialEarned()) score += 9;
    return Math.min(score, 100);
  },

  // ── Reset & Cleanup ─────────────────────────────────────────────────────────
  clearAllDemoData(): void {
    if (typeof window === "undefined") return;
    Object.values(KEYS).forEach((k) => safeRemove(k));
  },
  resetAllProgress(): void {
    this.clearAllDemoData();
  },
};
