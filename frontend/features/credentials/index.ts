/**
 * Prototype Credential Repository & Truth-In-Demo Formatting
 */

export interface DemoCredential {
  credentialId: string;
  skillId: string;
  skillName: string;
  issuedAt: string;
  issuedTo: string;
  issuer: string;
  disclaimer: string;
}

export const CREDENTIAL_DISCLAIMER = "RoarCast Demonstration Credential · Prototype verification only, not formal institutional accreditation.";

export function buildDemoCredential(skillName: string, studentName: string, skillId = "erp-workflow"): DemoCredential {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return {
    credentialId: `RC-ERP-2026-${randomSuffix}`,
    skillId,
    skillName,
    issuedAt: new Date().toISOString(),
    issuedTo: studentName || "Jana Cruz",
    issuer: "RoarCast Workforce Readiness System",
    disclaimer: CREDENTIAL_DISCLAIMER,
  };
}
