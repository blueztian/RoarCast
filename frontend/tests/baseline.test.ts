import { describe, it, expect, beforeEach } from 'vitest';
import { computeReadiness } from '@/lib/studentState';

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
