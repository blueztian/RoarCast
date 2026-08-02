import type { StudentProfile, AuditData, ReadinessSnapshot } from "@/lib/storageTypes";
import { DEMO_STUDENT, DEMO_READINESS_SNAPSHOT } from "@/features/demo-data";

const KEYS = {
  profile: "roarcast_student",
  auditData: "roarcast_canonical_audit_data",
  readinessSnapshot: "roarcast_readiness_snapshot",
} as const;

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota limitations during demo executions
  }
}

export const demoRepository = {
  getStudentProfile(): StudentProfile {
    return safeGet<StudentProfile>(KEYS.profile, DEMO_STUDENT);
  },

  saveStudentProfile(profile: StudentProfile): void {
    safeSet(KEYS.profile, profile);
  },

  getAuditData(): AuditData | null {
    return safeGet<AuditData | null>(KEYS.auditData, null);
  },

  saveAuditData(data: AuditData): void {
    safeSet(KEYS.auditData, data);
  },

  getReadinessSnapshot(): ReadinessSnapshot {
    return safeGet<ReadinessSnapshot>(KEYS.readinessSnapshot, DEMO_READINESS_SNAPSHOT);
  },

  saveReadinessSnapshot(snapshot: ReadinessSnapshot): void {
    safeSet(KEYS.readinessSnapshot, snapshot);
  },

  clearAllDemoData(): void {
    if (typeof window === "undefined") return;
    Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k));
  },
};
