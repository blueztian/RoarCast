import { describe, it, expect, beforeEach } from 'vitest';
import { computeReadiness } from '@/lib/studentState';
import { evaluateAssessment } from '@/features/assessment';
import { buildDemoCredential, CREDENTIAL_DISCLAIMER } from '@/features/credentials';
import { CANONICAL_UPSKILLING_PIPELINE } from '@/features/learning';

describe('Baseline Readiness & Storage State', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('computes default base readiness of 72 when no credentials exist in storage', () => {
    const score = computeReadiness();
    expect(score).toBe(72);
  });

  it('adds bonus points to readiness when a verifiable credential is stored', () => {
    window.localStorage.setItem('roarcast_credential', JSON.stringify({ id: 'RC-TEST-001', name: 'Demo Credential' }));
    const score = computeReadiness();
    expect(score).toBe(81);
  });
});

describe('Phase 3 Learning & Assessment Feature Domains', () => {
  it('validates passing and failing thresholds via evaluateAssessment', () => {
    const passedResult = evaluateAssessment([1, 2, 1, 2, 2], [1, 2, 1, 2, 2]);
    expect(passedResult.score).toBe(100);
    expect(passedResult.passed).toBe(true);

    const failedResult = evaluateAssessment([0, 0, 0, 0, 0], [1, 2, 1, 2, 2]);
    expect(failedResult.score).toBe(0);
    expect(failedResult.passed).toBe(false);
  });

  it('generates demonstration credentials with mandatory truth-in-demo disclaimers', () => {
    const cred = buildDemoCredential('ERP Workflow Fundamentals', 'Test Student');
    expect(cred.disclaimer).toBe(CREDENTIAL_DISCLAIMER);
    expect(cred.credentialId).toMatch(/^RC-ERP-2026-\d{4}$/);
  });

  it('maintains the canonical 4-step upskilling pipeline', () => {
    expect(CANONICAL_UPSKILLING_PIPELINE).toHaveLength(4);
    expect(CANONICAL_UPSKILLING_PIPELINE[0].id).toBe('detail');
    expect(CANONICAL_UPSKILLING_PIPELINE[3].id).toBe('credential');
  });
});

