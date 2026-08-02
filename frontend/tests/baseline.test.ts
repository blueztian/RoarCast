import { describe, it, expect, beforeEach } from 'vitest';
import { demoRepository } from '@/lib/demoRepository';
import { evaluateAssessment } from '@/features/assessment';
import { buildDemoCredential, CREDENTIAL_DISCLAIMER } from '@/features/credentials';
import { CANONICAL_UPSKILLING_PIPELINE } from '@/features/learning';
import { calculateDemoReadiness } from '@/features/readiness';
import type { AuditData, AuditQuestion, StoredEnvelope } from '@/lib/storageTypes';

describe('Unified Demo Repository & Storage Envelope Architecture (Phase 3)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    demoRepository.clearAllDemoData();
  });

  it('computes default base readiness of 72 when no credentials exist in storage', () => {
    const score = demoRepository.computeReadiness();
    expect(score).toBe(72);
  });

  it('adds bonus points to readiness when a demonstration credential is saved via demoRepository', () => {
    demoRepository.saveCredential({
      credentialId: 'RC-TEST-001',
      skillId: 'erp-workflow',
      skillName: 'Demo Credential',
      issuedTo: 'Test Student',
      issuedAt: new Date().toISOString(),
      disclaimer: CREDENTIAL_DISCLAIMER
    });
    const score = demoRepository.computeReadiness();
    expect(score).toBe(81);
  });

  it('wraps stored entities in a versioned StoredEnvelope and rejects corrupt data or mismatched versions', () => {
    // Save valid profile
    demoRepository.saveStudentProfile({
      name: 'Valid Persona',
      age: '22',
      school: 'Santa Rosa',
      program: 'AIS',
      gradYear: '2026',
      careerInterest: 'Tax Tech',
      location: 'Laguna'
    });
    const retrieved = demoRepository.getStudentProfile();
    expect(retrieved?.name).toBe('Valid Persona');

    // Inspect underlying raw localStorage format to verify StoredEnvelope metadata
    const raw = window.localStorage.getItem('roarcast_student');
    expect(raw).not.toBeNull();
    const envelope = JSON.parse(raw!) as StoredEnvelope<any>;
    expect(envelope.schemaVersion).toBe(1);
    expect(envelope.updatedAt).toBeDefined();

    // Simulate storage corruption
    window.localStorage.setItem('roarcast_student', '{ invalid_json...');
    expect(demoRepository.getStudentProfile()).toBeNull();

    // Simulate outdated schema version
    window.localStorage.setItem('roarcast_student', JSON.stringify({ schemaVersion: 99, data: { name: 'Future' } }));
    expect(demoRepository.getStudentProfile()).toBeNull();
  });

  it('persists and clears AuditDraft and ProfileDraft safely across sessions', () => {
    demoRepository.saveAuditDraft({
      currentStep: 2,
      educationLevel: 'college',
      degree: 'AIS',
      careerPath: 'tax-tech',
      answers: { industryTools: 4 },
      updatedAt: new Date().toISOString()
    });
    const loadedDraft = demoRepository.getAuditDraft();
    expect(loadedDraft?.currentStep).toBe(2);
    expect(loadedDraft?.answers?.industryTools).toBe(4);

    demoRepository.clearAuditDraft();
    expect(demoRepository.getAuditDraft()).toBeNull();
  });
});

describe('Section 2.2: Stale-State Regression Verification', () => {
  it('proves that changing only the final answer changes the resulting snapshot when expected', () => {
    const questions: AuditQuestion[] = [
      { key: 'industryTools', text: 'Q1', category: 'technical', type: 'rating' },
      { key: 'hasCertification', text: 'Final Q', category: 'technical', type: 'yesno' }
    ];

    const baseData: AuditData = {
      educationLevel: 'college',
      degree: 'AIS',
      careerPath: 'accounting-ops',
      skillAnswers: {
        industryTools: 4,
        digitalComfort: 'somewhat',
        hasInternship: false,
        hasCertification: false, // initial final answer
      },
    };

    const snapshot1 = calculateDemoReadiness(baseData, questions);

    // Change ONLY the final answer (simulating exact updated answer map passed during auto-advance)
    const updatedData: AuditData = {
      ...baseData,
      skillAnswers: {
        ...baseData.skillAnswers,
        hasCertification: true, // changed final answer
      },
    };

    const snapshot2 = calculateDemoReadiness(updatedData, questions);

    // Assert that the final readiness snapshot correctly differentiates based on the last selected answer
    expect(snapshot2.score).not.toBe(snapshot1.score);
    expect(snapshot2.score).toBe(snapshot1.score + 7);
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
